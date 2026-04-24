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

    <!-- 文字 + 节点 -->
    <div class="hero-foreground">
      <div class="hero-text">
        <h1>
          从零基础小白，<br>
          走向<span class="accent">AI 时代</span>超级个体
        </h1>
        <p class="hero-sub">
          无论你是第一次接触 AI，还是想用 AI 重新定义自己的工作方式——在这里，你能找到一条循序渐进、亲测有效的学习路径。
        </p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="/stage-1/">
            从第一阶段开始
            <svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
          <a class="btn btn-ghost" href="/stage-2/">查看全部内容</a>
        </div>
      </div>

      <div class="hero-nodes">
        <svg class="path-svg" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pathWidth" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stop-color="#fbfaf5" stop-opacity="0.95"/>
              <stop offset="50%" stop-color="#fbfaf5" stop-opacity="0.88"/>
              <stop offset="100%" stop-color="#fbfaf5" stop-opacity="0.7"/>
            </linearGradient>
            <linearGradient id="pathBorder" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stop-color="#6ba583"/>
              <stop offset="100%" stop-color="#1f4332"/>
            </linearGradient>
          </defs>
          <path class="path-fill" d="M 12 88 C 20 86, 26 78, 30 73 C 34 68, 36 62, 40 58 C 44 54, 46 50, 50 46 C 54 42, 60 34, 62 30 C 64 26, 78 18, 88 14" stroke="rgba(31, 67, 50, 0.08)" stroke-linecap="round" stroke-linejoin="round" fill="none" vector-effect="non-scaling-stroke" style="stroke-width: 24px; transform: translate(2px, 3px);"/>
          <path class="path-fill" d="M 12 88 C 20 86, 26 78, 30 73 C 34 68, 36 62, 40 58 C 44 54, 46 50, 50 46 C 54 42, 60 34, 62 30 C 64 26, 78 18, 88 14" stroke="url(#pathWidth)" stroke-linecap="round" stroke-linejoin="round" fill="none" vector-effect="non-scaling-stroke" style="stroke-width: 20px;"/>
          <path class="path-border" d="M 12 88 C 20 86, 26 78, 30 73 C 34 68, 36 62, 40 58 C 44 54, 46 50, 50 46 C 54 42, 60 34, 62 30 C 64 26, 78 18, 88 14" stroke="url(#pathBorder)" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.35" vector-effect="non-scaling-stroke" style="stroke-width: 1.5px;"/>
          <path class="path-border" d="M 12 88 C 20 86, 26 78, 30 73 C 34 68, 36 62, 40 58 C 44 54, 46 50, 50 46 C 54 42, 60 34, 62 30 C 64 26, 78 18, 88 14" stroke="#3d7860" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0.5 1.2" fill="none" opacity="0.35" vector-effect="non-scaling-stroke" style="stroke-width: 0.8px;"/>
        </svg>

        <a v-for="n in nodes" :key="n.num" :class="['node', `node-${n.num}`, n.reverse && 'reverse', n.final && 'final']" :href="n.link" :aria-label="n.aria">
          <div class="node-dot">{{ n.num }}</div>
          <div class="node-label">
            <div class="node-label-title">{{ n.title }}</div>
            <div class="node-label-sub">{{ n.sub }}</div>
          </div>
        </a>
      </div>
    </div>

    <div class="hero-footnote">
      <span class="scroll-dot"></span>
      <span>继续滚动，查看特色专区</span>
    </div>
  </section>
</template>

<script setup>
const nodes = [
  { num: '01', title: '快速认知',    sub: '10 分钟建立 AI 世界观',  link: '/stage-1/', aria: '阶段一：快速认知' },
  { num: '02', title: '零基础上手',  sub: '用上趁手的 AI 工具',     link: '/stage-2/', aria: '阶段二：零基础上手' },
  { num: '03', title: 'AI 进阶概念', sub: '解锁 AI 圈思维方式',     link: '/stage-3/', aria: '阶段三：AI 进阶概念' },
  { num: '04', title: '工作场景实践', sub: '按岗位融入工作流',      link: '/stage-4/', aria: '阶段四：工作场景实践' },
  { num: '05', title: 'AI Agent 使用', sub: '解放双手提高生产力',   link: '/stage-5/', aria: '阶段五：AI Agent 使用' },
  { num: '06', title: 'AI 创意与创业', sub: '成为全能超级个体',     link: '/stage-6/', aria: '阶段六：AI 创意与创业', reverse: true, final: true },
]
</script>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100vh - 64px);
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 64px 40px 80px;
  min-height: calc(100vh - 64px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: 40px;
  align-items: center;
}

.hero-text {
  max-width: 560px;
  position: relative;
}
.hero h1 {
  font-family: var(--font-serif);
  font-size: clamp(34px, 4vw, 56px);
  line-height: 1.22;
  font-weight: 900;
  color: var(--green-900);
  letter-spacing: -0.01em;
  margin-bottom: 26px;
  opacity: 0; animation: fadeUp 0.8s 0.3s ease forwards;
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
.hero-sub {
  font-size: 16px; line-height: 1.78;
  color: var(--ink-soft);
  max-width: 480px;
  margin-bottom: 36px;
  opacity: 0; animation: fadeUp 0.8s 0.45s ease forwards;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.4);
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

.hero-nodes {
  position: relative;
  height: 540px;
  opacity: 0; animation: fadeIn 1.2s 0.6s ease forwards;
}

.path-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  overflow: visible;
}
.path-fill {
  opacity: 0;
  animation: pathReveal 2.8s 0.8s ease-out forwards;
}
@keyframes pathReveal {
  from { opacity: 0; }
  to { opacity: 1; }
}
.path-border {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: drawBorder 3s 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes drawBorder { to { stroke-dashoffset: 0; } }

.node {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex; align-items: center; gap: 12px;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
  padding: 4px;
  z-index: 3;
  text-decoration: none;
}
.node-dot {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: white;
  border: 2.5px solid var(--green-700);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-serif);
  font-size: 16px; font-weight: 700;
  color: var(--green-900);
  flex-shrink: 0;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 6px 16px rgba(31, 67, 50, 0.15);
  position: relative;
}
.node-dot::before {
  content: '';
  position: absolute;
  inset: -7px;
  border-radius: 50%;
  border: 1px solid var(--green-400);
  opacity: 0;
  transition: all 0.4s ease;
}
.node-dot::after {
  content: '';
  position: absolute;
  bottom: -9px; left: 50%;
  transform: translateX(-50%);
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--green-700);
  opacity: 0.55;
}
.node:hover .node-dot {
  transform: scale(1.1);
  background: var(--green-900);
  color: var(--cream);
  border-color: var(--green-900);
  box-shadow: 0 12px 26px rgba(31, 67, 50, 0.3);
}
.node:hover .node-dot::before {
  opacity: 1;
  inset: -11px;
}

.node-label {
  border-left: 2px solid rgba(31, 67, 50, 0.28);
  border-radius: 0;
  background: rgba(255, 255, 255, 0.42);
  -webkit-backdrop-filter: blur(10px) saturate(140%);
  backdrop-filter: blur(10px) saturate(140%);
  padding: 8px 14px 8px 12px;
  white-space: nowrap;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  box-shadow: none;
  transition: all 0.3s ease;
}
.node-label-title {
  font-family: var(--font-serif);
  font-size: 15px; font-weight: 700;
  color: var(--green-900);
  line-height: 1.25;
}
.node-label-sub {
  font-size: 12px;
  color: var(--ink-soft);
  margin-top: 2px;
  line-height: 1.35;
}
.node:hover .node-label {
  background: rgba(255, 255, 255, 0.78);
  border-left-color: var(--green-700);
  transform: translateX(4px);
}

.node.reverse { flex-direction: row-reverse; }
.node.reverse .node-label {
  border-left: none;
  border-right: 2px solid rgba(31, 67, 50, 0.28);
  padding: 8px 12px 8px 14px;
  text-align: right;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.node.reverse:hover .node-label {
  border-right-color: var(--green-700);
  transform: translateX(-4px);
}

.node.final .node-dot {
  width: 44px; height: 44px;
  background: var(--green-900);
  color: var(--cream);
  border-color: var(--green-900);
  font-size: 16px;
  box-shadow: 0 8px 22px rgba(31, 67, 50, 0.28);
}
.node.final .node-dot::after {
  background: var(--green-900);
  opacity: 0.6;
}
.node.final .node-dot::before {
  opacity: 1; inset: -8px;
  border-color: var(--green-500);
  animation: ring 3s ease-in-out infinite;
}
.node.final:hover .node-dot {
  transform: scale(1.1);
  background: var(--green-800);
}
.node.final .node-label {
  background: rgba(31, 67, 50, 0.72);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  border-right-color: rgba(251, 250, 245, 0.35);
}
.node.final .node-label-title {
  color: var(--cream);
}
.node.final .node-label-sub {
  color: rgba(251, 250, 245, 0.75);
}
.node.final:hover .node-label {
  background: rgba(31, 67, 50, 0.88);
}
@keyframes ring {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.12); opacity: 0.2; }
}

.node { opacity: 0; animation: nodePop 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
.node-01 { animation-delay: 1.1s; }
.node-02 { animation-delay: 1.4s; }
.node-03 { animation-delay: 1.7s; }
.node-04 { animation-delay: 2.0s; }
.node-05 { animation-delay: 2.3s; }
.node-06 { animation-delay: 2.6s; }
@keyframes nodePop {
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.65); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}

.node-01 { left: 12%; top: 88%; }
.node-02 { left: 30%; top: 73%; }
.node-03 { left: 40%; top: 58%; }
.node-04 { left: 50%; top: 46%; }
.node-05 { left: 62%; top: 30%; }
.node-06 { left: 88%; top: 14%; }

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

.hero-footnote {
  position: absolute;
  bottom: 20px; left: 50%; transform: translateX(-50%);
  z-index: 4;
  font-family: var(--font-mono);
  font-size: 11px; letter-spacing: 0.15em;
  color: var(--ink-mute);
  text-transform: uppercase;
  display: flex; align-items: center; gap: 10px;
  opacity: 0; animation: fadeUp 0.8s 2.8s ease forwards;
}
.hero-footnote .scroll-dot {
  width: 4px; height: 4px; border-radius: 50%;
  background: var(--green-500);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
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
  .hero-foreground { gap: 24px; }
  .hero h1 { font-size: 40px; }
}
@media (max-width: 960px) {
  .hero { min-height: auto; }
  .hero-foreground {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 60px 24px 60px;
    min-height: auto;
  }
  .hero-nodes { height: 420px; }
  .hero h1 { font-size: 34px; }
  .hero-footnote { display: none; }
  .node-dot { width: 40px; height: 40px; font-size: 14px; }
  .node.final .node-dot { width: 40px; height: 40px; font-size: 14px; }
  .node-label-title { font-size: 14px; }
}
@media (max-width: 640px) {
  .hero h1 { font-size: 28px; }
  .hero-nodes { height: 380px; }
  .node-label-sub { display: none; }
  .node-label-title { font-size: 13px; }
}
</style>
