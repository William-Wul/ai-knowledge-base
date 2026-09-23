---
title: "一个产品生成八种海报方案"
description: "围绕同一个产品提出八种海报方案，在保持品牌一致的前提下改变主题与角度。"
pageClass: case-detail-page case-category-image
caseCategory: image
caseDetail: true
prev: false
next: false
---
<!-- 自动生成：修改 practice-cases.json 后运行 npm run cases:generate。 -->
<script setup>
import CaseMedia from '../.vitepress/theme/components/CaseMedia.vue'
import CasePrompt from '../.vitepress/theme/components/CasePrompt.vue'
import CaseReturn from '../.vitepress/theme/components/CaseReturn.vue'
import item from '../.vitepress/data/cases-generated/batch-product-poster-proposal-generator.json'
</script>

# 一个产品生成八种海报方案

围绕同一个产品提出八种海报方案，在保持品牌一致的前提下改变主题与角度。

适合练习画面构图、风格控制和视觉素材制作。

## 效果展示

<CaseMedia :item="item" />

## 开始前准备

准备支持图片生成的 AI 工具，确定主题、画幅比例和需要出现的文字。

参考工具：GPT Image 2。

## 怎么做

1. 先看效果图，找出主体位置、配色和需要保留的细节。
2. 复制下方中文提示词，把主体、品牌、地点或画面文字换成自己的内容；有【占位内容】时一并替换。
3. 按提示词的要求提交参考图，先生成一张；对照要求检查主体、文字和构图，再针对问题修改。

**值得学习的写法：** 先固定产品形状与标识，再描述背景、材质和光线，避免主体在换场景时被改掉。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

保留原有构图，换成自己的主题做一版；再只调整配色或材质，比较哪个变化最影响画面。

## 作者与来源

- 作者：@derek\_wall90176
- 案例收录：[Goodcase](https://goodcase.ai/cases/batch-product-poster-proposal-generator) · [原始出处](https://x.com/derek_wall90176/status/2080480065998192970)
- 整理日期：2026-09-23
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn category="image" />
