---
title: DeepSeek 这盘棋：不追"最强"，追"够用、够快、够便宜"
description: 2026 年 7 月 31 日，DeepSeek 发布 V4-Flash 正式版：参数一个没改，Agent 跑分却反超自家旗舰 Pro。把这次更新和三个月前的 V4 首发串起来看，DeepSeek 的打法就清楚了——不拼"最贵最强"，拼"够用、够快、够便宜、好接入"。这篇文章把这盘棋完整讲一遍。
date: 2026-08-01
---

# DeepSeek 这盘棋：不追"最强"，追"够用、够快、够便宜"

**2026 年 7 月 31 日，DeepSeek 发布 V4-Flash 正式版。这次更新里有三个细节，单独看都有点"反常"：**

- **反常一**：更新公告白纸黑字写着"模型结构、尺寸和上一版保持一致"——一个参数都没改；
- **反常二**：官方成绩单上，这个轻量的"小弟"，多项 Agent 指标反超了自家参数大近 6 倍的旗舰"大哥"V4-Pro；
- **反常三**：公告里近一半的篇幅，没讲模型本身，讲的是接口——怎么兼容 OpenAI 的格式、怎么适配编程工具 Codex。

这三件事其实指向同一个答案。但要看懂它，光盯着 7 月这次发布不够，得先把时间倒回三个月前——DeepSeek 这盘棋，是分成两步下的。

---

## 第一步棋（4 月）：先把"用得起"做到极致

2026 年 4 月 24 日，DeepSeek V4 首发，一次放出两个版本：

| | V4-Pro（旗舰） | V4-Flash（轻量） |
|---|---|---|
| 总参数 | 1.6T（约 1.6 万亿） | 284B |
| 每次激活参数 | 49B | 13B |
| 上下文长度 | 100 万 token | 100 万 token |
| 定位 | 冲能力上限 | 跑日常高频 |

当时最大的新闻是**架构创新**：通过"混合注意力"等新设计，在 100 万 token 的超长文本场景下，V4-Pro 的推理计算量降到前代的 27%，显存占用降到 10%。翻译成人话：**同样读一本百万字的书，新架构花的算力只有原来的四分之一左右。**

![DeepSeek 官方公布的模型能力与推理成本图表](/images/frontier/deepseek-v4/official-charts.png)
<p class="figcaption">DeepSeek 官方图表：左侧是 V4-Pro 与同期旗舰模型的能力对比，右侧是 V4 系列的推理计算量（FLOPs）和 KV 缓存占用曲线——长文本场景下比前代低了一个量级。（图源：DeepSeek 官方，智东西报道引用）</p>

同一天的另一条新闻容易被忽略：华为昇腾、寒武纪等国产芯片**发布当天就完成适配**，意味着 V4 从训练到部署都能跑在国产算力上。

4 月这步棋的主题是"成本"：用架构创新，把顶级长上下文模型的使用门槛和价格打了下来。发布结语里，DeepSeek 引了荀子一句话——"不诱于誉，不恐于诽，率道而行，端然正己"。当时看是表态，现在看是预告：它走的本来就不是"堆参数拼第一"那条路。

---

## 第二步棋（7 月）：架构不动，只重做"后训练"

三个月后，7 月 31 日的更新来了。先把范围划清楚，这次更新比标题听起来窄：

<div style="margin:18px 0;">
  <div style="display:flex; align-items:center; gap:14px; border:2px solid #2D5A3D; border-radius:10px; padding:14px 16px; margin-bottom:8px; background:#eef5f0;">
    <div style="flex-shrink:0; width:48px; text-align:center; color:#2D5A3D; font-weight:700; font-size:14px; line-height:1.5;">✓<br>更新了</div>
    <div style="font-size:14px; color:#33503c; line-height:1.8;"><b>V4-Flash 的 API</b>，正式版进入公测，主要影响通过接口调用模型的开发者。</div>
  </div>
  <div style="display:flex; align-items:center; gap:14px; border:1px solid #e6dada; border-radius:10px; padding:14px 16px; background:#faf5f5;">
    <div style="flex-shrink:0; width:48px; text-align:center; color:#9a4a4a; font-weight:700; font-size:14px; line-height:1.5;">✗<br>没更新</div>
    <div style="font-size:14px; color:#5a4a4a; line-height:1.8;"><b>V4-Pro 的 API、App 和网页端</b>都没有同步切换。官方说法是：V4-Pro 正式版"将会尽快发布"。</div>
  </div>
</div>

![DeepSeek V4-Flash 正式版更新公告](/images/frontier/deepseek-v4/release-note.png)
<p class="figcaption">本次更新公告原文：公测范围、Agent 基准成绩、"仅重新进行了后训练"的说明，都写在同一页里。（图源：DeepSeek 官方 API 文档）</p>

规格和 4 月完全一致：284B 总参数、13B 激活、100 万 token 上下文。官方原话是，唯一的动作是"**重新进行了后训练**"。

啥叫后训练？用一个职场比方就懂了：

<div style="margin:18px 0;">
  <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:10px;">
    <div style="flex:1; min-width:240px; border:2px solid #2D5A3D; border-radius:10px; padding:13px 16px; background:#eef5f0;">
      <div style="font-weight:700; color:#2D5A3D;">预训练 · 相当于"学历教育"</div>
      <div style="font-size:13px; color:#33503c; line-height:1.8; margin-top:6px;">
        让模型吞下海量文本和代码，学会语言、常识、推理——相当于一个人从义务教育读到大学。这一步决定能力的<b>底子</b>，也最烧钱：几万张显卡、几个月时间。4 月发布 V4 时，这步已经定型了。
      </div>
    </div>
    <div style="flex:1; min-width:240px; border:2px solid #b8860b; border-radius:10px; padding:13px 16px; background:#fdf8ec;">
      <div style="font-weight:700; color:#8a6508;">后训练 · 相当于"岗前培训"</div>
      <div style="font-size:13px; color:#5a4a2a; line-height:1.8; margin-top:6px;">
        同一个毕业生，入职后教他<b>具体怎么干活</b>：怎么理解任务、怎么调用工具、怎么一步步把一件事做完不出错。成本远低于学历教育，但直接决定"上手好不好用"。这次重做的就是这步。
      </div>
    </div>
  </div>
</div>
<p class="figcaption">预训练决定底子，后训练决定手艺。DeepSeek 这次只动了后者。</p>

同一个员工，换一套更狠、更对口的岗前培训，产出能差出一大截。DeepSeek 用一次公开实验证明了：**当"扩学历"（堆参数、扩规模）的边际收益越来越低，"改培训"（重做后训练）里还藏着大得惊人的提升空间。**

---

## 戏眼来了：为什么"小弟"能反超"大哥"

重做后训练之后，官方公布的 Agent 基准成绩里，Flash 正式版"远超 V4-Pro-Preview"——轻量版反超旗舰版。先看两兄弟的体格差距：

![V4-Pro 与 V4-Flash 官方规格对比](/images/frontier/deepseek-v4/pro-flash-compare.png)
<p class="figcaption">官方规格对比：Pro 总参数 1.6T、激活 49B；Flash 总参数 284B、激活 13B，上下文同为 100 万 token。（图源：DeepSeek 官方 API 文档）</p>

参数差着近 6 倍，成绩却反过来了。这不是倒反天罡，而是**两边的"考试规则"不一样**。

聊天是一问一答，比的是"单步有多聪明"，脑子大天然占优。而 Agent 任务——读一整个代码仓库、调终端、改代码、跑测试、看报错继续修——动辄几十步连续推理，每一步都要花钱、要时间。这时候账是这么算的：

- 单步能力"够强"就行，不需要"最强"；
- 每一步快一点、便宜一点，几十步乘起来，速度和总成本就差出量级；
- 所以一个经过专项训练、又轻又快又便宜的模型，在"把一整件事干完"的赛道上，确实可能赢过又大又贵的旗舰。

**DeepSeek 用自家两条产品线，把"评价标准换赛道"这件事演给全行业看了一遍。**

---

## 但这份成绩单，有三处要打个折

上面所有"大涨""反超"的数字，全部来自 DeepSeek 官方自报。不是说不可信，而是**得知道这份成绩单是怎么考出来的**，才能正确使用它。

![DeepSeek 官方公布的 Agent 基准成绩](/images/frontier/deepseek-v4/benchmark-scores.png)
<p class="figcaption">官方公布的 Agent 基准成绩（Terminal Bench 2.1、NL2Repo、DeepSWE、DSBench 等）。注意公告下方的小字：测试使用了 DeepSeek 自研 Harness、特定参数档位，其中两项是内部测试集。</p>

**第一处：这是"一整套系统"的成绩，不只是模型的。** 官方小字写明，测试用的是 DeepSeek 自研的运行框架（Harness，极简模式，"即将发布"）、max 推理档位和特定采样参数。最终分数是模型、算力预算、工具环境、运行框架共同作用的结果——换个框架换组参数，分数可能明显不同。

**第二处：有些对比不在同一套题上。** 比如 Terminal Bench 有 2.0 和 2.1 两个版本，题目并不相同。更准确的表述应该是：**Flash 正式版在若干官方 Agent 指标上，达到或超过了 Pro 预览版**——中间隔着版本和测试条件差异，不能直接画等号。

**第三处：部分数据外人无法复现。** 成绩里的 DSBench-FullStack、DSBench-Hard 是 DeepSeek 内部测试集，外部无法独立验证。在第三方复现之前，规范写法是"DeepSeek 官方公布"，而不是"已被验证的事实"。

<div style="border:1px solid #e6dada; border-radius:10px; padding:14px 16px; margin:18px 0; background:#faf5f5;">
  <div style="font-size:14px; color:#5a4a4a; line-height:1.9;">
    <b>最稳妥的结论是什么？</b>不是"Flash 全面领先"，也不是"后训练可以取代扩模"，而是——<b>"不动架构、只重做后训练加工具链适配，确实能显著拉高 Agent 基准"这条路线被验证了</b>。真实任务里提升多少，要等更多第三方实测。
  </div>
</div>

---

## 公告的另一半主角：接口，才是抢生态的刀

这次公告将近一半篇幅在讲接口，这才是很多人漏看的重点。

**V4-Flash 正式版原生支持 Responses API——也就是兼容 OpenAI 的接口格式；同时针对 Codex 工作流做了优化，并适配 Claude Code、OpenCode、CodeBuddy 等主流编程 Agent 工具。**

![DeepSeek API 文档的 Responses API 说明](/images/frontier/deepseek-v4/responses-api.png)
<p class="figcaption">DeepSeek 官方文档：Responses API 目前仅支持 V4-Flash，并预告 2026 年 8 月初将增加对 V4-Pro 的支持。（图源：DeepSeek 官方 API 文档）</p>

翻译成人话：**一个现在跑在别家模型上的 Agent 应用，想把底层换成 DeepSeek，迁移成本被刻意压到了极低。** 模型能力是一场比赛，接口标准是另一场比赛——后者决定的是开发者生态"人往哪边流"。DeepSeek 两场都在打。

---

## 把两步棋串起来，DeepSeek 的打法就清楚了

现在可以回答开头那三个"反常"了。把 4 月和 7 月串成一条线：

<div style="border:1px solid #dde7e0; border-radius:12px; padding:16px 18px; margin:18px 0; background:#f6faf7;">
  <div style="font-size:14px; color:#33503c; line-height:2.1;">
    <b>4 月，用架构创新把"用得起"做到极致</b>——超长文本的计算成本降到前代的约四分之一，国产芯片发布当天就能跑；<br>
    <b>7 月，用后训练把"会干活"提上来</b>——不动一个参数，把 Agent 基准拉高一个档次，让便宜的轻量模型在干活场景反超旗舰；<br>
    <b>全程，用接口兼容把"迁移成本"压到最低</b>——让别家生态里的开发者几乎可以"平移"过来。
  </div>
</div>

三件事拼在一起，就是 DeepSeek 在 Agent 时代的完整打法：**不拼"最贵最强"，拼"够用、够快、够便宜、好接入"。** 因为 Agent 应用的特点是高频、多轮、反复调用工具——对单价和速度的敏感远超聊天场景。谁能在"够强 × 够快 × 够便宜"的平衡点上站住，谁就能吃下这块正在放量的市场。模型竞争的主战场，正在从"谁的模型更聪明"，转向"谁的模型更能干活、干活更便宜、接入更省事"。

顺带提醒一句：同期报道里出现了"500 亿元融资""520 亿美元估值""新一轮估值 710 亿美元"等资本数字。**这些目前都只是媒体消息，没有公司公告或审计材料背书**，看到时按"据凤凰网科技报道"理解就好，别当作确认事实。

---

## 对普通读者，三个可以带走的判断

这件事落到日常用 AI 的人身上，有三个以后直接用得上的判断：

<div style="border:1px solid #dde7e0; border-radius:12px; padding:16px 18px; margin:18px 0; background:#f6faf7;">
  <div style="font-size:14px; color:#33503c; line-height:2.1;">
    <b>① "没换架构的新版"以后会很常见。</b>再看到"某模型发布新版、结构不变"，不必失望——大概率是后训练重做了，而这正是眼下提升"干活能力"的主路径。<br><br>
    <b>② 看跑分新闻，先问三个问题：</b>分数是官方跑的还是第三方跑的？对比双方用的是同一套题吗？模型之外的运行环境换没换？问完再决定信不信。<br><br>
    <b>③ 选 AI 工具，别只盯参数和榜单。</b>Agent 时代的真实指标是：你要做的事它能不能稳定干完、等多久、花多少钱。"便宜的小模型反超旗舰"的故事，以后会越来越多。
  </div>
</div>

DeepSeek 这次发布的真正价值，不是多了一个新版本，而是用两步棋把行业的下一程竞赛提前亮了出来：**预训练定底子，后训练定手艺；而决定胜负的，越来越是谁能把"会干活"做得又快、又便宜、又好接入。**

---

## 扩展阅读

- [《DeepSeek V4 正式版来了，新能力浮出水面，性价比之王开战》](https://mp.weixin.qq.com/s/N0ybT7ZiRcFhqhn4fly0Uw) · **凤凰网科技**（微信公众号，2026-07-31，覆盖本次更新、Agent 基准、接口适配与资本动向）
- [《刚刚，DeepSeek V4 系列更新，架构没变，Agent 能力为何大涨》](https://mp.weixin.qq.com/s/_1gB8KqcLT18vhHXbMbMug) · **AI 科技评论**（微信公众号，2026-07-31，用预训练与后训练的区别解释本次提升，并对官方评测边界做了克制说明）
- [《倒反天罡？DeepSeek-V4-Flash 正式版上线，干翻自家先发的 Pro》](https://mp.weixin.qq.com/s/WC4HFbz9LoOgk-GTQU7akA) · **智东西**（微信公众号，2026-07-31，用规格、价格和官方图表快速对比 Flash 与 Pro）
- [《DeepSeek V4 震撼发布！实现全球开源领先》](https://mp.weixin.qq.com/s/s1jhzL6DEY65nNSk4QIyoQ) · **新智元**（微信公众号，2026-04-24，V4 首发的架构创新与训练方案详解）
- [《刚刚，DeepSeek V4 双版本正式上线！》](https://mp.weixin.qq.com/s/bRZnEfHaJnJwkP04-5R_vQ) · **机器之心**（微信公众号，2026-04-24，V4 首发速报，含国产算力 Day 0 适配细节）
