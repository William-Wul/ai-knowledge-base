---
title: 上下文管理：AI 为什么会"忘事"，以及怎么喂对资料
description: 搞懂 AI 的"桌面"有多大——什么该常驻、什么该按需给、长任务怎么不乱，让 AI 越用越懂你
---

# 上下文管理：AI 为什么会"忘事"，以及怎么喂对资料

你可能遇到过这种情况：同一个 AI，上午还挺好用，下午就开始不对劲——聊着聊着跑题了，你纠正过的错误它又犯了，明明给过资料却像没看见一样。

多数人的反应是"AI 抽风了"或者"这个模型不行"。但真相往往更简单：**不是 AI 变笨了，是它的"桌面"被你堆满了。** 学会整理这张桌面，比换任何一个更贵的模型都管用。这就是"上下文管理"。

---

## 先搞清楚：AI 的"记忆"只有一张桌面那么大

先建立一个关键认知：**AI 没有真正的记忆。** 它每回答你一次，都是把"桌面上所有的东西"从头到尾重新读一遍，然后基于这一遍的理解回答你。

这张"桌面"，行话叫**上下文窗口**。桌上堆着这些东西：

- 你发过的每一句话
- AI 自己回过的每一句话
- 你丢给它的文件、粘贴的资料
- 工具自带的规则说明

桌面的大小是有限的。堆的东西越多，每样东西被"认真读到"的概率就越低。于是三个典型症状出现了：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">症状</div><div style="flex:2;">桌面上的真相</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">聊久了跑题</div>
    <div style="flex:2; color:#444;">桌面被几十轮闲聊占满，你最早定的目标被压到了最底下</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">答非所问</div>
    <div style="flex:2; color:#444;">你给的资料和当前问题混在一起，它抓错了重点</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">纠正过的错又犯</div>
    <div style="flex:2; color:#444;">你的纠正和它的错误回答都躺在桌上，它两选一，选错了</div>
  </div>
</div>
<p class="figcaption">这三个症状都不是 bug，是桌面太挤。所以上下文管理要解决的只有一件事：决定桌面上放什么、放多少、什么时候清。</p>

---

## 第一个判断：什么放上桌面常驻，什么收进抽屉按需取

这是上下文管理最核心的一次分流。把 AI 想成一个新来的同事，你给它的东西分两种：

**常驻的，是"岗位手册"。** 入职那天发一次，此后天天摆在桌上：我是谁、我们部门做什么、输出用什么格式、什么绝对不能碰。这些东西的特点是**长期不变、每次都用得上**。

**按需的，是"SOP 文件"。** 放在抽屉里，用到才翻：某个具体任务的操作流程、某次分析要的参考数据、某篇长文档。这些东西的特点是**只在特定任务里用一次**。

最常见的错误，是把抽屉里的东西全搬上桌面——比如把十几页操作手册、历史资料统统塞进 AI 的"自定义指令"或"记忆"里。结果是：AI 每次回答你，都背着一麻袋跟当前问题无关的东西，真正重要的指令反而被淹没了。**常驻位是稀缺资源，只放稳定事实和红线，别堆流程和资料。**

落到普通用户的日常操作，就两句话：

1. 各 AI 工具的"自定义指令""记忆"功能，只写长期不变的偏好（你的身份、语气要求、格式习惯）
2. 大文档别整本丢进去。100 页的材料，只把相关的两三页给它，效果远好于全文塞入

---

## 资料质量先于提示词

很多人遇到 AI 输出不行，第一反应是回去改提示词、找"更厉害的句式"。但一个越来越被验证的经验是：**数据先于提示词。** 与其琢磨怎么问，不如先把料备齐。

道理用一句大白话说：**AI 放大深度，但不自动制造深度。** 你自己先有判断、有结构、有真实素材，AI 能帮你往上盖楼；你两手一摊只丢一句话过去，它只能给你批量生产"看着像那么回事"的空话。

对比一下同一个任务：

> ❌ "帮我写一份部门季度总结。"

> ✅ "这是我们部门这个季度的原始记录：3 个项目的关键节点数据、2 次客户投诉的处理过程、季度目标完成情况表（附在下面）。请基于这些素材写季度总结，突出项目 A 的延期原因分析，1500 字以内。"

第二种问法里，提示词本身没有任何"高级技巧"，只是**先把高质量材料备齐了**。把"先喂什么"变成习惯：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">任务</div><div style="flex:2;">开口之前，先喂什么</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">写周报/总结</div>
    <div style="flex:2; color:#444;">本周的原始记录、数据、聊天记录里的关键决策</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">做方案</div>
    <div style="flex:2; color:#444;">项目背景、上次方案的反馈、预算和人力约束</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">问专业问题</div>
    <div style="flex:2; color:#444;">相关条款/制度原文，别让 AI 凭"印象"回答</div>
  </div>
</div>
<p class="figcaption">先收料、再开火的另一个好处：AI 的回答变得可以核对——它说的每一句都能在你给的资料里找到出处。</p>

---

## 长任务怎么不乱：分治、隔离、压缩

一个对话连着干了三天活，桌面必然乱成一锅粥。长任务要管好上下文，记住三个动作：

**分治：一事一议，开新对话不可惜。** 写周报是一个对话，做 PPT 是另一个对话，别在同一个对话里串着来。两个任务的资料互相挤占桌面，是两个都做不好的最常见原因。

**隔离：中间过程，别全堆在主桌面上。** 查一堆资料、分析一堆数据这种"跑腿的活"，中间会产生大量过程性内容。正确姿势是：让 AI 把过程跑完，**只把结论带回主对话**。就像一个聪明的指挥官不需要把每份侦查报告原文钉在自己桌上，他只要结论。

**压缩：分阶段推进，每阶段把结论"浓缩"成几句话带入下一阶段。** 比如做一个调研，第一阶段结束后让 AI"把以上结论压缩成 200 字摘要"，然后带着这段摘要开第二阶段。摘要代替全程记录，桌面始终干净。

---

## 让 AI 越用越懂你：积累一份自己的背景文档

前面说的都是"怎么省桌面"，最后说一个反过来的动作：**有些东西，值得你主动、长期地喂给 AI。**

观察那些把 AI 用得最好的人，会发现一个共同点：他们维护着一份"个人背景文档"——我是谁、我在做什么项目、我的长期目标、我的偏好和禁忌。每次开新对话，先把这份文档给 AI，让它**先理解"我是谁"，再回答问题**。

效果是显著的：同一个问题，裸问的 AI 只能给通用答案；读过你背景的 AI，给的答案是贴着你的处境来的。而且这份文档是你自己的资产——模型人人能用，订阅人人能买，**但长期积累下来的上下文，才是真正拉开人与人差距的东西**。

动手建议：建一个备忘录，分四栏——我的角色、正在推进的事、我的偏好（格式/语气/深度）、我的禁忌（别做什么）。写到一页纸以内，之后每次重要对话带上它，并且持续更新。

---

## 边界提醒：上下文也是会泄露的

最后补一条底线。你喂给 AI 的每样东西，都离开了你的电脑、进了服务商的服务器。所以喂之前，养成一个条件反射：**"这段话如果被第三方看到，行不行？"**

- 账号密码、密钥、验证码：永远不喂
- 真实客户数据、身份证号、合同金额：脱敏后再喂（张三代替真名，区间代替精确数字）
- 公司未公开的敏感文件：先确认公司规定，再决定喂不喂

上下文管理的另一面是：桌面上的东西，你也要对它的去向负责。

---

## 总结

<div style="border:2px solid #cde0d4; border-radius:12px; padding:20px; background:#f6faf7; margin:18px 0;">
  <div style="font-weight:700; color:#2D5A3D; font-size:16px; margin-bottom:12px;">上下文管理一张卡</div>
  <div style="font-size:14px; line-height:2.2; color:#33503c;">
    <strong>核心认知</strong> → AI 没有记忆，每次都重读整张"桌面"；跑题、答非所问、重复犯错都是桌面太挤<br>
    <strong>一次分流</strong> → 岗位手册（稳定事实+红线）常驻，SOP 和资料按需取<br>
    <strong>先备料</strong> → 数据先于提示词；写周报先丢记录、做方案先给背景、问专业问题先给原文<br>
    <strong>长任务三招</strong> → 一事一议、中间过程只带回结论、每阶段压缩成摘要再推进<br>
    <strong>长期积累</strong> → 维护一页纸的个人背景文档，让 AI 先懂你再回答<br>
    <strong>安全底线</strong> → 喂任何东西前问一句：被第三方看到行不行
  </div>
</div>
<p class="figcaption">上下文管理不需要懂任何技术，它只是把"整理桌面"这个办公室常识，搬到你和 AI 的协作里。从今天最重要的那个对话开始试。</p>

---

## 扩展阅读

- [《深入理解 Claude Code：从 CLAUDE.md 到 Hooks、Skills、Subagents》](https://mp.weixin.qq.com/s/-7C4WqRsuKlmBj6I31Is1w) · **赛博禅心**（微信公众号）——"常驻 vs 按需""中间过程隔离"两个核心区分的出处，原文讲透了 AI 工具是如何读取上下文的。
- [《一群 AI Native 创始人，正在长出来》](https://mp.weixin.qq.com/s/JITeHlYkZgB2BeU2CX0ODg) · **董科含**（微信公众号）——"数据先于提示词""个人背景文档""AI 放大深度但不制造深度"的出处。
- [《一文讲透 Agent、CLI、GUI、IDE、终端》](https://mp.weixin.qq.com/s/9wdJSvL4XTYvVYQfQZqIpg) · **爱AI的大刘**（微信公众号）——"喂对上下文"四动作和安全底线的出处，用生活化类比讲清 AI 干活的方式。
- [《最新！万字综述 Prompt 到 Loop 进化》](https://mp.weixin.qq.com/s/hcgKahtQRE2QqI6xplv2Rg) · **Datawhale**（微信公众号）——上下文、记忆与反馈机制的系统综述，适合想继续深挖的读者。
