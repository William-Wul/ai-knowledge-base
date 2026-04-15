<template>
  <div class="home-wrapper">
    <!-- Hero 区 -->
    <section class="hero-section">
      <div class="hero-inner">
        <h1 class="hero-title">AI 学习知识库</h1>
        <p class="hero-text">从零基础小白，走向AI时代超级个体</p>
        <p class="hero-tagline">无论你是第一次接触 AI，还是想用 AI 重新定义自己的工作方式，都能在这里找到适合自己的成长路径。</p>
        <div class="hero-actions">
          <a :href="base + '/stage-1/what-is-ai'" class="btn-brand">开始学习 →</a>
          <a :href="base + '/stage-2/getting-started'" class="btn-alt">查看全部内容</a>
        </div>
      </div>
    </section>

    <!-- 学习路径 -->
    <section class="path-section">
      <div class="section-inner">
        <h2 class="section-title">六阶段学习路径</h2>
        <p class="section-sub">循序渐进，每个阶段都有明确目标</p>
        <div class="stages-grid">
          <a
            v-for="stage in stages"
            :key="stage.num"
            :href="stage.link"
            class="stage-card"
            :style="{ '--stage-color': stage.color, '--stage-bg': stage.bg }"
          >
            <div class="stage-num">STAGE {{ stage.num }}</div>
            <div class="stage-icon">{{ stage.icon }}</div>
            <div class="stage-title">{{ stage.title }}</div>
            <div class="stage-desc">{{ stage.desc }}</div>
            <div class="stage-cta">开始阅读 →</div>
          </a>
        </div>
      </div>
    </section>

    <!-- 专区 -->
    <section class="zones-section">
      <div class="section-inner">
        <h2 class="section-title">特色专区</h2>
        <div class="zones-grid">
          <a v-for="zone in zones" :key="zone.title" :href="zone.link" class="zone-card">
            <span class="zone-icon">{{ zone.icon }}</span>
            <div>
              <div class="zone-title">{{ zone.title }}</div>
              <div class="zone-desc">{{ zone.desc }}</div>
            </div>
            <span class="zone-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
const { site } = useData()
const base = site.value.base.replace(/\/$/, '')

const stages = [
  {
    num: 1, icon: '🧠', title: '快速认知',
    desc: '10分钟建立AI世界观，了解AI的核心概念',
    link: base + '/stage-1/what-is-ai',
    color: '#2D5A3D', bg: '#f0f8f2',
  },
  {
    num: 2, icon: '🛠️', title: '零基础上手',
    desc: '从注册第一个AI工具开始，体验AI的实际价值',
    link: base + '/stage-2/getting-started',
    color: '#2a5c45', bg: '#eaf6ef',
  },
  {
    num: 3, icon: '🔬', title: 'AI 进阶概念',
    desc: '理解 Agentic AI、AI Harness 等前沿概念',
    link: base + '/stage-3/agentic-ai',
    color: '#265540', bg: '#e4f4eb',
  },
  {
    num: 4, icon: '💼', title: '工作场景实战',
    desc: '按岗位深入，让AI融入你的日常工作流',
    link: base + '/stage-4/hr-scenarios',
    color: '#214e3b', bg: '#ddf1e6',
  },
  {
    num: 5, icon: '🤖', title: 'AI Agent 使用',
    desc: '学习配置和使用 OpenClaw、Hermes 等AI代理工具',
    link: base + '/stage-5/openclaw-guide',
    color: '#1c4736', bg: '#d5eee0',
  },
  {
    num: 6, icon: '🚀', title: 'AI 创意与创业',
    desc: '用AI创造新项目、新产品，探索AI创业之路',
    link: base + '/stage-6/ai-side-projects',
    color: '#fff', bg: '#2D5A3D',
  },
]

const zones = [
  { icon: '📰', title: 'AI 新闻', desc: '滚动更新的AI行业动态和资讯', link: base + '/news/' },
  { icon: '🔭', title: 'AI 前沿探讨', desc: '探讨AI领域最前沿的技术、趋势和思考', link: base + '/frontier/' },
  { icon: '💻', title: 'AI 编程', desc: '专为有编程经验的技术人员准备', link: base + '/coding/' },
]
</script>
