---
title: PPT 场景：怎么用 AI 做 PPT
description: 国内外主流 AI 做 PPT 工具横评：豆包、Coze、美图设计室、NotebookLM、Claude Code，附提示词模板
---

# PPT 场景：怎么用 AI 做 PPT

> 预计阅读时间：10 分钟 · 适合需要用 AI 制作汇报 PPT 的所有人

说实话，研究了一圈国内外做PPT的工具，如果把场景限定为“免费”+“不翻墙”，那基本国内能用的AI工具乏善可陈，但如果降低下要求，仅仅是做一个极简风格的汇报PPT，倒是可以推荐几款。

首先，如果你是想“一句话做一份PPT”，这篇推荐不适合你，因为我理解中做PPT的前提是你要有需要讲的内容，即使没有形成PPT大纲，至少你也要知道自己打算讲什么，很多一句话生成PPT的AI工具也基本做不到文稿的一致性，哪怕你规定了内容，他也会自由发挥。

所以在满足整体一致性的前提下，又支持一定程度的修改，才是我们值得去用的工具。

那么我们就以一段打算讲的内容文稿为例，代入到以下工具中看看效果吧：

:::info 示例文稿（可直接代入工具测试）

PPT主题：我做了一个零门槛的AI学习平台

分享人：XXX | 2026.04.24开言

【封面页】

我做了一个零门槛的AI学习平台

非技术背景如何学习和使用AI

【第1页 缘起】

2026年AI变化太快，两周内国内外发布七八个新模型

作为非技术背景的普通人，我决定亲自走一遍AI学习这条路

【第2页 我做了什么】

解除限制，把市面上的AI都用一遍

换M5芯片Mac，订阅Claude Max、GPT、Codex

测试豆包、DeepSeek、智谱、Kimi、MiniMax等国内模型

参加北京AI大会，看到虚拟偶像与真人同台演出

【第3页 用AI的五个阶段】

阶段1 兴奋：一周烧掉1.85亿Token

阶段2 迷茫：豆包暴力删文件，AI不可全信

阶段3 找到节奏：组建AI矩阵

阶段4 焦虑：付费用量根本用不完

阶段5 反思：什么时候用AI最快乐

【第4页 我的AI矩阵】

大脑：Claude（写作、UI、复杂推理）

总执行：Claude Code（终端搞定一切）

技术打手：Codex（硬骨头专用）

日常辅助：豆包（截图提问、生成PPT）

【第5页 五个判断】

1. AI还在猛踩油门，AGI不远了
2. AI正在侵入式靠近普通人
3. 用好工具，会让渡部分能力（写字能力正在消失）
4. 稀缺的是审美、创意、思考
5. 信息进入黑暗森林，信息源比信息更重要

【第6页 学习平台介绍】

定位：信息源，不是权威教材

特点：内容可追溯、面向小白、图文为主

栏目：认知 / 零基础上手 / AI热点 / 新闻 / 前沿 / 编程

搭建：5-6个工作日完成，全程没手写一行代码

【第7页 两个学习原则】

学新不学旧：3月的课在4月已经过时

用实不用虚：先有需求再用AI，而不是先有AI找需求

【第8页 接下来】

学习平台持续更新

零门槛AI学习社群

实战训练营（20-30人，会员费用可报销）

【结尾页】

AI只会越来越强

但人关注的永远是自己的生活和工作

想清楚需求和目标，AI才是你的工具

:::

# 一、豆包做PPT，纯免费国产AI应用里最实用的

第一步，我们先试试把之前的文档直接丢给豆包：

![](/images/stage-4/U8UkbyeBJoiZ2sxO0bNcs52znAf.png)

豆包自己思考后确认了不需要修改我的文字稿，但实际上还是忍不住在我文稿基础上做了部分补充，好在我的内容都没丢，尚且可以接受，至于美观度，只能说非常基础

![](/images/stage-4/OoDmbaMeNooDyux41vocP2lnnvb.png)

![](/images/stage-4/MmhSb7gpGoP0FAxMXsHchyPQnzf.png)

好在有AI修改环节，可以点击每页的AI编辑图标来提出你的修改需求，也可以直接选择直接修改

![](/images/stage-4/Ser5bA0EpoLt8fxfk5ccE1iTnIe.png)

我让他去掉多余描述，调整排版，基本都做到了，虽然按照我的文本做了些发挥，但意思还是一样的

![](/images/stage-4/SQGAbTvS7ocwbQxxhCdc3a9JnAc.png)

如果你真的一个字都不想让豆包改，那就在一开始约定好纪律，豆包的指令遵从性会变好很多

风格你也可以做要求，豆包内置了一些基本的风格，比如我规定了极简黑，那豆包就会按这个风格去筛选模版

![](/images/stage-4/BxeMbsDgAo1NvqxwWwvcvTGnndf.png)

让我们再看下生成效果，基本做到了可以直接用的程度，没有太高的审美要求的话，日常就够了

![](/images/stage-4/HOEmbfyDKoNSFtxZWTccEmGvnFd.png)

如果你发现指令遵从还是有问题的话就加强下提示词约束，直接复制粘贴使用以下约束就可以，但实际验证下来，页面多了豆包执行的一致性就会下降，好在整体理解还是正确的，哪页没遵从，再具体改哪页

:::tip 提示词模板（直接复制使用）

帮我做一份PPT，请严格遵守以下规则：

【内容铁律】

- 下面提供的每一页内容是"成品"，不是"素材"
- 你的工作只是排版，不是创作
- 禁止：改写、润色、扩充、续写、概括、调整顺序
- 禁止：把短句变长句，把长句变短句
- 禁止：替换我用的词为"更专业"的说法
- 标点、数字、英文大小写、特殊符号全部原样保留
- 如果觉得某页内容不够"丰满"，请保持原样，不要补充

【页数】

严格按下面的页数生成，不要增加、不要拆分、不要合并

【生成后必须自查】

逐页对比原文，告诉我：

1. 每一页是否一字未改
2. 如果有任何修改，请明确指出改了什么、为什么改

内容：

[粘贴你的内容]

:::

如果你还有图片要加的话，直接在豆包的界面操作插入图片和调整排版就可以，其他要加、要改的同理

![](/images/stage-4/CZeGb9ZY5oRbhtxvKwIcbRpLnFh.png)

做好后直接下载，没有水印，这点好评

作为对比，我们看看千问会怎么样

![](/images/stage-4/FMtTbvBMDolec6xZE55cN5Jknjb.png)

做的非常快，但是仔细看，在我已经给了比较详细PPT大纲的情况下，70%左右遵循了文稿，但依然做了很多自由发挥，还漏掉了我的一些点，比如我的PPT大纲里写的是五个判断，结果这里只给我保留了四个判断。这就是为什么我不推荐千问，因为我用AI做PPT就是为了图省事，结果又要检查文字、又要重新排版、又要手打补内容，这个我觉得还不如我自己手搓呢。

至于Kimi，现在收费收的已经丧失理智了，你免费根本就没资格排队进去做PPT，直接劝退。

# 二、Coze做PPT，免费积分也可以做的不错

同上，我们还是先试试把之前的文档直接丢给coze：

![](/images/stage-4/Uq8mbztSsoXQsQxkjugc9JN1njd.png)

比豆包省心多了，一致性很好，风格也比较好看

![](/images/stage-4/Wnblb9umMo6RfFxITYLcja1cn6g.png)

可以直接针对具体某一页进行描述修改，也可以操作界面里的插入、擦除、无痕改字

![](/images/stage-4/FlX2bJMPTojkZsxpm9zcNx6lnhb.png)

免费积分导出会有一个小水印，还可以接受

![](/images/stage-4/DBhNb3bsMohPwYx0lsvcA31Onpw.png)

![](/images/stage-4/O3TEbQ99Ro3aUJx91E0cQZIdnxA.png)

# 三、付费工具谨慎推荐

各家收费策略不一而足，大都卡在下载界面就要付费，我觉得完全不值，这里只推荐一个可以免费下载，带有水印的工具：美图设计室-LivePPT

先放链接，这个工具你真有可能搜不到或者进错地方：[美图设计室LivePPT](https://www.designkit.cn/ppt/edit)

然后我们还是直接把文档粘贴进去

![](/images/stage-4/M6iNbyMQwopr3xxNLimc9EaHnFg.png)

可以选是否需要AI扩写或精简原文，这点很好，我们直接点保留原文

![](/images/stage-4/C4AmbVwWgo2N16x94PTcv3mUnFh.png)

接下来是选择模板，不能说审美很顶尖，但也还算中上可用的程度

![](/images/stage-4/Y8aYbyARaoUxzdxv2XmcWICxnuS.png)

接下来很快就可以生成一份ppt，整体还不错，缺点是比较套模板，好处是有大量的修改工具

![](/images/stage-4/X7sJbmQgmopnk6x621YcSVCDnvd.png)

免费版会有一个水印，但好歹能下载，也还可以接受

![](/images/stage-4/TQtQbqqNUoUN5Qx7i1tcs5ZOnWd.png)

![](/images/stage-4/MbMObMHEOoEpSbx1fOgc8Hkknsc.png)

# 四、海外免费工具推荐

*需要你会魔法上网

讲真海外工具收费感觉也非常狠，完全免费的只推荐Notebooklm，效果也是独树一帜的

首先你要有一个谷歌账号，登录进入：https://notebooklm.google/，选择新建笔记本

把我们准备好的内容复制进去，这些内容就会成为一个知识库来源

![](/images/stage-4/Ssd7b2sj8oVmbdxyNT6csoxvnFe.png)

直接点击右边的“演示文稿”，Notebooklm就会生成一份PPT

![](/images/stage-4/W4OVbOareoV3BmxJg2FcE6ZknMf.png)

等他完成后我们来看看效果

你不得不说，虽然他也在自由发挥，但效果真的很好

![](/images/stage-4/O9L8bSmFdo2eXtxhQPich3Jbnmd.png)

![](/images/stage-4/ILHVbI7y6ob9bQxKO2rcGFalnoh.png)

支持免费下载，下载后只有右下角有一个小小的logo

![](/images/stage-4/L11BbXTMuoQLABxYciAc4tJDnZe.png)

# 五、用Claude Code等Agent做PPT

这个时候你就可以调用Skill了，可以玩一些花里胡哨的风格，包括但不限于PPT格式，可以去做一些html格式的有更炫酷效果的展示材料，比如：杂志审美风格。我们通过公众号等途径找到一个杂志审美风格的skill，当你说“帮我做一份杂志风 PPT”就会触发，skill地址：github.com/op7418/guizang-ppt-skill

把skill粘贴给你的agent，让他直接安装：

![](/images/stage-4/XJYibQ8GfoC4DLxRmzWcwf9enm6.png)

给他固定的文案（这里我用的是其他文案，跟前面的示例不太一样，懒得改了家人们），并规定不要修改，他会询问你场景、时长、约束等等，回答后就会开干

![](/images/stage-4/AE7AbTq0Mo4FipxTtiNcCZRjnSe.png)

![](/images/stage-4/U49ubxSuioK2eZx922HcALZ1nhl.png)

产出效果还不错，文案也没有改动。

首页是有流动效果的。

![](/images/stage-4/YxNhbaqubofDVKxAngscWAQYn1F.png)

![](/images/stage-4/El2TbA8YToGCWqx6aysczUx6nzf.png)

![](/images/stage-4/Fcuob0dVNoCzcZxfzVacA33vndf.png)

当然，如果你只是想做一个传统风格的PPT格式，也可以，直接告诉Claude code你要什么，PPT做好就直接躺在你指定的文件夹里啦

![](/images/stage-4/PJoKb7WMUoosikx0T1JcyDiunTY.png)

![](/images/stage-4/IHBhbOV7voTDyqxv7QScKRPfnYg.png)

![](/images/stage-4/TcEMbYOY2o4utjxoJZxcmB2fnNb.png)

![](/images/stage-4/CgOab0X0PoYIvqxGXllcapi6nGh.png)

![](/images/stage-4/HwXUbdf35oyCrZxcQUvcHiPynPf.png)

Claude Code目前支持不翻墙下载（可以自行搜索一下，本篇文章是PPT主题就不放相关教程啦），也可以接国内大模型，如果你愿意花点时间研究，装一个绝对不亏，当然如果你会翻墙，又愿意花钱的话，能直接有一个桌面端的 Claude 或者 Codex（升级到5.5之后可以说是全能了），做PPT就太easy啦，还可以用ChatGPT定制精美的单页。

这篇文章先分享到这里啦~，希望对大家有帮助！
