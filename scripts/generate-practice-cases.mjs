import { writeFileSync, mkdirSync, readdirSync, readFileSync, unlinkSync, existsSync, rmdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { loadCases, root } from './practice-cases-data.mjs'
import { CASE_CATEGORIES } from '../docs/.vitepress/casesData.js'

const cases = loadCases()
const selectedSlugs = new Set(cases.map(c => c.slug))
const categoryIds = new Set(CASE_CATEGORIES.map(c => c.id))
// Retire only category indexes produced by this generator, leaving other files intact.
for (const entry of readdirSync(resolve(root, 'docs/cases'), { withFileTypes: true })) {
  if (!entry.isDirectory() || categoryIds.has(entry.name)) continue
  const directory = resolve(root, 'docs/cases', entry.name)
  const index = resolve(directory, 'index.md')
  if (!existsSync(index)) continue
  const text = readFileSync(index, 'utf8')
  if (!text.includes('pageClass: cases-list-page') || !text.includes('<!-- 自动生成：修改 practice-cases.json / casesData.js')) continue
  unlinkSync(index)
  if (!readdirSync(directory).length) rmdirSync(directory)
}
// Remove only obsolete detail pages previously produced by this generator.
for (const file of readdirSync(resolve(root, 'docs/cases'))) {
  if (!file.endsWith('.md') || file === 'index.md' || selectedSlugs.has(file.slice(0, -3))) continue
  const path = resolve(root, 'docs/cases', file)
  const text = readFileSync(path, 'utf8')
  if (text.includes('caseDetail: true') && text.includes('<!-- 自动生成：修改 practice-cases.json')) unlinkSync(path)
}
const generated = resolve(root, 'docs/.vitepress/data/cases-generated')
mkdirSync(generated, { recursive: true })
const fields = ['slug', 'category', 'title', 'summary', 'use', 'models', 'creator', 'thumbnail', 'cover', 'mediaType', 'contentKind']
writeFileSync(resolve(generated, 'index.json'), JSON.stringify(cases.map(c => Object.fromEntries(fields.filter(k => c[k] !== undefined).map(k => [k, c[k]])))))
const safeText = value => String(value || '').replace(/[&<>{}]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '{': '&#123;', '}': '&#125;' }[c])).replace(/([\\`*_[\]#!|])/g, '\\$1')
const safeUrl = value => {
  if (!/^https:\/\//.test(value)) throw new Error('来源必须为 HTTPS')
  return value.replace(/[()"<>]/g, c => encodeURIComponent(c))
}
const ids = new Set()
const categoryName = id => CASE_CATEGORIES.find(c => c.id === id)?.name
function write(path, content) {
  const target = resolve(root, 'docs/cases', path)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, content)
}
function listPage(category) {
  const title = category?.name || 'AI 实践案例集'
  const description = category?.description || '看作品、学方法，把完整提示词复制带走。'
  const relative = category ? '../../' : '../'
  return `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
pageClass: cases-list-page${category ? ` case-category-${category.id}` : ''}
outline: false
prev: false
next: false
---
<!-- 自动生成：修改 practice-cases.json / casesData.js 后运行 npm run cases:generate。 -->
<script setup>
import CaseLibrary from '${relative}.vitepress/theme/components/CaseLibrary.vue'
</script>

# ${title}

${description}

<CaseLibrary${category ? ` category="${category.id}"` : ''} />
`
}
write('index.md', listPage())
for (const category of CASE_CATEGORIES) write(`${category.id}/index.md`, listPage(category))
for (const c of cases) {
  if (!/^[a-z0-9-]+$/.test(c.slug) || ids.has(c.slug) || !categoryName(c.category)) throw new Error(`案例标识或分类无效：${c.slug}`)
  ids.add(c.slug)
  writeFileSync(resolve(generated, `${c.slug}.json`), JSON.stringify(c))
  write(`${c.slug}.md`, `---
title: ${JSON.stringify(c.title)}
description: ${JSON.stringify(c.summary)}
pageClass: case-detail-page case-category-${c.category}
caseCategory: ${c.category}
caseDetail: true
prev: false
next: false
---
<!-- 自动生成：修改 practice-cases.json 后运行 npm run cases:generate。 -->
<script setup>
import CaseMedia from '../.vitepress/theme/components/CaseMedia.vue'
import CasePrompt from '../.vitepress/theme/components/CasePrompt.vue'
import CaseReturn from '../.vitepress/theme/components/CaseReturn.vue'
import item from '../.vitepress/data/cases-generated/${c.slug}.json'
</script>

# ${safeText(c.title)}

${safeText(c.summary)}

${safeText(c.use)}

## 效果展示

<CaseMedia :item="item" />

## 开始前准备

${safeText(c.preparation)}

${c.models.length ? `参考工具：${safeText(c.models.join('、'))}。` : `参考工具：${c.category === 'web' ? 'AI 编程工具' : '支持参考图的生图工具'}。`}

## 怎么做

${c.steps.map((s, i) => `${i + 1}. ${safeText(s)}`).join('\n')}

**值得学习的写法：** ${safeText(c.lesson)}

## ${c.contentKind === 'code' ? '使用指令与源码' : '完整提示词'}

<CasePrompt :item="item" />

## 改成自己的内容

${safeText(c.exercise)}

## 作者与来源

- 作者：${safeText(c.creator)}
- 案例收录：[Goodcase](${safeUrl(c.url)}) · [原始出处](${safeUrl(c.sourceUrl || c.url)})
- 整理日期：${c.capturedAt}
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn category="${c.category}" />
`)
}
console.log(`已生成案例入口、${CASE_CATEGORIES.length} 个分类页与 ${cases.length} 篇详情。`)
