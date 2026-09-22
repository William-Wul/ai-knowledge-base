---
title: 只输出判断的模型"Jev" 玩法指南
description: Jev 不生成文字，只返回带置信度的判断。这篇讲它只输出哪三种东西、怎么把工作拆成判断题、四个可上手的玩法，以及什么场景不该用它。
---

# 只输出判断的模型"Jev" 玩法指南

TypeSafe 的判断模型 **Jev** 已经向所有人开放：注册即送 5 美元额度（约 1.2 亿 token），入口是 [console.typesafe.ai](https://console.typesafe.ai)。它跟常见的聊天模型不是一类东西：**不生成文字，只输出带置信度的判断**。你给它一段材料和一道预先定义好的问题，它返回一个选项、一个分数或一个是非概率。

这篇讲怎么把它玩起来：它只输出什么、怎么把工作拆成判断题、四个可上手的玩法，以及什么时候不该上它。

![TypeSafe 官方公告 Jev 向所有人开放](/images/stage-2/jev-play-guide/open-access.jpg)

<div class="figcaption">Jev 全面开放公告。注册后赠送的 5 美元额度，按公开定价（输入每百万 token 0.042 美元、输出免费）够做大量体验调用。（图源：TypeSafe AI 官方 X 账号）</div>

---

## 一、它只输出三种东西

**Jev 的输出被收成三种形态，全程不写一个字**。这是它跟聊天模型最大的差别，也是玩法的起点。

<div style="display:flex; gap:14px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:200px; border:2px solid #cde0d4; border-radius:12px; padding:18px; background:#f1f6f2;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">Choice · 选项</div>
    <div style="font-size:14px; line-height:1.9; color:#33503c;">从你列好的清单里挑一项，最多 255 个选项。<br>适合<b>分类、路由、动作选择</b>：交给技术还是账务？点按钮还是滚动？</div>
  </div>
  <div style="flex:1; min-width:200px; border:2px solid #cde0d4; border-radius:12px; padding:18px; background:#f1f6f2;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">Score · 打分</div>
    <div style="font-size:14px; line-height:1.9; color:#33503c;">在你划好的尺度上给一个分。<br>适合<b>紧迫程度、质量、风险</b>这类要排优先级的判断。</div>
  </div>
  <div style="flex:1; min-width:200px; border:2px solid #cde0d4; border-radius:12px; padding:18px; background:#f1f6f2;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">Noul · 是非概率</div>
    <div style="font-size:14px; line-height:1.9; color:#33503c;">回答一件事为真的概率，落在 0 到 1 之间。<br>适合<b>是否命中、是否可疑、是否相关</b>这类是非题。</div>
  </div>
</div>
<p class="figcaption">三种输出：挑一个、打个分、报个概率。问题和选项由你事先写死，模型只负责在划定范围内分配概率。</p>

![Choice、Score、Noul 三种输出形态示意](/images/stage-2/jev-play-guide/three-outputs.png)

<div class="figcaption">三种输出形态示意。每次回答都会附带完整概率分布和置信度。（图源：TypeSafe 公开资料）</div>

两个配套概念，后面玩法里会反复用到：

- **概率分布**：不只给最终选项，还给每个选项各占多少概率。程序可以直接读，不用再解析一段自然语言。
- **置信度**：模型对这次判断有多大把握的数字。官方训练目标是「校准」：报 0.9 的把握，实际正确率就要接近 90%。这是后面「置信度分流」玩法的前提。

因为选项是事先写死的，输出又带类型，所以格式上「想编也编不出来」：不会突然包一层 Markdown，也不会漏掉字段。注意这只保证**格式合法**，选项之内判断错仍然可能。

---

## 二、把工作拆成判断题

**玩法的核心不是调 API，而是把一件模糊的工作拆成几道封闭判断题**。拆得好，Jev 又快又便宜；拆不好，它会把你的含糊放大。

用一条客服消息示范：用户说「支付服务连不上，已经影响生意」。人看一眼会同时想好几件事，拆成判断题就是：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">判断题</div><div style="flex:1;">输出形态</div><div style="flex:2;">选项示例</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">该交给谁？</div>
    <div style="flex:1;">Choice</div>
    <div style="flex:2; color:#444;">技术 / 账务 / 客服 / 其他</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">有多不满？</div>
    <div style="flex:1;">Score</div>
    <div style="flex:2; color:#444;">1（平静）到 5（非常不满）</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">是否紧急？</div>
    <div style="flex:1;">Noul</div>
    <div style="flex:2; color:#444;">为真的概率：这算不算需要立刻处理</div>
  </div>
</div>
<p class="figcaption">同一段材料可以一次读入，多道题并行评估：分工、情绪、紧急程度可以在同一请求里出结果。</p>

拆题时守住四条，判断质量会稳很多：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">怎么拆</div><div style="flex:2;">为什么</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">选项写死，互不重叠</div>
    <div style="flex:2; color:#444;">模型只在你给的范围内分配概率。选项含糊或互相包含，它只能含糊地选。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">一题只问一件事</div>
    <div style="flex:2; color:#444;">「是否紧急且是否投诉」这种复合题，答错时不知道该怪哪一半。拆开问，结果可以分别用。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">能并行就并行</div>
    <div style="flex:2; color:#444;">同一次请求里塞多道题，它们共享同一份输入、并行出结果。速度和成本优势主要从这里来。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">题干写清判定标准</div>
    <div style="flex:2; color:#444;">选项旁边写上「什么情况算这一项」。你心里的标准不落到题面上，模型只能猜。</div>
  </div>
</div>
<p class="figcaption">拆题四条：选项封闭、一题一事、并行提问、标准写清。</p>

下面这张是一次并行多问的输出：一份虚构新闻，同一请求里答完 7 道是非题和 2 道分类题。

![一条新闻的一次并行多问输出](/images/stage-2/jev-play-guide/parallel-questions.png)

<div class="figcaption">一次请求并行输出：是否 AI 相关 99%、是否广告 7%、是否融资 98%……分类题直接落到「语音与音频」「语音应用开发者」。程序读到的是可直接执行的结构化结果。</div>

---

## 三、四个上手玩法

### 玩法 1：批量筛选分类

**把「这条要不要看 / 归到哪一类」做成高频小判断**。信息流过滤、邮件分流、工单归类、PR 初筛都是同一类活。

一个公开案例：有人做了 X（原 Twitter）时间线过滤插件，用自然语言设定不想看的内容类型（引战、币圈、纯情绪帖），Jev 对每条新帖判断一次「折叠还是展示」。调试面板显示中位检测耗时 380 毫秒。

![X 时间线过滤插件的 Jev 调试面板](/images/stage-2/jev-play-guide/x-filter-380ms.jpg)

<div class="figcaption">过滤插件的调试面板：中位检测 380 毫秒，最近一次判断结果是 Collapsed（折叠）。同一件事交给聊天模型，通常要等好几秒。</div>

成本上这类批量活也很轻。有案例用它筛小众信息流：读入过去三天帖子，一次问 8 个问题，整段跑完约 2 秒、单次约 0.007 美元，用来剔除诱饵内容和隐藏广告。

### 玩法 2：一次请求并行多问

**别一题一题排着问，把同一批判断塞进同一次请求**。这是跟聊天模型用法差别最大的地方。

同样 27 道题、同样顺序，并行评估和逐字生成的差距是数量级的：公开对比里 Jev 约 0.11 秒、成本约 0.00008 美元；聊天模型路径约 8.6 秒、成本约 0.014 美元，大约 75 倍速度差、170 倍成本差。

![同样 27 个问题的速度与成本对比](/images/stage-2/jev-play-guide/speed-cost-race.png)

<div class="figcaption">同样 27 个问题：左侧并行评估 0.114 秒完成，右侧自回归生成 8.566 秒完成。（图源：TypeSafe 公开对比）</div>

第三方延迟测量也支持这个量级：30 路分类任务上，Jev 中位决策 154 毫秒，第二名 860 毫秒。

![OpenRouter 30 路分类延迟对比](/images/stage-2/jev-play-guide/openrouter-latency.png)

<div class="figcaption">30 路分类、每模型 200 例的中位延迟：Jev 154 毫秒，其余模型 860 毫秒到 1.5 秒以上。（图源：Ori Eval / OpenRouter，2026 年 9 月）</div>

### 玩法 3：按置信度分流

**把「模型有多大把握」写进业务规则，让高置信自动走、低置信交给人**。这是判断模型真正能进工作流的关键一步。

<div style="margin:18px 0;">
  <div style="border:1px solid #e3e8e3; border-left:4px solid #c9d6cc; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#fbfcfb;">
    <strong>置信度 &gt; 0.90 · 自动执行</strong><br>
    <span style="font-size:14px; color:#555;">把握足够大，程序直接按结果动作：折叠、归类、放行。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7; margin-left:36px;">
    <strong>0.70 – 0.90 · 交给更强的模型复核</strong><br>
    <span style="font-size:14px; color:#444;">中等把握，丢给会写理由的大模型看一眼再定。省下大部分人工，又不把中等风险当确定。</span>
  </div>
  <div style="border:2px solid #2D5A3D; border-left:6px solid #2D5A3D; border-radius:8px; padding:14px 16px; background:#eef5f0; margin-left:54px;">
    <strong style="color:#2D5A3D;">置信度 &lt; 0.70 · 交给人</strong><br>
    <span style="font-size:14px; color:#33503c;">把握不足，人来拍板。阈值定多高由你定，但线要事先画好。</span>
  </div>
</div>
<p class="figcaption">置信度三段分流：自动、复核、人审。概率才有意义，自动化才敢往下走。</p>

### 玩法 4：给大模型当验收员

**大模型负责写和做，Jev 负责毫秒级打分验收**。分工比让一个模型包办更稳。

<div style="display:flex; gap:10px; align-items:stretch; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:150px; border:1px solid #dde7e0; border-radius:12px; padding:16px; background:#f6faf7; display:flex; flex-direction:column; justify-content:center;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:6px;">1 · 大模型干活</div>
    <div style="font-size:13px; color:#444; line-height:1.7;">写回复、改代码、出方案</div>
  </div>
  <div style="display:flex; align-items:center; color:#2D5A3D; font-weight:700;">→</div>
  <div style="flex:1; min-width:150px; border:1px solid #dde7e0; border-radius:12px; padding:16px; background:#f6faf7; display:flex; flex-direction:column; justify-content:center;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:6px;">2 · Jev 验收</div>
    <div style="font-size:13px; color:#444; line-height:1.7;">是否达标？风险几级？要不要重做？</div>
  </div>
  <div style="display:flex; align-items:center; color:#2D5A3D; font-weight:700;">→</div>
  <div style="flex:1; min-width:150px; border:2px solid #2D5A3D; border-radius:12px; padding:16px; background:#eef5f0; display:flex; flex-direction:column; justify-content:center;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:6px;">3 · 分流</div>
    <div style="font-size:13px; color:#33503c; line-height:1.7;">过了就用；不过就打回重做</div>
  </div>
</div>
<p class="figcaption">双核搭档：会写的和会判的分开，验收又快又便宜，不合格的自动打回。</p>

官方评测里也能看到这类可靠性主张：结构化输出错误率和工具调用错误率上，Jev 都是 0%。这不等于判断永远正确，但程序侧「收到非法值」这类故障会少很多。

从成本看，判断已经便宜到可以随手调：工作流平均成本图里，Jev 落在最左端，大约 0.0003 美元一次，准确率和贵出许多倍的前沿模型处于同一区间。核心竞争力不是「更准」，是**更快、更便宜、够用**。

![准确率与成本散点图](/images/stage-2/jev-play-guide/accuracy-cost.png)

<div class="figcaption">4 条工作流的平均准确率与单次成本（对数轴）：Jev 在最左侧，约 0.0003 美元一次、准确率约 68%。（图源：TypeSafe 公开评测）</div>

实时场景里差距更直观。同一局 Pong 演示中，Jev 一次决策约 227 毫秒，一局做出几十次按键判断；聊天模型路径要 2.5 到 3.5 秒才能给一次决策。

![Pong 演示中的决策延迟对比](/images/stage-2/jev-play-guide/pong-latency.jpg)

<div class="figcaption">同一局 Pong：Jev 单次决策约 227 毫秒，其余模型 3 到 8 秒量级。（图源：TypeSafe / Vercel 公开演示）</div>

---

## 四、什么时候不该用

**Jev 适合封闭判断，不适合开放生成和复杂推理**。用错位置，它的速度会把错误一起放大。

先看一个很能说明边界的实测。场景是两车道：左前方一只狗、右前方一位人。规则写成「安全第一」时，它选急刹车的概率是 94%。

![规则为安全第一时选急刹 94%](/images/stage-2/jev-play-guide/driving-94.png)

<div class="figcaption">Playground 实测：规则优先级为「安全第一」时，左狗右人场景选 hard_brake（急刹车）概率 94%。</div>

把规则改成「先到达、最后才是安全」，它**仍然**选急刹车，只是概率从 94% 降到 77%。说明它不是纯粹的规则执行器：内部仍有倾向，用户的优先级指令未必压得住。

![规则改为优先到达后仍选急刹 77%](/images/stage-2/jev-play-guide/driving-77.jpg)

<div class="figcaption">同一场景，规则改成「优先到达」后仍选 hard_brake，概率降到 77%。默认倾向会和你的指令抢方向盘。</div>

另一个公开翻车案例：有人把 Jev 放上「全权自动做市」的位置去判断币价涨跌，被假盘口和对抗性挂单带偏，杠杆下账户大幅回撤。**放错位置，快就是亏钱的加速器**。

<div style="display:flex; gap:14px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:240px; border:2px solid #cde0d4; border-radius:12px; padding:18px; background:#f1f6f2;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">适合：封闭判断</div>
    <div style="font-size:14px; line-height:1.9; color:#33503c;">选项有限、标准可写清<br>高频或有实时要求<br>结果要结构化、程序可直接执行<br>例：筛选、归类、打分、路由、验收</div>
  </div>
  <div style="flex:1; min-width:240px; border:2px solid #d9c4c4; border-radius:12px; padding:18px; background:#faf3f3;">
    <div style="font-weight:700; color:#9a4a4a; margin-bottom:8px;">不适合：开放生成</div>
    <div style="font-size:14px; line-height:1.9; color:#5a4040;">要写长文、要解释推理链<br>任务边界模糊、选项列不全<br>对抗环境或全权资金决策<br>例：写方案、复杂工具编排、自动交易</div>
  </div>
</div>
<p class="figcaption">先判断你的活是不是「有限解空间 + 高实时 + 结构化输出」，是再上 Jev。</p>

再补几条实测里反复出现的短板：它写不了文本，没有复杂推理能力，中文细粒度泛化偏弱；长程浏览器任务一类开放环境里，公开测试出现过 20 题只对 1 题的情况。需要逐步推导的数学也只有较早一代聊天模型的水平。

定价按公开口径：输入每百万 token 0.042 美元，输出免费。上下文窗口约 32k，定位就是「判断网关」，不是第二个全能聊天窗。

---

## 小结

- **先拆题，再调用**。选项封闭、一题一事、标准写清，能并行就并行。
- **四种玩法可以叠着用**。批量筛选入门，置信度分流进工作流，大模型干活 + Jev 验收做双核。
- **封闭判断才上它**。开放生成、复杂推理、全权决策都不是它的位置；默认倾向可能压过你的规则，阈值和最终决定权要留在人这边。

---

## 扩展阅读

- [《刷屏全球的 AI 新顶流 Jev，一句话都不说，到底怎么玩？》](https://mp.weixin.qq.com/s/eI8dks0cx5mievnzy0rSkg) · **APPSO**（微信公众号）
- [《这个只会做选择题的 Jev，却是今年我觉得最特别的大模型。》](https://mp.weixin.qq.com/s/Nj7Y3DXibE28up0SvhJ67Q) · **数字生命卡兹克**（微信公众号）
- [《Jev 爆火硅谷！哑巴 AI 卷疯 14 万开发者》](https://mp.weixin.qq.com/s/IOEbFGPnOOvB-XaXweXH0g) · **新智元**（微信公众号）
- [《深度解读：关于 Jev 的几大疑问》](https://mp.weixin.qq.com/s/kETJFrakp4csG98qKl21Kw) · **AI 科技评论**（微信公众号）
- [《刚刚，爆火模型 Jev 全面开放，所有用户送 1.2 亿 token》](https://mp.weixin.qq.com/s/YJmteuFKuOsHRemL9YjQbg) · **APPSO**（微信公众号）
