---
title: "随鼠标移动的视频与多选咨询页"
description: "让电脑上的背景视频跟随鼠标横移切换进度，再用服务多选按钮显示当前咨询意向。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: contact-cybernetic
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
import item from '../.vitepress/data/cases-generated/contact-cybernetic.json'
</script>

<CaseNavigation :item="item" />

# 随鼠标移动的视频与多选咨询页

<CaseTags :item="item" />

让电脑上的背景视频跟随鼠标横移切换进度，再用服务多选按钮显示当前咨询意向。

适合练习联系页的交互反馈，将背景动作与读者选择分开处理。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备一段适合前后拖动的短视频和四项服务名称。原文提供打字、服务多选与意向提示，没有联系方式输入、消息发送或提交接口。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先搭建标题、说明、四枚服务按钮与背景视频；手机把视频放到内容后面，电脑把视频铺为背景。
2. 在电脑宽度不小于 1024px 时，让鼠标横移改变视频时间并限制在 0 到视频时长之间；从左移到右再反向移动，检查进度没有越界。
3. 在手机停用鼠标控制并使用正常播放，检查静音视频与固定导航没有覆盖多选按钮。
4. 按 600ms 启动延迟、每字 38ms 的规则显示两行标题；文字完整出现后，打字光标应结束。
5. 分别选择两项、取消一项、全部取消，核对底部反馈文字与数组一致；Let's Go 的真正提交或联系动作属于本站落地时另补的内容。

**值得学习的写法：** 多选控件的价值在于及时反馈当前选择；显示“准备咨询”并不代表意向已经发送。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把四项服务换成一个团队实际提供的四项服务。交付选择两项和取消全部后的两张截图，核对反馈名称与按钮状态完全一致。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/contact-cybernetic) · [原始出处](https://motionsites.ai/?prompt=contact-cybernetic)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
