---
title: Codex 从零开始：保姆级完整教程
description: 2026 年 7 月起 Codex 并入 ChatGPT 桌面应用。怎么装、怎么登录、怎么跑通第一个任务，国内能不能用，从安装到进阶一篇全讲完
---

# Codex 从零开始：保姆级完整教程

> Mac + Windows 双线 · ChatGPT 账号登录全流程 · 国内接入方案 · 从下载到真正干活

---

先说一件最重要的事：**从 2026 年 7 月起，Codex 不再是一个独立软件了。** OpenAI 把它并进了 ChatGPT 桌面应用：你现在装一个 ChatGPT，里面就同时有聊天（Chat）、长任务（Work）、干活（Codex）三种模式，Codex 是其中一个。本文已按合并后的新版重写；文中少数界面截图拍摄于合并前的独立 Codex App，布局略有差异，但操作流程不变，以你电脑上的实际界面为准。

这是一篇很长的教程，但你不用一口气读完，翻到你需要的那一节，跟着做，就行。

**读完这篇，你能做到五件事：**

1. 装好带 Codex 的新版 ChatGPT 桌面应用（Mac 或 Windows）
2. 用 ChatGPT 账号登录，让 Codex 真正能用
3. 跑通第一个任务，亲眼看它干活
4. 学会用"计划模式"和 AGENTS.md，让它不跑偏
5. 知道国内没有 ChatGPT 账号时，有哪些接入办法

![Codex 是 OpenAI 出的 AI 助手，现在是 ChatGPT 桌面应用里的干活模式](/images/stage-5/codex-hero.png)

*Codex 是 OpenAI 出的 AI 助手，2026 年 7 月起并入 ChatGPT 桌面应用，本篇带你从零装好、一步步用起来*

---

## 一、先搞懂它是什么

很多人一看到 "Codex" 里那个 "Code"，就以为这是个只有程序员才用得上的写代码工具，直接劝退，这是最大的误会。

我们先把它讲清楚。**Codex 是 OpenAI（就是做 ChatGPT 那家公司）出的 AI 助手，现在它活在 ChatGPT 桌面应用里。** 打开新版 ChatGPT 桌面应用，左边一列三个模式，各管一件事：

<div style="display:flex;gap:14px;flex-wrap:wrap;margin:20px 0;">
  <div style="flex:1;min-width:200px;border:1px solid #e2e2e2;border-radius:12px;padding:18px;background:#fafafa;">
    <div style="font-size:15px;font-weight:700;color:#555;margin-bottom:8px;">💬 Chat ＝ 嘴替</div>
    <div style="font-size:14px;line-height:1.7;color:#444;">你问它问题，它<strong>动嘴</strong>告诉你答案、给你建议、帮你写一段文字。但具体的活，还得你自己去电脑上一步步操作。</div>
  </div>
  <div style="flex:1;min-width:200px;border:1px solid #e2e2e2;border-radius:12px;padding:18px;background:#fafafa;">
    <div style="font-size:15px;font-weight:700;color:#555;margin-bottom:8px;">📋 Work ＝ 长工</div>
    <div style="font-size:14px;line-height:1.7;color:#444;">交办一件要<strong>跑很久</strong>的事：跨应用查资料、做调研、产出文档和表格，它能连续干几个小时，最后交一份成品。</div>
  </div>
  <div style="flex:1;min-width:200px;border:2px solid #10a37f;border-radius:12px;padding:18px;background:#f0fbf8;">
    <div style="font-size:15px;font-weight:700;color:#10a37f;margin-bottom:8px;">🛠 Codex ＝ 手替</div>
    <div style="font-size:14px;line-height:1.7;color:#444;">绑定你电脑上的文件夹，你交代一件事，它<strong>动手</strong>替你做完：自己读文件、自己写、自己改、自己验证，一步步干到底。</div>
  </div>
</div>
<p class="figcaption">合并后的 ChatGPT 桌面应用 = 三个模式一个壳：聊天找 Chat，长任务找 Work，动手干活找 Codex。本篇讲的是 Codex。</p>

> 💡 **"嘴替 / 手替"这个说法**：嘴替就是替你说话的人，手替就是替你动手的人。Codex 的厉害之处在于它能直接动手：文件、代码、网页、数据、甚至帮你操作整台电脑，它都能上手做，而不只是"告诉你该怎么做"。

它的工作方式跟普通 AI 聊天完全不同：

- **普通 AI 对话**：你问一句，它答一句，每一轮都是独立的。
- **Codex 的工作方式**：你交代一件事，它自己规划步骤、自己调工具、自己看结果、自己再决定下一步，反复循环，直到任务完成或卡住。这种"自己干一整条任务链"的能力，就是大家常说的 **Agent（智能体）**。

一句话总结：**Codex 是 ChatGPT 桌面应用里那个能直接上手帮你把事情做完的模式，不是再来一个聊天框。**

> 💡 **它和 Claude Code 什么关系？** 两个是同一赛道的竞品，就像 iOS 和安卓。Claude Code 是 Anthropic 家的，Codex 是 OpenAI 家的，两家你追我赶、互相抄作业，功能高度相似。学会一个，另一个基本一通百通。**新手先挑一个上手就行**（哪个能用上用哪个），别一上来就给自己加负担。

---

## 二、三个名词先说一下

为了让真正零基础的朋友也能跟下去，先把后文反复出现的三个词解释清楚。

**Codex 模式**：合并之后，Codex 不再单独下载，而是新版 ChatGPT 桌面应用左侧的一个入口，点一下就切换过去。除了这个图形界面，Codex 还有命令行、IDE 插件（IDE 就是程序员写代码用的软件）、网页版等用法，合并**不影响**它们。对小白来说，**桌面应用里的 Codex 模式最简单**：有窗口、有按钮，跟用微信、QQ 一样。本篇主要讲它。

**ChatGPT 账号**：Codex 直接用你的 ChatGPT 账号登录，额度也和你的 ChatGPT 会员绑定。**没有 ChatGPT 账号 / 没法翻墙的朋友先别急**，第九章专门讲国内怎么办。

**任务 / Prompt（提示词）**：你交代给 Codex 的那段话，比如"帮我做一个用药提醒的小网页"。说得越清楚，它干得越准，这个后面第八章会专门教。

---

## 三、第一步：下载并安装

现在只要装一个软件：**新版 ChatGPT 桌面应用**，Codex 就在里面。

官方下载页（认准 chatgpt.com 官网）：

```
https://chatgpt.com/download
```

打开网页，选你电脑对应的系统下载：

- **Mac 用户**：下载 .dmg 文件，双击打开，把 ChatGPT 图标拖进"应用程序"文件夹就装好了。之后在"启动台"或用 `Command + 空格` 搜 "ChatGPT" 打开。
- **Windows 用户**：可以直接在微软应用商店搜 "ChatGPT" 点获取，或者用官网给的安装包。装完在开始菜单就能找到。

装好后打开，**在应用左侧找到 Codex 入口切换过去**，就是本篇要用的界面了。

> 💡 **Mac 用户注意芯片**：下载 macOS 版时可能会让你选「Apple 芯片」还是「Intel 芯片」。怎么看自己是哪种？点屏幕左上角苹果标志 →「关于本机」，写着 "Apple M…"（比如 M1/M2/M3）就选 Apple 芯片，写着 "Intel" 就选 Intel。2020 年底以后买的 Mac 基本都是 Apple 芯片。

> 💡 **以前装过独立 Codex App 的老用户**：不用卸载重装，正常更新即可，更新后它就自动变成新版 ChatGPT 桌面应用，你的项目、设置、历史记录都会保留。以前装的旧版 ChatGPT 桌面应用则被改名 **ChatGPT Classic**（经典版），功能不再更新，建议直接换用新版。

> ⚠️ **Mac 第一次打开提示"无法验证开发者"？** 这是 macOS 的安全机制。去"系统设置 → 隐私与安全性"，往下拉找到相关提示，点"仍要打开"即可。这是正常现象，不是软件有问题。

> 💡 **想用命令行版（CLI）的进阶用户**：命令行版不受这次合并影响，照常独立安装。Mac/Linux 一行命令 `curl -fsSL https://chatgpt.com/codex/install.sh | sh`；也支持 `brew install --cask codex` 或 `npm i -g @openai/codex@latest`。小白不用管这段，装上面的桌面应用就够了。

---

## 四、第二步：登录

装好后第一次打开，第一眼看到的就是登录界面。登录有两种方式，**绝大多数人用第一种。**

### 路线 A：用 ChatGPT 账号登录（推荐）

界面上点"使用 ChatGPT 继续"，它会跳到浏览器让你确认账号，点 "Continue"（继续）就登录好了。

![用 ChatGPT 账号登录的两步：① 点"使用 ChatGPT 继续" ② 确认账号点 Continue](/images/stage-5/codex-login-chatgpt.png)

*登录两步：① 点"使用 ChatGPT 继续" → ② 浏览器里确认你的 ChatGPT 账号，点 Continue（截图拍摄于合并前的独立 Codex App，新应用流程相同）*

**关于额度（很重要）**：从免费版到 Plus、Pro、企业版，各档 ChatGPT 会员都能用 Codex，区别在"能用多少、能用哪些模型"。**没有固定的"每天几次"，而是按你的会员等级、用的模型、任务复杂度动态计算的。** 一个大致的体感：

<div style="margin:20px 0;border:1px solid #e2e2e2;border-radius:12px;overflow:hidden;">
  <div style="display:flex;background:#f5f5f5;font-weight:700;font-size:13px;color:#555;padding:12px 16px;">
    <div style="flex:1;">会员等级</div><div style="flex:2;">用 Codex 的体验（经验值，非官方承诺）</div>
  </div>
  <div style="display:flex;font-size:14px;padding:12px 16px;border-top:1px solid #eee;">
    <div style="flex:1;">免费 / Go</div><div style="flex:2;color:#999;">可以用，但额度紧、模型选择少，只能浅尝</div>
  </div>
  <div style="display:flex;font-size:14px;padding:12px 16px;border-top:1px solid #eee;background:#fafafa;">
    <div style="flex:1;">Plus（约 $20/月）</div><div style="flex:2;">日常轻度使用够用</div>
  </div>
  <div style="display:flex;font-size:14px;padding:12px 16px;border-top:1px solid #eee;">
    <div style="flex:1;">Pro（约 $200/月）</div><div style="flex:2;">额度宽裕，模型全开，可以放开了用</div>
  </div>
</div>

你随时可以点头像，看到自己的实时用量（"剩余用量"面板），心里有数：

![头像菜单里的"剩余用量"面板，显示 5 小时和 1 周的剩余比例](/images/stage-5/codex-usage-panel.png)

*点头像就能看到"剩余用量"：5 小时窗口、1 周窗口各剩多少，还有"升级至 Pro"入口*

> 💡 **价格、额度和模型阵容 OpenAI 经常调整**，光是 2026 年 7、8 两个月就改过好几轮。上面的体感仅供参考，**一切以你登录后的官方 pricing 页面和用量面板为准**。如果你已经是 ChatGPT 会员，登录后直接用，不用额外付费。

### 路线 B：用 API Key 登录（进阶）

如果你不想绑 ChatGPT 会员，而是想用按量计费的 OpenAI API Key，可以在登录界面选"使用其他方式登录"，填入你的 `OpenAI API 密钥`。

![用 OpenAI API 密钥登录的界面](/images/stage-5/codex-login-apikey.png)

*API Key 登录界面：把你的 OpenAI API 密钥粘进去即可。注意这种方式部分功能会受限*

> ⚠️ API Key 方式属于进阶玩法，主要面向命令行 / 编程自动化场景。用它登录时，**部分桌面和云端功能会用不了**（比如 GitHub 代码审查、Slack 集成等），新模型也可能晚一些才开放。**小白优先用路线 A（ChatGPT 账号登录）。** 至于"国内没有 ChatGPT 账号怎么办"，看第九章。

---

## 五、第三步：认识界面

登录后，先记住左边那一列模式切换：Chat、Work、Codex。**本篇讲的是 Codex 模式**，切过去之后，界面其实就分三块：

![Codex 模式主界面分三块：① 对话区 ② 功能区 ③ 对话历史区](/images/stage-5/codex-ui-annotated.png)

*Codex 模式三大区：① 中间是对话区（你跟它说话的地方）② 左上是功能区（新对话、搜索、插件、自动化等）③ 左下是对话历史区（你的项目和历史对话都在这）（截图拍摄于合并前的独立 App，布局以你电脑上的新版为准）*

这里有一个**新手最该先搞懂的概念**：「对话」和「项目」的区别：

<div style="display:flex;gap:16px;flex-wrap:wrap;margin:20px 0;">
  <div style="flex:1;min-width:240px;border:1px solid #e2e2e2;border-radius:12px;padding:20px;background:#fafafa;">
    <div style="font-size:15px;font-weight:700;margin-bottom:8px;">💬 对话</div>
    <div style="font-size:14px;line-height:1.7;color:#444;">用来处理<strong>零碎小任务</strong>：问个问题、改一段文字、随手让它办件小事。用完就丢，不绑定文件夹。</div>
  </div>
  <div style="flex:1;min-width:240px;border:1px solid #e2e2e2;border-radius:12px;padding:20px;background:#fafafa;">
    <div style="font-size:15px;font-weight:700;margin-bottom:8px;">📁 项目</div>
    <div style="font-size:14px;line-height:1.7;color:#444;">绑定你电脑上的<strong>文件夹</strong>，是真正干活的主战场。一个项目下可以开<strong>多条独立对话</strong>，它们共享文件夹但记录互相隔离。2026 年 7 月起，一个项目还能同时关联<strong>多个文件夹 / 多个代码仓库</strong>，跨文件夹读写。</div>
  </div>
</div>

> 💡 **新手最容易犯的错**：把所有事情都堆在同一条对话里。一条对话里它能记住的内容是有限的，旧的、不相干的内容塞太多，它就开始抓不住重点、"忘事"、跑偏（这种现象叫"上下文污染"，可以理解成"一个对话里混进太多杂事，它就乱了"）。**正确做法是：不同的任务开不同的对话**，前期把分类做好，后期才不会抓狂。

**推荐的初始设置**（在设置里调）：

- **模型**：选界面里最新的旗舰系列（截至 2026 年 9 月是 GPT-5.6 家族起，9 月初又随新一代模型升级过一轮。OpenAI 更新很快，**认界面里标"最新"的那个就行**）。同一家族通常分几档：最强档干硬活、均衡档日常用、快速档省钱省时间，按任务难度选
- **推理强度**：就是"让它想多深"。想得越深越细致、越不容易出错，但也越慢、越费额度。日常用"高"，复杂大活用"超高"就行
- **速度**：选"标准"就行（"快速"模式响应更快、约 1.5 倍速，但更费额度，具体倍率随模型变化，以官方说明为准）
- **跟进行为**：建议改成"引导"，这样任务跑到一半你想插一句修改，可以直接打断，不用干等它跑完

---

## 六、第四步：跑通你的第一个任务

光看不练没感觉。这一章我们用一个最简单的例子，让你**亲眼看 Codex 干一次活**。不用懂任何技术，跟着点就行。

我们的目标：**让 Codex 做一个咖啡馆的官网。**（你也可以换成任何你想要的，比如"做一个我家猫咪的介绍页"。）

**第一步：新建一个项目**

在输入框左下角有一个带文件夹图标的小按钮（下面那张图里就能看到，写着项目名字），点它 → 选"新建空白项目" → 给它起个名字（比如 `咖啡店`）。这一步是给 Codex 划一块专属的地盘，它做出来的东西都会放在这里。

**第二步：把需求说给它听**

在输入框里打一句话，比如：

```
帮我做一个咖啡馆官网，风格温暖精致，设计要专业、美观
```

![在咖啡店项目里输入需求：帮我做一个咖啡馆官网](/images/stage-5/codex-first-task-prompt.png)

*在项目里直接用大白话描述你要什么，不用写任何代码*

**第三步：让它先给方案（开"计划模式"）**

发送前，建议先打开"计划模式"（下一章细讲，这里先体验）。Codex 不会闷头乱做，而是先把"我打算怎么做"列成一份清单，问你"要不要就这么干"。你看一眼，点"是，实施此计划"。

![Codex 先给出一份建站计划，并询问是否实施](/images/stage-5/codex-plan-output.png)

*Codex 先把计划列清楚（要建哪些文件、什么风格、第一屏长什么样），等你确认，这一步能避免它理解偏*

**第四步：等它做完，看成果**

点确认后，它就开始自己写、自己调，几分钟后一个像模像样的网页就出来了，你可以直接在它内置的浏览器里看到效果：

![Codex 做好的咖啡馆官网成品页面](/images/stage-5/codex-first-task-result.png)

*这就是 Codex 几分钟做出来的咖啡馆官网首屏，你全程只说了一句话*

到这里，你已经完整跑通一次了：**说需求 → 看方案 → 出成果。** 这就是 Codex 干活的基本节奏，后面所有复杂任务，都是这个节奏的放大版。

> 💡 **不满意？直接接着说。** 比如"标题再大一点""换成深色背景""加一个菜单栏"，它会在原来的基础上继续改，不用从头来。

---

## 七、第五步：让它不跑偏（计划模式 + AGENTS.md）

上一章你已经体验过"计划模式"了。这一章把"让它不跑偏"的两个工具讲透：**计划模式**管"这一次别跑偏"，**AGENTS.md** 管"以后每次都按我的规矩来"。

### 7.1 计划模式：先商量，再动手

直接让 Codex 干一件稍微复杂的事，它有时会理解偏、上来就乱改。**计划模式**解决这个问题：它会先把"我打算怎么做"列出来、向你提问确认，等你点头了才真正动手。

**在哪里开？** 点输入框左边的"＋"，把"计划模式"的开关打开就行：

![输入框的＋菜单里，打开"计划模式"开关](/images/stage-5/codex-plan-toggle.png)

*点输入框左下角的"＋"，里面就有"计划模式"开关（下面那个"追求目标"是进阶功能，第八章会讲）*

打开后，Codex 遇到不清楚的地方会反过来问你：

![计划模式下，Codex 会先提问确认方案，再开始干活](/images/stage-5/codex-plan-mode.webp)

*开了计划模式后，Codex 会把需求拆开、反问你几个关键问题，你确认后它才执行，避免一上来就跑偏*

> 💡 **建议**：但凡是稍微复杂一点的任务，都先开计划模式过一遍。多花一分钟确认方案，能省掉后面十分钟的返工。

### 7.2 AGENTS.md：给 Codex 立的"家法"

AGENTS.md 是一个文本文件，相当于你给 Codex 写的一份"长期工作守则"。写进去的规矩，它每次干活都会自动遵守，不用你反复叮嘱。

> 💡 如果你用过 Claude Code，AGENTS.md 就相当于那边的 `CLAUDE.md`，作用一模一样，只是名字不同。

它分两层，从上到下管你：

<div style="margin:20px 0;">
  <div style="border:1px solid #d0d7de;border-radius:12px 12px 0 0;padding:16px 20px;background:#f6f8fa;">
    <div style="font-weight:700;font-size:15px;margin-bottom:4px;">🌐 全局 AGENTS.md（管所有项目）</div>
    <div style="font-size:14px;color:#555;line-height:1.7;">放在你电脑用户目录下的 <code>~/.codex/AGENTS.md</code>（就是 .codex 这个隐藏文件夹里）。写进去的规矩，比如"所有回答用中文""改代码前先解释你要改什么"，对<strong>每一个项目</strong>都生效。</div>
  </div>
  <div style="border:1px solid #d0d7de;border-top:none;border-radius:0 0 12px 12px;padding:16px 20px;background:#fff;">
    <div style="font-weight:700;font-size:15px;margin-bottom:4px;">📁 项目级 AGENTS.md（只管这个项目）</div>
    <div style="font-size:14px;color:#555;line-height:1.7;">放在某个项目文件夹的根目录里，<strong>只对这个项目生效</strong>。比如"这个项目用蓝色主题""不要动 data 文件夹"。</div>
  </div>
</div>

> 💡 **不知道 `~/.codex` 在哪？** 不用手动找。两个省事办法：① 直接对 Codex 说一句"帮我在全局 AGENTS.md 里加一条：所有回答用中文"，它会自己处理好文件位置；② 开一个新项目时输入 `/init` 指令，它会读一遍项目内容，**自动生成一份 AGENTS.md 草稿**，你再在它的基础上改。

**AGENTS.md 长什么样？** 它就是一个纯文本文件，里面一条条写你的规矩，像这样：

```markdown
# 我的工作规矩

- 所有回答和注释都用中文
- 动手改之前，先用一两句话说清你打算怎么做
- 只做我要求的事，不要自作主张加我没要的功能
- 只改该改的地方，别顺手去动其他文件
```

**不知道写什么？** 这里给一个被广泛推荐的通用模板（源自 AI 研究者 Karpathy），照抄进全局 AGENTS.md 就很好用，核心是四条：

<div style="margin:16px 0;border-left:3px solid #10a37f;padding:8px 0 8px 18px;background:#f7fbfa;border-radius:0 8px 8px 0;">
<div style="margin-bottom:10px;"><strong>① 先想再做</strong>　动手前先说清你的理解和假设，不确定的地方先问我，别自己瞎猜。</div>
<div style="margin-bottom:10px;"><strong>② 简单优先</strong>　只做我要求的事，不要自作主张加一堆我没要的功能。</div>
<div style="margin-bottom:10px;"><strong>③ 外科式修改</strong>　只改该改的地方，不要顺手"重构"其他没让你动的代码。</div>
<div><strong>④ 目标驱动</strong>　把"修个 bug"变成"写一个测试，让它通过"，用可验证的结果来确认任务真的完成了。</div>
</div>

---

## 八、第六步：怎么跟 Codex 好好说话

工具再强，话说不清也白搭。给 Codex 派活，记住一个"四件套"公式，比你写一长段话有用得多：

<div style="margin:20px 0;border:1px solid #e2e2e2;border-radius:12px;overflow:hidden;">
  <div style="display:flex;background:#10a37f;color:#fff;font-weight:700;font-size:13px;padding:12px 16px;">
    <div style="flex:1;">说清楚</div><div style="flex:2;">举例</div>
  </div>
  <div style="display:flex;font-size:14px;padding:12px 16px;border-top:1px solid #eee;">
    <div style="flex:1;font-weight:600;">① 要什么</div><div style="flex:2;color:#444;">"做一个用药提醒的网页"</div>
  </div>
  <div style="display:flex;font-size:14px;padding:12px 16px;border-top:1px solid #eee;background:#fafafa;">
    <div style="flex:1;font-weight:600;">② 范围</div><div style="flex:2;color:#444;">"就在 health 这个文件夹里做"</div>
  </div>
  <div style="display:flex;font-size:14px;padding:12px 16px;border-top:1px solid #eee;">
    <div style="flex:1;font-weight:600;">③ 约束</div><div style="flex:2;color:#444;">"别动其他文件，配色用浅色"</div>
  </div>
  <div style="display:flex;font-size:14px;padding:12px 16px;border-top:1px solid #eee;background:#fafafa;">
    <div style="flex:1;font-weight:600;">④ 完成标准</div><div style="flex:2;color:#444;">"我能在浏览器里看到三种药的提醒时间"</div>
  </div>
</div>

> 💡 **一个反面教材**：别说"帮我改进一下这个页面"。"改进""优化""更好"这类模糊词，Codex 没法衡量，也就没法对照着干，最后给你的多半不是你想要的。**把"改进"换成可以检验的具体结果。**

### 进阶：`/goal` 指令，把目标钉死

当你要让 Codex 干一件比较大、要跑很久的活时，可以用 `/goal` 指令。它和普通派活的区别是：

- **普通派活**：给它一个"动作指令"，让它做某件事。
- **`/goal`**：给它一个"成功条件"，让某件事变成真，它会自己反复循环、自我验证，直到达成你定义的目标为止。

为什么需要它？因为对话一长，Codex 容易"忘记最初为什么要做这件事"。`/goal` 像一个锚，把目标钉在那里，哪怕聊了很久也不跑偏。写一个好的 `/goal`，结构是这样的：

```
/goal 让 [最终结果] 成真。
范围：[Codex 可以碰哪些东西]
约束：[哪些不能动、哪些规则必须守]
完成条件：[可以验证的条件 1、2、3]
停止条件：[什么情况下它应该停下来等我]
```

> ⚠️ **务必加"停止条件"**：比如"删除文件前先问我""花费超过某个额度就停"。这是给一个会自己一直干下去的 AI 上的安全锁，别省。

---

## 九、国内能用吗？没有 ChatGPT 账号怎么办

> 🚪 **先看这里**：如果你能用官方 ChatGPT 账号登录（第四章路线 A），**直接跳过这一章**，你已经能正常用 Codex 了。下面这些是给"实在没有 ChatGPT 账号"的人准备的替代办法，里面会出现一些技术词。**看不懂也完全正常，不影响你用 Codex**，跳过就好。

这是国内朋友最关心的问题。先把话说清楚：

**Codex 最稳、最省心的方式，永远是官方 ChatGPT 账号登录。** 下面这些都是**第三方 / 社区自己折腾出来的方案，不是 OpenAI 官方功能，也没有官方背书，用了出问题要自己担风险。** 新手能用官方账号就别碰这些。

合并之后有一点要先明白：**这些第三方方案作用的对象是 Codex 的命令行（CLI）和本地配置，不是合并后的 ChatGPT 桌面应用。** 也就是说，走国内方案你用的是命令行版的 Codex，图形界面换成了第三方工具自己做的壳。核心思路都一样：**把 Codex 背后调用的"大脑"，从 OpenAI 换成国产大模型（或第三方中转服务）。** 有三条路，按"省心程度"排：

<div style="margin:20px 0;border:1px solid #e2e2e2;border-radius:12px;overflow:hidden;">
  <div style="display:flex;background:#f5f5f5;font-weight:700;font-size:13px;color:#555;padding:12px 16px;">
    <div style="flex:1.2;">方案</div><div style="flex:1;">适合谁</div><div style="flex:1.5;">怎么回事</div>
  </div>
  <div style="display:flex;font-size:14px;padding:12px 16px;border-top:1px solid #eee;">
    <div style="flex:1.2;font-weight:600;">② Codex++ 工具<br><span style="font-size:12px;color:#10a37f;">（小白首选）</span></div>
    <div style="flex:1;color:#444;">怕折腾、想要图形界面的人</div>
    <div style="flex:1.5;color:#444;">一个图形化管理工具，点点鼠标帮你把配置写好、测试连通、再启动 Codex</div>
  </div>
  <div style="display:flex;font-size:14px;padding:12px 16px;border-top:1px solid #eee;background:#fafafa;">
    <div style="flex:1.2;font-weight:600;">① 手动改配置</div>
    <div style="flex:1;color:#444;">想搞懂原理、愿意自己排错的人</div>
    <div style="flex:1.5;color:#444;">手动改 <code>~/.codex/config.toml</code> 文件，填模型供应商、地址、密钥等字段</div>
  </div>
  <div style="display:flex;font-size:14px;padding:12px 16px;border-top:1px solid #eee;">
    <div style="flex:1.2;font-weight:600;">③ CCX + CC Switch</div>
    <div style="flex:1;color:#444;">多供应商、多密钥的重度玩家</div>
    <div style="flex:1.5;color:#444;">用网关做协议转换和路由，桌面工具做供应商切换</div>
  </div>
</div>

### 推荐方案：Codex++（最省心）

对绝大多数国内小白，直接用 **Codex++** 这个第三方管理工具。它会自动检测你的 Codex 装在哪、版本对不对，再用图形界面帮你填供应商和密钥，全程点鼠标，不用手写配置文件。

![Codex++ 管理工具界面：自动检测 Codex 环境，图形化配置供应商](/images/stage-5/codex-plus-tool.webp)

*Codex++ 管理工具：左边是供应商配置、工具插件等菜单，中间会自动检查 Codex 版本、安装位置、启动入口是否正常，点按钮就能修复和启动*

> ⚠️ 合并之后这类第三方工具也在跟着改版，**安装前先看一眼它的最新说明**，确认支持你装的 Codex 版本。

### 如果你想手动配置

核心就一件事：改 `~/.codex/config.toml` 这个文件（它是 Codex 的本地配置档案）。有几个**最容易踩的坑**先提醒你：

- **先备份**：动手前把 `config.toml` 和 `auth.json` 复制一份留底。
- **名字要对齐**：你写的供应商名称，要和配置里 `[model_providers.xxx]` 那个名字完全一致。
- **地址只写到 `/v1`**：Base URL（模型服务的入口地址）一般写到 `/v1` 为止，别多写。
- **接口形态要对**：Codex 只认 `responses` 这种接口（官方叫 Responses API），配置里写 `wire_api = "responses"`。有些国产模型只支持另一种老接口（Chat Completions），这种就接不上，需要中转工具（CCX）在中间转换一下。
- **密钥别写死**：API Key 用 `env_key` 指向环境变量，别直接写在配置文件里，更别传到网上。
- **Mac 要从终端重启**：改完之后，完全退出 Codex，再从终端启动，否则它可能读不到新配置。

> 💡 **哪些是官方支持的、哪些是第三方？** 改 `~/.codex/config.toml` 里的 `model_providers`、`base_url`、`wire_api`、`env_key` 这些字段来接别的模型，是 Codex **官方配置文件本身就支持**的能力。但 **Codex++、CCX、CC Switch 这些是第三方工具，不是 OpenAI 出的，也没有官方背书**：能用，但出问题得自己排查。

> ⚠️ **安全提醒**：用第三方 API、中转服务、第三方工具时务必做到：密钥不外泄、不要写进任何会上传的文件、改前先备份、配好后先用一个"只读"的小任务验证一下，确认正常再正式用。这些工具和国产模型迭代很快，**具体的供应商名称、地址、支持的接口，请以你充值时各平台公布的为准**，本文只讲思路，不保证字段永远不变。

---

## 十、进阶能力一览：Codex 还能干这些

把基础跑通后，下面这些是 Codex 比较有特色的能力，按需了解。2026 年 7 月并入 ChatGPT 前后，它密集更新过一轮，下面标了"新"的都是这一轮加的：

- **内置浏览器批注**：做完一个网页，可以直接在自带的浏览器里圈选某个元素、提出具体的修改意见（比如"这个标题字号大一号""这里换成蓝色"），它再照着改，比你截图、打字描述高效得多。
- **多文件夹 / 多仓库项目**（新）：一个项目可以同时挂几个文件夹，比如代码在一个目录、文档和参考资料在另一个目录，它能跨着读写。
- **Diff 内联编辑 + PR 审查**（新）：它改完代码后，你可以直接在改动对比（Diff）里针对某一行写评论、让它改；用 GitHub 的话，侧边栏就能审 Pull Request（程序员合并代码前的评审环节）。
- **语音指挥**（新）：2026 年 7 月底起，可以直接说话让它干活，甚至同时指挥几个并行的任务。
- **联网搜索**：让它自己上网查资料、看最新信息，再整理给你。
- **代码审查**：让它检查一段代码或一个改动有没有问题。
- **手机端远程控制**：电脑上跑着的任务，可以用手机上的 ChatGPT App 远程查看、引导，吃饭路上也能让它继续干（Mac 和 Windows 电脑都支持被手机远程连接）。
- **插件 / Skills**：把你最常做的事打包成一个"技能"，叫一声就执行，省去每次重复描述。

### Computer Use：让 Codex 直接操作你的电脑

这是 Codex 一个很强的能力：**它能用自己的"虚拟鼠标键盘"，直接操作你电脑上的其他软件**。

举个真实例子：你想做一个手机 App，但开发要用一个叫 Xcode 的工具，你根本没装过、也不会装。这时你不用管 Xcode 是什么，直接让 Codex 的 Computer Use 帮你"去搜索、下载、安装"，它会自己一步步点下去，只有遇到要输密码、要登录这种敏感步骤才停下来交给你。

![Computer Use 替你操作 Xcode：它自己点击菜单、选择设备、执行编译](/images/stage-5/codex-computer-use-xcode.webp)

*Computer Use 工作中：右边它一条条记录"已点击 Xcode""已查看 Xcode"，左边是它正在操作的 Xcode 界面，你只需要在旁边看着*

这个能力要在设置里授权：

![在「电脑操控」设置里，开启允许控制应用、浏览器、锁屏后操作](/images/stage-5/codex-computer-use-settings.webp)

*设置 → 电脑操控：可以分别授权"控制任意应用""连接浏览器""锁屏后继续操作"。给多大权限，看你自己对风险的接受程度*

> 💡 **Mac 和 Windows 的差别**：Computer Use 现在 **Mac、Windows 都支持**，只是方式不同：Mac 可以在后台操作、不打扰你；Windows 上它会接管你当前的桌面前台（你得让出屏幕给它）。
>
> 真正还是 **Mac 独有**的，是这几个偏"系统级"的能力：**Appshots**（连按两下 Command 把当前窗口截图发给 Codex）、**锁屏后继续操作**、**屏幕记忆 Computer History**（经你授权后，它能记住你最近在屏幕上的操作上下文，2026 年 8 月起从实验功能转为正式上线，部分地区陆续开放）。Windows 用户用不到这几个，但日常的对话、写代码、做网页、操控电脑都不受影响。

---

## 十一、常见问题

**Q1：Codex 和 ChatGPT 是一个东西吗？要单独付钱吗？**

2026 年 7 月起，可以算是"一个东西"了：Codex 不再是独立软件，而是 ChatGPT 桌面应用里的一个模式。它用你的 ChatGPT 账号登录，额度和 ChatGPT 会员绑定。**如果你已经是 ChatGPT 会员，用 Codex 不用再额外付费**，共用一份额度。

**Q2：我以前装的独立 Codex App 怎么办？**

正常更新就行。更新后它自动变成新版 ChatGPT 桌面应用，项目、设置、历史记录都保留。如果你以前装的是旧版 ChatGPT 桌面应用，它已被改名 ChatGPT Classic、不再更新，建议换到新版。

**Q3：我完全不会编程，能用 Codex 吗？**

能。Codex 名字里虽然有 "Code"，但它早就不只是写代码工具了。做网页、整理文件、分析数据、操作电脑……很多事它都能替你干。不会编程反而更要靠它，它能帮你把不会的部分（比如装开发工具）也一并做了。

**Q4：国内没有 ChatGPT 账号，是不是就用不了？**

不是。看第九章，有三种替代接入方案，其中 Codex++ 对小白最友好。注意这些方案作用在命令行版的 Codex 上，和合并后的桌面应用不是一回事。要有心理准备：这些方案比官方账号折腾，且效果取决于你接的国产模型能力。

**Q5：让它干活时它乱改、跑偏怎么办？**

两个办法：①任务复杂就先开**计划模式**，让它先报方案再动手；②把规矩写进 **AGENTS.md**，比如"改前先解释""别动其他文件"。详见第七章。

**Q6：它干到一半，我想停下来或者改方向？**

把"跟进行为"设成"引导"（第五章），就能中途直接打断、插入新的指示，不用干等它跑完。

**Q7：Windows 用户是不是很吃亏？**

不太吃亏。对话、写代码、做网页、计划模式、AGENTS.md，乃至"操控电脑"（Computer Use），现在 Windows 都能用。只有几个偏系统级的小功能（Appshots 截窗、锁屏后继续操作、屏幕记忆 Computer History）暂时是 Mac 独有，详见第十章。

**Q8：Codex 和 Claude Code 我该学哪个？**

两个高度相似，学会一个另一个很快上手。建议**先挑一个上手就行**（哪个能用上用哪个），把基本节奏跑顺。等工作里真用出依赖、有余力了，再装另一个换着用。它们各有所长，但一开始没必要给自己加负担。

---

## 十二、下一步去哪

装好、跑通第一个任务，只是开始。Codex 真正的价值，是把它用进你自己的日常工作流之后才显现。

几个值得接着探索的方向：

- **把常做的事封装成 Skill / 插件**：叫一声就执行，省下重复描述的时间
- **用好 `/goal` 跑大任务**：定义清楚成功条件，让它自己长时间循环验证
- **试试旁边的 Work 模式**：调研、写报告、整理数据这类要跑很久的活，交给它比聊天模式靠谱
- **学有余力，再添一把武器**：Codex 用顺之后，可以把另一个主流 Agent 工具 Claude Code 也装上，两个都掌握，AI 干活这条路就基本打通了

---

## 扩展阅读

本文内容综合参考了以下一手教程和报道，强烈推荐阅读原文（前几篇写于 Codex 独立 App 时期，操作细节以本文和官方最新说明为准）：

- [《Codex 终于反超 Claude Code，但付出了惨重代价》](https://www.36kr.com/p/3915298041834883) · **36氪**（2026-07，Codex 并入 ChatGPT 与 OpenAI 产品收缩的来龙去脉）
- [《从0到1带你速通Codex，我整理的终极保姆教程来了》](https://mp.weixin.qq.com/s/5kgVdLNABViv8uAnD0M6Ag) · 数字生命卡兹克（微信公众号）
- [《写给 Codex 小白用户的全网最详细教程：从 0 到 1，把它真正用起来》](https://mp.weixin.qq.com/s/Dly84gYy3tI7CZzcx6F3hQ) · AI范儿（微信公众号）
- [《【保姆级教程】Codex 国内也能畅快用，亲测有效》](https://mp.weixin.qq.com/s/Qvfr9LC2wF9ltCEyKFqK3g) · 苍何（微信公众号）
- [《Codex /goal 实战指南：一个指令改变你写代码的方式》](https://mp.weixin.qq.com/s/OnkP8IDUYpT6hv1rKW4pkg) · AI的岔路口（微信公众号）
