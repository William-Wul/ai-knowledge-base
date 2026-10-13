// 学习进度：只存在读者自己浏览器的 localStorage 里，不上传。
// - 读过的文章：打开过即记一次（侧栏打 ✓、模块首页显示「已读 x/y」）
// - 上次阅读：首页「继续上次阅读」入口
// 只统计学习类文章：基础学习、进阶实践、AI 前沿；栏目首页、日报、案例不计。
import { ref } from 'vue'

const READ_KEY = 'kb_read_v1'
const LAST_KEY = 'kb_last_read_v1'

export const readPaths = ref({})
export const lastRead = ref(null)

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback } catch { return fallback }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export function isTrackedPath(path) {
  return /^\/(stage-\d|frontier|news)\/[^/]+$/.test(path) && !/\/index$/.test(path)
}

// 侧栏 ✓：按 href 生成一段样式，比改 VitePress 侧栏组件稳
function renderSidebarMarks() {
  if (typeof document === 'undefined') return
  let el = document.getElementById('kb-read-marks')
  if (!el) {
    el = document.createElement('style')
    el.id = 'kb-read-marks'
    document.head.appendChild(el)
  }
  const selectors = Object.keys(readPaths.value)
    .map(p => `.VPSidebarItem a.link[href="${p}"] .text::after`)
  el.textContent = selectors.length
    ? `${selectors.join(',\n')} { content: " ✓"; color: var(--kb-brand); font-weight: 600; }`
    : ''
}

export function initLearningProgress() {
  if (typeof localStorage === 'undefined') return
  readPaths.value = load(READ_KEY, {})
  lastRead.value = load(LAST_KEY, null)
  renderSidebarMarks()
}

export function recordVisit(path, title) {
  if (typeof localStorage === 'undefined' || !isTrackedPath(path)) return
  const now = Date.now()
  if (!readPaths.value[path]) {
    readPaths.value = { ...readPaths.value, [path]: now }
    save(READ_KEY, readPaths.value)
    renderSidebarMarks()
  }
  lastRead.value = { path, title, at: now }
  save(LAST_KEY, lastRead.value)
}
