<template>
  <div class="vocab-embed">
    <iframe
      ref="frame"
      class="vocab-embed-frame"
      :src="src"
      :style="frameHeight ? { height: frameHeight + 'px' } : null"
      title="AI 学习词汇本"
      loading="eager"
      @load="syncTheme"
    ></iframe>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const BASE = '/vocab/index.html'
const frame = ref(null)
const src = ref(BASE)
// 手机单栏时 = 词汇本内容高度（iframe 不再内部滚动）；双栏时为 null，走 CSS 的视口高度
const frameHeight = ref(null)
const { isDark } = useData()
function syncTheme() {
  frame.value?.contentWindow?.postMessage({ type: 'ailinkstart:vocab:theme', dark: isDark.value }, window.location.origin)
}

// 深链：/vocab-book#Agent → 把 #Agent 交给 iframe，由词汇本自己定位词条
function passHash() {
  const hash = window.location.hash
  if (!hash) return
  const win = frame.value?.contentWindow
  // replace：只改 iframe 的锚点，不新增历史记录（不影响浏览器"返回"）
  try { if (win) win.location.replace(BASE + hash) } catch (e) { src.value = BASE + hash }
}

// 顶部吸顶导航（手机端：站点导航 + 「目录」条）的底边，滚动定位时要让开
function stickyOffset() {
  let bottom = 0
  for (const sel of ['.VPNav', '.VPLocalNav']) {
    const el = document.querySelector(sel)
    if (el) bottom = Math.max(bottom, el.getBoundingClientRect().bottom)
  }
  return bottom
}

function onMessage(event) {
  if (event.origin !== window.location.origin || event.source !== frame.value?.contentWindow) return
  const data = event.data || {}
  if (data.type === 'ailinkstart:vocab:ready') syncTheme()
  if (data.type === 'ailinkstart:vocab:size') {
    frameHeight.value = data.stacked && data.height > 0 ? data.height : null
  }
  // 词汇本请求把它内部某个位置（深链命中的词条、弹窗）滚到屏幕里
  if (data.type === 'ailinkstart:vocab:reveal' && typeof data.top === 'number' && frame.value) {
    const top = window.scrollY + frame.value.getBoundingClientRect().top + data.top - stickyOffset() - 12
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }
}
watch(isDark, syncTheme)
onMounted(() => {
  window.addEventListener('message', onMessage)
  window.addEventListener('hashchange', passHash)
  if (window.location.hash) src.value = BASE + window.location.hash
})
onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage)
  window.removeEventListener('hashchange', passHash)
})
</script>

<style scoped>
/* 双栏（宽屏）：高度 = 视口 - 顶部导航。桌面端文章页隐藏顶导航（--vp-nav-height 归零），
   文档布局内边距已在 custom.css 清零，iframe 正好填满内容区，词汇本在 iframe 内部自滚动。
   手机单栏：词汇本上报内容高度，iframe 用行内 height 撑到同高，整页只有一个滚动条 */
.vocab-embed {
  width: 100%;
}
.vocab-embed-frame {
  display: block;
  width: 100%;
  height: calc(100vh - var(--vp-nav-height));
  height: calc(100dvh - var(--vp-nav-height));
  border: 0;
  background: transparent;
}
</style>

<style>
/* custom.css 为了让 iframe 贴边，把 /vocab-book 的 VPDoc 内边距清零了，
   连带页面底部的「最后更新于」和上一篇/下一篇卡片也贴到屏幕边缘。这里只给页脚补回常规左右留白 */
.vocab-book-page .VPDocFooter {
  padding: 0 24px 32px;
}
@media (min-width: 768px) {
  .vocab-book-page .VPDocFooter {
    padding: 0 32px 48px;
  }
}
</style>
