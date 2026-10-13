<template>
  <div class="kb-module-articles">
    <p v-if="total" class="kb-module-progress">
      共 {{ total }} 篇<template v-if="readCount"> · 你已读 {{ readCount }} 篇</template>
    </p>
    <template v-for="group in groups" :key="group.title || 'all'">
      <h3 v-if="group.title" class="kb-module-group">{{ group.title }}</h3>
      <ol class="kb-module-list">
        <li v-for="(a, i) in group.items" :key="a.link">
          <a :href="a.link" class="kb-module-card" :class="{ read: isRead(a.link) }">
            <span class="kb-module-head">
              <span v-if="startHere && group === groups[0] && i === 0" class="kb-module-start">从这篇开始</span>
              <span class="kb-module-title">{{ a.title }}</span>
            </span>
            <span v-if="a.description" class="kb-module-desc">{{ a.description }}</span>
            <span class="kb-module-foot">
              <span v-if="showDate && a.date">{{ a.date }}</span>
              <span v-if="a.minutes">约 {{ a.minutes }} 分钟</span>
              <span v-if="isRead(a.link)" class="kb-module-read">✓ 已读</span>
            </span>
          </a>
        </li>
      </ol>
    </template>
  </div>
</template>

<script setup>
// 模块首页的文章卡片列表：文章清单直接取侧栏配置（与侧栏永远一致），
// 说明和阅读时长来自 articles.data.js。手机上没有左侧目录，这里就是入口。
import { computed, onMounted } from 'vue'
import { useData } from 'vitepress'
import { data as articles } from '../articles.data.js'
import { readPaths, initLearningProgress } from '../learningProgress.js'

const props = defineProps({
  // 侧栏里该模块的 link，如 '/stage-1/'、'/frontier/'
  link: { type: String, required: true },
  startHere: { type: Boolean, default: false },
  showDate: { type: Boolean, default: false },
})

const { theme } = useData()

function findNode(items, link) {
  for (const it of items || []) {
    if (it.link === link && it.items) return it
    const hit = findNode(it.items, link)
    if (hit) return hit
  }
  return null
}

function toCard(it) {
  const meta = articles[it.link] || {}
  return { link: it.link, title: it.text || meta.title, description: meta.description, date: meta.date, minutes: meta.minutes }
}

// 子项本身是分组（如前沿的按月分组）时分组显示，否则一个平铺列表
const groups = computed(() => {
  const sidebar = theme.value.sidebar?.['/'] || []
  const node = findNode(sidebar, props.link)
  if (!node) return []
  const items = node.items.filter(it => it.link !== props.link)
  if (items.every(it => it.items && !it.link)) {
    return items.map(g => ({ title: g.text, items: g.items.filter(x => x.link).map(toCard) }))
  }
  return [{ title: '', items: items.filter(x => x.link && !/^https?:/.test(x.link)).map(toCard) }]
})

const total = computed(() => groups.value.reduce((n, g) => n + g.items.length, 0))
const isRead = link => Boolean(readPaths.value[link])
const readCount = computed(() => groups.value.reduce((n, g) => n + g.items.filter(a => isRead(a.link)).length, 0))

onMounted(initLearningProgress)
</script>

<style scoped>
.kb-module-progress {
  margin: 1.5rem 0 0.75rem;
  font-size: 13px;
  color: var(--kb-text-3);
}

.kb-module-group {
  margin: 1.75rem 0 0.75rem;
  font-size: 15px;
  color: var(--kb-text-2);
}

.vp-doc .kb-module-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.vp-doc .kb-module-list li {
  margin: 0;
}

.vp-doc .kb-module-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px;
  border: 1px solid var(--kb-border);
  border-radius: 12px;
  background: var(--kb-surface);
  color: var(--kb-text-1);
  text-decoration: none;
  font-weight: 400;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.vp-doc .kb-module-card:hover {
  border-color: var(--kb-brand);
  box-shadow: 0 4px 16px var(--kb-shadow);
}

.kb-module-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.kb-module-title {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--kb-text-1);
}

.kb-module-start {
  padding: 1px 8px;
  border-radius: 999px;
  background: var(--kb-brand);
  color: var(--vp-c-bg);
  font-size: 12px;
  font-weight: 600;
}

.kb-module-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--kb-text-2);
}

.kb-module-foot {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: var(--kb-text-3);
}

.kb-module-read {
  color: var(--kb-brand);
  font-weight: 600;
}

.kb-module-card.read .kb-module-title {
  color: var(--kb-text-2);
}
</style>
