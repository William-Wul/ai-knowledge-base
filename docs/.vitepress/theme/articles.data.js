// 文章卡片数据（模块首页的文章列表用）：标题、一句话说明、日期、阅读时长。
// 只输出这几个字段，不把正文打进前端包。
import { createContentLoader } from 'vitepress'

export default createContentLoader(
  ['stage-*/*.md', 'frontier/*.md', 'news/*.md'],
  {
    includeSrc: true,
    transform(pages) {
      const out = {}
      for (const p of pages) {
        if (p.url.endsWith('/')) continue
        const fm = p.frontmatter || {}
        // 去掉 frontmatter、HTML 标签和 Markdown 符号后估算字数，按每分钟 400 字算
        const text = (p.src || '')
          .replace(/^---[\s\S]*?---/, '')
          .replace(/<[^>]+>/g, '')
          .replace(/[#>*`|\-\[\]()!]/g, '')
        const chars = (text.match(/[一-鿿]/g) || []).length + (text.match(/[A-Za-z0-9]+/g) || []).length
        const date = fm.date instanceof Date ? fm.date.toISOString().slice(0, 10) : String(fm.date || '').slice(0, 10)
        out[p.url] = {
          title: fm.title || '',
          description: fm.description || '',
          date,
          minutes: Math.max(1, Math.round(chars / 400)),
        }
      }
      return out
    },
  }
)
