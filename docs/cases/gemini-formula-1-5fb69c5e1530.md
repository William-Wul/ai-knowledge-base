---
title: "带轨道动画的 F1 示例数据面板"
description: "用赛车背景、三块玻璃面板、沿轨道移动的标记和跳动数字，模拟赛事播报界面。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: gemini-formula-1-5fb69c5e1530
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
import item from '../.vitepress/data/cases-generated/gemini-formula-1-5fb69c5e1530.json'
</script>

<CaseNavigation :item="item" />

# 带轨道动画的 F1 示例数据面板

<CaseTags :item="item" />

用赛车背景、三块玻璃面板、沿轨道移动的标记和跳动数字，模拟赛事播报界面。

适合练习展示数据的视觉层次与数字动画，不适合作为真实赛事数据来源。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备一段可播放的赛车视频、车手图片与三项示例数据。原提示词的视频地址为空，末尾提到过期链接，需自行补视频；它没有提供实时赛事接口。

参考工具：Gemini 3.1 · React · Framer Motion。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先把背景、标题区和底部三块面板搭好，标注数据为示例；电脑横排、手机纵排都应完整显示。
2. 补入自己可使用的视频，开启静音循环，并添加黑色与红色渐变；检查白字在视频亮处仍然清楚。
3. 按原文制作 SVG 赛道，让 P1、P2、P3 三个标记沿路径循环；检查标记没有离开赛道或被面板边缘裁掉。
4. 分别实现速度从 0 到 372.5 的 2.5 秒动画、圈速在 3 秒后停到 1:11.310；结束值应与示例一致，不能一直跳动。
5. 检查车手图片底部渐隐、三张面板错开出现；Live Updates 等按钮若保留，实际目标属于本站落地时另补的内容。

**值得学习的写法：** 看起来实时的界面可以只靠循环轨道与计数动画实现；应区别动画中的示例数字和真正接入的数据。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只将最大速度目标改为一个明确标注的示例值 280.0 km/h，保持 2.5 秒动画。交付动画结束截图，核对数值、单位和示例标注都正确。

## 作者与来源

- 作者：@CryptoEights
- 案例收录：[Goodcase](https://goodcase.ai/cases/gemini-formula-1-5fb69c5e1530) · [原始出处](https://x.com/CryptoEights/status/2026284847480918093)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
