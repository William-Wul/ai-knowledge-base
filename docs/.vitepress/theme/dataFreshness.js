const DAY_MS = 86400_000
const DISPLAY_TIME_ZONE = 'Asia/Shanghai'

export function isTimestampStale(value, now = Date.now(), days = 2) {
  const timestamp = Date.parse(value)
  return !Number.isFinite(timestamp) || now - timestamp > days * DAY_MS
}

// 日报只提供日期。按北京时间的自然日判断，避免浏览器时区和发稿时刻影响提示。
export function isDailyStale(value, now = Date.now(), days = 2) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return true
  const date = Date.parse(`${value}T00:00:00+08:00`)
  if (!Number.isFinite(date) || new Date(date + 8 * 3600_000).toISOString().slice(0, 10) !== value) return true
  return Math.floor((now + 8 * 3600_000) / DAY_MS) - Math.floor((date + 8 * 3600_000) / DAY_MS) > days
}

export function formatSyncTime(value) {
  const timestamp = Date.parse(value)
  if (!Number.isFinite(timestamp)) return '日期暂缺'
  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: DISPLAY_TIME_ZONE,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(timestamp))
  const get = type => parts.find(part => part.type === type)?.value || ''
  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}`
}
