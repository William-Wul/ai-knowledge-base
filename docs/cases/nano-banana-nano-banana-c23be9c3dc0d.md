---
title: "只有橙色墨镜保留彩色的人像"
description: "把人物、服装和背景转成黑白，只让橙色镜框成为彩色焦点。"
pageClass: case-detail-page case-category-image
caseCategory: image
caseSlug: nano-banana-nano-banana-c23be9c3dc0d
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
import item from '../.vitepress/data/cases-generated/nano-banana-nano-banana-c23be9c3dc0d.json'
</script>

<CaseNavigation :item="item" />

# 只有橙色墨镜保留彩色的人像

<CaseTags :item="item" />

把人物、服装和背景转成黑白，只让橙色镜框成为彩色焦点。

适合练习参考面孔保持与局部保留彩色的控制。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备FACE\_REF人脸图，可选GLASSES\_REF眼镜图。可替换参考身份或眼镜细节；固定9:16、仰头直视、黑色高领穿搭，只有墨镜呈橙色。100%还原是原文目标，不是本站实测结论。

参考工具：Nano Banana。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 用FACE\_REF上传清楚的人脸，未提供眼镜参考时明确略过GLASSES\_REF。
2. 先核对脸型与年龄特征，再安排高领黑衣、顶光和飘过脸庞的几缕头发。
3. 仅让橙色镜框和琥珀渐变镜片保留彩色，不给皮肤或背景染色。
4. 检查9:16、人物身份、镜框矩形圆角与镜片渐变；逐项看衣服、皮肤及反射有没有漏入其他彩色。

**值得学习的写法：** 局部彩色要求同时写出允许彩色的位置和禁止彩色的区域。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

本站练习：保留原人像，只把镜框变为深红并同步修改全文颜色；检查镜片与其他区域仍遵守局部彩色规则。

## 作者与来源

- 作者：@hx831126
- 案例收录：[Goodcase](https://goodcase.ai/cases/nano-banana-nano-banana-c23be9c3dc0d) · [原始出处](https://x.com/hx831126/status/2103042118675833252)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
