---
title: "三屏手机模型中的 F1 车手展示"
description: "把车手、赛道积分和车队资料拆成三台手机，配合红色菜单、数字增长和图片入场动画。"
pageClass: case-detail-page case-category-web
caseCategory: web
caseSlug: f1-racing-hub
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
import item from '../.vitepress/data/cases-generated/f1-racing-hub.json'
</script>

<CaseNavigation :item="item" />

# 三屏手机模型中的 F1 车手展示

<CaseTags :item="item" />

把车手、赛道积分和车队资料拆成三台手机，配合红色菜单、数字增长和图片入场动画。

适合练习运动主题的移动页面组合与统一手机外框，不用于查询实时车队或赛事数据。

## 效果展示

<CaseMedia :item="item" />

**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。


## 开始前准备

准备三屏示例资料、车手和赛道素材。原文有一条赛车图片 URL 含 \[已省略\]，不能直接使用，需自行补完整可用图片；积分与资料为原型内容，没有提供赛事接口或登录服务。

参考工具：AI 编程工具。

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

1. 先建立可重复使用的 PhoneMockup，将 390px 设计画布按手机实际宽度等比例缩放；三台手机在电脑并排、手机纵向排列，外框不应裁掉内部内容。
2. 第一屏放赛道名、车手照片与姓名，保留底部渐隐；第二屏放赛道图与三组积分，第三屏放车队、赛车与两张车手资料卡。
3. 补齐原文省略的赛车图片地址，逐张检查加载；使用自己的完整素材时保留原来所在位置与比例，并说明这是素材替换。
4. 让 227、374、4987 三个示例值在各自延迟后用 2200ms 动画增长，停止后应精确显示目标值，并明确为示例。
5. 逐屏测试红色菜单开关，再检查车手姓名、赛车与资料卡的错开入场；Sign in 与菜单链接的实际目标属于本站落地时另补。

**值得学习的写法：** 三个页面共用手机框和导航可以保证一致性；缩放容器、动画终值和不完整素材地址需要单独检查。

## 完整提示词

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

只把第二屏三组积分换成 100、250、800 三个标注为示例的数值，保留增长动画。交付三屏组合截图和第二屏动画结束截图，核对数字与单位未被外框裁切。

## 作者与来源

- 作者：MotionSites
- 案例收录：[Goodcase](https://goodcase.ai/cases/f1-racing-hub) · [原始出处](https://motionsites.ai/?prompt=f1-racing-hub)
- 整理日期：2026-10-09
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
