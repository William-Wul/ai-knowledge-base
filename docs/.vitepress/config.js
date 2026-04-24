import { defineConfig } from 'vitepress'
import { existsSync, readdirSync, readFileSync } from 'fs'
import { resolve, join, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const docsRoot = resolve(__dirname, '..')

// 从文件的 frontmatter 或第一个 # 标题提取文章标题
function getTitle(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const m = content.match(/^title:\s*(.+)$/m)
    if (m) return m[1].trim()
    const h = content.match(/^#\s+(.+)$/m)
    if (h) return h[1].trim()
  } catch {}
  return basename(filePath, '.md')
}

// 把导航链接转成对应的本地文件路径
function linkToFile(link) {
  const clean = link.replace(/^\//, '')
  if (clean.endsWith('/')) return join(docsRoot, clean, 'index.md')
  return join(docsRoot, clean + '.md')
}

// 智能侧边栏条目生成：
// - 已知列表中的文件：若文件存在则保留（保序），文件删了自动消失
// - 目录里新增的文件：自动追加到末尾（标题从 frontmatter 读取）
// - reverse: 新文件按日期倒序排（最新在上），用于日报类目录
function autoItems(dir, knownItems = [], { reverse = false } = {}) {
  // 1. 过滤掉文件已不存在的已知项（处理「后台删除」场景）
  const kept = knownItems.filter(item => existsSync(linkToFile(item.link)))
  const keptLinks = new Set(kept.map(i => i.link))

  // 2. 扫描目录，发现未在已知列表中的新文件（处理「后台新建」场景）
  const dirPath = join(docsRoot, dir)
  if (!existsSync(dirPath)) return kept

  const files = readdirSync(dirPath)
    .filter(f => f.endsWith('.md') && f !== 'index.md')
    .sort()
  if (reverse) files.reverse()

  const extras = files
    .map(f => {
      const link = `/${dir}/${basename(f, '.md')}`
      return { text: getTitle(join(dirPath, f)), link }
    })
    .filter(item => !keptLinks.has(item.link))

  return [...kept, ...extras]
}

export default defineConfig({
  base: '/',

  title: 'AI 学习知识库',
  description: '从零开始，掌握 AI 工作力',

  lang: 'zh-CN',
  cleanUrls: true,

  vite: {
    build: {
      minify: 'esbuild',
      cssCodeSplit: true,
    },
  },

  head: [
    ['meta', { name: 'robots', content: 'noindex, nofollow' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.loli.net' }],
    ['link', { rel: 'preconnect', href: 'https://gstatic.loli.net', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.loli.net/css2?family=Noto+Serif+SC:wght@500;700;900&family=Noto+Sans+SC:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap' }],
    ['script', {}, `if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }`],
    ['script', {}, `var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "https://hm.baidu.com/hm.js?a681b724c97970a6d082bec9d556c968"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })();`],
  ],

  themeConfig: {
    siteTitle: 'AI 学习知识库',

    nav: [
      { text: '📖 前言', link: '/preface' },
      {
        text: '📚 学习路径',
        items: [
          { text: '🧠 阶段一 · 快速认知', link: '/stage-1/what-is-ai' },
          { text: '🛠️ 阶段二 · 零基础上手', link: '/stage-2/' },
          { text: '🔬 阶段三 · AI 进阶概念', link: '/stage-3/agentic-ai' },
          { text: '💼 阶段四 · 工作场景实战', link: '/stage-4/' },
          { text: '🤖 阶段五 · AI Agent 使用', link: '/stage-5/' },
          { text: '🚀 阶段六 · AI 创意与创业', link: '/stage-6/' },
        ]
      },
      { text: '📝 学习测试', link: '/exams/' },
      { text: '📰 AI 新闻', link: '/news/' },
      { text: '🔭 AI 前沿', link: '/frontier/' },
      { text: '💻 AI 编程', link: '/coding/' },
    ],

    sidebar: [
      { text: '📖 前言', link: '/preface' },
      {
        text: '🧠 阶段一 · 快速认知',
        link: '/stage-1/',
        collapsed: false,
        items: autoItems('stage-1', [
          { text: '一文看懂AI是什么', link: '/stage-1/what-is-ai' },
          { text: 'AI 常见术语一点通', link: '/stage-1/ai-terminology' },
        ]),
      },
      {
        text: '🛠️ 阶段二 · 零基础上手',
        link: '/stage-2/',
        collapsed: true,
        items: autoItems('stage-2', [
          { text: '学新不学旧，用实不用虚', link: '/stage-2/learn-new-not-old' },
          { text: '综合/对话类 AI：从豆包开始', link: '/stage-2/doubao-guide' },
          { text: '图片/视频类 AI：即梦、可灵等', link: '/stage-2/image-video-ai' },
          { text: '智能体/助理类 AI：Coze、秒哒等', link: '/stage-2/agent-tools' },
          { text: '跟 AI 对话的基本方法', link: '/stage-2/how-to-prompt' },
          { text: 'Prompt 场景案例库', link: '/stage-2/prompt-cases' },
          { text: 'AI 使用的安全红线', link: '/stage-2/safety-guidelines' },
        ]),
      },
      {
        text: '🔬 阶段三 · AI 进阶概念',
        link: '/stage-3/',
        collapsed: true,
        items: autoItems('stage-3', [
          { text: '什么是 Agentic AI', link: '/stage-3/agentic-ai' },
          { text: 'AI Harness：驾驭AI的框架', link: '/stage-3/ai-harness' },
        ]),
      },
      {
        text: '💼 阶段四 · 工作场景实战',
        link: '/stage-4/',
        collapsed: true,
        items: autoItems('stage-4', []),
      },
      {
        text: '🤖 阶段五 · AI Agent 使用',
        link: '/stage-5/',
        collapsed: true,
        items: autoItems('stage-5', []),
      },
      {
        text: '🚀 阶段六 · AI 创意与创业',
        link: '/stage-6/',
        collapsed: true,
        items: autoItems('stage-6', []),
      },
      {
        text: '📝 学习测试',
        link: '/exams/',
        collapsed: true,
        items: autoItems('exams', []),
      },
      {
        text: '📰 AI 新闻',
        link: '/news/',
        collapsed: true,
        items: [
          { text: '🔥 ' + getTitle(join(docsRoot, 'hot/index.md')), link: '/hot/' },
          ...autoItems('news', [], { reverse: true }),
        ],
      },
      {
        text: '🔭 AI 前沿探讨',
        link: '/frontier/',
        collapsed: true,
        items: autoItems('frontier', []),
      },
      {
        text: '💻 AI 编程',
        link: '/coding/',
        collapsed: true,
        items: autoItems('coding', []),
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
