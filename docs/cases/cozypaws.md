---
title: "三张宠物照片组成的商店首屏"
description: "以薄荷绿背景、居中的大标题与底部三张宠物照片，排列商品卡、视频卡和购买入口。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: cozypaws
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
import item from '../.vitepress/data/cases-generated/cozypaws.json'
</script>

<CaseNavigation :item="item" />

# 三张宠物照片组成的商店首屏

<CaseTags :item="item" />

以薄荷绿背景、居中的大标题与底部三张宠物照片，排列商品卡、视频卡和购买入口。

适合练习宠物品牌或小商品页面的首屏构图，理解照片、商品卡与主按钮之间的位置关系。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备品牌标志、商品图片和三张宠物照片，练习价格与评价应注明为示例。原文是单屏商店外观：收藏、购物车数量与播放图标没有给出真实交易或视频服务。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先搭建薄荷绿单屏、顶部导航、大标题和底部三列照片；中间照片比两侧高，标题应保持在三张图上方。
2. 在两侧放入猫屋商品卡与评测视频卡，检查图片、示例价格和播放图标没有压住标题。
3. 依次添加照片出现、文字弹出与按钮进入动画，沿用原文 100–1200ms 的错开顺序；动画结束后元素都应留在可见位置。
4. 切到手机布局，按原文缩小标题并将两张小卡并排；检查短屏手机上 Explore Products 与主要信息没有被 overflow-hidden 裁掉。
5. 本站落地时给商品、评测和主按钮补真实目标；没有购物服务时保留展示用途并去掉会误导的购物车状态。

**值得学习的写法：** 首屏不是把所有信息放大，而是用中间照片、标题和主按钮确定阅读顺序；固定屏高还需要检查较矮手机的裁切。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只替换左侧商品卡为一种自己的宠物用品，写明示例名称与示例价格。交付电脑和手机两张首屏截图，检查商品卡、标题与主按钮都没有被挡住。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/cozypaws) · [原始出处](https://motionsites.ai/?prompt=cozypaws)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
