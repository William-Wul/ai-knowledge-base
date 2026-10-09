---
title: "手机画面上循环打字的安静首屏"
description: "把三句简短消息逐字写入背景视频中的手机屏幕，配合衬线标题与蓝色行动按钮。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: dot
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
import item from '../.vitepress/data/cases-generated/dot.json'
</script>

<CaseNavigation :item="item" />

# 手机画面上循环打字的安静首屏

<CaseTags :item="item" />

把三句简短消息逐字写入背景视频中的手机屏幕，配合衬线标题与蓝色行动按钮。

适合练习文字与视频画面的精确对齐，以及一段消息的输入、停留和删除节奏。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备能看清手机屏幕的视频与三条短消息。原文用 React 19、Tailwind CSS v4 和像素字体模拟消息，没有提供匿名配对、通信或账户系统。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先放置背景视频、居中的标题和顶部胶囊导航，确认手机屏幕的位置，再添加覆盖其上的消息层。
2. 使用原文的 Nokia 字体和深绿色小字，让消息对准手机屏幕；分别检查手机、平板和电脑三个定位比例。
3. 按每字 100ms 输入、50ms 删除、停留 2000ms 的规则循环三句消息；确认上一句删除后才出现下一句。
4. 检查闪烁光标、标题放大入场与视频静音循环；视频移动时消息仍应留在屏幕区域内。
5. 本站落地时给 Link up 补真实目标，并将服务文案改成实际能力；原型里的消息动画不是用户之间的通信。

**值得学习的写法：** 文字嵌入视频画面需要不同屏宽下分别校准位置；循环打字可以营造氛围，却不会自动产生消息服务。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把三句消息换成三条不超过 8 个字的中文问候，保留原来的输入与删除速度。交付手机截图和一次完整循环录屏，检查文字没有超出手机屏幕。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/dot) · [原始出处](https://motionsites.ai/?prompt=dot-hero)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
