---
title: "流媒体背景上的双按钮与页脚"
description: "用 HLS 视频、上下渐隐和玻璃按钮，为黑色页面制作一个简洁的行动区与页脚。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: liquid-glass-cta
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
import item from '../.vitepress/data/cases-generated/liquid-glass-cta.json'
</script>

<CaseNavigation :item="item" />

# 流媒体背景上的双按钮与页脚

<CaseTags :item="item" />

用 HLS 视频、上下渐隐和玻璃按钮，为黑色页面制作一个简洁的行动区与页脚。

适合给已有介绍页增加收尾入口，练习背景视频兼容与主次按钮的视觉区别。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备可使用的视频、预约或联系地址与价格说明。原文提供 React 组件和 hls.js 播放逻辑，但两个按钮没有点击处理，页脚 href 为 \#，不包含预约系统。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先在黑色页面末尾放入 CtaFooter，确认标题、说明、两个按钮与页脚的结构，再按原文加入 Barlow 与 Instrument Serif 字体。
2. 保留 hls.js 初始化与卸载销毁逻辑，兼顾 Safari 的原生播放分支；检查视频能静音播放，不能播放时文字仍清楚。
3. 加入上下各 200px 的黑色渐隐，让视频与上下页面融合；渐变层不能拦截按钮。
4. 检查玻璃按钮与白色按钮的边框、箭头和对比度，在较窄手机上确认两个按钮没有挤出屏幕；原样 flex 不会自动换行，必要时另请工具调整。
5. 本站落地时把 Book a Call、View Pricing 和页脚 \# 改成真实目标，再验证点击；这一步是补齐用途，并非原组件已有功能。

**值得学习的写法：** 原文给出完整视频与外观组件，但没有预约动作；播放兼容、组件清理与链接目标是三项不同的检查。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把标题与双按钮文案改成一项服务的“了解方案”和“联系咨询”，为它们填真实地址。交付手机截图和两次点击结果，确认未溢出且打开预期页面。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/liquid-glass-cta) · [原始出处](https://motionsites.ai/?prompt=liquid-glass-cta)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
