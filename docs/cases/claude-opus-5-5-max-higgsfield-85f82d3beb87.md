---
title: "Opus与Higgsfield制作印刷术历史动画"
description: "Higgsfield 负责静态图片，Opus 负责拼贴画面的运动和文字动画。"
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

# Opus与Higgsfield制作印刷术历史动画

<CaseTags :item="item" />

Higgsfield 负责静态图片，Opus 负责拼贴画面的运动和文字动画。

适合有历史资料的知识讲解。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备经核对的印刷术时间线。作者原文明确：Higgsfield 只生成静态图片，编程助手制作全部动效；需要图片工具与动画渲染流程，不是直接向视频模型交一句提示词。

参考工具：支持参考图的生图工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先整理从起源到现代的关键事件和准确日期。
2. 按报纸拼贴风格准备分镜，让 Higgsfield 只制作不含文字的静态图片。
3. 把文字和图片运动交给编程助手，保持纸张、阴影、排版风格一致。
4. 导出60秒样片，核对事实与字幕，再检查最后一帧能否衔接开场。

**值得学习的写法：** 把静态画面与运动拆开交给不同工具，同时要求图中文字由代码添加。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

改为另一项发明史，先核对五个关键日期，再检查视频和资料是否逐条对应。

## 作者与来源

- 作者：@maxescu
- 案例收录：[Goodcase](https://goodcase.ai/cases/claude-opus-5-5-max-higgsfield-85f82d3beb87) · [原始出处](https://x.com/maxescu/status/2104898184442962277)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
