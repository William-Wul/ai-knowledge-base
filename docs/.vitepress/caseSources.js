// A source label is bound to its collection host; creator attribution stays separate.
export const CASE_SOURCES = {
  Goodcase: { host: 'goodcase.ai', path: '/cases/' },
  'JasonZhu.AI': { host: 'jasonzhu.ai', path: '/en/prompts/claude-opus-5-5/' },
  apimodels: { host: 'github.com', path: '/apimodels/claude-opus-5-5-video-prompts/' },
}
export function caseSourceName(item) { return item.sourceName || 'Goodcase' }
export function hasValidCaseSource(item) {
  const source = CASE_SOURCES[caseSourceName(item)]
  if (!source) return false
  try {
    const url = new URL(item.url)
    return url.protocol === 'https:' && !url.username && !url.password && url.hostname === source.host && url.pathname.startsWith(source.path)
  } catch { return false }
}
