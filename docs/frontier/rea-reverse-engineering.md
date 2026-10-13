---
title: AI逆向复刻一切软件，解读爆火的REA
description: 开源项目 REA 把 AI 编程助手和专业逆向工具接在一起，让 AI 能拆开软件看它怎么做的。它确实让看懂软件便宜了很多，但官方案例都是拆清楚单个小功能，“复刻一切软件”是传播中被放大的说法。
date: 2026-10-13
---

# AI逆向复刻一切软件，解读爆火的REA

10 月初，GitHub 上一个叫 **REA**（Reverse Engineer Anything，“逆向一切”）的开源项目几天内涨了 7 万多颗星，登上 GitHub 当日热门榜第一。到 10 月 13 日，它已经接近 16 万颗星。

GitHub 是全球程序员存放和分享代码的网站，**Star（星标）** 相当于上面的“收藏”按钮，一个开源项目被多少人收藏，常被当作它热不热的指标。REA 的仓库 4 月就建好了，安静了半年，10 月突然垂直拉升：

![REA 的 GitHub 星标增长曲线](/images/frontier/2026-10-13/rea-star-history.png)
<div class="figcaption">REA 的星标曲线：7 到 9 月几乎是一条平线，10 月初几天内冲到 7 万以上。（图源：<a href="https://star-history.com/#morluto/rea&Date" target="_blank">star-history.com</a>）</div>

它的玩法一句话就能说完：**看到别人软件里一个好用的功能，让 AI 去拆开这个软件，搞清楚它是怎么做的，再帮你写一个自己的版本。** 中文圈的报道很快给它加上了“逆向灭霸”“复刻一切软件”“闭源护城河破产”这类标签。

我们的判断是：REA 确实让“看懂一个软件”便宜了很多，这是真进展；但“复刻一切”是传播中被放大的说法，官方自己展示的案例，都是把软件里的一个小功能拆清楚。

![GitHub 当日热门榜第一的 REA](/images/frontier/2026-10-13/rea-github-trending.png)
<div class="figcaption">爆火期间的 GitHub 当日热门榜截图：REA 排第一，当天新增 25,793 颗星。（图源：<a href="https://github.com/trending" target="_blank">GitHub Trending</a>）</div>

---

## 一、逆向工程：从一道菜反推菜谱

**逆向工程，就是在拿不到源代码的情况下，通过分析做好的软件，反推出它是怎么实现的。**

打个比方。程序员写的**源代码**像一份菜谱，写着先放什么、火候多大。软件公司发给我们的安装包，是照着菜谱做好端上桌的菜。把菜谱变成菜的这一步叫**编译**：程序员能读懂的代码，被翻译成电脑才认识的一长串 0 和 1（**二进制**）。菜端上来，菜谱不会跟着端上来，所以我们用软件，却看不到它的源代码。

逆向工程就是尝着这道菜，反推菜谱。干这件事的专业工具叫**反编译器**，常见的有 IDA、Ghidra、Hopper。它们能把 0 和 1 翻回“近似代码”，但原来的变量名、注释、设计思路都丢了，相当于尝出“有盐、有糖、大火炒过”，而不是拿回原菜谱。翻出来的东西大多是**汇编**：一条条极其琐碎的机器指令，比如“把这个数挪到那个格子里”“两个数相乘”。

![专业逆向工具 Hopper 的界面](/images/frontier/2026-10-13/rea-hopper.jpg)
<div class="figcaption">逆向工具 Hopper 正在分析一个程序：中间满屏是机器指令，右侧是地址和格式信息，底部是 REA 启动分析的日志。过去逆向工程门槛高，就高在要一行行读懂这些。（图源：<a href="https://github.com/morluto/rea" target="_blank">REA GitHub 仓库</a>）</div>

逆向工程也不等于破解。破解是去掉软件的付费或授权限制，逆向是搞清楚软件怎么工作的。安全研究员找漏洞、给老软件做兼容、分析病毒，靠的都是逆向。

过去这门手艺要多年训练。REA 想改变的，正是“读懂汇编”这一步只有少数人能做的局面。

---

## 二、REA 做了什么：给 AI 接上逆向工具

**REA 自己不会“看懂”软件，它是一根连接线，把 AI 编程助手和专业逆向工具接在一起。**

这里的 AI 编程助手，指 Claude Code、Codex 这类 **Agent**（智能体）：它不只是陪你聊天，还能自己在电脑上执行命令、读文件、写代码，一个任务可以连续干好几步。Agent 很聪明，但不会用 Hopper；Hopper 很专业，但普通人看不懂它的输出。REA 把两边接上。

接的方式叫 **MCP**（模型上下文协议）。可以把它理解成 AI 世界的“万能插座”标准：工具按这个标准做好插头，任何支持 MCP 的 Agent 插上就能调用，不用每个工具单独适配。REA 官方说它支持 Claude Code、Codex、Cursor、Gemini CLI 等，安装也只要把一句话复制给 AI 助手：

![REA 官网首页](/images/frontier/2026-10-13/rea-website.png)
<div class="figcaption">REA 官网首页：标语是“搞清楚软件是怎么工作的”，右边是安装方式，把一句指令复制给 AI 编程助手，让它自己装好并验证。（图源：<a href="https://rea.tools/" target="_blank">rea.tools</a>）</div>

装好以后，我们只要用大白话下指令，比如“去看看 Notion 的复制粘贴是怎么实现的”。之后的流程是这样的：

<div style="display:flex; flex-wrap:wrap; align-items:stretch; gap:8px; margin:18px 0;">
  <div style="flex:1; min-width:130px; border:1px solid #dde7e0; border-radius:10px; padding:12px; background:#f6faf7;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:4px;">① 我们提问</div>
    <div style="font-size:13px; line-height:1.7; color:#444;">指定一个本机上的软件，问它某个功能怎么做的</div>
  </div>
  <div style="flex:1; min-width:130px; border:1px solid #dde7e0; border-radius:10px; padding:12px; background:#f6faf7;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:4px;">② AI 助手派活</div>
    <div style="font-size:13px; line-height:1.7; color:#444;">通过 MCP 调用 REA，决定先查哪里</div>
  </div>
  <div style="flex:1; min-width:130px; border:2px solid #2D5A3D; border-radius:10px; padding:12px; background:#eef5f0;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:4px;">③ REA 调工具</div>
    <div style="font-size:13px; line-height:1.7; color:#33503c;">指挥 Hopper、Ghidra 等在本机分析，交回代码片段、出处和“还没搞清的地方”</div>
  </div>
  <div style="flex:1; min-width:130px; border:1px solid #dde7e0; border-radius:10px; padding:12px; background:#f6faf7;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:4px;">④ AI 追问、解释</div>
    <div style="font-size:13px; line-height:1.7; color:#444;">线索不够就回到第 ③ 步再查；够了就讲给我们听，写出自己的实现和测试</div>
  </div>
  <div style="flex:1; min-width:130px; border:1px solid #e3d9c9; border-radius:10px; padding:12px; background:#faf7f1;">
    <div style="font-weight:700; color:#8a6a3a; margin-bottom:4px;">⑤ 我们验收</div>
    <div style="font-size:13px; line-height:1.7; color:#5a4a33;">结论对不对、能不能用，最后还得人来判断</div>
  </div>
</div>
<p class="figcaption">REA 的工作流程：AI 负责串线索，专业工具负责拿证据，人负责最后验收。</p>

这里有一个值得注意的设计：**REA 交回的每个结论都附带证据和局限**，哪些是从程序里直接读到的，哪些还不确定，会分开列出来。AI 最大的毛病是不懂装懂，把“没查到”和“查到了”分开标，就是在防这个毛病。当然，标了不确定，不等于剩下的就一定对。

---

## 三、官方案例：拆清楚的都是单个小功能

**官方展示的三个案例，做的都是把软件里的一个小功能拆清楚，没有一个是复刻整个软件。**

![REA 官方的三个展示案例](/images/frontier/2026-10-13/rea-showcases.jpg)
<div class="figcaption">REA 官方的三个展示案例，从左到右：打砖块游戏的声音方位、Notion 的复制粘贴、老游戏里一圈圈的子弹。（图源：<a href="https://github.com/morluto/rea#showcases" target="_blank">REA GitHub 仓库</a>）</div>

### 案例一：1996 年的打砖块游戏，声音从哪边出来

DX-Ball 是一款 1996 年的 Windows 打砖块游戏。砖块被打碎时，碎在左边，声音偏左声道；碎在右边，声音偏右。这个“根据位置算声音方位”的小功能，就是 REA 要拆的目标。指令只有一句：

![给 AI 编程助手的指令](/images/frontier/2026-10-13/rea-dxball-prompt.jpg)
<div class="figcaption">给 AI 编程助手的指令：“用 REA 查出 DX-Ball 是怎么计算声音左右方位的，解释计算过程并给出代码。”（图源：<a href="https://rea.tools/showcase/dx-ball/" target="_blank">REA 官网 DX-Ball 案例</a>）</div>

第一轮反编译的结果几乎没用。它只告诉我们“这里调用了一个转换函数，然后返回”，关键的计算过程全丢了：

![反编译出的残缺代码](/images/frontier/2026-10-13/rea-dxball-pseudocode.jpg)
<div class="figcaption">反编译器第一次给出的“近似代码”：只有一个转换调用，看不出输入是什么、算了什么。（图源：<a href="https://rea.tools/showcase/dx-ball/" target="_blank">REA 官网 DX-Ball 案例</a>）</div>

于是 AI 没有停在这里，而是回到更底层的机器指令，一步步追：先找到这个函数的输入是砖块在屏幕上的横坐标，再追到是谁在调用它（砖块被击中时），最后去程序里读出两个关键常数 1.5625 和 500。拼起来，就是左边一列原始指令、右边一段重写出来的代码：

![原始机器指令与重写的代码对照](/images/frontier/2026-10-13/rea-dxball-reconstructed.jpg)
<div class="figcaption">左：游戏里的原始机器指令；右：重写出来的代码。意思是“横坐标 × 1.5625，减 500，再乘一个音量比例”，算出来屏幕最左边是 −500、正中间是 0、最右边是 500。（图源：<a href="https://rea.tools/showcase/dx-ball/" target="_blank">REA 官网 DX-Ball 案例</a>）</div>

这个案例真正有说服力的是验收。项目方做了两层核对：一是把屏幕上 0 到 640 的每个位置、配 5 种音量比例，共 3,205 组输入，分别喂给原游戏和新代码，结果全部一致；二是用当年同一代的老编译器（Visual C++ 4.0）把新代码编译出来，和原游戏里这个函数逐字节比对，63 个字节完全一样。**这不是“看起来像”，是能对答案。**

但也要看清它的范围。官方页面写得很坦白：截至 10 月 7 日，这个复刻项目维护了 55 个函数，球和挡板的物理、道具、Windows 系统对接都还在做，游戏还不能完整玩。**连一款 1996 年的小游戏，目前都还没有完整复刻出来。**

### 案例二和三：Notion 的复制粘贴、老游戏的子弹角度

Notion 的桌面版是用 **Electron** 做的，这是一种用网页技术做电脑软件的框架。REA 追踪了“复制”这个动作：从我们按下复制的界面层，一路追到软件后台处理的那一层，并看清了 Notion 复制富文本时用的数据格式。这个案例官方没有说明做过什么核对。

第三个是日本 PC-98 电脑上的老游戏《东方幻想乡》（TH04）。弹幕游戏里，敌人会射出一圈圈子弹，REA 恢复了“朝固定方向射”和“瞄准玩家射”两种角度的计算方法，再拿历史编译器的输出对照。

三个案例放在一起看，能力边界很清楚：

<div style="display:flex; gap:14px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:240px; border:2px solid #cde0d4; border-radius:12px; padding:18px; background:#f1f6f2;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">✓ 已经展示做到的</div>
    <div style="font-size:14px; line-height:1.9; color:#33503c;">搞清某一个具体功能怎么算、数据怎么流转<br>把这个功能重写出来，并且能对答案验证<br>结论附带出处，没搞清的地方单独标出来</div>
  </div>
  <div style="flex:1; min-width:240px; border:2px solid #d9c4c4; border-radius:12px; padding:18px; background:#faf3f3;">
    <div style="font-weight:700; color:#9a4a4a; margin-bottom:8px;">✗ 没有展示、也没有声称的</div>
    <div style="font-size:14px; line-height:1.9; color:#5a4040;">拿回软件的原始源代码<br>复刻一个完整的软件产品<br>对付刻意加了保护的商业软件</div>
  </div>
</div>
<p class="figcaption">左边是 REA 的真本事，右边是传播里被加上去的。</p>

官方说明里也写明了：分析电脑原生软件时，REA 交回的是近似代码和机器指令，原始源代码拿不回来；剩下的实现，是 AI 根据这些线索自己写、自己测的。

---

## 四、“复刻一切”是怎么传出来的

**从官方的说法到中文圈的标题，能力被一层层放大了。**

官方的原话是：“看到喜欢的功能，搞清它是怎么做的，一直到二进制层面。”到了传播里，变成了“复刻一切软件”“让所有商业软件的底裤被扒干净”，还有报道说“作者已经在努力逆向 Office”。

最后这句的出处是 X（原推特）上的一段对话：

![X 上关于逆向 Excel 的对话](/images/frontier/2026-10-13/rea-excel-tweet.png)
<div class="figcaption">网友问“能不能逆向 Excel”，回答“我现在就在做”的是 AI 科技博主 Matthew Berman，不是 REA 的作者（仓库作者账号为 morluto）。官方案例里也没有 Office。（图源：<a href="https://x.com/MatthewBerman" target="_blank">X @MatthewBerman</a>）</div>

一位博主说“正在试”，到了标题里就成了“作者在逆向 Office”。况且，一个打砖块游戏的声音函数只有 63 个字节，而 Excel 是几十年积累、功能成千上万的大型软件，两者根本不在一个量级。

还有一个常被忽略的事实：**REA 能拆的，只有装在我们电脑上的那部分。** 像 Notion 这样的软件，文档存在哪、多人怎么同时编辑、账号和权限怎么管，大量逻辑跑在公司的服务器上。我们拆得到桌面客户端里复制粘贴的写法，拆不到服务器上的东西。

---

## 五、看懂代码变便宜了，护城河往代码之外移

**“看懂一个功能怎么做”的成本确实在快速下降，代码本身越来越难当护城河；但复刻一个功能和复刻一个产品，中间隔着很远的距离。**

有一类软件的价值，确实会被削弱：靠一两个独家小算法、客户端里一个巧妙功能撑起来的产品。以前要请资深逆向工程师花几周，现在 AI 几个小时就能把思路摸清。

但大多数软件的价值不在某一段代码里，而在这些地方：

1. **服务器上的东西**：数据、账号体系、多人协作，这些本来就不在我们电脑上，拆不到。
2. **几十年踩过的坑**：各种文件格式的兼容、各种电脑上的稳定运行，这是一个功能一个功能磨出来的。
3. **用户和生态**：同事都在用、文件都存在里面、插件都装好了，换一个软件的成本远高于写一个功能。
4. **持续迭代和服务**：抄得到今天的版本，抄不到明天的更新和出了问题有人兜底。

我们之前写过一篇[《AI 时代最宽的护城河》](/frontier/org-form-moat)，讲的是同一个方向：代码能抄、产品能抄，壁垒越来越往公司的组织方式、数据和服务上移。REA 把这件事从“趋势判断”往前推了一步。

也有人预测，公司会转向**代码混淆**来自保。混淆就是故意把代码改得难读，但功能不变。最常见的做法是把有意义的名字换成乱码、把多行压成一行：

```python
# 混淆前：一看就知道是在排序
def quick_sort(numbers): ...

# 混淆后：功能一样，名字全变成乱码
_0xA = lambda _0xB: _0xB if len(_0xB) < 2 else _0xA([...])
```

这种程度的混淆，挡得住人，基本挡不住 AI，因为 AI 看的本来就是逻辑，不靠名字。真正想保护的核心逻辑，更可靠的做法还是放在服务器上，根本不发到用户电脑里。

---

## 六、合法边界：拆谁、拿来做什么

**逆向工程本身是一门正当技术，但拆的是谁的软件、拆完拿来做什么，决定了合不合法。**

REA 官方在说明里划了线：它用于合法的研究、教育、软件之间的互通兼容、老软件保存，以及分析**自己拥有或获得授权**的软件；分析用的商业工具必须正版，破解版、盗用的许可证、绕过授权限制，都不被允许。

很多商业软件的用户协议里，本来就明确禁止逆向。把别人软件里的实现照搬进自己的产品，可能牵涉著作权和商业秘密。业内已经有人把现在比作当年的 Napster（早年的音乐共享软件，后来因版权诉讼关停）：

![X 上关于诉讼风险的讨论](/images/frontier/2026-10-13/rea-napster-tweet.png)
<div class="figcaption">有网友称这是“Napster 时刻，野蛮生长的盗版”，预计发布复刻软件的人会面临诉讼；博主 Matthew Berman 回应“完全同意，诉讼即将来临”。（图源：<a href="https://x.com/MatthewBerman" target="_blank">X @MatthewBerman</a>）</div>

除了法律，还有两个容易被忽略的安全问题：

- **数据会出本机**：REA 的分析在本地跑，但分析结果要交给 AI 助手，AI 助手背后连着模型公司的服务器。“目标软件没上传”不等于“相关信息都没离开电脑”。
- **被拆的软件可能“反咬”**：有人提醒，可以在程序里藏一段专门写给 AI 看的指令，AI 读到时可能被诱导去做别的事。这叫**提示注入**，相当于在 AI 要读的材料里夹带纸条。

所以在公司环境里，这类工具碰到的是别人的软件和公司的数据，属于要先过法务和信息安全的事情，不是装上就能用的效率工具。

---

## 小结

REA 爆火是有原因的。它把逆向工程里最难的一步“读懂机器指令”交给了 AI，让看懂一个软件功能的门槛大幅降低，而且官方案例做到了能逐项对答案的验证。

但它目前展示的能力，是把一个个小功能拆清楚、重写出来。一款 1996 年的小游戏，到现在还没完整复刻出来；服务器上的东西，根本拆不到。

**软件从黑盒变成了玻璃盒，但看得见，不等于搬得走。**

## 扩展阅读

- [REA 官方 GitHub 仓库](https://github.com/morluto/rea) · **morluto**（含安装说明、能力范围与使用声明）
- [DX-Ball 声音方位复刻案例](https://rea.tools/showcase/dx-ball/) · **REA 官网**（完整调查步骤与验证口径）
- [《一个GitHub的热门项目，让一堆没做过逆向的人又在那天塌了地陷了》](https://mp.weixin.qq.com/s/2da-uXxXYXFeddBIb2FT-A) · **轩辕的编程宇宙**（微信公众号）
- [《5 万 Star ！号称逆向任何东西，太猛了吧！》](https://mp.weixin.qq.com/s/L8rRPU68LY7UXt63IUP10g) · **开源先锋**（微信公众号）
- [《这个AI逆向工具一夜爆红，逆向工程的百年门槛，即将消失》](https://mp.weixin.qq.com/s/UtYvLDyM635CShjg2uzryQ) · **给点知识**（微信公众号）
- [《比Jev更爆火！逆向灭霸 REA 一天登顶GitHub》](https://mp.weixin.qq.com/s/opomqvcruvmcQr4fzTT5Sg) · **新智元**（微信公众号）
