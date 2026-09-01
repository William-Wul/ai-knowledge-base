// 全站内容结构的唯一数据源（2026-07-28 内容重组）。
// 侧边栏（config.js）、面包屑（Breadcrumb.vue）共用——改模块名只改这一处。
//
// 四大板块：
//   AI 最新动态 = AI 日报(hot/) + AI 前沿(frontier/ 深度专题 + 原 AI 新闻 news/ + 趋势长文)
//   AI 基础学习 = 快速认知(stage-1) + 工具快速上手(跨目录清单 TOOL_LINKS) + 使用注意事项(CAUTION_LINKS)
//   AI 进阶实践 = 扁平文章池(PRACTICE_LINKS)：不绑定单一工具的技巧、思路与方法
//   AI 学习小工具 = 能力自测(exams/) + 词汇本(/vocab-book)
// 注意：展示结构与目录结构解耦，物理文件不动、所有 URL 保持不变。
// 新文章归属原则：绑定某个具体工具的教程 → 基础学习·工具上手；
// 不绑工具的通用技巧方法 → 进阶实践；趋势认知类 → AI 前沿。

// 「AI 基础学习」三模块（dir 为 null 的模块是跨目录的逻辑分组）
export const BASIC_MODULES = [
  { dir: 'stage-1', link: '/stage-1/', emoji: '🧠', name: 'AI 快速认知' },
  { dir: 'stage-2', link: '/stage-2/', emoji: '🛠️', name: 'AI 工具快速上手' },
  { dir: null,      link: '/stage-2/safety-guidelines', emoji: '⚠️', name: 'AI 使用注意事项' },
]

// 「AI 工具快速上手」模块的文章清单（跨目录逻辑分组，顺序即侧边栏顺序）
// 通用对话工具 → 说话方法 → 场景横评 → 办公助手(教程→案例) → AI 编程工具
export const TOOL_LINKS = [
  '/stage-2/doubao-guide',
  '/stage-2/marvis-guide',
  '/stage-2/how-to-prompt',
  '/stage-4/ppt-ai-tools',
  '/stage-5/workbuddy-guide',
  '/stage-4/workbuddy-word-excel-ppt',
  '/stage-5/claude-code-guide',
  '/stage-5/codex-guide',
]

// 「AI 使用注意事项」模块的文章清单（物理存放在 stage-2 目录，展示时独立成模块）
export const CAUTION_LINKS = [
  '/stage-2/safety-guidelines',
  '/stage-2/learn-new-not-old',
  '/stage-2/ai-tool-data-flow',
]

// 「AI 进阶实践」扁平文章池（跨目录逻辑分组，顺序即侧边栏顺序）
// 给 AI 派活 → 提示词技巧 → 上下文管理 → 写作去 AI 味 → 写好 Skill → Loop → 多 AI 协同 → 深度调研 → Harness DIY
export const PRACTICE_LINKS = [
  '/stage-2/define-done',
  '/stage-2/prompt-cases',
  '/stage-2/context-management',
  '/stage-2/writing-no-ai-flavor',
  '/stage-3/write-good-skill',
  '/stage-3/loop-engineering',
  '/stage-4/multi-agent-teamwork',
  '/stage-4/ai-industry-research',
  '/stage-2/harness-diy',
]

// 「AI 前沿」栏目的额外文章（物理在 stage-6 的趋势长文，按 date 与专题混排）
export const FRONTIER_EXTRA_LINKS = [
  '/stage-6/one-person-company',
]

// 顶层栏目（面包屑等用）
export const SECTIONS = {
  hot:      { text: 'AI 日报', link: '/hot/' },
  news:     { text: 'AI 前沿', link: '/frontier/' }, // 原 AI 新闻已并入「AI 前沿」栏目
  frontier: { text: 'AI 前沿', link: '/frontier/' },
}

// 五大板块归属（面包屑用）
// dirs 是目录级默认归属；上面的 *_LINKS 清单是文件级覆盖，优先级更高。
// stage-6 已整体废弃（唯一文章划归 AI 前沿），不在任何板块 dirs 内，新文章请勿再写入该目录。
// videos = AI 视频课（B 站精选卡片墙，清单在 .vitepress/videosData.js，不按文件目录组织）
export const BOARDS = {
  pulse:    { text: 'AI 最新动态', link: '/hot/',     dirs: ['hot', 'news', 'frontier'] },
  basics:   { text: 'AI 基础学习', link: '/stage-1/', dirs: ['stage-1', 'stage-2', 'stage-5'] },
  practice: { text: 'AI 进阶实践', link: '/stage-4/', dirs: ['stage-3', 'stage-4'] },
  videos:   { text: 'AI 视频课',   link: '/videos/',  dirs: ['videos'] },
}
