<template>
  <div class="kb-sb-header">
    <a class="kb-sb-brand" href="/" title="回到首页">
      <svg viewBox="9 7 41 43" width="16" height="17" aria-hidden="true">
        <rect x="13" y="10" width="9" height="36" rx="2.5" fill="#1f4332" />
        <rect x="25" y="10" width="9" height="36" rx="2.5" fill="#3a7050" />
        <rect x="38" y="14" width="7" height="32" rx="2.5" transform="rotate(12 41.5 30)" fill="#6dbf8a" />
      </svg>
      <span>AI 学习知识库</span>
    </a>
    <span class="kb-sb-spacer"></span>
    <button class="kb-sb-icon" type="button" title="收起侧边栏" aria-label="收起侧边栏" @click="toggleSidebar">
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6" />
        <line x1="9.5" y1="4.5" x2="9.5" y2="19.5" stroke="currentColor" stroke-width="1.6" />
      </svg>
    </button>
    <button class="kb-sb-icon" type="button" title="沉浸阅读：只留正文，全屏居中" aria-label="沉浸阅读" @click="toggleZen">
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
        <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <button class="kb-sb-icon" type="button" title="搜索（⌘K）" aria-label="搜索" @click="openSearch">
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
        <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8" />
        <line x1="16" y1="16" x2="20.5" y2="20.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      </svg>
    </button>
    <!-- 深浅模式切换：isDark 是 VitePress 暴露的可写 ref，赋值即切换，
         自动写入 localStorage 记住用户选择。图标随当前模式切换日/月 -->
    <button
      class="kb-sb-icon"
      type="button"
      :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
      :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
      @click="toggleTheme"
    >
      <!-- 浅色时显示月亮（点了变深）；深色时显示太阳（点了变浅） -->
      <svg v-if="!isDark" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
      </svg>
      <svg v-else viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
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
</template>

<script setup>
import { toggleSidebar, toggleZen, openSearch } from '../readingState.js'
import { useData } from 'vitepress'

const { isDark } = useData()
const toggleTheme = () => { isDark.value = !isDark.value }
</script>

<style scoped>
/* 窄屏下侧栏是抽屉,这一行没意义 */
.kb-sb-header {
  display: none;
}

@media (min-width: 960px) {
  .kb-sb-header {
    display: flex;
    align-items: center;
    gap: 1px;
    /* 钉在侧栏顶部,滚动导航时不跟着跑;铺满侧栏全宽 */
    position: sticky;
    top: 0;
    z-index: 2;
    background: var(--vp-sidebar-bg-color);
    margin: 0 -32px 8px;
    padding: 14px 16px 10px;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  /* 和首页 logo 同款:书脊标记 + 衬线字体、墨绿、同字重,字号按侧栏宽度适配 */
  .kb-sb-brand {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: #1f4332;
    text-decoration: none;
    white-space: nowrap;
    padding: 4px 0;
    transition: opacity 0.2s;
  }
  .kb-sb-brand svg {
    flex-shrink: 0;
  }
  .kb-sb-brand:hover {
    opacity: 0.75;
  }

  .kb-sb-spacer {
    flex: 1;
  }

  .kb-sb-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--vp-c-text-3);
    cursor: pointer;
    transition: color 0.2s, background 0.2s;
  }
  .kb-sb-icon:hover {
    color: var(--vp-c-brand-1);
    background: var(--vp-c-bg-soft);
  }
}
</style>
