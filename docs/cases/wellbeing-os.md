---
title: "玻璃导航与视频背景首页"
description: "在全屏视频上放多级导航、手机菜单和两种行动按钮。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: wellbeing-os
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
import item from '../.vitepress/data/cases-generated/wellbeing-os.json'
</script>

<CaseNavigation :item="item" />

# 玻璃导航与视频背景首页

<CaseTags :item="item" />

在全屏视频上放多级导航、手机菜单和两种行动按钮。

可以用来练习需求描述、页面结构与交互检查。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备自有背景素材与真实产品文案；本例只设计产品首屏。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先完成电脑导航与手机菜单的静态布局。
2. 按原文加入玻璃边框和下拉开关，明确每个按钮去向。
3. 检查手机菜单开关、子菜单可达和文字对比；登录与试用服务另行实现。

**值得学习的写法：** 把电脑悬停和手机点击分别写清，导航才有可验收的行为。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只保留两组导航，分别在电脑和手机尺寸完成一次操作。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/wellbeing-os) · [原始出处](https://motionsites.ai/?prompt=wellbeing-os)
- 整理日期：2026-11-03
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
