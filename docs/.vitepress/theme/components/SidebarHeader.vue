<template>
  <div class="kb-sb-header">
    <button class="kb-sb-main" type="button" title="收起侧边栏" aria-label="收起侧边栏" @click="toggleSidebar">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <rect x="3" y="4.5" width="18" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6" />
        <line x1="9.5" y1="4.5" x2="9.5" y2="19.5" stroke="currentColor" stroke-width="1.6" />
      </svg>
      <span>本站导航</span>
    </button>
    <span class="kb-sb-spacer"></span>
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
  </div>
</template>

<script setup>
import { toggleSidebar, toggleZen, openSearch } from '../readingState.js'
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
    gap: 2px;
    /* 钉在侧栏顶部,滚动导航时不跟着跑 */
    position: sticky;
    top: 0;
    z-index: 2;
    background: var(--vp-sidebar-bg-color);
    margin: 0 -16px 8px;
    padding: 14px 16px 10px;
    border-bottom: 1px solid var(--vp-c-divider);
  }

  .kb-sb-main {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    border: none;
    background: transparent;
    color: var(--vp-c-text-2);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    padding: 4px 6px 4px 2px;
    border-radius: 6px;
    transition: color 0.2s;
  }
  .kb-sb-main:hover {
    color: var(--vp-c-brand-1);
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
