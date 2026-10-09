---
title: "单文件数据产品首屏与演示卡"
description: "在全屏视频左下放标题与主按钮，右下放玻璃演示卡，并为手机提供可操作的下拉菜单。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: data-signal
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
import item from '../.vitepress/data/cases-generated/data-signal.json'
</script>

<CaseNavigation :item="item" />

# 单文件数据产品首屏与演示卡

<CaseTags :item="item" />

在全屏视频左下放标题与主按钮，右下放玻璃演示卡，并为手机提供可操作的下拉菜单。

适合练习软件介绍页的首屏层次、键盘菜单与入场动画结束状态。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备可使用的视频、演示缩略图与两种字体文件。原文只给 Reference Sans、Reference Display 名称，未附字体资源；时间是静态字符串，Sign Up 和演示卡没有给真实服务。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先生成单文件 index.html，保留左下标题、说明、主按钮和右下演示卡，不额外加功能区块。
2. 补齐字体与 assets/watch-demo-thumbnail.png，接入指定背景视频；若没有原字体，应说明替代字体，不能把结果称为逐像素复刻。
3. 按原文时间表实现标题两行与卡片入场，保留 3500ms 兜底；等待动画结束后全部内容都应可见，禁用动画时也不能停在透明状态。
4. 在平板与手机测试菜单打开后焦点进入第一项、关闭后不可进入隐藏链接，以及 Escape、外部点击和选择链接关闭。
5. 检查短屏与横屏时标题和演示卡不碰撞；本站落地时另补 Get Started、Sign Up 与 Play demo 的真实目标，时间若保留应注明示例或替换为真实规则。

**值得学习的写法：** 精确的尺寸和动画表有助于还原视觉，但缺少字体文件、演示视频与服务目标时，仍只是有待补齐的页面原型。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把演示缩略图换成自己的报告截图，不改卡片尺寸。交付电脑与短屏手机截图，并用键盘打开、关闭菜单，记录隐藏菜单是否还能被聚焦。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/data-signal) · [原始出处](https://motionsites.ai/?prompt=data-signal)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
