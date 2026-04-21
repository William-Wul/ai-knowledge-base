<template>
  <footer class="home-footer">
    <div class="footer-inner">
      <div class="footer-brand">AI 学习知识库</div>
      <p class="footer-note">内部学习资料，请勿外传</p>
      <div class="footer-meta">© 2026 · AILINKSTART.COM</div>
    </div>
  </footer>
</template>

<style scoped>
.home-footer {
  padding: 40px 40px 32px;
  text-align: center;
  border-top: 1px solid var(--line);
  margin-top: 40px;
}
.footer-inner { max-width: 1200px; margin: 0 auto; }
.footer-brand {
  font-family: var(--font-serif);
  font-size: 17px; font-weight: 700;
  color: var(--green-900);
  margin-bottom: 8px;
}
.footer-note {
  font-size: 12.5px;
  color: var(--ink-mute);
  margin: 0;
}
.footer-meta {
  margin-top: 20px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--ink-mute);
  letter-spacing: 0.08em;
}
</style>
