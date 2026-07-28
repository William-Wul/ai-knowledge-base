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
import { BASIC_MODULES, CAUTION_LINKS, TOOL_LINKS, PRACTICE_LINKS, FRONTIER_EXTRA_LINKS, SECTIONS, BOARDS } from '../../stagesData.js'

const route = useRoute()

// 目录 → 所属板块（目录级默认归属，2026-07-28 内容重组）
const DIR_TO_BOARD = Object.fromEntries(
  Object.values(BOARDS).flatMap(b => b.dirs.map(d => [d, b]))
)

// stage-1/2/5 → 基础学习模块（Agent 教程物理存放在 stage-5，展示归工具上手）
const BASIC_BY_DIR = {
  'stage-1': BASIC_MODULES[0],
  'stage-2': BASIC_MODULES[1],
  'stage-5': BASIC_MODULES[1],
}
// 文件级显式归属（跨目录逻辑分组，优先于目录级默认）
const CAUTION_SET = new Set(CAUTION_LINKS)
const TOOL_SET = new Set(TOOL_LINKS)
const PRACTICE_SET = new Set(PRACTICE_LINKS)
const FRONTIER_EXTRA_SET = new Set(FRONTIER_EXTRA_LINKS)

const crumbs = computed(() => {
  const path = (route.path || '').replace(/\.html$/, '')
  // 去掉首页和前言
  if (path === '/' || path === '/index' || path.startsWith('/preface')) return []

  const parts = path.replace(/^\//, '').split('/').filter(Boolean)
  if (parts.length < 2 || !parts[1]) return [] // 板块/栏目首页自己不显示面包屑

  const first = parts[0]
  const full = `/${parts.join('/')}`

  // 1) 文件级显式归属（优先于目录级默认）
  if (CAUTION_SET.has(full)) {
    return [
      { text: BOARDS.basics.text, link: BOARDS.basics.link },
      { text: BASIC_MODULES[2].name, link: BASIC_MODULES[2].link },
    ]
  }
  if (TOOL_SET.has(full)) {
    return [
      { text: BOARDS.basics.text, link: BOARDS.basics.link },
      { text: BASIC_MODULES[1].name, link: BASIC_MODULES[1].link },
    ]
  }
  if (PRACTICE_SET.has(full)) {
    return [{ text: BOARDS.practice.text, link: BOARDS.practice.link }]
  }
  if (FRONTIER_EXTRA_SET.has(full)) {
    return [
      { text: BOARDS.pulse.text, link: BOARDS.pulse.link },
      { text: SECTIONS.frontier.text, link: SECTIONS.frontier.link },
    ]
  }

  // 2) 目录级默认归属
  const board = DIR_TO_BOARD[first]
  if (!board) return []

  // 日报 / 新闻 / 前沿 → AI 最新动态 / 栏目
  if (SECTIONS[first]) {
    return [
      { text: board.text, link: board.link },
      { text: SECTIONS[first].text, link: SECTIONS[first].link },
    ]
  }

  // 基础学习 → 板块 / 模块
  if (BASIC_BY_DIR[first]) {
    const mod = BASIC_BY_DIR[first]
    return [
      { text: board.text, link: board.link },
      { text: mod.name, link: mod.link },
    ]
  }

  // 进阶实践：扁平文章池，只显示板块
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
