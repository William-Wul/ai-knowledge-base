#!/usr/bin/env node
// 同步 AIHOT 公开 API 的 AI 日报到 docs/hot/
// 入口页 /hot/ = 当日完整内容 + 往期 6 天列表
// 用法：
//   npm run sync:hot              全量同步（覆盖现有）
//   node scripts/sync-aihot.mjs   同上

import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const HOT_DIR = join(__dirname, '..', 'docs', 'hot')

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
const API_BASE = 'https://aihot.virxact.com'
const AIHOT_HOMEPAGE = 'https://aihot.virxact.com/'
const AUTHOR_ARTICLE = 'https://mp.weixin.qq.com/s/r6CE2U3Y0-pU05wF3_PuTQ'
const KEEP_DAYS = 7

const SECTION_EMOJI = {
  '模型发布/更新': '🤖',
  '产品发布/更新': '🚀',
  '行业动态': '🌐',
  '论文研究': '📚',
  '技巧与观点': '💡',
}

async function fetchJSON(url) {
  // 30 秒超时：对方接口挂起时及时放弃，避免 CI 干等到任务超时
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30_000) })
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`)
  return res.json()
}

// 外部数据写进 Markdown 前转义 HTML 敏感字符，
// 防止数据源被篡改时往页面里注入可执行代码（XSS）
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function clean(s) {
  return escapeHtml((s || '').replace(/\r/g, '').trim())
}

// 链接只放行 http/https，并转义会破坏 Markdown 链接语法的字符
function safeUrl(u) {
  try {
    const protocol = new URL(String(u)).protocol
    if (protocol !== 'http:' && protocol !== 'https:') return ''
    return String(u).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\s/g, '%20')
  } catch {
    return ''
  }
}

// 清理信源名：去除全角括号包裹的内部备注（保留半角括号，例如 X 用户名 (@username)）
function cleanSource(s) {
  return clean(s).replace(/（[^）]*）/g, '').trim()
}

function renderSections(sections) {
  const lines = []
  for (const section of sections || []) {
    const label = clean(section.label)
    const emoji = SECTION_EMOJI[label] || '📌'
    lines.push(`## ${emoji} ${label}`)
    lines.push('')

    const items = section.items || []
    if (!items.length) {
      lines.push('_（本日此分类无精选条目）_')
      lines.push('')
      continue
    }

    items.forEach((item, idx) => {
      const title = clean(item.title) || '（无标题）'
      const summary = clean(item.summary)
      const url = safeUrl(item.sourceUrl)
      const sourceName = cleanSource(item.sourceName)

      lines.push(`### ${idx + 1}. ${title}`)
      lines.push('')
      if (summary) {
        lines.push(summary)
        lines.push('')
      }
      const meta = []
      if (url) meta.push(`[阅读原文 →](${url})`)
      if (sourceName) meta.push(`来源：${sourceName}`)
      if (meta.length) {
        lines.push(meta.join(' · '))
        lines.push('')
      }
    })

    lines.push('---')
    lines.push('')
  }
  return lines.join('\n')
}

// 单日详情页（往期点进来用）
function dailyToMarkdown(daily) {
  const date = daily.date
  const lines = []
  lines.push('---')
  lines.push(`title: ${date} · AI 日报`)
  lines.push(`description: ${date} AI 行业精选（数据来自 AIHOT）`)
  lines.push(`date: ${date}`)
  lines.push('---')
  lines.push('')
  lines.push(`# ${date} · AI 日报`)
  lines.push('')
  lines.push(`> 📡 本期内容由 [AIHOT](${AIHOT_HOMEPAGE}) 自动同步 · 数据精选由数字生命卡兹克维护 · 完整精选请访问 [aihot.virxact.com](${AIHOT_HOMEPAGE})`)
  lines.push('')
  lines.push('---')
  lines.push('')
  lines.push(renderSections(daily.sections))
  lines.push(`[← 返回 AI 日报](./)`)
  lines.push('')
  return lines.join('\n')
}

// 入口页 = 今日完整内容 + 往期列表（6 天）
function indexToMarkdown(latestDaily, otherMetas) {
  const date = latestDaily.date
  const lines = []
  lines.push('---')
  lines.push('title: AI 日报')
  lines.push(`description: ${date} AI 行业精选 · 由 AIHOT 同步`)
  lines.push(`date: ${date}`)
  lines.push('---')
  lines.push('')
  lines.push(`# 🔥 AI 日报 · ${date}`)
  lines.push('')
  lines.push(`> 📡 本期内容由 [AIHOT](${AIHOT_HOMEPAGE}) 自动同步 · 数据精选由数字生命卡兹克维护 · 完整精选请访问 [aihot.virxact.com](${AIHOT_HOMEPAGE})`)
  lines.push('')
  lines.push('---')
  lines.push('')
  lines.push(renderSections(latestDaily.sections))

  if (otherMetas.length) {
    lines.push(`## 📅 往期日报`)
    lines.push('')
    for (const d of otherMetas) {
      const lead = d.leadTitle ? ` — ${clean(d.leadTitle)}` : ''
      lines.push(`- [${d.date}](./${d.date})${lead}`)
    }
    lines.push('')
  }

  lines.push('---')
  lines.push('')
  lines.push(`> 数据精选策略由 AIHOT 维护（5 维度打分 + 公式权重 + 事件聚类）。如需了解信源筛选 / 评分机制，可阅读[作者介绍原文](${AUTHOR_ARTICLE})。`)
  lines.push('')

  return lines.join('\n')
}

async function main() {
  if (!existsSync(HOT_DIR)) mkdirSync(HOT_DIR, { recursive: true })

  console.log('→ 拉取 AIHOT 归档列表 /api/public/dailies')
  const list = await fetchJSON(`${API_BASE}/api/public/dailies`)
  const all = Array.isArray(list.items) ? list.items : []
  if (!all.length) {
    console.error('❌ 归档列表为空，停止')
    process.exit(1)
  }
  console.log(`  归档共 ${all.length} 期，本地保留最近 ${KEEP_DAYS} 期`)

  // 日期会用作本地文件名，只接受 YYYY-MM-DD 格式，防止异常数据写到目录之外
  const valid = all.filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d.date || ''))
  const sortedDesc = [...valid].sort((a, b) => b.date.localeCompare(a.date))
  const keep = sortedDesc.slice(0, KEEP_DAYS)

  console.log(`→ 拉取保留期详情（${keep.length} 期）`)
  const details = []
  for (const meta of keep) {
    const date = meta.date
    process.stdout.write(`  ${date} ... `)
    try {
      const detail = await fetchJSON(`${API_BASE}/api/public/daily/${date}`)
      details.push({ meta, detail })
      console.log('✓')
    } catch (err) {
      console.log(`✗ ${err.message}`)
    }
  }

  if (!details.length) {
    console.error('❌ 没有任何一期拉取成功')
    process.exit(1)
  }

  console.log('→ 写入单日详情页')
  for (const { meta, detail } of details) {
    writeFileSync(join(HOT_DIR, `${meta.date}.md`), dailyToMarkdown(detail), 'utf-8')
  }

  console.log('→ 写入入口页 hot/index.md（=今日完整内容 + 往期列表）')
  const [latest, ...others] = details
  const otherMetas = others.map(o => o.meta)
  writeFileSync(join(HOT_DIR, 'index.md'), indexToMarkdown(latest.detail, otherMetas), 'utf-8')

  console.log(`→ 保留历史日报文件（入口页只展示最近 ${KEEP_DAYS} 期）`)

  console.log(`\n✅ 完成 · 入口页 = ${latest.meta.date} · 往期 ${otherMetas.length} 期`)
}

main().catch(err => {
  console.error('❌ 同步失败：', err.stack || err.message)
  process.exit(1)
})
