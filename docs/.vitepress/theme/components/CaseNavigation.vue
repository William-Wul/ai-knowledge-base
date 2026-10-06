<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import cases from '../../data/cases-generated/index.json'
import { resolveCaseContext, buildCaseHref, buildPreviewHref, pauseCaseMedia } from './caseBrowsing.js'

const props = defineProps({ item: { type: Object, required: true } })
const route = useRoute()
const fromPath = ref(null)
const context = computed(() => resolveCaseContext(props.item, cases, fromPath.value))
const previewHref = computed(() => buildPreviewHref(props.item.slug, context.value.listPath))
const previousHref = computed(() => context.value.previous && buildCaseHref(context.value.previous.slug, context.value.listPath))
const nextHref = computed(() => context.value.next && buildCaseHref(context.value.next.slug, context.value.listPath))

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
      <a :href="previewHref" @click="pause">← 返回预览</a>
      <a :href="context.listPath" @click="pause">返回列表</a>
      <span class="case-detail-progress" aria-live="polite">第 {{ context.index + 1 }} / {{ context.results.length }} 个</span>
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
