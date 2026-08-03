---
title: 给 AI 派活：把任务说清楚，把"完成"定义明白
description: 从"下指令"到"定义完成"——一道适合度判断题、一张五格任务单、一套迭代验收节奏，让 AI 交付能直接用的成果
---

# 给 AI 派活：把任务说清楚，把"完成"定义明白

同样是用 AI，有人拿到的成果改两个字就能交，有人来回改八遍最后还是自己重写。差距往往不在模型，也不在会不会写提示词，而在一个更上游的动作：**会不会派活。**

想想你怎么给新同事派活：你不会只说"把这事做了"，你会说清楚要交什么、什么时候要、什么不能动、出了问题找谁。但绝大多数人对 AI，恰恰就是一句"把这事做了"。这篇文章把"派活"拆成一套可以照做的方法。

---

## 一个观念转变：从"下指令"到"定义完成"

先分清两种派活方式：

**操作指令**："帮我写一份竞品分析。"——你告诉 AI **做某事**，至于做成什么样算完，你没说，它只能猜。

**完成定义**："写一份竞品分析，让总监 10 分钟能看懂三家对手的价格策略和我们的两个反制选项，最后附一页对比表。"——你告诉 AI **让什么成真**，它有了明确的靶子。

![指令式派活与目标式派活的对比](/images/stage-2/goal-vs-command.webp)
<p class="figcaption">两种派活的分野：左边是"做这步、修这里"的指令式派活，人累、方向还乱；右边只盯住目标、边界、证据三样东西，船自己往前开。（图出自《Codex /goal 实战指南》，公众号 AI的岔路口）</p>

一句话记住这个转变：**提示是为了对话，目标是为了交付。**

这不是我们的发明。吴恩达（AI 领域最有影响力的教育者之一）说过一句很重的话：**"未来最重要的技能之一，是能够准确地告诉计算机你想要什么。"** 这句话对程序员成立，对写方案、做分析、整理资料的每一个普通岗位同样成立。

---

## 派活先做一道判断题：这活适合交给 AI 吗

不是所有活都适合派。派之前，花 30 秒过一遍这张表：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">判断</div><div style="flex:2;">什么样的活</div><div style="flex:2;">例子</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">✅ 好做</div>
    <div style="flex:2; color:#444;">以文字处理为主，且需要的信息你都能提供</div>
    <div style="flex:2; color:#777;">写总结、改文案、整理会议纪要、翻译</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">✅ 最适合</div>
    <div style="flex:2; color:#444;">有清晰固定流程、职责明确的活</div>
    <div style="flex:2; color:#777;">每周例行报表、按模板出的方案、资料汇编</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#b3402a; font-weight:600;">⚠️ 难做</div>
    <div style="flex:2; color:#444;">重度依赖图像、语音、视频判断的活</div>
    <div style="flex:2; color:#777;">审设计稿美感、判断视频节奏</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#b3402a; font-weight:600;">❌ 别派</div>
    <div style="flex:2; color:#444;">你自己都说不清"做完长什么样"的活；需要人来审美和最终拍板的环节</div>
    <div style="flex:2; color:#777;">"帮我想想部门明年怎么搞"；最终用人决策</div>
  </div>
</div>
<p class="figcaption">三条判断依据来自吴恩达："别派"清单来自 AI 工具实战社区的大量翻车总结。一句话就能问完的小事也不用"派"，直接问就行。</p>

最后一格要特别诚实：**说不清"完成"是什么的活，派出去必然翻车**——你得到的只是"看起来很忙"的产出。这种活先别派，自己把目标想清楚了再说。

---

## 好任务单的五个格子

判断适合派之后，怎么写任务单？把下面五个格子填满。它来自 AI 编程工具里经过大量实战检验的目标写法，翻译成日常办公语言后，一个格子都不用改：

![好目标的五段式结构](/images/stage-2/task-brief-five-grids.webp)
<p class="figcaption">五格任务单的原型：最终结果居中，范围、约束、完成条件、停止条件四足鼎立。（图出自《Codex /goal 实战指南》，公众号 AI的岔路口）</p>

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">格子</div><div style="flex:2;">写什么</div><div style="flex:2;">例子（派 AI 写季度汇报）</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">最终结果</div>
    <div style="flex:2; color:#444;">交付什么、给谁看、长什么样</div>
    <div style="flex:2; color:#777;">一页给分管领导的季度汇报，三个项目各一段</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">范围</div>
    <div style="flex:2; color:#444;">能碰哪些材料、管哪些方面</div>
    <div style="flex:2; color:#777;">只用我给的这三份项目记录，别的不写</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">约束</div>
    <div style="flex:2; color:#444;">不能动的、必须遵守的</div>
    <div style="flex:2; color:#777;">数据必须和记录一致，不许编；不超过 800 字</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">完成条件</div>
    <div style="flex:2; color:#444;">可打勾验收的标准</div>
    <div style="flex:2; color:#777;">每个项目说清"进度+一个风险"；延期原因必须写明</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">停止条件</div>
    <div style="flex:2; color:#444;">什么情况停下来先问你</div>
    <div style="flex:2; color:#777;">发现数据对不上就停下来告诉我，别自己圆</div>
  </div>
</div>
<p class="figcaption">五个格子不用每次都写全，但"完成条件"这一格不能省——它是你和 AI 之间的验收单。</p>

写任务单时有一个头号天敌：**模糊形容词**。"改进""优化""提升""全面""彻底"——这些词你度量不了，AI 也就交付不了。对比一下：

> ❌ "帮我把这份报告改好一点，全面优化一下。"

> ✅ "这份报告给新客户看，目标：让对方 5 分钟明白我们的三个优势。范围：只改结构和措辞，数据和结论不动。约束：删掉所有行业黑话，字数压到 1500。完成条件：开头 100 字说清核心结论，每个优势配一个真实案例。有看不懂的地方先问我，别自己猜。"

第一种派法，你得到的是一份"换了个说法"的报告；第二种，你得到的是一份能验收的报告。**度量不了的，就交付不了——把形容词换成可打勾的条件，是派活最关键的一步。**

---

## 别让它一口气干完：像带人一样带 AI

任务单发出去了，接下来大多数人会犯第二个错误：让 AI 一口气从头干到尾。

吴恩达专门批评过这种用法：**让模型"从第一个字到最后一个字一口气写完"，是大多数人用错 AI 的地方。** 正确的节奏和人工作一模一样：先出大纲 → 再查资料 → 再写初稿 → 最后修改。慢一点，但质量天差地别。

落到操作上就是三条：

**大任务拆阶段。** 写方案，先让 AI 出提纲，你确认提纲对了，再让它逐段展开。每个阶段验收一次，比最后一次性返工省十倍力气。

**阶段开头，重申目标。** 这里要防一个叫"意图衰减"的坑：对话越长，AI 越容易忘记最初为什么出发——你三小时前定的目标，早被后来几十轮讨论埋掉了。对策很简单：每个阶段开头，用一句话把目标重申一遍，"记住，我们最终要的是 XXX"。

![意图衰减：初始目标随对话变长而燃尽](/images/stage-2/intent-decay.jpg)
<p class="figcaption">意图衰减：初始目标像一炷香，对话越长，烧得越淡。定期重申目标，就是给这炷香续上。（图出自《Codex /goal 实战指南》，公众号 AI的岔路口）</p>

**跑偏了当场纠。** 看到方向不对，立刻打断纠正，别抱着"让它先写完看看"的侥幸心理——在错误的方向上写完，每一句都是浪费。反过来，如果它干得好，下一步要什么也可以提前交代，让节奏不断档。

---

## 验收：没有标准的奔跑，只会放大偏差

最后一件事，也是最容易被省掉的一件事：**派活的时候，就把验收标准定好。**

目标必须绑定"验证器"——没有验收标准的长期奔跑，不会放大成果，只会放大偏差。普通人用不着复杂工具，四招就够：

1. **数字抽查**：涉及数据的，随机挑两三个回原始材料里对
2. **事实要出处**：让它给关键论断标出来源，给不出出处的存疑
3. **格式对照**：拿着"完成条件"逐条打勾，这是最省事的一招——前提是你派活时写了
4. **让它自查**："以挑剔的审核视角，检查你刚交付的内容是否符合我的完成条件，列出不符合项"

到这里，你和 AI 的分工就清晰了，有人把它叫做"架构师握手"：**你负责定义成功标准和边界，AI 负责不知疲倦地执行和验证。** 派活派得好的人，不是打字快的人，是标准和边界定得清的人。

---

## 总结

<div style="border:2px solid #cde0d4; border-radius:12px; padding:20px; background:#f6faf7; margin:18px 0;">
  <div style="font-weight:700; color:#2D5A3D; font-size:16px; margin-bottom:12px;">派活一张卡</div>
  <div style="font-size:14px; line-height:2.2; color:#33503c;">
    <strong>观念</strong> → 提示是为了对话，目标是为了交付；派活就是定义"完成"<br>
    <strong>判断</strong> → 文字类+信息能给全+有固定流程的活最适合；说不清"完成"的活先别派<br>
    <strong>五格任务单</strong> → 最终结果 + 范围 + 约束 + 完成条件（可打勾）+ 停止条件<br>
    <strong>头号天敌</strong> → 模糊形容词："改进""优化""全面""彻底"<br>
    <strong>节奏</strong> → 大纲→初稿→修改分段走；每阶段重申目标；跑偏当场纠<br>
    <strong>验收</strong> → 派活时就定好标准：数字抽查、事实要出处、逐条打勾、让它自查
  </div>
</div>
<p class="figcaption">把 AI 当同事的人，和把 AI 当搜索引擎的人，用的是同一个工具，得到的是两种结果。区别从派活那一刻就开始了。</p>

---

## 扩展阅读

- [《深度｜吴恩达：很多人用 Agentic AI 的方式是错的》](https://mp.weixin.qq.com/s/04hbgC3f2I_DhSWVy4nYnw) · **Z Potentials**（微信公众号）——"迭代而非一口气写完""任务适合度三条判断""准确告诉计算机你想要什么"的出处。
- [《Codex /goal 实战指南：一个指令改变你写代码的方式》](https://mp.weixin.qq.com/s/OnkP8IDUYpT6hv1rKW4pkg) · **AI的岔路口**（微信公众号）——"操作指令 vs 成功条件"、五格任务单原型、"意图衰减"与三张配图的出处，原文面向 AI 编程场景。
- [《Codex 官方文章：如何把 Codex 用到极致》](https://mp.weixin.qq.com/s/YCPnFQERglE7Zt8xzp8y-Q) · **cxuanAI**（微信公众号）——"目标必须绑定验证器""人的角色转向定义结果与验收"的出处。
