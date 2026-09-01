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
  margin: 8px 0 24px;
}

/* ── 分类区块 ── */
.video-section + .video-section {
  margin-top: 40px;
}
.section-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  padding-bottom: 8px;
  border-bottom: 2px solid var(--vp-c-divider);
  margin: 0 0 4px;
}
.section-desc {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 8px 0 0;
}

/* ── 卡片网格 ── */
.card-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 22px;
}

.video-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg);
  cursor: pointer;
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}
.video-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 24px rgba(45, 90, 61, 0.12);
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
  right: 8px;
  bottom: 8px;
  z-index: 1;
  padding: 1px 7px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.72);
  color: #fff;
  font-size: 12px;
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
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(45, 90, 61, 0.92);
  color: #fff;
  font-size: 18px;
  padding-left: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
}
/* 触屏设备没有 hover，常显轻量播放提示 */
@media (hover: none) {
  .play-overlay { opacity: 1; background: rgba(0, 0, 0, 0.08); }
  .play-btn { width: 42px; height: 42px; font-size: 15px; background: rgba(45, 90, 61, 0.85); }
}

/* ── 卡片信息区 ── */
.card-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 14px 16px 12px;
}
.card-title {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-meta {
  margin: 6px 0 0;
  font-size: 12.5px;
  color: var(--vp-c-text-3);
}
.card-reason {
  margin: 10px 0 0;
  font-size: 13.5px;
  line-height: 1.75;
  color: var(--vp-c-text-2);
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

@media (max-width: 640px) {
  .card-grid { grid-template-columns: 1fr; }
  .video-modal { padding: 0; }
  .modal-box { width: 100vw; }
  .modal-head { padding: 10px 12px 8px; }
  .modal-player { border-radius: 0; }
}
</style>
