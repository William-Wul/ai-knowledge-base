<template>
  <div class="bilibili-video-wrapper">
    <p v-if="title" class="bilibili-video-title">{{ title }}</p>
    <div class="bilibili-video-container" :class="{ active: activated }" @click="activated = true">
      <div v-if="!activated" class="bilibili-video-overlay">
        <span class="play-hint">点击播放</span>
      </div>
      <iframe
        v-if="activated"
        :src="iframeSrc"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
      ></iframe>
    </div>
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
  page: {
    type: [String, Number],
    default: 1,
  },
})

const activated = ref(false)

const iframeSrc = computed(() =>
  `https://player.bilibili.com/player.html?bvid=${props.bvid}&page=${props.page}&high_quality=1&danmaku=0&autoplay=0`
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
  cursor: pointer;
}

.bilibili-video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
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

.play-hint {
  color: #fff;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.15);
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
}
</style>
