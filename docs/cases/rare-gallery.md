---
title: "用动态背景做品牌展示页"
description: "一段背景视频、简洁文案与展开导航，组成完整的首屏。"
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
import item from '../.vitepress/data/cases-generated/rare-gallery.json'
</script>

# 用动态背景做品牌展示页

一段背景视频、简洁文案与展开导航，组成完整的首屏。

适合品牌展示和作品发布页。

## 效果展示

<CaseMedia :item="item" />

## 开始前准备

准备品牌名称、介绍、按钮目标地址和有使用权限的背景视频，再交给 AI 编程工具制作。

参考工具：AI 编程工具。

## 怎么做

1. 准备自己的品牌名称、介绍和有使用权限的背景视频。
2. 把提示词交给 AI 编程工具，替换其中的品牌文案、视频地址和按钮去向。
3. 在电脑和手机预览，检查菜单开关、文字可读性和视频加载；示例按钮需要接上真实功能。

**值得学习的写法：** 把字体、布局、动画时间和手机显示要求写清，减少 AI 自行猜测。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

先保留布局，只替换背景视频与品牌文案，观察画面与文字是否协调。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/rare-gallery) · [原始出处](https://motionsites.ai/?prompt=rare-gallery)
- 整理日期：2026-09-22
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn category="web" />
