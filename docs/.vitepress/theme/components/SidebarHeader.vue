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
