---
title: "给小工具加上拖拽选文件"
description: "选择文件后展示名称、大小和类型，可作为文件处理工具的第一步。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseDetail: true
prev: false
next: false
---
<!-- 自动生成：修改 practice-cases.json 后运行 npm run cases:generate。 -->
<script setup>
import CaseMedia from '../.vitepress/theme/components/CaseMedia.vue'
import CasePrompt from '../.vitepress/theme/components/CasePrompt.vue'
import CaseReturn from '../.vitepress/theme/components/CaseReturn.vue'
import item from '../.vitepress/data/cases-generated/file-upload.json'
</script>

# 给小工具加上拖拽选文件

选择文件后展示名称、大小和类型，可作为文件处理工具的第一步。

适合需要选择文件的小工具。原组件只在浏览器中选取和显示文件，不包含服务器上传。

## 效果展示

<CaseMedia :item="item" />

## 开始前准备

需要一个 React 项目，或让 AI 编程工具先创建预览项目。原组件依赖动画、拖拽和图标库，交给 AI 检查依赖后接入。

参考工具：AI 编程工具。

## 怎么做

1. 复制下方中文使用指令与完整源码，交给 AI 编程工具。
2. 告诉 AI 选中文件后要做什么，例如检查格式或交给现有处理功能。
3. 测试点击选取、拖拽选取和文件信息显示；如需真正上传，另接服务器并测试失败提示。

**值得学习的写法：** 区分“选择文件”和“上传文件”。先把输入过程做清楚，再连接后续处理。

## 使用指令与源码

<CasePrompt :item="item" />

## 改成自己的内容

要求 AI 限制只能选择图片，并为不支持的格式显示中文提示。

## 作者与来源

- 作者：Aceternity UI
- 案例收录：[Goodcase](https://goodcase.ai/cases/file-upload) · [原始出处](https://ui.aceternity.com/components/file-upload)
- 整理日期：2026-09-22
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn category="web" />
