<template>
  <Transition name="kb-fade">
    <button
      v-if="visible"
      class="kb-back-to-top"
      type="button"
      aria-label="返回顶部"
      title="返回顶部"
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
const { frontmatter } = useData()
const route = useRoute()

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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

// 路由切换后重新评估（新页面初始 scrollY = 0，按钮该消失）
watch(() => route.path, () => {
  // 等下一帧，浏览器完成 scroll restoration 后再判断
  requestAnimationFrame(onScroll)
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
