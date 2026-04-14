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
  ],

  themeConfig: {
    siteTitle: 'AI 学习知识库',

    nav: [
      { text: '🧠 快速认知', link: '/stage-1/what-is-ai' },
      { text: '🛠️ 上手实操', link: '/stage-2/getting-started' },
      { text: '💼 场景深耕', link: '/stage-3/hr-scenarios' },
      { text: '🚀 持续进化', link: '/stage-4/ai-updates' },
    ],

    sidebar: [
      {
        text: '🧠 阶段一 · 快速认知',
        collapsed: false,
        items: [
          { text: 'AI 到底是什么', link: '/stage-1/what-is-ai' },
          { text: 'AI 工具全景图', link: '/stage-1/ai-tools-overview' },
          { text: 'AI 常见术语一点通', link: '/stage-1/ai-terminology-guide' },
          { text: 'AI 使用的安全红线', link: '/stage-1/safety-guidelines' },
        ],
      },
      {
        text: '🛠️ 阶段二 · 上手实操',
        collapsed: true,
        items: [
          { text: '注册与上手指南', link: '/stage-2/getting-started' },
          { text: '跟 AI 说话的基本方法', link: '/stage-2/how-to-prompt' },
          { text: '5 个马上能用的场景', link: '/stage-2/quick-use-cases' },
        ],
      },
      {
        text: '💼 阶段三 · 场景深耕',
        collapsed: true,
        items: [
          { text: '人资场景', link: '/stage-3/hr-scenarios' },
          { text: '财务场景', link: '/stage-3/finance-scenarios' },
          { text: '法务场景', link: '/stage-3/legal-scenarios' },
          { text: '运营 / 产品场景', link: '/stage-3/ops-product-scenarios' },
          { text: '通用进阶技巧', link: '/stage-3/advanced-tips' },
        ],
      },
      {
        text: '🚀 阶段四 · 持续进化',
        collapsed: true,
        items: [
          { text: 'AI 新功能速递', link: '/stage-4/ai-updates' },
          { text: 'AI 思维与认知升级', link: '/stage-4/ai-mindset' },
          { text: '内部实践案例库', link: '/stage-4/internal-cases' },
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
