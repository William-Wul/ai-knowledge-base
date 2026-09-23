<script setup>
import { computed, nextTick, onMounted, onBeforeUnmount, ref } from 'vue'
import cases from '../../data/cases-generated/index.json'
import { CASE_CATEGORIES } from '../../casesData.js'

const props = defineProps({ category: { type: String, default: 'all' } })
const query = ref('')
const limit = ref(12)
const broken = ref({})
const results = computed(() => cases.filter(c =>
  (props.category === 'all' || c.category === props.category) &&
  `${c.title} ${c.summary} ${c.use} ${c.models.join(' ')} ${c.creator}`.toLowerCase().includes(query.value.trim().toLowerCase())
))
const visible = computed(() => results.value.slice(0, limit.value))
const categoryName = id => CASE_CATEGORIES.find(c => c.id === id)?.name

function search() {
  limit.value = 12
  const url = new URL(location.href)
  query.value ? url.searchParams.set('q', query.value) : url.searchParams.delete('q')
  history.replaceState(history.state, '', url.pathname + url.search)
}
function remember() {
  try {
    sessionStorage.setItem('case-list-return', JSON.stringify({
      path: (props.category === 'all' ? '/cases/' : `/cases/${props.category}/`) + (query.value ? `?${new URLSearchParams({ q: query.value })}` : ''),
      y: window.scrollY, limit: limit.value,
    }))
  } catch { /* Browsing and copying still work when storage is unavailable. */ }
}
async function restore() {
  query.value = new URLSearchParams(location.search).get('q') || ''
  limit.value = 12
  try {
    const saved = JSON.parse(sessionStorage.getItem('case-list-return') || 'null')
    if (saved?.path === location.pathname + location.search) {
      limit.value = saved.limit || 12
      await nextTick()
      requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, saved.y || 0)))
    }
  } catch { /* No prior list position. */ }
}
onMounted(() => { restore(); window.addEventListener('popstate', restore) })
onBeforeUnmount(() => window.removeEventListener('popstate', restore))
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
    <div v-if="results.length" class="case-grid">
      <a v-for="c in visible" :key="c.slug" class="case-card" :href="`/cases/${c.slug}`" @click="remember">
        <div class="case-cover">
          <img v-if="!broken[c.slug]" class="no-zoom" :src="c.thumbnail || c.cover" :alt="c.title + '效果预览'" loading="lazy" @error="broken[c.slug] = true" />
          <span v-else class="case-unavailable">预览图暂不可用</span>
          <span v-if="c.mediaType === 'video'" class="case-play">▶ 视频演示</span>
        </div>
        <div class="case-card-body">
          <span class="case-type">{{ categoryName(c.category) }}{{ c.contentKind === 'code' ? ' · 组件' : '' }}</span>
          <h2>{{ c.title }}</h2>
          <p>{{ c.summary }}</p>
          <div class="case-card-bottom"><span>{{ c.models[0] || (c.category === 'web' ? 'AI 编程工具' : '通用 AI 工具') }}</span><span>查看案例 →</span></div>
        </div>
      </a>
    </div>
    <div v-else class="case-empty">
      <strong>{{ query ? '没有找到匹配的案例' : '暂未收录这一类案例' }}</strong>
      <p>{{ query ? '试试用途或工具名称，例如“旅行”“产品”“文件”。' : '有完整效果与方法的案例整理好后，会出现在这里。' }}</p>
      <button v-if="query" type="button" class="case-button" @click="query = ''; search()">清除搜索</button>
      <a v-else href="/cases/">浏览全部案例 →</a>
    </div>
    <button v-if="results.length > limit" type="button" class="case-button case-more" @click="limit += 12">再看 {{ Math.min(12, results.length - limit) }} 个案例</button>
    <p class="case-library-source">案例来源：Goodcase。中文说明由本站整理，作者和原始出处见各案例页。</p>
  </div>
</template>
