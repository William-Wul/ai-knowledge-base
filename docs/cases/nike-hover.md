---
title: "运动品牌的悬停交互网页"
description: "用鼠标悬停切换视觉效果，并分别规定电脑和手机的交互方式。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: nike-hover
caseDetail: true
prev: false
next: false
---
<!-- 自动生成：修改 practice-cases.json / case-editorial-overrides.json 后运行 npm run cases:generate。 -->
<script setup>
import CaseMedia from '../.vitepress/theme/components/CaseMedia.vue'
import CasePrompt from '../.vitepress/theme/components/CasePrompt.vue'
import CaseReturn from '../.vitepress/theme/components/CaseReturn.vue'
import CaseNavigation from '../.vitepress/theme/components/CaseNavigation.vue'
import item from '../.vitepress/data/cases-generated/nike-hover.json'
</script>

<CaseNavigation :item="item" />

# 运动品牌的悬停交互网页

用鼠标悬停切换视觉效果，并分别规定电脑和手机的交互方式。

适合制作品牌介绍、活动展示或网页区块的视觉原型。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备 AI 编程工具和自己可用的图片、视频与品牌文案。原文用图片遮住视频，再用随鼠标移动的圆形区域显示下层视频；给出的远程视频含时效参数，复用时可换成自己的素材。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先让工具按中文要求生成预览，把示例品牌和素材地址换成自己的；保留图片在上、视频在下的结构。
2. 电脑端移动鼠标，检查圆形显示区域能否连续跟随，以及离开指定区域后视频是否按要求暂停。
3. 手机端没有鼠标悬停：按原文给出的触摸跟随或自动播放两种方式择一，并实际检查触摸与播放效果。
4. 缩到窄屏，检查数据卡、主标题和品牌按钮不会重叠或挡住可操作区域；保持文字能读。
5. 临时让视频加载失败，要求保留静态图片与主要文字。这是本站补充的失败场景，避免效果素材失效后页面空白。

**值得学习的写法：** 原文既描述鼠标效果，也交代手机替代操作。复用这类视觉交互时，把触发方式、播放状态和失败后的画面一起说清楚。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

用自己的静态图片和短视频做一版，只保留一个标题。分别测试电脑鼠标、手机触摸和视频加载失败三种情况，记录是否都能读到标题。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/nike-hover) · [原始出处](https://motionsites.ai/?prompt=nike-hover)
- 整理日期：2026-09-23
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
