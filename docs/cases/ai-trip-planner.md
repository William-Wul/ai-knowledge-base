---
title: "带灵感文件选择的旅行规划原型"
description: "把目的地描述放进玻璃卡片，叠在旅行视频上，并让上传按钮打开本地文件选择框。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: ai-trip-planner
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
import item from '../.vitepress/data/cases-generated/ai-trip-planner.json'
</script>

<CaseNavigation :item="item" />

# 带灵感文件选择的旅行规划原型

<CaseTags :item="item" />

把目的地描述放进玻璃卡片，叠在旅行视频上，并让上传按钮打开本地文件选择框。

适合练习旅行产品的输入入口外观，理解文件选择动作与真正生成行程是两回事。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备旅行背景视频和一段目的地描述。原文的描述是静态段落，上传按钮只触发图片或 PDF 的本地选择框，没有提供文件处理、AI 行程生成或登录服务。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先建立单屏视频、白色渐变、导航和居中的标题；检查黑色文字在背景运动时仍能看清。
2. 将原文七天日本旅行描述放入宽 701px 的玻璃卡片，定位右下 Plan My Trip 按钮；内容不能与按钮重叠。
3. 让 Upload 按钮通过 ref 打开隐藏文件选择框，保留 image/\*,.pdf 限制与 Upload inspiration 标签；点击后应出现选择框，不要声称文件已上传或解析。
4. 切到手机宽度，让卡片宽度随屏幕缩小、隐藏中间导航与 Login；检查长描述未跑出卡片边缘。
5. 本站落地时如要接受读者输入或生成行程，需另补输入控件与处理流程；当前练习只验收原型和文件选择动作。

**值得学习的写法：** 提示词具体规定了一个可点击的文件选择入口，却没有规定文件去了哪里；产品文案中的 AI 能力需要另有实现。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把卡片描述换成“上海三日游，喜欢博物馆与步行”的示例文字。交付手机截图，并测试一次选择图片再取消，确认页面不乱、没有误报上传成功。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/ai-trip-planner) · [原始出处](https://motionsites.ai/?prompt=ai-trip-planner)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
