---
title: Loop Engineering：从"盯着 AI 干活"到"让 AI 自己干完"
description: 循环工程实战指南——一个能自动运转的循环由哪几部分组成、怎么定目标、怎么装刹车，以及普通人从哪一步开始上手
---

# Loop Engineering：从"盯着 AI 干活"到"让 AI 自己干完"

先回忆一下你现在用 AI 干活的样子：让 AI 写个东西，它写完你看一眼；不对，你提修改意见；它改完，你再看；再提……**来回几轮，直到能用。**

这就是一个最原始的"循环"：行动、观察、修正、再行动。问题在于，这个循环里每一圈都靠你手动推动——**你就是那个发动机，你不踩，它就不走。**

**Loop Engineering（循环工程）做的事，就是把这些反复发生的动作写成规则，交给系统去执行**：你一次性定好目标、验收标准和出错怎么办，然后撒手。AI 自己做一轮、自己检查、不达标自己再来，直到达标，或者卡住了才喊你。

2026 年 6 月，Claude Code 的创始人 Boris Cherny 说："我不再手动给 Claude 写提示词了，我运行着能自动编排任务的循环，我的工作就是编写这些循环。"OpenClaw 创始人 Peter 说得更直接："你不该再给编程 Agent 写提示词了，你该设计循环来驱动你的 Agent。"

这篇文章不讲概念史，直接回答三个问题：**一个循环由什么组成？怎么上手？坑在哪？**

---

## 一个能跑的循环，必须回答五个问题

别被"工程"两个字吓到。一个循环能不能转起来，就看它有没有回答清楚这五个问题：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">问题</div><div style="flex:2;">对应大白话</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">① 什么时候开始干活？</div>
    <div style="flex:2; color:#444;">每天早上自动跑？还是出事了（比如有人提交了新内容）才跑？</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">② 能调用哪些工具？</div>
    <div style="flex:2; color:#444;">能读文件？能联网？能操作你的表格、邮箱、项目看板？</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">③ 怎么知道自己做错了？</div>
    <div style="flex:2; color:#444;">靠什么判断这一轮干得合不合格？测试、检查清单、还是另一个 AI 来复核？</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">④ 每一轮结果记在哪里？</div>
    <div style="flex:2; color:#444;">AI 每次开新对话都会失忆，进度、踩过的坑、已确认的结论得有个固定的地方存。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">⑤ 什么时候必须停下来喊人？</div>
    <div style="flex:2; color:#444;">花多少钱以内自己解决？连续失败几次就停手？哪些动作必须先经你批准？</div>
  </div>
</div>
<p class="figcaption">看出来了吗？循环工程更像一套"工作制度"：给 AI 设任务、设工具、设反馈、设记忆、设刹车。提示词只是这套制度里最小的一个零件。</p>

---

## 拆开看：五个零件 + 一本记事本

行业里（Google 的 Addy Osmani 最早系统梳理）把一个完整循环拆成五个零件加一个记忆本。行话很唬人，对应的东西其实很朴素：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">零件（行话）</div><div style="flex:2;">大白话</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">定时任务</div>
    <div style="flex:2; color:#444;"><b>循环的心跳。</b>每天几点自动开工，或者一有新动静就触发。没有它，AI 每次都得你手动踢一脚才动，那就不叫循环。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">工作区隔离（Worktree）</div>
    <div style="flex:2; color:#444;"><b>一人一张工位。</b>几个 AI 同时干活时各用各的独立空间，互不打扰，干完再合并——就像两个设计师不能同时改同一个图层。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">项目知识（Skill）</div>
    <div style="flex:2; color:#444;"><b>岗位手册。</b>把项目规范、踩过的坑、"上次就是这么出事的"写进文件，AI 每次开工先读，不用重新教。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">连接器（MCP）</div>
    <div style="flex:2; color:#444;"><b>门禁卡。</b>让 AI 能连上你的真实工作环境——文档、表格、邮箱、项目管理工具，从"发现问题"到"解决问题"再到"通知你"形成闭环。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">子 Agent</div>
    <div style="flex:2; color:#444;"><b>干活的和检查的分开。</b>写方案的那个 AI 不能自己给自己打分——学生批自己的考卷一定放水。让另一个 AI（甚至另一个模型）专门挑刺。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#f6faf7;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">＋ 记事本（状态文件）</div>
    <div style="flex:2; color:#444;"><b>循环的记忆。</b>一份固定的文档或表格，记下已确认的结论、踩过的坑、上次没解决的问题。AI 每次启动先读它，接着往下走，而不是从零开始。</div>
  </div>
</div>
<p class="figcaption">好消息是：这些零件不需要你自己搭。Claude Code、Codex 这类工具已经把定时任务、/goal（追求目标）、/loop、子 Agent 做成了内置功能，你要做的是理解它们、组合它们。</p>

其中"记事本"值得单独说一句。没有它，循环就是每天重新招一个失忆的新员工：昨天确认过的事实今天再查一遍，上周否掉的风格这周又生成出来。**循环跑得越久，这本记事本越值钱。**

---

## 灵魂：定义目标的能力

零件都是现成的，真正拉开差距的是一件事：**你能不能把目标定义清楚。**

拿 Claude Code 和 Codex 里的 /goal 功能举例：你给它一个完成条件，它就一轮一轮自己干，干完每轮检查条件满没满足。用法看起来很简单，但效果完全取决于你写的那个条件。对比两个目标：

> **目标 A**："把这个应用优化一下。"

> **目标 B**："XX 目录下所有测试通过，类型检查零报错，代码规范检查零违规。"

目标 A 会发生什么？AI 不知道什么叫"优化好了"——可能改一点就自己觉得还行、停了；也可能不停，一直改，把你的东西改得面目全非，**因为它始终无法判断自己什么时候算完成。**

目标 B 呢？每改一轮，跑三个检查，三个都有明确的通过标准：全过就停，没过就继续。清清楚楚，干干净净。

**同一个工具，同一个模型，区别只在于目标定义得好不好。** 这跟带团队是同一套逻辑：你跟员工说"把这个功能做好"，他做出来的大概率不是你想要的，因为你脑子里的"好"跟他脑子里的不是一个东西；你说"响应时间降到 200 毫秒以内、错误率低于 0.1%、下周三前上线"，偏差就小得多。管理学几十年就讲一件事：**把模糊的意图，翻译成一组可衡量、可验证的完成条件。**

一个实用的目标定义框架，四条：

1. **完成标准要可以被机器验证**——"测试全过"能验证，"体验更好"不能；
2. **边界条件要跟完成标准一起定**——不只说"要做到什么"，还要说"不能怎么做"；
3. **要有失败的降级方案**——连续失败几次怎么办？回退还是喊人？
4. **目标要分层**——大目标拆成阶段小目标，别让 AI 对着一个宏大目标空转。

---

## 最大的坑：你考核什么，它就只做什么

管理学和经济学里有个"古德哈特定律"：**一个指标一旦变成目标，它就不再是好指标。** 大白话：你考核什么，对方就只做什么，其他全退化。

这个坑在 AI 身上被放大了一百倍，因为 AI 钻规则空子比人更快、更彻底、更没有心理负担。真实的例子：你的循环条件是"测试全部通过"，AI 可能不去修问题，**直接把失败的测试删了**——从验证条件看，它"完成"了；从你真正想要的结果看，它啥也没干。

所以好的目标定义，不能只有"做完了的标准"，还必须有"不能怎么做"的边界。这也是为什么写循环时，要把边界条件和完成标准一起写进去（上面框架的第二条）。

跟边界同样重要的是**刹车**。一套正经的循环会提前约定好六件事，行话叫"循环协议"（Loop Contract）：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">约定项</div><div style="flex:2;">举个例子</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">触发</div><div style="flex:2; color:#444;">每 15 分钟 / 每天早上 8 点 / 一有新提交</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">范围</div><div style="flex:2; color:#444;">只管这一个项目、这一类文件，别的不许碰</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">动作</div><div style="flex:2; color:#444;">读新内容 → 分类 → 写摘要 → 存进记事本</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">预算</div><div style="flex:2; color:#444;">单次最多花多少 token / 多少钱 / 多长时间，超了就停</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">停止</div><div style="flex:2; color:#444;">目标达成就停；连续失败 3 次也停</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">上报</div><div style="flex:2; color:#444;">出异常时，到哪里找你（邮件 / 群消息 / 文档留言）</div>
  </div>
</div>
<p class="figcaption">没有预算和停止条件的循环，就是一辆没有刹车的车——它可能半夜空转 50 次，把你的额度烧光，你早上起来才发现。</p>

---

## 普通人怎么上手：先判断，再从"只读"开始

### 第一步：先判断这件事值不值得循环

循环不是免费的，它把成本从"你一轮轮盯着"的时间，换成了"系统一轮轮运行"的额度。三件事都满足，才值得上循环：

- **任务反复出现**——每周、每天都要做。一次性的活，一句好 Prompt 又快又便宜；
- **结果能被检查**——有明确的判断标准，AI 不在场也能拦住烂活；
- **关键判断还在你手里**——AI 负责跑腿和初稿，拍板的还是你。

### 第二步：按成熟度三级往上爬，别一步登天

<div style="margin:18px 0;">
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7;">
    <strong style="color:#2D5A3D;">L1 · 只报告，不动手</strong>　<span style="font-size:14px; color:#444;">让 AI 定时把情况摸一遍，写成报告给你看，<b>不改任何东西</b>。风险最低，最适合新手摸清循环的脾气。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7;">
    <strong style="color:#2D5A3D;">L2 · 小范围自动改，人来审</strong>　<span style="font-size:14px; color:#444;">允许 AI 在有验证手段的范围内自动处理，但结果必须经你过目才生效。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7;">
    <strong style="color:#2D5A3D;">L3 · 全自动长时间运行</strong>　<span style="font-size:14px; color:#444;">前提是前两级跑稳了、刹车装好了、验证手段可靠了。到这一级，你睡觉它干活。</span>
  </div>
</div>
<p class="figcaption">老手和新手的区别，不是谁敢直接上 L3，而是谁都知道该从 L1 爬起。</p>

### 第三步：用现成功能，不从零搭

如果你在用 Claude Code 或 Codex 这类工具，不用写任何代码就能开始：

- **/goal（追求目标）**：给一个可验证的完成条件，AI 自己一轮轮干到达标——这是循环最微观的形态；
- **定时任务 / /loop**：设定频率，让 AI 到点自动执行一段任务；
- **现成的工作流模板**：开源社区已经有成套的循环框架，内置"每日巡检、PR 看管、依赖扫描、起草更新日志"等七八套工作流，一行命令初始化，还附带成本估算工具——先估 token 花多少，再决定跑不跑。

---

## 不写代码，循环能干什么

循环工程最早在编程圈火起来，是因为代码有天然的验收手段：测试过没过、程序跑不跑得起来。但只要符合"反复出现、流程稳定、结果可检查"这三个特征，日常工作处处可循环：

- **内容工作**：每天早上自动扫指定的信息源，挑出 5 个候选选题，补好来源、关键人物、争议点，整理成选题卡放在你面前；
- **客服/行政**：自动读来信，判断问题类型，整理好历史记录和回复草稿，敏感的留给人工；
- **产品/运营**：每周自动汇总用户反馈、应用商店评论、竞品更新，和上周的判断放在一起对照；
- **研究学习**：追踪一个主题下的新报告、新数据，定期更新到你的记事本里。

吴恩达把做产品拆成了三层循环，恰好说明了人的位置在哪：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="padding:12px 16px; border-bottom:1px solid #e8efe9; font-size:14px;">
    <strong style="color:#2D5A3D;">最内层 · AI 干活循环</strong>（几分钟一圈）　<span style="color:#444;">AI 自己写、自己测、自己改，直到没有 bug。</span>
  </div>
  <div style="padding:12px 16px; border-bottom:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <strong style="color:#2D5A3D;">中间层 · 你的反馈循环</strong>（几小时一圈）　<span style="color:#444;">你定期看效果、给反馈，决定"该做成什么样"。</span>
  </div>
  <div style="padding:12px 16px; font-size:14px;">
    <strong style="color:#2D5A3D;">最外层 · 用户反馈循环</strong>（几天几周一圈）　<span style="color:#444;">交给真实用户，用数据验证"这东西值不值得继续做"。</span>
  </div>
</div>
<p class="figcaption">AI 负责把东西快速做出来，你负责决定该做什么，用户负责证明它值不值得。循环不会让人退出——关于用户和产品的经验（也就是"品味"），反而是你越循环越值钱的护城河。</p>

---

## 总结

<div style="border:2px solid #cde0d4; border-radius:12px; padding:20px; background:#f6faf7; margin:18px 0;">
  <div style="font-weight:700; color:#2D5A3D; font-size:16px; margin-bottom:12px;">循环工程上手清单</div>
  <div style="font-size:14px; line-height:2.2; color:#33503c;">
    <strong>五个问题</strong> → 何时开工、用什么工具、怎么算错、记在哪、何时喊人<br>
    <strong>五件套</strong> → 定时任务 + 独立工位 + 岗位手册 + 门禁卡 + 检查者，外加一本记事本<br>
    <strong>定目标</strong> → 可机器验证 + 边界条件 + 降级方案 + 分层<br>
    <strong>装刹车</strong> → 触发、范围、动作、预算、停止、上报，六件事提前约定<br>
    <strong>上手路径</strong> → 先判断值不值得 → L1 只读 → L2 人审 → L3 自动
  </div>
</div>
<p class="figcaption">一句话：以前你的工作是把 AI 的每一步盯完，以后你的工作是定好目标和验收，让系统替你盯。</p>

---

## 扩展阅读

- [《Prompt该退环境了，未来属于Loop Engineering。》](https://mp.weixin.qq.com/s/omwt7d9BSFX7kotW9vo9bQ) · **数字生命卡兹克**（微信公众号）——"定义目标"和古德哈特定律部分的出处。
- [《提示词过时了？AI 最新的玩法是「无限流」》](https://mp.weixin.qq.com/s/8RplW8IcFxMXcOrgUMxDqw) · **爱范儿**（微信公众号）——"五个问题"框架、token 成本账和非编程场景的出处。
- [《傻瓜式Loop教程来了：一行命令直接上手，GitHub狂揽4.5k Star》](https://mp.weixin.qq.com/s/EolKWeKXRi1EQS65uSYRYg) · **量子位**（微信公众号）——L1→L2→L3 成熟度路径、现成工作流和吴恩达三层循环的出处。
- [《最新！万字综述 Prompt 到 Loop 进化》](https://mp.weixin.qq.com/s/hcgKahtQRE2QqI6xplv2Rg) · **Datawhale**（微信公众号）——循环协议六要素和技术演进脉络的深度综述，适合想钻进去的读者。
