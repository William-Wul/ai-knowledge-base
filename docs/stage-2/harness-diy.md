---
title: Harness 解读与 DIY 玩法
description: 进阶实战：拆开 AI 工具外面那层"壳"（Harness），看里面装着哪六个零件、为什么同一个模型换个 Harness 表现就不同，以及三档普通人也能上手的 DIY 玩法
---

# Harness 解读与 DIY 玩法

你现在用的 Claude Code、Codex 这类 AI 工具，拆开看都是同一个结构：**里面一个模型，外面一层壳**。模型负责想，壳负责把想法变成动作：能调用哪些工具、按什么流程走、哪些操作要先问你、干过的每一步记不记录，全是壳在管。

这层壳，行业叫它 **Harness**。直译是"马具"，就是套在马身上那套缰绳和马鞍：马（模型）动力十足但不守规矩，Harness 让它跑得快又不跑偏。换成正式一点的说法：**Harness 是套在模型外面、让模型稳定可控干活的整套工程系统**，工具、提示词、上下文、日志、权限、界面都归它管。它不是模型的一部分，也不是一句提示词，而是模型之外的这一切。

为什么现在值得单讲 Harness？因为 2026 年 8 月，两家大厂在同一周把它单独拿出来做成了开源产品：DeepSeek 开源了 DeepSeek Harness，OpenAI 全面开源了 Codex 的 Harness。它从"产品的内部零件"变成了"你可以自己摆弄的东西"，这就引出一个新玩法：**Harness 是可以 DIY 的**。而且门槛比你想的低，如果你已经在用 Claude Code 或 Codex，你很可能早就在 DIY 了，只是没意识到。

---

## 拆开看：Harness 里装着六个零件

一个 Harness 好不好，就看这六个零件做得怎么样。行话唬人，对应的东西都很朴素：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">零件</div><div style="flex:2;">它管什么</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">工具（Tools）</div>
    <div style="flex:2; color:#444;"><b>它能伸手碰到什么。</b>读文件、搜网页、跑命令、操作表格和邮箱。工具越多，AI 的手越长。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">提示词（System Prompt）</div>
    <div style="flex:2; color:#444;"><b>出厂设定的人设和规矩。</b>是"谨慎的助手"还是"放手干的工程师"，是 Harness 写好的，不是模型天生的。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">上下文管理</div>
    <div style="flex:2; color:#444;"><b>喂什么给模型看。</b>对话太长怎么压缩、哪些文件塞进它的视野、哪些旧信息该扔掉。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">运行日志（Session Log）</div>
    <div style="flex:2; color:#444;"><b>每一步留不留痕。</b>收到什么指令、调了什么工具、返回什么结果，全记下来才能回放和查错。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">权限与审批</div>
    <div style="flex:2; color:#444;"><b>刹车和油门。</b>哪些动作可以直接做，哪些必须先停下来问你。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">界面（UI）</div>
    <div style="flex:2; color:#444;"><b>你看到的那个窗口。</b>命令行、网页、嵌在编辑器里，界面本身也是 Harness 的一部分，照样能换。</div>
  </div>
</div>
<p class="figcaption">六个零件凑齐，模型这匹"马"才真正被套上了全套装备。你在不同工具里体感到的差别，多半来自这六个零件的不同组合。</p>

拿刚开源的 DeepSeek Harness 对照着看，这六个零件一个不缺，而且全部做成了可插拔的插件：

![DeepSeek Harness 的六个核心模块](/images/stage-2/harness-diy/dsh-architecture.png)
<div class="figcaption">DeepSeek Harness 的结构总览：进程组合、会话能力、事件日志、工具执行、插件生命周期、界面，六个模块全部接入同一个内核（Cordis），每一个都可以替换。（图源：爱范儿根据官方文档整理）</div>

六个零件里，"运行日志"最值得单独说。好的 Harness 会把 Agent 干的每一步按"只追加"的方式记进日志：模型看到了什么、决定调哪个工具、工具返回了什么、派了哪个子 Agent，逐条留痕，像行车记录仪加工位周报。有了它，出问题可以逐帧回放，任务中断可以接着恢复，甚至可以复制一条旧轨迹从头再跑一遍。

![DeepSeek Harness 的轨迹视图](/images/stage-2/harness-diy/trace-view.png)
<div class="figcaption">轨迹视图实拍：一个"翻译桌面上的论文 PDF"任务，系统提示、用户指令、上下文注入、模型判断、工具调用逐条记录在案，右上角可以直接下载完整日志。（图源：智东西实测）</div>

---

## Harness 不是包装纸：同一个模型，换个 Harness 就变样

"Harness 会影响结果"不是理论推测，有现成的实测。有家媒体做了一个很说明问题的实验：**模型不变、任务不变，只换 Harness**。具体安排是：让同一个 DeepSeek-V4-Flash 模型，分别在三个 Harness 里（DeepSeek Harness、Reasonix、Codex），完成同一个任务，用 Three.js 做一个 3D 滑沙游戏。

三个产物摆在一起，差异肉眼可见：

<div style="display:flex; gap:12px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:200px;">
    <img src="/images/stage-2/harness-diy/game-dsh.png" style="width:100%; border-radius:8px; border:1px solid #e3e8e3;">
    <div style="font-size:13px; color:#2D5A3D; font-weight:600; margin-top:6px;">DeepSeek Harness 版</div>
    <div style="font-size:13px; color:#555;">黄昏沙漠、金字塔、绿洲湖泊，氛围完整，玩家自动滑行穿过每个门</div>
  </div>
  <div style="flex:1; min-width:200px;">
    <img src="/images/stage-2/harness-diy/game-reasonix.png" style="width:100%; border-radius:8px; border:1px solid #e3e8e3;">
    <div style="font-size:13px; color:#9a4a4a; font-weight:600; margin-top:6px;">Reasonix 版</div>
    <div style="font-size:13px; color:#555;">能玩，但金字塔、人物、天空都渲染得粗糙，不像一款 3D 游戏</div>
  </div>
  <div style="flex:1; min-width:200px;">
    <img src="/images/stage-2/harness-diy/game-codex.png" style="width:100%; border-radius:8px; border:1px solid #e3e8e3;">
    <div style="font-size:13px; color:#666; font-weight:600; margin-top:6px;">Codex 版</div>
    <div style="font-size:13px; color:#555;">画面明亮干净，但整体更简单，沉浸感不如自家 Harness</div>
  </div>
</div>
<p class="figcaption">同一个模型、同一个任务、三个 Harness、三种产物。（图源：爱范儿实测，单次案例）</p>

更有意思的是过程差异。Codex 接到任务后的第一反应不是闷头写代码，而是**先去翻电脑里的其他项目**：找到了另一个项目里的 3D 库文件和之前做过的同类原型，研究了一番才开始构建。

![Codex 先扫描本地项目再动手](/images/stage-2/harness-diy/codex-scavenge.png)
<div class="figcaption">Codex 的执行记录：它主动报告"我在另一个项目里找到了 3D 库的副本""旁边还有一个相关的旧原型，我先研究一下再动手"。模型是同一个，但 Harness 给它的工具和习惯完全不同。（图源：爱范儿实测）</div>

要把边界说清楚：单次实验不能证明哪个 Harness 普遍更强，换个任务结果可能反过来。但它足以证明一件事：**Harness 本身就是变量**。你以后选 AI 工具，除了问"用的什么模型"，还可以多问一句"Harness 怎么样"：给什么工具、写什么规矩、留不留日志。觉得"同一个模型忽好忽坏"的时候，很多时候不是模型的问题，是 Harness 的差别。

---

## DIY 第一档：你已经在 DIY 自己的 Harness

先说一个你可能没意识到的事：用过 Claude Code 或 Codex 的人，**其实已经 DIY 过 Harness 了**。不信对照一下：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">你做过的事</div><div style="flex:2;">你实际上在调哪个零件</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#444;">写 AGENTS.md、写项目说明</div>
    <div style="flex:2; color:#444;"><b>提示词零件</b>：给模型立规矩，告诉它"在我这儿干活要遵守什么"</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#444;">装 Skill（技能包）</div>
    <div style="flex:2; color:#444;"><b>工具零件</b>：给它装上一份岗位手册，永远会做这件事</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#444;">接 MCP，连上飞书、数据库</div>
    <div style="flex:2; color:#444;"><b>工具零件</b>：给它开新部门的门禁卡，手伸得更长</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#444;">选权限档位（只读 / 可改 / 全自动）</div>
    <div style="flex:2; color:#444;"><b>权限零件</b>：调刹车灵敏度</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#444;">开新对话、手动喂文件</div>
    <div style="flex:2; color:#444;"><b>上下文零件</b>：决定它看得见什么、忘掉什么</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#444;">翻运行记录，看它在干嘛</div>
    <div style="flex:2; color:#444;"><b>日志零件</b>：调出行车记录仪回放</div>
  </div>
</div>
<p class="figcaption">所谓 DIY Harness，不是什么新技能，就是把这些零件从"默认设置"调成"你的设置"。</p>

意识到这一点之后，该做什么？三个动作，按性价比排序：

**动作一：把重复劳动写成 Skill，最值得先做。** 你每个月都要写的周报、每期都要做的选题、每次活动后的复盘，凡是"流程固定、做过三遍以上"的事，都值得写成一份 Skill：一份说明文档，写清什么时候用、分几步做、做成什么样算合格，放进工具的 skills 目录，以后一句话就能调用。写好一份，它就是你的 Harness 里一个永久零件；攒上五六份，你就有了自己的"私有插件库"，换工具也能带走。

**动作二：给每个常做的项目写一份 AGENTS.md。** 这是放在项目根目录的"员工手册"：这个项目是干什么的、哪些文件不许碰、常用命令是什么、你喜欢的风格和规矩。AI 每次开工先读它，不用你重新教。写它花一小时，省的是以后每次开头重复解释的成本。

**动作三：按你的工作流接线。** 用 MCP 把 AI 接上你真实的工作环境：飞书、日历、邮箱、数据库。接之前它是"顾问"，只动嘴不动手；接上之后才能形成"发现问题、动手处理、回来通知你"的闭环。

三件事做齐，你就搭出了一套基于自己工作流的 Harness 体系：**Skill 库是你的私有插件，AGENTS.md 是你给每个项目立的规矩，MCP 是你开的门禁**。它跟着你走，不随某个工具变。这一档不用装任何新东西，今天就能开始做。

---

## DIY 第二档：上手 DeepSeek Harness 的三个玩法

想再进一步，去玩 DeepSeek Harness。它是目前把"Harness 可以拆"做得最彻底的产品，开源免费，项目在 GitHub 上：[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)。

**最省事的安装方法，是让你的 Agent 来装**：把仓库地址发给 Claude Code 或 Codex，说一句"帮我把 DeepSeek Harness 装好并启动"，它会自己处理 Node.js 环境和命令。这本身就是个挺妙的画面：用你现有的 Harness，去装一个新 Harness。装好后启动只要一行命令：

```
npx @deepseek-ai/dsh web
```

跑完浏览器会自动打开一个本地网页（默认地址 `http://127.0.0.1:3080`），对话、切换模型、选模式、配权限全在这个网页里操作。它就是官方推荐给普通用户的主要形态，可以理解为一个"跑在你自己电脑上的网页版 Agent"。

那有没有客户端版？目前没有独立的桌面客户端，但有两个替代形态：喜欢命令行的人有全屏终端界面（TUI），写脚本的人有用完即走的无界面模式（Headless，适合接进自动化流程）。而且它的界面本身就是一棵插件树，官方界面也能被改：有用户在创造模式下让它现场做出了一个官方没有的"三栏布局"。所以"客户端长什么样"这件事，在 DeepSeek Harness 里同样是 DIY 的一部分。

上手之后，三个玩法按顺序来：

### 玩法一：换模型，同一个 Harness 配不同的"脑子"

DeepSeek Harness 不绑定 DeepSeek 自家模型。设置里可以接入 Kimi、OpenAI、Anthropic、Google 等将近 40 家模型厂商，也支持自定义接口地址，填完立刻生效。**这意味着你可以用同一套工具、同一套规矩、同一份日志，只换模型来对比手感**，就像同一台相机换不同的镜头。

![切换模型和推理档位](/images/stage-2/harness-diy/model-switch.png)
<div class="figcaption">对话输入框上方就能切换模型和推理档位（Off / High / Max 三档）。Harness 不动，只换"脑子"。（图源：爱范儿实测）</div>

### 玩法二：切模式，像相机换场景模式

它出厂自带四种预设模式，本质是同一套 Harness 的四套装配方案：

<div style="border:1px solid #dde7e0; border-radius:12px; overflow:hidden; margin:18px 0;">
  <div style="display:flex; background:#eef5f0; font-weight:700; color:#2D5A3D; padding:10px 14px; font-size:14px;">
    <div style="flex:1;">模式</div><div style="flex:2;">干什么用</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">标准模式</div>
    <div style="flex:2; color:#444;"><b>日常默认。</b>功能完整：文件编辑、搜索、Skills、计划、子 Agent 都在。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">极简模式</div>
    <div style="flex:2; color:#444;"><b>拆光附加能力，测裸模型。</b>只留最基础的两个工具，专测模型"裸奔"的真实水平，DeepSeek 官方给 V4 Flash 跑分用的就是它。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">PTC 模式</div>
    <div style="flex:2; color:#444;"><b>让模型把一串操作写成一段程序一次跑完。</b>读文件、搜索、筛选、批量调用压进一次执行，减少来回请示，省 token 也省时间，但更依赖模型的规划能力。</div>
  </div>
  <div style="display:flex; padding:11px 14px; border-top:1px solid #e8efe9; font-size:14px; background:#fafcfb;">
    <div style="flex:1; color:#2D5A3D; font-weight:600;">创造模式</div>
    <div style="flex:2; color:#444;"><b>最激进的一档：让 Agent 检查并改造自己的插件环境。</b>相当于允许员工自己给自己配装备，配出自己的专属模式。</div>
  </div>
</div>
<p class="figcaption">四种模式不是四套底层系统，是同一套 Harness 的四种"装配清单"。</p>

![Agent 预设设置页](/images/stage-2/harness-diy/preset-modes.png)
<div class="figcaption">Agent 预设设置页实拍：四个内置模式卡片任选，也可以复制一份改成自己的。注意左侧栏，"文件提及""行情跑马灯""侧边卡片"这些界面元素本身也是可开关的插件。（图源：赛博禅心实测）</div>

两个立刻能试的玩法：想亲手验证上一节的"换 Harness 影响表现"，拿同一个任务在极简模式和标准模式各跑一遍，对比产物；手上有批量操作（比如处理一批文件）时切 PTC 模式，看 token 消耗差多少。

### 玩法三：装插件，连"Agent 循环"都能换

它的规矩是"一切皆插件"：不只搜索和工具是插件，连 Agent 的思考循环、日志、审批、界面，全都是可插拔的模块。

![插件配置页](/images/stage-2/harness-diy/plugin-config.png)
<div class="figcaption">插件配置页实拍："终端""Agent 循环""网页搜索"都是可配置的插件，连"AI 回复里用几个表情"都是一个独立插件。（图源：赛博禅心实测）</div>

插件从哪来、怎么装？三条路：

1. **GitHub 找现成的**。项目在 GitHub 开源（[deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)），社区插件统一打 `dsh-plugin` 标签，直接翻 [dsh-plugin 标签页](https://github.com/topics/dsh-plugin) 就能看到别人做好的插件，按仓库说明安装。
2. **设置页直接装**。在"设置 → 插件"里可以查看和配置已装插件，也支持上传 ZIP 包装本地插件。
3. **让它给自己写一个**。切到创造模式，直接说"给我写一个做某事的插件"，它会照着官方插件开发文档，自己写代码、自己挂载。这是最有 DeepSeek 特色的玩法：装备不够，让马自己打一副。

社区已经做出的插件，举几个例子：

<div style="display:flex; gap:12px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:240px;">
    <img src="/images/stage-2/harness-diy/at-file-plugin.png" style="width:100%; border-radius:8px; border:1px solid #e3e8e3;">
    <div style="font-size:13px; color:#555; margin-top:6px;">文件提及插件：输入 @ 弹出文件选择器，随手把文件喂给 Agent</div>
  </div>
  <div style="flex:1; min-width:240px;">
    <img src="/images/stage-2/harness-diy/explorer-plugin.png" style="width:100%; border-radius:8px; border:1px solid #e3e8e3;">
    <div style="font-size:13px; color:#555; margin-top:6px;">界面改造插件：把界面改成类 VS Code 的文件工作台，右侧是项目文件树</div>
  </div>
</div>
<p class="figcaption">此外还有跨会话长期记忆、桌面宠物、表情包等插件。内测几天时间，用户就攒出了约 300 个。（图源：数字生命卡兹克实测）</p>

丑话说在前面：它目前还是开发者预览版，官方明说会有兼容性破坏式更新，术语和配置也多。普通读者从"标准模式 + 换个模型"玩起就够了。

---

## DIY 第三档：把整个 Harness 搬走

再往上一个量级：Harness 本身是开源的，可以整个搬进你自己的东西里。这一档主要是开发者的事，知道它的存在就行。

同一周，OpenAI 把 Codex 的 Harness 也全面开源了，给出三种接法：**App Server**（完整集成，用双向事件流暴露线程、工具调用和审批，适合嵌进正式产品）、**codex exec**（给脚本和流水线用的一次性任务入口）、**SDK**（在自己的应用里直接控制 Agent）。它的设计思路很清楚：界面、业务数据、审批流程都留在你手里，Codex 只负责中间那段 Agent 循环。

![Codex 嵌入式架构](/images/stage-2/harness-diy/codex-app-server.png)
<div class="figcaption">OpenAI 官方给出的嵌入式架构：左边"你的应用"管界面、业务数据和审批，中间的 Codex Harness 管 Agent 循环和沙箱执行，右边是你自己的数据和业务动作。批准过的改动才会回流到产品里。（图源：OpenAI 官方）</div>

两家路线一对照很有意思：Codex 给你一个稳定的执行引擎，让你嵌进自己的产品；DeepSeek 则把引擎的每个零件都做成可替换的，连界面本身都是一棵插件树。**方向是同一个：Harness 不再藏在产品里，而是变成可以摆弄、可以组装的基础设施。**

---

## 自由是有代价的

Harness 越自由，越多责任转到你身上。三件事要心里有数：

1. **插件是能执行真实代码的。** 装一个第三方插件，等于让一个陌生人写的程序在你电脑上跑。"开源""可热挂载"都不等于安全。
2. **配置错了，锅是你的。** 高度插件化意味着版本兼容、配置错误、故障定位的成本都从厂商转给了用户。"可塑性强"和"开箱即用"从来不是同一件事。
3. **权限别一上来就开到底。** Harness 一般都提供权限档位，Read Only（只读）、Workspace Write（可改工作区）、Full access（完全放开）的风险天差地别。

![权限三档](/images/stage-2/harness-diy/permission-levels.png)
<div class="figcaption">DeepSeek Harness 的权限三档：只读、可写工作区、完全放开。建议从"只读"或"可写"玩起，Full access 留给充分信任的环境。（图源：爱范儿实测）</div>

对应的好消息是，正经的 Harness 都标配了安全机制：沙箱（把执行关进笼子）、审批（高风险动作先停下来问你）、日志（出事了能回放）。**DIY 的正确姿势是带着刹车玩，不是把刹车拆了玩。**

---

## 三句话收尾

<div style="border:2px solid #cde0d4; border-radius:12px; padding:20px; background:#f6faf7; margin:18px 0;">
  <div style="font-size:14px; line-height:2.2; color:#33503c;">
    <strong>① Agent = 模型 + Harness。</strong>模型负责想，Harness 负责干。评价一个 AI 工具，两件事都要看。<br>
    <strong>② 同一个模型，换个 Harness 就变样。</strong>你觉得模型"忽好忽坏"，很多时候是 Harness 的差别。选工具多了一个判断维度。<br>
    <strong>③ Harness 是可以自己调的。</strong>先把重复劳动写成 Skill、给项目立好规矩、接上工作用的系统；想再进一步，就去换模型、切模式、装插件。
  </div>
</div>
<p class="figcaption">一句话：模型决定 AI 能想多好，Harness 决定 AI 能干多稳。而这套装备，正在变成你自己能动手调的东西。</p>

---

## 扩展阅读

- [《从0到1带你速通DeepSeek Harness。》](https://mp.weixin.qq.com/s/xkC1aenHFNSH2BxyzLDfcA) · **数字生命卡兹克**（微信公众号）：四种模式和社区插件的新手上手地图，本文玩法二的主要参考。
- [《DeepSeek 智能体首发体验：非主流、很 DeepSeek》](https://mp.weixin.qq.com/s/25_nUugQyqxg0oF6VKkBaQ) · **爱范儿**（微信公众号）：同一个模型跨三个 Harness 的对比实测，本文第三节的出处。
- [《DeepSeek Harness 上线：一切皆为插件，一切皆是可能》](https://mp.weixin.qq.com/s/FsFE62YVlR08FNM1Ar0kZg) · **赛博禅心**（微信公众号）：插件体系、事件日志与安全机制的完整架构解读。
- [《实测DeepSeek Harness！梁文锋憋的"黑色鲸鱼"大招，有惊喜》](https://mp.weixin.qq.com/s/xSS-d5Pr36o7x7Cp25fPKQ) · **智东西**（微信公众号）：安装体验、88 页论文翻译和子 Agent 调度的实测记录。
- [《震撼！OpenAI全面开源Codex Harness》](https://mp.weixin.qq.com/s/fbKi7IrAvmv49IfJbI9w7Q) · **新智元**（微信公众号）：Codex Harness 的三种开源接法，本文 DIY 第三档的出处。
- [DeepSeek Harness 官方仓库](https://github.com/deepseek-ai/deepseek-harness) · **DeepSeek 官方**（GitHub）：安装命令、插件开发文档和 `dsh-plugin` 社区插件入口。
