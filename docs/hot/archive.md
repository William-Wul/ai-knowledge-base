---
title: 往期 AI 日报
description: 全部往期 AI 日报，按月份排列
search: false
prev: false
next: false
---

<script setup>
import { data as months } from '../.vitepress/theme/hotArchive.data.js'
</script>

# 往期 AI 日报

全部往期日报，按月份排列，最新的在最上面。今天的日报见 [AI 日报](/hot/)。

<template v-for="m in months" :key="m.label">
  <h2 :id="m.label">{{ m.label }}（{{ m.days.length }} 期）</h2>
  <ul>
    <li v-for="d in m.days" :key="d.date">
      <a :href="d.link">{{ d.date.slice(5).replace('-', ' 月 ') }} 日</a><span v-if="d.lead"> · {{ d.lead }}</span>
    </li>
  </ul>
</template>
