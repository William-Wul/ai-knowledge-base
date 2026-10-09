---
title: "像素悬停遮罩与作品集卡片"
description: "用 12×8 黑色方块逐步覆盖作品图片，再配合随鼠标移动的小方块和底部循环标志。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: pixel-grid-hover
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
import item from '../.vitepress/data/cases-generated/pixel-grid-hover.json'
</script>

<CaseNavigation :item="item" />

# 像素悬停遮罩与作品集卡片

<CaseTags :item="item" />

用 12×8 黑色方块逐步覆盖作品图片，再配合随鼠标移动的小方块和底部循环标志。

适合练习作品集列表的悬停反馈与卡片信息层级。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备四张作品图、名称、分类与年份，以及实际详情链接。原文用 React、Tailwind CSS 3 与 Framer Motion，四件作品和底部标志为示例，卡片加号没有指定打开行为。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先搭建电脑 2×2、手机单列作品卡，填入四组图片和信息；保持 4:3 比例，名称牌不应被背景图淹没。
2. 将每卡拆成 12 列、8 行遮罩方块，按行列之和错开进入；悬停与移开时检查方块完整出现并退回。
3. 加入随鼠标轻移的小方块，离开后把指针位置重设为 0.5、0.5；检查离开卡片后方块回到原位。
4. 复制八个标志形成 16 项循环轨道，检查 28 秒循环接缝与悬停暂停；不用示例标志冒充自己的客户。
5. 手机没有持续悬停，必须确保名称和分类默认可读；本站落地时为加号与联系按钮补实际目标，再测试不靠悬停也能打开详情。

**值得学习的写法：** 方块动画可以引导注意力，但卡片信息与入口不能依赖鼠标悬停才能发现；循环标志需要两份相同序列才能衔接。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只替换第一张作品图、名称、分类和年份为自己的一个项目。交付悬停前后与手机三张截图，检查名称牌始终可读、遮罩退出后没有残留。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/pixel-grid-hover) · [原始出处](https://motionsites.ai/?prompt=pixel-grid-hover)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
