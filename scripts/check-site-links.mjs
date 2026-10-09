import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { resolve, join, relative } from 'node:path'

const root = resolve('docs/.vitepress/dist')
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])
const pages = walk(root).filter(file => file.endsWith('.html'))
const cache = new Map()
const errors = new Set()
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
function targetFile(pathname) {
  const local = join(root, decodeURIComponent(pathname))
  for (const path of [local, `${local}.html`, join(local, 'index.html')]) {
    if (existsSync(path) && statSync(path).isFile()) return path
  }
}
for (const page of pages) {
  const pagePath = '/' + relative(root, page).replace(/\\/g, '/')
  const html = readFileSync(page, 'utf8')
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const reference = decode(match[1])
    let url
    try { url = new URL(reference, `https://ailinkstart.com${pagePath}`) } catch { errors.add(`${pagePath}: 无效链接 ${reference}`); continue }
    if (url.origin !== 'https://ailinkstart.com') continue
    let target
    try { target = targetFile(url.pathname) } catch { errors.add(`${pagePath}: 无效路径 ${reference}`); continue }
    if (!target) { errors.add(`${pagePath}: 缺少文件 ${reference}`); continue }
    if (!url.hash || url.hash === '#' || !target.endsWith('.html')) continue
    if (!cache.has(target)) cache.set(target, new Set([...readFileSync(target, 'utf8').matchAll(/\bid="([^"]+)"/g)].map(m => decode(m[1]))))
    let anchor
    try { anchor = decodeURIComponent(url.hash.slice(1)) } catch { anchor = url.hash.slice(1) }
    if (!cache.get(target).has(anchor)) errors.add(`${pagePath}: 缺少锚点 ${reference}`)
  }
}
if (errors.size) {
  console.error([...errors].slice(0, 40).join('\n'))
  throw new Error(`发现 ${errors.size} 个站内文件或锚点问题`)
}
console.log(`通过：${pages.length} 个页面的站内链接、图片、脚本和锚点。`)
