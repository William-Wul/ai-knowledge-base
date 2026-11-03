---
title: "照片转极简贴纸"
description: "按人物、物件和风景分别简化，保留原图最有辨识度的轮廓。"
pageClass: case-detail-page case-category-image
caseCategory: image
caseSlug: grok-bot-ai-c10a164196c1
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
import item from '../.vitepress/data/cases-generated/grok-bot-ai-c10a164196c1.json'
</script>

<CaseNavigation :item="item" />

# 照片转极简贴纸

<CaseTags :item="item" />

按人物、物件和风景分别简化，保留原图最有辨识度的轮廓。

可以用来练习构图、视觉风格与参考图约束。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备一张照片；物件和建筑不需要添加眼睛。

参考工具：支持参考图的生图工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先确认主体属于人物、动物还是物品，上传参考照片。
2. 保留对应类别的规则，固定数量、主色和一至三个识别特征。
3. 检查黑色胶囊眼、物品无五官、背景大色块是否各自符合规则。

**值得学习的写法：** 同一风格也要按主体类别写不同的简化方式。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

分别用一个杯子和一只动物试做，检查是否错误地全部拟人化。

## 作者与来源

- 作者：LABX拆解局
- 案例收录：[Goodcase](https://goodcase.ai/cases/grok-bot-ai-c10a164196c1) · [原始出处](https://www.xiaohongshu.com/explore/6ab951cb0000000018012cb2?xsec_token=YBDvHRBGxhIU2n8lOgva3jc7S90AnZftwCBT8NvXZg63A=)
- 整理日期：2026-11-03
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
