<script setup>
import { computed, nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import cases from '../../data/cases-generated/index.json'
import { CASE_CATEGORIES } from '../../casesData.js'
import CaseViewer from './CaseViewer.vue'
import { buildListPath, filterCases, buildCaseHref, buildPreviewHref, readListState, saveListState } from './caseBrowsing.js'
const props = defineProps({ category: { type: String, default: 'all' } })
const query = ref('')
const limit = ref(12)
const broken = ref({})
const previewSlug = ref('')
const results = computed(() => filterCases(cases, props.category, query.value))
const visible = computed(() => results.value.slice(0, limit.value))
const listPath = computed(() => buildListPath(props.category, query.value))
const currentIndex = computed(() => results.value.findIndex(c => c.slug === previewSlug.value))
const currentItem = computed(() => results.value[currentIndex.value])
const categoryName = id => CASE_CATEGORIES.find(c => c.id === id)?.name
let anchorSlug = ''
let savedY = 0
let prefetch
let restoreRun = 0
function search() {
  limit.value = 12
  anchorSlug = ''
  history.replaceState(history.state, '', listPath.value)
}
function remember(slug = anchorSlug) {
  if (slug) anchorSlug = slug
  // A fixed modal body has scrollY=0: retain the original position.
  if (!currentItem.value) savedY = window.scrollY
  saveListState(listPath.value, { y: savedY, limit: limit.value, anchorSlug })
}
function open(item) {
  remember(item.slug)
  history.pushState({ ...history.state, casePreviewOrigin: listPath.value }, '', buildPreviewHref(item.slug, listPath.value))
  previewSlug.value = item.slug
}
function move(direction) {
  const item = results.value[currentIndex.value + direction]
  if (!item) return
  previewSlug.value = item.slug
  history.replaceState(history.state, '', buildPreviewHref(item.slug, listPath.value))
}
async function focusAnchor() {
  await nextTick()
  const target = document.getElementById(`case-preview-${anchorSlug}`) || document.querySelector('.case-search input')
  target?.focus({ preventScroll: true })
}
function close() {
  previewSlug.value = ''
  if (history.state?.casePreviewOrigin === listPath.value) history.back()
  else history.replaceState(history.state, '', listPath.value)
  focusAnchor()
}
async function restore() {
  const run = ++restoreRun
  const params = new URLSearchParams(location.search)
  query.value = params.get('q') || ''
  previewSlug.value = ''
  const saved = readListState(listPath.value)
  limit.value = Math.min(results.value.length || 12, Math.max(12, saved?.limit || 12))
  savedY = saved?.y || 0
  anchorSlug = saved?.anchorSlug || ''
  await nextTick()
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  if (run !== restoreRun) return
  window.scrollTo(0, savedY)
  const slug = params.get('view')
  if (slug && results.value.some(c => c.slug === slug)) {
    // Direct links and returns from a detail also get a list entry beneath
    // the preview, so browser Back consistently closes the dialog.
    if (history.state?.casePreviewOrigin !== listPath.value) {
      history.replaceState({ ...history.state, casePreviewOrigin: null }, '', listPath.value)
      history.pushState({ ...history.state, casePreviewOrigin: listPath.value }, '', buildPreviewHref(slug, listPath.value))
    }
    previewSlug.value = slug
  }
  else if (slug) history.replaceState(history.state, '', listPath.value)
  if (!previewSlug.value) focusAnchor()
}
// Warm an adjacent local cover, never a second video.
watch(currentIndex, index => {
  if (index < 0 || typeof Image === 'undefined') return
  const next = results.value[index + 1]
  if (next) { prefetch = new Image(); prefetch.src = next.thumbnail || next.cover }
})
onMounted(() => { restore(); window.addEventListener('popstate', restore) })
onBeforeUnmount(() => { ++restoreRun; window.removeEventListener('popstate', restore); prefetch = null })
</script>
<template>
  <div class="case-browser">
    <nav class="case-mobile-categories" aria-label="案例分类">
      <a href="/cases/" :aria-current="category === 'all' ? 'page' : undefined">全部</a>
      <a v-for="c in CASE_CATEGORIES" :key="c.id" :href="`/cases/${c.id}/`" :aria-current="category === c.id ? 'page' : undefined">{{ c.name }}</a>
    </nav>
    <div class="case-toolbar">
      <label class="case-search">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>
        <input v-model="query" type="search" placeholder="搜索用途、案例或工具" aria-label="搜索案例" @input="search" />
      </label>
      <span class="case-count" role="status">{{ results.length }} 个案例</span>
    </div>
    <p v-if="results.length" class="case-browse-hint">点击封面连续看效果，点击标题查看方法。</p>
    <div v-if="results.length" class="case-grid">
      <article v-for="c in visible" :key="c.slug" class="case-card">
        <button :id="`case-preview-${c.slug}`" type="button" class="case-cover" :aria-label="`预览：${c.title}`" @click="open(c)">
          <img v-if="!broken[c.slug]" class="no-zoom" :src="c.thumbnail || c.cover" :alt="c.title + '效果预览'" loading="lazy" @error="broken[c.slug] = true" />
          <span v-else class="case-unavailable">预览图暂不可用</span>
          <span class="case-play">{{ c.mediaType === 'video' ? '▶ 视频预览' : '放大预览' }}</span>
        </button>
        <div class="case-card-body">
          <span class="case-type">{{ categoryName(c.category) }}{{ c.contentKind === 'code' ? ' · 组件' : '' }}</span>
          <h2><a :href="buildCaseHref(c.slug, listPath)" @click="remember(c.slug)">{{ c.title }}</a></h2>
          <p>{{ c.summary }}</p>
          <div class="case-card-bottom"><span>{{ c.models[0] || (c.category === 'web' ? 'AI 编程工具' : '通用 AI 工具') }}</span><a :href="buildCaseHref(c.slug, listPath)" @click="remember(c.slug)">查看方法 →</a></div>
        </div>
      </article>
    </div>
    <div v-else class="case-empty">
      <strong>{{ query ? '没有找到匹配的案例' : '暂未收录这一类案例' }}</strong>
      <p>{{ query ? '试试用途或工具名称，例如“旅行”“产品”“文件”。' : '有完整效果与方法的案例整理好后，会出现在这里。' }}</p>
      <button v-if="query" type="button" class="case-button" @click="query = ''; search()">清除搜索</button>
      <a v-else href="/cases/">浏览全部案例 →</a>
    </div>
    <div v-if="results.length" class="case-list-progress"><p role="status">已显示 {{ visible.length }} / {{ results.length }} 个案例</p><button v-if="results.length > limit" type="button" class="case-button case-more" @click="limit += 12">再看 {{ Math.min(12, results.length - limit) }} 个案例</button></div>
    <p class="case-library-source">案例来源：Goodcase。中文说明由本站整理，作者和原始出处见各案例页。</p>
    <CaseViewer v-if="currentItem" :item="currentItem" :index="currentIndex" :total="results.length" :detail-href="buildCaseHref(currentItem.slug, listPath)" @previous="move(-1)" @next="move(1)" @close="close" @learn="remember()" />
  </div>
</template>
