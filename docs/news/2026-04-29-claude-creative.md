---
title: 2026/04/29 · Claude 正式进驻设计师、音乐人、3D 建模师的工具软件
description: Anthropic 一口气与 Blender、Adobe、Autodesk、Ableton 等 8 家创意软件发布连接器，从今以后你在这些软件里可以直接叫 Claude 干活，不用切来切去了。
date: 2026-04-29
---

# 2026/04/29 · Claude 正式进驻设计师、音乐人、3D 建模师的工具软件

## 一、发生了什么

2026 年 4 月 28 日，Claude 的开发商 Anthropic 宣布：和 8 家主流创意软件同时完成技术对接，包括 Blender、Adobe Creative Cloud、Autodesk Fusion、SketchUp、Ableton、Splice、Affinity by Canva、Resolume。

这次发布的产品叫「连接器」（Connector）。所谓连接器，可以理解为给 Claude 装了一双手——以前 Claude 只能坐在聊天框里和你说话，从今以后，它可以直接伸手操作这些软件。

你在 Blender 里建模时，可以用自然语言叫 Claude 帮你分析场景；你在 Ableton 里做音乐时，可以直接问 Claude 某个功能怎么用，它的回答基于官方文档，不是瞎猜；你在 Photoshop 里工作，可以让 Claude 帮你调用 Creative Cloud 里 50 多个工具。

换句话说，AI 不再只是一个可以粘贴复制的外部助手，它开始住进创意专业人士每天用的软件里了。

---

## 二、8 个工具各能干什么

这次上线的 8 个连接器，覆盖了创意行业的几乎每个主要方向：

**Blender（3D 建模与动画）**
Blender 是免费开源的 3D 制作软件，从独立游戏开发到影视制作都在用它。Claude 接入后，可以用自然语言调用 Blender 的脚本接口，帮你分析调试整个 3D 场景，或者直接给 Blender 界面添加新工具。

**Adobe Creative Cloud（视觉设计）**
Claude 可以调用 Photoshop、Premiere Pro、Adobe Express 在内的 50 多个工具，直接生成或编辑图片和视频。

**Autodesk Fusion（工程与工业设计）**
订阅 Fusion 的设计师和工程师可以通过和 Claude 对话来创建和修改 3D 模型，不需要全程手动点菜单。

**SketchUp（建筑与室内设计）**
你可以用自然语言描述一个空间概念——一间书房、一件家具、一个场地——Claude 生成初始的 3D 雏形，你再拿到 SketchUp 里继续细化。

**Ableton（音乐制作）**
Claude 的回答基于 Ableton Live 和 Push 的官方文档，相当于给你配了一个随叫随到、不会忘事的专业客服。

**Splice（音乐采样）**
Splice 有一个巨大的版权免费音效样本库，音乐人过去要先去网站搜索再下载。现在可以直接在 Claude 对话框里搜索 Splice 的库，不用切换界面。

**Affinity by Canva（专业图形设计）**
批量调整图片参数、批量重命名图层、批量导出文件这类重复劳动，现在可以交给 Claude 自动跑完。

**Resolume Arena / Wire（现场视觉表演）**
VJ（视觉 DJ，用视频和视觉效果现场表演的艺术家）可以用自然语言实时控制演出软件，不需要在演出途中手忙脚乱地点按界面。

---

## 三、Anthropic 给出了五个上手场景

这次公告里，Anthropic 没有只说「Claude 很强大」，而是给了五个具体入口，适合不同背景的用户参考：

**当软件家教**：不会某个功能，直接问 Claude，让它一步步带你操作。

**写脚本代码**：如果你的软件支持脚本扩展（Blender、After Effects、SketchUp 都支持），Claude 可以帮你写自动化脚本，把重复操作一次性解决，以后一键运行。

**跨软件格式转换**：一个项目往往同时用多个软件，文件格式不一样、资产不好搬。Claude 可以帮你在设计、3D、音频软件之间转换格式、同步文件。

**快速出方案**：Anthropic 同步发布了一个新产品叫 Claude Design（目前还在早期阶段），专门用于快速生成软件界面的创意方案，结果可以直接导出到 Canva 继续加工。

**扛下重复劳动**：批量处理素材、批量修改场景属性，这类不需要创意但很耗时间的工作，可以交给 Claude 跑。

---

## 四、为什么 Blender 的合作值得单独说

这 8 个连接器里，Blender 的合作有一点和其他不一样：Anthropic 这次不只是做了技术对接，还以赞助商身份加入了 Blender Development Fund（Blender 基金会的资金池，用于维持软件的核心开发）。

AI 公司通常的做法是「在别人建的管道上面搭东西」，但 Anthropic 这次是出钱支持管道本身。

这背后有一个现实逻辑：Blender 的连接器基于一种叫 MCP 的开放协议构建，这个协议是 Anthropic 在推动的「AI 与软件之间的通用接口标准」，类似于当年 USB 接口的出现——以前每个厂商的插头都不一样，后来大家统一用 USB，接什么都方便了。如果 MCP 成为行业标准，任何接了 MCP 的软件，都能让 Claude 进去干活。Anthropic 投资 Blender，就是在养这条基础设施。

另外值得一提：Blender 的连接器不只 Claude 能用，其他 AI 模型也可以接，这符合 Blender 开源互通的价值观。

---

## 五、Anthropic 官方是怎么定位这件事的

公告的第一句话值得读一下：

> 「Claude 无法替代创意品味和想象力，但它能打开新的工作方式。」

在 AI「会不会取代设计师/音乐人」的讨论越来越多的时候，Anthropic 在官方公告里主动划线，说得很清楚：Claude 做的事是替创意人分担低价值劳动，而不是替代创意本身。

---

## 六、艺术院校的学生也会用上

除了工具合作，Anthropic 还宣布与三所学校合作：美国罗德岛设计学院（RISD）、林林艺术学院（Ringling College），以及英国伦敦大学金史密斯学院（Goldsmiths）。这三所都是创意计算方向的顶尖院校。

学生和教师将获得 Claude 及连接器的访问权限，他们的反馈将直接影响产品的后续迭代方向。

---

## 七、对普通用户来说意味着什么

如果你是 Adobe 或 Ableton 的用户，目前这些连接器还需要通过 Claude 的桌面应用来接入，具体使用门槛官方还在完善。值得关注进展。

如果你不用上面任何一款专业软件，这次发布对你的直接影响不大。但它标志着一个方向的变化：AI 正在从「你切出去用一下再贴回来」的工具，变成「就住在你工作软件里的助手」。对于做设计、做音乐、做 3D 的同事来说，这是个值得关注的信号。

---

## 扩展阅读

本文参考了以下原作者的文章（推荐读原文）：

- 《Claude for Creative Work》 · **Anthropic**（官方公告）· [原文链接](https://www.anthropic.com/news/claude-for-creative-work)
