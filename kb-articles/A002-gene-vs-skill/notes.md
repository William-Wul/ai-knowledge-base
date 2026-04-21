# 你写的 Skill，正在拖慢模型？策略式 Gene 才是正确答案

> **📌 出处声明**
> 本文档为**阅读笔记与结构化摘要**，非原文搬运。
> 原文标题：《你写的Skill，正在拖慢模型？策略式Gene才是正确答案》
> 原文作者：**机器之心**
> 原文发布：2026-04-21 18:14
> 原文链接：https://mp.weixin.qq.com/s/NCb4489oBtPCa-3xgxAicQ
> 笔记整理：2026-04-21 · William · 存入 AI 知识库项目参考资料
> ⚠️ 仅供个人学习与内容创作参考，引用请注明原出处与原作者。

---

## 一、一句话摘要

清华 × EvoMap 团队用 4590 次受控实验证明：给 Agent 喂一份 2500 token 的完整 Skill 文档，反而不如喂一份 230 token、只含"策略 + AVOID 警告"的 Gene 对象——**决定 Agent 聪不聪明的，不是存了多少经验，而是经验回到模型那一刻长什么形状**。

---

## 二、核心要点（Key Takeaways）

1. **完整 Skill 反而伤模型**：～2500 token 的 Skill 包在强模型 Gemini 3.1 Pro 上让得分从 60.1 掉到 50.7，比"无指导基线"还差；而～230 token 的 Gene 稳定高出 3.0pp。
2. **Skill 里只有 Workflow 一段真在起作用**，Overview 是全文最大负贡献——"为人类可读性服务的材料"对模型是控制噪声。
3. **把 Skill 截短到 230 token 也打不赢 Gene**——Gene 赢的不是长度，而是"形态"（控制结构，而非字数）。
4. **Gene 里真正管用的字段是 strategy**：只有 keywords+summary 等于无指导基线；必须组织成"策略"而非"摘要"。
5. **失败经验的最佳形态不是日志、不是反思摘要，而是蒸馏过的 AVOID 警告**——甚至"AVOID only"都比"策略 + 失败"混合体更强。
6. **不更新一个参数、不做任何 SFT/RL**，纯靠 Gene 池的自我进化，就让 Gemini 在 CritPt 物理基准上得分 +9pp（9.1→18.57），同时 token 消耗从 100 美金降到 <1 美金。
7. **Gene 的鲁棒性边界很有趣**：用"过时算法范式"写的 Gene 反而比 clean Gene 还高（56.6 vs 54.0），但换错算法/领域就立刻掉 5pp——"结构上很宽容，语义上很挑剔"。
8. **GEP 协议把 Gene 从"提示片段"升格为"可匹配、可修订、可组合的对象"**，为多 Agent 之间交换经验提供了协议层载荷。

---

## 三、分章节要点梳理

### 01｜问题提出：为什么"写得越详细"反而越没用

开篇讲了一种"Agent 玄学"：你把任务背景、流程、坑点、API 用法、示例代码都塞进 Skill 文档了，下一次同类任务模型还是会犯同样的错。作者提出一个反直觉判断：**包罗万象的详细文档，不等于高质量控制对象**。

> "模型并非'阅读'一份文档，而是在有限推理预算里寻找下一步策略、哪些行为必须避免、什么约束优先级最高。"（作者原话）

核心洞察：Skill 的强项建立在"服务人类理解"之上，而不是"服务模型当下决策"。

### 02｜Gene 是什么：从生物学隐喻到对象层 framework

EvoMap 团队定义了三层 framework：

| 对象 | 角色 |
|---|---|
| **Gene（基因）** | 含 keywords + summary + strategy + AVOID 四类信号，test-time 直接注入 |
| **Capsule（胶囊）** | 被验证过的任务级执行路径 + 审计记录 |
| **Event（事件）** | 不可变的进化日志 |

三件套通过 **GEP（Gene Evolution Protocol）** 六阶段循环串起来。用大白话说流程：

1. 把过去的失败、成功、修复路径**蒸馏**成 Gene（不是写文档，是写可溯源控制信号）；
2. 新任务进来 → Scan 上下文 → 匹配最相关的 Gene → 当 System Instruction 注入；
3. 执行后，以 Event 写回，触发 Gene 的 Validate / Mutate / Solidify——**不更新基模参数**，只让 Gene 池本身持续进化。

### 03｜核心实验：Skill vs Gene 的"同一份经验，不同形态"

实验条件：Gemini 3.1 Pro Preview + Flash Lite Preview 两模型，沙盒执行 + Checkpoint 通过率，T=0.05，max tokens=16384。

**关键数据**：

| 条件 | Flash | Pro | 平均相对无指导 |
|---|---|---|---|
| 无指导基线 | 41.8 | 60.1 | — |
| 完整 Skill 包（～2500 token） | 49.0 ↑ | 50.7 ↓↓ | -1.1pp |
| Gene（～230 token） | — | — | **+3.0pp** |

**最反直觉的一点**：Skill 不是均匀地差，它在弱模型 Flash 上有帮助，却在强模型 Pro 上狠狠拖后腿——**长 Skill 把 Pro 的固有能力直接压住了**。

消融实验发现：**Skill 里只有 Workflow 一段在认真起作用，Overview 反而是全文最大的负贡献**。有用信号稀疏地集中在一小段程序性内容里，其余材料在稀释甚至污染控制信号。

### 04｜反驳"Gene 只是短"：预算对齐实验

把 Skill 截短到 230 token，与 Gene 预算完全相同——**Gene 仍然碾压**。剪短只是让 Skill 不再倒贴分，但无论怎么剪都打不到 Gene 的高度。

渐进式构造实验进一步定位：**只有 keywords + summary 反而回到无指导基线**，真正把表现拔起来的是 **strategy** 这一层。

> "同样的字数，组织成'摘要'没用，组织成'策略'才有用。"（作者原话）

扰动实验里最有意思的对比：

| Gene 变体 | 得分 |
|---|---|
| clean Gene（正确） | 54.0 |
| 过时算法范式（stale_paradigm） | **56.6** |
| 换错算法 | 48.8 |
| 换错领域 | 49.4 |

结论：**Gene 的有效条件是"保留任务相关的控制框架"，而不是"写得多新"**。结构上很宽容，语义上很挑剔。

### 05｜失败经验的最优形态：AVOID 警告，而非日志

所有做 Agent 的人都面临"失败该怎么存"的问题：长 trajectory？Reflection summary？Error log？

**对照一**：把失败放在 Skill 或自由文本里 —— 全部低于无指导基线；Gene 是唯一正贡献载体，但 "Gene + 失败" 也不如 "Gene 单独"（54.0 → 52.0）。失败原样附加反而稀释了 Gene。

**对照二**：最强的不是"失败 + 策略"混合体，也不是"策略 only"，而是 **failure warnings only**——把失败蒸馏成一句句独立的"AVOID xxx"。

真实 AVOID 示例（来自论文 UV-vis 谱学场景）：

- `AVOID 把 min_distance 当成波长值传给 scipy.signal.find_peaks，要先转成采样点单位`
- `AVOID 把 peak_widths 的原始输出直接当 FWHM 上报，要先换回波长单位`

原则：**失败经验的累积应该是选择性压缩，不是加法式堆叠**。

### 06｜一个真实 Gene 的样子

论文 UV-vis 场景的注入示例（约 230 token，5 个字段）：

```
Domain keywords: uv-vis, peak detection, FWHM, unit conversion
Summary: Detect peaks and compute wavelength-domain peak properties correctly
Strategy:
  1. Detect peaks with prominence-based criteria
  2. Convert min_distance into sample-index units before peak detection
  3. AVOID: Report FWHM only after converting peak_widths outputs back to wavelength units
```

对照的 Skill 包约 2500 token，形态像 README（overview / workflow / pitfalls / API notes / examples / scripts）。两者在相同注入槽、相同 sandbox 脚本下 PK，**差别只在"被注入的那段内容长什么形状"**。

### 07｜协议层：Gene 为何不能只是一段 Prompt

EvoMap 判断：经验对象在多 Agent 之间被交换时，**必须是一个对象，不能是一段文档**。

- 没有协议 → Gene 只是 prompt：边界不稳、字段无法比较、不能累积。
- 协议化后 → Gene 成为"可匹配、可替换、可修订、可组合"的对象，能被审计追溯。

GEP 把 Gene 升格成 **持久策略优化接口**，而不是一次性的提示技巧。

### 08｜CritPt 基准的端到端成绩

把 Evolver（基模 + Gene 池 + 进化引擎 + 工具链）拉到 CritPt 物理科研基准上：

| 版本 | 基模得分 | Evolver 后 | 提升 |
|---|---|---|---|
| 2026-02-16 | 9.1% | **18.57%** | +9.47pp |
| 2026-03-26 | 17.7% | **27.14%** | +9.44pp |

**不更新一个参数、不加任何 SFT/RL、不做微调**，纯靠经验对象层进化就能抬升 +9pp。同时 **token 消耗从 100 美金降到 <1 美金**。

### 09｜对行业的启示

- 应用层：把"写给同事的 Skill 文档"和"运行时注入给模型的控制信号"分离——几乎零成本、见效极快的"魔法"。
- 研究层：失败的最佳沉淀形态不是 trajectory log，不是 reflection summary，而是 AVOID 警告。
- 多 Agent：协议层载荷应该是结构化的 Gene 对象，不是 Skill 文档。

---

## 四、作者的核心判断（原文金句摘录）

> "给人看的东西塞进模型的执行预算，反而会成为控制噪声。"

> "决定模型行为的是控制结构，不是 token 多少。"

> "让 Agent 持续变强的捷径，不是把提示词写得更完整，而是把执行经验做成一个更紧凑、更可控、更可进化的对象。"

---

## 五、对 William（AI 学习知识库项目）的启发 / 延伸思考

> 以下是笔记整理者基于 AI 学习知识库项目视角的延伸思考，**不属于原文**。

1. **可用于哪个 stage**：
   - **stage-3（AI 进阶概念）**：作为"Agent 为什么会犯错 / 怎么让 Agent 变聪明"的延伸材料，但注意员工读者对 Gene/GEP 这种研究级术语会晕，需要做二次翻译（比如用"给 AI 写便签：长篇说明书 vs 便签警示"的类比）。
   - **stage-5（AI Agent 使用）**：讲 Claude Code Skills 时是绝佳对照——Skills 当前的工程实践和 Gene 的研究发现有直接冲突，可以引发读者"那我写的 skill 到底有没有用"的思考。
   - **frontier（AI 前沿专区）**：天然适合放这里，作为"Agent 自进化研究"方向的一个代表性工作。

2. **专区匹配**：frontier > stage-5 > stage-3。

3. **值得跟进的点**：
   - EvoMap 团队和 OpenClaw / Evolver 的后续动向——这是国产团队（清华系）在做，值得持续关注。
   - arXiv 原文（https://arxiv.org/abs/2604.15097）值得实际读一读，尤其是消融实验的具体方法。
   - Gene 和 Claude Code 的 Skill / Memory 机制如何对接？这个可以是未来一篇实战文章的选题。

4. **风格借鉴**：
   - 这篇机器之心的稿子用了大量"对比表格 + 反直觉金句"，可读性很高——这种**"数据冲击 + 反直觉概括"**的写法对知识库面向非技术员工的文章很值得学。
   - 开头的"Agent 玄学"场景化切入，比直接讲论文好很多——可以学习这种"从用户痛点进，从技术原理出"的结构。

5. **一个危险的联想**：
   - 知识库本身就是"给员工看的 Skill 文档"，Gene 的发现对人类读者**不成立**——人类需要上下文、需要故事、需要冗余。但这提醒我一件事：**给 AI 用的文档和给人用的文档，本来就应该是两套东西**。如果未来知识库要做"AI 版"或"Agent 可用版"，不能简单把 Markdown 喂进去。

---

## 六、关键术语与缩写

| 术语 | 含义 |
|---|---|
| **Skill（Procedural Skill）** | 今天最常见的"文档式经验包"，一份长长的说明书（overview / workflow / pitfalls / API notes / examples / scripts）。Claude Code 的 Skills 就是这种形态。 |
| **Gene（基因）** | EvoMap 提出的经验对象。包含 keywords + summary + strategy + AVOID 四类信号，约 230 token，作为 test-time 控制片注入。 |
| **GEP（Gene Evolution Protocol）** | 把 Gene 从"一段 prompt"升格为可匹配、可修订、可组合的协议化对象的规范。 |
| **AVOID 警告** | 把失败经验蒸馏成一句独立的"不要做 X"，是论文发现的失败经验最佳存储形态。 |
| **Capsule** | GEP 协议里被验证过的任务级执行路径 + 审计记录。 |
| **Event** | GEP 协议里不可变的进化日志。 |
| **Test-time Evolution** | 测试时进化——不更新基模参数，只在推理阶段通过 Gene 池的进化来提升表现。 |
| **CritPt** | 模拟真实物理科研过程的动态 benchmark，用来验证 Agent 系统的端到端能力（https://critpt.com/）。 |
| **Evolver** | EvoMap 团队的"基模 + Gene 池 + 进化引擎 + 工具链"完整系统，OpenClaw 社区插件。 |
| **SFT / RL** | Supervised Fine-Tuning / Reinforcement Learning——两种常见的模型微调方法。论文强调 Gene 不需要这些。 |
| **pp（percentage point）** | 百分点。54.0 → 57.0 是 +3pp（不是 +3%）。 |
| **控制密度（control density）** | 论文核心概念：经验对象应该按"单位 token 能对模型行为产生多少有效约束"来衡量，而不是按"文档多完整"。 |

---

## 七、文档元数据（知识库索引用）

| 字段 | 值 |
|---|---|
| **article_id** | A002 |
| **原文标题** | 你写的Skill，正在拖慢模型？策略式Gene才是正确答案 |
| **原作者 / 来源** | 机器之心（微信公众号） |
| **原文发布时间** | 2026-04-21 18:14 |
| **原文链接** | https://mp.weixin.qq.com/s/NCb4489oBtPCa-3xgxAicQ |
| **入库时间** | 2026-04-21 |
| **主题标签** | AI前沿、Agent、Agent自进化、经验复用、Gene、GEP协议、Skill设计、论文解读、EvoMap、清华 |
| **适用 stage** | frontier、stage-5、stage-3 |
| **原文正文字符数** | 约 5500 字 |
| **原文阅读时长** | 约 14 分钟 |

---

*本笔记由 Claude Code + article-kb skill 生成并导入飞书云空间。原文版权归 机器之心 所有，请尊重原作者劳动成果。如需完整阅读，请点击原文链接访问原始来源。*
