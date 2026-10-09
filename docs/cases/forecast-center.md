---
title: "玻璃卡片与曲线动画的天气示例面板"
description: "在雷雨照片上排列侧栏、温度趋势和四块城市卡片，让曲线先画线再展开填色。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: forecast-center
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
import item from '../.vitepress/data/cases-generated/forecast-center.json'
</script>

<CaseNavigation :item="item" />

# 玻璃卡片与曲线动画的天气示例面板

<CaseTags :item="item" />

在雷雨照片上排列侧栏、温度趋势和四块城市卡片，让曲线先画线再展开填色。

适合练习数据面板外观与纯 HTML、CSS 动画，理解电脑固定布局到手机滚动布局的转换。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备 ./assets/storm-background.jpg。原文没有提供这张本地背景的下载地址，天气、城市与头像为示例；页面无需 JavaScript，没有真实预报、地点搜索或通知服务。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先以 1357×871 为参考建立侧栏、顶部工具、左侧天气描述、下方曲线和右侧四张卡片；保持固定电脑构图。
2. 补齐雷雨背景图并加入不同强度的半透明玻璃样式；检查文字与图标在照片亮处也能看清。
3. 按原文用 SVG 描线动画绘制曲线，再让填色稍后从左向右展开；结束时整条线与填充应完整可见。
4. 切到 860px 以下单列滚动与底部导航，检查最后一张卡片没有被固定底栏挡住；减小动态效果时图表应直接完整显示。
5. 保留原文 Strom 等文字仅用于复刻检查，本站落地时改正展示文案并标示示例数据；搜索、地点和通知要另补动作，不能宣称实时预报。

**值得学习的写法：** 静态数据也能通过描线与填色动画形成阅读节奏；面板是否显示得好，与它有没有真实天气数据是两回事。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把右侧四个城市名换成四个中国城市，保持温度并注明示例。交付手机最底部截图，检查长城市名不溢出、最后一张卡片不被底栏覆盖。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/forecast-center) · [原始出处](https://motionsites.ai/?prompt=forecast-center)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
