---
title: "星球背景的网页错误页"
description: "以地球与太空为背景，让找不到页面时的提示、返回入口和导航仍然清晰。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: 404-planet
caseDetail: true
prev: false
next: false
---
<!-- 自动生成：修改 practice-cases.json / case-editorial-overrides.json 后运行 npm run cases:generate。 -->
<script setup>
import CaseMedia from '../.vitepress/theme/components/CaseMedia.vue'
import CasePrompt from '../.vitepress/theme/components/CasePrompt.vue'
import CaseReturn from '../.vitepress/theme/components/CaseReturn.vue'
import CaseNavigation from '../.vitepress/theme/components/CaseNavigation.vue'
import item from '../.vitepress/data/cases-generated/404-planet.json'
</script>

<CaseNavigation :item="item" />

# 星球背景的网页错误页

以地球与太空为背景，让找不到页面时的提示、返回入口和导航仍然清晰。

适合制作品牌介绍、活动展示或网页区块的视觉原型。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备 AI 编程工具和自己的品牌文案、背景视频。原文是 React + Tailwind CSS 的 404 展示页，包含导航、返回按钮、移动菜单与邮件订阅外观，没有指定订阅服务或真实错误路由。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先复制中文要求，替换品牌、404 提示和背景视频；保留导航、中心提示和页脚的结构。
2. 明确“返回主页”的真实目标，再逐一填写准备保留的导航与页脚链接；链接功能是本站落地时要补齐的内容。
3. 在手机宽度打开、关闭菜单，检查遮罩点击、图标切换和列表显示，再检查大号 404 是否压住按钮。
4. 暂时移除或禁用没有接收服务的订阅按钮，或另提需求连接表单；原文只给出它的外观。
5. 如果要部署成真正错误页，再验证一个不存在的网址会进入这张页面，而不只是预览能打开。

**值得学习的写法：** 原文把电脑与手机菜单的布局、开关与动画分别描述；页面看起来完整，仍需检查返回链接、路由和表单是否实际可用。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

把品牌与背景换成自己的网站，只保留两个确实能打开的链接。用手机宽度测菜单，再访问一个不存在的网址，记录它是否能回到主页。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/404-planet) · [原始出处](https://motionsites.ai/?prompt=404-planet)
- 整理日期：2026-10-05
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
