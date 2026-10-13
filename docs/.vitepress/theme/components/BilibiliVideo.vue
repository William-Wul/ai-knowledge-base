<template>
  <div class="bilibili-video-wrapper">
    <p v-if="title" class="bilibili-video-title">{{ title }}</p>
    <div class="bilibili-video-container" :class="{ active: activated }">
      <!-- 用真正的 button：键盘 Tab 可达、Enter / 空格可播放，读屏会念出"播放视频" -->
      <button
        v-if="!activated"
        type="button"
        class="bilibili-video-trigger"
        :aria-label="`播放视频：${title || bvid}`"
        @click="activated = true"
      >
        <img v-if="cover" class="bilibili-video-cover" :src="cover" alt="" loading="lazy" />
        <span class="bilibili-video-overlay" :class="{ 'has-cover': !!cover }" aria-hidden="true">
          <span class="play-hint">▶ 点击播放</span>
        </span>
      </button>
      <!-- 点击后才加载播放器，并带 autoplay=1：用户已经点过一次，尽量一点就播，不用再点播放键
           （个别浏览器仍会拦截有声自动播放，那时在播放器里再点一下即可） -->
      <iframe
        v-else
        :src="iframeSrc"
        :title="`${title || '视频'} 播放器`"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen="true"
      ></iframe>
    </div>
    <!-- 未登录的嵌入播放器只有 360p，给想看清楚的人一个去 B 站原站的入口 -->
    <p class="bilibili-video-origin">
      <a :href="originUrl" target="_blank" rel="noopener noreferrer">去 B 站看高清 ↗</a>
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  bvid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  // 可选：视频封面本地路径（如 /videos/covers/xxx.jpg）。不传则回退黑底占位。
  // 封面获取：curl B站 view 接口的 pic 字段下载到 docs/public/videos/covers/
  cover: {
    type: String,
    default: '',
  },
  page: {
    type: [String, Number],
    default: 1,
  },
})

const activated = ref(false)

const iframeSrc = computed(() =>
  `https://player.bilibili.com/player.html?bvid=${props.bvid}&page=${props.page}&high_quality=1&danmaku=0&autoplay=1`
)

const originUrl = computed(() =>
  `https://www.bilibili.com/video/${props.bvid}/${Number(props.page) > 1 ? `?p=${props.page}` : ''}`
)
</script>

<style scoped>
.bilibili-video-wrapper {
  margin: 1.5rem 0;
}

.bilibili-video-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.bilibili-video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  background: #000;
}

.bilibili-video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

.bilibili-video-trigger {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  font: inherit;
}

.bilibili-video-trigger:focus-visible {
  outline: 3px solid var(--kb-brand, #2d5a3d);
  outline-offset: 3px;
}

.bilibili-video-cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.bilibili-video-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111;
  border-radius: 8px;
}

/* 有封面时不再整面压黑，只留轻遮罩 + 播放提示 */
.bilibili-video-overlay.has-cover {
  background: rgba(0, 0, 0, 0.22);
}

.play-hint {
  color: #fff;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.15);
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
}

.bilibili-video-trigger:hover .play-hint,
.bilibili-video-trigger:focus-visible .play-hint {
  background: rgba(255, 255, 255, 0.28);
}

.bilibili-video-origin {
  margin: 0.4rem 0 0;
  text-align: right;
  font-size: 13px;
  line-height: 1.6;
}

.bilibili-video-origin a {
  display: inline-block;
  padding: 4px 0;
  color: var(--kb-text-2, var(--vp-c-text-2));
  text-decoration: none;
}

.bilibili-video-origin a:hover {
  color: var(--kb-brand, var(--vp-c-brand-1));
  text-decoration: underline;
}
</style>
