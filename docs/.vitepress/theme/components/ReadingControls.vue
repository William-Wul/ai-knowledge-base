<template>
  <div v-if="!isHome" class="kb-reading-controls">
    <!-- 侧栏收起后,左上角浮动完整三件套:展开侧栏、沉浸、搜索,
         和侧栏顶部那排同款,功能一个不少 -->
    <div v-show="collapsed && !zen" class="kb-float-group">
      <button class="kb-float-icon" type="button" title="展开侧边栏" aria-label="展开侧边栏" @click="toggleSidebar">
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <rect x="3" y="4.5" width="18" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6" />
          <line x1="9.5" y1="4.5" x2="9.5" y2="19.5" stroke="currentColor" stroke-width="1.6" />
        </svg>
      </button>
      <button class="kb-float-icon" type="button" title="沉浸阅读：只留正文，全屏居中" aria-label="沉浸阅读" @click="toggleZen">
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <button class="kb-float-icon" type="button" title="搜索（⌘K）" aria-label="搜索" @click="openSearch">
        <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8" />
          <line x1="16" y1="16" x2="20.5" y2="20.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <!-- 沉浸模式的退出按钮:和侧栏头部的进入按钮同图标、同样式、同坐标,
         视觉上是同一个按钮在开/关,只用绿色表示"沉浸中";按 Esc 也能退出 -->
    <button
      v-show="zen"
      class="kb-zen-exit"
      :class="{ 'from-collapsed': collapsed }"
      type="button"
      aria-label="退出沉浸阅读"
      title="退出沉浸阅读（Esc）"
      @click="toggleZen"
    >
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
        <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'
import { collapsed, zen, initReadingState, toggleSidebar, toggleZen, openSearch } from '../readingState.js'

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
.kb-float-group,
.kb-zen-exit {
  display: none;
}

@media (min-width: 960px) {
  /* 浮动三件套:坐标和间距对齐侧栏头部那排图标的节奏 */
  .kb-float-group {
    position: fixed;
    top: 17px;
    left: 20px;
    display: flex;
    gap: 1px;
    z-index: 30;
  }

  .kb-float-icon {
    width: 26px;
    height: 26px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--vp-c-text-3);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.2s, background 0.2s;
  }
  .kb-float-icon:hover {
    color: var(--vp-c-brand-1);
    background: var(--vp-c-bg-soft);
  }

  .kb-zen-exit {
    position: fixed;
    /* 坐标对齐侧栏头部里沉浸图标的实际位置(169,17),
       退出后真正的图标在同一点出现,进出像同一个按钮 */
    top: 17px;
    left: 169px;
    width: 26px;
    height: 26px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--vp-c-brand-1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 60;
    transition: background 0.2s;
  }
  .kb-zen-exit:hover {
    background: var(--vp-c-bg-soft);
  }

  /* 从收起状态进的沉浸:退出按钮对齐浮动三件套里沉浸图标的坐标(47,17) */
  .kb-zen-exit.from-collapsed {
    left: 47px;
  }
}
</style>
