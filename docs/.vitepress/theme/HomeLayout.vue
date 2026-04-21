<template>
  <div class="home-wrapper">
    <HomeNav />
    <HomeHero />
    <HomeFeatures />
    <HomeFooter />
  </div>
</template>

<script setup>
import HomeNav from './components/HomeNav.vue'
import HomeHero from './components/HomeHero.vue'
import HomeFeatures from './components/HomeFeatures.vue'
import HomeFooter from './components/HomeFooter.vue'
</script>

<style>
/* ============ 首页专用全局 token（只在 <HomeLayout/> 渲染的页面生效） ============ */
.home-wrapper {
  --green-900: #1f4332;
  --green-800: #2d5f4e;
  --green-700: #3d7860;
  --green-600: #528b6f;
  --green-500: #6ba583;
  --green-400: #8bbfa1;
  --green-300: #bfdcc8;
  --green-200: #d8ebde;
  --green-100: #e8f5e9;
  --green-50:  #f3faf4;

  --ink:       #1a2a22;
  --ink-soft:  #445048;
  --ink-mute:  #7a8880;
  --line:      rgba(31, 67, 50, 0.09);
  --cream:     #fbfaf5;
  --sky-top:   #f2f7ef;

  --font-serif: 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', serif;
  --font-sans:  'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'PingFang SC', sans-serif;
  --font-mono:  'JetBrains Mono', 'SF Mono', Menlo, monospace;

  font-family: var(--font-sans);
  font-weight: 400;
  color: var(--ink);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
</style>
