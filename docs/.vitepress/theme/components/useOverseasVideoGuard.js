import { computed, onBeforeUnmount, ref } from 'vue'
import { isOverseasMedia } from './caseBrowsing.js'

const STALL_MS = 15000

// 海外平台托管的视频（如 video.twimg.com）常不抛错但长时间拿不到画面，统一做 15 秒卡顿兜底
export function useOverseasVideoGuard(getItem, mediaRef) {
  const failed = ref(false)
  const waiting = ref(false)
  const retryCount = ref(0)
  const overseas = computed(() => {
    const item = getItem()
    return item?.mediaType === 'video' && isOverseasMedia(item.mediaUrl)
  })
  let stallTimer

  function clearStall() {
    clearTimeout(stallTimer)
  }

  function watchStall(markWaiting = false) {
    if (markWaiting === true) waiting.value = true
    clearStall()
    stallTimer = setTimeout(() => {
      if ((mediaRef.value?.readyState || 0) < 2) {
        failed.value = true
        waiting.value = false
      }
    }, STALL_MS)
  }

  function videoReady() {
    clearStall()
    waiting.value = false
  }

  function videoFailed() {
    clearStall()
    failed.value = true
    waiting.value = false
  }

  function resetMedia() {
    clearStall()
    failed.value = false
    waiting.value = false
    retryCount.value = 0
  }

  function retryMedia() {
    clearStall()
    failed.value = false
    waiting.value = false
    retryCount.value++
  }

  onBeforeUnmount(clearStall)

  return { failed, waiting, retryCount, overseas, clearStall, watchStall, videoReady, videoFailed, resetMedia, retryMedia }
}
