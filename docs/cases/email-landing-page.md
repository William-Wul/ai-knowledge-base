---
title: "邮件客户端模型与价格切换的长介绍页"
description: "用视频首屏、模拟收件箱、分类卡片、评价与三档价格，展示邮件产品的完整介绍页面。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: email-landing-page
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
import item from '../.vitepress/data/cases-generated/email-landing-page.json'
</script>

<CaseNavigation :item="item" />

# 邮件客户端模型与价格切换的长介绍页

<CaseTags :item="item" />

用视频首屏、模拟收件箱、分类卡片、评价与三档价格，展示邮件产品的完整介绍页面。

适合练习较长产品页的信息组织，以及同一示例在界面、功能说明与价格中保持一致。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备自有品牌文案、示例邮件和真实价格说明。原文主要是界面模型，虽列 Supabase 依赖但没有邮箱接入或 AI 处理流程；价格段混入 Forma 及图片导出功能，评价、客户名称不能当成自己的证明。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先搭建导航、首屏、菜单条、收件箱、分类、标志、评价、价格与末尾入口九段，检查每段标题与用途；不要一次要求工具补真实邮件服务。
2. 用示例邮件填入侧栏、列表和阅读区，核对选中的 Linear 邮件与 23 项、14 项、2 项摘要一致；模拟按钮不能宣称已回复或删除邮件。
3. 检查首屏渐变字与价格水印各自的噪点；原文两个 SVG 滤镜都叫 c3-noise，本站落地时须给不同滤镜独立名称并更新引用，避免效果串用。
4. 测试 yearly 开关让 Standard 与 Pro 的月价、年价同时切换；将混入的 Forma、图片导出与项目额度改成产品实际提供的套餐，不沿用错配功能。
5. 在手机检查收件箱三栏是否仍可读、价格横向滑动能看到三档；导航菜单只有按钮外观，要另补动作。最后为下载、销售和套餐按钮填写实际目标，真实邮箱与付费另行实现。

**值得学习的写法：** 长页面最容易出现品牌、功能、示例数字与价格不一致；先核对文案和状态，再把视觉模型接到真实服务。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只改 Standard 套餐为自己的一套示例方案，写明月价、年价和三项准确能力。交付月付、年付两张截图，检查价格切换正确且没有残留 Forma 或图片导出描述。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/email-landing-page) · [原始出处](https://motionsites.ai/?prompt=email-landing-page)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
