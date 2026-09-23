---
title: "制作角色的 16 格动作图"
description: "把一个连续动作拆成 4 × 4 格，学习控制角色大小和位置。"
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
import item from '../.vitepress/data/cases-generated/2d-animation-sprite-sheet-generator.json'
</script>

# 制作角色的 16 格动作图

把一个连续动作拆成 4 × 4 格，学习控制角色大小和位置。

适合游戏动作素材、角色动作研究。

## 效果展示

<CaseMedia :item="item" />

## 开始前准备

准备一张完整、清晰的角色参考图，以及支持参考图的生图工具。

参考工具：GPT Image 2.5。

## 怎么做

1. 准备一张完整角色参考图，上传到支持参考图的生图工具。
2. 将提示词中的动作改成挥手、走路或跳跃，生成一张 16 格图片。
3. 依次检查每格的角色大小、脚底位置和动作衔接。生成的是图片，做成动画还需切图和播放。

**值得学习的写法：** 把连续性拆成可检查的条件：相同格子、相同比例、同一条脚底基线。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

先用幅度小的挥手动作试一次，再尝试跳跃；观察角色是否被裁切。

## 作者与来源

- 作者：@SSSS\_CRYPTOMAN
- 案例收录：[Goodcase](https://goodcase.ai/cases/2d-animation-sprite-sheet-generator) · [原始出处](https://x.com/SSSS_CRYPTOMAN/status/2097797456117539136)
- 整理日期：2026-09-22
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn category="image" />
