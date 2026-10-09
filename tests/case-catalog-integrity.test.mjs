import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import {
  expectedCatalogSize, validateCatalog, validateCatalogIncrement,
  readCatalogAtGitRef, loadWorkingCatalog,
} from '../scripts/case-catalog-integrity.mjs'

// 本次扩容前已经发布的 400 条，用 Git 内容做基线，不能被工作区增量覆盖。
const BASELINE_COMMIT = '92a76b0b6f82bb1e76e50ddfa66a42731b66983b'
const baseline = readCatalogAtGitRef(BASELINE_COMMIT)
const sha = value => createHash('sha256').update(value).digest('hex')
const catalog = cases => ({ cases, selection: cases.map((item, index) => ({
  slug: item.slug, rank: index + 1, category: item.category, sourcePromptSha256: sha(item.promptOriginal),
})) })
const newCases = [
  ...Array.from({ length: 75 }, (_, index) => ({ slug: `new-image-${index}`, category: 'image', promptOriginal: `fixture image prompt ${index}` })),
  ...Array.from({ length: 45 }, (_, index) => ({ slug: `new-video-${index}`, category: 'video', promptOriginal: `fixture video prompt ${index}` })),
  ...Array.from({ length: 30 }, (_, index) => ({ slug: `new-web-${index}`, category: 'web', promptOriginal: `fixture web prompt ${index}` })),
]

test('catalog size follows the selection while explicit CLI expectations remain strict', () => {
  assert.equal(expectedCatalogSize(baseline.selection), 400)
  const expanded = catalog([...baseline.cases, ...newCases])
  assert.equal(expectedCatalogSize(expanded.selection), 550)
  assert.equal(validateCatalog(expanded, '550'), 550)
  assert.throws(() => validateCatalog(expanded, '400'), /清单数量/)
  for (const value of ['invalid', '0', '-1', '1.5', '']) assert.throws(() => expectedCatalogSize(expanded.selection, value), /正整数/)
})

test('published 400 cases remain unchanged and all actual additions are distinct', () => {
  assert.equal(baseline.cases.length, 400, 'this immutable baseline describes the previous release, not the current catalog size')
  const current = loadWorkingCatalog()
  const result = validateCatalogIncrement(baseline, current)
  assert.equal(result.total, current.selection.length)
  assert.equal(result.added, current.selection.length - baseline.selection.length)
})

test('150 additions preserve the baseline and enforce this batch category allocation', () => {
  const expanded = { cases: [...baseline.cases, ...newCases], selection: [
    ...baseline.selection,
    ...catalog(newCases).selection.map(entry => ({ ...entry, rank: entry.rank + baseline.selection.length })),
  ] }
  assert.deepEqual(validateCatalogIncrement(baseline, expanded, {
    expectedAdded: 150, expectedCategories: { image: 75, video: 45, web: 30 },
  }), { previous: 400, added: 150, total: 550, categories: { image: 75, video: 45, web: 30 } })
  assert.throws(() => validateCatalogIncrement(baseline, expanded, { expectedAdded: 149 }), /新增案例数量/)
  assert.throws(() => validateCatalogIncrement(baseline, expanded, { expectedCategories: { image: 74, video: 46, web: 30 } }), /新增分类数量/)
})

test('increment guard rejects edits, removals, reordered legacy cases and duplicate IDs or prompts', () => {
  const expanded = { cases: [...baseline.cases, ...newCases], selection: [
    ...baseline.selection,
    ...catalog(newCases).selection.map(entry => ({ ...entry, rank: entry.rank + baseline.selection.length })),
  ] }
  const copy = () => structuredClone(expanded)
  let changed = copy()
  changed.cases[0].summary = 'silently edited old case'
  assert.throws(() => validateCatalogIncrement(baseline, changed), /旧案例内容/)
  assert.throws(() => validateCatalogIncrement(baseline, { cases: [], selection: [] }), /清单不能为空/)
  assert.throws(() => validateCatalogIncrement(baseline, {
    cases: baseline.cases.slice(0, -1), selection: baseline.selection.slice(0, -1),
  }), /不得减少旧案例/)
  changed = copy()
  ;[changed.cases[0], changed.cases[1]] = [changed.cases[1], changed.cases[0]]
  assert.throws(() => validateCatalogIncrement(baseline, changed), /正文与清单顺序/)
  ;[changed.selection[0], changed.selection[1]] = [changed.selection[1], changed.selection[0]]
  changed.selection[0].rank = 1
  changed.selection[1].rank = 2
  assert.throws(() => validateCatalogIncrement(baseline, changed), /旧案例清单或顺序/)
  changed = copy()
  changed.cases.at(-1).slug = baseline.cases[0].slug
  changed.selection.at(-1).slug = baseline.cases[0].slug
  assert.throws(() => validateCatalogIncrement(baseline, changed), /重复案例标识/)
  for (const prompt of [baseline.cases[0].promptOriginal.replace(/\s+/gu, '   '), newCases[0].promptOriginal]) {
    changed = copy()
    changed.cases.at(-1).promptOriginal = prompt
    changed.selection.at(-1).sourcePromptSha256 = sha(prompt)
    assert.throws(() => validateCatalogIncrement(baseline, changed), /重复原文/)
  }
})
