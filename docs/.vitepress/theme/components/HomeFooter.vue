<template>
  <footer class="home-footer">
    <div class="footer-inner">
      <span>仅用作个人 AI 学习，请勿商用</span>
      <span class="footer-sep">·</span>
      <span class="footer-meta">© 2026 AILINKSTART.COM</span>
    </div>
  </footer>
</template>

<style scoped>
.home-footer {
  padding: 14px 40px;
  text-align: center;
  border-top: 1px solid var(--line);
}
.footer-inner {
  max-width: 1280px; margin: 0 auto;
  display: flex; align-items: center; justify-content: center;
  gap: 8px; flex-wrap: wrap;
  font-size: 12px;
  color: var(--ink-mute);
}
.footer-sep { opacity: 0.5; }
.footer-meta {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
}
</style>
