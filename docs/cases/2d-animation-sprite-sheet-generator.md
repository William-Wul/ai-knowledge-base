---
title: "制作角色的 16 格动作图"
description: "把一个连续动作拆成 4 × 4 格，学习控制角色大小和位置。"
pageClass: case-detail-page case-category-image
caseCategory: image
caseSlug: 2d-animation-sprite-sheet-generator
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
import item from '../.vitepress/data/cases-generated/2d-animation-sprite-sheet-generator.json'
</script>

<CaseNavigation :item="item" />

# 制作角色的 16 格动作图

把一个连续动作拆成 4 × 4 格，学习控制角色大小和位置。

适合游戏动作素材、角色动作研究。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备同一角色的参考图，选择一个连续动作，例如抬手挥两下。原文规定正方形画布、4 列 × 4 行共 16 格、白色背景，每格至少留 10 像素边距。

参考工具：GPT Image 2.5。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 把【填写动作】改成一个有明确起点和终点的动作，与角色参考图一起提交。
2. 先数清 16 格，检查格子大小、从左到右再从上到下的顺序，以及没有网格线和文字的要求。
3. 对齐观察各格脚底高度、角色大小和中心位置；手、头发与特效都需留在各自格子内。
4. 按顺序查看各格姿势，找出跳动或缺少过渡的位置，再只修改对应姿势；拼成动图是本站可选的检查方式。

**值得学习的写法：** 动作图既要姿势变化，也要大小与位置固定。原文在角色缩放、脚底高度和格内边距上给出了可检查的限制。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

先做挥手，再改成点头，其余 16 格规格不变。逐格记录是否有角色变大、脚底跳动或手越界，发现问题时指出格子位置。

## 作者与来源

- 作者：@SSSS\_CRYPTOMAN
- 案例收录：[Goodcase](https://goodcase.ai/cases/2d-animation-sprite-sheet-generator) · [原始出处](https://x.com/SSSS_CRYPTOMAN/status/2097797456117539136)
- 整理日期：2026-09-22
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
