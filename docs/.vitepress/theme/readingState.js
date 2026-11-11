// 阅读布局的共享状态:侧栏折叠 + 沉浸阅读。
// SidebarHeader(侧栏顶部一行)和 ReadingControls(浮动控件)都读写这里,
// 真正的布局切换靠 html 上的两个类,CSS 据此重排。
import { ref } from 'vue'

const SIDEBAR_KEY = 'kb_sidebar_collapsed'
const ZEN_KEY = 'kb_zen'

export const collapsed = ref(false)
export const zen = ref(false)

function applyClasses() {
  if (typeof document === 'undefined') return
  const el = document.documentElement
  el.classList.toggle('kb-sidebar-collapsed', collapsed.value)
  el.classList.toggle('kb-zen', zen.value)
}

function readFlag(key) {
  try { return typeof localStorage !== 'undefined' && localStorage.getItem(key) === '1' } catch { return false }
}

function writeFlag(key, enabled) {
  try { if (typeof localStorage !== 'undefined') localStorage.setItem(key, enabled ? '1' : '') } catch {}
}

export function initReadingState() {
  collapsed.value = readFlag(SIDEBAR_KEY)
  zen.value = readFlag(ZEN_KEY)
  applyClasses()
}

export function toggleSidebar() {
  collapsed.value = !collapsed.value
  writeFlag(SIDEBAR_KEY, collapsed.value)
  applyClasses()
}

export function toggleZen() {
  zen.value = !zen.value
  writeFlag(ZEN_KEY, zen.value)
  applyClasses()
}

export function openSearch() {
  if (typeof document === 'undefined') return
  const btn = document.querySelector('.DocSearch-Button')
  if (btn) btn.click()
}
