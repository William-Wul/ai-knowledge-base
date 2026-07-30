---
title: AI 工具会把你的数据传到哪里
description: 用 AI 工具时，数据外流有两条通道：你亲手输入的，和工具在后台自己收集的。借最近的 Grok CLI 上传代码库事件，讲清楚第二条通道是怎么回事、哪类工具风险更高、普通人能做什么。
---

# AI 工具会把你的数据传到哪里

**用 AI 工具时，你的数据外流有两条通道：一条是你亲手输入的内容，另一条是工具在后台自己收集的东西。** 第一条的道理大家都懂：别把公司机密和个人隐私贴进对话框。这篇讲第二条，它更隐蔽：**就算你什么敏感内容都没输入，工具本身也可能把你电脑上的文件传出去。**

这不是理论推演。2026 年 7 月，一个正在发生的真实事件把这条通道摆到了台面上。

---

## 一个单词换走整个代码库：Grok CLI 事件

**事件的核心：有安全研究者发现，xAI（马斯克的 AI 公司）官方推出的编程工具 Grok CLI，会在用户不知情的情况下，把整个项目文件夹打包上传到 xAI 的服务器。**

先解释一下 Grok CLI 是什么：它是一个装在电脑上的 AI 编程助手，程序员在命令行（就是那种黑底白字、敲文字指令的窗口）里让它读代码、改代码。同类工具还有 Claude Code、Codex，我们在「AI Agent 使用」板块介绍过。

这类工具要干活，当然需要读你的文件，这本身不是问题。问题是最早发现此事的独立安全研究者 Cereblab 通过抓包（监视软件跟外界网络通信的技术手段）看到：Grok CLI 在往 xAI 的云存储上传**整个项目文件夹**：一个 12GB 的项目，在他叫停测试时已经传出去 5.1GB，里面还有没做脱敏处理的密钥文件。

![安全研究者发帖：Grok CLI 将整个仓库上传至云端，12GB 的项目已捕获 5.1GB 上传，包含未脱敏的密钥](/images/stage-2/2026-07-13/cereblab-alert-tweet.png)
<div class="figcaption">

独立安全研究者 Cereblab 的警报帖：Grok CLI 把整个项目上传到云存储，12GB 的项目在他停止测试时已传出 5.1GB，其中包含未脱敏的密钥文件；界面上的「改进模型」开关关掉也没用。（图源：<a href="https://x.com/cereblab" target="_blank">Cereblab 的 X 账号</a>）

</div>

消息传开后，国内有技术博主做了一个设计得更严格的复现实验：

- 他专门建了一个隔离的测试项目，里面放的全是合成的假文件；
- 然后给 Grok CLI 下了一个不能再小的任务：**只回复一个单词，不许读任何文件**；
- AI 确实只回了一个单词，也没有调用任何读文件的工具；
- 但记录显示，工具在任务开始前和结束后，各打包上传了一份完整的项目「快照」。快照就是某一时刻所有文件的完整副本，相当于把整个文件夹拍照存档。

也就是说，**上传行为跟 AI 有没有看你的文件完全无关**，它是工具内置的一条独立管线：不管你让 AI 干什么，它都先把你的项目复制一份带走。

这两拨独立测试还交叉验证出两个更值得注意的细节：

**第一，上传范围超出了项目本身。** 打包时会把工具「顺路读到」的文件也带上，包括项目文件夹之外的其他 AI 工具配置文件，其中有包含密钥的文件。密钥（API Key）相当于程序世界里的账号密码，泄露了别人就能冒用你的身份调用付费服务。

**第二，开关握在厂商手里。** 上传行为由服务器下发的远程配置控制：厂商在后台改一个参数，你电脑上的工具就开始或停止上传，全程不需要更新软件，也不会通知你。研究者保存的记录显示，这个开关曾经默认打开，事件曝光后才被服务端关掉。

需要说明边界：这是第三方安全研究者的发现和复现，不是官方审计结论，细节仍在持续核实中。但「工具具备一条不受用户控制的上传管线」这一点，有可复现的实验支撑。

---

## 数据外流的两条通道

把这个事件放进大图里看，AI 工具的数据外流通道其实就两条：

<div style="display:flex; gap:14px; flex-wrap:wrap; margin:18px 0;">
  <div style="flex:1; min-width:240px; border:2px solid #cde0d4; border-radius:12px; padding:18px; background:#f1f6f2;">
    <div style="font-weight:700; color:#2D5A3D; margin-bottom:8px;">通道一：你输入的</div>
    <div style="font-size:14px; line-height:1.9; color:#33503c;">你贴进对话框的文字、上传的文件<br>→ 可能存在服务器上，可能被用于训练<br>→ <b>你看得见，也控制得了</b><br><span style="color:#2D5A3D; font-weight:600;">管住它靠的是你自己的判断。</span></div>
  </div>
  <div style="flex:1; min-width:240px; border:2px solid #d9c4c4; border-radius:12px; padding:18px; background:#faf3f3;">
    <div style="font-weight:700; color:#9a4a4a; margin-bottom:8px;">通道二：工具自己收集的</div>
    <div style="font-size:14px; line-height:1.9; color:#5a4040;">遥测数据、运行日志、文件快照<br>→ 在后台运行，界面上未必有提示<br>→ <b>你看不见，开关可能在厂商手里</b><br><span style="color:#9a4a4a; font-weight:600;">管住它靠的是厂商自律和外部监督。</span></div>
  </div>
</div>
<p class="figcaption">《安全红线》管的是通道一，这篇讲的 Grok CLI 事件走的是通道二。</p>

通道二里最常见的形式叫**遥测（telemetry）**：软件自动向厂商回传使用数据的机制。它本意是正当的，比如崩溃了发个报告、统计哪些功能有人用，好改进产品，几乎所有现代软件都有。但遥测的边界如果失守，从「回传崩溃日志」滑到「回传你的文件内容」，就成了这次事件里的样子。两者在技术上只隔一层配置，隔开它们的是厂商的规矩。

---

## 为什么装在电脑上的 AI 工具，风险天然更高

**风险大小跟着权限走：工具能碰到你多少东西，出事时就能带走多少东西。** 按权限从小到大排：

<div style="margin:18px 0;">
  <div style="border:1px solid #e3e8e3; border-left:4px solid #c9d6cc; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#fbfcfb;">
    <strong>网页聊天框</strong>（ChatGPT、豆包、Claude 网页版）<br>
    <span style="font-size:14px; color:#555;">只知道你贴给它的内容。它够不着你的电脑，最坏情况就是你输入的东西泄露。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7; margin-left:36px;">
    <strong>装在电脑上、能读写文件的 AI 工具</strong>（Claude Code、Codex、Grok CLI、各类桌面 Agent）<br>
    <span style="font-size:14px; color:#444;">为了替你干活，它拿到了读写文件的权限。它「能读到」的范围，就是理论上「可能被收集」的范围。</span>
  </div>
  <div style="border:2px solid #2D5A3D; border-left:6px solid #2D5A3D; border-radius:8px; padding:14px 16px; background:#eef5f0; margin-left:54px;">
    <strong style="color:#2D5A3D;">能操作整台电脑的 AI 工具</strong>（电脑操作类 Agent，如 Marvis 这类会自己点鼠标敲键盘的助手）<br>
    <span style="font-size:14px; color:#33503c;">屏幕上显示的一切都在它的视野里。能力最强，也最考验厂商的数据边界。</span>
  </div>
</div>
<p class="figcaption">越往下能力越强、越好用，同时对厂商自律的依赖也越重。能力和风险是同一枚硬币的两面。</p>

这正是 Agent 类工具（能自己拆解任务、调用工具、连续干活的 AI）普及后的新课题：以前评价一个 AI 工具只看「聪不聪明」，现在还得看**它拿了什么权限、数据边界清不清楚**。

---

## 让人稍微安心的部分

**同样的抓包测试下，主流工具的表现是干净的。** 最早曝光此事的 Cereblab 用相同方法检查了 Claude Code、Codex 和 Gemini：三者都保持本地运行，只发送它们为完成任务实际打开的文件，他特意放进去的「永不读取」诱饵文件从未离开电脑。Grok CLI 是唯一的例外。

![研究者更新：以相同方式抓包分析 Claude Code、Codex、Gemini，均只发送实际打开的文件，并公开了可自行复现的对比仓库](/images/stage-2/2026-07-13/cereblab-other-tools.png)
<div class="figcaption">

同一位研究者的后续更新：用相同方法测试 Claude Code、Codex、Gemini，均只发送实际打开的文件；他同时公开了复现仓库，任何人都可以自己验证。（图源：<a href="https://x.com/cereblab" target="_blank">Cereblab 的 X 账号</a>）

</div>

但正确的结论不是「用大厂的就绝对安全」，而是：**技术上所有这类工具都做得到偷传数据，今天没做，靠的是厂商的自律，以及随时有研究者在外面抓包盯着。** 这个监督机制是有效的：事件曝光后，上传开关几小时内就被服务端关闭了。作为用户，我们享受这个机制的保护，但自己也要留一手。

---

## 普通人能做的几件事

不需要懂抓包，几个习惯就能把通道二的风险降到很低：

- **只用主流厂商的工具**。来历不明的 AI 小工具、浏览器插件、「破解版」客户端，是通道二风险最集中的地方，数据去向完全没人盯。
- **给 AI 工具划一块专属工作区**。让它在专门建的文件夹里干活，这个文件夹里只放当前任务需要的文件。别在存着合同、财务表、客户资料的文件夹里启动这类工具。
- **敏感资料默认不进 AI 工具的地盘**。跟《安全红线》的检查清单配合：输入前问自己「这段内容公开了会不会出事」，现在再加一条「这个文件夹里有没有跟任务无关的敏感文件」。
- **看一眼隐私设置**。主流工具一般都有「是否允许数据用于改进模型」这类开关，装好后花一分钟关掉不需要的。
- **看到这类新闻先看三个要素**：哪个工具、哪个版本、官方是否回应。是具体工具的具体问题，不是「所有 AI 都在偷数据」，不必因噎废食。

---

## 扩展阅读

- [《我只让Grok回复一个单词，它就把我整个代码库都偷走了。》](https://mp.weixin.qq.com/s/6c6vGMJAVMbh6UhNVw4dcg) · **数字生命卡兹克**（微信公众号）
