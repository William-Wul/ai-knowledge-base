# 版本记录

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
