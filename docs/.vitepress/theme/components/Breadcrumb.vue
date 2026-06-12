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
import { STAGES, SECTIONS, fullTitle } from '../../stagesData.js'

const route = useRoute()

// 学习路径六阶段元数据，与顶导/侧栏共用 stagesData.js
const STAGE_META = Object.fromEntries(
  STAGES.map(s => [s.dir, { text: fullTitle(s) }])
)

const TOP_LEVEL = SECTIONS

const crumbs = computed(() => {
  const path = route.path || ''
  // 去掉首页和前言
  if (path === '/' || path === '/index.html' || path.startsWith('/preface')) return []

  const parts = path.replace(/^\//, '').replace(/\.html$/, '').split('/').filter(Boolean)
  if (parts.length === 0) return []

  const first = parts[0]

  // 学习路径：仅在正文页（不是 stage 首页）显示
  if (STAGE_META[first]) {
    if (parts.length < 2 || !parts[1]) return [] // /stage-1/ 自己就是章节首页
    return [
      { text: '学习路径' },
      { text: STAGE_META[first].text, link: `/${first}/` },
    ]
  }

  // 新闻/前沿/日报：仅在正文页显示
  if (TOP_LEVEL[first]) {
    if (parts.length < 2) return [] // /news/ 自己就是栏目首页
    return [{ text: TOP_LEVEL[first].text, link: TOP_LEVEL[first].link }]
  }

  return []
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
