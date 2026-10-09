---
title: "聊天示例与网页预览的视差行动区"
description: "让聊天面板、视频网页预览和前景草地以不同速度滚动，展示一个课程介绍区的视觉结构。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: rocket-cta
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
import item from '../.vitepress/data/cases-generated/rocket-cta.json'
</script>

<CaseNavigation :item="item" />

# 聊天示例与网页预览的视差行动区

<CaseTags :item="item" />

让聊天面板、视频网页预览和前景草地以不同速度滚动，展示一个课程介绍区的视觉结构。

适合练习把一个产品示例嵌进介绍页面，以及多层视差的遮挡关系。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备自己的介绍文案、预览视频和前景图。原文聊天会追加用户消息与固定回复，没有 AI 接口；60 天收入和课程价格属于作者宣传文字，不是本站复现结果或收益承诺。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先建立左侧说明、行动按钮与右侧预览框，预览中左边放聊天、右边放 Velorah 视频首屏；手机隐藏聊天只留预览。
2. 按原文绑定预览 120 到 -120px、草地电脑 200 到 -200px 与手机 80 到 -40px 的滚动位移；检查两层方向与范围。
3. 输入一条消息，测试 Enter 发送、Shift+Enter 换行及固定回复；标明这是聊天演示，不能称为 AI 辅导。
4. 检查草地虽不拦截点击，仍可能视觉上遮住左侧文字；如有遮挡，请工具调整层级或位置，这是本站落地时的修正。
5. 将收益宣传换成自己可核实的学习目标；本站落地时另补 Start for free 的真实入口，再检查手机预览没有压住主按钮。

**值得学习的写法：** 原文具备本地聊天演示，但回复是固定的；视差层还需检查视觉遮挡，pointer-events-none 只解决点击拦截。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把固定回复改成一段明确写着“演示回复”的学习提示。交付输入前后两张聊天截图，检查消息追加正确，并用手机确认课程入口未被草地盖住。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/rocket-cta) · [原始出处](https://motionsites.ai/?prompt=rocket-cta)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
