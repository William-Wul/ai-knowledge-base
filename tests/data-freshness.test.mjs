import test from 'node:test'
import assert from 'node:assert/strict'
import { formatSyncTime, isDailyStale, isTimestampStale } from '../docs/.vitepress/theme/dataFreshness.js'

test('ranking becomes stale after 48 hours and rejects missing or malformed timestamps', () => {
  const date = '2026-10-09T02:00:00Z'
  const now = Date.parse(date)
  assert.equal(isTimestampStale(date, now + 2 * 86400_000), false)
  assert.equal(isTimestampStale(date, now + 2 * 86400_000 + 1), true)
  assert.equal(isTimestampStale('not a date', now), true)
  assert.equal(isTimestampStale(undefined, now), true)
  assert.equal(isTimestampStale(date, now - 1000), false)
})

test('daily freshness uses dates in China time and flags more than two days of missing updates', () => {
  const beforeMidnight = Date.parse('2026-10-08T15:59:59Z')
  const afterMidnight = Date.parse('2026-10-08T16:00:00Z')
  assert.equal(isDailyStale('2026-10-06', beforeMidnight), false)
  assert.equal(isDailyStale('2026-10-06', afterMidnight), true)
  assert.equal(isDailyStale('2026-10-09', afterMidnight), false)
  assert.equal(isDailyStale('2026-02-30', afterMidnight), true)
  assert.equal(isDailyStale('', afterMidnight), true)
})

test('sync time explicitly retains year and uses China time regardless of local timezone', () => {
  assert.equal(formatSyncTime('2026-10-08T16:01:00Z'), '2026-10-09 00:01')
  assert.equal(formatSyncTime(''), '日期暂缺')
})
