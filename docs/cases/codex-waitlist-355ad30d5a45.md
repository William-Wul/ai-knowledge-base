---
title: "随季节与本地时间换景的候补名单页"
description: "用同一场景的四季、四时段共 16 张图，根据本地时间选择背景，并保留参数测试入口。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: codex-waitlist-355ad30d5a45
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
import item from '../.vitepress/data/cases-generated/codex-waitlist-355ad30d5a45.json'
</script>

<CaseNavigation :item="item" />

# 随季节与本地时间换景的候补名单页

<CaseTags :item="item" />

用同一场景的四季、四时段共 16 张图，根据本地时间选择背景，并保留参数测试入口。

适合练习静态页面的场景选择规则与表单状态，需要先准备完整且构图一致的图组。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备 waitlist-scenes/ 中规定名称的 16 张图与真实默认跳转地址。原文要求 images-2.0 生成图片，不代表环境已具备该工具；studioNopeUrl 值为空，名单服务 waitlistEndpoint 也须自行配置。

参考工具：Codex · GPT Image 2.0。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先确认一张场景构图，再准备四季与四时段图组，保持镜头、地标和 38.2%/61.8% 的位置关系；检查 16 张仍是同一个地方。
2. 按原文文件名存入 waitlist-scenes/，设置模糊铺底、清晰场景与渐变三层；夜景白字、其他黑字，检查每景文字对比。
3. 用日期、半球判断和本地时段选择背景，定位只在已获许可时使用；首次打开不能意外弹出定位许可请求。
4. 用 season 与 time 参数逐一检查 16 个组合，重点核对 10:59/11:00、16:29/16:30、19:59/20:00 的分界；缺图不能静默显示错误场景。
5. 本站落地时先填写 studioNopeUrl；没有名单服务则验证跳转且不宣称保存，有服务再检查加载、成功和失败状态。最后按 1440×900 与 390×844 检查无横向、纵向滚动。

**值得学习的写法：** 换景依赖完整素材与明确选择规则；原文明确区分真实表单接口和默认跳转，但默认地址本身仍未提供。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把 winter-night.png 换成同一构图的新夜景，保持其余 15 张不变。用 ?season=winter&amp;time=night 打开并交付手机截图，检查文件选对、白字清楚且页面不滚动。

## 作者与来源

- 作者：@bas\_fijneman
- 案例收录：[Goodcase](https://goodcase.ai/cases/codex-waitlist-355ad30d5a45) · [原始出处](https://x.com/bas_fijneman/status/2053809664140226852)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
