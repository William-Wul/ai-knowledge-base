---
title: "带输入框的数据产品首屏"
description: "用循环视频、清晰标题和大输入框，组织产品第一屏。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: transform-data
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
import item from '../.vitepress/data/cases-generated/transform-data.json'
</script>

<CaseNavigation :item="item" />

# 带输入框的数据产品首屏

<CaseTags :item="item" />

用循环视频、清晰标题和大输入框，组织产品第一屏。

可以用来练习需求描述、页面结构与交互检查。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

原文提供背景视频地址；复用时可换自有视频，示例额度与模型名是展示文案。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先搭导航、标题和输入区，替换品牌与示例文字。
2. 加入原文的淡入淡出与循环逻辑，检查视频重播时没有闪跳。
3. 确认输入框和按钮在手机能操作；真实上传、语音与分析功能需另外实现。

**值得学习的写法：** 外观交互与真实服务要分别列验收项。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

先只保留文字输入与提交按钮，连接一个可检查的本地示例结果。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/transform-data) · [原始出处](https://motionsites.ai/?prompt=transform-data-hero)
- 整理日期：2026-11-03
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
