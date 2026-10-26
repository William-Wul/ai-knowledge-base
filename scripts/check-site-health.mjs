#!/usr/bin/env node
// 构建时生成公开数据时间快照；巡检时核对上游、仓库、部署快照和实际页面。
// npm run check:online 只读检查，不触发同步或部署，不依赖 npm 安装。
import { readFileSync, readdirSync, writeFileSync, realpathSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SITE = 'https://ailinkstart.com'
const SOURCE = 'https://aihot.news/api/v1/dailies'
const MAX_AGE = 48 * 3600_000
const CLOCK_SKEW = 5 * 60_000
const hash = text => createHash('sha256').update(text).digest('hex')

function validDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && Number.isFinite(Date.parse(`${value}T00:00:00Z`))
    && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value
}

export function validateSnapshot(snapshot, now = Date.now()) {
  if (snapshot?.schemaVersion !== 1 || !validDate(snapshot.daily?.date)
    || ![snapshot.daily?.sha256, snapshot.leaderboard?.sha256].every(value => /^[a-f0-9]{64}$/.test(value || ''))
    || typeof snapshot.leaderboard?.sourceUpdatedAt !== 'string'
    || !/^\d{2}\/\d{2}\s+\d{2}:\d{2}$/.test(snapshot.leaderboard.sourceUpdatedAt)) {
    throw new Error('运行快照结构异常')
  }
  for (const value of [snapshot.builtAt, snapshot.leaderboard.syncedAt]) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T.*Z$/.test(value)
      || !Number.isFinite(Date.parse(value)) || Date.parse(value) > now + CLOCK_SKEW) {
      throw new Error('运行快照时间无效或位于未来')
    }
  }
  const today = new Date(now + 8 * 3600_000).toISOString().slice(0, 10)
  if (snapshot.daily.date > today) throw new Error('运行快照日报日期位于未来')
  return snapshot
}

export function createSnapshot(root = ROOT, now = Date.now()) {
  const hot = join(root, 'docs/hot')
  const files = readdirSync(hot).filter(file => /^20\d{2}-\d{2}-\d{2}\.md$/.test(file)).sort()
  if (!files.length) throw new Error('本地日报为空')
  const date = files.at(-1).slice(0, -3)
  const index = readFileSync(join(hot, 'index.md'), 'utf8')
  if (!new RegExp(`^date: ${date}\\s*$`, 'm').test(index)) throw new Error('日报入口与最新详情日期不一致')
  const rankingText = readFileSync(join(root, 'docs/.vitepress/data/leaderboard.json'), 'utf8')
  const ranking = JSON.parse(rankingText)
  return validateSnapshot({
    schemaVersion: 1,
    builtAt: new Date(now).toISOString(),
    daily: { date, sha256: hash(index + '\n' + readFileSync(join(hot, `${date}.md`), 'utf8')) },
    leaderboard: { syncedAt: ranking.syncedAt, sourceUpdatedAt: ranking.sourceUpdatedAt, sha256: hash(rankingText) },
  }, now)
}

export function latestSourceDate(payload) {
  if (payload?.schemaVersion !== 1 || !Array.isArray(payload.items) || !payload.items.length
    || payload.items.some(item => !validDate(item?.date))) throw new Error('上游日报列表无效')
  return payload.items.map(item => item.date).sort().at(-1)
}

export function assessHealth({ local, live, sourceDate, hotHtml, rankingHtml, now = Date.now() }) {
  validateSnapshot(local, now)
  validateSnapshot(live, now)
  if (!validDate(sourceDate)) throw new Error('上游日报日期无效')
  const issues = []
  if (live.daily.date < sourceDate) issues.push(`线上日报 ${live.daily.date} 落后于上游 ${sourceDate}`)
  if (local.daily.date > live.daily.date) issues.push(`仓库日报 ${local.daily.date} 尚未上线`)
  if (local.daily.date === live.daily.date && local.daily.sha256 !== live.daily.sha256) issues.push('同一期日报已有修订尚未上线')
  if (Date.parse(live.leaderboard.syncedAt) < Date.parse(local.leaderboard.syncedAt)) issues.push('仓库榜单已更新但尚未上线')
  if (local.leaderboard.syncedAt === live.leaderboard.syncedAt && local.leaderboard.sha256 !== live.leaderboard.sha256) issues.push('榜单数据与仓库不一致')
  if (now - Date.parse(live.leaderboard.syncedAt) > MAX_AGE) issues.push('线上榜单超过 48 小时未同步')
  if (now - Date.parse(`${sourceDate}T00:00:00+08:00`) > 3 * 86400_000) issues.push('上游日报已超过三天未出刊，需人工核查来源')
  const heading = hotHtml?.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]*>/g, ' ')
  if (!heading?.includes(live.daily.date)) issues.push('线上日报正文与部署快照不一致')
  if (!rankingHtml?.includes(`data-synced-at="${live.leaderboard.syncedAt}"`)) issues.push('线上榜单正文与部署快照不一致')
  return issues
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { 'Cache-Control': 'no-cache', 'User-Agent': 'AILinkStart-health-check/1.0' },
    signal: AbortSignal.timeout(30_000),
  })
  if (!response.ok) throw new Error(`HTTP ${response.status} ${url}`)
  return response.text()
}

async function main() {
  const local = createSnapshot()
  if (process.argv.includes('--write')) {
    writeFileSync(join(ROOT, 'docs/.vitepress/dist/site-health.json'), JSON.stringify(local, null, 2) + '\n')
    console.log(`运行快照已生成：日报 ${local.daily.date}；榜单 ${local.leaderboard.syncedAt}`)
    return
  }
  const bust = Math.floor(Date.now() / 60_000)
  const [sourceText, liveText, hotHtml, rankingHtml] = await Promise.all([
    fetchText(SOURCE), fetchText(`${SITE}/site-health.json?check=${bust}`),
    fetchText(`${SITE}/hot/?check=${bust}`), fetchText(`${SITE}/model-ranking/?check=${bust}`),
  ])
  const sourceDate = latestSourceDate(JSON.parse(sourceText))
  const live = JSON.parse(liveText)
  const issues = assessHealth({ local, live, sourceDate, hotHtml, rankingHtml })
  console.log(`上游日报 ${sourceDate}；仓库 ${local.daily.date}；线上 ${live.daily?.date}`)
  console.log(`线上榜单同步于 ${live.leaderboard?.syncedAt}`)
  if (issues.length) throw new Error(issues.join('；'))
  console.log('通过：日报、榜单及线上页面与已发布数据一致。')
}

if (process.argv[1] && fileURLToPath(import.meta.url) === realpathSync(resolve(process.argv[1]))) {
  main().catch(error => {
    console.error(`::error::网站运行检查失败：${error.message}`)
    process.exitCode = 1
  })
}
