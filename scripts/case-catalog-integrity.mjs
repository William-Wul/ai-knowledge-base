import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { applyEditorialOverrides, loadCases, root } from './practice-cases-data.mjs'

const dataDir = 'docs/.vitepress/data/'
const fingerprint = text => createHash('sha256').update(text).digest('hex')
const normalizedPrompt = text => text.replace(/\s+/gu, ' ').trim()

export function expectedCatalogSize(selection, argument) {
  assert(Array.isArray(selection) && selection.length > 0, '案例清单不能为空')
  const expected = argument === undefined ? selection.length : Number(argument)
  assert(Number.isSafeInteger(expected) && expected > 0, '预期案例数必须为正整数')
  return expected
}

export function validateCatalog({ cases, selection }, expected) {
  const count = expectedCatalogSize(selection, expected)
  assert.equal(selection.length, count, '清单数量与预期不符')
  assert.equal(cases.length, count, '正文数量与清单不符')
  assert.equal(new Set(selection.map(item => item.slug)).size, count, '清单含重复案例标识')
  assert.deepEqual(cases.map(item => item.slug), selection.map(item => item.slug), '正文与清单顺序不一致')
  for (let index = 0; index < selection.length; index++) {
    const entry = selection[index]
    const item = cases[index]
    assert.equal(entry.rank, index + 1, `清单编号不连续：${entry.slug}`)
    assert.equal(item.category, entry.category, `案例分类与清单不符：${entry.slug}`)
    assert.equal(typeof item.promptOriginal, 'string', `缺少原文：${entry.slug}`)
    assert(item.promptOriginal.trim(), `原文为空：${entry.slug}`)
    assert.equal(fingerprint(item.promptOriginal), entry.sourcePromptSha256, `原文偏离来源指纹：${entry.slug}`)
  }
  return count
}

export function loadWorkingCatalog() {
  return {
    cases: loadCases(),
    selection: JSON.parse(readFileSync(resolve(root, dataDir, 'practice-cases-selection.json'), 'utf8')).cases,
  }
}

// 使用已发布的完整 commit SHA，不依赖当前工作区或可移动的 HEAD。
export function readCatalogAtGitRef(commit, repository = root) {
  assert(/^[a-f\d]{40}$/i.test(commit), '基线必须指定完整 Git commit SHA')
  const read = filename => JSON.parse(execFileSync('git', ['show', `${commit}:${dataDir}${filename}`], {
    cwd: repository, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024,
  }))
  const curated = read('practice-cases.json')
  const imported = read('practice-cases-imported.json')
  const selection = read('practice-cases-selection.json').cases
  const curatedSlugs = new Set(curated.map(item => item.slug))
  const cases = applyEditorialOverrides(
    [...curated, ...imported.filter(item => !curatedSlugs.has(item.slug))],
    read('case-editorial-overrides.json'),
  )
  const bySlug = new Map(cases.map(item => [item.slug, item]))
  return { selection, cases: selection.map(entry => {
    assert(bySlug.has(entry.slug), `Git 基线缺少正文：${entry.slug}`)
    return bySlug.get(entry.slug)
  }) }
}

export function validateCatalogIncrement(baseline, current, { expectedAdded, expectedCategories } = {}) {
  validateCatalog(baseline)
  validateCatalog(current)
  assert(current.cases.length >= baseline.cases.length, '增量收录不得减少旧案例')
  assert.deepEqual(current.selection.slice(0, baseline.selection.length), baseline.selection, '旧案例清单或顺序发生变化')
  assert.deepEqual(current.cases.slice(0, baseline.cases.length), baseline.cases, '旧案例内容发生变化')
  const added = current.cases.slice(baseline.cases.length)
  if (expectedAdded !== undefined) {
    const count = Number(expectedAdded)
    assert(Number.isSafeInteger(count) && count >= 0, '预期新增数必须为非负整数')
    assert.equal(added.length, count, '新增案例数量与本批预期不符')
  }
  const seen = new Map()
  for (const item of current.cases) {
    const key = fingerprint(normalizedPrompt(item.promptOriginal))
    assert(!seen.has(key), `重复原文：${seen.get(key)} / ${item.slug}`)
    seen.set(key, item.slug)
  }
  const categories = { image: 0, video: 0, web: 0 }
  for (const item of added) {
    assert(Object.hasOwn(categories, item.category), `新增分类无效：${item.slug}`)
    categories[item.category]++
  }
  if (expectedCategories !== undefined) assert.deepEqual(categories, expectedCategories, '新增分类数量与本批预期不符')
  return { previous: baseline.cases.length, added: added.length, total: current.cases.length, categories }
}

// 本批验收示例：node scripts/case-catalog-integrity.mjs <baseline-sha> 150 '{"image":75,"video":45,"web":30}'
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const categories = process.argv[4] === undefined ? undefined : JSON.parse(process.argv[4])
  const result = validateCatalogIncrement(readCatalogAtGitRef(process.argv[2]), loadWorkingCatalog(), {
    expectedAdded: process.argv[3], expectedCategories: categories,
  })
  console.log(`通过：旧 ${result.previous} 条保持不变，新增 ${result.added} 条，总数 ${result.total} 条；新增分类 ${JSON.stringify(result.categories)}。`)
}
