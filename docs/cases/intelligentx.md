---
title: "带输入框的浅色资源介绍原型"
description: "用浅灰背景、内嵌眼睛图形的标题、输入胶囊和下方影像，组织一个资源介绍首屏。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: intelligentx
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
import item from '../.vitepress/data/cases-generated/intelligentx.json'
</script>

<CaseNavigation :item="item" />

# 带输入框的浅色资源介绍原型

<CaseTags :item="item" />

用浅灰背景、内嵌眼睛图形的标题、输入胶囊和下方影像，组织一个资源介绍首屏。

适合练习资源导航页的输入入口与标题排版，不用于提供自动咨询或健康判断。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备真实资源介绍、可使用的视频与输入框的预期用途。原文实际品牌是 mėntality，标题中的 Remix 为示例文字；它给出输入框外观，未提供搜索、语言切换或答复逻辑。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先统一全页 \#EDEEF5 浅灰背景，搭建固定导航与 12 栏标题区；视频从首屏下方开始，与背景渐变衔接。
2. 把眼睛胶囊放入标题指定位置，检查手机 16px、平板 42px、大屏 62px 下没有把句子挤出屏幕。
3. 添加可输入文字的白色胶囊与尾部箭头，分别检查空文本与较长文本显示；按原文它只接受输入，不会自动回答。
4. 测试手机抽屉菜单开关，检查标题与固定导航之间留有空间，并检查底角标签不盖住视频上的内容。
5. 本站落地时明确输入框、find help 与语言按钮的真实用途，另补相应处理或链接；涉及健康的文案应只描述实际提供的信息资源。

**值得学习的写法：** 输入框能打字不等于可以搜索或咨询；标题与背景形成的视觉原型，需要单独定义每个入口的行为。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把输入框提示改成“输入想了解的资源主题”，并在页面注明当前为界面示例。交付手机截图，测试输入一条长主题时没有推开箭头或溢出。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/intelligentx) · [原始出处](https://motionsites.ai/?prompt=intelligentx)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
