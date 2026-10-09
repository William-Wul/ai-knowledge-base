---
title: "双栏玻璃面板的植物设计首屏"
description: "在循环花卉视频上排列左侧品牌介绍与右侧社区、功能卡片，用两种玻璃强度区分层级。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: bloom-ai
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
import item from '../.vitepress/data/cases-generated/bloom-ai.json'
</script>

<CaseNavigation :item="item" />

# 双栏玻璃面板的植物设计首屏

<CaseTags :item="item" />

在循环花卉视频上排列左侧品牌介绍与右侧社区、功能卡片，用两种玻璃强度区分层级。

适合练习有较多入口的产品展示页，理解电脑双栏与手机主内容的取舍。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备品牌图、花卉缩略图与一段可使用的视频，补齐 /logo.png 和 @/assets/hero-flowers.png 文件。原文描述的是设计平台外观，没有 AI 生成、账号或档案处理逻辑。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先做电脑 52% 与 48% 双栏结构，左栏放标题和 Explore Now，右栏放社区与功能卡片；检查主入口比次级卡片更醒目。
2. 分别实现 4px 与 50px 模糊的轻、重玻璃面板，用伪元素边框保持统一；不要再叠加普通边框。
3. 放入静音循环背景与两个本地图片文件，核对素材都能加载；所有文字以白色不同透明度区分，不额外增加彩色按钮。
4. 切到手机确认右栏隐藏，左侧宽度另需铺满可用空间；若仍是 52%，请工具调整，避免只剩半屏内容。
5. 本站落地时为菜单、Explore Now、社区和卡片补真实目标，没有相应功能就改成展示说明；原文没有给菜单展开逻辑。

**值得学习的写法：** 轻玻璃适合小入口，重玻璃适合主要内容；隐藏电脑右栏时还要检查左栏是否正确占据手机宽度。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只替换底部植物卡的缩略图与一句说明，保留两种玻璃强度。交付电脑卡片截图与手机首屏截图，检查图片可见、左栏没有留下半屏空白。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/bloom-ai) · [原始出处](https://motionsites.ai/?prompt=bloom-ai-hero)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
