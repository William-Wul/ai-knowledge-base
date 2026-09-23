<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({ category: { type: String, required: true } })
const target = ref(`/cases/${props.category}/`)
onMounted(() => {
  try {
    const saved = JSON.parse(sessionStorage.getItem('case-list-return') || 'null')
    // Accept only this site's known list paths; never an arbitrary stored URL.
    if (/^\/cases\/(?:image\/|video\/|web\/)?(?:\?[^#]*)?$/.test(saved?.path)) target.value = saved.path
  } catch { /* Fall back to the current category. */ }
})
</script>
<template><p class="case-return"><a :href="target">← 返回案例列表</a></p></template>
