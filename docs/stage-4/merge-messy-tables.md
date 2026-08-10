---
title: 用 AI 合并几张对不上的表格：少说一句话，总额差 32%
description: 三张来自不同人的月度销售明细，单位、日期、列名全不一样，还藏着重复行和退款。从两版指令的差别到实测数字，完整走一遍并给出可复算的核对方法
---

# 用 AI 合并几张对不上的表格：少说一句话，总额差 32%

## 场景

月底，三个区的销售各发来一份 6 月明细，你要在下班前合成一张表，算出总额、排出销售排名、标出异常。

三份表来自三个人、三套系统，于是列名、日期格式、金额单位全都对不上。这活最烦的地方不在算，在"对"。

这次实测用的是我们准备的三张测试表，一共 50 行。数据是造的，但表格上的毛病是照着真实工作里最常见的四类问题设的：

<div style="display:flex; gap:12px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:200px; border:1px solid #dde7e0; border-radius:12px; padding:16px; background:#f6faf7;">
    <div style="font-size:15px; font-weight:700; color:#2D5A3D; margin-bottom:8px;">华东区 · 18 行</div>
    <div style="font-size:13.5px; line-height:1.8; color:#444;">
      列名「金额(元)」<br>
      日期「2026/6/11」<br>
      金额带千分位「59,631.30」
    </div>
  </div>
  <div style="flex:1; min-width:200px; border:2px solid #d9c4c4; border-radius:12px; padding:16px; background:#faf3f3;">
    <div style="font-size:15px; font-weight:700; color:#9a4a4a; margin-bottom:8px;">华南区 · 14 行</div>
    <div style="font-size:13.5px; line-height:1.8; color:#5a4040;">
      列名「销售额(万元)」<br>
      日期「2026-06-19」<br>
      <b>单位是万元，不是元</b>
    </div>
  </div>
  <div style="flex:1; min-width:200px; border:2px solid #d9c4c4; border-radius:12px; padding:16px; background:#faf3f3;">
    <div style="font-size:15px; font-weight:700; color:#9a4a4a; margin-bottom:8px;">华北区 · 18 行</div>
    <div style="font-size:13.5px; line-height:1.8; color:#5a4040;">
      列名全是英文「amount」<br>
      日期「6月1日」<br>
      <b>藏着 1 条完全重复的订单</b><br>
      <b>还有 1 条负数退款</b>
    </div>
  </div>
</div>
<p class="figcaption">四类问题：列名不一致、日期三种写法、单位混用、重复行与负数。三张表打开肉眼看都很正常。</p>

---

## 先判断：这活能不能交给 AI

能交，但要看你怎么交。这里有个区分决定成败：

**让 AI 用眼睛读表，和让 AI 写脚本算表，是两件完全不同的事。**

前者你拿到一个数字，无法判断它是算出来的还是估出来的。后者你拿到一段可以重跑、可以逐行检查的过程，数字是这个过程的副产品。格式统一、去重、按维度汇总，规则都很明确，天然适合后者。

真正不适合交出去的只有一件事：判断某条异常数据到底该怎么处理。那需要业务背景，后面会看到一个具体例子。

---

## 第一版指令：错得很安静

大多数人会这么写：

```
这是三个区的 6 月销售明细，帮我合并算一下总额，看看谁卖得最多。
```

这句话里没有一个字提到单位、重复、退款。AI 没有任何理由去怀疑这三件事，于是它把三列数字直接加起来，给你一个总额。

那个总额错了，而且**不会有任何提示**。

---

## 第二版指令：把要核对的事一条条写出来

```
【材料】三个 CSV 文件：华东区、华南区、华北区 6 月销售明细，来自三个不同的人。

【任务】合并成一张表，算出 6 月三区总销售额，并按销售代表汇总。

【怎么做】写一段 Python 脚本来完成，不要用肉眼读数相加。
脚本要先打印出你识别到的清洗规则，再输出结果。

【必须先核对这四件事，并把核对结果打印出来】
1. 三张表的金额列名和单位是否一致？只要有一张单位不同，先换算再合并。
2. 有没有完全重复的行？列出来，剔除后再算。
3. 有没有同一个订单号出现多次但内容不同的？列出来，不要自动合并，交给我判断。
4. 有没有负数金额？单独列出来，说明你是怎么处理的。

【红线】
- 不确定的地方不要自己拿主意，列出来问我。
- 给出总额时，同时给出参与计算的行数，方便我对。
```

关键差别在第三段。**第一版把结果交给 AI，第二版把核对清单交给 AI。** 你没法指望它主动怀疑单位不一致，但你可以要求它每次都检查一遍。

---

## 真实产出

脚本跑完的实际输出：

```
【第一步 清洗规则】
  日期格式发现 3 种：2026/6/11、2026-06-19、6月1日 → 统一为 2026-06-11
  金额格式发现 2 种：带千分位字符串「59,631.30」、纯数字 → 统一为数值

【第二步 各表读取】
  华东区  18 行   金额列「金额(元)」→ 单位换算系数 ×1
  华南区  14 行   金额列「销售额(万元)」→ 单位换算系数 ×10000
  华北区  18 行   金额列「amount」→ 单位换算系数 ×1

【第三步 异常检查】
  ⚠ 完全重复行，已剔除：SO30004 赵敏 37,711.16（来源 华北区）
  ⚠ 订单号重复但内容不同，未合并，请人工确认：SO30007
      华北区 6月11日 张伟 A1 基础版 3,020.30
      华北区 6月22日 赵敏 B1 企业版 -12,800.00
  ⚠ 负数金额（按退款处理，计入抵扣）：SO30007 赵敏 -12,800.00

【第四步 结果】
  有效行数：49（原始 50 行，剔除重复 1 行）
  三区合计：2,227,699.82 元（其中退款抵扣 -12,800.00 元）
    华东区  779,734.14
    华南区  715,390.00
    华北区  732,575.68

  按销售代表 Top 3：
    张伟  507,901.09
    杨磊  402,881.52
    李娜  289,014.42
```

有一处值得单独说：`SO30007` 这个订单号出现了两次，一次是张伟的 3,020.30，一次是赵敏的 -12,800.00 退款，人和产品都对不上。脚本**没有自作主张**把它们合并或剔除，而是列出来交给人判断。这条到底是退款录错了订单号，还是两笔不同的业务，只有你知道。这正是第二版指令里"不要自动合并，交给我判断"换来的。

---

## 翻车点：四个数字，全都长得像对的

同一批数据，三种错法各自会得到什么，我们都算了一遍：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:2;">情况</div><div style="flex:1.4; text-align:right;">得到的总额</div><div style="flex:1.4; text-align:right;">偏差</div>
  </div>
  <div style="display:flex; padding:12px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#f1f6f2;">
    <div style="flex:2; color:#2D5A3D; font-weight:700;">正确值</div>
    <div style="flex:1.4; text-align:right; color:#2D5A3D; font-weight:700;">2,227,699.82</div>
    <div style="flex:1.4; text-align:right; color:#2D5A3D;">—</div>
  </div>
  <div style="display:flex; padding:12px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:2; color:#444;">漏了万元换算</div>
    <div style="flex:1.4; text-align:right; color:#9a4a4a; font-weight:600;">1,512,381.36</div>
    <div style="flex:1.4; text-align:right; color:#9a4a4a; font-weight:700;">少算 32.1%</div>
  </div>
  <div style="display:flex; padding:12px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:2; color:#444;">没剔除重复行</div>
    <div style="flex:1.4; text-align:right; color:#9a4a4a; font-weight:600;">2,265,410.98</div>
    <div style="flex:1.4; text-align:right; color:#9a4a4a; font-weight:700;">多算 1.7%</div>
  </div>
  <div style="display:flex; padding:12px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:2; color:#444;">两个都漏</div>
    <div style="flex:1.4; text-align:right; color:#9a4a4a; font-weight:600;">1,550,092.52</div>
    <div style="flex:1.4; text-align:right; color:#9a4a4a; font-weight:700;">少算 30.4%</div>
  </div>
</div>
<p class="figcaption">四个数字都是七位数，都带两位小数，都很像一个正常的月度总额。没有任何一个会报错。</p>

**表格算错不会弹红字，它只会给你一个很像对的数。** 32% 的偏差如果混进一份发给管理层的月报，靠肉眼扫一眼是发现不了的，除非有人正好记得华南区大概该是多少。

那条 1.7% 的重复行更阴险。这种量级的偏差，你既不会在总额上看出异常，也不会在排名上看出异常，它只是让某个人的业绩多了三万七。

---

## 结果与边界

**时间**：50 行三张表，手工合并加核对实测约 40 分钟，这次约 10 分钟。行数越多差距越大，因为脚本的成本不随行数增长，手工核对的成本是线性涨的。

**必须自己做的部分**：`SO30007` 那种订单号撞车的情况怎么处理，是业务判断。好指令的作用不是让 AI 替你判断，是保证这类东西**一定会被摆到你面前**，而不是被悄悄算进总数。

**方法的适用范围**：这套做法要求 AI 能真正拿到文件。豆包这类工具支持上传文件后跑数据分析，WorkBuddy、Claude Code 这类能直接读本地文件的工具更顺手。如果只是在网页对话框里粘贴表格内容，行数一多就会被截断，那种情况下它是真的看不全，得到的数字更不可信。

**一句话记法**：别问它"总额是多少"，要问它"用脚本算总额，并且把清洗规则和异常都打印出来"。前者你只能选择信或不信，后者你可以自己复算。

---

## 扩展阅读

- [《WorkBuddy 实战蓝皮书》](https://workbuddy.homes/) · 甲木未来派、刘聪NLP、苍何、袋鼠帝AI客栈、摸鱼小李 共创（GitHub 开源项目，MIT 协议），其中的表格与数据分析章节有更多可直接套用的指令
