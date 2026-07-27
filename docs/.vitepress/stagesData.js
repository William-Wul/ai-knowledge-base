// 全站内容结构的唯一数据源（2026-07-28 改版）。
// 侧边栏（config.js）、面包屑（Breadcrumb.vue）共用——改模块名只改这一处。
//
// 四大板块：
//   AI 最新动态 = AI 日报(hot/) + AI 前沿(frontier/ 与原 AI 新闻 news/ 合并)
//   AI 基础学习 = 快速认知(stage-1) + 工具快速上手(stage-2) + 使用注意事项(stage-2 部分文章)
//   AI 进阶实践 = 扁平文章池(stage-3/4/5/6)，不设模块
//   AI 学习小工具 = 能力自测(exams/) + 词汇本(/vocab-book)
// 注意：展示结构与目录结构解耦，所有 URL 保持不变。

// 「AI 基础学习」三模块（dir 为 null 的模块是跨目录的逻辑分组）
export const BASIC_MODULES = [
  { dir: 'stage-1', link: '/stage-1/', emoji: '🧠', name: 'AI 快速认知' },
  { dir: 'stage-2', link: '/stage-2/', emoji: '🛠️', name: 'AI 工具快速上手' },
  { dir: null,      link: '/stage-2/safety-guidelines', emoji: '⚠️', name: 'AI 使用注意事项' },
]

// 「AI 使用注意事项」模块的文章清单（物理存放在 stage-2 目录，展示时独立成模块）
export const CAUTION_LINKS = [
  '/stage-2/safety-guidelines',
  '/stage-2/learn-new-not-old',
]

// 「AI 进阶实践」扁平文章池：按此目录顺序展示
// stage-3 = 思路方法（Agentic AI / AI Harness / Loop Engineering）
// stage-4 = 岗位实战，stage-5 = Agent 教程，stage-6 = 创意与创业
export const PRACTICE_DIRS = ['stage-3', 'stage-4', 'stage-5', 'stage-6']

// 顶层栏目（面包屑等用）
export const SECTIONS = {
  hot:      { text: 'AI 日报', link: '/hot/' },
  news:     { text: 'AI 前沿', link: '/frontier/' }, // 原 AI 新闻已并入「AI 前沿」栏目
  frontier: { text: 'AI 前沿', link: '/frontier/' },
  exams:    { text: 'AI 能力自测', link: '/exams/' },
}

// 四大板块归属（面包屑用）
export const BOARDS = {
  pulse:    { text: 'AI 最新动态', link: '/hot/',     dirs: ['hot', 'news', 'frontier'] },
  basics:   { text: 'AI 基础学习', link: '/stage-1/', dirs: ['stage-1', 'stage-2'] },
  practice: { text: 'AI 进阶实践', link: '/stage-4/', dirs: ['stage-3', 'stage-4', 'stage-5', 'stage-6'] },
}
