import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { createMarkdownRenderer, disposeMdItInstance } from 'vitepress'
import { extractDailyItems } from '../docs/.vitepress/data/hotHeadings.js'

const renderer = await createMarkdownRenderer(resolve('docs'), { highlight: source => source })
test.after(() => disposeMdItInstance())

test('日报标题保留 VitePress 的中文标点锚点，修复 ts-rust 首页跳转', () => {
  const source = readFileSync('docs/hot/2026-10-09.md', 'utf8')
  const item = extractDailyItems(source, renderer).find(item => item.title.startsWith('ts-rust 发布'))
  assert.equal(item.anchor, '_3-ts-rust-发布-由-llm-将-typescript-编译器、检查器和-lsp-移植到-rust')
  assert.equal(item.category, '🚀 产品发布/更新')
  assert.equal(item.title, 'ts-rust 发布：由 LLM 将 TypeScript 编译器、检查器和 LSP 移植到 Rust')
})

test('重复标题、行内格式、显式 id 和代码块与实际 Markdown 解析一致', () => {
  const source = '## 技巧\n\n### 1. **Café** 与 `AI`：实际练习\n\n### 1. **Café** 与 `AI`：实际练习\n\n### 2. 自定义标题 {#chosen-target}\n\n```md\n### 3. 代码中的示例标题\n```\n'
  const items = extractDailyItems(source, renderer)
  assert.deepEqual(items.map(item => item.anchor), ['_1-cafe-与-ai-实际练习', '_1-cafe-与-ai-实际练习-1', 'chosen-target'])
  assert.equal(items[0].title, 'Café 与 AI：实际练习')
  assert.equal(items.length, 3)
})

test('首页数据加载器保留实际锚点与分类，只展示最新一期的前六条', async () => {
  const previous = globalThis.VITEPRESS_CONFIG
  globalThis.VITEPRESS_CONFIG = {
    srcDir: resolve('docs'), markdown: {}, site: { base: '/' }, cleanUrls: true, logger: console,
  }
  try {
    const { default: loader } = await import('../docs/.vitepress/data/hotLatest.data.js')
    const data = await loader.load([resolve('docs/hot/2026-10-08.md'), resolve('docs/hot/2026-10-09.md')])
    assert.equal(data.date, '2026-10-09')
    assert.equal(data.url, '/hot/2026-10-09')
    assert.equal(data.items.length, 6)
    assert.equal(data.items[2].anchor, '_3-ts-rust-发布-由-llm-将-typescript-编译器、检查器和-lsp-移植到-rust')
    assert.deepEqual(await loader.load([]), { date: '', url: '/hot/', items: [] })
  } finally {
    globalThis.VITEPRESS_CONFIG = previous
  }
})

test('全部历史日报的首页条目锚点均存在于 VitePress 渲染结果', () => {
  const files = readdirSync('docs/hot').filter(file => /^20\d{2}-\d{2}-\d{2}\.md$/.test(file))
  assert(files.length > 0)
  let total = 0
  for (const file of files) {
    const source = readFileSync(`docs/hot/${file}`, 'utf8')
    const anchors = new Set([...renderer.render(source, {}).matchAll(/<h3\b[^>]*\bid="([^"]+)"/g)].map(match => match[1]))
    for (const item of extractDailyItems(source, renderer)) {
      assert(anchors.has(item.anchor), `${file}：${item.title} 缺少锚点 ${item.anchor}`)
      total++
    }
  }
  assert(total > 0)
})
