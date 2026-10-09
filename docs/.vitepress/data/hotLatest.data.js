import { createContentLoader, createMarkdownRenderer } from 'vitepress'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { extractDailyItems } from './hotHeadings.js'

/**
 * 首页「AI 最新动态」数据源：
 * 构建时定位 hot/ 目录下最新一期 AI 日报，解析出若干条动态（分类、标题、条目锚点）。
 * 日报由 daily-hot-digest 工作流自动同步，每次构建自动取最新一期，无需手动维护。
 *
 * 注：createContentLoader 在 render:false 时不提供 src，这里只用 loader 拿文件清单，
 * 正文直接按 URL 从 docs/hot/ 读取最新一期（每次构建只读 1 个文件）。
 */

export default createContentLoader('hot/20*.md', {
  render: false,
  excerpt: false,
  async transform(raw) {
    const files = raw
      .map((f) => {
        const m = f.url.match(/hot\/(\d{4}-\d{2}-\d{2})$/)
        return m ? { date: m[1], url: f.url } : null
      })
      .filter(Boolean)
      .sort((a, b) => b.date.localeCompare(a.date))

    const latest = files[0]
    if (!latest) return { date: '', url: '/hot/', items: [] }

    // 本文件位于 docs/.vitepress/data/，日报正文在 docs/hot/
    const fileUrl = new URL(`../../hot/${latest.date}.md`, import.meta.url)
    let src = ''
    try {
      src = fs.readFileSync(fileUrl, 'utf8')
    } catch {
      return { date: latest.date, url: latest.url, items: [] }
    }
    // 复用 createContentLoader 已初始化的站点渲染器，只解析最新一期正文。
    // 读取实际 heading id，中文标点、重复标题和显式 id 均与正文一致。
    const config = globalThis.VITEPRESS_CONFIG
    const renderer = await createMarkdownRenderer(
      fileURLToPath(new URL('../../', import.meta.url)),
      config?.markdown || {},
      config?.site?.base || '/',
    )
    const items = extractDailyItems(src, renderer)

    return {
      date: latest.date,
      url: latest.url,
      items: items.slice(0, 6),
    }
  },
})
