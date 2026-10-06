<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import cases from '../../data/cases-generated/index.json'
import { buildListPath, resolveCaseContext, pauseCaseMedia } from './caseBrowsing.js'

const props = defineProps({
  item: { type: Object, default: null },
  category: { type: String, default: 'all' },
})
const route = useRoute()
const fromPath = ref(null)
const target = computed(() => props.item
  ? resolveCaseContext(props.item, cases, fromPath.value).listPath
  : buildListPath(props.category))
function readOrigin() { fromPath.value = new URLSearchParams(window.location.search).get('from') }
function pause() { pauseCaseMedia() }
watch(() => route.path, () => { if (typeof window !== 'undefined') readOrigin() }, { flush: 'post' })
onMounted(() => { readOrigin(); window.addEventListener('popstate', readOrigin) })
onBeforeUnmount(() => window.removeEventListener('popstate', readOrigin))
</script>
<template><p class="case-return"><a :href="target" @click="pause">← 返回案例列表</a></p></template>
