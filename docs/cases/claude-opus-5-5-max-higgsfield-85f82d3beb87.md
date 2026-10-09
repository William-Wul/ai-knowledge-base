---
title: "印刷术讲解：静图、动效与文字分工"
description: "60秒报纸拼贴讲解，静态图不含文字，信息由后续动态排版添加。"
pageClass: case-detail-page case-category-video
caseCategory: video
caseSlug: claude-opus-5-5-max-higgsfield-85f82d3beb87
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
import item from '../.vitepress/data/cases-generated/claude-opus-5-5-max-higgsfield-85f82d3beb87.json'
</script>

<CaseNavigation :item="item" />

# 印刷术讲解：静图、动效与文字分工

<CaseTags :item="item" />

60秒报纸拼贴讲解，静态图不含文字，信息由后续动态排版添加。

适合练习先审史实再制作培训讲解片的流程。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

原文60秒，不是一次直接生成视频的指令：Higgsfield只制作静态图，另一个执行者做动效与动画。未提供完整史实、日期、镜头表、画幅或音轨；需要自己查证内容并制作，本站未调用这些工具。

参考工具：支持参考图的生图工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 本站步骤建议：先列出经过核对的印刷术事件与日期，再安排自己的60秒讲解结构；这一步为本站补充流程。
2. 让图像步骤只生成报纸剪贴、撕边、半色调与阴影的无字静图，不把历史文字烘焙到图片里。
3. 在后续制作中添加动态文字与动画，保持纸张拼贴风格；结尾回到开场画面，形成循环，不硬切。
4. 验收四项：事件与日期有查证依据；静图不含字；动画文字可辨认且与讲解对应；尾帧接回首帧。

**值得学习的写法：** 原文可学之处：先分开事实、画面和文字制作，再验收循环衔接；原文没有提供可直接复用的历史讲稿。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

本站练习（非作者原文）：只做一条已核对事件的无字拼贴图，再加一行日期文字并让末帧回到首帧，不扩成整部历史片。

## 作者与来源

- 作者：@maxescu
- 案例收录：[Goodcase](https://goodcase.ai/cases/claude-opus-5-5-max-higgsfield-85f82d3beb87) · [原始出处](https://x.com/maxescu/status/2104898184442962277)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
