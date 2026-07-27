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
/* 占满顶部导航以下的整个视口：外层页面不再滚动，词汇本在 iframe 内部自滚动，避免双滚动条 */
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
