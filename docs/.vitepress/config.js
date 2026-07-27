import { defineConfig } from 'vitepress'
import { existsSync, readdirSync, readFileSync } from 'fs'
import { resolve, join, basename, dirname } from 'path'
import { fileURLToPath } from 'url'
import { CAUTION_LINKS, PRACTICE_DIRS } from './stagesData.js'

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

// 读取 frontmatter 的 date 字段（YYYY-MM-DD），没有则返回空串（排到最末尾）
function getDate(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const m = content.match(/^date:\s*(.+)$/m)
    if (m) return m[1].trim().replace(/["']/g, '')
  } catch {}
  return ''
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
// - limit: 限制条目总数（日报归档只展示最近几期）
// - exclude: 这些链接被别的模块占用（如「使用注意事项」借用了 stage-2 的文章），不再追加
function autoItems(dir, knownItems = [], { reverse = false, sortByDate = false, limit = 0, exclude = [] } = {}) {
  // 1. 过滤掉文件已不存在的已知项（处理「后台删除」场景）
  const kept = knownItems.filter(item => existsSync(linkToFile(item.link)))
  const keptLinks = new Set(kept.map(i => i.link))

  // 2. 扫描目录，发现未在已知列表中的新文件（处理「后台新建」场景）
  const dirPath = join(docsRoot, dir)
  if (!existsSync(dirPath)) return kept

  let files = readdirSync(dirPath)
    .filter(f => f.endsWith('.md') && f !== 'index.md')

  if (sortByDate) {
    // 按 frontmatter 的 date 倒序（最新在上），缺 date 的排末尾
    files = files
      .map(f => ({ f, date: getDate(join(dirPath, f)) }))
      .sort((a, b) => {
        if (!a.date && !b.date) return a.f.localeCompare(b.f)
        if (!a.date) return 1
        if (!b.date) return -1
        return b.date.localeCompare(a.date)
      })
      .map(x => x.f)
  } else {
    files.sort()
    if (reverse) files.reverse()
  }

  const extras = files
    .map(f => {
      const link = `/${dir}/${basename(f, '.md')}`
      return { text: getTitle(join(dirPath, f)), link }
    })
    .filter(item => !keptLinks.has(item.link) && !exclude.includes(item.link))

  const all = [...kept, ...extras]
  return limit > 0 ? all.slice(0, limit) : all
}

// 跨目录合并文章列表（按 frontmatter date 倒序，最新在上）：
// 用于「AI 前沿」栏目合并 frontier/（深度专题）与 news/（原 AI 新闻）
// 显示时去掉标题开头的日期前缀（如「2026/07/17 · 」），排序不受影响
function mergedItems(dirs, { limit = 0 } = {}) {
  const all = []
  for (const dir of dirs) {
    const dirPath = join(docsRoot, dir)
    if (!existsSync(dirPath)) continue
    for (const f of readdirSync(dirPath)) {
      if (!f.endsWith('.md') || f === 'index.md') continue
      const fp = join(dirPath, f)
      const text = getTitle(fp).replace(/^\d{4}[/.-]\d{1,2}[/.-]\d{1,2}\s*[·\-–—|]?\s*/, '')
      all.push({ text, link: `/${dir}/${basename(f, '.md')}`, date: getDate(fp) })
    }
  }
  all.sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.text.localeCompare(b.text))
  const list = limit > 0 ? all.slice(0, limit) : all
  return list.map(({ text, link }) => ({ text, link }))
}

// 各模块需要固定排序的已知文章（新文件会由 autoItems 自动追加到末尾）
// 注：stage-2 的「安全红线」「学新不学旧」已划归「AI 使用注意事项」模块（CAUTION_LINKS）
const STAGE_KNOWN_ITEMS = {
  'stage-1': [
    { text: '一文看懂AI是什么', link: '/stage-1/what-is-ai' },
    { text: 'AI 常见术语一点通', link: '/stage-1/ai-terminology' },
  ],
  'stage-2': [
    { text: '综合/对话类 AI：从豆包开始', link: '/stage-2/doubao-guide' },
    { text: '智能体/助理类 AI：从 Marvis 开始', link: '/stage-2/marvis-guide' },
    { text: '跟 AI 说话的基本方法', link: '/stage-2/how-to-prompt' },
    { text: 'Prompt 进阶：让 AI 帮你想', link: '/stage-2/prompt-cases' },
  ],
  'stage-3': [
    { text: '什么是 Agentic AI', link: '/stage-3/agentic-ai' },
    { text: 'AI Harness：驾驭AI的框架', link: '/stage-3/ai-harness' },
    { text: 'Loop Engineering：让 AI 自己干完', link: '/stage-3/loop-engineering' },
  ],
}

export default defineConfig({
  base: '/',

  title: 'AI 学习知识库',
  description: '从零开始，掌握 AI 工作力',

  lang: 'zh-CN',
  cleanUrls: true,
  appearance: false,

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
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'AI 学习知识库' }],
    ['meta', { property: 'og:description', content: '从零开始的 AI 学习路径' }],
    ['meta', { property: 'og:image', content: 'https://ailinkstart.com/og-cover.png' }],
    ['meta', { property: 'og:url', content: 'https://ailinkstart.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.loli.net' }],
    ['link', { rel: 'preconnect', href: 'https://gstatic.loli.net', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.loli.net/css2?family=Noto+Serif+SC:wght@500;700;900&family=Noto+Sans+SC:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap' }],
    ['script', {}, `if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }`],
    ['script', {}, `var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "https://hm.baidu.com/hm.js?a681b724c97970a6d082bec9d556c968"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })();`],
  ],

  themeConfig: {
    siteTitle: 'AI 学习知识库',

    // 2026-07 改版：与首页导航一致的五大入口
    nav: [
      { text: 'AI 最新动态', link: '/hot/' },
      { text: 'AI 基础学习', link: '/stage-1/' },
      { text: 'AI 进阶实践', link: '/stage-4/' },
      { text: 'AI 能力自测', link: '/exams/' },
      { text: 'AI 学习词汇本', link: '/vocab-book' },
    ],

    // 2026-07-28 改版：侧边栏按四大板块重组（目录与 URL 不变，仅逻辑归组）
    // 注：板块标题不带图标，图标只留给二级模块——层级更清晰
    // 前言居首、更新日志收尾，与四大板块同为一级标题（样式见 custom.css 按 href 定向）
    // 板块与模块均默认折叠（collapsed: true），仅自动展开包含当前页的那一条链
    sidebar: [
      { text: '前言', link: '/preface' },
      {
        text: 'AI 最新动态',
        collapsed: true,
        items: [
          { text: '🔥 AI 日报', link: '/hot/', collapsed: true, items: autoItems('hot', [], { reverse: true, limit: 7 }) },
          // AI 前沿 = frontier/ 深度专题 + 原 news/ AI 新闻，按日期倒序混排
          { text: '🔭 AI 前沿', link: '/frontier/', collapsed: true, items: mergedItems(['frontier', 'news']) },
        ],
      },
      {
        text: 'AI 基础学习',
        collapsed: true,
        items: [
          { text: '🧠 AI 快速认知', link: '/stage-1/', collapsed: true, items: autoItems('stage-1', STAGE_KNOWN_ITEMS['stage-1']) },
          { text: '🛠️ AI 工具快速上手', link: '/stage-2/', collapsed: true, items: autoItems('stage-2', STAGE_KNOWN_ITEMS['stage-2'], { exclude: CAUTION_LINKS }) },
          {
            text: '⚠️ AI 使用注意事项',
            link: '/stage-2/safety-guidelines',
            collapsed: true,
            items: CAUTION_LINKS.filter(l => existsSync(linkToFile(l)))
              .map(l => ({ text: getTitle(linkToFile(l)), link: l })),
          },
        ],
      },
      {
        text: 'AI 进阶实践',
        link: '/stage-4/',
        collapsed: true,
        // 扁平文章池：思路方法(stage-3) → 岗位实战(stage-4) → Agent 教程(stage-5) → 创意创业(stage-6)
        items: PRACTICE_DIRS.flatMap(d => autoItems(d, STAGE_KNOWN_ITEMS[d] || [])),
      },
      {
        text: 'AI 学习小工具',
        collapsed: true,
        items: [
          { text: '📝 AI 能力自测', link: '/exams/', collapsed: true, items: autoItems('exams', []) },
          { text: '📓 AI 学习词汇本', link: '/vocab-book' },
        ],
      },
      { text: '更新日志', link: '/changelog' },
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
      message: '仅用作个人 AI 学习，请勿商用',
      copyright: '© 2026 AI 学习知识库',
    },
  },
})
