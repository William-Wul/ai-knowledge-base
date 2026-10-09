---
title: "仪表盘截图与滚动证言展示页"
description: "以黑白标题、背景影像与仪表盘截图建立首屏，再让用户证言随滚动逐字变亮。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: neuralyn
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
import item from '../.vitepress/data/cases-generated/neuralyn.json'
</script>

<CaseNavigation :item="item" />

# 仪表盘截图与滚动证言展示页

<CaseTags :item="item" />

以黑白标题、背景影像与仪表盘截图建立首屏，再让用户证言随滚动逐字变亮。

适合展示软件界面或数据报告，练习把产品截图与文字证明分成前后两个段落。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备一张自己的仪表盘截图、品牌图和一段获得授权的评价。原文需要 React、Framer Motion 与字体资源，仪表盘是图片，没有给出数据系统或登录服务；评价内容是示例。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先搭建黑色首屏与第二段证言，分别放入自己的界面截图和评价；保留标题中的衬线斜体强调词。
2. 将背景视频铺满截图区域，截图居中并保留底部黑色渐隐；检查界面关键内容没有被裁掉。
3. 按滚动进度让标题组上移并淡出、截图上移；滑过首屏时应平稳过渡到证言，不能留下遮挡下一段的大图。
4. 把证言拆成逐字亮起的文字，再放头像、姓名和身份；滚到段尾整段应可读，姓名与评价应对应真实授权来源或注明示例。
5. 检查手机截图大小和菜单隐藏后剩余的 Sign In、主按钮；本站落地时另补真实去向，没有登录服务时不要保留虚假的登录承诺。

**值得学习的写法：** 截图可以说明界面长什么样，滚动证言可以控制阅读节奏；两者都不能代替真实的数据能力或用户证明。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把仪表盘图片换成一张自己的报告截图，保留视差与渐隐。交付首屏和滚动到第二段的两张截图，确认报告没有裁掉关键标题、证言仍可完整读到。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/neuralyn) · [原始出处](https://motionsites.ai/?prompt=neuralyn-hero)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
