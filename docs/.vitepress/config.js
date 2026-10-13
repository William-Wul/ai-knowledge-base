import { CASE_CATEGORIES, CASE_COLLECTIONS } from './casesData.js'
import { defineConfig } from 'vitepress'
import { existsSync, readdirSync, readFileSync } from 'fs'
import { resolve, join, basename, dirname } from 'path'
import { fileURLToPath } from 'url'
import { CAUTION_LINKS, TOOL_LINKS, PRACTICE_LINKS, FRONTIER_EXTRA_LINKS } from './stagesData.js'
import { SITE_NAV } from './navigationData.js'
import { ACCESS_CONFIG } from './accessConfig.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const docsRoot = resolve(__dirname, '..')

// 判断是否为 iCloud 同步冲突副本（如 "define-done 2.md"），侧边栏/列表一律跳过
function isConflictCopy(name) {
  return / \d+\.md$/.test(name)
}

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

// 把跨目录链接清单（如 TOOL_LINKS）转成侧边栏条目，标题从文件读取，文件缺失自动跳过
function linkItems(links) {
  return links
    .filter(l => existsSync(linkToFile(l)))
    .map(l => ({ text: getTitle(linkToFile(l)), link: l }))
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
    // 跳过 iCloud 同步冲突副本（如 "define-done 2.md"），避免混入侧边栏
    .filter(f => !isConflictCopy(f))

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
// extraLinks：目录外单篇长文（如 stage-6 的一人公司）按 date 一起混排
// 显示时去掉标题开头的日期前缀（如「2026/07/17 · 」），排序不受影响
function mergedItems(dirs, { limit = 0, extraLinks = [] } = {}) {
  const all = []
  for (const dir of dirs) {
    const dirPath = join(docsRoot, dir)
    if (!existsSync(dirPath)) continue
    for (const f of readdirSync(dirPath)) {
      if (!f.endsWith('.md') || f === 'index.md') continue
      if (isConflictCopy(f)) continue
      const fp = join(dirPath, f)
      const text = getTitle(fp).replace(/^\d{4}[/.-]\d{1,2}[/.-]\d{1,2}\s*[·\-–—|]?\s*/, '')
      all.push({ text, link: `/${dir}/${basename(f, '.md')}`, date: getDate(fp) })
    }
  }
  for (const l of extraLinks) {
    const fp = linkToFile(l)
    if (!existsSync(fp)) continue
    all.push({ text: getTitle(fp), link: l, date: getDate(fp) })
  }
  all.sort((a, b) => (b.date || '').localeCompare(a.date || '') || a.text.localeCompare(b.text))
  const list = limit > 0 ? all.slice(0, limit) : all
  return list.map(({ text, link, date }) => ({ text, link, date }))
}

// 按月分组（「2026 年 10 月」），最新一个月默认展开，其余折叠；缺 date 的归入「更早」
function groupByMonth(items) {
  const groups = []
  for (const { text, link, date } of items) {
    const m = /^(\d{4})-(\d{2})/.exec(date || '')
    const label = m ? `${m[1]} 年 ${Number(m[2])} 月` : '更早'
    let g = groups.find(x => x.text === label)
    if (!g) groups.push(g = { text: label, collapsed: groups.length > 0, items: [] })
    g.items.push({ text, link })
  }
  return groups
}

// 日报全部期数（新→旧），供单日页的上一期/下一期使用
const HOT_DATES = existsSync(join(docsRoot, 'hot'))
  ? readdirSync(join(docsRoot, 'hot')).filter(f => /^\d{4}-\d{2}-\d{2}\.md$/.test(f)).map(f => basename(f, '.md')).sort().reverse()
  : []

// 各模块需要固定排序的已知文章（新文件会由 autoItems 自动追加到末尾）
// 注：2026-07-28 内容重组后，工具上手 / 注意事项 / 进阶实践的文章顺序由
// stagesData.js 的 TOOL_LINKS / CAUTION_LINKS / PRACTICE_LINKS 清单决定，不再走本表
const STAGE_KNOWN_ITEMS = {
  'stage-1': [
    { text: '一文看懂AI是什么', link: '/stage-1/what-is-ai' },
    { text: 'AI 常见术语一点通', link: '/stage-1/ai-terminology' },
  ],
}

const siteSidebar = [
      { text: '前言', link: '/preface' },
      {
        text: 'AI 最新动态',
        collapsed: true,
        items: [
          { text: '🔥 AI 日报', link: '/hot/', collapsed: true, items: [...autoItems('hot', [], { reverse: true, limit: 7, exclude: ['/hot/archive'] }), { text: '全部往期 →', link: '/hot/archive' }] },
          // AI 前沿 = frontier/ 深度专题 + 原 news/ AI 新闻 + 目录外趋势长文，按日期倒序混排
          { text: '🔭 AI 前沿', link: '/frontier/', collapsed: true, items: groupByMonth(mergedItems(['frontier', 'news'], { extraLinks: FRONTIER_EXTRA_LINKS })) },
          // AI 模型排行榜：AIHOT 榜单每日同步（scripts/sync-leaderboard.mjs 生成数据）
          // 外站原榜/评分规则链接放在榜单页正文，避免进入「上一篇/下一篇」
          { text: '🏆 AI 模型排行榜', link: '/model-ranking/' },
        ],
      },
      {
        text: 'AI 基础学习',
        collapsed: true,
        items: [
          { text: '🧠 AI 快速认知', link: '/stage-1/', collapsed: true, items: autoItems('stage-1', STAGE_KNOWN_ITEMS['stage-1']) },
          // 工具快速上手：TOOL_LINKS 清单（跨目录）+ stage-2/stage-5 新增文件自动追加
          {
            text: '🛠️ AI 工具快速上手',
            link: '/stage-2/',
            collapsed: true,
            items: [
              ...linkItems(TOOL_LINKS),
              ...autoItems('stage-2', [], { exclude: [...TOOL_LINKS, ...CAUTION_LINKS, ...PRACTICE_LINKS] }),
              ...autoItems('stage-5', [], { exclude: TOOL_LINKS }),
            ],
          },
          {
            text: '⚠️ AI 使用注意事项',
            link: '/stage-2/safety-guidelines',
            collapsed: true,
            items: linkItems(CAUTION_LINKS),
          },
        ],
      },
      {
        text: 'AI 进阶实践',
        link: '/stage-4/',
        collapsed: true,
        // 扁平文章池：PRACTICE_LINKS 清单（不绑单一工具的技巧方法）+ stage-3/4 新增文件自动追加
        items: [
          ...linkItems(PRACTICE_LINKS),
          ...autoItems('stage-3', [], { exclude: PRACTICE_LINKS }),
          ...autoItems('stage-4', [], { exclude: [...PRACTICE_LINKS, ...TOOL_LINKS] }),
        ],
      },
      {
        text: 'AI 实践案例集',
        link: '/cases/',
        collapsed: true,
        items: [
          { text: '全部案例', link: '/cases/' },
          ...CASE_CATEGORIES.map(c => ({ text: c.name, link: `/cases/${c.id}/` })),
          ...CASE_COLLECTIONS.map(c => ({ text: c.name, link: `/cases/${c.id}/` })),
        ],
      },
      {
        text: 'AI 视频课',
        collapsed: true,
        items: [
          // B 站精选视频卡片墙：清单在 .vitepress/videosData.js（入库→推荐→发布流程见该文件头注释）
          { text: '📺 B 站 AI 学习视频精选', link: '/videos/' },
        ],
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
    ]

// ===== 上一篇 / 下一篇 =====
// VitePress 默认把整棵侧栏拍平后取相邻项，会跨板块乱跳（前言→AI 日报、排行榜→外站），
// 不在侧栏里的页面（旧日报、搬家页）还会把「下一篇」算成侧栏第一项。
// 这里按板块分段：只在同一段内取相邻文章，段首段尾不显示；「AI 最新动态」再细分到日报/前沿/排行榜。
function pagerSegments(sidebar) {
  const segs = new Map()
  const walk = (items, key) => {
    for (const it of items) {
      if (it.link && !/^https?:/.test(it.link)) {
        const list = segs.get(key) || []
        if (!list.some(x => x.link === it.link)) list.push({ text: it.text, link: it.link })
        segs.set(key, list)
      }
      if (it.items) walk(it.items, key)
    }
  }
  for (const top of sidebar) {
    if (top.text === 'AI 最新动态') for (const sub of top.items) walk([sub], sub.text)
    else walk([top], top.text)
  }
  return [...segs.values()]
}
const PAGER_SEGMENTS = pagerSegments(siteSidebar)

function pageLink(relativePath) {
  return '/' + relativePath.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
}

export default defineConfig({
  base: '/',

  title: 'AI 学习知识库',
  description: '从零开始，掌握 AI 工作力',

  lang: 'zh-CN',
  cleanUrls: true,
  // 2026-08：恢复深色模式开关。首次访问跟随系统偏好，
  // 用户手动切换后 VitePress 自动写入 localStorage 记住选择。
  appearance: true,

  // 侧栏分段计算上一篇/下一篇；旧日报按日期串成上一期/下一期；搬家页不显示
  transformPageData(pageData) {
    const fm = pageData.frontmatter
    if ('prev' in fm || 'next' in fm) return
    const link = pageLink(pageData.relativePath)
    const day = /^\/hot\/(\d{4}-\d{2}-\d{2})$/.exec(link)
    if (day) {
      const i = HOT_DATES.indexOf(day[1])
      // 上一篇 = 前一天，下一篇 = 后一天（HOT_DATES 是新→旧）
      fm.prev = i >= 0 && i < HOT_DATES.length - 1 ? { text: `${HOT_DATES[i + 1]} 日报`, link: `/hot/${HOT_DATES[i + 1]}` } : false
      fm.next = i > 0 ? { text: `${HOT_DATES[i - 1]} 日报`, link: `/hot/${HOT_DATES[i - 1]}` } : false
      return
    }
    for (const seg of PAGER_SEGMENTS) {
      const i = seg.findIndex(x => x.link === link)
      if (i === -1) continue
      fm.prev = i > 0 ? seg[i - 1] : false
      fm.next = i < seg.length - 1 ? seg[i + 1] : false
      return
    }
    fm.prev = false
    fm.next = false
  },

  // 文章图片默认懒加载，手机上不再一打开就下载整篇所有图
  markdown: {
    image: { lazyLoading: true },
  },

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
    // 字体非阻塞加载：先用系统字体出字，网络字体到了再替换，弱网下不白屏
    ['link', { rel: 'stylesheet', href: 'https://fonts.loli.net/css2?family=Noto+Serif+SC:wght@700;900&family=JetBrains+Mono:wght@400;500&display=swap', media: 'print', onload: "this.media='all'" }],
    // 已登录过的访客：在页面渲染前就标记，避免每次打开先闪一下密码框（样式见 custom.css）
    ['script', {}, `try { if (localStorage.getItem(${JSON.stringify(ACCESS_CONFIG.storageKey)}) === ${JSON.stringify(ACCESS_CONFIG.storageValue)}) document.documentElement.classList.add('kb-authed') } catch (e) {}`],
    ['script', {}, `if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }`],
    ['script', {}, `var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "https://hm.baidu.com/hm.js?a681b724c97970a6d082bec9d556c968"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })();`],
  ],

  themeConfig: {
    siteTitle: 'AI 学习知识库',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '返回顶部',

    // 与首页共用入口清单，避免新增栏目后有一处漏掉。
    nav: SITE_NAV,

    // 2026-07-28 改版：侧边栏按四大板块重组（目录与 URL 不变，仅逻辑归组）
    // 2026-07-28 内容重组：工具上手/注意事项/进阶实践按 stagesData.js 清单跨目录归组，
    // 清单之外、目录里新增的文件仍由 autoItems 自动追加到对应模块末尾
    // 注：板块标题不带图标，图标只留给二级模块——层级更清晰
    // 前言居首、更新日志收尾，与四大板块同为一级标题（样式见 custom.css 按 href 定向）
    // 板块与模块均默认折叠（collapsed: true），仅自动展开包含当前页的那一条链
    sidebar: {
      '/': siteSidebar,
      '/cases/': siteSidebar.map(group => group.text === 'AI 实践案例集' ? { ...group, collapsed: false } : group),
    },

    search: {
      provider: 'local',
      options: {
        // 案例详情（有自己的筛选浏览器）、往期日报和搬家页不进搜索索引：
        // 索引从 6MB 降下来，手机第一次搜索更快，结果也不再被案例提示词淹没
        _render(src, env, md) {
          // 先渲染才能拿到 env.frontmatter
          const html = md.render(src, env)
          const path = env.relativePath || ''
          const fm = env.frontmatter || {}
          if (fm.search === false || fm.caseDetail) return ''
          if (/^hot\/\d{4}-/.test(path)) return ''
          if (/^(stage-3|stage-5|stage-6|news)\/index\.md$/.test(path)) return ''
          return html
        },
        miniSearch: {
          options: {
            // 原默认按空格切词，中文句中关键词无法命中；构建和浏览器共用分词。
            tokenize: (text) => Array.from(new Intl.Segmenter('zh-CN', { granularity: 'word' }).segment(text))
              .filter(part => part.isWordLike).map(part => part.segment),
          },
          searchOptions: { combineWith: 'AND' },
        },
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
    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'medium', forceLocale: true },
    },
    darkModeSwitchLabel: '深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    langMenuLabel: '语言',
    notFound: {
      title: '这个页面找不到了',
      quote: '可能是链接打错了，或者文章已经搬到了新位置。可以回到首页，或用顶部的搜索找一找。',
      linkLabel: '回到首页',
      linkText: '回到首页',
      code: '404',
    },

    footer: {
      message: '仅用作个人 AI 学习，请勿商用',
      copyright: '© 2026 AI 学习知识库',
    },
  },
})
