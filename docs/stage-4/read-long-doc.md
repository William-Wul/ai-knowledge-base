---
title: 用 AI 读长文档：指令怎么写，结论怎么核对
description: 把一份 98 条、1.18 万字的法律全文交给 AI，提取跟自己有关的条款，附完整指令、真实产出，以及三处它会答得很确定但文件里根本没有的内容
---

# 用 AI 读长文档：指令怎么写，结论怎么核对

## 场景

一份几十页的文件摆在面前，你要在半小时内说清楚"跟我们有关的是哪几条"。

这是法务、HR、采购、行政每个月都要干几次的活：一份新法规、一份供应商合同、一份集团下发的管理办法。通读一遍要两小时，而你真正要用的可能只有八条。

这次实测的对象是**《中华人民共和国劳动合同法》全文（2012 年修正版）**，98 条、约 1.18 万字。任务是：以一名普通员工的视角，找出签合同、试用期、主动离职、被公司解除这四个时刻最该知道的条款。

选它有个私心：这份文件公开可查，每一条结论都能回原文核对。**能核对，才谈得上验证 AI 有没有胡说。**

---

## 先判断：这活能不能交给 AI

能交的是"从长文档里挑出符合条件的段落，再改写成人话"。这是检索加改写，AI 最擅长的一类活。

不能交的是"我这种情况能不能拿到赔偿"。那是判断，需要结合你的具体事实、当地口径和司法实践，AI 给出的答案听起来同样流畅，但你没有办法验证。

<div style="display:flex; gap:14px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:240px; border:2px solid #cde0d4; border-radius:12px; padding:18px; background:#f1f6f2;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">可以交给它</div>
    <div style="font-size:14px; line-height:1.9; color:#33503c;">
      "哪几条跟试用期有关"<br>
      "把第十九条翻成大白话"<br>
      "按这四个时刻分类列出来"<br>
      <span style="color:#2D5A3D; font-weight:600;">共同点：答案就在文件里，你翻得到。</span>
    </div>
  </div>
  <div style="flex:1; min-width:240px; border:2px solid #d9c4c4; border-radius:12px; padding:18px; background:#faf3f3;">
    <div style="font-weight:700; color:#9a4a4a; margin-bottom:8px;">别交给它</div>
    <div style="font-size:14px; line-height:1.9; color:#5a4040;">
      "我这种情况能拿多少补偿"<br>
      "公司这么做违法吗"<br>
      "我该不该签这份合同"<br>
      <span style="color:#9a4a4a; font-weight:600;">共同点：答案不在文件里，你核不了。</span>
    </div>
  </div>
</div>
<p class="figcaption">一条够用的分界线：你能核对的活可以交，你没法核对的活别交。</p>

---

## 第一版指令：能用，但没用

大多数人会这么写：

```
帮我总结一下这份劳动合同法。
```

它交回来一份按章节走的摘要，八章全覆盖，每章两三句，信息一个字没错。

问题是这份摘要没法用。它把 1.18 万字压成了 800 字，可你要的从来不是"更短的法条"，是"跟我有关的那几条"。**总结是它替你读，提取才是它替你干活。**

---

## 第二版指令：把视角、格式和红线全交代清楚

```
你是一位面向普通员工的劳动法顾问。

【材料】我给你的是《中华人民共和国劳动合同法》全文（2012 年修正版，共 98 条）。

【任务】以一名普通企业员工的视角，从中挑出与下面四个时刻直接相关的条款：
① 入职签合同   ② 试用期   ③ 主动离职   ④ 被公司解除或裁员

【产出格式】每条一行，按这个格式写：
  【条款号】一句话说清它规定了什么（大白话，不要复述法条原文）→ 对我意味着什么

【红线】
- 只依据我给你的这份文件回答。文件里没写的，直接写「本法未规定」，
  不要用你知道的其他法律法规补充，也不要做合理推测。
- 每条必须给出准确的条款号，我会逐条回原文核对。
- 拿不准的标【待核实】，不要给一个听起来完整的答案。
```

三条红线各自在防一件事，缺哪条都会漏掉一类问题：

- **第一条防"用脑子里的知识补文件里没有的"**。这是长文档任务里最隐蔽的错误，后面有实测。
- **第二条防"没法核对"**。要求标条款号，等于逼它把每句话都挂回原文，你才有地方去查。
- **第三条防"流畅地含糊"**。不给这句，AI 倾向于把每个问题都答满，宁可编一个完整答案也不愿意说不知道。

---

## 真实产出

按第二版指令跑出来的结果，节选其中八条：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:0 0 88px;">条款</div><div style="flex:1;">说白了就是……</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:0 0 88px; color:#2D5A3D; font-weight:600;">第十九条</div>
    <div style="flex:1; color:#444;">试用期长度有<b>硬上限</b>：合同一年以内最多试用 1 个月，一到三年最多 2 个月，三年以上或无固定期限最多 6 个月。同一家公司对同一个人<b>只能约定一次</b>试用期。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:0 0 88px; color:#2D5A3D; font-weight:600;">第二十条</div>
    <div style="flex:1; color:#444;">试用期工资不得低于同岗位最低档工资或合同约定工资的 <b>80%</b>，且不得低于当地最低工资标准。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:0 0 88px; color:#2D5A3D; font-weight:600;">第二十五条</div>
    <div style="flex:1; color:#444;">除了<b>专项培训服务期</b>（第二十二条）和<b>竞业限制</b>（第二十三条）这两种情况，公司不能跟你约定任何其他名目的违约金。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:0 0 88px; color:#2D5A3D; font-weight:600;">第三十七条</div>
    <div style="flex:1; color:#444;">主动辞职提前 <b>30 天</b>书面通知即可，试用期内提前 <b>3 天</b>。不需要公司"批准"。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:0 0 88px; color:#2D5A3D; font-weight:600;">第三十八条</div>
    <div style="flex:1; color:#444;">公司没足额发工资、没依法缴社保、规章制度违法损害你权益的，你可以<b>直接解除合同</b>；按第四十六条，这种情况下走人<b>还能拿经济补偿</b>。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:0 0 88px; color:#2D5A3D; font-weight:600;">第四十二条</div>
    <div style="flex:1; color:#444;">这几种情况公司<b>不能</b>按第四十条、第四十一条解除：孕期产期哺乳期、规定医疗期内、工伤丧失劳动能力、在本单位连续工作满 15 年且距退休不足 5 年。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:0 0 88px; color:#2D5A3D; font-weight:600;">第四十七条</div>
    <div style="flex:1; color:#444;">经济补偿按工作年限算，每满一年给一个月工资；满半年不满一年按一年算，不满半年给半个月。工资高于当地上年度月平均工资 3 倍的，按 3 倍封顶，年限最多 12 年。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:0 0 88px; color:#2D5A3D; font-weight:600;">第八十二条</div>
    <div style="flex:1; color:#444;">用工超过一个月还没签书面合同的，每月要付<b>二倍工资</b>；满一年还不签，视为已经订立<b>无固定期限合同</b>（第十四条）。</div>
  </div>
</div>
<p class="figcaption">每条都挂着条款号，这是后面能逐条核对的前提。</p>

---

## 翻车点：它答得最流畅的地方，文件里没有

我们把这份产出里的 **20 个条款号逐条回原文核对**，结果是全部对得上，没有出现引用错条款的情况。这次没翻车，但这不等于下次不会，核对这一步的成本极低，省掉它才是真的贵。

真正的坑在另一处。**去掉第一条红线再问几个问题，它会用自己脑子里的知识回答，而你以为它是从你给的文件里读出来的。** 三个实测例子，都可以自己去原文搜关键词验证：

<div style="border:2px solid #d9c4c4; border-radius:12px; padding:4px 18px 14px; background:#faf3f3; margin:18px 0;">
  <div style="font-weight:700; color:#9a4a4a; margin:14px 0 10px;">问"加班费怎么算"</div>
  <div style="font-size:14px; line-height:1.85; color:#5a4040;">
  它大概率会给你"平时 1.5 倍、休息日 2 倍、法定节假日 3 倍"。<br>
  <b>这三个倍数在这部法里一次都没出现过。</b>全文搜"百分之一百五十"是 0 次。第三十一条只写了"应当按照国家有关规定向劳动者支付加班费"，具体倍数在《劳动法》里，是另一部法。
  </div>
  <div style="font-weight:700; color:#9a4a4a; margin:16px 0 10px;">问"年休假有几天"</div>
  <div style="font-size:14px; line-height:1.85; color:#5a4040;">
  <b>"年休假""带薪年休假""病假"这三个词，全文出现 0 次。</b>这部法根本没管这件事，它归《职工带薪年休假条例》。
  </div>
  <div style="font-weight:700; color:#9a4a4a; margin:16px 0 10px;">问"竞业限制补偿给多少钱"</div>
  <div style="font-size:14px; line-height:1.85; color:#5a4040;">
  常听到的"月均工资 30%"这个数，<b>法条里没有</b>。第二十三条只说了"在竞业限制期限内按月给予劳动者经济补偿"，一个数字都没给。那个 30% 来自司法解释，不在你给它的这份文件里。
  </div>
</div>
<p class="figcaption">共同点：三个答案本身在现实中不算错，但它们不是从这份文件里读出来的。你要的是"这份文件说了什么"，拿到的却是"AI 知道什么"。</p>

这就是那条红线存在的意义。加上"文件里没写的直接写「本法未规定」"之后，同样的三个问题，它会老实告诉你本法未规定，并提示你该去查哪部法。**这个差别不影响答案好不好听，只影响你敢不敢拿去用。**

---

## 结果与边界

**时间**：人工通读 1.18 万字、边读边挑条款，实测约 1.5 小时。这次全流程约 20 分钟，其中 12 分钟在写指令和读产出，8 分钟在核对 20 个条款号。文件越长，这个差距越大，因为核对的成本只跟结论条数有关，跟文件长度无关。

**质量**：结论的可靠性完全取决于你核不核对。不核对的话，你拿到的是一份看起来很专业、但真假不明的清单。

**必须自己做的部分**：把条款套到自己的具体情况上。文件能告诉你"经济补偿每满一年给一个月工资"，但你这一年算不算满、你的月工资口径怎么定，这些是判断，不是检索。真要拿去跟公司或仲裁较真，找专业人士。

**方法的适用范围**：这套做法依赖文档有明确的编号结构，法律、国标、合同条款、公司管理办法都适用，因为每条结论都能挂回一个编号。会议纪要、调研报告这类没有编号的长文档，核对成本会高不少，得把红线改成"每条结论后面附上你依据的原文句子，一字不改"，靠原句而不是编号来核对。

---

## 扩展阅读

- [《中华人民共和国劳动合同法》全文（2012 年修正）](https://fgk.chinatax.gov.cn/zcfgk/c100009/c5193025/content.html) · 国家税务总局政策法规库（本文实测所用的原文来源）
- [中华人民共和国劳动合同法](http://www.npc.gov.cn/npc/c1773/c2518/c12898/201905/t20190523_46320.html) · 中国人大网
