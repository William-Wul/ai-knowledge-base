---
title: "两段太空影像与手动循环渐隐"
description: "用太空主题首屏和三张能力卡，练习视频临近结束时淡出、重播时淡入的衔接。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: aetheris-voyage
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
import item from '../.vitepress/data/cases-generated/aetheris-voyage.json'
</script>

<CaseNavigation :item="item" />

# 两段太空影像与手动循环渐隐

<CaseTags :item="item" />

用太空主题首屏和三张能力卡，练习视频临近结束时淡出、重播时淡入的衔接。

适合练习两段视频背景的展示页与自定义播放节奏，不是太空旅行预约或影像生产工具。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备两段可使用的视频与自己的服务介绍。原文通过 CDN 加载 React 和动画库，统计数字、2026 年载人航程与合作名称都是示例文案，没有对应服务。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先生成首屏与 Capabilities 两段，检查 CDN 脚本加载后页面出现；网络不可用时不能把单文件等同于离线可运行。
2. 接入 FadingVideo，关闭 loop 属性，在结束前 0.55 秒开始 500ms 淡出，结束后重置再淡入；完整看两轮，检查没有卡在透明状态。
3. 保持每次渐变取消上一帧循环，并在组件卸载时清理监听；快速切换或重载后不应重复触发多次播放。
4. 加入逐词模糊入场与三张玻璃能力卡，检查手机标题、两张 220px 统计卡与双按钮不横向溢出，必要重排属于本站落地调整。
5. 将航程、用户数、合作和 AI 功能改为自己的事实或示例说明，再另补真实入口；原文建议压掉警告，练习时应先查看并处理实际问题。

**值得学习的写法：** 视频手动循环需要处理淡出、结束、重播和清理四个环节；宏大主题与数字文案不能代替真实服务证据。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把第一段背景替换为一段自己的短视频，保持手动渐隐规则。交付两轮循环录屏，检查结尾淡出、重新开始淡入且没有意外出声。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/aetheris-voyage) · [原始出处](https://motionsites.ai/?prompt=aetheris-voyage-hero)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
