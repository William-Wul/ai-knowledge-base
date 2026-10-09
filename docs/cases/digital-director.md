---
title: "像素字体与影像背景的个人作品集"
description: "用四栏身份与服务说明、两种字体的大标题、作品集播放入口和奖项标签构成单屏作品集。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: digital-director
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
import item from '../.vitepress/data/cases-generated/digital-director.json'
</script>

<CaseNavigation :item="item" />

# 像素字体与影像背景的个人作品集

<CaseTags :item="item" />

用四栏身份与服务说明、两种字体的大标题、作品集播放入口和奖项标签构成单屏作品集。

适合练习设计师或创作者的个人主页，把身份、能力与联系入口放在同一屏。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备真实个人简介、服务清单与作品集地址。原文用 Inter 和 basis33 两种字体，姓名、奖项及数量是作者示例；播放、预约与导航 href 为 \#，没有相应动作。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先搭建四栏资料与底部双栏，手机切为两栏资料和纵向底部；保留姓名、能力、服务三类信息的层级。
2. 只在原文指定的姓氏、工程、标签与大标题强调词上使用 basis33，其他文字用 Inter；检查像素字体确实加载而非退回普通字。
3. 接入静音背景视频，大屏放大 1.2 倍；原文没有暗色遮罩，要检查白字在视频较亮的帧仍能辨认，必要调整属于本站落地建议。
4. 逐项替换作者姓名、2004 年品牌故事与奖项数字为自己的事实；没有奖项就改为可核实的作品说明，不沿用作者荣誉。
5. 测试手机菜单的六个入口与关闭行为，再检查较矮屏幕中标题、作品集和联系入口不被裁掉；本站落地时把 \# 与播放按钮补成实际链接。

**值得学习的写法：** 字体混搭能突出身份与能力，但个人作品集最需要真实信息；锁定一屏还要求验证内容增加后是否被裁切。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把 Services 清单改为自己能提供的六项或更少服务，不添加新段落。交付短屏手机截图，检查清单、主标题和联系入口都能完整看到。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/digital-director) · [原始出处](https://motionsites.ai/?prompt=digital-director)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
