---
title: "旅行品牌的全屏视频首页"
description: "用双行标题、玻璃导航和轻微视差，组织旅行品牌首屏。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: wanderful-hero
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
import item from '../.vitepress/data/cases-generated/wanderful-hero.json'
</script>

<CaseNavigation :item="item" />

# 旅行品牌的全屏视频首页

<CaseTags :item="item" />

用双行标题、玻璃导航和轻微视差，组织旅行品牌首屏。

可以用来练习需求描述、页面结构与交互检查。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备自有视频与真实业务文案；原文的零泄漏承诺不应直接沿用。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先完成标题、导航和行动按钮的静态排版。
2. 加入循环视频和随鼠标轻微移动的背景，手机上改为稳定画面。
3. 检查文字对比、视频失败时的背景与按钮去向，删除没有依据的承诺。

**值得学习的写法：** 动效必须服务于内容，阅读与操作应在静态状态也成立。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

用自己的旅行主题只留一个联系按钮，比较有无背景视差的阅读感受。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/wanderful-hero) · [原始出处](https://motionsites.ai/?prompt=wanderful-hero)
- 整理日期：2026-11-03
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
