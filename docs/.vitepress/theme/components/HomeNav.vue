<template>
  <nav class="home-nav">
    <div class="nav-inner">
      <a class="brand" href="/">AI 学习知识库</a>
      <button class="nav-search" @click="triggerSearch" aria-label="打开搜索">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
        </svg>
        <span>搜索</span>
        <span class="kbd">{{ shortcutKey }}</span>
      </button>
      <ul class="nav-links">
        <li class="has-dropdown" @mouseenter="dropdownOpen = true" @mouseleave="dropdownOpen = false">
          <a class="has-caret" href="/stage-1/">学习路径</a>
          <ul v-show="dropdownOpen" class="dropdown">
            <li v-for="s in stages" :key="s.link">
              <a :href="s.link">{{ s.label }}</a>
            </li>
          </ul>
        </li>
        <li><a href="/exams/">学习测试</a></li>
        <li><a href="/news/">AI 新闻</a></li>
        <li><a href="/frontier/">AI 前沿</a></li>
        <li><a href="/coding/">AI 编程</a></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const dropdownOpen = ref(false)
const isMac = ref(true)

onMounted(() => {
  isMac.value = /Mac|iPhone|iPod|iPad/i.test(navigator.platform)
})

const shortcutKey = computed(() => isMac.value ? '⌘ K' : 'Ctrl K')

const stages = [
  { label: '🧠 阶段一 · 快速认知',    link: '/stage-1/' },
  { label: '🛠️ 阶段二 · 零基础上手',  link: '/stage-2/' },
  { label: '🔬 阶段三 · AI 进阶概念', link: '/stage-3/' },
  { label: '💼 阶段四 · 工作场景实战', link: '/stage-4/' },
  { label: '🤖 阶段五 · AI Agent 使用', link: '/stage-5/' },
  { label: '🚀 阶段六 · AI 创意与创业', link: '/stage-6/' },
]

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
.nav-inner {
  max-width: 1400px; margin: 0 auto;
  padding: 14px 40px;
  display: flex; align-items: center; gap: 24px;
  height: 64px;
}
.brand {
  font-family: var(--font-serif);
  font-weight: 700; font-size: 18px;
  color: var(--green-900);
  letter-spacing: 0.02em;
  flex-shrink: 0;
  text-decoration: none;
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
.nav-links > li { position: relative; }
.nav-links a {
  display: inline-block;
  padding: 7px 13px; border-radius: 8px;
  color: var(--ink-soft);
  font-size: 14px; font-weight: 500;
  transition: all 0.18s ease;
  text-decoration: none;
}
.nav-links a:hover {
  color: var(--green-900);
  background: var(--green-100);
}
.nav-links a.has-caret::after {
  content: '';
  display: inline-block; margin-left: 5px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid currentColor;
  opacity: 0.5;
  vertical-align: middle;
}

.dropdown {
  position: absolute;
  top: 100%; left: 0;
  margin-top: 6px;
  min-width: 240px;
  background: white;
  border: 1px solid var(--line);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(31, 67, 50, 0.12);
  padding: 6px;
  list-style: none;
  margin-block: 0;
  padding-inline-start: 6px;
  padding-inline-end: 6px;
}
.dropdown a {
  display: block;
  padding: 9px 12px;
  font-size: 13.5px;
  color: var(--ink-soft);
  border-radius: 6px;
  white-space: nowrap;
}
.dropdown a:hover {
  background: var(--green-100);
  color: var(--green-900);
}

@media (max-width: 960px) {
  .nav-inner { padding: 12px 20px; gap: 12px; }
  .nav-search { display: none; }
  .nav-links a { padding: 6px 10px; font-size: 13px; }
  .nav-links > li:not(.has-dropdown) a { display: none; }
}
</style>
