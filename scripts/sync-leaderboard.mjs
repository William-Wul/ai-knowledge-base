#!/usr/bin/env node
// 同步 AIHOT 模型榜（站内称「AI 模型排行榜」）到 docs/.vitepress/data/leaderboard.json
// 数据源：https://aihot.virxact.com/leaderboard（公开页面，前 30 名 SSR 在 HTML 中）
// 官方 v1 API 暂无榜单端点（2026-08-10 核实），本脚本按公开页面结构解析；
// 对方页面改版导致解析失败时：保留上一份数据、构建不中断（输出 warning）。
// 用法：
//   npm run sync:leaderboard      同步一次
//   node scripts/sync-leaderboard.mjs

import { writeFileSync, existsSync, renameSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
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

function parse(html) {
  // 榜单头部元信息：综合 <strong>10</strong> 家公开榜单 / 更新于 <!-- -->8月10日 08:20
  const meta = html.match(/综合\s*<strong>(\d+)<\/strong>\s*家公开榜单<\/span><span>更新于\s*(?:<!--\s*-->)?([^<]+)</)
  if (!meta) throw new Error('榜单头部元信息未匹配（页面结构可能已改版）')
  const sourceCount = Number(meta[1])
  const sourceUpdatedAt = decodeEntities(meta[2])

  const rows = [...html.matchAll(/<a class="lb-row" role="row" href="(\/leaderboard\/[^"]+)">([\s\S]*?)<\/a>/g)]
  if (rows.length < MIN_ROWS) throw new Error(`榜单行数异常：仅解析到 ${rows.length} 行（预期 ≥ ${MIN_ROWS}）`)

  const models = rows.map((r, i) => {
    const slug = r[1].replace(/^\/leaderboard\//, '')
    const block = r[2]

    const rank = Number(pick(/lb-rank[^"]*"[^>]*><b>(\d+)<\/b>/, block, `rank#${i}`))
    const name = pick(/lb-model-copy"><strong>([\s\S]*?)<\/strong><small>/, block, `name#${i}`)
    const provider = pick(/lb-model-copy"><strong>[\s\S]*?<\/strong><small>([\s\S]*?)<\/small>/, block, `provider#${i}`)
    const releaseDate = pick(/lb-release-date"[^>]*><small>上线<\/small><strong>([\s\S]*?)<\/strong>/, block, `releaseDate#${i}`)
    const completeness = Number(pick(/lb-completeness"[^>]*[\s\S]*?<strong>([\d.]+)%<\/strong>/, block, `completeness#${i}`))
    const score = Number(pick(/lb-score"[^>]*><strong>([\d.]+)<\/strong>/, block, `score#${i}`))

    // 价格可能为「暂无」（<span class="lb-metadata-empty">暂无</span>），此时两个 <strong> 都抓不到
    let inputPrice = null
    let outputPrice = null
    const pricingBlock = block.match(/lb-pricing"[^>]*>([\s\S]*?)<\/span><\/span>/)
    if (pricingBlock) {
      const prices = [...pricingBlock[1].matchAll(/<strong>([\s\S]*?)<\/strong>/g)].map(m => decodeEntities(m[1]))
      if (prices.length >= 2) [inputPrice, outputPrice] = prices
    }

    return { rank, slug, name, provider, releaseDate, completeness, inputPrice, outputPrice, score }
  })

  // 基本完整性校验：名次应连续且从 1 开始
  if (models[0].rank !== 1 || models.some((m, i) => i > 0 && m.rank !== models[i - 1].rank + 1)) {
    throw new Error('榜单名次不连续，解析结果不可信')
  }

  return { sourceCount, sourceUpdatedAt, models }
}

async function main() {
  const hadExisting = existsSync(OUT_FILE)
  try {
    const html = await fetchHtml(PAGE_URL)
    const { sourceCount, sourceUpdatedAt, models } = parse(html)

    const data = {
      source: 'AIHOT 模型榜',
      sourceUrl: PAGE_URL,
      rulesUrl: RULES_URL,
      sourceCount,
      sourceUpdatedAt,
      syncedAt: new Date().toISOString(),
      models,
    }

    mkdirSync(DATA_DIR, { recursive: true })
    writeFileSync(TMP_FILE, JSON.stringify(data, null, 2) + '\n')
    renameSync(TMP_FILE, OUT_FILE)
    console.log(`✅ 榜单已同步：${models.length} 个模型，综合 ${sourceCount} 家来源，原榜更新于 ${sourceUpdatedAt}`)
    console.log(`   第 1 名：${models[0].name}（共识分 ${models[0].score}）`)
  } catch (err) {
    if (existsSync(TMP_FILE)) { /* 残留临时文件不处理，下次覆盖 */ }
    if (hadExisting) {
      // 保留上一份数据，构建不中断；GitHub Actions 会显示为 warning
      console.log(`::warning::榜单同步失败，保留上一份数据：${err.message}`)
      console.log(`⚠️  ${err.message}（保留上一份数据）`)
      process.exit(0)
    }
    console.error(`❌ 榜单同步失败且没有可回退的旧数据：${err.message}`)
    process.exit(1)
  }
}

main()
