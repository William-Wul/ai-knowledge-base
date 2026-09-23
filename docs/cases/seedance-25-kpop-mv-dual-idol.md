---
title: "双人音乐短片的逐镜分镜"
description: "把 30 秒切成十几段两到四秒的镜头，每段写死机位、景别、背景和动作，两个女生用粉发和黑发做外观锚点贯穿全片。值钱的是这套时间码排镜法。"
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
import item from '../.vitepress/data/cases-generated/seedance-25-kpop-mv-dual-idol.json'
</script>

# 双人音乐短片的逐镜分镜

把 30 秒切成十几段两到四秒的镜头，每段写死机位、景别、背景和动作，两个女生用粉发和黑发做外观锚点贯穿全片。值钱的是这套时间码排镜法。

适合练习短片分镜、动作连续性和声音描述。

## 效果展示

<CaseMedia :item="item" />

## 开始前准备

准备支持视频生成的工具，先确认可选时长、画幅和声音设置。

参考工具：Seedance 2.5。

## 怎么做

1. 先看视频，再阅读完整提示词，标出每段镜头的时长、主体动作和衔接位置。
2. 替换人物、产品或场景时，同步检查全文的称呼、服装和外观描述，保持前后一致。
3. 按工具支持的时长制作；超过单次时长的内容按镜头拆段，并保留承接动作，最后拼接。
4. 检查人物是否变化、动作是否连贯、声音是否对齐；一次只调整最明显的问题。

**值得学习的写法：** 用时间段约束动作顺序，并同时说明镜头、角色和声音，让前后片段有明确的承接关系。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

先保留镜头顺序，只替换一个主体或场景。若动作开始不连贯，减少同一段内的动作数量。

## 作者与来源

- 作者：@Just\_sharon7
- 案例收录：[Goodcase](https://goodcase.ai/cases/seedance-25-kpop-mv-dual-idol) · [原始出处](https://x.com/Just_sharon7/status/2083422886686031982)
- 整理日期：2026-09-23
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn category="video" />
