import { writeFileSync, mkdirSync, readdirSync, readFileSync, unlinkSync, existsSync, rmdirSync, realpathSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { root } from './practice-cases-data.mjs'
import { loadTaggedCases } from './case-tags-data.mjs'
import { CASE_CATEGORIES, CASE_COLLECTIONS } from '../docs/.vitepress/casesData.js'
import { caseSourceName, hasValidCaseSource } from '../docs/.vitepress/caseSources.js'

const LIST_FIELDS = [
  'slug', 'category', 'title', 'summary', 'use', 'models', 'creator',
  'thumbnail', 'cover', 'mediaType', 'contentKind', 'mediaUrl', 'imageUrl',
  'mediaNote', 'tags', 'sourcePromptStatus', 'sourceName', 'sourceUrl',
]
const NAV_FIELDS = ['slug', 'category', 'title', 'tags']

const safeText = value => String(value || '')
  .replace(/[&<>{}]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '{': '&#123;', '}': '&#125;' }[c]))
  .replace(/([\\`*_[\]#!|])/g, '\\$1')

const safeUrl = value => {
  if (!/^https:\/\//.test(value)) throw new Error('来源必须为 HTTPS')
  return value.replace(/[()"<>]/g, c => encodeURIComponent(c))
}

const categoryName = id => CASE_CATEGORIES.find(c => c.id === id)?.name

export function renderCaseDetailMarkdown(c) {
  return `---
title: ${JSON.stringify(c.title)}
description: ${JSON.stringify(c.summary)}
pageClass: case-detail-page case-category-${c.category}
caseCategory: ${c.category}
caseSlug: ${c.slug}
caseDetail: true
prev: false
next: false
---
<script setup>
import CaseMedia from '../.vitepress/theme/components/CaseMedia.vue'
import CasePrompt from '../.vitepress/theme/components/CasePrompt.vue'
import CaseReturn from '../.vitepress/theme/components/CaseReturn.vue'
import CaseNavigation from '../.vitepress/theme/components/CaseNavigation.vue'
import CaseTags from '../.vitepress/theme/components/CaseTags.vue'
import item from '../.vitepress/data/cases-generated/${c.slug}.json'
</script>

<CaseNavigation :item="item" />

# ${safeText(c.title)}

<CaseTags :item="item" />

${safeText(c.summary)}

${safeText(c.use)}

## 效果展示

<CaseMedia :item="item" />

${c.tested !== true ? '**验证状态：本站未实测生成效果。** 这里展示的是来源作品；生成工具的可选设置和实际输出需另行核对。\n' : ''}

## 开始前准备

${safeText(c.preparation)}

${c.models.length ? `参考工具：${safeText(c.models.join('、'))}。` : `参考工具：${c.category === 'web' ? 'AI 编程工具' : '支持参考图的生图工具'}。`}

## 怎么做

以下步骤与练习由本站整理，供学习时参考；作者原文保留在下方。

${c.steps.map((s, i) => `${i + 1}. ${safeText(s)}`).join('\n')}

**值得学习的写法：** ${safeText(c.lesson)}

## ${c.sourcePromptStatus === 'excerpt' ? '公开提示词节选' : c.contentKind === 'code' ? '使用指令与源码' : '完整提示词'}

<CasePrompt :item="item" />

## 改成自己的内容

**本站练习建议：**

${safeText(c.exercise)}

## 作者与来源

- 作者：${safeText(c.creator)}
- 案例收录：[${safeText(caseSourceName(c))}](${safeUrl(c.url)}) · [原始出处](${safeUrl(c.sourceUrl || c.url)})
- 整理日期：${c.capturedAt}
- 中文说明和操作建议由本站整理；作者原文保留，供对照与复制。

<CaseReturn :item="item" />
`
}

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
<!-- 自动生成：修改 practice-cases.json / case-editorial-overrides.json / case-tags.json / casesData.js 后运行 npm run cases:generate。 -->
<script setup>
import CaseLibrary from '${relative}.vitepress/theme/components/CaseLibrary.vue'
</script>

# ${title}

${description}

${category?.slugs ? '这些案例按来源说明整理。多数由 Opus 编写动画代码，再把画面逐帧合成为视频；部分还调用图片或配音工具。每条详情说明所需素材、制作分工与公开资料缺口，本站尚未复现生成效果。\n' : ''}
<CaseLibrary${category ? ` category="${category.id}"` : ''} />
`
}

export function generatePracticeCases() {
  const cases = loadTaggedCases()
  const selectedSlugs = new Set(cases.map(c => c.slug))
  const categoryIds = new Set([...CASE_CATEGORIES, ...CASE_COLLECTIONS].map(c => c.id))
  const ids = new Set()

  for (const c of cases) {
    if (!hasValidCaseSource(c)) throw new Error(`案例来源名与地址不匹配：${c.slug}`)
    if (!/^[a-z0-9-]+$/.test(c.slug) || ids.has(c.slug) || !categoryName(c.category)) throw new Error(`案例标识或分类无效：${c.slug}`)
    safeUrl(c.url)
    safeUrl(c.sourceUrl || c.url)
    ids.add(c.slug)
  }

  for (const entry of readdirSync(resolve(root, 'docs/cases'), { withFileTypes: true })) {
    if (!entry.isDirectory() || categoryIds.has(entry.name)) continue
    const directory = resolve(root, 'docs/cases', entry.name)
    const index = resolve(directory, 'index.md')
    if (!existsSync(index)) continue
    const text = readFileSync(index, 'utf8')
    if (!text.includes('pageClass: cases-list-page') || !text.includes('<!-- 自动生成：修改 practice-cases.json')) continue
    unlinkSync(index)
    if (!readdirSync(directory).length) rmdirSync(directory)
  }

  // Remove legacy generated static detail markdown files; detail routes are now served dynamically by [slug].md.
  for (const file of readdirSync(resolve(root, 'docs/cases'))) {
    if (!file.endsWith('.md') || file === 'index.md' || file === '[slug].md') continue
    const path = resolve(root, 'docs/cases', file)
    const text = readFileSync(path, 'utf8')
    if (text.includes('caseDetail: true') && text.includes('<!-- 自动生成：修改 practice-cases.json')) unlinkSync(path)
  }

  const generated = resolve(root, 'docs/.vitepress/data/cases-generated')
  mkdirSync(generated, { recursive: true })
  const pickFields = (item, keys) => Object.fromEntries(keys.filter(k => item[k] !== undefined).map(k => [k, item[k]]))
  writeFileSync(resolve(generated, 'index.json'), JSON.stringify(cases.map(c => pickFields(c, LIST_FIELDS))))
  writeFileSync(resolve(generated, 'nav.json'), JSON.stringify(cases.map(c => pickFields(c, NAV_FIELDS))))
  for (const c of cases) {
    writeFileSync(resolve(generated, `${c.slug}.json`), JSON.stringify(c))
  }

  // Remove obsolete orphan JSON files no longer in selectedSlugs.
  for (const file of readdirSync(generated)) {
    if (!file.endsWith('.json') || file === 'index.json' || file === 'nav.json') continue
    if (!selectedSlugs.has(file.slice(0, -5))) unlinkSync(resolve(generated, file))
  }

  write('index.md', listPage())
  for (const category of CASE_CATEGORIES) write(`${category.id}/index.md`, listPage(category))
  for (const collection of CASE_COLLECTIONS) {
    if (new Set(collection.slugs).size !== collection.slugs.length || collection.slugs.some(slug => !selectedSlugs.has(slug))) {
      throw new Error(`专题清单重复或缺少案例：${collection.id}`)
    }
    write(`${collection.id}/index.md`, listPage(collection))
  }

  console.log(`已生成案例列表数据与 ${CASE_CATEGORIES.length} 个分类页（共 ${cases.length} 篇动态详情路由）。`)
}

if (process.argv[1] && fileURLToPath(import.meta.url) === realpathSync(resolve(process.argv[1]))) {
  generatePracticeCases()
}
