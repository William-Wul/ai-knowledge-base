---
title: "视频与悬浮课程卡的编程教育首屏"
description: "用深色视频、纵向参考线、玻璃课程卡与绿色主按钮，组成教育平台的首屏外观。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: codenest-coding-platform
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
import item from '../.vitepress/data/cases-generated/codenest-coding-platform.json'
</script>

<CaseNavigation :item="item" />

# 视频与悬浮课程卡的编程教育首屏

<CaseTags :item="item" />

用深色视频、纵向参考线、玻璃课程卡与绿色主按钮，组成教育平台的首屏外观。

适合练习课程或培训项目的介绍页，让课程信息与报名入口形成主次。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备真实课程介绍与报名目标。原文用 React、Tailwind CSS 与 hls.js 播放 HLS 视频，课程年份和师资为示例，未提供课程、账户或报名系统。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先搭建背景、标题、说明与主按钮，再在标题上方加入 200×200px 课程卡，按原文上移 50px；检查卡片没有碰到导航。
2. 按原文用 hls.js 接入视频并关闭 enableWorker，保留视频透明度和左侧、底部渐变；检查视频可播放、文字仍清楚。
3. 加入电脑上的三条纵向细线和顶部模糊光形，核对它们只作背景，不遮挡玻璃卡与按钮。
4. 检查 Inter、Plus Jakarta Sans 和 Instrument Serif 各用于指定文字，手机标题缩为 40px，课程卡不能横向溢出。
5. 测试手机全屏菜单的打开与关闭；本站落地时替换示例年份、师资说明并为 Get Started、导航填实际目标。

**值得学习的写法：** 课程卡可以补充可信信息，但年份、师资和报名入口需要真实内容；有教育平台外观并不代表课程系统已经完成。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只替换悬浮卡为一门自己的示例课程，写明课程名称、年份和一句学习目标。交付手机截图，检查课程卡、主标题和报名入口未互相覆盖。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/codenest-coding-platform) · [原始出处](https://motionsites.ai/?prompt=codenest-hero)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
