// 学习路径六阶段 + 顶层栏目的唯一数据源。
// 顶部导航 / 侧栏（config.js）、首页导航（HomeNav.vue）、首页路径图（HomeHero.vue）、
// 面包屑（Breadcrumb.vue）都从这里取数据——改阶段名只改这一处。

export const STAGES = [
  { dir: 'stage-1', link: '/stage-1/', emoji: '🧠', stageLabel: '阶段一', name: '快速认知',       sub: '10 分钟建立 AI 世界观' },
  { dir: 'stage-2', link: '/stage-2/', emoji: '🛠️', stageLabel: '阶段二', name: '零基础上手',     sub: '用上趁手的 AI 工具' },
  { dir: 'stage-3', link: '/stage-3/', emoji: '🔬', stageLabel: '阶段三', name: 'AI 进阶概念',    sub: '解锁 AI 圈思维方式' },
  { dir: 'stage-4', link: '/stage-4/', emoji: '💼', stageLabel: '阶段四', name: '工作场景实战',   sub: '按岗位融入工作流' },
  { dir: 'stage-5', link: '/stage-5/', emoji: '🤖', stageLabel: '阶段五', name: 'AI Agent 使用',  sub: '解放双手提高生产力' },
  { dir: 'stage-6', link: '/stage-6/', emoji: '🚀', stageLabel: '阶段六', name: 'AI 创意与创业',  sub: '成为全能超级个体' },
]

// 完整标题，如「阶段一 · 快速认知」
export function fullTitle(stage) {
  return `${stage.stageLabel} · ${stage.name}`
}

// 学习路径之外的顶层栏目（面包屑等用）
export const SECTIONS = {
  news:     { text: 'AI 新闻', link: '/news/' },
  hot:      { text: 'AI 日报', link: '/hot/' },
  frontier: { text: 'AI 前沿', link: '/frontier/' },
}
