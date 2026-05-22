<template>
  <Transition name="kb-fade">
    <button
      v-if="visible"
      class="kb-back-to-top"
      type="button"
      aria-label="返回顶部"
      title="返回顶部"
      :style="{ right: rightOffset + 'px' }"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          d="M6 14l6-6 6 6"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const visible = ref(false)
const rightOffset = ref(24)
const { frontmatter } = useData()
const route = useRoute()

const MIN = 16 // 窄屏时距右边缘的最小留白
const BTN = 44 // 按钮直径
const GAP = 12 // 按钮左边缘与正文列右边缘之间的留白

// 把按钮放到「中间正文列」右侧的空白区，紧贴正文列但不压住文字
const updateOffset = () => {
  if (typeof document === 'undefined') return
  const doc =
    document.querySelector('.VPDoc .content-container') ||
    document.querySelector('.vp-doc')
  if (!doc) {
    rightOffset.value = MIN
    return
  }
  const rect = doc.getBoundingClientRect()
  // 让按钮整体落在正文列右边缘之外的空白里；窄屏（正文铺满、没有空白）退回 MIN
  rightOffset.value = Math.max(MIN, window.innerWidth - rect.right - BTN - GAP)
}

let ticking = false
const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    // 首页/自定义 layout 不显示
    const isHome = frontmatter.value?.layout === 'home'
    visible.value = !isHome && window.scrollY > 600
    ticking = false
  })
}

const onResize = () => updateOffset()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
  onScroll()
  updateOffset()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
})

// 路由切换后重新评估（新页面初始 scrollY = 0，按钮该消失；正文列宽度也可能变）
watch(() => route.path, () => {
  requestAnimationFrame(() => {
    onScroll()
    updateOffset()
  })
})
</script>

<style scoped>
.kb-back-to-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  z-index: 60;
}
.kb-back-to-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  background: var(--vp-c-bg-soft);
}

.kb-fade-enter-active,
.kb-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.kb-fade-enter-from,
.kb-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 640px) {
  .kb-back-to-top {
    right: 16px;
    bottom: 16px;
    width: 40px;
    height: 40px;
  }
}
</style>
