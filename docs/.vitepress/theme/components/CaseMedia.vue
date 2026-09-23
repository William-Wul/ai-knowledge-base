<script setup>
import { computed, ref } from 'vue'
const props = defineProps({ item: { type: Object, required: true } })
const item = computed(() => props.item)
const failed = ref(false)
</script>
<template>
  <figure v-if="item" class="case-media-block">
    <div class="case-media">
      <video v-if="item.mediaType === 'video'" :src="item.mediaUrl" :poster="item.cover" controls playsinline preload="none" :aria-label="item.title + '效果视频'" @error="failed = true" />
      <img v-else :src="failed ? item.cover : (item.imageUrl || item.cover)" :alt="item.title + '来源效果图'" @error="failed = true" />
      <p v-if="failed" class="case-unavailable">效果媒体暂未加载成功，下方的方法和完整提示词仍可使用。</p>
    </div>
    <figcaption>{{ item.mediaNote || (item.mediaType === 'video' ? '来源效果演示，点击播放' : '来源效果展示，点击图片可放大') }} · {{ item.creator }}</figcaption>
  </figure>
</template>
