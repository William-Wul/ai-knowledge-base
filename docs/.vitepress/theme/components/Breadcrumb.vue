<template>
  <nav v-if="crumbs.length" class="kb-breadcrumb" aria-label="面包屑导航">
    <template v-for="(c, i) in crumbs" :key="i">
      <a v-if="c.link" :href="c.link">{{ c.text }}</a>
      <span v-else>{{ c.text }}</span>
      <span v-if="i < crumbs.length - 1" class="sep">/</span>
    </template>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { BASIC_MODULES, CAUTION_LINKS, SECTIONS, BOARDS } from '../../stagesData.js'

const route = useRoute()

// 目录 → 所属板块（2026-07-28 改版四大板块）
const DIR_TO_BOARD = Object.fromEntries(
  Object.values(BOARDS).flatMap(b => b.dirs.map(d => [d, b]))
)

// stage-1/2 → 基础学习模块；被「使用注意事项」借用的 stage-2 文章单独归属
const BASIC_BY_DIR = {
  'stage-1': BASIC_MODULES[0],
  'stage-2': BASIC_MODULES[1],
}
const CAUTION_SET = new Set(CAUTION_LINKS)

const crumbs = computed(() => {
  const path = (route.path || '').replace(/\.html$/, '')
  // 去掉首页和前言
  if (path === '/' || path === '/index' || path.startsWith('/preface')) return []

  const parts = path.replace(/^\//, '').split('/').filter(Boolean)
  if (parts.length < 2 || !parts[1]) return [] // 板块/栏目首页自己不显示面包屑

  const first = parts[0]
  const board = DIR_TO_BOARD[first]
  if (!board) return []
  const full = `/${parts.join('/')}`

  // 日报 / 新闻 / 前沿 → AI 最新动态 / 栏目
  if (SECTIONS[first]) {
    return [
      { text: board.text, link: board.link },
      { text: SECTIONS[first].text, link: SECTIONS[first].link },
    ]
  }

  // 基础学习 → 板块 / 模块（注意事项文章归入对应模块）
  if (BASIC_BY_DIR[first]) {
    const mod = CAUTION_SET.has(full) ? BASIC_MODULES[2] : BASIC_BY_DIR[first]
    return [
      { text: board.text, link: board.link },
      { text: mod.name, link: mod.link },
    ]
  }

  // 实践技巧：扁平文章池，只显示板块
  return [{ text: board.text, link: board.link }]
})
</script>

<style scoped>
.kb-breadcrumb {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin: 0 0 16px 0;
  line-height: 1.6;
}
.kb-breadcrumb a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s;
}
.kb-breadcrumb a:hover {
  color: var(--vp-c-brand-1);
}
.kb-breadcrumb .sep {
  margin: 0 8px;
  color: var(--vp-c-divider);
}
</style>
