<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import cases from '../../data/cases-generated/index.json'
import { CASE_CATEGORIES, CASE_COLLECTIONS } from '../../casesData.js'
import { resolveCaseContext, buildCaseHref, buildPreviewHref, getListContext, pauseCaseMedia } from './caseBrowsing.js'

const props = defineProps({ item: { type: Object, required: true } })
const route = useRoute()
const fromPath = ref(null)
const context = computed(() => resolveCaseContext(props.item, cases, fromPath.value))
const previewHref = computed(() => buildPreviewHref(props.item.slug, context.value.listPath))
const previousHref = computed(() => context.value.previous && buildCaseHref(context.value.previous.slug, context.value.listPath))
const nextHref = computed(() => context.value.next && buildCaseHref(context.value.next.slug, context.value.listPath))
// 计数器说明“第几个”是在哪个范围里数的：全部案例、某个分类，或带搜索/标签的筛选结果，
// 避免读者把分类里的序号（如 32 / 90）和全站总数（599）混淆
const scopeLabel = computed(() => {
  const list = getListContext(context.value.listPath)
  if (!list) return '当前列表'
  if (list.query || list.purpose || list.topic) return '当前筛选结果'
  if (list.category === 'all') return '全部案例'
  return [...CASE_CATEGORIES, ...CASE_COLLECTIONS].find(c => c.id === list.category)?.name || '当前列表'
})

function readOrigin() {
  fromPath.value = new URLSearchParams(window.location.search).get('from')
}
function pause() { pauseCaseMedia() }
watch(() => route.path, () => { if (typeof window !== 'undefined') readOrigin() }, { flush: 'post' })
onMounted(() => { readOrigin(); window.addEventListener('popstate', readOrigin) })
onBeforeUnmount(() => { pause(); window.removeEventListener('popstate', readOrigin) })
</script>

<template>
  <nav class="case-detail-navigation" aria-label="案例连续浏览">
    <div class="case-detail-return-links">
      <!-- 主操作：回到列表页（保留原来的分类、筛选和滚动位置） -->
      <a :href="context.listPath" class="case-detail-back" @click="pause">← 返回案例列表</a>
      <!-- 次操作：回到列表并重新打开大图预览，停在当前这个案例，可继续左右翻看 -->
      <a :href="previewHref" class="case-detail-preview" title="回到列表的大图预览，从当前案例继续翻看" @click="pause">回到大图预览</a>
      <span class="case-detail-progress" aria-live="polite">{{ scopeLabel }} · 第 {{ context.index + 1 }} / {{ context.results.length }} 个</span>
    </div>
    <div class="case-detail-switcher">
      <a v-if="context.previous" :href="previousHref" class="case-detail-previous" @click="pause">
        <small>← 上一个</small><strong>{{ context.previous.title }}</strong>
      </a>
      <span v-else class="case-nav-disabled" aria-disabled="true"><small>已是第一个</small></span>
      <a v-if="context.next" :href="nextHref" class="case-detail-next" @click="pause">
        <small>下一个 →</small><strong>{{ context.next.title }}</strong>
      </a>
      <span v-else class="case-nav-disabled" aria-disabled="true"><small>已是最后一个</small></span>
    </div>
  </nav>
</template>
