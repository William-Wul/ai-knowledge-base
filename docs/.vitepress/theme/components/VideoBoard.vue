<template>
  <div class="video-board">
    <section v-for="s in sections" :key="s.id" class="video-section">
      <div class="section-head">
        <h2 class="section-name">{{ s.name }}</h2>
        <p v-if="s.desc" class="section-desc">{{ s.desc }}</p>
      </div>

      <div class="card-grid">
        <article v-for="v in s.videos" :key="v.id" class="video-card" @click="open(v)">
          <div class="cover-box">
            <img class="cover" :src="v.cover" :alt="v.title" loading="lazy" />
            <span class="duration">{{ v.duration }}</span>
            <span class="play-overlay"><span class="play-btn">▶</span></span>
          </div>
          <div class="card-body">
            <h3 class="card-title">{{ v.title }}</h3>
            <p class="card-meta">{{ v.up }} · {{ v.stats }}</p>
            <p class="card-reason">{{ v.reason }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- 大窗播放：点卡片弹出居中播放器，ESC / 点遮罩 / ✕ 关闭 -->
    <Transition name="fade">
      <div v-if="active" class="video-modal" @click.self="close">
        <div class="modal-box">
          <div class="modal-head">
            <span class="modal-title">{{ active.title }}</span>
            <div class="modal-actions">
              <a
                class="act-origin"
                :href="`https://www.bilibili.com/video/${active.bvid}/`"
                target="_blank"
                rel="noopener noreferrer"
              >B 站打开 ↗</a>
              <button class="modal-close" aria-label="关闭播放器" @click="close">✕</button>
            </div>
          </div>
          <div class="modal-player">
            <!-- autoplay=0：浏览器禁止跨页面点击带声音自动播放，进播放器点一下播放键才有声 -->
            <iframe
              :key="active.bvid"
              :src="playerSrc(active.bvid)"
              scrolling="no"
              frameborder="no"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { VIDEO_SECTIONS } from '../../videosData.js'

const sections = computed(() => VIDEO_SECTIONS.filter(s => s.videos.length))

const active = ref(null)
const open = v => (active.value = v)
const close = () => (active.value = null)

const playerSrc = bvid =>
  `https://player.bilibili.com/player.html?bvid=${bvid}&high_quality=1&danmaku=0&autoplay=0`

// ESC 关闭
const onKey = e => { if (e.key === 'Escape') close() }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
// 弹窗期间锁住页面滚动
watch(active, v => (document.body.style.overflow = v ? 'hidden' : ''))
</script>

<style scoped>
.video-board {
  margin: 4px 0 24px;
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

/* ── 卡片网格：桌面 4 列，窄屏逐级降列 ── */
.card-grid {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px 16px;
}

.video-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background: var(--vp-c-bg);
  cursor: pointer;
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
}
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
.video-card:hover .play-overlay {
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

/* ── 卡片信息区 ── */
.card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 11px 12px 10px;
}
.card-title {
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.9em;
}
.card-meta {
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-reason {
  margin: 8px 0 0;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── 大窗播放弹层 ── */
.video-modal {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.78);
}
.modal-box {
  width: min(960px, 94vw);
}
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 2px 10px;
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
  width: 28px;
  height: 28px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
}
.modal-close:hover {
  background: rgba(255, 255, 255, 0.26);
}
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ── 列数随窗口宽度降级 ── */
@media (max-width: 1279px) {
  .card-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 959px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 559px) {
  .card-grid { grid-template-columns: 1fr; }
  .video-modal { padding: 0; }
  .modal-box { width: 100vw; }
  .modal-head { padding: 10px 12px 8px; }
  .modal-player { border-radius: 0; }
}
</style>
