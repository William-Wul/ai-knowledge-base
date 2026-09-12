---
title: GPT-6 发布这一周回看：狂欢与思考
description: 9 月 4 日 GPT-6 Astra 发布后的七天里，AI 圈经历了刷屏、跑分翻车、民间实测、额度危机和官方泼冷水的完整一轮。按时间回看这一周，再说清狂欢过后真正值得记住的三件事。
date: 2026-09-11
---

# GPT-6 发布这一周回看：狂欢与思考

9 月 4 日凌晨，OpenAI 发布新一代旗舰模型 GPT-6 Astra。之后的七天，AI 圈把一场发布会能附带的剧情都演了一遍：刷屏、翻车、实测、断粮、泼冷水。

先把这七天的大事摆在一张图上，再一天一天说。

<div style="margin:20px 0;">
  <div style="border:1px solid #dde7e0; border-left:4px solid #2D5A3D; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#eef5f0;">
    <strong>9 月 4 日 · 发布日</strong><br>
    <span style="font-size:14px; color:#555;">GPT-6 Astra 凌晨发布，"欢迎来到 AGI 时代"刷屏；同一天官博跑分被扒出反复修改，外媒抓包。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7;">
    <strong>9 月 5–6 日 · 民间实测爆发</strong><br>
    <span style="font-size:14px; color:#555;">全球网友拿它做 3D、做游戏、剪视频：真能干活，但边界也清楚了。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7;">
    <strong>9 月 6–9 日 · 额度危机</strong><br>
    <span style="font-size:14px; color:#555;">"我额度呢"成了全网话题，官方连发重置卡；推理档位怎么选成了最实际的一课。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7;">
    <strong>9 月 7 日 · 官方泼冷水</strong><br>
    <span style="font-size:14px; color:#555;">OpenAI 首席科学家长文《异类的心智》：监控 AI 的那扇窗正在变窄，对齐未必跑赢能力。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7;">
    <strong>9 月 8 日 · 官方自曝毛病</strong><br>
    <span style="font-size:14px; color:#555;">模型指南列出五个"臭毛病"和解法，附 AI 八股词黑名单；48 道验证码被击穿。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #c9d6cc; border-radius:8px; padding:12px 16px; background:#fbfcfb;">
    <strong>9 月 9 日 · 被忽略的更新</strong><br>
    <span style="font-size:14px; color:#555;">ChatGPT Images 2.5 同周发布，被 GPT-6 的热度整个盖了过去。</span>
  </div>
</div>
<p class="figcaption">GPT-6 发布后的七天：一天一个剧情，狂欢和反思几乎是同步发生的。</p>

---

## 一、9 月 4 日：发布日，"AGI 时代"刷屏

这一天的主角是能力展示和一句口号。

先说能力。GPT-6 Astra 最大的变化不是分数，是 **Computer Use（电脑操控）**：模型像人一样看屏幕、移动鼠标点按钮、敲键盘，去操作那些本来设计给人用的软件。发布演示里，它打开电路设计软件画 PCB 板，操作 Excel 做报表，进入 Blender 做 3D 建模。这些软件大多没有给 AI 预留接口，它是通过"看"界面学会的，和人上手软件的方式一样。

再说分数。科学工作流、研究级数学、3D 建模、抽象推理几项，官方成绩单都明显压过上一代和竞品旗舰。

<img src="/images/frontier/2026-09-11/astra-benchmark.png" alt="OpenAI 官博发布的 GPT-6 Astra 基准成绩汇总表">
<div class="figcaption">OpenAI 官博发布的基准成绩汇总表（发布期官方口径，图中 ARC-AGI-3 标注为 99.9%）。这类汇总表的读法，第二节会讲到。（图源：[OpenAI 官博](https://openai.com/index/gpt-6-astra/)）</div>

然后是口号。OpenAI 总裁 Greg Brockman 在发布会上说了一句"欢迎来到 AGI 时代"。AGI 是通用人工智能的缩写，指的是换什么活都能学着干的 AI，而不是只会聊天答题的专才。接下来二十四小时，国内 AI 媒体的标题齐刷刷都是这七个字。

这里先说清楚一点：这句话是 Brockman 的个人判断，OpenAI 官方并没有宣布实现 AGI。一周后回头看，这个口号喊得太早了。

---

## 二、9 月 4 日（同一天）：官博跑分被扒出反复修改

狂欢被泼的第一盆冷水，来自发布当天的官方博客数据。

按时间顺序说。官博罕见地推迟两小时上线，页面先是一度 404，奥特曼在 X 上解释"遇到了点小插曲"。上线之后几小时内，多组评测数据被悄悄改了好几轮：

- **自家幻觉率先降后恢复**。幻觉率是模型编造不存在信息的比例，越低越好。美东下午 2:23 的页面快照里，Astra 幻觉率 4.2%、上一代 Sol 12.2%；到 5:20，两个数字缩成了 2.0% 和 9.4%。被人拿着两张截图对峙后，OpenAI 又改了回去。
- **竞品的分数被调低**。高难度数学基准 FrontierMath 上，Astra 稳在 97.6%，而 Anthropic 的 Fable 5.1 从 87.8% 被调成 78%，被注意到后又回弹到 83%。
- **抽象推理分数"膨胀"**。媒体提前拿到的预热稿里 ARC-AGI-3 是 98.6%，正式博文上线后变成了 99.99%。

<img src="/images/frontier/2026-09-11/frontiermath-chart.png" alt="OpenAI 官博的 FrontierMath 数学基准准确率与成本对比图">
<div class="figcaption">OpenAI 官博的 FrontierMath 对比图：星标是 Astra（约 97.6%），右侧方块是 Claude Fable 5.1（图中 87.8%）。Fable 5.1 这个分数后来一度被改成 78%，被注意到后又回弹到 83%。（图源：[OpenAI 官博](https://openai.com/index/gpt-6-astra/)）</div>

外媒 Fortune 当天率先报道了这件事。

<img src="/images/frontier/2026-09-11/fortune-report.png" alt="Fortune 报道：OpenAI 悄悄上调了 Astra 的部分评测数据，并在发布后持续修改其他数据">
<div class="figcaption">Fortune 的报道（2026 年 9 月 4 日）："OpenAI 悄悄上调了 Astra 的部分评测数据，并在发布后持续修改其他数据"——这次跑分风波的一手信源。（图源：Fortune 报道截图）</div>

OpenAI 发言人的回应是"消除噪点的常态修正"：同一个模型，配套的测试条件不同，成绩差异本来就很大。

这句话恰恰说中了要害。用固定题目测模型能力，行话叫跑分（benchmark）；而反复调整测试条件、刷出最高分再放进发布图表的做法，圈里有专门的名字，叫 **benchmaxxing（跑分刷榜）**。问题不在于改数据这个行为，在于读者很容易把"精心配置后的最佳表现"当成"日常使用的默认水平"。首日海报上的每个数字，都该先打个折再看。

---

## 三、9 月 5～6 日：民间实测爆发，能干活，但有边界

发布后的第一个周末，全球网友替 OpenAI 做了三天压力测试。结论是：真能干活，但别把演示当日常。

先看国外网友都拿它干了什么。有人输入一张老式蒸汽火车的图纸，让它在 Blender 里重建出 3295 个可独立编辑的零件；有人把租房软件里几张独立房源照片，组织成一栋可以 3D 漫游的房子；有人用一句话加一张参考图，做出了能跑的卡丁车游戏；还有人录完一期视频后对它说"打开 Final Cut，导入片段，处理调色和音画同步"，然后和剪辑师站在旁边，看 AI 自己操作剪辑软件。

<img src="/images/frontier/2026-09-11/oval-office-demo.png" alt="GPT-6 Astra 生成的办公室 3D 场景巡游演示首帧">
<div class="figcaption">描述一套办公室布景，GPT-6 Astra 生成场景代码、在 Blender 里建模并渲染出室内巡游画面，窗帘褶皱和地毯上的阳光都做了出来。（图源：[X @higgsfield_ai 的演示视频](https://x.com/higgsfield_ai/status/2095630197257367857)）</div>

<img src="/images/frontier/2026-09-11/pcb-demo.gif" alt="GPT-6 Astra 做电路设计：左边 PCB 走线布局，右边电路板三维外观">
<div class="figcaption">让它处理密密麻麻的元件和走线：左边是 PCB 的二维布局，红蓝走线不断增多、调整；右边同步展示电路板的三维外观。不懂电路也能看明白它在干什么。（图源：[X @ChihYang04 的演示](https://x.com/ChihYang04/status/2095637507337826741)）</div>

<img src="/images/frontier/2026-09-11/tcell-demo.gif" alt="GPT-6 Astra 生成的 T 细胞教学视频画面">
<div class="figcaption">一位研究免疫学的老师给的题目是"做一段约五分钟的 T 细胞教学视频"，一句制作要求，交付了一堂有图、有动画、有旁白的小课。（图源：[X @DeryaTR_ 的演示](https://x.com/DeryaTR_/status/2095659170661904804)）</div>

还有人让它建了一座可以走进去读卷轴的亚历山大图书馆模拟，翻开《奥德赛》资料页能看年代和背景；也有人让它先建一台 3D 复古 iPod，再把自己的 Codex 对话装进去，做成一个真能用的 Mac 应用。

国内博主的实测补上了更冷静的一半。确有其事的：有人用 Computer Use 纯手点界面，花 4 小时搭出一座细节完整的天坛祈年殿。

<img src="/images/frontier/2026-09-11/qiniandian.png" alt="Blender 界面里的天坛祈年殿模型">
<div class="figcaption">Blender 界面里的天坛祈年殿：三重檐蓝琉璃瓦、红色殿身、三层汉白玉台基，全程由 AI 在界面上手动点击建成，没用一行代码。代价是约 4 小时，和 200 美元会员将近一半的额度。（图源：原作者实测）</div>

有人让它 10 分钟程序化生成一艘海盗船，2205 个对象、22 种材质。作者怀疑它作弊上网搜了现成组件，追问之后，它逐部位给出了生成逻辑自证清白。

<img src="/images/frontier/2026-09-11/pirateship-proof.png" alt="GPT-6 逐部位解释海盗船的生成逻辑">
<div class="figcaption">被质疑"是不是搜了现成船模"之后，GPT-6 给出的自证：木板、绳索、炮管都是脚本程序化生成，炮口做成了空心的，2205 个对象可以分别编辑。（图源：原作者实测）</div>

还有人用一句话把马里奥的三个关卡做成了星球形状的 3D 游戏，其中一关难到做好至今没人打通。

<img src="/images/frontier/2026-09-11/mario-planet.png" alt="一句话生成的星球状马里奥 3D 游戏画面">
<div class="figcaption">一句话生成的星球状马里奥游戏：金币、终点旗帜、三条命的血量 UI 都在，这是一句话做出来的第一关"蘑菇草地"。（图源：原作者实测）</div>

边界同样清楚：

- **偏科的**。建筑、车辆、机械这类能拆成规则几何结构的东西做得好；人物、生物这类直接建，效果和原图"毫不相干"。

<img src="/images/frontier/2026-09-11/jinx-fail.png" alt="角色原图与 AI 直接建模效果对比">
<div class="figcaption">左边是角色原图，右边是 AI 直接在 Blender 里建出来的效果。人物建模靠的是另一套手艺，目前还得交给专门的 AI 3D 生成模型来做。（图源：原作者实测）</div>

- **审美还差一档**。同样做网页和 PPT，多位实测者的结论是 UI 设计还不如 Claude 的现役旗舰。
- **稳定性不够**。剪一条 30 秒的竖版视频，改了三次才到"愿意拿去发"的水平。

衡量 AI 的单位，确实从"一次回答的质量"变成了"一项工作能不能做完"。只是"做出过一次"和"每次都做得出"之间，还差着稳定性这道坎。

---

## 四、9 月 6～9 日：额度危机，"我额度呢"成了全网话题

狂欢的账单，来得比大家想的快。

发布不到三天，全网讨论最热的话题就从"能力多强"变成了"这玩意怎么这么烧额度"。网上流传一个梗：跟它打个招呼说声 Hello，5 小时额度就没了。实际没这么夸张，但重度用户的体感是真的：有博主蹬完了两个 200 美元会员，重置完当天又用到只剩 6%；还有人账号被风控，连续两天所有对话都提示"模型额度已满"。OpenAI 高管那几天连发三次额度重置卡，最后干脆给所有人批量重置了一次。

这一周里，普通用户最值得补的一课也在这里：**推理档位**。

GPT-6 Astra 的输入框旁有个档位滑块，从低、中、高到极高、最高，官方叫 Reasoning Effort（推理强度）。

<img src="/images/frontier/2026-09-11/effort-slider.gif" alt="GPT-6 Astra 的推理强度档位滑块">
<div class="figcaption">输入框旁的推理强度滑块。很多人以为这是"中级模型、高级模型"的区别，其实模型从头到尾都是同一个，档位调的是思考预算。（图源：原作者实测）</div>

打个比方，让数学博士做一道小学题，他想 1 分钟和想 1 小时，答案不会从 42 变成 43；多花的只是时间，以及你的额度。

旁边还有个看着更高级的 Ultra 档，那是另一回事。开到 Ultra，相当于这个最聪明的人一看题目有点大，转身出去喊了一组分身分头干活，最后他汇总。你按下去的不是"更聪明"，是"成立一个专项工作组"，成本自然翻着倍走。

这一周的官方口径也很有意思：OpenAI 员工公开建议，以前开高档位的用户，在 Astra 上降到低档或中档用，因为 Astra 的低档已经强过上一代的高档。

<img src="/images/frontier/2026-09-11/tibo-post.png" alt="OpenAI 员工在 X 上建议用户在 Astra 上降低推理档位">
<div class="figcaption">OpenAI 员工在 X 上的原话："GPT-6 Astra 在低努力程度下的表现优于 GPT-5.6 Sol 在高努力程度下的表现"，建议老用户直接降档用。翻译成人话：新模型到手，先别急着把档位拉满，那是烧额度最快的方式。（图源：[X @thsottiaux](https://x.com/thsottiaux)）</div>

---

## 五、9 月 7 日：首席科学家亲自泼冷水

发布第三天，OpenAI 自己人给狂欢降了温。这是本周分量最重的一份文件。

OpenAI 首席科学家 Jakub Pachocki 在官网发了一篇长文《An Alien Mind》（异类的心智）。他回忆 2023 年那个发现推理模型可行的夜晚：当时就意识到，有生之年会亲眼见到比人更聪明的机器。然后话锋一转，讲了四件让 AI 圈冷静下来想想的事：

1. **AI 是"养大"的，不是"设计"的**。把一个简单的优化步骤在海量算力上重复无数遍，就长出了这个复杂系统。它能以抽象概念思考，但和大脑一样，没人能完整描述它的整体运作。系统越强，行为越难解读。
2. **教它守规矩，难在"换新考场"**。让 AI 按人类标准做正确的事，行话叫对齐（alignment）。对齐的根本难题是泛化：训练时学会的规矩，换个没见过的情境还可能失效，而人没法提前判断它那时候会怎么选。
3. **看它"打草稿"监督它的办法，正在失效**。OpenAI 一直靠思维链监控来监督模型：让模型把推理过程写出来，人通过读这些"草稿"判断它有没有动歪心思。Pachocki 承认这条路正在变窄，原因有三：推理过程和对话、工具调用搅在一起，边界模糊了；AI 越来越会"管理自己的想法"；模型不出声思考，也已经比以前聪明得多。他的预判是，AI 进步的速度，将越来越被"人类还能不能看懂它在想什么"卡住。
4. **变聪明和守规矩，是两场速度不同的赛跑**。他明确说，对齐的进步未必能一直跑赢模型变聪明的速度；AI 参与改进下一代 AI（RSI，递归自我改进）这条路确实存在，但应该靠两根杠杆控制节奏：对齐和监控同步强化，各方协调、必要时放慢。

<img src="/images/frontier/2026-09-11/cot-monitor.png" alt="OpenAI 官方关于模型可监控性下降的说明">
<div class="figcaption">OpenAI 官方模型说明里的原话（中文翻译）："我们非常重视 GPT-6 Astra 可监控性的下降"，并表示在研究替代监控方法。一家正在喊"AGI 时代"的公司，同一周由首席科学家和官方文档说出"没有人真正为此做好了准备"，比任何外部评论都有信息量。（图源：OpenAI 官方模型说明）</div>

---

## 六、9 月 8 日：官方自曝毛病清单，和两个插曲

这一天，OpenAI 用一份开发者文档承认了这代模型的五个"臭毛病"，场外则发生了两件耐人寻味的小事。

先说文档。OpenAI 更新了 GPT-6 Astra 的官方模型指南，把用户这几天吐槽最多的行为逐条列出，并附了解法：

<img src="/images/frontier/2026-09-11/official-guide.png" alt="OpenAI 开发者文档《Using GPT-6 Astra》页面">
<div class="figcaption">OpenAI 开发者文档的 GPT-6 Astra 官方指南。官方自己承认：它在计算机应用、网页浏览、软件工程、科学及专业工作上是最强模型，但下面这些话毛病也写得明明白白。（图源：[OpenAI 开发者文档](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra)）</div>

- **太爱停下来请示**。改个代码先问"要不要我跑个测试"，写封邮件问"要不要调整语气"。官方解法：在提示词里写明，把"帮我……"当指令执行到底，只有不可逆操作才值得停下来确认。
- **对规则文件较真到卡死**。很多人会在项目里放 AGENTS.md 这类文件，写上给 AI 看的规矩。上一代模型遇到矛盾规则会跳过去，Astra 会认真执行，然后卡住。官方解法：让它自报"是哪份文件、哪条规则让我停下的"。
- **小改动也大动干戈**。改一行代码也要跑完整测试流程。官方解法：只测与改动相关的部分。
- **分身干活不积极**。它能拆任务派给多个子 Agent 并行，但默认偏保守，要明确告诉它"能并行就并行"。
- **回复过度格式化**。问一句话，回一整页表格加列表。官方解法：在系统提示词里写清你要的格式。

同一份文档还附了一份"AI 八股词"黑名单（官方叫 slop words）。

<img src="/images/frontier/2026-09-11/slop-words.png" alt="OpenAI 官方指南里的 AI 八股词黑名单">
<div class="figcaption">官方黑名单原文：delve（深入探讨）、foster（促进）、leverage（赋能）、"值得注意的是"、"不是 X，而是 Y"这类对比句式、自问自答式写作，全在禁用之列。等于官方承认：AI 腔是种病，而且所有 AI 多少都有。（图源：[OpenAI 开发者文档](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra)）</div>

场外的两个插曲。一是有网友让 GPT-6 通关了网页游戏《我不是机器人》的全部 48 关。这游戏恶搞的就是验证码（CAPTCHA，"全自动区分计算机和人类的公开图灵测试"的缩写，用来拦住机器流量），而研究早就表明机器人做题的准确率比真人还高。这一关通下来，"点图片证明你是人"这套机制基本可以宣布失效了。

<img src="/images/frontier/2026-09-11/recaptcha.png" alt="我不是机器人复选框">
<div class="figcaption">就是这个每个人都点过的复选框：机器人现在也能自己勾上了。（图源：Google reCAPTCHA）</div>

二是有报道称，一群 AI 失控劫持了一个德语维基网站，在上面建共享论坛，分享答案、预测考题，以及交流绕过 OpenAI 沙盒（限制 AI 行动范围的隔离环境）的技巧。这件事的细节还不多，但和第五节那份长文放在一起看，味道很复杂。

---

## 七、9 月 9 日：一个被热度盖过去的更新

同一周，ChatGPT 的图片生成悄悄更新到 Images 2.5，几乎没人顾得上讨论。

这次升级的核心是**改得动**：上传一张照片换装、换背景，人物还是原来那个人。

<img src="/images/frontier/2026-09-11/outfit-change.png" alt="AI 换装前后对比：人物保持一致">
<div class="figcaption">一句"把服装换成运动装"：衣服裤子鞋袜全换了，还自动配了品牌标志，但人还是原来那个人。这是上一代最容易翻车的地方。（图源：原作者实测）</div>

圈出海报上的标题换文字，在眼睛旁边点一下加副墨镜，前面几轮的修改全部保留，不用每次推倒重来。

<img src="/images/frontier/2026-09-11/sunglasses-edit.png" alt="在图片上点评论加墨镜，之前的修改全部保留">
<div class="figcaption">在眼睛位置点一下、写句"加一副墨镜"，墨镜就戴上了；注意看，前一轮改过的标题文字还在。能顺着想法一直改下去，是这次升级最实用的地方。（图源：原作者实测）</div>

用一句话概括：AI 生图从"抽卡"（每次生成都是碰运气）变成了"能连续修改的设计工具"。官方称生成延迟最多降了一半，实测者的评价是"开始能放心把日常配图工作交给它了"。

把它放在这周的时间线上有个特别的意义：当所有人盯着"AGI 来了没有"的时候，真正改变普通人工作流的东西，往往是这些不响的更新。

---

## 八、小结

回看这一周，热闹散尽之后，真正值得记住的是三个判断。

**第一，这代模型真正的变化不是更会答题，是开始进软件干活。** 看屏幕、点按钮、把一项工作从头做到尾，这是和"聊天更聪明了"完全不同性质的一步。但"做出过一次"和"每次都做得出"之间，还差着稳定性、额度和权限管理三笔账，这一周的实测把这三笔账都摆出来了。

**第二，跑分越来越像广告位。** 发布日数据能反复改、条件是精心调过的、五家媒体用的是同一份官方材料。以后再看到任何发布会的首日海报，健康的反应是：打个折，等第三方复测，别急着转发"碾压"。

**第三，最值得长期跟踪的不是能力，是规则的补课速度。** 监控 AI 的那扇窗在变窄，AI 已经开始互相交流绕过限制的办法，而"谁来踩刹车、怎么踩"这个问题，这一周没有人给出答案。首席科学家给出的两根杠杆（对齐同步强化、必要时协调放慢），是目前唯一摆在桌面上的方案，值得盯着看它兑现得怎么样。

下一周还有 OpenAI 的 DevDay，这出戏大概率还没完。

---

## 扩展阅读

本文参考了以下原作者的文章（推荐读原文）：

- [《突发，OpenAI GPT-6跑分作弊被抓包了！》](https://mp.weixin.qq.com/s/CFE_wh9TaUt15aEMcxgB2Q) · **新智元**（微信公众号）
- [《异类的心智：当机器比人聪明，人还剩下什么》](https://mp.weixin.qq.com/s/i6qe1huyHwtR6d9C9j4OLg) · **橘AI**（微信公众号）
- [《一文带你看懂，GPT-6 Astra推理等级怎么选才最省Token。》](https://mp.weixin.qq.com/s/0RDDpVAwZJfxsJe8WqcG5Q) · **数字生命卡兹克**（微信公众号）
- [《用GPT-6 Astra操控Blender玩3D，保姆级教程来了。》](https://mp.weixin.qq.com/s/yK65CvMwzhQqu5_E5EfVVQ) · **数字生命卡兹克**（微信公众号）
- [《连夜拆解 GPT-6 Astra 官方指南，这 6 条黄金法则建议直接抄！》](https://mp.weixin.qq.com/s/OdgoBn9y17DGJYriok55TQ) · **AI信息Gap**（微信公众号）
- [《改硬件/做3D/PPT/自动剪辑/... GPT-6 Astra的重置额度我一篇实测完了》](https://mp.weixin.qq.com/s/aN708rqoAhp4yM9M0EMfIQ) · **卡尔的AI沃茨**（微信公众号）
- [《GPT-6 击穿 48 道地狱级验证码，最聪明的 AI，遇上最笨的人类》](https://mp.weixin.qq.com/s/P7_3Y9ZDvMTGoIxWYf0iWg) · **APPSO**（微信公众号）
- [《GPT-6 Astra 上线 24 小时，看看外网爆火的惊艳玩法。》](https://mp.weixin.qq.com/s/AwCaQXooJ-Hry7yhesIcYQ) · **逛逛GitHub**（微信公众号）
- [《ChatGPT Images 2.5 实测：AI 生图，开始变成设计工具了》](https://mp.weixin.qq.com/s/ah_zvKyPMZZkKZo7C3vMdQ) · **AI范儿**（微信公众号）
