// 使用站点 Markdown 渲染器生成的 id，避免自行复制锚点规则。
// 同时保留重复标题、显式 id 和行内格式的实际解析结果。
export function extractDailyItems(source, renderer) {
  const tokens = renderer.parse(source, {})
  const items = []
  let category = ''
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index]
    if (token.type !== 'heading_open' || !['h2', 'h3'].includes(token.tag)) continue
    const inline = tokens[index + 1]
    const title = (inline.children || [])
      .filter(child => ['text', 'code_inline', 'emoji'].includes(child.type))
      .map(child => child.content)
      .join('')
      .trim()
    if (token.tag === 'h2') {
      category = title
    } else if (title && token.attrGet('id')) {
      items.push({
        category,
        title: title.replace(/^\d+\s*[.、]?\s*/, ''),
        anchor: token.attrGet('id'),
      })
    }
  }
  return items
}
