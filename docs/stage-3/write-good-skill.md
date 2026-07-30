---
title: 如何写好一个 Skill：把你的经验变成 AI 的岗位手册
description: Skill 不是大号 Prompt，而是一套让 AI 按你的标准干活的"SOP 作业系统"。这篇讲清什么时候该写、怎么写、怎么迭代
---

# 如何写好一个 Skill：把你的经验变成 AI 的岗位手册

你肯定遇到过这种时刻：好不容易把 AI 调教满意了——周报就该这么写、竞品分析就该按这个结构——结果关掉对话框，下次打开，一切从零开始。

**Skill 解决的就是这件事：把你的经验、流程和标准一次性写下来，让 AI 永远记住，次次照做。**

这篇不聊概念科普，直接讲方法论：什么时候值得写、怎么写出一个能稳定干活的 Skill、怎么把它越养越好。

---

## 先搞清楚：Skill 和 Prompt 有什么区别

想象你开了一家公司，AI 是你招来的新员工：

<div style="display:flex; gap:14px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:220px; border:1px solid #dde7e0; border-radius:12px; padding:16px; background:#fbfcfb;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">Prompt＝口头指令</div>
    <div style="font-size:14px; line-height:1.8; color:#444;">你当面跟他说的话："帮我写个方案""语气正式一点"。说完就散了，关了对话框他就失忆，下次来还是一张白纸。</div>
  </div>
  <div style="flex:1; min-width:220px; border:2px solid #cde0d4; border-radius:12px; padding:16px; background:#f6faf7;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">Skill＝岗位手册</div>
    <div style="font-size:14px; line-height:1.8; color:#444;">你写给他的工作手册：工作流程、输出模板、质量标准、参考案例都在里面。他不用每次问你，翻手册就会干活——而且这本手册可以传给下一个"新员工"。</div>
  </div>
</div>
<p class="figcaption">至于常和 Skill 一起出现的 MCP，可以简单理解成"门禁卡"：给 AI 开通连接数据库、文件、外部系统的权限。一个管"怎么干活"，一个管"能进哪些门"。</p>

除了"能沉淀"，Skill 还有两个 Prompt 做不到的本事：

- **AI 自己会判断什么时候用。** 你把多个 Skill 装好，AI 干活时会先扫一遍每本手册的"封面简介"，自己判断当前任务该翻哪一本。而 Prompt 只能靠你每次手动粘贴。
- **能装下更复杂的流程。** 一个 Skill 除了主流程文档，还能附带参考规则、检查清单、脚本和素材库，AI 在不同阶段调用不同的内容。Prompt 则要把所有东西一次性塞进去，内容一多，AI 反而抓不住重点。

所以别把 Skill 理解成"大号 Prompt"。**它是一套让 AI 按你的 SOP 稳定作业的系统。**

---

## 什么时候值得写？记住"三次原则"

不是每件事都配拥有一个 Skill。判断标准就一条：

> **同一件事，你重复做了三次，就该把它固化成 Skill。**

写周报、整理会议纪要、做竞品分析、把客户反馈提炼成需求清单……这些流程稳定、反复出现、结果好坏你一眼能判断的活，都是好候选。

反过来说，两类情况先别写：

- **一次性、偶发的任务。** 一句好 Prompt 又快又便宜，写 Skill 是杀鸡用牛刀。
- **你自己都不懂的领域。** 这点后面细说，是个真实的坑。

---

## 核心方法论：先跑通，再复盘，再封装，再回溯

写 Skill 最反直觉、也最重要的一条经验是：**不要一上来就"设计"Skill。**

很多人（包括写过很多 Prompt 的老手）的第一反应是：先想清楚目标和流程，设计一版完美的 Skill，再拿去测试。这条路在 Skill 上行不通——因为现在的 AI 干活不再是简单对话，中间会掺杂读文件、调工具、多步执行，**很多流程你坐在那是想不全的，只有真跑一遍才知道长什么样。**

正确的路径是四步：

<div style="margin:18px 0;">
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7;">
    <strong style="color:#2D5A3D;">① 跑通</strong>　<span style="font-size:14px; color:#444;">先和 AI 定好目标，在真实场景里拿到一个你认可的结果。不求完美，先求"这一回干得不错"。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7;">
    <strong style="color:#2D5A3D;">② 复盘</strong>　<span style="font-size:14px; color:#444;">和 AI 一起回顾这次是怎么跑出来的：哪些步骤是有效的、哪些是弯路、哪些判断标准值得留下来。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7;">
    <strong style="color:#2D5A3D;">③ 封装</strong>　<span style="font-size:14px; color:#444;">让 AI 基于复盘结果，把这次的成功经验写成 Skill。从真实跑通的过程里提炼的流程，远比凭空设计的好用。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7;">
    <strong style="color:#2D5A3D;">④ 回溯</strong>　<span style="font-size:14px; color:#444;">开一个新对话，只给目标不给提示，看 Skill 能不能稳定复现类似结果。不稳定就找到断在哪一步，回去改。</span>
  </div>
</div>
<p class="figcaption">一句话：不是"先设计再验证"，而是"先跑通再沉淀"。试错成本最低，效果也最好。</p>

---

## Skill 的结构：AI 是怎么"读"它的

写好 Skill 的前提是知道 AI 怎么加载它。它不是一上来把整本手册背下来，而是**分三层，按需翻阅**：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">层级</div><div style="flex:1;">是什么</div><div style="flex:2;">写作要点</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">① 封面简介</div>
    <div style="flex:1; color:#444;">名称 + 描述（description）</div>
    <div style="flex:2; color:#777;">AI 每次都会扫这一层来决定用不用你。描述必须写清"<b>什么场景该用</b>"，写太泛会被误调用。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">② 主流程</div>
    <div style="flex:1; color:#444;">SKILL.md 正文</div>
    <div style="flex:2; color:#777;">AI 决定调用后才翻开。写清：干什么、适合什么场景、整体作业流程、最后输出什么。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">③ 参考资料</div>
    <div style="flex:1; color:#444;">附带的规则文档、脚本、素材库</div>
    <div style="flex:2; color:#777;">干到具体哪一步才加载哪部分。用来补充主流程，不是堆得越多越好。</div>
  </div>
</div>
<p class="figcaption">最简单的 Skill 只需要一个 SKILL.md 文件，几十行文字就够。复杂 Skill 才需要参考资料层。</p>

第一层最容易被忽视，也最容易出问题。举个真实例子：你同时装了"网页设计 Skill"和"App 设计 Skill"，如果两者的描述都只写"做设计"，AI 在做 App 时可能误翻网页设计的手册。**描述写得越像"使用说明书上的适应症"，AI 调用越准。**

> ❌ 差的描述："帮助用户做设计。"
>
> ✅ 好的描述："当用户需要把需求整理成结构化 PRD（补全背景、目标、功能范围和验收标准）时使用。"

---

## 写好 Skill 的三条关键技巧

### 技巧一：一个 Skill 只管一件事

做着做着最容易犯的毛病是贪：既然这个 Skill 能分析，那要不再加个写作功能？再加个查错功能？

打住。有一位写了上百个 Skill 的作者分享过他的教训：他做了一个"多视角深度分析 Skill"，后来想让它顺手把设计和查错也干了。权衡之后他放弃了——**这个 Skill 的初衷是"思维复制分析"，加了别的就走形了。** 他的解法是另开"设计 Skill"和"查错 Skill"，让每个 Skill 对应一个明确的场景。

Skill 一旦变成万能工具，描述就没法写准，AI 调用会乱，主流程也会臃肿。**边界清晰，是 Skill 好用的前提。**

### 技巧二：写给模型看，不是写给人看

这是 2026 年一项研究（EvoMap 团队 × 清华）给出的硬结论，很反直觉：**包罗万象的详细文档，不等于高质量的 Skill。**

研究者把同一份经验分别打成两种形态喂给模型：一份是约 2500 token、带概述/流程/注意事项/案例的"完整文档式 Skill"，一份是约 230 token、只含关键词+策略+禁令的紧凑对象。跑了 4590 次受控实验，结果是：

- 完整文档式 Skill 的效果**反而低于不给任何指导**——尤其在强模型上，长篇大论把模型自己的判断力都压住了；
- 拆开看，整份文档里**真正起作用的只有"工作流程"那一段**，而写在最前面的"概述"是全文最大的负贡献；
- 紧凑对象稳定取胜——**决定模型行为的不是信息量，而是"控制密度"。**

给人看的东西（背景介绍、完整叙述、客套的概述）塞进模型的工作预算里，只会稀释重点。对模型真正有用的经验长这样：

> **策略**：做这件事按哪几步来；
> **禁令（AVOID）**：绝不能怎么做——比如"AVOID：不要改动 XX 文件""AVOID：输出不要超过 500 字"。

所以写 Skill 时：**主流程写清楚步骤，踩过的坑写成一条条"不要做什么"的禁令，概述和背景能砍就砍。** 研究还发现，失败经验最有用的沉淀形态不是长篇复盘日志，而是蒸馏成一句句独立的"AVOID xxx"。

### 技巧三：流程里写清"输出标准"

AI 干活同样需要验收标准。主流程的最后，明确写清：合格的输出长什么样、包含哪几部分、什么格式、多少篇幅。你不写，它就按"平均水准"交差；你写了，它每次都能对齐你的口味——这正是 Skill 比 Prompt 值钱的地方。

---

## 一个最小 Skill 长什么样

一个能用的 Skill，最少只需要一个文件，核心就三块：

```markdown
# 周报整理 Skill

## 什么时候用
当用户需要把一周的零散记录整理成周报时使用。

## 工作流程
1. 先读用户提供的一周记录，按"项目"归类；
2. 每个项目提炼：本周进展、遇到的问题、下周计划；
3. 拿不准归类的内容，列出来问用户，不要自己猜。

## 输出标准
- 按"项目"分节，每节不超过 5 行；
- 问题用【阻塞】【风险】【关注】三档标注；
- 全文不超过 400 字，口语化，不要形容词堆砌。

## 禁令
- AVOID：编造记录里没有的数据和结论；
- AVOID：输出"本周工作较为充实"这类空话。
```

写完之后按前面说的第四步做回溯：开个新对话，丢给它一周真实记录，看输出稳不稳。

---

## 像养产品一样养 Skill

没有人生下来就能写出一百分的 Skill，也没有必要。好用的 Skill 都是迭代出来的，那位作者的做 PPT Skill 就是这么长的：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; padding:11px 14px; font-size:14px; background:#eef5f0; font-weight:700; color:#2D5A3D;">
    <div style="width:64px;">版本</div><div style="flex:1;">解决的问题</div><div style="flex:1;">效果</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="width:64px; color:#2D5A3D; font-weight:600;">1.0</div><div style="flex:1; color:#444;">AI 能不能做出来</div><div style="flex:1; color:#777;">60 分，能用但糙</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="width:64px; color:#2D5A3D; font-weight:600;">2.0</div><div style="flex:1; color:#444;">样式太单调</div><div style="flex:1; color:#777;">增加模板和参考样式，65 分</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="width:64px; color:#2D5A3D; font-weight:600;">3.0</div><div style="flex:1; color:#444;">只会套模板</div><div style="flex:1; color:#777;">引入设计逻辑，能按内容做适配</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="width:64px; color:#2D5A3D; font-weight:600;">4.0</div><div style="flex:1; color:#444;">人要盯的环节太多</div><div style="flex:1; color:#777;">优化整体流程，AI 更自主</div>
  </div>
</div>
<p class="figcaption">每个版本只解决当下最明显的一个问题。这跟做产品的逻辑一模一样：先跑起来，再一轮一轮改。</p>

每次迭代前问自己两个问题：**这个 Skill 到底要解决什么问题（别做过界了）？当前最差的点是什么（这次就改它）？**

---

## 一个真实的劝退案例：你不懂的领域，别硬写

最后说个坑。那位作者曾花半个月想做一个"六爻占卜 Skill"——看起来特别适合 Skill 化：有规则、有流程、有资料。最后他放弃了。

原因不是 AI 写不出内容，而是**他自己不懂解卦，AI 也不真懂，俩加在一起，没人能判断产出对不对**。没有验收能力，Skill 就没法回溯、没法迭代，打磨再久也是白搭。

这条教训值得记住：**写 Skill 到最后，考验的不是语法、不是提示词能力，而是你能不能把一件事 SOP 化——而这首先要求你自己搞得清这件事"怎样算做好"。** 你不熟悉的领域不是绝对不能做，但你必须先建立一套验证手段（比如让 AI 设计可自动检查的测试），否则写出来的只是心理安慰。

---

## 总结

<div style="border:2px solid #cde0d4; border-radius:12px; padding:20px; background:#f6faf7; margin:18px 0;">
  <div style="font-weight:700; color:#2D5A3D; font-size:16px; margin-bottom:12px;">写好 Skill 的七条军规</div>
  <div style="font-size:14px; line-height:2.2; color:#33503c;">
    <strong>1.</strong> 重复三次的事，才值得写成 Skill<br>
    <strong>2.</strong> 先跑通、再复盘、再封装、再回溯，不要凭空设计<br>
    <strong>3.</strong> 描述写清"什么场景该用"，这是 AI 调用的唯一依据<br>
    <strong>4.</strong> 一个 Skill 只管一件事，贪多就走形<br>
    <strong>5.</strong> 写给模型看：流程 + 策略 + 禁令（AVOID），概述能砍就砍<br>
    <strong>6.</strong> 主流程末尾写清输出标准，AI 才知道什么叫"好"<br>
    <strong>7.</strong> 每版只改一个最明显的问题；你不懂的领域别硬写
  </div>
</div>
<p class="figcaption">Skill 的本质，是把"只存在于你脑子里的经验"变成"AI 可以复用的流程"。写好第一个，你就会想写第二个。</p>

---

## 扩展阅读

- [《写了上百个Skill效率起飞后，我总结了一套Skill实操教程》](https://mp.weixin.qq.com/s/e5KKoD1T03OtSkt3BGDs_A) · **云舒的AI实践笔记**（微信公众号）——"跑通-复盘-封装-回溯"四步法、三层结构和迭代案例的出处。
- [《你写的Skill，正在拖慢模型？策略式Gene才是正确答案》](https://mp.weixin.qq.com/s/NCb4489oBtPCa-3xgxAicQ) · **机器之心**（微信公众号）——EvoMap × 清华的研究：为什么"写给模型看"比"写得完整"重要，控制密度和 AVOID 禁令的出处。
- [《一文带你看懂，火爆全网的Skills到底是个啥》](https://mp.weixin.qq.com/s/2IIPji15yflj1qCjze-f4A) · **爱 AI 的大刘**（微信公众号）——Skill／Prompt／MCP 三者关系的"岗位手册"类比出处，适合入门阅读。
