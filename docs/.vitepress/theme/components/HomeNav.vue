<template>
  <nav class="home-nav">
    <div class="nav-inner">
      <a class="brand" href="/">
        <svg viewBox="9 7 41 43" width="19" height="20" aria-hidden="true">
          <rect x="13" y="10" width="9" height="36" rx="2.5" fill="#1f4332" />
          <rect x="25" y="10" width="9" height="36" rx="2.5" fill="#3a7050" />
          <rect x="38" y="14" width="7" height="32" rx="2.5" transform="rotate(12 41.5 30)" fill="#6dbf8a" />
        </svg>
        <span>AI 学习知识库</span>
      </a>
      <button class="nav-search" @click="triggerSearch" aria-label="打开搜索">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
        </svg>
        <span>搜索</span>
        <span class="kbd">{{ shortcutKey }}</span>
      </button>
      <ul class="nav-links">
        <li><a href="/hot/">AI 最新动态</a></li>
        <li><a href="/stage-1/">AI 基础学习</a></li>
        <li><a href="/stage-4/">AI 进阶实践</a></li>
        <li><a href="/exams/">AI 能力自测</a></li>
        <li><a href="/vocab-book">AI 学习词汇本</a></li>
      </ul>
      <button
        class="nav-theme"
        type="button"
        :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
        :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
        @click="toggleTheme"
      >
        <svg v-if="!isDark" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8" />
          <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <line x1="12" y1="3" x2="12" y2="5.2" />
            <line x1="12" y1="18.8" x2="12" y2="21" />
            <line x1="3" y1="12" x2="5.2" y2="12" />
            <line x1="18.8" y1="12" x2="21" y2="12" />
            <line x1="5.6" y1="5.6" x2="7.2" y2="7.2" />
            <line x1="16.8" y1="16.8" x2="18.4" y2="18.4" />
            <line x1="5.6" y1="18.4" x2="7.2" y2="16.8" />
            <line x1="16.8" y1="7.2" x2="18.4" y2="5.6" />
          </g>
        </svg>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData } from 'vitepress'

const { isDark } = useData()
const toggleTheme = () => { isDark.value = !isDark.value }

const isMac = ref(true)

onMounted(() => {
  isMac.value = /Mac|iPhone|iPod|iPad/i.test(navigator.platform)
})

const shortcutKey = computed(() => isMac.value ? '⌘ K' : 'Ctrl K')

function triggerSearch() {
  const btn = document.querySelector('.VPNavBarSearch .DocSearch-Button, .VPNavBarSearch button')
  if (btn) {
    btn.click()
    return
  }
  const event = new KeyboardEvent('keydown', {
    key: 'k',
    code: 'KeyK',
    metaKey: isMac.value,
    ctrlKey: !isMac.value,
    bubbles: true,
  })
  window.dispatchEvent(event)
}
</script>

<style scoped>
.home-nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(242, 247, 239, 0.72);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
  backdrop-filter: saturate(180%) blur(14px);
  border-bottom: 1px solid var(--line);
}
/* 深色下导航栏背景融入夜景 */
.dark .home-nav {
  background: rgba(19, 28, 22, 0.72);
}
.nav-inner {
  max-width: 1400px; margin: 0 auto;
  padding: 14px 40px;
  display: flex; align-items: center; gap: 24px;
  height: 64px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-serif);
  font-weight: 700; font-size: 18px;
  color: var(--green-900);
  letter-spacing: 0.02em;
  flex-shrink: 0;
  text-decoration: none;
}
.brand svg {
  flex-shrink: 0;
}
.nav-search {
  display: flex; align-items: center; gap: 10px;
  padding: 7px 14px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--line);
  border-radius: 10px;
  color: var(--ink-mute);
  font-size: 13px;
  cursor: pointer;
  min-width: 220px;
  transition: all 0.2s ease;
  font-family: inherit;
}
.nav-search:hover { border-color: var(--green-400); background: white; }
.dark .nav-search {
  background: rgba(31, 46, 36, 0.6);
  color: var(--ink-mute);
}
.dark .nav-search:hover { background: rgba(40, 58, 44, 0.8); }
.nav-search .kbd {
  margin-left: auto;
  font-family: var(--font-mono); font-size: 10.5px;
  padding: 1px 6px; border-radius: 4px;
  background: var(--green-100); color: var(--green-800);
  border: 1px solid var(--green-200);
}
.nav-links {
  margin-left: auto;
  display: flex; align-items: center; gap: 2px;
  list-style: none;
  margin-block: 0;
  padding-inline-start: 0;
}
.nav-links > li { position: relative; flex-shrink: 0; }
.nav-links a {
  display: inline-block;
  padding: 7px 13px; border-radius: 8px;
  color: var(--ink-soft);
  font-size: 14px; font-weight: 500;
  transition: all 0.18s ease;
  text-decoration: none;
  white-space: nowrap;
}
.nav-links a:hover {
  color: var(--green-900);
  background: var(--green-100);
}
/* 深浅切换按钮：和导航链接同一视觉节奏（圆角方块、同 hover 色），
   尺寸对齐 nav-links 行高，图标 16px 与链接文字视觉重心齐平 */
.nav-theme {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px; height: 34px;
  margin-left: 4px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.18s ease;
}
.nav-theme:hover {
  color: var(--green-900);
  background: var(--green-100);
}

@media (max-width: 960px) {
  .nav-inner { padding: 12px 20px; gap: 12px; }
  .nav-search { display: none; }
  /* 窄屏下链接可横向滑动，不再整体隐藏 */
  .nav-links { overflow-x: auto; scrollbar-width: none; }
  .nav-links::-webkit-scrollbar { display: none; }
  .nav-links a { padding: 6px 9px; font-size: 12.5px; }
}
</style>
