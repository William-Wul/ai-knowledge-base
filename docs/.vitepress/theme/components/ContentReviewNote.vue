<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'
const { frontmatter } = useData()
const reviewedDate = computed(() => {
  const value = frontmatter.value.lastReviewed
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value || '').slice(0, 10)
})
</script>
<template>
  <p v-if="frontmatter.lastReviewed" class="content-review-note">
    内容复核：{{ reviewedDate }}<span v-if="frontmatter.reviewScope"> · {{ frontmatter.reviewScope }}</span>
  </p>
</template>
<style scoped>
.content-review-note { color: var(--vp-c-text-2); font-size: .82rem; line-height: 1.6; margin: .5rem 0 1.25rem; }
</style>
