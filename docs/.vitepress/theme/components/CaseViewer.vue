<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
const props = defineProps({ item: { type: Object, required: true }, index: { type: Number, required: true }, total: { type: Number, required: true }, detailHref: { type: String, required: true } })
const emit = defineEmits(['previous', 'next', 'close', 'learn'])
const dialog = ref(null)
const media = ref(null)
const closeButton = ref(null)
const failed = ref(false)
const waiting = ref(false)
const imageLoaded = ref(false)
const retryCount = ref(0)
let scrollY = 0
let bodyStyle
function stop() { media.value?.pause?.() }
function retry() { failed.value = false; waiting.value = false; imageLoaded.value = false; retryCount.value++ }
function leave() { stop(); emit('learn') }
function keydown(event) {
  // Preserve native seeking/volume and editing keys. Dialog contains focus.
  if (event.target.closest?.('video,input,textarea,select,[contenteditable="true"]')) return
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
  if (event.key === 'ArrowLeft' && props.index > 0) { event.preventDefault(); emit('previous') }
  if (event.key === 'ArrowRight' && props.index < props.total - 1) { event.preventDefault(); emit('next') }
}
function backdrop(event) {
  if (event.target !== dialog.value) return
  const rect = dialog.value.getBoundingClientRect()
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) emit('close')
}
watch(() => props.item.slug, () => { stop(); failed.value = false; waiting.value = false; imageLoaded.value = false; retryCount.value = 0 })
onMounted(async () => {
  scrollY = window.scrollY
  bodyStyle = { position: document.body.style.position, top: document.body.style.top, left: document.body.style.left, right: document.body.style.right, paddingRight: document.body.style.paddingRight }
  const gap = Math.max(0, window.innerWidth - document.documentElement.clientWidth)
  Object.assign(document.body.style, { position: 'fixed', top: `-${scrollY}px`, left: '0', right: '0', paddingRight: `${gap}px` })
  dialog.value.showModal()
  await nextTick()
  closeButton.value?.focus({ preventScroll: true })
})
onBeforeUnmount(() => {
  stop()
  dialog.value?.close()
  if (bodyStyle) { Object.assign(document.body.style, bodyStyle); window.scrollTo(0, scrollY) }
})
</script>
<template>
  <dialog ref="dialog" class="case-viewer" aria-labelledby="case-viewer-title" @cancel.prevent="emit('close')" @keydown="keydown" @click="backdrop">
    <div class="case-viewer-shell">
      <header class="case-viewer-header">
        <span class="case-viewer-position" role="status">第 {{ index + 1 }} / {{ total }} 个</span>
        <span class="case-viewer-key-hint">← → 切换 · Esc 关闭</span>
        <button ref="closeButton" class="case-viewer-close" type="button" aria-label="关闭预览" @click="emit('close')">关闭 <span aria-hidden="true">×</span></button>
      </header>
      <div class="case-viewer-main">
        <div class="case-viewer-stage">
          <video v-if="item.mediaType === 'video' && !failed" :key="item.slug + retryCount" ref="media" :src="item.mediaUrl" :poster="item.cover" :aria-label="item.title + '效果视频'" controls playsinline :preload="retryCount ? 'metadata' : 'none'" @waiting="waiting = true" @canplay="waiting = false" @playing="waiting = false" @error="failed = true; waiting = false" />
          <img v-else :key="item.slug + retryCount" class="no-zoom" :src="failed ? item.cover : (item.imageUrl || item.cover)" :alt="item.title + '效果预览'" @load="imageLoaded = true" @error="failed = true" />
          <img v-if="item.mediaType !== 'video' && !imageLoaded && !failed" class="no-zoom case-viewer-placeholder" :src="item.cover" alt="" aria-hidden="true" />
          <span v-if="waiting || (item.mediaType !== 'video' && !imageLoaded && !failed)" class="case-viewer-loading" role="status">{{ item.mediaType === 'video' ? '视频加载中…' : '图片加载中…' }}</span>
          <div v-if="failed" class="case-viewer-error" role="status"><p>效果暂时无法加载，可以重试或继续看下一个。</p><button class="case-button" type="button" @click="retry">重新加载</button></div>
        </div>
        <aside class="case-viewer-info">
          <p class="case-viewer-model">{{ item.models.join(' · ') || '通用 AI 工具' }}</p>
          <h2 id="case-viewer-title">{{ item.title }}</h2>
          <p class="case-viewer-summary">{{ item.summary }}</p>
          <p class="case-viewer-use">{{ item.use }}</p>
          <p class="case-viewer-credit">来源效果展示 · {{ item.creator }}</p>
          <a class="case-button case-primary case-viewer-learn vp-raw" :href="detailHref" @click="leave">查看方法与提示词 →</a>
          <p v-if="item.mediaType === 'video'" class="case-viewer-note">点击播放；切换案例时会停止当前视频。</p>
        </aside>
      </div>
      <footer class="case-viewer-footer">
        <button type="button" class="case-button" :disabled="index === 0" @click="emit('previous')">← 上一个</button>
        <a class="case-button case-primary case-viewer-mobile-learn vp-raw" :href="detailHref" @click="leave">查看方法 →</a>
        <span class="case-viewer-boundary">{{ index === 0 ? '这是第一个案例' : index === total - 1 ? '已到最后一个案例' : '按当前分类和搜索结果翻看' }}</span>
        <button type="button" class="case-button" :disabled="index === total - 1" @click="emit('next')">下一个 →</button>
      </footer>
    </div>
  </dialog>
</template>
