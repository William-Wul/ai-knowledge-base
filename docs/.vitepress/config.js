import { defineConfig } from 'vitepress'

export default defineConfig({
  // ⚠️ 部署到 GitHub Pages 后，需要将 base 改为 '/仓库名/'
  // 例如仓库名是 ai-knowledge-base，则改为 base: '/ai-knowledge-base/'
  base: '/ai-knowledge-base/',

  title: 'AI 学习知识库',
  description: '从零开始，掌握 AI 工作力',

  lang: 'zh-CN',

  head: [
    ['meta', { name: 'robots', content: 'noindex, nofollow' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['link', { rel: 'icon', href: '/ai-knowledge-base/favicon.svg', type: 'image/svg+xml' }],
    ['script', { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }],
  ],

  themeConfig: {
    siteTitle: 'AI 学习知识库',

    nav: [
      {
        text: '📚 学习路径',
        items: [
          { text: '🧠 阶段一 · 快速认知', link: '/stage-1/what-is-ai' },
          { text: '🛠️ 阶段二 · 零基础上手', link: '/stage-2/getting-started' },
          { text: '🔬 阶段三 · AI 进阶概念', link: '/stage-3/agentic-ai' },
          { text: '💼 阶段四 · 工作场景实战', link: '/stage-4/hr-scenarios' },
          { text: '🤖 阶段五 · AI Agent 使用', link: '/stage-5/openclaw-guide' },
          { text: '🚀 阶段六 · AI 创意与创业', link: '/stage-6/ai-side-projects' },
        ]
      },
      { text: '🔭 AI 前沿', link: '/frontier/' },
      { text: '💻 AI 编程', link: '/coding/' },
      { text: '📰 AI 新闻', link: '/news/' },
    ],

    sidebar: [
      {
        text: '🧠 阶段一 · 快速认知',
        collapsed: false,
        items: [
          { text: '一文看懂AI是什么', link: '/stage-1/what-is-ai' },
          { text: 'AI 常见术语一点通', link: '/stage-1/ai-terminology' },
        ],
      },
      {
        text: '🛠️ 阶段二 · 零基础上手',
        collapsed: true,
        items: [
          { text: 'AI 工具全景图', link: '/stage-2/ai-tools-overview' },
          { text: '注册与上手指南', link: '/stage-2/getting-started' },
          { text: '跟 AI 说话的基本方法', link: '/stage-2/how-to-prompt' },
          { text: '5 个马上能用的场景', link: '/stage-2/quick-use-cases' },
          { text: 'AI 使用的安全红线', link: '/stage-2/safety-guidelines' },
        ],
      },
      {
        text: '🔬 阶段三 · AI 进阶概念',
        collapsed: true,
        items: [
          { text: '什么是 Agentic AI', link: '/stage-3/agentic-ai' },
          { text: 'AI Harness：驾驭AI的框架', link: '/stage-3/ai-harness' },
        ],
      },
      {
        text: '💼 阶段四 · 工作场景实战',
        collapsed: true,
        items: [
          { text: '人资场景', link: '/stage-4/hr-scenarios' },
          { text: '财务场景', link: '/stage-4/finance-scenarios' },
          { text: '法务场景', link: '/stage-4/legal-scenarios' },
          { text: '运营/产品场景', link: '/stage-4/ops-product-scenarios' },
          { text: '创意/内容场景', link: '/stage-4/creative-scenarios' },
        ],
      },
      {
        text: '🤖 阶段五 · AI Agent 使用',
        collapsed: true,
        items: [
          { text: 'OpenClaw 配置与使用', link: '/stage-5/openclaw-guide' },
          { text: 'Hermes 配置与使用', link: '/stage-5/hermes-guide' },
          { text: 'Claude Code 使用指南', link: '/stage-5/claude-code-guide' },
        ],
      },
      {
        text: '🚀 阶段六 · AI 创意与创业',
        collapsed: true,
        items: [
          { text: '用AI做副业和小项目', link: '/stage-6/ai-side-projects' },
          { text: 'AI创业案例与经验', link: '/stage-6/ai-startup-cases' },
        ],
      },
      {
        text: '🔭 AI 前沿探讨',
        collapsed: true,
        items: [
          { text: '专区介绍', link: '/frontier/' },
        ],
      },
      {
        text: '💻 AI 编程',
        collapsed: true,
        items: [
          { text: '专区介绍', link: '/coding/' },
        ],
      },
      {
        text: '📰 AI 新闻',
        collapsed: true,
        items: [
          { text: '专区介绍', link: '/news/' },
        ],
      },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
              modal: {
                noResultsText: '没有找到相关结果',
                resetButtonTitle: '清除搜索',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
        },
      },
    },

    docFooter: { prev: '上一篇', next: '下一篇' },
    outline: { label: '本页目录', level: [2, 3] },
    lastUpdated: { text: '最后更新于' },

    footer: {
      message: '内部学习资料，请勿外传',
      copyright: '© 2026 AI 学习知识库',
    },
  },
})
