<template>
  <section class="hero">
    <!-- 山水背景 SVG -->
    <div class="hero-scene" aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="m-far1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#d2e0d4" stop-opacity="0.32"/>
            <stop offset="100%" stop-color="#c0d4c5" stop-opacity="0.12"/>
          </linearGradient>
          <linearGradient id="m-far2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#b4c9b9" stop-opacity="0.44"/>
            <stop offset="100%" stop-color="#9ebda3" stop-opacity="0.16"/>
          </linearGradient>
          <linearGradient id="m-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#9ebda3" stop-opacity="0.54"/>
            <stop offset="100%" stop-color="#85a88c" stop-opacity="0.22"/>
          </linearGradient>
          <linearGradient id="m-near1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7a9a80" stop-opacity="0.58"/>
            <stop offset="100%" stop-color="#5e806a" stop-opacity="0.26"/>
          </linearGradient>
          <linearGradient id="m-near2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5e806a" stop-opacity="0.62"/>
            <stop offset="100%" stop-color="#4a6b57" stop-opacity="0.3"/>
          </linearGradient>
          <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f2f7ef" stop-opacity="0"/>
            <stop offset="50%" stop-color="#f2f7ef" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#f2f7ef" stop-opacity="0"/>
          </linearGradient>
          <radialGradient id="sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#fff8e0" stop-opacity="0.9"/>
            <stop offset="30%" stop-color="#ffe8a8" stop-opacity="0.45"/>
            <stop offset="60%" stop-color="#f5d97c" stop-opacity="0.12"/>
            <stop offset="100%" stop-color="#f5d97c" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <g class="sun-glow">
          <circle cx="1420" cy="180" r="140" fill="url(#sun)"/>
          <circle cx="1420" cy="180" r="32" fill="#fff4d0" opacity="0.75"/>
        </g>

        <path
          d="M 0 620 L 80 590 L 180 560 L 280 540 L 380 530 L 480 550 L 580 580 L 680 610 L 780 630 L 880 620 L 980 580 L 1080 510 L 1180 420 L 1280 340 L 1360 270 L 1420 230 L 1480 215 L 1540 250 L 1600 290 L 1600 900 L 0 900 Z"
          fill="url(#m-far1)"
        />
        <path
          d="M 0 700 L 100 680 L 200 660 L 300 650 L 420 660 L 540 680 L 660 700 L 780 710 L 880 680 L 980 620 L 1080 540 L 1180 460 L 1260 400 L 1340 360 L 1400 340 L 1460 360 L 1540 400 L 1600 440 L 1600 900 L 0 900 Z"
          fill="url(#m-far2)"
        />
        <rect x="0" y="560" width="1600" height="220" fill="url(#mist)"/>
        <path
          d="M 0 780 L 120 760 L 240 750 L 360 745 L 480 755 L 600 770 L 720 775 L 820 770 L 900 750 L 980 710 L 1060 650 L 1140 580 L 1220 510 L 1280 470 L 1340 460 L 1400 475 L 1480 500 L 1560 525 L 1600 540 L 1600 900 L 0 900 Z"
          fill="url(#m-mid)"
        />
        <path
          d="M 0 830 L 120 820 L 260 815 L 400 810 L 540 805 L 680 800 L 820 795 L 940 785 L 1040 760 L 1120 720 L 1200 660 L 1260 610 L 1310 580 L 1360 570 L 1400 580 L 1450 600 L 1500 630 L 1560 660 L 1600 680 L 1600 900 L 0 900 Z"
          fill="url(#m-near1)"
        />
        <path
          d="M 0 870 L 140 865 L 300 862 L 460 858 L 620 855 L 780 852 L 920 850 L 1040 845 L 1140 825 L 1220 795 L 1290 770 L 1340 765 L 1390 775 L 1440 795 L 1500 820 L 1560 840 L 1600 855 L 1600 900 L 0 900 Z"
          fill="url(#m-near2)"
        />

        <g class="birds" stroke="#5e806a" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.5">
          <path d="M 1180 300 q 5 -4 10 0 q 5 -4 10 0"/>
          <path d="M 1240 285 q 5 -4 10 0 q 5 -4 10 0"/>
          <path d="M 1295 310 q 4 -3 8 0 q 4 -3 8 0"/>
        </g>

        <g opacity="0.32" fill="#3d7860">
          <path d="M 180 818 L 177 810 L 183 810 Z"/>
          <path d="M 380 812 L 377 804 L 383 804 Z"/>
          <path d="M 560 807 L 557 799 L 563 799 Z"/>
          <path d="M 750 798 L 747 790 L 753 790 Z"/>
          <path d="M 940 788 L 937 780 L 943 780 Z" opacity="0.8"/>
          <path d="M 1100 725 L 1097 717 L 1103 717 Z" opacity="0.8"/>
          <path d="M 1240 617 L 1237 609 L 1243 609 Z" opacity="0.75"/>
          <path d="M 1360 572 L 1358 566 L 1362 566 Z" opacity="0.7"/>
        </g>
      </svg>
    </div>

    <!-- 文字 + AI 最新动态 -->
    <div class="hero-foreground">
      <div class="hero-text">
        <div class="hero-main">
          <h1>
            零门槛学 AI<br>
            成为 <span class="accent">AI 时代</span>超级个体
          </h1>
          <div class="hero-actions">
            <a class="btn btn-primary" href="/stage-1/">
              进入 AI 基础学习
              <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>
            <a class="btn btn-ghost" href="/stage-4/">发现更多 AI 实践</a>
          </div>
        </div>

        <div class="hero-tools">
          <div class="tools-label">AI 学习小工具</div>
          <div class="tools-cards">
            <a class="tool-card" href="/exams/">
              <div class="tool-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V5"/><path d="M4 19h16"/><rect x="7" y="12" width="3" height="4" rx="1"/><rect x="12" y="8" width="3" height="8" rx="1"/><rect x="17" y="4" width="3" height="12" rx="1"/></svg>
              </div>
              <div class="tool-content">
                <div class="tool-title">AI 能力自测</div>
                <div class="tool-desc">12 道场景题，测出你的 AI 使用水平</div>
              </div>
              <svg class="tool-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a class="tool-card" href="/vocab/" target="_blank" rel="noopener">
              <div class="tool-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z"/><path d="M4 17a3 3 0 0 1 3-3h12"/><line x1="9" y1="8" x2="14" y2="8"/><line x1="9" y1="11" x2="14" y2="11"/></svg>
              </div>
              <div class="tool-content">
                <div class="tool-title">AI 学习词汇本</div>
                <div class="tool-desc">收录陌生术语，AI 帮你拆解记忆</div>
              </div>
              <svg class="tool-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- 右侧面板：AI 最新动态（构建时取 hot/ 最新一期日报） -->
      <div class="hero-daily">
        <div class="daily-panel">
          <div class="daily-header">
            <div class="daily-title">
              <span class="live-dot"></span>
              AI 最新动态
            </div>
            <a class="daily-more" :href="daily.url">
              {{ daily.date }} · 查看本期
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                <path d="M5 12h14M13 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          <ul class="daily-list">
            <li v-for="(item, i) in daily.items" :key="i" :style="{ animationDelay: `${0.9 + i * 0.12}s` }">
              <a class="daily-item" :href="`${daily.url}#${item.anchor}`">
                <span class="daily-cat">{{ item.category }}</span>
                <span class="daily-item-title">{{ item.title }}</span>
              </a>
            </li>
          </ul>
          <div class="daily-footer">
            <span>每日自动同步 · AIHOT 精选</span>
            <a href="/hot/">全部日报 →</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { data as daily } from '../../data/hotLatest.data.js'
</script>

<style scoped>
.hero {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.hero-scene {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0;
  animation: sceneIn 1.4s 0.2s ease forwards;
  -webkit-mask-image: linear-gradient(to bottom, black 0%, black 82%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 0%, black 82%, transparent 100%);
}
.hero-scene svg { width: 100%; height: 100%; display: block; }
@keyframes sceneIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 40%;
  z-index: 1;
  background-image:
    linear-gradient(rgba(31, 67, 50, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(31, 67, 50, 0.02) 1px, transparent 1px);
  background-size: 72px 72px;
  -webkit-mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 20%, transparent 100%);
  pointer-events: none;
}

.hero-foreground {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 40px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 40px;
  align-items: center;
}

.hero-text {
  max-width: 560px;
  position: relative;
  /* 左列撑满整行高度：slogan 顶部与右侧面板对齐，小工具卡底部与面板底部对齐 */
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.hero h1 {
  font-family: var(--font-serif);
  font-size: clamp(34px, 3.5vw, 48px);
  line-height: 1.22;
  font-weight: 900;
  color: var(--green-900);
  letter-spacing: -0.01em;
  margin-bottom: 36px;
  opacity: 0; animation: fadeUp 0.8s 0.3s ease forwards;
}
/* 桌面端两行各自禁换行（<br> 的强制断行不受影响），防止「体」字被挤到第三行 */
@media (min-width: 961px) {
  .hero h1 { white-space: nowrap; }
}
.hero h1 .accent {
  position: relative;
  display: inline-block;
  font-style: italic;
  color: var(--green-700);
  letter-spacing: 0.08em;
  padding: 0 2px;
  margin: 0 4px;
}
.hero h1 .accent::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 4px; height: 8px;
  background: var(--green-300);
  opacity: 0.7;
  z-index: -1;
  border-radius: 2px;
}
.hero-actions {
  display: flex; gap: 14px; flex-wrap: wrap;
  opacity: 0; animation: fadeUp 0.8s 0.6s ease forwards;
}
.btn {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 13px 24px;
  font-size: 14.5px; font-weight: 500;
  border-radius: 10px;
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  cursor: pointer; border: none;
  font-family: inherit;
  text-decoration: none;
}
.btn-primary {
  background: var(--green-900); color: var(--cream);
  box-shadow: 0 6px 20px rgba(31, 67, 50, 0.22);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(31, 67, 50, 0.3);
  background: var(--green-800);
}
.btn-primary .arrow { transition: transform 0.25s ease; }
.btn-primary:hover .arrow { transform: translateX(4px); }
.btn-ghost {
  background: rgba(255, 255, 255, 0.55);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  color: var(--green-900);
  border: 1.5px solid var(--green-900);
}
.btn-ghost:hover {
  background: var(--green-900); color: var(--cream);
}

/* ============ 右侧：AI 最新动态面板 ============ */
.hero-daily {
  position: relative;
  opacity: 0; animation: fadeIn 1.2s 0.6s ease forwards;
}
.daily-panel {
  background: rgba(255, 255, 255, 0.62);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  backdrop-filter: blur(12px) saturate(140%);
  border: 1px solid var(--green-200);
  border-radius: 18px;
  box-shadow: 0 18px 48px rgba(31, 67, 50, 0.12);
  padding: 22px 24px 16px;
}
.daily-header {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
  margin-bottom: 6px;
}
.daily-title {
  display: flex; align-items: center; gap: 9px;
  font-family: var(--font-serif);
  font-size: 17px; font-weight: 900;
  color: var(--green-900);
  letter-spacing: 0.01em;
}
.live-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--green-600);
  box-shadow: 0 0 0 3px var(--green-100);
  animation: livePulse 2.4s ease-in-out infinite;
}
@keyframes livePulse {
  0%, 100% { box-shadow: 0 0 0 3px var(--green-100); }
  50% { box-shadow: 0 0 0 6px rgba(107, 165, 131, 0.28); }
}
.daily-more {
  display: inline-flex; align-items: center; gap: 5px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--green-700);
  text-decoration: none;
  white-space: nowrap;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}
.daily-more:hover { background: var(--green-100); color: var(--green-900); }

.daily-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.daily-list li {
  opacity: 0;
  animation: itemIn 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}
@keyframes itemIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.daily-item {
  display: flex; align-items: baseline; gap: 10px;
  padding: 9px 8px;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s ease;
}
.daily-item:hover { background: rgba(255, 255, 255, 0.85); }
.daily-item + .daily-item { border-top: none; }
.daily-list li + li { border-top: 1px dashed rgba(31, 67, 50, 0.08); }
.daily-cat {
  flex-shrink: 0;
  font-size: 11px;
  color: var(--green-700);
  background: var(--green-100);
  border: 1px solid var(--green-200);
  border-radius: 5px;
  padding: 1.5px 7px;
  white-space: nowrap;
  transform: translateY(-1px);
}
.daily-item-title {
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--ink);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s ease;
}
.daily-item:hover .daily-item-title { color: var(--green-800); }

.daily-footer {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--line);
  font-size: 11px;
  color: var(--ink-mute);
  font-family: var(--font-mono);
}
.daily-footer a {
  color: var(--green-700);
  text-decoration: none;
  font-family: var(--font-sans);
  font-size: 12px;
}
.daily-footer a:hover { color: var(--green-900); text-decoration: underline; }

.sun-glow {
  transform-origin: center;
  animation: sunBreath 7s ease-in-out infinite;
}
@keyframes sunBreath {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.75; transform: scale(1.08); }
}
.birds {
  animation: birdsFloat 9s ease-in-out infinite;
  transform-origin: center;
}
@keyframes birdsFloat {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(20px); }
}

/* ============ 左列：AI 学习小工具 ============ */
.hero-tools {
  margin-top: 44px;
  opacity: 0; animation: fadeUp 0.8s 0.75s ease forwards;
}
.tools-label {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--green-700);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  margin-bottom: 12px;
}
.tools-label::after {
  content: ''; flex: 1; height: 1px;
  background: var(--green-300);
  opacity: 0.6;
}
.tools-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.tool-card {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.55);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  border: 1px solid var(--green-200);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
}
.tool-card:hover {
  border-color: var(--green-500);
  background: white;
  transform: translateY(-2px);
}
.tool-icon {
  width: 38px; height: 38px;
  flex-shrink: 0;
  border-radius: 9px;
  background: white;
  border: 1px solid var(--green-200);
  display: flex; align-items: center; justify-content: center;
  color: var(--green-700);
  transition: all 0.3s ease;
}
.tool-card:hover .tool-icon {
  background: var(--green-100);
  border-color: var(--green-300);
}
.tool-content { flex: 1; min-width: 0; }
.tool-title {
  font-family: var(--font-serif);
  font-size: 14.5px; font-weight: 700;
  color: var(--green-900);
  margin-bottom: 2px;
}
.tool-desc {
  font-size: 11.5px;
  color: var(--ink-mute);
  line-height: 1.45;
}
.tool-arrow {
  flex-shrink: 0;
  color: var(--green-700);
  opacity: 0.4;
  transition: all 0.3s ease;
}
.tool-card:hover .tool-arrow {
  opacity: 1;
  transform: translateX(3px);
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 1100px) {
  .hero-foreground { gap: 32px; }
}
@media (max-width: 960px) {
  .hero { min-height: auto; }
  .hero-foreground {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 60px 24px 60px;
    min-height: auto;
  }
  .hero h1 { font-size: 34px; }
  .daily-panel { max-width: none; margin-left: 0; }
}
@media (max-width: 640px) {
  .hero h1 { font-size: 28px; }
  .tools-cards { grid-template-columns: 1fr; }
  .daily-panel { padding: 18px 16px 14px; }
  .daily-item-title { font-size: 13px; }
}
</style>
