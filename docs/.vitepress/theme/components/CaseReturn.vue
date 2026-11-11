<script setup>
import { computed } from 'vue'
import { buildListPath, pauseCaseMedia } from './caseBrowsing.js'
import { useCaseOriginContext } from './useCaseOriginContext.js'

const props = defineProps({
  item: { type: Object, default: null },
  category: { type: String, default: 'all' },
})
const { context } = useCaseOriginContext(() => props.item)
const target = computed(() => context.value ? context.value.listPath : buildListPath(props.category))
function pause() { pauseCaseMedia() }
</script>
<template><p class="case-return"><a :href="target" @click="pause">← 返回案例列表</a></p></template>
