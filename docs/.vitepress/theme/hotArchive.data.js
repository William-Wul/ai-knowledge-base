// 往期日报归档：只取日期和当天头条，按月分组（新→旧）
import { createContentLoader } from 'vitepress'

export default createContentLoader('hot/*.md', {
  includeSrc: true,
  transform(pages) {
    const days = pages
      .map(p => {
        const m = /\/hot\/(\d{4}-\d{2}-\d{2})$/.exec(p.url)
        if (!m) return null
        // 头条 = 正文第一个二级标题
        const lead = /^##\s+(.+)$/m.exec(p.src || '')
        return { date: m[1], link: p.url, lead: lead ? lead[1].trim() : '' }
      })
      .filter(Boolean)
      .sort((a, b) => b.date.localeCompare(a.date))
    const months = []
    for (const d of days) {
      const label = `${d.date.slice(0, 4)} 年 ${Number(d.date.slice(5, 7))} 月`
      let g = months.find(x => x.label === label)
      if (!g) months.push(g = { label, days: [] })
      g.days.push(d)
    }
    return months
  },
})
