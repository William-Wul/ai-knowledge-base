<template>
  <div class="vocab-embed">
    <iframe
      class="vocab-embed-frame"
      src="/vocab/index.html"
      title="AI 学习词汇本"
      loading="eager"
    ></iframe>
  </div>
</template>

<style scoped>
/* 高度 = 视口 - 顶部导航 - 文档布局上留白：
   桌面端文章页隐藏顶导航（--vp-nav-height 归零），外层页面不滚动，
   词汇本在 iframe 内部自滚动，避免双滚动条 */
.vocab-embed {
  --vocab-embed-offset: 48px;
  width: 100%;
  height: calc(100vh - var(--vp-nav-height) - var(--vocab-embed-offset));
  height: calc(100dvh - var(--vp-nav-height) - var(--vocab-embed-offset));
}
@media (min-width: 768px) {
  .vocab-embed { --vocab-embed-offset: 64px; }
}
.vocab-embed-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: transparent;
}
</style>
