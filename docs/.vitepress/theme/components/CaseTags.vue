<script setup>
import { computed } from 'vue'
import { caseTagLabels } from '../../caseTags.js'
import { buildListPath } from './caseBrowsing.js'
const props = defineProps({ item: { type: Object, required: true } })
const labels = computed(() => caseTagLabels(props.item.tags))
</script>

<template>
  <nav v-if="labels.length" class="case-detail-tags" aria-label="案例标签">
    <span>本站标签</span>
    <a v-for="tag in labels" :key="`${tag.group}-${tag.id}`" :href="buildListPath('all', '', { [tag.group]: tag.id })">{{ tag.name }}</a>
  </nav>
</template>
