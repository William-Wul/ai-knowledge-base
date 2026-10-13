<template>
  <div v-if="show" class="kb-article-meta">
    <span v-if="dateText" class="kb-article-date">{{ dateText }} 发布</span>
    <button
      class="kb-font-btn"
      type="button"
      :aria-label="`调整字号，当前：${FONT_LABELS[level]}`"
      :title="`字号：${FONT_LABELS[level]}（点击切换）`"
      @click="cycleFont"
    >
      <span class="small" aria-hidden="true">A</span><span class="big" aria-hidden="true">A</span>
      <span class="label">{{ FONT_LABELS[level] }}</span>
    </button>
  </div>
</template>

<script setup>
// 文章顶部一行：发布日期（前沿类文章）+ 字号切换（标准 / 大 / 特大，记在本机）
import { computed, ref, onMounted } from 'vue'
import { useData, useRoute } from 'vitepress'

const FONT_KEY = 'kb_font_level'
const FONT_LABELS = ['标准', '大', '特大']

const { frontmatter } = useData()
const route = useRoute()
const level = ref(0)

const show = computed(() => {
  const fm = frontmatter.value || {}
  return !(fm.layout === 'home' || fm.layout === 'page' || fm.sidebar === false)
})

// news 文章正文里已手写日期行，日报标题自带日期；这里只补前沿与趋势长文
const dateText = computed(() => {
  if (!/^\/(frontier|stage-6)\/[^/]+$/.test(route.path) || route.path.endsWith('/index')) return ''
  const raw = frontmatter.value.date
  const d = raw instanceof Date ? raw : raw ? new Date(String(raw)) : null
  if (!d || isNaN(d)) return ''
  return `${d.getUTCFullYear()} 年 ${d.getUTCMonth() + 1} 月 ${d.getUTCDate()} 日`
})

function applyFont() {
  const el = document.documentElement
  el.classList.toggle('kb-fs-1', level.value === 1)
  el.classList.toggle('kb-fs-2', level.value === 2)
}

function cycleFont() {
  level.value = (level.value + 1) % FONT_LABELS.length
  try { localStorage.setItem(FONT_KEY, String(level.value)) } catch {}
  applyFont()
}

onMounted(() => {
  let saved = 0
  try { saved = Number(localStorage.getItem(FONT_KEY)) || 0 } catch {}
  level.value = saved >= 0 && saved < FONT_LABELS.length ? saved : 0
  applyFont()
})
</script>

<style scoped>
.kb-article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0 0 0.75rem;
  font-size: 13px;
  color: var(--kb-text-3);
}

.kb-font-btn {
  margin-left: auto;
  display: inline-flex;
  align-items: baseline;
  gap: 1px;
  min-height: 32px;
  padding: 4px 10px;
  border: 1px solid var(--kb-border);
  border-radius: 999px;
  background: var(--kb-surface);
  color: var(--kb-text-2);
  font-size: 12px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.kb-font-btn:hover,
.kb-font-btn:focus-visible {
  border-color: var(--kb-brand);
  color: var(--kb-brand);
}

.kb-font-btn .small { font-size: 11px; font-weight: 600; }
.kb-font-btn .big { font-size: 15px; font-weight: 600; margin-right: 5px; }
</style>
