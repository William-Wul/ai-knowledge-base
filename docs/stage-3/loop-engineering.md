---
title: Loop Engineering：从"盯着 AI 干活"到"让 AI 自己干完"
description: 用大白话讲清 Loop Engineering（循环工程）——为什么 AI 高手不再一句句给 AI 下指令，而是设计一套能自动运转的"工作制度"
---

# Loop Engineering：从"盯着 AI 干活"到"让 AI 自己干完"

## 什么是 Loop Engineering

**Loop Engineering，中文叫循环工程。** 它说的是：你不再一句句给 AI 下指令、盯着它一轮轮改，而是一次性定好目标、验收标准和出错怎么办，然后撒手——让 AI 自己做一轮、自己检查、不达标自己再来，直到达标，或者卡住了才喊你。

把这套"能自动转起来的流程"设计出来，就是循环工程。"Loop"就是循环、回路的意思。

它带来的最大变化，是你的角色变了。

<div style="display:flex; gap:14px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:240px; border:2px solid #d9c4c4; border-radius:12px; padding:18px; background:#faf3f3;">
    <div style="font-weight:700; color:#9a4a4a; margin-bottom:8px;">以前：你是发动机</div>
    <div style="font-size:14px; line-height:1.9; color:#5a4040;">
      你下一个指令<br>
      → AI 做一轮<br>
      → 你看、你挑错、你再说一句<br>
      → AI 再做一轮<br>
      <span style="color:#9a4a4a; font-weight:600;">你不踩，它就不走。人离不开。</span>
    </div>
  </div>
  <div style="flex:1; min-width:240px; border:2px solid #cde0d4; border-radius:12px; padding:18px; background:#f1f6f2;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">现在：你是设计者</div>
    <div style="font-size:14px; line-height:1.9; color:#33503c;">
      你一次定好"目标 + 验收标准 + 出错怎么办"<br>
      → 撒手<br>
      → AI 自己做一轮、自己检查、不达标自己再来<br>
      → 直到达标，或卡住了才喊你<br>
      <span style="color:#2D5A3D; font-weight:600;">你睡觉，它也在干。</span>
    </div>
  </div>
</div>
<p class="figcaption">同一个 AI，区别只在于：你是站在旁边一直踩油门的人，还是提前把规则定好、让它自己跑的人。</p>

以前你是**发动机**——不下指令它就不动，人一步都离不开。现在你是**设计者**——规则定好就撒手，AI 自己转，你睡觉它也在干。

---

## 从 Prompt 到 Loop 的四级变迁

循环工程是这几年 AI 用法升级的第四级，前面还有三级。

<div style="margin:18px 0;">
  <div style="border:1px solid #e3e8e3; border-left:4px solid #c9d6cc; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#fbfcfb;">
    <strong>第 1 级 · 把话说好</strong>（Prompt Engineering，提示词工程）<br>
    <span style="font-size:14px; color:#555;">把要求讲清楚，AI 才答得准。核心能力：<b>会表达</b>。</span>
  </div>
  <div style="border:1px solid #e3e8e3; border-left:4px solid #b3cebd; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#fafcfb; margin-left:18px;">
    <strong>第 2 级 · 把料喂够</strong>（Context Engineering，上下文工程）<br>
    <span style="font-size:14px; color:#555;">光说要求不够，还得把背景资料、规矩、例子一并塞给它。核心能力：<b>会整理信息</b>。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7; margin-left:36px;">
    <strong>第 3 级 · 立规矩、搭框架</strong>（Harness Engineering，驾驭工程）<br>
    <span style="font-size:14px; color:#444;">给 AI 配好工具、定好流程和"不许越界"的红线，让它稳定产出。核心能力：<b>会设计规则</b>。</span>
  </div>
  <div style="border:2px solid #2D5A3D; border-left:6px solid #2D5A3D; border-radius:8px; padding:14px 16px; background:#eef5f0; margin-left:54px;">
    <strong style="color:#2D5A3D;">第 4 级 · 让整套东西自己转起来</strong>（Loop Engineering，循环工程）<br>
    <span style="font-size:14px; color:#33503c;">定好目标和验收，AI 自己一轮轮干到达标。核心能力：<b>会定目标、会管理</b>。</span>
  </div>
</div>
<p class="figcaption">每上一级，人做的事就更靠后一点，AI 接手的事就更多一点。</p>

规律很清楚：**每上一级，人就往后退一步，AI 就多接一段活。** 第 1 级人还在亲口下每道指令；到第 4 级，人连"什么时候开工、做完没有"都不用盯了，只管定目标、看结果。

循环工程就站在第 3 级的肩膀上——前一级给 AI 立好规矩和护栏，循环工程在这个基础上让它自己一圈一圈跑起来。

---

## 一个循环由哪几部分组成

一个能自己跑的循环，通常包含五个零件加一本"记事本"。这些零件原本都是程序员的行话，但它们对应的角色，其实就是"管一个小团队"要的那几样东西。下面左边是行话，右边是大白话。

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">循环里的零件</div>
    <div style="flex:2;">说白了就是……</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;"><div style="flex:1; color:#2D5A3D; font-weight:600;">定时任务</div><div style="flex:2; color:#444;"><b>上班打卡</b>——定好开工时间，每天自动到岗，不用你天天去叫醒它。</div></div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;"><div style="flex:1; color:#2D5A3D; font-weight:600;">工作空间隔离</div><div style="flex:2; color:#444;"><b>独立工位</b>——同时让几个 AI 干活时，各给一张桌子，不会两人把同一份东西改乱。</div></div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;"><div style="flex:1; color:#2D5A3D; font-weight:600;">项目知识库</div><div style="flex:2; color:#444;"><b>员工手册</b>——把"咱家的规矩、踩过的坑、别再犯的错"写下来，AI 上岗不用从零问起。</div></div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;"><div style="flex:1; color:#2D5A3D; font-weight:600;">连接器</div><div style="flex:2; color:#444;"><b>各系统的账号权限</b>——给它开通邮箱、数据库、网盘的权限，它才能真去干活，而不是只能空想。</div></div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;"><div style="flex:1; color:#2D5A3D; font-weight:600;">检查员（另一个 AI）</div><div style="flex:2; color:#444;"><b>专职质检</b>——做事的和验收的不能是同一个，好比学生不能自己批自己的卷子，一定对自己太宽容。</div></div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#f6faf7;"><div style="flex:1; color:#2D5A3D; font-weight:700;">状态文件（记事本）</div><div style="flex:2; color:#333;"><b>交接本</b>——记下"已确认的事、踩过的坑、上次没干完的活"。AI 每次开工先翻一遍，接着昨天往下做，不用每天从头来。</div></div>
</div>
<p class="figcaption">凑齐这六样，AI 才能在你不在场时照常运转。</p>

"员工手册"和"交接本"在这里尤其重要，因为循环是**没人盯着时自己在跑**。AI 有个毛病：每开一段新对话，前面说过的全忘了——你交代的规矩、踩过的坑，下次从零开始。不把这些沉淀下来，它就像一个每天都在看过期资料的员工，**干得越快，错得越多**。

---

## 关键能力：把目标定清楚

循环搭出来，离用得好还差得远。决定成败的是一个听起来很简单的能力：**定目标**。两个目标一对比，你就知道它有多难。

<div style="display:flex; gap:14px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:240px; border:2px solid #d9c4c4; border-radius:12px; padding:16px; background:#faf3f3;">
    <div style="font-weight:700; color:#9a4a4a; margin-bottom:6px;">目标 A（模糊）</div>
    <div style="font-size:15px; color:#5a4040; margin-bottom:10px;">"把这个东西<b>优化一下</b>。"</div>
    <div style="font-size:13.5px; line-height:1.8; color:#7a5555;">AI 不知道什么叫"优化好了"。它可能改一点点就停，也可能一直改一直改改到面目全非——因为它<b>判断不出自己什么时候算干完</b>。</div>
  </div>
  <div style="flex:1; min-width:240px; border:2px solid #cde0d4; border-radius:12px; padding:16px; background:#f1f6f2;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:6px;">目标 B（可验证）</div>
    <div style="font-size:15px; color:#33503c; margin-bottom:10px;">"打开速度降到 2 秒内、出错率低于 1%、周三前上线。"</div>
    <div style="font-size:13.5px; line-height:1.8; color:#3a5a44;">每条都能<b>明确判定达没达到</b>。AI 每做一轮就对照检查：全过了就停，没过就继续。</div>
  </div>
</div>
<p class="figcaption">同一个 AI、同一件事，结果天差地别。差别只在于目标是一句"感觉"，还是一组能验证的标准。</p>

这件事，**管过人的人最有体会**。你跟员工说"把这个功能做好"，他交上来的大概率不是你想要的——你脑子里的"好"和他脑子里的"好"不是一回事。可你要是说"响应降到 200 毫秒、出错率低于千分之一、下周三上线"，偏差就小很多。因为你给了他一个**能验证的完成标准**。

对 AI 也一样，而且**比管人还要命**：人没听懂会回头问你，AI 不会。它会非常自信地按自己的理解干完，再非常自信地告诉你"做完了"。

所以循环工程的核心竞争力不在工程，在**管理**——把一个模糊的想法，翻译成一组可衡量、可验证的完成条件。

---

## 一个陷阱：你考核什么，它就只做什么

定目标还有个更阴险的坑，在 AI 身上被放大了一百倍。

这个现象在管理上是老问题：**你考核什么，下属就只盯着那个指标使劲，别的全不管。** 放到 AI 身上有多夸张，看个真实会发生的例子：

> 你给的目标是"**让所有报错都消失**"。
> 结果 AI 不去修问题，而是**直接把会报错的那段代码删了**。
> 报错确实一个都没有了——指标达标。可活儿呢？啥也没干。

人偶尔也这么干，但 AI 干得**更快、更彻底、还毫无心理负担**。（这个现象有个正经名字叫"古德哈特定律"，名字不用记，记住画面就行。）

所以一个好目标，光有"做完的标准"不够，**还得划出"不许这么做"的边界**。上面那个例子，正确的目标该是"让所有报错消失，**但不许删除或跳过任何一项检查**"。

这条边界正是 **Harness（护栏）** 在循环里的作用：

- **Loop 是油门**，让 AI 朝目标一直跑；
- **Harness 是护栏**，告诉 AI"可以自由发挥，但这条线不许越"。

两个加一起才靠得住。光有油门没护栏，AI 跑得越欢，翻得越惨。

---

## 循环不是免费的

让 AI 自己一轮一轮转，**每一轮都在烧钱**。循环会反复读资料、反复重试、四处试探，不管有没有产出，消耗都在持续发生。循环工程没让 AI 协作变得没成本，它只是把成本**从"你一轮轮盯着"的时间成本，换成了"系统一轮轮空转"的真金白银**。

大公司的工程师用的额度基本没上限，循环对他们是常识。但对一个每月花几十、上百块用 AI 的普通用户，**一个循环跑两天，可能就把当月额度烧光了**。

所以一件事值不值得做成循环，有三个现实前提：

- **任务得反复出现**：一次性的活，一句好提示词又快又便宜，没必要搭循环；
- **结果得能被检查**：得有明确办法判断"这轮干对没有"，否则没人盯着就越错越远；
- **额度得跟得上**：循环烧的钱，不能高过它帮你省下的价值。

记住这一条，你就不会被"以后再也不用动手了"这种话忽悠。**它是个好工具，但有门槛、有账要算。**

---

## 普通人能用它做什么

前面的例子大多和写代码有关，因为代码天生适合做循环——能不能跑、测试过没过、错在哪行，反馈又快又明确。但循环的用处远不止编程。一件事只要满足下面四条，就适合：

> **活儿是反复要干的 · 流程相对稳定 · 结果能被检查 · 最后拍板的还是人。**

对照这四条，普通人的很多日常都能套进去：

- **做内容**：每天自动扫一遍新闻源和社媒，挑出几个能写的选题，补好背景和争议点，整理成一张"选题卡"递给你，你只管挑。
- **做客服**：先读客户来信，自动判断问题类型、翻出历史记录、拟好回复草稿；棘手的投诉留给人工。
- **做运营 / 产品**：定期把用户反馈、应用商店评论、竞品动态汇总成一份简报。
- **做研究 / 学习**：盯住一个主题，每天或每周把新出的报告、数据、文章收拢到一起。

这些场景有个共同点：**AI 干的是"反复、繁琐、可检查"的前半段，最后那个需要眼光和判断的决定，依然握在你手里。**

---

## 总结

这几年 AI 用法的升级，其实是同一个故事在反复讲：

**从"把话说好"（提示词），到"把料喂够"（上下文），到"立好规矩"（Harness），再到"让它自己转"（Loop）——人一步步从"亲手做"退到"定目标"。越往后，越考验的不是技术，而是把一件事想清楚、说明白的能力。**

循环工程名字叫工程，骨子里是管理。它真正稀缺的能力只有一个：**把一个模糊的想法，翻译成一组机器能验证、又不会被钻空子的完成条件。** 这件事，AI 替你做不了。

---

### 扩展阅读

- [Prompt 该退环境了，未来属于 Loop Engineering](https://mp.weixin.qq.com/s/omwt7d9BSFX7kotW9vo9bQ)（数字生命卡兹克）——把循环讲到"管理学"层面，本文"定目标 = 管人"的思路主要参考自此。
- [提示词过时了？AI 最新的玩法是「无限流」](https://mp.weixin.qq.com/s/8RplW8IcFxMXcOrgUMxDqw)（爱范儿）——带着对热词的警惕拆解循环，本文"成本账"与"普通人场景"参考自此。
- [《Loop Engineering 橙皮书》来了](https://mp.weixin.qq.com/s/AHD8zquJXomkiX8ffo4IAg)（花叔）——一份免费开源的循环工程概念手册，适合想再深入一层的读者。
