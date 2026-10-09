---
title: "影像与文字交织的创意工作室主页"
description: "把循环影像、大号品牌字、滚动亮起的个人介绍和四张服务卡片组合成工作室展示页。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: prisma-creative-studio
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
import item from '../.vitepress/data/cases-generated/prisma-creative-studio.json'
</script>

<CaseNavigation :item="item" />

# 影像与文字交织的创意工作室主页

<CaseTags :item="item" />

把循环影像、大号品牌字、滚动亮起的个人介绍和四张服务卡片组合成工作室展示页。

适合有作品影像的个人创作者或小型工作室，练习把品牌介绍、创作者故事与服务内容分成三段展示。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备一段可使用的静音背景视频、个人简介和三项服务说明。原文使用 React、Tailwind CSS 与 Framer Motion，列出的 AI 点评、日程等是服务卡片文案，没有给出对应系统。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先保留 Hero、About、Features 三段结构，填入自己的品牌与简介；确认首屏的大字、简介和 Join the lab 按钮各有位置。
2. 按原文接入两处循环视频，保留 muted 与 playsInline；检查噪点和渐变只覆盖背景，没有让文字与按钮难以辨认。
3. 用 Almarai 正文与 Instrument Serif 斜体区别个人介绍中的两类文字，再实现随滚动由浅变亮的简介；滚到段尾时整段应可读。
4. 将四张服务卡片排为手机单列、平板两列、电脑四列；逐张检查标题、清单和图像都未被裁掉。
5. 本站落地时，为顶部导航和行动按钮填写真实页面或联系入口；没有相应服务时改写卡片文案，避免把原型当作已上线工具。

**值得学习的写法：** 同一页可以用影像建立氛围、用字体区别身份与能力，再用卡片讲清服务；视觉展示不等于卡片中的服务已经可用。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把 About 换成一段约 80 字的真实创作者简介，保留两种字体与滚动亮起效果。交付电脑、手机各一张截图，并检查滚到段尾时文字是否全部清楚。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/prisma-creative-studio) · [原始出处](https://motionsites.ai/?prompt=prisma-landing)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
