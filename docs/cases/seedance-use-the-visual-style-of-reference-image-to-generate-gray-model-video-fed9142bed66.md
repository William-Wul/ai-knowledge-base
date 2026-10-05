---
title: "室内漫游视频的材质转换"
description: "保留简模视频中的建筑、家具与镜头路径，只替换为参考图中的材质、壁画和暖光。"
pageClass: case-detail-page case-category-video
caseCategory: video
caseDetail: true
prev: false
next: false
---
<!-- 自动生成：修改 practice-cases.json 后运行 npm run cases:generate。 -->
<script setup>
import CaseMedia from '../.vitepress/theme/components/CaseMedia.vue'
import CasePrompt from '../.vitepress/theme/components/CasePrompt.vue'
import CaseReturn from '../.vitepress/theme/components/CaseReturn.vue'
import item from '../.vitepress/data/cases-generated/seedance-use-the-visual-style-of-reference-image-to-generate-gray-model-video-fed9142bed66.json'
</script>

# 室内漫游视频的材质转换

保留简模视频中的建筑、家具与镜头路径，只替换为参考图中的材质、壁画和暖光。

适合练习短片分镜、动作连续性和声音描述。

## 效果展示

<CaseMedia :item="item" />

## 开始前准备

准备室内简模漫游视频与材质参考图，以及支持参考视频编辑的工具。简模就是尚未添加真实材质的空间模型；原例还要求交付可编辑工程，需由对应制作工具配合完成。

参考工具：Seedance。

## 怎么做

1. 准备镜头路径已经确定的室内简模视频。
2. 提交材质与暖光参考图，明确只换外观，不移动建筑、家具或镜头。
3. 逐镜头检查变形、闪烁和物体增减，仅重做有问题的片段。
4. 按顺序拼接为十五秒视频，导出各镜头首帧，并在制作工具中整理工程文件。

**值得学习的写法：** 用时间段约束动作顺序，并同时说明镜头、角色和声音，让前后片段有明确的承接关系。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

先保留镜头顺序，只替换一个主体或场景。若动作开始不连贯，减少同一段内的动作数量。

## 作者与来源

- 作者：@nijokestu
- 案例收录：[Goodcase](https://goodcase.ai/cases/seedance-use-the-visual-style-of-reference-image-to-generate-gray-model-video-fed9142bed66) · [原始出处](https://x.com/nijokestu/status/2098459803777413432)
- 整理日期：2026-10-05
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn category="video" />
