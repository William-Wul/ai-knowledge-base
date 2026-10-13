<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { isOverseasMedia } from './caseBrowsing.js'
const props = defineProps({ item: { type: Object, required: true } })
const item = computed(() => props.item)
const failed = ref(false)
const retryCount = ref(0)
const video = ref(null)
// 海外平台托管的视频（如 video.twimg.com）国内网络常常打不开，提前说明并给出替代入口
const overseas = computed(() => item.value.mediaType === 'video' && isOverseasMedia(item.value.mediaUrl))
// 被墙的视频常常既不报错也不加载：开始播放后 15 秒仍拿不到画面，就按加载失败处理
let stallTimer
function clearStall() { clearTimeout(stallTimer) }
function watchStall() {
  clearStall()
  stallTimer = setTimeout(() => { if ((video.value?.readyState || 0) < 2) failed.value = true }, 15000)
}
function videoFailed() { clearStall(); failed.value = true }
function retry() { clearStall(); failed.value = false; retryCount.value++ }
watch(() => item.value.slug, () => { clearStall(); failed.value = false; retryCount.value = 0 })
onBeforeUnmount(clearStall)
</script>
<template>
  <figure v-if="item" class="case-media-block">
    <div class="case-media">
      <video v-if="item.mediaType === 'video' && !failed" :key="retryCount" ref="video" :src="item.mediaUrl" :poster="item.cover" controls playsinline :preload="retryCount ? 'metadata' : 'none'" :aria-label="item.title + '效果视频'" @play="watchStall" @waiting="watchStall" @loadeddata="clearStall" @canplay="clearStall" @playing="clearStall" @error="videoFailed" />
      <img v-else :src="failed ? item.cover : (item.imageUrl || item.cover)" :alt="item.title + '来源效果图'" @error="failed = true" />
      <div v-if="failed" class="case-unavailable" role="status">
        <p v-if="overseas"><strong>该视频托管在海外平台，国内网络可能无法播放。</strong>上方是作品封面，下方的方法和完整提示词仍可使用。</p>
        <p v-else>效果媒体暂未加载成功，下方的方法和完整提示词仍可使用。</p>
        <div v-if="item.mediaType === 'video'" class="case-unavailable-actions">
          <a v-if="item.sourceUrl" class="case-button" :href="item.sourceUrl" target="_blank" rel="noopener noreferrer">打开原帖 ↗</a>
          <button type="button" class="case-button" @click="retry">重新加载</button>
        </div>
      </div>
    </div>
    <figcaption>{{ item.mediaNote || (item.mediaType === 'video' ? '来源效果演示，点击播放' : '来源效果展示，点击图片可放大') }} · {{ item.creator }}<template v-if="overseas && !failed"><br><span class="case-media-overseas">海外视频源，国内网络可能无法播放；打不开时可直接看下方的方法和提示词。</span></template></figcaption>
  </figure>
</template>
