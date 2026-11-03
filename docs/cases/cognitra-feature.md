---
title: "视频背景上的逐词标题"
description: "让标题中的每个词依次出现，并把背景视频固定在后方。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: cognitra-feature
caseDetail: true
prev: false
next: false
---
<!-- 自动生成：修改 practice-cases.json / case-editorial-overrides.json / case-tags.json 后运行 npm run cases:generate。 -->
<script setup>
import CaseMedia from '../.vitepress/theme/components/CaseMedia.vue'
import CasePrompt from '../.vitepress/theme/components/CasePrompt.vue'
import CaseReturn from '../.vitepress/theme/components/CaseReturn.vue'
import CaseNavigation from '../.vitepress/theme/components/CaseNavigation.vue'
import CaseTags from '../.vitepress/theme/components/CaseTags.vue'
import item from '../.vitepress/data/cases-generated/cognitra-feature.json'
</script>

<CaseNavigation :item="item" />

# 视频背景上的逐词标题

<CaseTags :item="item" />

让标题中的每个词依次出现，并把背景视频固定在后方。

可以用来练习需求描述、页面结构与交互检查。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

原文包含视频地址与动画组件代码；用自有视频或确认允许展示的素材。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先放好视频和标题，确认文字对比与层级。
2. 保留逐词错开的出现时间，把说明文字放在标题之后。
3. 在手机检查换行、视频加载失败时的背景和减少动效设置。

**值得学习的写法：** 动画顺序要跟阅读顺序一致，先标题、后说明。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

换一句不超过六个词的标题，比较不同逐词间隔。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/cognitra-feature) · [原始出处](https://motionsites.ai/?prompt=cognitra-feature)
- 整理日期：2026-11-03
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
