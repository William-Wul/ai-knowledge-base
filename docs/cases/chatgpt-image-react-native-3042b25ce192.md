---
title: "博物馆长页与五章节沙粒切换"
description: "以巨型字母标志、浅色介绍区和黑色藏品区，展示五个可点击、自动轮换的章节。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: chatgpt-image-react-native-3042b25ce192
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
import item from '../.vitepress/data/cases-generated/chatgpt-image-react-native-3042b25ce192.json'
</script>

<CaseNavigation :item="item" />

# 博物馆长页与五章节沙粒切换

<CaseTags :item="item" />

以巨型字母标志、浅色介绍区和黑色藏品区，展示五个可点击、自动轮换的章节。

适合练习主题展览的长页面与章节切换，理解素材清单、状态与图片过渡之间的关系。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备首屏视频、翼龙图、五张章节图及字体地址。原文这些地址均为空；虽然案例标题提及 React Native，实际原提示词使用 React 19、Vite、Tailwind CSS 4 的网页结构，不能混用。

参考工具：ChatGPT Image 2.0 · Claude Opus 4.6。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先搭建首屏、Explore Our World 和 Ancient Collection 三段，保持浅色到黑色的过渡与翼龙跨段位置。
2. 补齐空的字体、视频和六张图片地址，逐一检查加载；首屏视频按原文在 2800ms 后出现，不应留下空白背景。
3. 将五张章节图与名称配成列表，默认索引 2，按 3500ms 自动前进并循环；点击任一章节时图片、计数和高亮应一致。
4. 按原文辅助函数说明实现约 900ms 的沙粒过渡，检查进入与退出都完成；代码块只有实现提纲，不能当作已写好的完整函数。
5. 检查手机菜单、章节列表和跨段图像未溢出；本站落地时为 Explore Now、详情与类别按钮补目标，原文未给展览购票或内容管理服务。

**值得学习的写法：** 长提示词可以规定状态与动画，却仍可能留下所有素材地址和辅助函数实现；先补素材，再验证图片、编号和高亮一起变化。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把五个章节中的第三项换成自己的一个展览主题和图片。交付点击第三项的截图与自动切到下一项的截图，检查图、编号和标题始终对应。

## 作者与来源

- 作者：@viktoroddy
- 案例收录：[Goodcase](https://goodcase.ai/cases/chatgpt-image-react-native-3042b25ce192) · [原始出处](https://x.com/viktoroddy/status/2059294558299766837)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
