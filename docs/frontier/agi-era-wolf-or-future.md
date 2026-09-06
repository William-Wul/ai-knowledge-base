---
title: 都在喊「AGI 时代来了」，到底是狼来了还是未来已来
description: GPT-6 Astra 发布当天，"欢迎来到 AGI 时代"刷屏。但 AGI 这个词本身有几十种定义，99.9% 的跑分背后还有另一个 62.7%。把定义、证据和当下真实进度摆上桌，再回答狼来了还是未来已来
date: 2026-09-05
---

# 都在喊「AGI 时代来了」，到底是狼来了还是未来已来

9 月 3 日 GPT-6 Astra 发布，OpenAI 总裁 Greg Brockman 在发布会上说了一句"欢迎来到 AGI 时代"。接下来二十四小时，AI 圈的头部报道像是约好了：新智元、APPSO、数字生命卡兹克、赛博禅心，标题齐刷刷都是这七个字。

这句口号值不值得信，取决于两件先说清楚的事：**AGI 到底是什么**，以及**当下的 AI 到底走到了哪一步**。这两件事恰恰是所有"时代来了"式标题都跳过的。这篇文章把它们补齐，然后再回答标题里那个问题。

---

## 一、AGI 是什么？一个词，几十种定义

先给一句站得住的定义。**AGI（Artificial General Intelligence，通用人工智能）指的是能在绝大多数需要智力的工作上达到或超过人类水平的 AI 系统**。它不是某一两件事特别强，而是"换一件事给它，它也能学会"。今天你用的 AI 都是"专才"：聊天很强，但让它去操作一台陌生机器就抓瞎。AGI 是那个"通才"。

麻烦在于，这个定义只是几十种定义里的一种。这个词从诞生起就没有过公认标准，而**定义之争直接决定"AGI 来了没有"的答案**：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">谁的标准</div><div style="flex:2.4;">AGI 算什么水平</div><div style="flex:1.2;">按这个标准，到了吗</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; line-height:1.7;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">OpenAI（公司宪章）</div>
    <div style="flex:2.4; color:#444;">"在大多数有经济价值的工作上超越人类的高度自主系统"。注意这个定语：<b>经济价值</b>，它衡量的是干活，不是"像人"</div>
    <div style="flex:1.2; color:#444;">Altman 说按这个定义，2026 年底前就到；首席研究官 Mark Chen 说"已完成约 80%"（据 TIME 报道）</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; line-height:1.7; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">OpenAI 五级台阶</div>
    <div style="flex:2.4; color:#444;">聊天机器人 → 推理者 → 智能体 → 创新者 → 组织者（能完成一整个组织的工作）</div>
    <div style="flex:1.2; color:#444;">业界普遍认为当前在第 2 到 3 级之间</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; line-height:1.7;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">Google DeepMind</div>
    <div style="flex:2.4; color:#444;">按"任务广度 × 能力深度"分级；2026 年 3 月又专门发了一篇《测量 AGI 进展》的认知框架论文，理由就是"每家都说自己接近 AGI，但没人说清'接近'是什么意思"</div>
    <div style="flex:1.2; color:#444;">推理、知识维度领先；社交、物理交互维度还差得远</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; line-height:1.7; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">Metaculus 预测平台</div>
    <div style="flex:2.4; color:#444;">可操作的硬判据：AI 在 95% 的人类职业里达到中位数从业者的水平</div>
    <div style="flex:1.2; color:#444;">2026 年的估计：覆盖约 60% 的职业</div>
  </div>
</div>
<p class="figcaption">看出门道了吗："AGI 到了没有"在很大程度上是个定义选择题。选 OpenAI 自己的定义，今年底就到；选"95% 职业中位数"的硬判据，才走了六成。</p>

所以第一条基本法：**再看到谁宣布"AGI 来了"，先问他用的是哪把尺子。** 发布会的尺子和学术界的尺子，从来不是同一把。

---

## 二、那 Astra 到底走到了哪一步

定义之争放一边，看这次发布本身的硬数据。最有信息量的是那个刷屏的 99.9%，但它背后的故事比标题复杂得多。

### 99.9% 是真的，但它有个"双胞胎"

ARC-AGI-3 是 2026 年 3 月发布的一套特殊测试：几百个全新的互动环境，不给说明书、不告诉规则、不告诉目标，模型进去自己摸索规律，再把学到的迁移到更难的关卡。它测的已经不是知识，而是接近"悟性"的东西。所以发布时最扎眼的数据是：**今年 3 月，最强的 AI 只能拿 0.51%；人类平均 48%。**

然后成绩开始爬：GPT-5.6 Sol 拿到 7.8%，Claude Opus 5 爬到 30.2%，Astra 直接标到 99.9%。

但独立测试方 ARC Prize 做了一件很重要的事：他们用**两套环境**各测了一遍。

<div style="display:flex; gap:14px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:240px; border:2px solid #cde0d4; border-radius:12px; padding:18px; background:#f1f6f2;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">62.7% · 中立环境</div>
    <div style="font-size:14px; line-height:1.8; color:#33503c;">ARC Prize 自己的标准测试环境：所有厂商用同一套最小接口，模型自己管自己的"笔记"。<b>Astra 拿 62.7%</b>，从 7.8% 到 62.7%，这本身已经是罕见的大跨步，而且超过了人类平均线。</div>
  </div>
  <div style="flex:1; min-width:240px; border:2px solid #d9c4c4; border-radius:12px; padding:18px; background:#faf3f3;">
    <div style="font-weight:700; color:#9a4a4a; margin-bottom:8px;">99.9% · 配自家装备</div>
    <div style="font-size:14px; line-height:1.8; color:#5a4040;">允许 Astra 套上 OpenAI 自己设计的上下文管理系统（可以理解成"官方外挂笔记本"），分数跳到 99.9%。ARC Prize 同时写明：这个基准的范围是有限的、规则是封闭的，<b>打穿它不等于 AGI</b>，而且"这个基准已经饱和"，测不出更多东西了。</div>
  </div>
</div>
<p class="figcaption">同一个模型，同一套题，换一层"外挂装备"，62.7% 变成 99.9%。这恰好说明：现在比的不只是模型，还有模型外面那层运行环境（Harness）。</p>

### 另一把尺子上的数字，冷静得多

![GPT-6 Astra 官方基准汇总](/images/frontier/2026-09-05/astra-benchmarks.png)
<div class="figcaption">OpenAI 官方基准汇总：科学工作流、商业工作流、研究级数学、3D 建模、抽象推理全面领先上一代。注意这是官方自报口径，且多为最高推理强度下的成绩。（图源：OpenAI 官方发布资料）</div>

第三方评测机构 Artificial Analysis 的综合智能指数（Intelligence Index，多维度打分）上，**Astra 约 61 分，和上一代 GPT-5.6 Sol 基本持平，还低于 Claude Fable 5.1 的 66**。它在编程智能体指数上确实强：用 Sol 三分之一的 Token 追平顶级模型，但这恰恰印证了官方自己的定位：**这是一个为"干活"优化的模型，不是全面碾压的模型**。

OpenAI 官方口径里真正的新东西也在这边：能操作没有接口的旧软件（看屏幕、点鼠标、敲键盘）、按模板交付整件工作、长任务有了"笔记本"防止忘事，以及在内部当起了"自动化研究实习生"：给它一个实验想法，它能自己写代码、跑实验、带着结果回来，这类活原本要人类研究员干大约一周（据 TIME 对 OpenAI 首席科学家 Jakub Pachocki 的采访）。

还有一笔账：Astra 的 API 价格约是上代的 2.5 倍（每百万输入 Token 10 美元、输出 50 美元）。Agent 场景里它用三分之一的 Token 干同样的活，总账反而便宜；拿来聊天，则是又贵又浪费。**能力涨了，涨在什么方向，价格结构说得比口号诚实。**

---

## 三、三拨人在喊的，其实是三件不同的事

回到那句口号。把它和另外两个声音放在一起听，会清楚很多：

<div style="display:flex; gap:12px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:220px; border:1px solid #dde7e0; border-radius:12px; padding:16px; background:#f6faf7;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:6px;">发布会版 · 里程碑叙事</div>
    <div style="font-size:14px; color:#444; line-height:1.8;">"欢迎来到 AGI 时代"是 Brockman 的发布会定调。注意它的身份：<b>这是发布会的时代判断，不是 OpenAI 宣布"我们实现了 AGI"</b>。发布会需要一个大词，就像电影需要海报。</div>
  </div>
  <div style="flex:1; min-width:220px; border:1px solid #e6dada; border-radius:12px; padding:16px; background:#faf5f5;">
    <div style="font-weight:700; color:#9a4a4a; margin-bottom:6px;">Altman 版 · 自己泼冷水</div>
    <div style="font-size:14px; color:#5a4a4a; line-height:1.8;">有意思的是，两周前（8 月 26 日）OpenAI 自家 CEO 在访谈里说的几乎是反话：<b>"我在几件事上判断错了，AI 改变世界没那么快。"</b>他承认低估了人的习惯、采购流程和组织惯性。模型进步快，社会采用慢，瓶颈正在从模型转向人这一侧。</div>
  </div>
  <div style="flex:1; min-width:220px; border:1px solid #dde7e0; border-radius:12px; padding:16px; background:#f6faf7;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:6px;">YC 版 · 把大词拆小</div>
    <div style="font-size:14px; color:#444; line-height:1.8;">YC 总裁 Garry Tan 八月提的「个人 AGI」是另一个物种：不讨论机器什么时候超过人，只说普通人现在就能搭的东西：<b>可替换的前沿模型 + 你自己沉淀的知识库 + 一组定时干活的 Agent</b>。模型是租的，上下文和流程才是你的资产。</div>
  </div>
</div>
<p class="figcaption">三种「AGI」：一个是发布会海报，一个是 CEO 的自我修正，一个是可以照着做的行动清单。</p>

这三件事其实不矛盾，只是回答的问题不同：海报回答"今天发什么"，CEO 回答"社会多久变"，YC 回答"你这周能做什么"。

---

## 四、狼来了，还是未来已来

现在可以回答标题了。先把"时代"拆成两个不同的断言，真假各半：

<div style="border:1px solid #dde7e0; border-radius:12px; padding:16px 18px; margin:18px 0; background:#f6faf7;">
  <div style="font-size:14px; color:#33503c; line-height:2.1;">
    <b>断言一："AGI 时代到了，机器智能全面超过人类。"</b>按目前证据，<b>不成立</b>。定义是自家挑的，最炸的跑分是配着自家装备打出来的且出题方声明"已饱和"，第三方综合智能分和上一代基本持平，编程等关键赛道没有拉开代差，自主学习和物理世界理解仍是公认的短板。<br><br>
    <b>断言二："AI 开始作为执行者交付整件工作。"</b>这个<b>成立</b>。操作没有接口的旧软件、按模板交成品、在 OpenAI 内部以"研究实习生"的身份跑真实实验，这些是上一轮模型做不到、这一轮开始做到的事。它不轰动，但它改变的是工作关系。
  </div>
</div>

再往后一步，给一套下次直接能用的清单。再有任何"XX 时代来了"，拿它过一遍：

<div style="display:flex; gap:14px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:240px; border:2px solid #cde0d4; border-radius:12px; padding:18px; background:#f1f6f2;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">✓ 符合这四条，是真进展</div>
    <div style="font-size:14px; line-height:2.0; color:#33503c;">① <b>第三方能复现</b>：中立环境下跑出的成绩，不是只配自家装备的高分<br>② <b>交付整件工作</b>：真实场景里交出成品，不是发布会上的演示<br>③ <b>普通人用得起</b>：价格和额度落在你够得着的范围<br>④ <b>出题方够诚实</b>：敢自己标注"这个榜打穿了不代表 AGI"</div>
  </div>
  <div style="flex:1; min-width:240px; border:2px solid #d9c4c4; border-radius:12px; padding:18px; background:#faf3f3;">
    <div style="font-weight:700; color:#9a4a4a; margin-bottom:8px;">✗ 有这三条，基本是话术</div>
    <div style="font-size:14px; line-height:2.0; color:#5a4040;">① <b>大词先行</b>：满篇「时代」「奇点」「纪元」，但找不到一句可以被检验的话<br>② <b>挑着比</b>：只列自己赢的项目，测试配置也挑最有利的：这次的 99.9% 就配了官方"外挂"，中立环境下是 62.7%<br>③ <b>藏起尺子</b>：宣布"AGI 已到来"，却不说是按哪家的定义量的——换把尺子，答案就变了</div>
  </div>
</div>
<p class="figcaption">拿这套清单回看这次发布：Astra 的"执行者"能力大概率经得起复核；"AGI 时代"这个包装词，一条信号都不占。</p>

---

## 小结

狼来了还是未来已来？两个答案各对一半。

**「AGI 时代」是发布会需要的海报，不必当真；「AI 开始交付整件工作」是已经发生的变化，不能装没看见。** 前者是大词，大词归发布会；后者是日常，日常归你。

所以下次再听到"时代来了"，不用激动也不用反感。把海报撕掉，看里面那件具体的新东西是什么、按哪把尺子量的、你能不能用上、用它的成本是多少。能回答这四个问题的发布，才值得占用你的时间。

---

## 扩展阅读

- [《GPT-6 Astra Explained: What the 99.9% ARC-AGI-3 Score Really Means》](https://choosely.ai/ai-radar/gpt-6-astra-explained) · **Choosely.AI**（2026-09-04，62.7% 与 99.9% 双跑分的来龙去脉，ARC Prize 与 Artificial Analysis 口径）
- [《GPT-6 Astra 发布：OpenAI 说"欢迎进入 AGI 时代"，开发者先看这些》](https://news.qiniu.com/archives/1788485723693) · **七牛云**（2026-09-04，按发布、基准、计算机操作、价格、安全五条线的冷静梳理）
- [《GPT-6 Astra 全面解析——"欢迎来到 AGI 时代"》](https://mp.weixin.qq.com/s/1R4vSUmjFUINxFbfJLOXng) · **数字生命卡兹克**（微信公众号，2026-09-04，ARC-AGI-3 测什么的通俗解释）
- [《Sam Altman 最新访谈：我在几件事上判断错了，AI 改变世界没那么快》](https://mp.weixin.qq.com/s?__biz=MTQzMjE1NjQwMQ==&mid=2656196930&idx=1&sn=e2521d7a8955505d194ad10d17c8d8a1&chksm=676ed6d5e6f017f3d4733de3694a8e03eb2632f9685fda139618d9b01a081e0e4911266d7a7d&mpshare=1&scene=1&srcid=0826CRlBVtCjS1mDIVflPJ05&sharer_shareinfo=6aa8262de363794a90d3d6a32dd75701&sharer_shareinfo_first=6aa8262de363794a90d3d6a32dd75701#rd) · **虎嗅**（微信公众号，2026-08-26，David Senra 对谈 Sam Altman）
- [《Altman 称 OpenAI 或于 2026 年达成其 AGI 定义》](https://dayaai.com/news/story/3984) · **大牙AI 转引 TIME**（2026-08-27，"年底前内部达成 AGI 定义""完成约 80%"说法的出处）
- [《YC 总裁：2026，个人 AGI 已来》](https://mp.weixin.qq.com/s?__biz=MzYyMTY1NDA0Nw==&mid=2247520200&idx=1&sn=9d14d2cd9941f5b808b15acd413d5cf5&chksm=fec870b87e0cc64fd101df9d0c836643a903a7935f4f649b118cd4d8f542f31df17452853cb0&mpshare=1&scene=1&srcid=0825D5IhFpDPRpl4ZI0NYsYe&sharer_shareinfo=6d5e00150964e22ced5da78cfff3ff0d#rd) · **特工宇宙**（微信公众号，2026-08-11，Garry Tan「个人 AGI」演讲整理）
- [《DeepMind 给 AGI 造了一把尺子：认知框架深度解读》](https://juejin.cn/post/7618502885389778971) · **稀土掘金**（2026-03，DeepMind《Measuring Progress Toward AGI》论文解读）
- [《从 LLM 到 AGI，大模型未来会走向哪里》](https://matt33.com/2026/07/15/llm-to-agi/) · **Matt's Blog**（2026-07-15，AGI 八个能力维度与当前限制的工程视角）
