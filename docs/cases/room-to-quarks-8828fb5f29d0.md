---
title: "从房间一路放大到夸克"
description: "按房间、电脑、芯片、原子、夸克的顺序，制作连续缩放的三维示意动画。"
pageClass: case-detail-page case-category-video
caseCategory: video
caseSlug: room-to-quarks-8828fb5f29d0
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
import item from '../.vitepress/data/cases-generated/room-to-quarks-8828fb5f29d0.json'
</script>

<CaseNavigation :item="item" />

# 从房间一路放大到夸克

<CaseTags :item="item" />

按房间、电脑、芯片、原子、夸克的顺序，制作连续缩放的三维示意动画。

适合学习尺度变化和镜头接力。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备五个尺度层级的说明。Three.js 是在网页里搭三维场景的工具，类似虚拟摄影棚；原文是视觉演示要求，没有给出真实比例或科学模型。

参考工具：Claude Opus 5.5。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 保留房间、MacBook、M4芯片、原子、夸克的层级顺序。
2. 让编程工具给出各层构图和镜头进入位置。
3. 先制作相邻两层的过渡，检查遮挡、尺度感和画面方向。
4. 完成各层后检查首尾与导出；微观层标为示意，另行核对科学概念。

**值得学习的写法：** 连续缩放需要明确每一层进入下一层的位置，而不仅是写“镜头放大”。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

先做房间到芯片三层，检查进入位置是否稳定，再决定是否扩展。

## 作者与来源

- 作者：@VictorTaelin
- 案例收录：[Goodcase](https://goodcase.ai/cases/room-to-quarks-8828fb5f29d0) · [原始出处](https://x.com/VictorTaelin/status/2103299766473875778)
- 整理日期：2026-10-12
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
