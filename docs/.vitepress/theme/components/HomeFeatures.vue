<template>
  <section class="features-section" id="features">
    <div class="section-inner">
      <div class="features-header reveal" ref="headerRef">
        <div class="section-label">Tools</div>
        <h2 class="section-title">AI 学习小工具</h2>
        <p class="section-desc">测一测自己的水平，顺手攒下每个陌生术语</p>
      </div>
      <div class="features">
        <a
          v-for="(zone, i) in zones"
          :key="zone.title"
          class="feature-card reveal"
          :href="zone.link"
          :target="zone.target"
          :rel="zone.rel"
          :ref="el => cardRefs[i] = el"
        >
          <div class="feature-icon" v-html="zone.icon"></div>
          <div class="feature-content">
            <div class="feature-title">{{ zone.title }}</div>
            <div class="feature-desc">{{ zone.desc }}</div>
          </div>
          <svg class="feature-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const headerRef = ref(null)
const cardRefs = ref([])
let io = null

const zones = [
  {
    title: 'AI 能力自测',
    desc: '12 道场景题，测出你现在的 AI 使用水平和下一步该学什么',
    link: '/exams/',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V5"/><path d="M4 19h16"/><rect x="7" y="12" width="3" height="4" rx="1"/><rect x="12" y="8" width="3" height="8" rx="1"/><rect x="17" y="4" width="3" height="12" rx="1"/></svg>`,
  },
  {
    title: 'AI 学习词汇本',
    desc: '随手收录陌生英文术语，AI 帮你解读、拆解、记忆',
    link: '/vocab/',
    target: '_blank',
    rel: 'noopener',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z"/><path d="M4 17a3 3 0 0 1 3-3h12"/><line x1="9" y1="8" x2="14" y2="8"/><line x1="9" y1="11" x2="14" y2="11"/></svg>`,
  },
]

onMounted(() => {
  io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in')
        io.unobserve(e.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

  if (headerRef.value) io.observe(headerRef.value)
  cardRefs.value.forEach(el => el && io.observe(el))
})

onUnmounted(() => {
  io?.disconnect()
})
</script>

<style scoped>
.features-section {
  position: relative;
  padding: 40px 40px 60px;
}
.section-inner { max-width: 1280px; margin: 0 auto; }
.features-header {
  text-align: center;
  margin-bottom: 44px;
}
.section-label {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--green-700);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  margin-bottom: 14px;
}
.section-label::before, .section-label::after {
  content: ''; width: 28px; height: 1px;
  background: var(--green-400);
}
.section-title {
  font-family: var(--font-serif);
  font-size: clamp(24px, 2.8vw, 32px);
  font-weight: 900;
  line-height: 1.2;
  color: var(--green-900);
  letter-spacing: -0.015em;
  margin-bottom: 12px;
}
.section-desc {
  font-size: 14.5px;
  color: var(--ink-soft);
  max-width: 520px; margin: 0 auto;
}
.features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 880px;
  margin: 0 auto;
}
.feature-card {
  position: relative;
  padding: 22px 24px;
  background: rgba(255, 255, 255, 0.55);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  border: 1px solid var(--green-200);
  border-radius: 14px;
  display: flex; align-items: center; gap: 16px;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
}
.feature-card:hover {
  border-color: var(--green-500);
  background: white;
  transform: translateY(-2px);
}
.feature-icon {
  width: 42px; height: 42px;
  flex-shrink: 0;
  border-radius: 10px;
  background: white;
  border: 1px solid var(--green-200);
  display: flex; align-items: center; justify-content: center;
  color: var(--green-700);
  transition: all 0.3s ease;
}
.feature-card:hover .feature-icon {
  background: var(--green-100);
  border-color: var(--green-300);
}
.feature-content { flex: 1; min-width: 0; }
.feature-title {
  font-family: var(--font-serif);
  font-size: 16px; font-weight: 700;
  color: var(--green-900);
  margin-bottom: 2px;
}
.feature-desc {
  font-size: 12px;
  color: var(--ink-mute);
  line-height: 1.5;
}
.feature-arrow {
  flex-shrink: 0;
  color: var(--green-700);
  opacity: 0.4;
  transition: all 0.3s ease;
}
.feature-card:hover .feature-arrow {
  opacity: 1;
  transform: translateX(3px);
}

.reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.7s ease, transform 0.7s ease; }
.reveal.in { opacity: 1; transform: translateY(0); }

@media (max-width: 960px) {
  .features-section { padding: 60px 24px 40px; }
  .features { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .features { grid-template-columns: 1fr; }
}
</style>
