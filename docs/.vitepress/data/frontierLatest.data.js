import { createContentLoader } from 'vitepress'

/**
 * 首页「AI 最新动态」头条数据源：
 * 构建时扫描 frontier/ 目录，按 frontmatter `date` 取最新一篇深度专题。
 * 发布前沿新文章后自动更新，无需手动维护（与 hotLatest.data.js 同一思路）。
 */
export default createContentLoader('frontier/*.md', {
  render: false,
  excerpt: false,
  transform(raw) {
    // frontmatter 的 date 会被 YAML 解析成 Date 对象，必须按时间戳排序，不能按字符串比
    const ts = (d) => new Date(d).getTime() || 0
    const latest = raw
      .filter((f) => f.url !== '/frontier/' && f.frontmatter?.date && f.frontmatter?.title)
      .sort((a, b) => ts(b.frontmatter.date) - ts(a.frontmatter.date))[0]

    if (!latest) return null
    const d = latest.frontmatter.date
    return {
      title: String(latest.frontmatter.title),
      date: d instanceof Date ? d.toISOString().slice(0, 10) : String(d).slice(0, 10),
      url: latest.url,
    }
  },
})
