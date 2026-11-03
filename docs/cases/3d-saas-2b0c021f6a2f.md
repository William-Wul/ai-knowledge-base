---
title: "小票打印动效组件"
description: "点击按钮后让小票从槽口逐行滑出，练习可重复的交互状态。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: 3d-saas-2b0c021f6a2f
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
import item from '../.vitepress/data/cases-generated/3d-saas-2b0c021f6a2f.json'
</script>

<CaseNavigation :item="item" />

# 小票打印动效组件

<CaseTags :item="item" />

点击按钮后让小票从槽口逐行滑出，练习可重复的交互状态。

可以用来练习需求描述、页面结构与交互检查。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备姓名、商品和总额等示例文字；这是视觉组件，不是真实开票系统。

参考工具：AI UI Builder、GPT-5.6 Sol。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先制作机器、按钮和默认隐藏的小票三部分。
2. 用原文加入按压与逐行出票效果，再实现重复点击时的重置。
3. 连续点击三次，检查小票没有叠在一起，文字可以修改。

**值得学习的写法：** 交互描述要包括初始、触发、结束和再次触发四种状态。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

把小票改为活动报名回执，保留同一出票动作。

## 作者与来源

- 作者：@uxsweta
- 案例收录：[Goodcase](https://goodcase.ai/cases/3d-saas-2b0c021f6a2f) · [原始出处](https://x.com/uxsweta/status/2061334430103535727)
- 整理日期：2026-11-03
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
