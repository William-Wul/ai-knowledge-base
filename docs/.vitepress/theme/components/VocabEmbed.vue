<template>
  <div class="vocab-embed">
    <iframe
      ref="frame"
      class="vocab-embed-frame"
      src="/vocab/index.html"
      title="AI 学习词汇本"
      loading="eager"
      @load="syncTheme"
    ></iframe>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const frame = ref(null)
const { isDark } = useData()
function syncTheme() {
  frame.value?.contentWindow?.postMessage({ type: 'ailinkstart:vocab:theme', dark: isDark.value }, window.location.origin)
}
function onMessage(event) {
  if (event.origin !== window.location.origin || event.source !== frame.value?.contentWindow) return
  if (event.data?.type === 'ailinkstart:vocab:ready') syncTheme()
}
watch(isDark, syncTheme)
onMounted(() => window.addEventListener('message', onMessage))
onBeforeUnmount(() => window.removeEventListener('message', onMessage))
</script>

<style scoped>
/* 高度 = 视口 - 顶部导航：桌面端文章页隐藏顶导航（--vp-nav-height 归零），
   文档布局内边距已在 custom.css 清零，iframe 正好填满内容区，
   外层页面不滚动，词汇本在 iframe 内部自滚动 */
.vocab-embed {
  width: 100%;
  height: calc(100vh - var(--vp-nav-height));
  height: calc(100dvh - var(--vp-nav-height));
}
.vocab-embed-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: transparent;
}
</style>
