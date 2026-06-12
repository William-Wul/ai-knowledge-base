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

export function initReadingState() {
  if (typeof localStorage === 'undefined') return
  collapsed.value = localStorage.getItem(SIDEBAR_KEY) === '1'
  zen.value = localStorage.getItem(ZEN_KEY) === '1'
  applyClasses()
}

export function toggleSidebar() {
  collapsed.value = !collapsed.value
  localStorage.setItem(SIDEBAR_KEY, collapsed.value ? '1' : '')
  applyClasses()
}

export function toggleZen() {
  zen.value = !zen.value
  localStorage.setItem(ZEN_KEY, zen.value ? '1' : '')
  applyClasses()
}

export function openSearch() {
  if (typeof document === 'undefined') return
  const btn = document.querySelector('.DocSearch-Button')
  if (btn) btn.click()
}
