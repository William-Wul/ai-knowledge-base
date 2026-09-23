#!/usr/bin/env node
// 同步 AIHOT 模型榜（站内称「AI 模型排行榜」）到 docs/.vitepress/data/leaderboard.json
// 数据源：https://aihot.virxact.com/leaderboard（公开页面，前 30 名 SSR 在 HTML 中）
// 官方 v1 API 暂无榜单端点（2026-08-10 核实），本脚本按公开页面结构解析；
// 页面改版或网络异常时保留上一份数据，并立即让同步任务失败，避免静默过期。
// 用法：
//   npm run sync:leaderboard      同步一次
//   node scripts/sync-leaderboard.mjs

import { writeFileSync, realpathSync, existsSync, renameSync, mkdirSync } from 'fs'
import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const DATA_DIR = join(__dirname, '..', 'docs', '.vitepress', 'data')
const OUT_FILE = join(DATA_DIR, 'leaderboard.json')
const TMP_FILE = OUT_FILE + '.tmp'

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
const PAGE_URL = 'https://aihot.virxact.com/leaderboard'
const RULES_URL = 'https://aihot.virxact.com/leaderboard/rules'

// 至少解析出这么多行才认为页面结构没变（正常为 30 行）
const MIN_ROWS = 20

function decodeEntities(s) {
  return String(s || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .trim()
}

async function fetchHtml(url) {
  // 30 秒超时：对方挂起时及时放弃，避免 CI 干等
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30_000) })
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`)
  return res.text()
}

function pick(re, block, name) {
  const m = block.match(re)
  if (!m) throw new Error(`字段解析失败: ${name}`)
  return decodeEntities(m[1])
}

export function parse(html) {
  // 只解析可见榜单；去除 React 插入的文本分隔注释，不依赖整页标签相邻关系。
  html = html.replace(/<!--[\s\S]*?-->/g, '')
  const intro = pick(/<div\b[^>]*class="lb-board-intro"[^>]*>([\s\S]*?)<\/div>/, html, '榜单说明')
  const plainIntro = intro.replace(/<[^>]*>/g, ' ')
  const meta = plainIntro.match(/(\d+)\s*项评测\s*·\s*(\d+)\s*家机构\s*·\s*(\d{2}\/\d{2}\s+\d{2}:\d{2})\s*更新/)
  if (!meta) throw new Error('榜单头部元信息未匹配（页面结构可能已改版）')
  const evaluationCount = Number(meta[1])
  const sourceCount = Number(meta[2])
  const sourceUpdatedAt = meta[3]
  const table = pick(/<table\b[^>]*class="lb-ranking-table"[^>]*>([\s\S]*?)<\/table>/, html, '综合榜表格')
  const body = pick(/<tbody[^>]*>([\s\S]*?)<\/tbody>/, table, '榜单内容')
  const rows = [...body.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/g)]
  if (rows.length < MIN_ROWS) throw new Error(`榜单行数异常：仅解析到 ${rows.length} 行（预期 ≥ ${MIN_ROWS}）`)
  const text = (s) => decodeEntities(s.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
  const models = rows.map(([_, block], i) => {
    const cell = (cls) => pick(new RegExp(`<td\\b[^>]*class="${cls}"[^>]*>([\\s\\S]*?)<\\/td>`), block, `${cls}#${i}`)
    const rank = Number(text(cell('lb-rank-number')))
    const model = cell('lb-name-cell')
    const slug = pick(/href="\/leaderboard\/([a-z0-9-]+)"/, model, `slug#${i}`)
    const name = text(pick(/<strong[^>]*>([\s\S]*?)<\/strong>/, model, `name#${i}`))
    const provider = text(pick(/<small[^>]*>([\s\S]*?)<\/small>/, model, `provider#${i}`))
    const releaseDate = text(cell('lb-release-cell'))
    const evidence = cell('lb-evidence-cell')
    const evidenceCount = Number(pick(/(\d+)\s*项评测/, text(evidence), `evidenceCount#${i}`))
    const evidenceStatus = text(pick(/<small[^>]*>([\s\S]*?)<\/small>/, evidence, `evidenceStatus#${i}`))
    const prices = [...block.matchAll(/<td\b[^>]*class="lb-price-cell"[^>]*>([\s\S]*?)<\/td>/g)].map(m => text(m[1]))
    if (prices.length !== 3 || prices.some(p => !/^(?:¥[\d,]+(?:\.\d+)?|—|暂无)$/.test(p))) throw new Error(`价格字段异常#${i}`)
    const [cachePrice, inputPrice, outputPrice] = prices.map(p => /^(—|暂无)$/.test(p) ? null : p)
    const score = Number(pick(/<strong[^>]*>([\d.]+)<\/strong>/, cell('lb-score-cell'), `score#${i}`))
    if (!Number.isFinite(score) || score < 0 || score > 100 || !Number.isInteger(evidenceCount) || evidenceCount > evaluationCount || !/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) throw new Error(`模型字段异常#${i}`)
    return { rank, slug, name, provider, releaseDate, evidenceCount, evidenceStatus, cachePrice, inputPrice, outputPrice, score }
  })
  if (models.some((m, i) => m.rank !== i + 1) || new Set(models.map(m => m.slug)).size !== models.length) throw new Error('榜单名次不连续或模型重复，解析结果不可信')
  if (sourceCount < 1 || evaluationCount < 1) throw new Error('榜单来源数量异常')
  return { sourceCount, evaluationCount, sourceUpdatedAt, models }
}

async function main() {
  const hadExisting = existsSync(OUT_FILE)
  try {
    const html = await fetchHtml(PAGE_URL)
    const { sourceCount, evaluationCount, sourceUpdatedAt, models } = parse(html)

    const data = {
      source: 'AIHOT 模型榜',
      sourceUrl: PAGE_URL,
      rulesUrl: RULES_URL,
      sourceCount,
      evaluationCount,
      sourceUpdatedAt,
      syncedAt: new Date().toISOString(),
      models,
    }

    mkdirSync(DATA_DIR, { recursive: true })
    writeFileSync(TMP_FILE, JSON.stringify(data, null, 2) + '\n')
    renameSync(TMP_FILE, OUT_FILE)
    console.log(`✅ 榜单已同步：${models.length} 个模型，综合 ${sourceCount} 家来源，原榜更新于 ${sourceUpdatedAt}`)
    console.log(`   第 1 名：${models[0].name}（共识指数 ${models[0].score}）`)
  } catch (err) {
    console.error(`::error::榜单同步失败${hadExisting ? '，保留上一份数据' : ''}：${err.message}`)
    process.exitCode = 1
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === realpathSync(resolve(process.argv[1]))) main()
