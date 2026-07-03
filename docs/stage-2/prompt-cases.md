---
title: Prompt 进阶：让 AI 帮你想
description: 四个可直接上手的进阶技巧，从说清楚话升级到让 AI 主动帮你想得更深
---

# Prompt 进阶：让 AI 帮你想

[上一篇](/stage-2/how-to-prompt)讲了跟 AI 说话的基本方法：说清楚你要什么、给角色、给例子、不满意就追问。这些够应付日常了，但你很快会遇到一个问题：**AI 给的东西"看着行"，实际一用就差点意思。**

差在哪？不是 AI 不够聪明，而是你还在"单向下达指令"。这篇教你四个进阶技巧，核心就一句话：**别只让 AI 干活，让它帮你想。**

---

## 一、把需求说完整：一个通用框架

基础篇提过"角色+任务+对象+要求+格式"的万能公式。这里给一个更完整的版本，适合稍微复杂一点的任务：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">要素</div><div style="flex:2;">说白了就是……</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">背景</div>
    <div style="flex:2; color:#444;">我是谁、这件事发生在什么场景下</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">目标</div>
    <div style="flex:2; color:#444;">我想达成什么结果、解决什么问题</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">素材</div>
    <div style="flex:2; color:#444;">我现有的数据、文件、参考资料</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">约束</div>
    <div style="flex:2; color:#444;">字数、语气、不能出现什么、截止时间</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">输出格式</div>
    <div style="flex:2; color:#444;">要表格、要分点、要邮件体、要 PPT 大纲</div>
  </div>
</div>
<p class="figcaption">每次给 AI 下任务前，心里过一遍这五个要素。不用全填，但填得越多，AI 跑偏越少。</p>

**反面示范：**

> "帮我写一个培训方案。"

**正面示范：**

> "我是公司培训负责人（背景），要给 300 名非技术员工做一场 AI 入门培训（目标），时间 2 小时，线下集中（约束）。请帮我列一个培训方案大纲，按时间顺序分模块，每个模块写清楚内容和时长（输出格式）。"

同样的任务，后者给出的结果基本能直接拿去用，前者你至少要追问三四轮。

---

## 二、让 AI 先追问你

很多人习惯一口气把需求甩给 AI。但你有没有发现，有时候你自己都没想清楚要什么？

一个立竿见影的技巧：**不要直接让 AI 开始干活，先让它问你问题。**

**你可以直接复制这句话：**

> "先别急着动手。请你先问我 5 个问题，帮我把需求想清楚，问完之后再开始。"

AI 会问出你没想到的维度。比如你说"帮我写一个活动方案"，它可能追问：

- 活动目的是拉新还是维护老客户？
- 预算大概多少？
- 线上还是线下？
- 要覆盖多少人？
- 有没有参考案例？

**这些问题帮你把自己脑子里模糊的东西变清楚。** 回答完这些再让 AI 动手，出来的东西针对性强很多。

![AI 追问后给出的针对性回答](/images/stage-2/ai-ask-back-result.png)

<p class="figcaption">一次真实的追问式对话：问 AI"该不该招一个 HR 负责人"，它先连续追问了十几个问题，最后给出的不是通用套话，而是贴着提问者预算和处境的具体建议。</p>

**进阶用法：** 你还可以指定 AI 用什么视角来追问。比如：

> "请你以一个资深活动策划的身份，先问我 5 个你接到这个需求时最想确认的问题。"

给了专家视角后，追问的质量会更高，问出来的是行家才会关心的盲点。

---

## 三、让 AI 反过来帮你挑毛病

AI 有一个天然的弱点：太听话了。你说什么它都"好的"，很少主动说"这个方案有问题"。

所以你得**主动让它站到对面去**，帮你找风险、找漏洞。

### 方法 1：让 AI 当反对者

**你可以直接复制：**

> "假设你是一个专门找问题的审核员。请对我上面的方案提出至少 5 个可能出问题的地方，越尖锐越好。"

### 方法 2：让 AI 预演失败

**你可以直接复制：**

> "假设这个方案执行之后失败了。请你倒推，最有可能是哪三个环节出了问题？"

这种"提前演一遍失败"的思路叫**事前验尸**（Pre-mortem）：不等事情真翻车，先让 AI 帮你想象翻车现场，再回来补救。


### 方法 3：对抗式审查

如果你让 AI 帮你写了一份文案、一个方案、一封邮件，写完之后加一句：

> "现在请你换一个角色：你是收到这份内容的人。站在对方立场，告诉我这份内容有什么让你不舒服、不信任、或者看不懂的地方。"

这就是**对抗式审查**：让 AI 从"帮你写"切换成"帮对方挑刺"。很多时候你觉得写得不错，一换视角就发现好几处说不通。

![对抗式审查的实际对话](/images/stage-2/adversarial-review-2.png)

<p class="figcaption">对抗式审查的真实一幕（AI 编程场景）：活干完后让 AI"开启对抗式审查"，它真的抓出了两个藏得很深的问题。写方案、写文案时同样适用。</p>

---

## 四、用故事理解新概念

工作中经常碰到新概念、新术语，搜出来的解释全是专业黑话，看完更懵。

一个很实用的技巧：**让 AI 把抽象概念变成一个小故事，读完故事你就懂了。**

**你可以直接复制：**

> "请用一个简短的寓言故事来解释[你想理解的概念]。要求：
> 1. 故事里不要直接出现这个术语
> 2. 故事讲完后，问我两个问题来检验我是否理解了
> 3. 最后告诉我这个概念在工作中最常见的应用场景"

比如你想理解"沉没成本"，AI 可能讲一个渔夫明知湖里没鱼了、但因为"都划了半天船了"不肯回家的故事。读完故事，概念就立住了。

![一个更完整的寓言 Prompt](/images/stage-2/fable-prompt-story.png)

<p class="figcaption">一个更讲究的寓言 Prompt 写法：连篇幅、世界观都提了要求，故事里始终不直接点破术语，生成质量更稳定。</p>

![AI 出的两道检验题](/images/stage-2/fable-prompt-quiz.png)

<p class="figcaption">故事讲完，AI 顺手出了两道检验题：一道考你是否理解了故事的安排，一道让你在自己的工作里找一个实例——答得上来，才算真懂了。</p>

这个方法特别适合：学新工具时不理解某个功能在说什么、开会时听到陌生术语、看行业报告时被概念卡住。

---

## 总结

四个技巧，一张卡片装下：

<div style="border:2px solid #cde0d4; border-radius:12px; padding:20px; background:#f6faf7; margin:18px 0;">
  <div style="font-weight:700; color:#2D5A3D; font-size:16px; margin-bottom:12px;">Prompt 进阶四招</div>
  <div style="font-size:14px; line-height:2.2; color:#33503c;">
    <strong>1. 说完整</strong> → 背景 + 目标 + 素材 + 约束 + 格式<br>
    <strong>2. 让它问</strong> → "先问我 5 个问题再动手"<br>
    <strong>3. 让它挑刺</strong> → 当反对者、预演失败、对抗式审查<br>
    <strong>4. 讲故事</strong> → 用寓言理解新概念 + 出题检验
  </div>
</div>
<p class="figcaption">掌握这四招，你和 AI 的关系就从"你说它做"升级成"它帮你想"。</p>

这四个技巧有一个共同点：**它们都不需要你懂技术，只需要你换一种方式跟 AI 说话。** 今天就挑一个试试。

---

## 再往前一步

当你开始习惯让 AI 追问、反驳、验证，你其实已经不再只是"写提示词"了，而是在设计一个**让 AI 反复思考和自我检查的循环**。

这个思路再往前走一步，就是 AI 领域现在讨论最多的话题之一：**Loop Engineering**。感兴趣可以接着看 →  [什么是 Loop Engineering](/stage-3/loop-engineering)

![从 Prompt 到 Loop 的演进](/images/stage-2/prompt-to-loop-evolution.png)

<p class="figcaption">业内已经在这么想了：图中 Claude Code 的作者说"我已经不写 Prompt 了，我的工作是写循环"。从单次提问到循环验证，AI 的使用方式还在快速进化。</p>

---

## 扩展阅读

- [《分享6个平时我最常用的Prompt心法》](https://mp.weixin.qq.com/s/a_-EMSjN0ldsrKCIk6nxuQ) · **数字生命卡兹克**（微信公众号）
- [《分享一个很实用的寓言故事prompt，5分钟帮你理解任何新概念》](https://mp.weixin.qq.com/s/L1ISA0FvxY_7OR994RttWw) · **数字生命卡兹克**（微信公众号）
- [《如何写出完美的Prompt（提示词）？》](https://mp.weixin.qq.com/s/sl2MuDpW9mawh2axLuGxNw) · **Li的碎碎念**（微信公众号）
- [《分享2个Vibe Coding必备的超实用Prompt》](https://mp.weixin.qq.com/s/umPqTD_-IubbhXIgiS47eQ) · **数字生命卡兹克**（微信公众号）
- [《最新！万字综述 Prompt 到 Loop 进化》](https://mp.weixin.qq.com/s/hcgKahtQRE2QqI6xplv2Rg) · **Datawhale**（微信公众号）
