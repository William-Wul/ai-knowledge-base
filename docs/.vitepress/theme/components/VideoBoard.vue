<template>
  <div class="video-board">
    <p class="video-data-note">播放与收藏数据为收录时记录，非实时数据。</p>
    <p class="learning-note">本站学习建议 · {{ VIDEO_LEARNING_NOTE }}</p>
    <section v-for="s in sections" :key="s.id" class="video-section">
      <div class="section-head">
        <h2 class="section-name">{{ s.name }}</h2>
        <p v-if="s.desc" class="section-desc">{{ s.desc }}</p>
      </div>

      <div class="card-grid">
        <article v-for="v in s.videos" :key="v.id" class="video-card">
          <button class="cover-box" type="button" :aria-label="`播放：${v.title}`" @click="open(v, $event)">
            <img class="cover no-zoom" :src="v.cover" alt="" loading="lazy" />
            <span class="duration">{{ v.duration }}</span>
            <span class="play-overlay" aria-hidden="true"><span class="play-btn">▶</span></span>
          </button>
          <div class="card-body">
            <h3 class="card-title"><button type="button" class="card-title-button" :aria-label="`播放：${v.title}`" @click="open(v, $event)">{{ v.cardTitle || v.title }}</button></h3>
            <p class="card-meta">{{ v.up }} · {{ v.duration }} · {{ v.stats }}</p>
            <p v-if="v.learning" class="card-audience">适合谁：{{ v.learning.audience }}</p>
            <p class="card-reason">{{ v.reason }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- 大窗播放：点卡片弹出居中播放器，ESC / 点遮罩 / ✕ 关闭 -->
    <dialog v-if="active" ref="dialog" class="video-modal" aria-labelledby="video-modal-title" @cancel.prevent="close" @click="backdrop">
        <div class="modal-box">
          <div class="modal-head">
            <span id="video-modal-title" class="modal-title">{{ active.title }}</span>
            <div class="modal-actions">
              <a
                class="act-origin"
                :href="`https://www.bilibili.com/video/${active.bvid}/`"
                target="_blank"
                rel="noopener noreferrer"
              >B 站打开 ↗</a>
              <button ref="closeButton" class="modal-close" type="button" aria-label="关闭播放器" @click="close">✕</button>
            </div>
          </div>
          <div class="modal-player">
            <!-- autoplay=0：浏览器禁止跨页面点击带声音自动播放，进播放器点一下播放键才有声 -->
            <iframe
              :key="active.bvid"
              :src="playerSrc(active.bvid)"
              :title="`${active.title} 视频播放器`"
              scrolling="no"
              frameborder="no"
              allowfullscreen
            ></iframe>
          </div>
          <section v-if="active.learning" class="modal-learning" aria-labelledby="video-learning-title">
            <h2 id="video-learning-title">本站学习建议</h2>
            <dl>
              <dt>适合谁</dt><dd>{{ active.learning.audience }}</dd>
              <dt>先准备什么</dt><dd>{{ active.learning.preparation }}</dd>
              <dt>看完做一次</dt><dd>{{ active.learning.practice }}</dd>
            </dl>
            <p>{{ VIDEO_LEARNING_NOTE }}</p>
          </section>
        </div>
    </dialog>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { VIDEO_SECTIONS, VIDEO_LEARNING_NOTE } from '../../videosData.js'
import { hasCaseAccess } from './caseBrowsing.js'

const sections = computed(() => VIDEO_SECTIONS.filter(s => s.videos.length))

const active = ref(null)
const allowed = ref(false)
const dialog = ref(null)
const closeButton = ref(null)
let opener
let originalOverflow
let scrollLocked = false

async function open(video, event) {
  // 原生 dialog 会出现在页面最上层，与案例预览一样先检查访问状态。
  if (!(allowed.value || hasCaseAccess()) || active.value) return
  opener = event?.currentTarget || document.activeElement
  originalOverflow = document.body.style.overflow
  scrollLocked = true
  document.body.style.overflow = 'hidden'
  active.value = video
  await nextTick()
  if (!active.value || !dialog.value) return
  dialog.value.showModal()
  closeButton.value?.focus({ preventScroll: true })
}

function restoreScroll() {
  if (!scrollLocked) return
  document.body.style.overflow = originalOverflow
  scrollLocked = false
}

function close() {
  if (!active.value) return
  dialog.value?.close()
  active.value = null // 移除 iframe，关闭时停止播放。
  restoreScroll()
  const target = opener
  nextTick(() => { if (target?.isConnected) target.focus({ preventScroll: true }) })
}

function backdrop(event) {
  if (event.target !== dialog.value) return
  const rect = dialog.value.getBoundingClientRect()
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close()
}

const playerSrc = bvid =>
  `https://player.bilibili.com/player.html?bvid=${bvid}&high_quality=1&danmaku=0&autoplay=0`

const onAuthenticated = () => { allowed.value = true }
onMounted(() => {
  allowed.value = hasCaseAccess()
  window.addEventListener('kb-authenticated', onAuthenticated)
})
onBeforeUnmount(() => {
  window.removeEventListener('kb-authenticated', onAuthenticated)
  dialog.value?.close()
  restoreScroll()
})
</script>

<style scoped>
.video-board {
  margin: 4px 0 24px;
}
.video-data-note { font-size: 12px; color: var(--vp-c-text-3); margin: 0 0 16px; }
.learning-note {
  margin: 0 0 18px;
  font-size: 12px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
}

/* ── 分类区块 ── */
.video-section + .video-section {
  margin-top: 28px;
}
.section-name {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  padding-bottom: 6px;
  border-bottom: 1.5px solid var(--vp-c-divider);
  margin: 0 0 4px;
}
.section-desc {
  font-size: 12.5px;
  color: var(--vp-c-text-3);
  margin: 6px 0 0;
}

/* ── 卡片网格：桌面 4 列，所有行等高（grid-auto-rows 1fr）→ 每张卡同尺寸方块 ── */
.card-grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;
  gap: 14px 16px;
}

.video-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}
.video-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 6px 18px rgba(45, 90, 61, 0.1);
  transform: translateY(-2px);
}

/* ── 封面 ── */
.cover-box {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  overflow: hidden;
  display: block;
  border: none;
  padding: 0;
  cursor: pointer;
}
.cover-box:focus-visible { outline: 3px solid var(--vp-c-brand-1); outline-offset: -3px; }
.cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.duration {
  position: absolute;
  right: 6px;
  bottom: 6px;
  z-index: 1;
  padding: 1px 6px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.72);
  color: #fff;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}
.play-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.18);
  opacity: 0;
  transition: opacity 0.25s;
}
.video-card:hover .play-overlay,
.cover-box:focus-visible .play-overlay {
  opacity: 1;
}
.play-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(45, 90, 61, 0.92);
  color: #fff;
  font-size: 13px;
  padding-left: 2px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.35);
}
/* 触屏设备没有 hover，常显轻量播放提示 */
@media (hover: none) {
  .play-overlay { opacity: 1; background: rgba(0, 0, 0, 0.08); }
  .play-btn { width: 32px; height: 32px; font-size: 11px; background: rgba(45, 90, 61, 0.85); }
}

/* ── 卡片信息区：文字全部显示，不截断；放不下靠小字号 + 紧行距消化 ── */
.card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px 12px 10px;
}
.card-title {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  margin: 0;
}
.card-title-button {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: inherit;
  text-align: left;
  cursor: pointer;
}
.card-title-button:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.card-meta {
  margin: 4px 0 0;
  font-size: 11.5px;
  line-height: 1.4;
  color: var(--vp-c-text-3);
}
.card-audience {
  margin: 7px 0 0;
  font-size: 12px;
  line-height: 1.6;
  color: var(--vp-c-brand-1);
}
.card-reason {
  margin: 7px 0 0;
  font-size: 12px;
  line-height: 1.62;
  color: var(--vp-c-text-2);
}

/* ── 大窗播放弹层 ── */
.video-modal {
  position: fixed;
  inset: 0;
  margin: auto;
  width: min(960px, 94vw);
  max-width: calc(100vw - 24px);
  max-height: calc(100dvh - 24px);
  padding: 0;
  border: 0;
  background: transparent;
  overflow: auto;
}
.video-modal::backdrop { background: rgba(0, 0, 0, 0.78); }
.modal-box {
  width: 100%;
}
.modal-head {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 10px 10px 0 0;
  background: #17251d;
}
.modal-title {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.modal-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}
.act-origin {
  font-size: 13px;
  color: #a8d3b8;
  text-decoration: none;
}
.act-origin:hover {
  text-decoration: underline;
}
.modal-close {
  border: none;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  width: 44px;
  height: 44px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
}
.modal-close:hover {
  background: rgba(255, 255, 255, 0.26);
}
.modal-close:focus-visible,
.act-origin:focus-visible { outline: 2px solid #a8d3b8; outline-offset: 3px; }
.modal-player {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
}
.modal-player iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
}
.modal-learning {
  margin-top: 12px;
  padding: 18px 20px;
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.modal-learning h2 { margin: 0 0 12px; border: 0; padding: 0; font-size: 15px; }
.modal-learning dl { display: grid; grid-template-columns: 88px minmax(0, 1fr); gap: 10px 12px; margin: 0; font-size: 13px; line-height: 1.7; }
.modal-learning dt { font-weight: 600; color: var(--vp-c-text-2); }
.modal-learning dd { margin: 0; }
.modal-learning p { margin: 14px 0 0; font-size: 11.5px; color: var(--vp-c-text-3); }

/* ── 列数随窗口宽度降级 ── */
@media (max-width: 1279px) {
  .card-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 959px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 559px) {
  .card-grid { grid-template-columns: 1fr; }
  .video-modal { width: 100vw; max-width: 100vw; }
  .modal-head { padding: 10px 12px 8px; }
  .modal-player { border-radius: 0; }
  .modal-learning { margin: 0; border-radius: 0; padding: 16px 12px; }
  .modal-learning dl { grid-template-columns: 1fr; gap: 4px; }
  .modal-learning dd + dt { margin-top: 6px; }
}
</style>
