---
title: Codex 并入 ChatGPT：OpenAI 把三张牌收成了一张
description: 7 月 9 日 Codex 正式并入 ChatGPT 桌面应用，独立 App 退役，同期 ChatGPT Work 上线、Atlas 浏览器关停。两个月后回看：到底改了什么、老用户怎么办、国内方案受不受影响
date: 2026-09-05
---

# Codex 并入 ChatGPT：OpenAI 把三张牌收成了一张

<p class="post-meta">2026 年 9 月 5 日 · AI 新闻</p>

7 月 9 日，OpenAI 把自家编程助手 Codex 并进了 ChatGPT 桌面应用，独立的 Codex App 就此退役。这件事我们没在第一时间写，因为合并刚发生的那两周，迁移问题、界面变动一天一个样。现在两个月过去，该改的改完了，影响也看清楚了，是时候补一篇完整的交代。

---

## 一、发生了什么

硬信息就一条主线：**OpenAI 把桌面端原本分散的三个产品，收进了一个应用。**

<div style="margin:20px 0;">
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#fbfcfb;">
    <strong>7 月 9 日 · 合并</strong><br>
    <span style="font-size:14px; color:#555;">Codex 并入新版 ChatGPT 桌面应用（Mac / Windows），应用内分 Chat、Work、Codex 三个模式；旧版 ChatGPT 桌面应用改名「ChatGPT Classic」，停止更新。独立 Codex App 用户正常更新即迁移，项目、设置、历史保留。同天 GPT-5.6 全量上线，Sol / Terra / Luna 三档进 Codex。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7; margin-left:28px;">
    <strong>7 月 23 日 · 补能力</strong><br>
    <span style="font-size:14px; color:#555;">语音（ChatGPT Voice）接入 Work 和 Codex，动嘴就能指挥多个并行任务；macOS 上线 Appshots（快捷键把窗口截图发给 Codex）；本地项目支持多个文件夹。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7; margin-left:28px;">
    <strong>7 月 30 日 · 强协作</strong><br>
    <span style="font-size:14px; color:#555;">Diff 内联编辑、侧边栏 Pull Request 审查、多仓库联合评审；浏览器升级、Chrome 扩展联动。</span>
  </div>
  <div style="border:1px solid #d9c4c4; border-left:4px solid #b07a7a; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#faf3f3; margin-left:28px;">
    <strong>8 月 9 日 · 砍产品</strong><br>
    <span style="font-size:14px; color:#666;">上线不到十个月的独立 AI 浏览器 Atlas 正式停用，浏览器 Agent 能力并入 ChatGPT 和 Codex。</span>
  </div>
  <div style="border:1px solid #dde7e0; border-left:4px solid #8fbda3; border-radius:8px; padding:12px 16px; margin-bottom:8px; background:#f6faf7; margin-left:28px;">
    <strong>8 月中下旬 · 收尾</strong><br>
    <span style="font-size:14px; color:#555;">屏幕记忆 Computer History 上线（8/13）；Linux 版到来（8/11）；GPT-5.4 / 5.4-mini 于 8 月 31 日从 Codex 退役，ChatGPT 登录用户全部切到 GPT-5.6 家族。</span>
  </div>
  <div style="border:2px solid #2D5A3D; border-left:6px solid #2D5A3D; border-radius:8px; padding:14px 16px; background:#eef5f0; margin-left:56px;">
    <strong style="color:#2D5A3D;">9 月 4 日 · 换引擎</strong><br>
    <span style="font-size:14px; color:#33503c;">GPT-6 Astra 发布，Codex 随之再升级一轮，长任务加了"笔记本"机制（干活间隙主动把重点记到上下文窗口外，需要时再检索回来），治 agent 一干长活就忘事的老毛病。详见站内<a href="/frontier/gpt6-astra-after-claude-ban-wave">《GPT-6 Astra 发布》</a>。</span>
  </div>
</div>
<p class="figcaption">两个月里的完整时间线：先合并、再补能力、同时砍掉 Atlas，最后换上新一代模型。</p>

组织层面还有一个配套动作：7 月 14 日，OpenAI 把 ChatGPT、Codex、API 三条产品线合并成一个统一产品组织，原 Codex 负责人 Tibo Sottiaux 升任核心产品与平台负责人。产品合并不是孤立事件，是整个公司把筹码收到一堆的动作。

---

## 二、合并后的桌面应用，到底是什么结构

很多老用户升级后的第一反应是"我的 Codex 去哪了"。其实它没消失，是换了门牌：

<div style="display:flex;gap:14px;flex-wrap:wrap;margin:20px 0;">
  <div style="flex:1;min-width:200px;border:1px solid #e2e2e2;border-radius:12px;padding:18px;background:#fafafa;">
    <div style="font-size:15px;font-weight:700;color:#555;margin-bottom:8px;">💬 Chat</div>
    <div style="font-size:14px;line-height:1.7;color:#444;">原来那个聊天机器人，问答、写作、讨论方案。</div>
  </div>
  <div style="flex:1;min-width:200px;border:1px solid #e2e2e2;border-radius:12px;padding:18px;background:#fafafa;">
    <div style="font-size:15px;font-weight:700;color:#555;margin-bottom:8px;">📋 Work</div>
    <div style="font-size:14px;line-height:1.7;color:#444;">这次新上的长任务模式：跨应用、跨文件连续干几个小时，产出文档、表格、PPT 和可分享的网站页面。</div>
  </div>
  <div style="flex:1;min-width:200px;border:2px solid #10a37f;border-radius:12px;padding:18px;background:#f0fbf8;">
    <div style="font-size:15px;font-weight:700;color:#10a37f;margin-bottom:8px;">🛠 Codex</div>
    <div style="font-size:14px;line-height:1.7;color:#444;">原独立 Codex App 的全部能力：绑定文件夹干活、项目与对话、计划模式、AGENTS.md、Computer Use。</div>
  </div>
</div>
<p class="figcaption">一个应用、三种模式。写代码的入口没变深，聊天的入口也没被抢占，OpenAI 想让你在同一张桌子前坐一整天。</p>

几个关键的"不变"，先安心：

- **命令行（CLI）、IDE 插件、网页版不受影响**，照常独立更新，这两个月还在正常发版。
- **价格没变**：合并只动了产品形态，没动订阅和 API 计费结构。免费到企业版各档都能用 Codex，区别是额度和模型选择。
- **项目、设置、历史记录**随更新自动迁移。

---

## 三、跟你有什么关系

**如果你是老 Codex 用户**：不需要任何操作，正常更新即完成迁移。需要留意的只有两点：① 合并后的头两周，少数用户遇到过升级后界面卡在 Work 模式、或暂时看不到旧项目的 bug，遇到就去浏览器版（chatgpt.com）确认数据还在，再等客户端修复，现在已基本解决；② 如果你的配置里还钉着 GPT-5.4 / 5.4-mini 这两个旧模型，它们 8 月 31 日已经退役，记得切到 GPT-5.6 家族。

**如果你是 ChatGPT 用户**：你免费多了两个模式。Codex 不再只是程序员工具。OpenAI 官方披露，Codex 周活超过 500 万，其中 100 多万人在用它干开发以外的活（做网页、整理文件、数据分析），这正是把它并进主应用的原因。如果你装的是旧版桌面应用（现在叫 ChatGPT Classic），建议换新版，旧版不再有新功能。

**如果你是国内用户、没有 ChatGPT 账号**：第三方接入方案（Codex++、改 config.toml、CCX 中转那一套）作用在**命令行版 Codex** 上，这次合并不动它们，照旧可用。受影响的是桌面图形界面：想在新版 ChatGPT 桌面应用里用国产模型，目前没有现成方案，得看第三方工具后续的适配。详细的三条接入路线，站内 [Codex 保姆级教程](/stage-5/codex-guide) 第九章已按合并后的现状重写。

---

## 四、两件事值得警惕

**第一，"合并"不等于功能原样保留。** Atlas 用户是最直观的例子：产品说砍就砍，书签和数据要自己导出（8 月 9 日已停服）。OpenAI CEO Altman 对此的说法是"一个东西跑通了，我们就杀掉其他好东西，让最好的长得更快"。对用户的启示很直接：**重要的工作成果不要只存在某一个 AI 应用里**，能导出就导出，能落地成自己电脑上的文件就落地。

**第二，整合节奏快，教程的保质期在变短。** 光是 7、8 两个月，Codex 的模型阵容、登录方式、界面布局就改了好几轮。网上搜到的教程（包括半年内的公众号文章），先看发布日期再决定信不信；最准的永远是 OpenAI 官方的 ChatGPT Release Notes 页面。站内教程我们会跟着官方更新走，这次 Codex 教程的整篇重写就是这个原因。

---

## 小结

Codex 并入 ChatGPT，本质是 OpenAI 把"聊天、长任务、干活"三张牌收成一张，再给这张牌换上最新一代模型。对普通用户，入口变少了、能力变多了；对老用户，迁移是无感的，但"把鸡蛋放在几个篮子里"这件事，比以前更值得做。

---

## 扩展阅读

- [《Codex 终于反超 Claude Code，但付出了惨重代价》](https://www.36kr.com/p/3915298041834883) · **36氪**（2026-07，产品收缩与资源整合的全景报道）
- [《GPT-5.6 全面上线：Codex 并入 ChatGPT，生产力工具 ChatGPT Work 来了》](https://juejin.cn/post/7660415930171654196) · **稀土掘金**（2026-07，合并当周的逐条功能拆解）
- [《谁在花钱学 AI？》](https://weekly.caixin.com/2026-08-29/102479588.html?originReferrer=kimi) · **财新周刊**（2026-08，从培训行业视角看 Codex 并入 ChatGPT 后的门槛变化）
- [ChatGPT Release Notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) · **OpenAI 官方**（桌面应用每次更新的第一手记录）
