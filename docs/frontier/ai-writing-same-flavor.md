---
title: 为什么 AI 写的东西越来越一个味？
description: 一项覆盖 6 万多篇故事的研究给出答案：AI 味不在词句里，而在整篇文章的骨架里。AI 更爱讲透主题、走单线情节、强行收尾，而且只改表面措辞几乎改不掉。去 AI 味，改句子没用，得换骨头。
date: 2026-08-30
---

# 为什么 AI 写的东西越来越一个味？

用 AI 写周报、写材料、写发言稿的人多了，一种感觉越来越普遍：**每句话单拎出来都通顺，挑不出错，连起来读却全都一个味**。

这不是错觉，而且比想象中更顽固。2026 年一项覆盖 6 万多篇文章的研究发现：AI 味不在个别词句里，而在整篇文章的骨架里。这意味着两件扎心的事。第一，把"AI 常用句"逐句删掉，救不回来。第二，模型越升级，这个问题可能越明显。

---

## 一、AI 味不在句子层，在骨架层

大家熟悉的 AI 味是句子层的：动不动"不是……而是……"，喜欢排比列举，腔调永远正式稳重。这些特征被读者熟悉之后，哪怕文章质量没变，也更容易被一眼认出来。

但一项叫 StoryScope 的研究（马里兰大学和 Google DeepMind 的合作项目，发表在国际计算语言学会议 COLM 2026 上）换了个思路：**不看词句，只看骨架**。

研究的做法很讲究。研究者从一个短篇小说库里取出 10,272 篇人类写的短篇，从每篇反推出一道写作题（相似的人物、设定和主题），再把每道题交给 Claude、DeepSeek、Gemini、GPT、Kimi 五个模型分别重写。人类原作加上五个模型的仿写，一共 61,608 篇故事，每篇约 5,000 词。这种"同一道题、不同作者各写一遍"的对照材料叫平行语料：题目相同，变量就只剩下"谁写的"，比较起来最公平。

![StoryScope 研究流程](/images/frontier/2026-08-30/storyscope-pipeline.png)
<div class="figcaption">StoryScope 的研究流程：每篇故事先被拆成结构化的叙事模板，再比较同一题目下不同来源的写法差异，最后提炼出可区分的叙事特征。整个过程刻意绕开表面词句。（图源：[StoryScope 论文](https://arxiv.org/abs/2604.03136)）</div>

接下来，研究把每篇故事拆成一张"叙事体检表"：人物是否主动解决问题，冲突如何升级，有没有支线，时间有没有跳跃，秘密什么时候揭晓，结局留没留余地。十个维度、304 项特征，全部是关于整篇文章怎么搭的，不记录某个词用了几次、句子有多长。

结果：只凭这 304 项骨架特征，一个分类器（可以理解为一个只看体检表打分的判卷程序）就能以 93.2% 的成绩把"人写的"和"AI 写的"分开（论文里的 macro-F1 值，一种兼顾判对率和覆盖率的成绩算法）。**换句话说，就算 AI 把表面语气全部换掉，故事的搭法照样暴露它**。

---

## 二、AI 写文章的四个习惯

AI 的骨架到底长什么样？研究里这几组数字对比最说明问题（均为故事占比，AI 侧是五个模型的整体表现，人类侧是原作）：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:2.4;">写作习惯</div><div style="flex:1; text-align:center;">AI 故事</div><div style="flex:1; text-align:center;">人类故事</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; align-items:center;">
    <div style="flex:2.4; color:#444;">叙述者主动把主题讲透</div>
    <div style="flex:1; text-align:center; color:#9a4a4a; font-weight:700;">77%</div>
    <div style="flex:1; text-align:center; color:#2D5A3D; font-weight:700;">52%</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb; align-items:center;">
    <div style="flex:2.4; color:#444;">借人物对话讨论人生道理</div>
    <div style="flex:1; text-align:center; color:#9a4a4a; font-weight:700;">59%</div>
    <div style="flex:1; text-align:center; color:#2D5A3D; font-weight:700;">34%</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; align-items:center;">
    <div style="flex:2.4; color:#444;">一条主线走到底，没有支线</div>
    <div style="flex:1; text-align:center; color:#9a4a4a; font-weight:700;">79%</div>
    <div style="flex:1; text-align:center; color:#2D5A3D; font-weight:700;">57%</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb; align-items:center;">
    <div style="flex:2.4; color:#444;">让主角做个明确决定，把故事闭环收尾</div>
    <div style="flex:1; text-align:center; color:#9a4a4a; font-weight:700;">69%</div>
    <div style="flex:1; text-align:center; color:#2D5A3D; font-weight:700;">46%</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; align-items:center;">
    <div style="flex:2.4; color:#444;">用身体反应和隐喻表现情绪</div>
    <div style="flex:1; text-align:center; color:#9a4a4a; font-weight:700;">81%</div>
    <div style="flex:1; text-align:center; color:#2D5A3D; font-weight:700;">38%</div>
  </div>
</div>
<p class="figcaption">五个模型对一万多道题的整体统计：AI 在"讲道理、求完整、要闭环"上全面高出人类一大截。</p>

这四行数字翻成大白话，是四个习惯：

- **爱讲道理**。超过四分之三的 AI 故事会借叙述者之口把主题说破，近六成会让人物坐下来讨论人生。人写的故事更敢留白，让读者自己品。
- **怕乱**。AI 倾向于单线因果：一个冲突、一条线、一口气解决。人写的故事近一半带着支线。
- **强行收尾**。AI 喜欢让主角在结尾做个明确决定，把意义替读者总结好。人更能接受不了了之、说不清、留有余地。
- **连"不守规矩"都守成了规矩**。写作课有条铁律叫"展示而非直说"：别写"她很难过"，要写她攥紧了杯子。AI 严格执行，81% 的故事用身体反应和隐喻表现情绪，人类只有 38%。一条写作建议被执行成统一模板，模板本身就成了新的 AI 味。

一句话总结：AI 写文章像一个好学生，每道题都按标准答案的格式来，而且全班五个学生的格式还一模一样。

---

## 三、为什么模型越练越像

这五个模型来自五家公司，训练数据、技术路线各不相同，写出来的东西却挤在了一起。研究把每篇故事的 304 项特征投到一张图上：五个模型的点密密麻麻聚成一团，人类作品的点散得开得多，还占着一片 AI 几乎不去的区域。算"最罕见 10%"的稀奇写法，人类作品有 24.7% 落进去，AI 只有 7.1%。

![人类与五个模型的叙事分布](/images/frontier/2026-08-30/storyscope-distribution.png)
<div class="figcaption">每个点是一篇故事。左边那团棕色是人类作品，散得开；其余五种颜色是五个模型，挤在相近的区域里，彼此离得比离人类近得多。（图源：[StoryScope 论文](https://arxiv.org/abs/2604.03136)）</div>

为什么会趋同？三个原因叠在一起：

- **后训练在磨平个性**。模型出厂前要经历一轮"规矩训练"（post-training，后训练）：人类审核员给模型的回答打分，模型照着高分的方向调整。安全、清晰、有条理的回答最容易得高分，于是所有模型被推向同一个方向：稳重、完整、不出错。这对客服和办公是好事，对写作就是另一回事了，个性和意外感恰恰是这轮打磨要铲掉的毛边。
- **评测在奖励平均分**。各大榜单考的是综合表现，写作在里面占比很小，风格是否独特几乎不计分。厂商优化的是榜单总分，不是"写得像不像一个活人"。
- **AI 写的字在回流当教材**。网上 AI 生成的内容越来越多，新一代模型训练时难免吃到，类似近亲繁殖。有研究把这种风险叫作模型坍塌（model collapse）：一代代用模型的产出训练模型，少见、偏门、有棱角的写法会先消失，因为平均值永远最安全。要说清楚的是，这是一个被验证过的风险机制，不等于"现在所有模型都已经因此退化"，各家怎么筛选训练数据并不透明。

---

## 四、两个实验，说清"改句子没用"

既然 AI 味在骨架里，那只改句子会发生什么？有直接的实验答案。

第一个实验就做"去 AI 味"操作：研究者把 278 篇 AI 故事里的表面毛病（陈词滥调、冗余解释、华丽废话）逐段删掉，再让分类器重新判卷。识别成绩从 95.5% 降到 93.9%，几乎没动。**词句全换了，骨架一根没动**。

第二个是一线使用者的体感对照。有人翻出自己一年前让 AI 写过的稿子，用同一个模板、同一份素材，让五个当下最新的模型重新仿写，再盲选排序。结果是：人物语气、生活细节、幽默感，普遍不如一年前那版。更微妙的是让另一个模型给这五篇稿子打分，打出来的排序和人的盲选对不上：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:2;">模型</div><div style="flex:1; text-align:center;">模型自评总分</div><div style="flex:1; text-align:center;">自评排名</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; align-items:center;">
    <div style="flex:2; color:#444;">Codex 5.6 Sol</div><div style="flex:1; text-align:center; font-weight:700; color:#2D5A3D;">90.3</div><div style="flex:1; text-align:center; color:#666;">1</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb; align-items:center;">
    <div style="flex:2; color:#444;">Claude Sonnet 5</div><div style="flex:1; text-align:center; font-weight:700; color:#2D5A3D;">70.7</div><div style="flex:1; text-align:center; color:#666;">2</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; align-items:center;">
    <div style="flex:2; color:#444;">DeepSeek V4 Pro</div><div style="flex:1; text-align:center; font-weight:700; color:#2D5A3D;">70.5</div><div style="flex:1; text-align:center; color:#666;">3</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb; align-items:center;">
    <div style="flex:2; color:#444;">Gemini 2.5 Pro</div><div style="flex:1; text-align:center; font-weight:700; color:#2D5A3D;">64.2</div><div style="flex:1; text-align:center; color:#666;">4</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; align-items:center;">
    <div style="flex:2; color:#444;">Gemini 3.6 Flash</div><div style="flex:1; text-align:center; font-weight:700; color:#2D5A3D;">44.6</div><div style="flex:1; text-align:center; color:#666;">5</div>
  </div>
</div>
<p class="figcaption">一个模型给五篇同题仿写打的分。这个排序和人读者的盲选排序明显对不上：模型按自己的标准评写作，评不出人眼里的 AI 味。</p>

这个对照是个人样本，没有多人盲评，不能当科学结论下，但它的方向和前面 6 万篇故事的研究完全一致。

---

## 五、去 AI 味，按材料、结构、句子三层来

知道了味在骨架，去法就清楚了：别只盯着句子修修补补，按材料、结构、句子三层下手，越靠前越关键。

**第一层：材料，必须你喂。** AI 写得"平均"，一大原因是它手里只有平均的材料。同样一道题，把你亲眼看到的细节、行业里才知道的数字、当事人的原话丢进去，产出立刻不一样。对比一下两种派活方式："帮我写个项目复盘"，和"帮我写个项目复盘：上线第一天客服电话被打爆，我们把机器人应答的等待时长从 40 秒压到 10 秒，第二天投诉量降了一半"。后者出来的文章天生没有 AI 味，因为这些细节不在任何训练数据里，AI 编不出来，也平均不掉。

**第二层：结构，在下笔前就打招呼。** 前面说的四个习惯，全都可以在派活时直接禁掉：

<div style="border:1px solid #dde7e0; border-left:4px solid #2D5A3D; border-radius:12px; padding:14px 18px; margin:18px 0; background:#f6faf7;">
  <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px; font-size:14px;">可以直接抄进提示词的四句</div>
  <div style="font-size:14px; line-height:2.1; color:#33503c;">不要解释主题和意义，让事情自己说话<br>允许有没有解决的问题，不用每条线都收尾<br>结尾不要总结，停在一个具体的细节或画面上<br>不要借人物之口讲道理</div>
</div>
<p class="figcaption">这四句管的是骨架。说不说，差别就是骨头换没换。</p>

**第三层：句子，最后才轮得到。** 删"不是……而是……"、删排比、删"值得注意的是"，这些是收尾的清洁工作，不是去味本身。前面的实验已经证明，只干这一层，识别成绩几乎不动。

另外有个免费但管用的习惯：成稿放一晚，第二天自己通读一遍，或者发给真正的目标读者看一眼。模型的自评和你的读者完全是两回事，它打的高分不代表人读着没味。

去 AI 味，改句子没用，得换骨头。换骨头也不难：材料你给，规矩你定，最后通读那一遍的也是你。

---

## 扩展阅读

- [《很遗憾，AI的写作能力在持续衰退。》](https://mp.weixin.qq.com/s/QmZaAomIhFxRHoRjRKIhuA) · **网罗灯下黑**（微信公众号）
- [《「AI 味」不是在一句话里，而是渗透了所有的文字》](https://mp.weixin.qq.com/s?__biz=MjM5MjAyNDUyMA==&mid=2651104047&idx=1&sn=086b608619bb256cc12476637e529239&chksm=bca791da9c23e8d5fdb30e2352ada3aac9f44e5f8ffacd6f5e212b0c215ad0bbcc50b4405ffc&mpshare=1&scene=1&srcid=0829dU20T3YxlkzSu7l8fqfZ&sharer_shareinfo=ab6450f35a675b45364a40be05c4dd77&sharer_shareinfo_first=c722ac4a474881e26022ea2ce0d01770#rd) · **APPSO**（微信公众号）
- [StoryScope: Investigating Idiosyncrasies in AI Fiction](https://arxiv.org/abs/2604.03136) · **Jenna Russell 等**（马里兰大学 / Google DeepMind，COLM 2026）
