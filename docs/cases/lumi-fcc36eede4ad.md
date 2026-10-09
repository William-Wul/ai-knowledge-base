---
title: "Lumi 租房真实成本计算器"
description: "输入租金与生活开销，比较租房的实际负担，学习小计算器的输入和结果设计。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: lumi-fcc36eede4ad
caseDetail: true
prev: false
next: false
---
<!-- 自动生成：修改 practice-cases.json / case-editorial-overrides.json 后运行 npm run cases:generate。 -->
<script setup>
import CaseMedia from '../.vitepress/theme/components/CaseMedia.vue'
import CasePrompt from '../.vitepress/theme/components/CasePrompt.vue'
import CaseReturn from '../.vitepress/theme/components/CaseReturn.vue'
import CaseNavigation from '../.vitepress/theme/components/CaseNavigation.vue'
import item from '../.vitepress/data/cases-generated/lumi-fcc36eede4ad.json'
</script>

<CaseNavigation :item="item" />

# Lumi 租房真实成本计算器

输入租金与生活开销，比较租房的实际负担，学习小计算器的输入和结果设计。

适合练习用 AI 制作输入明确、结果可检查的小工具。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备 AI 编程工具。原文把租金、押金、中介费、杂费与通勤折算为月度金额；它将押金计入一次性金额，未扣除退还押金，因此结果更接近该口径下的资金负担估算。

参考工具：Lumi、GPT-5.6 Sol。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先把原文的输入和计算公式交给工具，保留租期、通勤开关、时间估值开关与 A/B 对比。
2. 用本站测试样例核对：月租 1000、租期 12 个月、押金一个月、其余为 0，按原公式月度约 1083.33、年金额与租期合计均为 13000。
3. 再打开通勤：单程 2、每月 22 个工作日，应每月增加 88；时间估值关闭时，通勤分钟不应增加金额。
4. 测试负数、空值和月租为 0 的情况，要求显示明确提示；涨幅百分比不能出现无限大或无效数字。
5. 保存 A，再改租金保存 B，检查两方案差额。若加入押金退还功能，把新公式另列为本站扩展，避免与作者口径混用。

**值得学习的写法：** 原文公开了逐项公式，可以用手算样例验收。押金是可退还还是实际花费，会影响结论，复用时需写清自己的口径。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

增加“押金预计退还”选项，这是本站扩展建议。分别显示租期内需准备的资金与扣除退还后的支出，用押金全退、部分退和不退三组样例核对。

## 作者与来源

- 作者：@lumidotnew
- 案例收录：[Goodcase](https://goodcase.ai/cases/lumi-fcc36eede4ad) · [原始出处](https://x.com/lumidotnew/status/2028713799533109599)
- 整理日期：2026-09-23
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
