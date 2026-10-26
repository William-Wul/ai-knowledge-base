import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { assessHealth, createSnapshot, latestSourceDate, validateSnapshot } from '../scripts/check-site-health.mjs'

const now = Date.parse('2026-10-27T04:00:00Z')
const snapshot = () => ({
  schemaVersion: 1, builtAt: new Date(now).toISOString(),
  daily: { date: '2026-10-27', sha256: 'a'.repeat(64) },
  leaderboard: { syncedAt: '2026-10-27T03:30:00.000Z', sourceUpdatedAt: '10/27 08:20', sha256: 'b'.repeat(64) },
})
function check(local = snapshot(), live = snapshot(), sourceDate = '2026-10-27') {
  return assessHealth({ local, live, sourceDate, now,
    hotHtml: `<h1>🔥 AI 日报 · ${live.daily.date}</h1>`,
    rankingHtml: `<div class="mr" data-synced-at="${live.leaderboard.syncedAt}"></div>`,
  })
}

test('最新数据正常；凌晨尚未出刊时不要求必须存在当天日报', () => {
  assert.deepEqual(check(), [])
  const local = snapshot(); local.daily.date = '2026-10-26'
  assert.deepEqual(check(local, structuredClone(local), '2026-10-26'), [])
})

test('发现上游已有新日报、仓库已更新但线上部署没有更新', () => {
  const live = snapshot(); live.daily.date = '2026-10-13'
  live.leaderboard.syncedAt = '2026-10-13T10:29:10.722Z'
  const issues = check(snapshot(), live)
  assert(issues.some(issue => issue.includes('落后于上游')))
  assert(issues.some(issue => issue.includes('仓库日报') && issue.includes('尚未上线')))
  assert(issues.some(issue => issue.includes('仓库榜单已更新')))
  assert(issues.some(issue => issue.includes('超过 48 小时')))
})

test('同日内容修订以及静态页面与快照混用旧版本均能被发现', () => {
  const local = snapshot(); local.daily.sha256 = 'c'.repeat(64)
  local.leaderboard.sha256 = 'd'.repeat(64)
  assert(check(local).some(issue => issue.includes('日报已有修订')))
  assert(check(local).some(issue => issue.includes('榜单数据与仓库不一致')))
  const issues = assessHealth({ local: snapshot(), live: snapshot(), sourceDate: '2026-10-27', now,
    hotHtml: '<nav>2026-10-27</nav><h1>AI 日报 · 2026-10-13</h1>',
    rankingHtml: '<div data-synced-at="2026-10-13T10:29:10.722Z"></div>',
  })
  assert(issues.some(issue => issue.includes('日报正文')))
  assert(issues.some(issue => issue.includes('榜单正文')))
})

test('拒绝缺少字段、伪造的未来时间、错误日期和损坏的上游列表', () => {
  assert.throws(() => validateSnapshot({}, now), /结构异常/)
  const future = snapshot(); future.leaderboard.syncedAt = '2027-01-01T00:00:00Z'
  assert.throws(() => validateSnapshot(future, now), /未来/)
  const bad = snapshot(); bad.daily.date = '2026-02-30'
  assert.throws(() => validateSnapshot(bad, now), /结构异常/)
  assert.throws(() => latestSourceDate({ schemaVersion: 1, items: [] }), /无效/)
  assert.throws(() => latestSourceDate({ schemaVersion: 1, items: [{ date: '2026-02-30' }] }), /无效/)
  assert.equal(latestSourceDate({ schemaVersion: 1, items: [{ date: '2026-10-26' }, { date: '2026-10-27' }] }), '2026-10-27')
})

test('生成快照校验日报入口，内容变化会改变指纹而不依赖新闻数量', () => {
  const root = mkdtempSync(join(tmpdir(), 'site-health-'))
  try {
    mkdirSync(join(root, 'docs/hot'), { recursive: true })
    mkdirSync(join(root, 'docs/.vitepress/data'), { recursive: true })
    writeFileSync(join(root, 'docs/hot/index.md'), '---\ndate: 2026-10-27\n---\n')
    const file = join(root, 'docs/hot/2026-10-27.md')
    writeFileSync(file, '# 今日安静，无大事发生\n')
    writeFileSync(join(root, 'docs/.vitepress/data/leaderboard.json'), JSON.stringify(snapshot().leaderboard))
    const before = createSnapshot(root, now)
    assert.equal(before.daily.date, '2026-10-27')
    writeFileSync(file, '# 来源修订后的说明\n')
    assert.notEqual(createSnapshot(root, now).daily.sha256, before.daily.sha256)
    writeFileSync(join(root, 'docs/hot/index.md'), '---\ndate: 2026-10-26\n---\n')
    assert.throws(() => createSnapshot(root, now), /入口与最新详情日期不一致/)
  } finally { rmSync(root, { recursive: true, force: true }) }
})
