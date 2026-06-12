<template>
  <div v-if="!isHome" class="kb-reading-controls">
    <!-- 侧栏折叠把手：吸附在侧栏右边缘。
         必须 Teleport 出去:导航栏的 backdrop-filter 会让内部的 fixed 定位
         以导航栏为基准,把手会被吸进导航栏里 -->
    <ClientOnly>
      <Teleport to="body">
        <!-- 沉浸模式下导航栏整个隐藏,浮动一个退出按钮在右上角;按 Esc 也能退出 -->
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
        <button
          v-show="!zen"
          class="kb-sidebar-handle"
          type="button"
          :aria-label="collapsed ? '展开侧边栏' : '收起侧边栏'"
          :title="collapsed ? '展开侧边栏' : '收起侧边栏'"
          @click="toggleSidebar"
        >
          <!-- 细长的浅弧度左箭头,视觉上像分割线自己的一部分 -->
          <svg viewBox="0 0 12 36" width="12" height="36" aria-hidden="true" :style="{ transform: collapsed ? 'rotate(180deg)' : 'none' }">
            <path d="M8.5 4L4.5 18l4 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </Teleport>
    </ClientOnly>

    <!-- 沉浸阅读开关：内联在导航栏右侧 -->
    <button
      class="kb-zen-btn"
      type="button"
      :class="{ active: zen }"
      :aria-label="zen ? '退出沉浸阅读' : '沉浸阅读'"
      :title="zen ? '退出沉浸阅读' : '沉浸阅读：只留正文，全屏居中'"
      @click="toggleZen"
    >
      <svg v-if="!zen" viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
        <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <svg v-else viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
        <path d="M4 9h5V4M20 9h-5V4M4 15h5v5M20 15h-5v5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useData } from 'vitepress'

const SIDEBAR_KEY = 'kb_sidebar_collapsed'
const ZEN_KEY = 'kb_zen'

const { frontmatter } = useData()
// 凡是没有侧栏的页面(首页是 layout:page + sidebar:false)都不需要阅读控件
const isHome = computed(() => {
  const fm = frontmatter.value || {}
  return fm.layout === 'home' || fm.layout === 'page' || fm.sidebar === false
})

const collapsed = ref(false)
const zen = ref(false)

const apply = () => {
  const el = document.documentElement
  el.classList.toggle('kb-sidebar-collapsed', collapsed.value)
  el.classList.toggle('kb-zen', zen.value)
}

const toggleSidebar = () => {
  collapsed.value = !collapsed.value
  localStorage.setItem(SIDEBAR_KEY, collapsed.value ? '1' : '')
  apply()
}

const toggleZen = () => {
  zen.value = !zen.value
  localStorage.setItem(ZEN_KEY, zen.value ? '1' : '')
  apply()
}

const onKeydown = (e) => {
  if (e.key === 'Escape' && zen.value) toggleZen()
}

onMounted(() => {
  collapsed.value = localStorage.getItem(SIDEBAR_KEY) === '1'
  zen.value = localStorage.getItem(ZEN_KEY) === '1'
  apply()
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
/* 两个控件都只在桌面端出现：窄屏下侧栏本来就是抽屉、目录本来就不显示 */
.kb-reading-controls {
  display: none;
}

/* 把手和退出按钮被 Teleport 到 body 下,媒体查询要直接写在它们自己身上 */
.kb-sidebar-handle,
.kb-zen-exit {
  display: none;
}

@media (min-width: 960px) {
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

@media (min-width: 960px) {
  .kb-reading-controls {
    display: contents;
  }

  .kb-sidebar-handle {
    position: fixed;
    /* 无底无框,只是分割线上一段细长箭头,和线融为一体;
       按钮比箭头宽一圈,保证好点 */
    left: calc(var(--vp-sidebar-width) - 10px);
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 52px;
    border: none;
    background: transparent;
    color: #c2c2c2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 30;
    transition: left 0.25s, color 0.2s;
  }
  .kb-sidebar-handle:hover {
    color: var(--vp-c-brand-1);
  }

  /* 折叠后侧栏宽度归零,箭头停在屏幕左缘 */
  html.kb-sidebar-collapsed .kb-sidebar-handle {
    left: 2px;
  }
  .kb-sidebar-handle svg {
    transition: transform 0.25s;
  }

  .kb-zen-btn {
    width: 32px;
    height: 32px;
    margin-left: 12px;
    border-radius: 8px;
    border: 1px solid transparent;
    background: transparent;
    color: var(--vp-c-text-1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
  }
  .kb-zen-btn:hover {
    background: var(--vp-c-bg-soft);
    border-color: var(--vp-c-divider);
    color: var(--vp-c-brand-1);
  }
  .kb-zen-btn.active {
    background: var(--vp-c-brand-1);
    border-color: var(--vp-c-brand-1);
    color: #fff;
  }
}
</style>
