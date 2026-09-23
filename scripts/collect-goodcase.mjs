// Public read-only catalog snapshot. Raw responses stay in VitePress's ignored cache.
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const cache = resolve(root, 'docs/.vitepress/cache/goodcase')
mkdirSync(cache, { recursive: true })
const fetchText = async url => {
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) }).catch(() => null)
    if (response?.ok) return response.text()
    if (response?.status === 404) throw new Error('404')
    await new Promise(r => setTimeout(r, 1000 * (attempt + 1)))
  }
  throw new Error('请求未完成')
}
const sitemap = await fetchText('https://goodcase.ai/sitemap.xml')
const urls = [...sitemap.matchAll(/<loc>(https:\/\/goodcase\.ai\/cases\/[^<]+)<\/loc>/g)].map(m => m[1])
const slugs = [...new Set(urls.map(url => url.split('/').pop()))]
writeFileSync(resolve(cache, 'catalog.json'), JSON.stringify({ capturedAt: new Date().toISOString(), urls }, null, 2))
let cursor = 0
let completed = 0
const failures = []
async function worker() {
  while (cursor < slugs.length) {
    const slug = slugs[cursor++]
    if (!/^[a-z0-9-]+$/.test(slug)) { failures.push({ slug, error: 'invalid-slug' }); continue }
    const file = resolve(cache, `${slug}.json`)
    try {
      if (!existsSync(file)) {
        const text = await fetchText(`https://goodcase.ai/api/public/cases/${slug}?locale=zh-CN`)
        const data = JSON.parse(text)
        if (data.slug !== slug) throw new Error('标识不匹配')
        writeFileSync(file, JSON.stringify(data))
      }
      completed++
    } catch (e) { failures.push({ slug, error: e.message }) }
    if ((completed + failures.length) % 100 === 0) console.log(`已核对 ${completed + failures.length}/${slugs.length}，失败 ${failures.length}`)
  }
}
await Promise.all(Array.from({ length: 4 }, worker))
const data = slugs.filter(slug => existsSync(resolve(cache, `${slug}.json`))).map(slug => JSON.parse(readFileSync(resolve(cache, `${slug}.json`), 'utf8')))
const groups = key => Object.fromEntries([...new Set(data.map(d => d[key] || 'empty'))].map(value => [value, data.filter(d => (d[key] || 'empty') === value).length]))
const report = {
  capturedAt: new Date().toISOString(), sitemapCount: slugs.length, fetchedCount: data.length,
  categories: groups('category'), mediaTypes: groups('mediaType'),
  hasFullPrompt: data.filter(d => d.promptFull?.trim()).length,
  hasChineseTranslation: data.filter(d => d.promptTranslationZh?.trim()).length,
  chineseOriginal: data.filter(d => d.contentLocale?.startsWith('zh')).length,
  titleWithoutChinese: data.filter(d => !/[\u3400-\u9fff]/.test(d.title || '')).map(d => d.slug),
  linkOnlyPrompt: data.filter(d => /^https?:\/\/\S+$/.test(d.promptFull?.trim() || '')).map(d => d.slug),
  failures,
}
writeFileSync(resolve(cache, 'audit.json'), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
