# 版本记录

---

## v1.35 · 2026-07-31

### 安全：密码门改哈希比对（去明文）
- 现象：访问密码 `ai2026` 以明文硬编码在 `PasswordGate.vue`，F12 查看 source 即可看到
- 修复：改用浏览器原生 Web Crypto API 做 SHA-256 摘要比对，代码里只存十六进制哈希值，不再出现明文
- 影响：密码不变、用户无感；改密码方式见 `PasswordGate.vue` 顶部注释（`printf '%s' '新密码' | shasum -a 256`）

### 清理：移除未使用的本地内容后台（admin/）
- 背景：本地 Keystatic 后台（`admin/`，Next.js）自 2026-07-31 确认不再使用，AGENTS.md 已标注优先级最低；占 740M（含 node_modules 547M、4.7 万文件）
- 删除：`admin/` 整目录、`打开内容后台.command` 启动脚本、`package.json` 的 `admin:dev`/`admin:build` 脚本、`.gitignore` 中失效的 `admin/.next/` 与 `admin/out/` 规则
- 影响：网站本身不受影响；后续改依赖不再需要评估 admin

### 架构：自测题库去硬编码，改 topicMap 间接映射
- 问题：`aiQuizBank.js` 的 `dimensions[].links` 和 `levels[].stages` 把文章 `{text, href}` 写死在题库里，违反 AGENTS.md「不做站内互链」原则，且文章改 URL 自测推荐会坏
- 改造：新增 `topicMap.js` 作为推荐路径的单一映射源；题库只存稳定 `topic` 标识（如 `prompt-advanced`），`AiAbilityQuiz.vue` 渲染时经 `resolveLinks()` 解析为 `{text, href}`，未知 topic 自动跳过、去重
- 附带：`levels[系统构建者]` 的阶段推荐由已废弃的 `/stage-6/one-person-company` 改为 `/frontier/`（AI 前沿专区），更稳定
- 验证：`npm run docs:build` 无报错；node 跑通 5 组 resolveLinks 测试（去重/跳过未知/全 topic 完整性）均通过

### 新功能：词汇本上线「常见热词」（公共词库 + 两 tab 架构重构）
- 背景：词汇本原是纯个人查词工具（输入英文术语→调 AI 实时解析→存 localStorage），知识不共享、不沉淀；且原「学习历史」「查看词库」两个 tab 数据源完全相同（都来自 `words`，仅排序不同），存在重复
- 信息架构重构：精简为两个 tab——「我的词库」（默认，用户所有词按字母分组，含自查词 + 看过的热词）+「🔥 常见热词」（收录 39 个常见 AI 术语，站内高频 + AI 圈通用）；删掉重复的「学习历史」tab 及死函数 `getHistoryWords`
- 数据：新建 `docs/public/vocab/dictionary.json`（静态文件，随网站发布）；`index.html` 启动时 `fetch` 加载，不参与 VitePress 构建
- 热词落地机制：热词点开看详情即「落地」成个人词条（`adoptDictionaryWord`，幂等），自动从「常见热词」消失、进入「我的词库」——两个 tab 零重复、总数守恒（39 词始终找得到）
- 功能对齐：落地后的热词复用全部现有功能（懂了/还没懂/重新解读/深化解读/加星），状态持久化；唯一区别是热词无删除按钮（避免删公共词）。`bindCardEvents` 用 `ensureOperable()` 统一拦截 `dict_` 开头 id 的状态操作，先落地再执行
- 渲染：复用现有字母分组和 `renderCard` 卡片样式；`hideDelete` 选项控制删除按钮显隐，`isDictionary` 控制是否显示「加入我的词库」（落地后自动消失）
- 边界：词典词条 id 用 `dict_` 前缀与个人词条 `w_` 区分；字母索引点击在 dictionary 模式指向 `dict-group-*`；状态函数对无字段词条安全返回 false
- 验证：`npm run docs:build` 无报错；node 跑通多组测试（字段完整性/字母分组/搜索过滤/落地幂等/两 tab 不重复不遗漏/状态流转）均通过

---

## v1.34 · 2026-07-31

### 修复：文章日期行（.post-meta）被 H1 分隔线从文字中间穿过
- 现象：news 文章标题下的「日期 · 分类」小灰字被 H1 的 border-bottom 横线穿过，看起来像删除线，全站 16 篇 news 文章全部中招
- 原因：`.vp-doc h1` 带 `border-bottom: 2px solid #e2ebe5` + `padding-bottom: 0.5rem`，而 `.vp-doc .post-meta` 写了 `margin: -0.9rem 0 1.5rem` 向上贴标题，把日期行拉进了标题的边框区
- 修复：`.post-meta` 负 margin 改为 `0.5rem 0 1.5rem`，日期行落在分隔线下方；custom.css 注释补警告防止复发
- 验证：`npm run docs:build` 无报错；浏览器实测 2 篇 news 文章标题区渲染正常（线在上、日期在下）

---

## v1.33 · 2026-07-30

### 「AI 进阶实践」板块重做：5 篇旧文重写为 4 篇新文
- 素材全部取自 kb-articles 库内公众号笔记（A002/A008/A041/A090/A094/A104/A105/A106/A107/A108/A109/A113/A118/A119/A120），每篇附扩展阅读注明原作者与原文链接
- **删除**：`stage-3/agentic-ai.md`、`stage-3/ai-harness.md`（两页及其概念不再单独成文）
- **重写**：`stage-2/prompt-cases.md`（Prompt 进阶技巧：三个误区 + 四要素基本功 + 六个心法 + 两个万能加句）、`stage-3/loop-engineering.md`（五问题/五件套/定目标/古德哈特陷阱/L1-L3 上手路径/非编程场景）、`stage-4/multi-agent-teamwork.md`（拆派接验四步实践法 + 五种新型角色）
- **新增**：`stage-3/write-good-skill.md`（跑通-复盘-封装-回溯四步法、三层结构、Gene 研究的控制密度结论、最小模板）
- `stagesData.js` 的 PRACTICE_LINKS 更新为 4 篇（顺序即侧边栏顺序）；stage-3/4 index 页文案同步
- 题库 `aiQuizBank.js` 三处推荐链接改指新文；`ai-tool-data-flow.md`、`news/2026-07-17-kimi-k3.md` 中对 agentic-ai 的引用改为内联解释
- 验证：`npm run docs:build` 无报错；dist 中已删两页不存在；构建产物 grep 无指向已删页面的死链（hot/2026-07-08 一处为 fastcompany 外链 slug，非站内链接）

### 全站文章去站内互链：每篇独立成篇
- 起因：进阶实践四篇新文按"文章独立、不做站内互跳"原则写作后，全站普查同类问题
- 清理 16 个正文文件共 30 处站内互链：stage 学习文章 7 文件 12 处、frontier 前沿 5 文件 12 处（多为"本知识库的相关延伸"小节，整节移除）、news 新闻 4 文件 6 处（"上次报道"时间线引用，链接去掉了保留文字背景）
- 处理方式：链接改纯文字或改写为自足表述，不牺牲上下文可读性
- 保留不动：stage-3/5/6 index 三个"内容已搬家"导航跳转页（本身是导航）；`docs/changelog.md` 历史日志（带日期的历史记录，30 处链接均为当时事实陈述）
- 验证：全站 grep 正文（除索引页与 changelog）无残留站内链接；`npm run docs:build` 无报错

---

## v1.32 · 2026-07-30

### 内容归属重组：8 篇文章按四大板块新定位归位（URL 零变更）
- **工具快速上手扩至 8 篇**：WorkBuddy / Claude Code / Codex 三篇保姆级教程（原 stage-5）与 WorkBuddy 办公三案例、PPT 工具横评（原 stage-4）归入，按"通用对话工具 → 说话方法 → 场景横评 → 办公助手 → AI 编程工具"排序
- **使用注意事项补第 3 篇**：《AI 工具会把你的数据传到哪里》从工具上手移入
- **AI 进阶实践定为"不绑单一工具的技巧方法"扁平池（5 篇）**：Prompt 进阶（自 stage-2 移入）→ Agentic AI → AI Harness → Loop Engineering → 多 AI 协同；后续 Skill 写法、提示词新要求类新内容统一进这里
- **《一人公司》移入 AI 前沿**：补 `date: 2026-06-01`（git 首次提交日期），与专题按日期混排
- 实现方式：沿用"展示与目录解耦"原则，物理文件全部不动；`stagesData.js` 新增 TOOL_LINKS / PRACTICE_LINKS / FRONTIER_EXTRA_LINKS 清单作为唯一数据源，侧边栏（新增 `linkItems()`、`mergedItems()` 支持目录外长文）与面包屑（文件级显式归属优先于目录级默认）共用；stage-3/4/5 目录新增文件仍自动追加到对应模块
- stage-3/5/6 不再承接新文章，其 index 页改为"内容已搬家"指引；stage-2、stage-4 落地页文案按新定位重写
- 题库修复：`/stage-2/agent-tools` 坏链（404）改为 marvis-guide；推荐学习路径"阶段一/二/三/五/六"旧名换新板块名
- 7 篇正文旧叫法文字修正（"阶段三""第五阶段""AI Agent 使用板块"→ 新板块名），链接 URL 均未变
- 验证：`npm run docs:build` 无报错；构建产物脚本校验侧边栏顺序（工具 8 篇 / 注意 3 篇 / 进阶 5 篇）与面包屑归属（教程→基础学习、一人公司→最新动态/前沿、Prompt 进阶→进阶实践、数据文→注意事项）全部通过

---

## v1.31 · 2026-07-28

### 新闻：Kimi K3 正式开源（附「开源战争」产业解读）
- 新增 `news/2026-07-28-kimi-k3-open-source.md`：7 月 27 日 K3 兑现开源承诺（权重 + 47 页技术报告 + MoonEP/FlashKDA/AgentENV 三套基础设施），黄仁勋公开信与几十家公司签名墙、Anthropic 缺席并唱反调、「退出能力」选型建议；素材取自当日入库的 5 篇公众号笔记（A131–A135）
- 配图 2 张（公开信签名墙、技术报告成本—能力对比），存 `docs/public/images/news/2026-07-28/`，图注标注公众号图源

### 新闻标题去掉日期前缀（15 篇批量）
- 老格式「2026/07/17 · 标题」改为「纯标题 + H1 下小灰字日期行」：侧边栏不再被日期拉长（其实 `mergedItems()` 本来就正则去前缀，本次是把源头洗干净），文章页仍保留日期上下文
- 15 篇老新闻 frontmatter `title:` 与 H1 同步去前缀，文件名/URL/frontmatter `date:` 均不动，无外链失效风险
- custom.css 新增 `.post-meta` 规则（13px 灰字、负 margin 贴近 H1），新稿与 15 篇老稿统一用 `<p class="post-meta">日期 · AI 新闻</p>`
- 验证：`npm run docs:build` 无报错；构建产物抽查新稿日期行/双图、老稿新标题均正常

---

## v1.30 · 2026-07-28

### 词汇本去壳融合：与站点页面一体化
- 嵌入站内时（检测 iframe 自动加 `embedded` 类）脱掉词汇本自身外壳：去卡片边框/圆角/阴影/渐变背景/四周留白，绿色面板与内容区边缘对边缘平铺，消除"页面套页面"的多层边框线；直开 `/vocab/` 保留原卡片外观
- `/vocab-book` 页 VPDoc/vp-doc 内边距清零，iframe 正好填满内容区，外层不滚动
- 暗色模式补全：dark 下 surface/text 系列变量从藏蓝系改为绿灰系（v1.28 漏改，暗色下卡片呈藏蓝色），侧边栏暗色压深；嵌入模式暗色背景对齐 VitePress `#1b1b1f`
- 验证：构建无报错；无头 Chrome 截图浅色桌面/手机/暗色三视角验收（证据在 `qa-shots/`）

---

## v1.29 · 2026-07-28

### 词汇本嵌入页改用文档布局（体验与文章页统一）
- `/vocab-book` 从 `layout: page` 全宽页改为标准文档布局：左侧站点目录正常展示并高亮当前项，词汇本压缩进右侧内容区，桌面端与其他攻略页观感一致（顶导航同样自动隐藏）
- frontmatter 用 `aside: false`（去掉右侧空目录栏，同时让 780px 正文宽度限制不生效）+ `pageClass: vocab-book-page`（定制样式挂载点）
- `VocabEmbed.vue` 高度改为 `calc(100dvh - var(--vp-nav-height) - 偏移量)`，偏移量按断点适配文档布局上下留白；custom.css 新增该页内容区放宽与吃掉 VPDoc 底部留白的规则，保持外层不滚动、无双滚动条
- 移动端保持顶部导航 + 汉堡菜单，与文章页一致

---

## v1.28 · 2026-07-28

### AI 学习词汇本接入站内，不再跳转新标签页
- 新增站内嵌入页 `/vocab-book`：`layout: page` + 新组件 `VocabEmbed.vue`，iframe 全视口嵌入（保留顶部导航、无文档侧边栏、无双滚动条）
- 全部入口改为站内跳转：顶部导航、内容页侧边栏、首页导航栏（HomeNav）、首页工具卡片（HomeHero）、首页特色专区数据源（HomeFeatures）
- 老地址 `/vocab/` 仍可直开，已分享链接不受影响；词条数据（localStorage key 未动）与密码门（`kb_auth_v1` 与主站共用，不重复弹门）均不受影响

### 词汇本 UI 对齐主站深绿风
- 31 处配色从紫蓝渐变系替换为主站深绿系（侧边栏、主按钮、卡片、标签、暗色模式变量等；密码门原本已是深绿未动）
- 应用图标由原紫蓝 PNG 色相旋转生成深绿版 `app-icon-green.png`（256px / 47KB，原图保留未删）
- 仅改 CSS 与图标，词汇本 JS 逻辑零改动

### 技术
- `VocabEmbed.vue`：iframe 高度 `calc(100dvh - var(--vp-nav-height))`，外层页面不滚动
- 验证：`npm run docs:build` 无报错；首页全部链接与构建产物逐一比对；无头 Chrome 截图验收（桌面 1440×900 / 移动 390×844，证据在 `qa-shots/`，已 gitignore 不入库）

---

## v1.27 · 2026-07-28

### 首页全面改版
- 新 slogan：「零门槛学 AI，成为 AI 时代超级个体」（两行排版，桌面端防折行），删除副标题
- 按钮改为「进入 AI 基础学习」（→ /stage-1/）与「发现更多 AI 实践」（→ /stage-4/）
- 右侧原六阶段路径图替换为「AI 最新动态」面板：构建时自动解析 hot/ 最新一期日报，展示 6 条动态（分类标签 + 标题），点击条目锚点跳转到日报页对应内容（站内跳转，不依赖外网）；面板头尾保留「查看本期 / 全部日报」入口
- 「AI 学习小工具」（AI 能力自测 + AI 学习词汇本两张卡片）并入首屏左列，首页合并为完整一屏；左右两列顶底对齐，容器收窄至 1280px
- 页脚收成一行细条，文案全站统一为「仅用作个人 AI 学习，请勿商用」（含 config.js themeConfig.footer）

### 全站内容结构改版（四大板块）
- 顶部导航（首页 + 内容页统一）：AI 最新动态 / AI 基础学习 / AI 进阶实践 / AI 能力自测 / AI 学习词汇本
- **AI 最新动态** = AI 日报（hot/，侧栏带最近 7 期归档）+ AI 前沿（原 news/ 15 篇与 frontier/ 9 篇合并，按日期倒序混排，显示时剥离日期前缀）
- **AI 基础学习** = AI 快速认知（stage-1）+ AI 工具快速上手（stage-2 教程类）+ AI 使用注意事项（新模块：安全红线 + 学新不学旧）
- **AI 进阶实践**（原「AI 实践技巧」改名）= 扁平文章池不设模块：思路方法（stage-3）+ 岗位实战（stage-4）+ Agent 教程（stage-5）+ 创意创业（stage-6）
- stage-1~6 全部摘除「阶段」序号，相关页面标题与正文交叉引用同步改写（changelog 历史记录未动）
- 面包屑升级为「板块 / 模块」两级；所有目录与 URL 保持不变，旧链接全部有效
- 已不在侧栏的旧栏目首页（/news/、/stage-3/、/stage-5/、/stage-6/）仍可通过链接直达

### 侧边栏 UI 重构
- 三级层级分明：一级板块（衬线加粗墨绿 15.5px，无图标）/ 二级模块（无衬线 14px，带图标）/ 文章（13px + 左侧竖向导轨）
- 模块标题不参与当前页高亮，绿色高亮只留给具体文章；前言居首、更新日志收尾，按 href 定向套用一级标题样式
- 板块与模块默认全部折叠（手风琴），仅自动展开包含当前页的那一条链

### 技术
- 新增构建时数据 loader `docs/.vitepress/data/hotLatest.data.js`：取最新日报前 6 条，按与 VitePress 一致的 slug 规则计算条目锚点（已逐条对照构建产物验证）
- config.js：`autoItems` 新增 limit / exclude 选项；新增 `mergedItems` 跨目录按日期合并；`stagesData.js` 重写为四大板块唯一数据源（BASIC_MODULES / CAUTION_LINKS / PRACTICE_DIRS / BOARDS）
- 侧边栏层级样式按渲染后 DOM（h2/h3/p + level-N 类）精确编写，前言/更新日志的裸容器底距压回折叠分组标准值
- package.json 补 `npm run dev` 别名

---

## v1.26 · 2026-07-03

### 功能
- 新增 AI 能力自测页面：[AI 能力自测](docs/exams/index.md)，题库 36 道（12 题位 × 3 变体，独立文件 `aiQuizBank.js`），每次随机抽 12 道场景题（单选 + 多选），从提问力、上下文力、流程力、Agent 力、判断力五个维度评估使用方式，生成测评报告：五档综合水平（刚起步 → 系统构建者）+ 百分制综合得分、五边形能力雷达图（SVG，每维 0–100 分）+ 逐项诊断、按短板和水平推荐站内文章（William 反馈：分数比"强项/短板"标签更能激发追分和听建议的意愿；雷达图 + 分享比纯文字报告更直观）
- 一键分享：Canvas 生成 750×980 分享图（段位 + 得分 + 雷达图 + 总结 + 站点署名）。主按钮"复制分享图"直接把图片写入剪贴板（粘贴即一张图，Safari 用 Promise 形式 ClipboardItem 保持用户手势内创建），不支持时依次回退系统分享 / 下载；另设独立"下载图片"按钮
- 防"选看起来正确的"设计（William 2026-07-03 反馈）：选项不带提示小字、抽题时选项随机排序、埋"听起来高级实为坏做法"的陷阱选项（长角色设定空提示词、资料一股脑全贴、让 AI 自我核对多遍等）、行为回忆题占比提高
- 交互为一题一屏逐题作答，多选题带"都没做过"互斥选项；结果存浏览器本地供复测对比，重测自动换一批题
- 学习测试入口接入顶部导航、侧边栏、首页特色专区、面包屑数据源（`/exams/`）

### 技术与协作
- `AiAbilityQuiz` 组件由 Claude Code 按方案 C 重写（替换 Codex 的游戏化段位版本，2026-07-03 经 William 评审拍板）：删除段位 / 玩家地图 / 装饰图形，视觉对齐站点极简风；题库与五维算分逻辑沿用原版并微调文案
- 所有答题、算分和复测记录均在浏览器本地完成，不依赖后端、不收集测试结果

---

## v1.25 · 2026-07-03

### 内容
- 上线 stage-2 文章：[Prompt 进阶：让 AI 帮你想](docs/stage-2/prompt-cases.md)（替换原"建设中"占位页），四个进阶技巧：五要素框架（HTML 表格呈现）、让 AI 先追问、让 AI 挑毛病（反对者 / 预演失败 / 对抗式审查）、寓言故事理解概念；素材来自 A104 / A105 / A106 / A107 / A108
- 配图 5 张（追问式对话、对抗式审查、寓言 Prompt、检验题、Prompt→Loop 演进），全部经原文语境核对；上一会话误配的 5 张图（Priya Parker 网站截图等）已删除
- 公开更新日志补记 2026-07-03 条目

---

## v1.24 · 2026-06-17

### 内容
- 新增 stage-3 文章：[Loop Engineering：从"盯着 AI 干活"到"让 AI 自己干完"](docs/stage-3/loop-engineering.md)，面向零基础读者讲清"循环工程"概念：发动机→设计者的角色转变、从 Prompt 到 Loop 的四级变迁、一个循环的组成（五零件 + 状态文件，用"管小团队"类比）、定目标这一核心能力、古德哈特陷阱与护栏、token 成本门槛、普通人适用场景；配 4 处内联 HTML 图示（绿色调），参考素材 A090 / A091 / A094
- 侧栏 stage-3 分组新增该文条目（`docs/.vitepress/config.js`）

### 写作沉淀
- 按 William 反馈调整写作风格：标题直接命名内容、开门见山给定义、删除"本文将讲…"类元叙述铺垫、每篇文章独立成文不交叉引用其他文章（已固化进记忆 feedback_write_direct）

---

## v1.23 · 2026-06-16

### 内容
- AI 日报连续同步 2026-06-13 至 2026-06-16 四期（[06-13](docs/hot/2026-06-13.md) / [06-14](docs/hot/2026-06-14.md) / [06-15](docs/hot/2026-06-15.md) / [06-16](docs/hot/2026-06-16.md)），覆盖 MiniMax M3 开源权重及 MSA 论文、智谱 GLM-5.2 全量开放（1M 上下文、下周开源）、Kimi K2.7-Code 及高速版、Anthropic 秘密申请上市（估值约 9650 亿美元）与暂停新模型访问、Meta 撤销 20 亿美元收购 Manus、字节豆包"任务模式"、Grok Build Agent Dashboard、Salesforce 36 亿美元收购 Fin、Flash-KMeans 等行业精选内容

### 维护
- 本期无文章 / 功能改动，仅日报自动同步，公开更新日志补记 2026-06-16 条目

---

## v1.22 · 2026-06-11

### 内容
- 新增 stage-5 文章：[WorkBuddy 从零开始：保姆级完整教程](docs/stage-5/workbuddy-guide.md)，面向零基础读者讲清国产 Agent WorkBuddy 的下载安装、微信扫码登录、界面设置、Ask / Plan / Craft 模式、办公实战、专家 / 技能 / 连接器、定时自动化和手机远程控制，并配套 27 张截图
- 新增 news 文章：[Claude Fable 5：最强的 Claude 开放了，但戴着镣铐](docs/news/2026-06-10-claude-fable-5.md)，围绕 Anthropic 发布 Claude Fable 5 / Mythos 5，解释公开版与受限版的区别、能力跑分、安全降级机制、监管背景和定价
- AI 日报连续同步至 [2026-06-11](docs/hot/2026-06-11.md)，补充 Claude Fable 5 / Mythos 5、Google Gemma 4、Claude Managed Agents、DiffusionGemma、MiMo Code、Cursor Bugbot 等行业精选内容

### 体验
- 优化全站图注样式：自动识别“图片后一段纯斜体文字”的旧写法，统一套用小字灰色图注样式，并让图注跟随居中图片对齐
- 优化本页目录展示：文章内长标题完整换行显示，不再截断省略，改善 WorkBuddy 等长教程的章节定位体验

---

## v1.21 · 2026-06-09

### 内容
- AI 日报更新至 [2026-06-09](docs/hot/2026-06-09.md)，补充 Apple Foundation Models、OpenAI S-1 草案、微信 AI 内测、NotebookLM 升级、ChatGPT 图表生成、Kimi Code 升级等行业精选内容

### 修复
- 修复 AI 日报线上停留在 2026-06-04 的问题：自动同步脚本原本只保留最近 7 期并删除旧日报，但公开更新日志仍引用历史日报，导致 VitePress 构建因 dead link 失败
- 调整 `scripts/sync-aihot.mjs`：入口页继续只展示最近 7 期，但保留历史日报文件，避免后续公开链接再次被自动清理
- 恢复 2026-05-29、2026-05-30、2026-05-31、2026-06-01 四期历史日报文件，修复公开更新日志中的历史链接

---

## v1.20 · 2026-06-05

### 内容
- 新增 stage-5 文章：[Codex 从零开始：保姆级完整教程](docs/stage-5/codex-guide.md)，面向零基础读者讲清 Codex 桌面 App 的定位、下载安装、ChatGPT 账号登录、首个任务、计划模式、AGENTS.md 和国内接入方案，并配套 14 张步骤截图
- AI 日报连续同步至 [2026-06-04](docs/hot/2026-06-04.md)，补充 MiniMax M3、OpenAI Codex on AWS、Claude Code 动态工作流、微软自研推理模型、WhatsApp Business AI Agent、OpenClaw 2026.6.1 等行业精选内容

---

## v1.19 · 2026-06-02

### 内容
- 新增 frontier 文章：[AI 时代的技术面试会变成什么样子](docs/frontier/tech-interview-future.md)，围绕 Steve Yegge《The Last Technical Interview》讲清技术面试信号失效、AI 对简历/线上面试的冲击，以及“真实工作试炼 / 篝火模式”的替代方向
- 新增 news 文章：[英伟达 RTX Spark：把"能跑大模型的 AI 电脑"搬上你的桌面](docs/news/2026-06-01-nvidia-rtx-spark.md)，解释 RTX Spark、统一内存、CUDA 生态、本地大模型和本地 Agent PC 的意义，并配套 10 张发布会与架构图
- AI 日报更新至 [2026-06-01](docs/hot/2026-06-01.md)，同步 AIHOT 当日行业精选，并更新日报入口页
- 补充公开更新日志，记录入门文章重写，避免遗漏读者可见的内容更新

### 维护
- 本地资料库补充 6 篇参考素材，覆盖 AI 时代技术面试、RTX Spark / AI PC、世界模型 Project Eden 等主题，为后续 frontier、stage-5、stage-6 内容创作做资料准备

---

## v1.18 · 2026-06-01

### 内容
- 新增 stage-6 文章：[一人公司：一个人 + 一堆 AI，真能当一家公司用吗？](docs/stage-6/one-person-company.md)，讲清一人公司的定义、和个体户的区别、真实机会与风险
- 阶段六首页从“建设中”更新为正式内容入口，展示一人公司文章
- 重写 stage-1 入门文章：[一文看懂AI是什么](docs/stage-1/what-is-ai.md)，用更适合零基础读者的方式讲清楚 AI、机器学习、深度学习和大模型之间的关系
- AI 日报连续同步 2026-05-29 至 2026-05-31，补充 Claude Opus 4.8、Codex Windows 计算机使用、OpenAI 实时翻译、AI 风险等行业精选内容

---

## v1.17 · 2026-05-29

### 工程
- 新增本地内容后台初版源码（`admin/`），基于 Keystatic + Next.js，用于后续文章编辑、配图校准和本地内容管理
- 根项目新增 `admin:dev` / `admin:build` 命令，便于启动和验证本地后台
- `.gitignore` 增加 Codex 本地私有文件与后台构建产物忽略规则，避免发布时误提交本地工作手册、钩子和启动脚本
- 更新 `PROJECT_STATUS.md`，记录本地内容后台初版已接入

---

## v1.16 · 2026-05-29

### 内容
- 新增 news：[Claude Opus 4.8：一次「不炸裂」的更新，但藏着转向](docs/news/2026-05-29-claude-opus-48.md)

### 功能
- 新增公开版更新日志页面：[更新日志](docs/changelog.md)
- 在侧边栏底部增加「🧾 更新日志」入口，方便读者查看近期内容更新、功能优化和体验修复
- 更新日志从 2026-05-29 起开始记录，历史更新暂不追溯；后续每次读者可感知的更新都需要判断是否写入

---

## v1.15 · 2026-05-20

### 内容
- 新增 news：[Google I/O 2026：主角是 Agent](docs/news/2026-05-20-google-io-2026.md)
  - 基于 kb-articles A039（数字生命卡兹克 · Google I/O 2026 总结）的二次创作，按非技术员工调性改写
  - 主线：Agent 是这场发布会的真主角，从模型（Gemini 3.5 Flash）、开发工具（Antigravity 2.0）、个人助手（Spark）、手机系统（Android Halo）、搜索、电商三件套（UCP/AP2/Universal Cart）到 TPU 8 代双芯片，全部围绕 Agent 落地铺基础设施
  - 共 9 节 + 12 张配图，每张图都做了「图里有什么、对应文中哪个论点」的图注

---

## v1.14 · 2026-05-08

### 工程
- 加 `.github/dependabot.yml`：Dependabot 每周自动扫 GitHub Actions 版本，任何 action 有新版（如 `actions/checkout@v4` → `v5`）会自动开 PR，一键 merge 即完成升级
- 替代"6 月前升级 Node 24"这类需要人记的待办，改为 GitHub 主动通知 + 一键合并的零负担流程
- 不监控 npm 依赖（vitepress / medium-zoom 量少，避免周期性噪音 PR）

---

## v1.13 · 2026-05-08

### 修复 / 完善
- **AI 日报自动化重新接通**：v1.12 删除 `scripts/build_hot_digest.py` 但忘了一并改 `daily-hot-digest.yml`（旧 workflow 仍依赖该 Python 脚本 + TrendRadar），会导致次日 10:30 自动同步失败
- 把 `.github/workflows/daily-hot-digest.yml` 的核心步骤替换为 `node scripts/sync-aihot.mjs`：
  - 去掉 Python 3.12 / uv / TrendRadar 克隆 / `OPENROUTER_API_KEY` 依赖
  - 耗时从 ~5-10 分钟降到 ~5 秒
  - cron 保持 UTC 02:30 = 北京 10:30（AIHOT 8 点生成后 2.5 小时拉，稳）
- watchdog（兜底检查）文件 `hot-digest-watchdog.yml` 保持不动 —— 它的逻辑（检查 `docs/hot/$TODAY.md` 是否存在 → 否则触发 daily-hot-digest）跟新 workflow 完全兼容
- `OPENROUTER_API_KEY` secret 不再被 hot 板块使用（但保留在仓库 secret 里，以备其他用途）

---

## v1.12 · 2026-05-08

### 重构
- **AI 热点板块（`/hot/`）改造**：从原本"自己抓全网热度 + 写 200-300 字深度概述"切换为同步 [AIHOT](https://aihot.virxact.com/)（数字生命卡兹克的 AI 行业精选），原因是 AIHOT 的信源筛选（168 个 AI 一手源 T1/T1.5/T2 三级 + 5 维评分 + 事件聚类）质量与我们对学习平台的"AI 行业要闻"诉求高度对齐，自建管线性价比偏低
  - 新脚本：`scripts/sync-aihot.mjs`，调 AIHOT 公开 API（`/api/public/dailies` + `/api/public/daily/{date}`），生成单日 markdown
  - 新命令：`npm run sync:hot`，每天/每周手动跑一次
  - 入口页 `/hot/` 改为直接渲染当日完整内容（5 个分类：模型发布、产品发布、行业动态、论文研究、技巧与观点），底部列往期 6 天链接，超过 7 期的旧日报自动清理（不做长期归档，鼓励看新不看旧）
  - 单日详情页底部加"← 返回 AI 日报"链接，方便往期阅读
  - 来源名清理：去除全角括号内的内部备注（如"OpenAI：官网动态（RSS · 排除企业/客户案例）"→"OpenAI：官网动态"），保留半角括号（如 X 用户名 `(@username)`）
  - 归属：每期顶部 banner + 底部"想看完整精选请访问 AIHOT 官方站点"链接，给原作者引流

### 删除
- 旧的 `scripts/build_hot_digest.py`（自建抓取/聚合脚本，已被 `sync-aihot.mjs` 替代）
- `docs/hot/` 下 2026-04-22 至 2026-05-01 共 10 期旧格式日报（保留最近 7 期）

---

## v1.11 · 2026-05-08

### 新增
- **news 新闻**：《语音输入法时代正在到来》2026-05-08 新闻稿（首版 + opus 4.6 润色版）
  - 主题：OpenAI 5/7 发布三个实时语音模型 + 亲子号作者已用豆包语音输入替代打字
  - 核心判断：AI 入口正在从聊天框变成麦克风
  - 结构：两条线索指向同一方向 → 上游能力到位（GPT-Realtime-2 / Translate / Whisper）→ 下游用户已迁移（豆包输入法三个杀手细节）→ 三个证据 + 一条边界声明 → 三种语音使用模式
  - 引用文章：A033（AI范儿，OpenAI 三个语音模型）+ A034（小小包麻麻，豆包 4 玩法）

### 润色调整（同日二次发布）
- 标题"已经到来"→"正在到来"，更精准
- 第一节："撞到了一起"修正为"前后隔了将近两个月"，符合时间事实
- 第四节新增**边界声明**：开放式办公室、公共交通、密码隐私场景语音不适用，避免论断过满
- 删除原版第六节（行动清单）和第七节（开放问题），让文章更聚焦判断本身

---

## v1.10 · 2026-05-07

### 调整
- **密码门体验优化**：`PasswordGate.vue` 把 `sessionStorage` 改成 `localStorage`，密码输入一次后跨标签页/重启浏览器都记得，解决了之前"每次新标签都要重输"的问题
- **/vocab/ 工具页加密码门**：`docs/public/vocab/index.html` 注入了一段轻量原生 JS 密码门，逻辑/密码/`STORAGE_KEY = 'kb_auth_v1'` 与主站完全一致，三处效果：
  - 主站登录过的人，进入 /vocab/ 不再二次输入
  - /vocab/ 单独输入过的人，进入主站也不再二次输入
  - 同时在 `<head>` 加了 `<meta name="robots" content="noindex, nofollow">`，搜索引擎不会索引这个工具页

---

## v1.9 · 2026-05-07

### 新增
- **AI 学习词汇本上线**：新路由 `/vocab/`，独立工具页（codex 交付的 `web/vocab/index.html`，作为静态页放在 `docs/public/vocab/`）
  - 入口三处：首页自定义顶栏（`HomeNav.vue`）、首页特色专区第 4 张卡片（`HomeFeatures.vue`）、VitePress 内页顶栏（`config.js` themeConfig.nav）；均新标签打开
  - 数据策略：词库存在用户浏览器 localStorage（key: `ailinkstart:vocab:words`），用户可手动导出备份；不收集用户数据，不让用户填 API Key
  - AI 后端：单独一个 Cloudflare Worker（`ai-vocab-api`，代码仓库在 `claude专用/vocab-worker/`），路由 `ailinkstart.com/api/vocab/*`
    - 模型：DeepSeek `deepseek-chat`，Key 存在 Worker Secret `DEEPSEEK_API_KEY`，不进前端、不进仓库
    - CORS：仅放行 `https://ailinkstart.com`
    - 支持两种 mode：`interpret`（解读，返回严格 JSON：`displayTerm/fullName/fullNameParts/breakdown/translation/explanation/example` 等字段）和 `supplement`（换角度补充：`analogy/deeper/example/custom`，返回 `{content}`）
    - 防刷：Cloudflare WAF Rate limiting，按 IP 5 次 / 10 秒 → Block 10 秒（Free 套餐限制下的最稳配置）

---

## v1.8 · 2026-05-06

### 新增
- **news 新闻**：《ChatGPT 更新默认模型，更少废话更准确》2026-05-06 新闻稿
  - 主题：OpenAI 把 ChatGPT 默认快速模型升级到 GPT-5.5 Instant
  - 核心要点：高风险话题幻觉减少 52.5%、回答用词减 30%、新增"记忆来源"控制面板、免费用户也能用
  - 配图 2 张：数学题原图 + Memory sources UI 截图（`docs/public/images/news/2026-05-06/`）
  - 引用文章：A028（OpenAI 官方）+ A029（量子位）+ A030（AI范儿）

---

## v1.7 · 2026-04-28

### 新增
- **stage-4 新文章**：《PPT 场景：怎么用 AI 做 PPT》，国内外主流工具横评（豆包/Coze/美图设计室/NotebookLM/Claude Code），附 36 张截图 + 提示词模板
- **news 新闻**：《AI Agent 9 秒删库事故》2026-04-28 新闻稿

### 修复
- 删除 `docs/news/` 和 `docs/public/images/stage-4/` 目录下多余的 ` 2` 副本文件（macOS 拷贝时自动产生）

---

## v1.6 · 2026-04-23

### 新增
- **🔥 AI 热点专区自动化上线**:新路由 `/hot/`,导航栏 + 侧边栏已接入,日报按日期倒序
  - 每日北京时间 21:00,GitHub Actions(`.github/workflows/daily-hot-digest.yml`)自动触发
  - 数据源:TrendRadar 抓 11 个国内热榜(微博/知乎/B 站/头条/百度/澎湃 等) + Hacker News RSS
  - LLM 合并去重 + 生成摘要:OpenRouter 聚合网关,默认走 DeepSeek Chat,单次成本约 $0.002
  - 综合打分维度:重要性、时效性、讨论度、影响面 4 个维度 → 前端仅显示 🔥 数量(1-5 档)
  - 每条热点默认折叠,展开后显示 200-300 字概述 + 代表链接
  - 关键词表:`.trendradar-config/frequency_words.txt`,三层结构(核心层 / 玩家层 / 应用层)
  - API key 通过 GitHub Secret `OPENROUTER_API_KEY` 注入,不出现在代码里

### 调整
- 专区入口页精简:去掉"覆盖平台清单""每条热点包含什么""更新频率""关键词表维护""数据来源致谢"等对读者无用的内部字段
- 日报 MD 顶部只保留抓取时间行,"今日速览(一段话看完)" 简化为"今日速览"
- `autoItems()` 支持 `reverse: true` 参数,AI 热点侧边栏按日期倒序(最新在上)

### 相关文件
- `scripts/build_hot_digest.py` — SQLite → LLM → MD 的生成脚本
- `.trendradar-config/frequency_words.txt` — AI 关键词表
- `.github/workflows/daily-hot-digest.yml` — 定时任务
- `BUILD_JOURNAL.md`(新建)— 整站建设历程的叙事回顾

---

## v1.5.2 · 2026-04-22

### 新增
- **news 专区首篇新闻稿**：《2026/04/22 · OpenAI 发布 GPT-Image-2，一句话出专业设计稿》
  - 路径：`docs/news/2026-04-22-gpt-image-2.md`
  - 基于三位一线作者（卡兹克、AI 范儿、歸藏）的实测合稿，配 12 张原图，分布在"三个新能力 / 日常场景 / 行业共识分歧 / 要警惕什么"四个章节
  - 图片托管在 `docs/public/images/news/2026-04-22/`（22 张，其中 12 张正文使用）
  - 飞书镜像已同步

### 调整
- **侧边栏长标题自动截断**：2 行上限 + 字号 13px + 行高 1.45，避免长标题撑开侧边栏（`.VPSidebarItem .link .text`）
- **文章内图片尺寸限制**：`.vp-doc img` 加 `max-height: 520px`，保证一屏可看完整张图；同时加 6px 圆角 + 极淡投影
- **新增图注样式 `.figcaption`**：13px / `#8a8a8a` / 居中容器左对齐文本，放在图下方不抢正文视觉；内链同样灰色 hover 才变主题绿

---

## v1.5.1 · 2026-04-22

### 调整
- **侧边栏去掉"阶段简介 / 专区介绍"二级项**：每个一级 section header 直接链接到 `/stage-N/` 或 `/frontier/` 等，点击 section 标题即可查看简介内容；改动符合"点击一级就看简介，不要多一层重复"的预期。
- **Gene vs Skill 文章开头精简**：从 4 行冗余 metadata（所属专区 / 阅读时长 / 面向读者 / 原文引用）收敛成 1 行 `> 预计阅读时间：8 分钟 · 适合日常用 AI 但没有技术背景的同事`，与其他文章风格一致。
- **autoItems 自动跳过 `index.md`**：防止以后新增 section 时简介页意外出现在子侧边栏。

### 修复
- `.gitignore` 补充 `CLAUDE.md` 和 `kb-articles/` 两条（上次提交漏 stage），防止未来发布再次误带内部文件。

---

## v1.5 · 2026-04-22

### 新增
- **frontier 专区首篇文章**：《给 AI 写一份超详细的说明书，反而让它变笨了？》
  - 路径：`docs/frontier/gene-vs-skill.md`
  - 基于清华 × EvoMap 论文《From Procedural Skills to Strategy Genes》解读，面向非技术员工读者
  - 两张自制配图：Skill vs Gene 得分对比 + 结构对比
  - 飞书 Wiki 镜像已同步

---

## v1.4 · 2026-04-21

### 首页改版（山水登山路径风格）
- Hero 区重构：5 层 SVG 叠山 + 蜿蜒小路 + 6 个节点 + 右上太阳光晕，视觉意境化呈现"从零基础走向 AI 时代超级个体"的学习路径
- 6 阶段节点支持点击直达各阶段简介页；06 终点做深色差异化 + 呼吸光环
- 新增首页专属 sticky 毛玻璃导航栏（品牌 + 搜索 + 学习路径下拉 + 专区入口）
- 新增首页专属 footer（品牌 + 声明 + 版权）
- 字体切换为 Noto Serif SC / Noto Sans SC / JetBrains Mono（通过 fonts.loli.net 镜像加载，对大陆友好）
- 首页 body 改为天空绿→米色的 5 色渐变背景（内页保持原样）

### 新增
- 6 个阶段的"阶段简介"首页（`/stage-N/`）：每页约 200-400 字，说明该阶段讲什么、含哪些文章、读完去哪
- 侧边栏每个 stage 新增"阶段简介"条目，固定在文章列表之前

### 保持
- 密码门、GA、robots meta、侧边栏自动同步逻辑无变化
- 内页文章页布局、导航栏、侧边栏样式全部不动

---

## v1.3 · 2026-04-21

### 修复
- 修复所有文章正文不显示的 P0 生产 bug：登录后进入任何 stage 文章仅见侧边栏和"上/下篇"导航，正文区域完全空白
- 根因：PasswordGate 作为 DefaultTheme.Layout 的父级 slot 包裹器，导致 VitePress 路由数据加载时机错位，文章 full chunk 未被加载
- 解法：将 PasswordGate 改为与 DefaultTheme.Layout 平级的覆盖层组件（position: fixed 遮罩），Layout 从初始渲染即挂载

---

## v1.2 · 2026-04-15

### 新增
- 接入 Google Analytics（G-6TV8DT9DEY），支持访问量、文章阅读量、停留时长统计
- 导航栏添加「📝 学习测试」入口，链接至内部问卷工具

### 优化
- 首页改版：六阶段学习路径升级为阶梯卡片布局，渐进配色，每张卡片可点击跳转
- 首页特色专区独立展示，顺序调整为：AI 新闻、AI 前沿探讨、AI 编程
- 导航栏顺序调整：学习测试移至学习路径右侧
- 隐藏暗色模式切换按钮，固定为浅色主题

### 修复
- 修复微信内置浏览器密码门「进入」按钮无法点击的问题
- 修复密码门「眼睛」图标在微信内置浏览器中失效的问题
- 优化移动端触摸响应区域

---

## v1.1 · 2026-04 （历史版本）

### 新增
- 全站内容填充：18 篇文章覆盖六个学习阶段
- 后台 CMS 升级：中文界面，支持新建/删除文章，增加日期字段

### 优化
- 全站结构升级为 6 阶段 + 3 专区
- 侧边栏自动同步文件，新增/删除文章无需手动维护

### 修复
- 修复 Netlify Identity 邀请链接跨域登录失败
- 修复后台 token hash 格式问题

---

## v1.0 · 2026-04 （初始版本）

- VitePress + Netlify 完成基础搭建
- 密码门保护全站访问
- 绿色主题配色
- 六阶段学习路径基础结构
