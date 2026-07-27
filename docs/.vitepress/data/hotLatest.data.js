import { createContentLoader } from 'vitepress'
import fs from 'node:fs'

/**
 * 首页「AI 最新动态」数据源：
 * 构建时定位 hot/ 目录下最新一期 AI 日报，解析出若干条动态（分类、标题、条目锚点）。
 * 日报由 daily-hot-digest 工作流自动同步，每次构建自动取最新一期，无需手动维护。
 *
 * 注：createContentLoader 在 render:false 时不提供 src，这里只用 loader 拿文件清单，
 * 正文直接按 URL 从 docs/hot/ 读取最新一期（每次构建只读 1 个文件）。
 */

// 与 VitePress 标题锚点一致的 slug 规则（已按构建产物逐条核对）：
// 小写 → 非字母/非数字的连续字符折叠为一个 - → 去掉首尾 - → 数字开头补 _
function anchorSlug(text) {
  let s = text.trim().toLowerCase()
  s = s.replace(/[^\p{L}\p{N}]+/gu, '-')
  s = s.replace(/^-+|-+$/g, '')
  if (/^\d/.test(s)) s = '_' + s
  return s
}

export default createContentLoader('hot/20*.md', {
  render: false,
  excerpt: false,
  transform(raw) {
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
    src = src.replace(/^---[\s\S]*?---\s*\n/, '')

    const items = []
    let category = ''
    let current = null

    for (const rawLine of src.split('\n')) {
      const line = rawLine.trim()
      const h2 = line.match(/^##\s+(.+)/)
      const h3 = line.match(/^###\s+(.+)$/)

      if (h2) {
        category = h2[1].trim()
        continue
      }
      if (h3) {
        if (current && current.title) items.push(current)
        const raw = h3[1].trim()
        current = {
          category,
          // 展示标题去掉序号（「1. 」），锚点用完整标题计算
          title: raw.replace(/^\d+\s*[.、]?\s*/, ''),
          anchor: anchorSlug(raw),
        }
        continue
      }
    }
    if (current && current.title) items.push(current)

    return {
      date: latest.date,
      url: latest.url,
      items: items.slice(0, 6),
    }
  },
})
