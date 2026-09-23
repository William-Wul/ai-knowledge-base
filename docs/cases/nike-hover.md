---
title: "运动品牌的悬停交互网页"
description: "用鼠标悬停切换视觉效果，并分别规定电脑和手机的交互方式。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseDetail: true
prev: false
next: false
---
<!-- 自动生成：修改 practice-cases.json 后运行 npm run cases:generate。 -->
<script setup>
import CaseMedia from '../.vitepress/theme/components/CaseMedia.vue'
import CasePrompt from '../.vitepress/theme/components/CasePrompt.vue'
import CaseReturn from '../.vitepress/theme/components/CaseReturn.vue'
import item from '../.vitepress/data/cases-generated/nike-hover.json'
</script>

# 运动品牌的悬停交互网页

用鼠标悬停切换视觉效果，并分别规定电脑和手机的交互方式。

适合制作品牌介绍、活动展示或网页区块的视觉原型。

## 效果展示

<CaseMedia :item="item" />

## 开始前准备

准备 AI 编程工具，以及自己的品牌名、文案、图片或视频。提示词中的代码与素材地址可以一并交给编程工具。

参考工具：AI 编程工具。

## 怎么做

1. 观看页面演示，确认要保留的布局与交互，再复制下方完整中文要求。
2. 替换品牌、正文和素材地址；保留布局、尺寸与动画要求，让 AI 编程工具生成可预览页面。
3. 分别在电脑与手机宽度检查文字、图片、按钮和动画，再把具体问题交给 AI 修改。
4. 逐个点击导航和按钮，为准备使用的入口补齐目标页面或功能。

**值得学习的写法：** 把滚动过程分为几个阶段，说明每一阶段哪些元素移动、缩放或出现，以及手机端如何处理。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

沿用页面结构，替换为自己的品牌与素材；保留一个主要行动按钮，检查它是否连接到正确位置。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/nike-hover) · [原始出处](https://motionsites.ai/?prompt=nike-hover)
- 整理日期：2026-09-23
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn category="web" />
