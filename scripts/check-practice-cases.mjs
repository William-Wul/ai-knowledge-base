import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { CASE_CATEGORIES } from '../docs/.vitepress/casesData.js'
import { loadCases } from './practice-cases-data.mjs'
import { createHash } from 'node:crypto'
const cases = loadCases()
const selection = JSON.parse(readFileSync('docs/.vitepress/data/practice-cases-selection.json', 'utf8')).cases
assert.equal(cases.length, 150)
const index = JSON.parse(readFileSync('docs/.vitepress/data/cases-generated/index.json', 'utf8'))
assert.equal(index.length, 150)
assert(index.every(c => !('promptZh' in c) && !('promptOriginal' in c)), '列表不应包含完整提示词')
const ids = new Set()
const dist = 'docs/.vitepress/dist'
const checkPage = path => {
  const html = readFileSync(`${dist}/cases/${path}.html`, 'utf8')
  const css = [...html.matchAll(/<link rel="[^"]*stylesheet" href="(\/assets\/[^\"]+\.css)"/g)].map(m => m[1])
  assert(css.length, `页面缺少样式引用：${path}`)
  assert(css.some(file => readFileSync(`${dist}${file}`, 'utf8').includes('.case-grid')), `案例样式没有进入页面加载链：${path}`)
  for (const m of html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)) assert(existsSync(`${dist}${m[1]}`), `资源缺失：${m[1]}`)
  assert(html.includes('VPSidebarNav'), `侧边栏缺失：${path}`)
  return html
}
for (const c of cases) {
  assert(!ids.has(c.slug), `重复案例：${c.slug}`)
  ids.add(c.slug)
  assert(CASE_CATEGORIES.some(category => category.id === c.category))
  for (const field of ['title', 'summary', 'creator', 'preparation', 'promptOriginal', 'promptZh', 'translationNote']) assert(c[field]?.trim(), `${c.slug} 缺少 ${field}`)
  assert(c.url.startsWith('https://goodcase.ai/cases/'))
  assert(c.sourceUrl?.startsWith('https://'))
  assert(c.steps.length >= 3)
  for (const path of [c.cover, c.thumbnail].filter(Boolean)) assert(existsSync(`docs/public${path}`), `图片不存在：${path}`)
  const html = checkPage(c.slug)
  for (const heading of ['效果展示', '开始前准备', '怎么做', '改成自己的内容', '作者与来源']) assert(html.includes(`id="${heading}"`), `缺少可定位的正文标题：${heading}`)
  assert(html.includes('复制完整内容') && html.includes('下载完整案例笔记'))
  assert(html.includes('参考工具') && !html.includes('来源标注的工具') && !html.includes('尚未在生成工具中复现'))
  assert(/[\u4e00-\u9fff]/.test(c.promptZh) && /[\u4e00-\u9fff]/.test(c.title) && /[\u4e00-\u9fff]/.test(c.summary), `中文不全：${c.slug}`)
  const selected = selection.find(s => s.slug === c.slug)
  assert.equal(createHash('sha256').update(c.promptOriginal).digest('hex'), selected.sourcePromptSha256, `原文偏离来源：${c.slug}`)
  assert(!html.includes('**值得学习'))
  assert(html.includes('作者原文') || html.includes('完整源码'))
  const markdown = readFileSync(`docs/cases/${c.slug}.md`, 'utf8')
  assert(markdown.includes('值得学习的写法') && markdown.includes('## 开始前准备'), '学习内容未进入可搜索的 Markdown')
  if (c.promptParts) {
    assert(c.promptParts.every(p => c.promptOriginal.includes(p.original) && c.promptZh.includes(p.zh)), '分段提示词偏离完整原文')
  }
}
checkPage('index')
for (const category of CASE_CATEGORIES) checkPage(`${category.id}/index`)
console.log(`通过：${cases.length} 个案例、${CASE_CATEGORIES.length} 个分类、完整正文、资源和页面实际引用的案例样式。`)
