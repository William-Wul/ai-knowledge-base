---
title: "点击展开邮件输入的候补名单原型"
description: "在流媒体背景上让按钮切换为邮件输入框，用打字提示和勾号反馈展示报名界面的状态。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: no-code-waitlist
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
import item from '../.vitepress/data/cases-generated/no-code-waitlist.json'
</script>

<CaseNavigation :item="item" />

# 点击展开邮件输入的候补名单原型

<CaseTags :item="item" />

在流媒体背景上让按钮切换为邮件输入框，用打字提示和勾号反馈展示报名界面的状态。

适合练习按钮、输入框、提交反馈与自动复位之间的界面切换。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备自己的标题和可用视频。原文使用 Mux 的 HLS 流与 hls.js，提交后只切换勾号和提示，未提供名单保存或邮件通知服务。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先搭建黑色单屏、玻璃导航、标题与 Get early access，再接入 HLS 背景，检查静音播放与文字对比。
2. 让按钮点击后切换为邮件表单并自动聚焦；检查 60ms 逐字提示不会挡住用户已经输入的地址。
3. 输入一个示例邮件，测试提交后图标与提示变化，再等待 4 秒确认回到按钮；这一反馈不代表地址已经保存。
4. 检查手机导航和表单不超宽，较矮屏幕中主入口仍可见；Video Demo、Sign Up 和 Login 仍需另补目标。
5. 本站落地时没有接收服务就把成功文案改为“界面演示，未提交”；只有另行接通并验证保存后，才能承诺报名成功或发送通知。

**值得学习的写法：** 提交后的勾号只是界面状态；表单是否真正保存、失败时怎样反馈，需要独立验证。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把提交后的提示改成“这是界面演示，邮件未保存”，保留勾号与 4 秒复位。交付提交后的截图，检查读者不会误以为加入了真实名单。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/no-code-waitlist) · [原始出处](https://motionsites.ai/?prompt=no-code-waitlist)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
