---
title: "单文件的黑色视频背景介绍页"
description: "在一张全屏影像上排列标题、两个行动入口与底部标志，并用手机菜单保持导航可用。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: intelligence-layer
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
import item from '../.vitepress/data/cases-generated/intelligence-layer.json'
</script>

<CaseNavigation :item="item" />

# 单文件的黑色视频背景介绍页

<CaseTags :item="item" />

在一张全屏影像上排列标题、两个行动入口与底部标志，并用手机菜单保持导航可用。

适合练习简洁产品介绍页，也适合观察同一构图如何从电脑固定位置切换成手机纵向排列。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备可使用的视频、简短产品介绍与两个明确的行动目标。原文要求一个内含样式和脚本的 index.html，视频与字体仍是外部资源，四个 logoipsum 是示例标志。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先生成单个 index.html，保留标志、导航、两行标题、说明、双按钮和底部标志；不要额外添加统计或功能卡片。
2. 按照 1487×1058 参考画布与高度单位定位电脑元素，接入指定视频及两层边缘渐变；检查标题没有被背景人物或高亮处淹没。
3. 切到窄屏纵向排版，手机标志用 2×2 排列，平板用一行；检查标题能够换行且两枚行动入口都可见。
4. 测试菜单开关、Escape 关闭、选择链接关闭与横屏关闭，核对按钮 aria-expanded 与实际状态一致。
5. 开启系统减少动态效果后检查入场动画停止、菜单仍可操作；本站落地时将 Get Started 与 View Architecture 指向自己的真实内容，并替换示例合作标志。

**值得学习的写法：** 一屏构图可以很简洁，但电脑绝对定位、手机流式排版与菜单状态要分别描述；单文件也不代表可以离线播放外部视频。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把标题和副说明换成一项真实服务的自足介绍，不添加新的区块。交付电脑与手机截图，检查标题未溢出、两枚行动入口都在首屏内。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/intelligence-layer) · [原始出处](https://motionsites.ai/?prompt=intelligence-layer)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
