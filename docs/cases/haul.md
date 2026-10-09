---
title: "卡车视差与页脚链接组合"
description: "把页脚卡片放在风景背景上方，让前景卡车随着滚动产生不同速度的位移。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: haul
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
import item from '../.vitepress/data/cases-generated/haul.json'
</script>

<CaseNavigation :item="item" />

# 卡车视差与页脚链接组合

<CaseTags :item="item" />

把页脚卡片放在风景背景上方，让前景卡车随着滚动产生不同速度的位移。

适合练习物流品牌或活动页的收尾画面，观察前景图片、背景与可点击内容的叠放关系。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备一张风景背景、一张透明前景图和三组实际链接。原文用 React 与 motion/react 控制滚动；应用下载、合同、社交入口只是链接外观，没有提供对应地址。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先放置上方 View Below 留白区和下方整屏背景，再将白色页脚卡片固定在下方区域顶部；滚动时两段关系应清楚。
2. 将卡车抠图放在前景，绑定滚动进度到 -50 至 150 的纵向位移；保持 pointer-events-none，避免图片挡住链接点击。
3. 填入 Company、Mobile、Contracts 三列及版权、社交图标；本站落地时为保留的每个链接填写真实地址。
4. 按不同屏宽调整卡车比例，特别检查平板放大到 2 倍时是否遮住页脚文字；手机列布局应完整显示。
5. 从区域顶部滚到底部，检查卡车运动平稳、卡片没有跳动，并逐一点击仍应可用的页脚链接。

**值得学习的写法：** 视差效果取决于前景与背景的相对速度；前景层越大，越要明确它不能拦截位于后方的链接。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把卡车换成一张透明配送车或商品图，保持 -50 至 150 的滚动范围。交付滚动前后两张截图，检查前景未遮住三列链接且链接仍可点击。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/haul) · [原始出处](https://motionsites.ai/?prompt=haul-footer)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
