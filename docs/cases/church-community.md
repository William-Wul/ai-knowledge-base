---
title: "社区介绍、活动与证言的三屏手机展示"
description: "用三台手机模型分别呈现成员证言、社区介绍和活动清单，并共用全屏菜单。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: church-community
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
import item from '../.vitepress/data/cases-generated/church-community.json'
</script>

<CaseNavigation :item="item" />

# 社区介绍、活动与证言的三屏手机展示

<CaseTags :item="item" />

用三台手机模型分别呈现成员证言、社区介绍和活动清单，并共用全屏菜单。

适合练习社群或公益活动的移动页面展示，观察同一品牌如何在三个页面保持一致。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备自己的社区介绍、活动日期和获得授权的照片。原文技术栈是 React Native、Expo Router 与 Reanimated，需支持它的预览环境；它没有提供报名、视频播放或活动管理服务。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先建立 375×812 的手机画布、黑色边框和顶部开孔，放入三份页面；电脑并排，手机在 900px 以下纵向缩放排列。
2. 第一屏填入成员照片、证言与白色活动卡，检查左侧旋转姓名和底部日期都在框内。
3. 第二屏放社区大图、头像组与 Join us；第三屏按日期卡排列四项活动，核对日期与时间属于自己的内容或标注示例。
4. 为三屏接入同一菜单样式，逐屏测试打开、关闭，确认菜单只覆盖当前手机画布且关闭按钮可见。
5. 检查逐字动画结束后全部内容可读；本站落地时另补报名、活动详情和视频地址，不能把播放图标当成已有播放功能。

**值得学习的写法：** 三屏展示的重点是共享品牌、字体与菜单，同时让证言、介绍和活动各有明确任务；示例日期不应直接充当真实活动日程。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把第三屏的四项活动换成一个社群自己的四项示例活动，保持日期卡样式。交付第三屏截图，检查日期、时间和名称一一对应，长标题未压住日期卡。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/church-community) · [原始出处](https://motionsites.ai/?prompt=church-community)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
