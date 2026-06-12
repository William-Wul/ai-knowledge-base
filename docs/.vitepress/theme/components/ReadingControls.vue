<template>
  <div v-if="!isHome" class="kb-reading-controls">
    <!-- 侧栏收起后,左上角留一个同款图标用来找回侧栏 -->
    <button
      v-show="collapsed && !zen"
      class="kb-sb-reopen"
      type="button"
      title="展开侧边栏"
      aria-label="展开侧边栏"
      @click="toggleSidebar"
    >
      <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6" />
        <line x1="9.5" y1="4.5" x2="9.5" y2="19.5" stroke="currentColor" stroke-width="1.6" />
      </svg>
    </button>

    <!-- 沉浸模式的退出按钮;按 Esc 也能退出 -->
    <button
      v-show="zen"
      class="kb-zen-exit"
      type="button"
      aria-label="退出沉浸阅读"
      title="退出沉浸阅读（Esc）"
      @click="toggleZen"
    >
      <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
        <path d="M4 9h5V4M20 9h-5V4M4 15h5v5M20 15h-5v5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'
import { collapsed, zen, initReadingState, toggleSidebar, toggleZen } from '../readingState.js'

const { frontmatter } = useData()
// 凡是没有侧栏的页面(首页是 layout:page + sidebar:false)都不需要阅读控件
const isHome = computed(() => {
  const fm = frontmatter.value || {}
  return fm.layout === 'home' || fm.layout === 'page' || fm.sidebar === false
})

const onKeydown = (e) => {
  if (e.key === 'Escape' && zen.value) toggleZen()
}

onMounted(() => {
  initReadingState()
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
/* 全部控件只在桌面端出现:窄屏布局未改动 */
.kb-sb-reopen,
.kb-zen-exit {
  display: none;
}

@media (min-width: 960px) {
  .kb-sb-reopen {
    position: fixed;
    top: 14px;
    left: 16px;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--vp-c-text-3);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 30;
    transition: color 0.2s, background 0.2s;
  }
  .kb-sb-reopen:hover {
    color: var(--vp-c-brand-1);
    background: var(--vp-c-bg-soft);
  }

  .kb-zen-exit {
    position: fixed;
    top: 16px;
    right: 24px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid var(--vp-c-divider);
    background: var(--vp-c-bg-elv);
    color: var(--vp-c-text-2);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    z-index: 60;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  }
  .kb-zen-exit:hover {
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-brand-1);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  }
}
</style>
