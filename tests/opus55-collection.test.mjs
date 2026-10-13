import test from 'node:test'
import assert from 'node:assert/strict'
import { CASE_COLLECTIONS } from '../docs/.vitepress/casesData.js'
import { loadTaggedCases } from '../scripts/case-tags-data.mjs'
import { buildListPath, normalizeListPath, filterCases, resolveCaseContext, buildCaseHref, getListContext } from '../docs/.vitepress/theme/components/caseBrowsing.js'
const collection = CASE_COLLECTIONS.find(c => c.id === 'opus-5-5')
const cases = loadTaggedCases()
test('Opus collection references real video cases once, including reused historical case', () => {
  assert.equal(collection.name, 'Opus 5.5案例集')
  assert.equal(collection.slugs.length, 50)
  assert.equal(new Set(collection.slugs).size, 50)
  const members = filterCases(cases, collection.id)
  assert.equal(members.length, 50)
  assert(members.every(c => c.category === 'video' && c.tested === false))
  assert(members.some(c => c.slug === 'claude-opus-5-5-max-higgsfield-85f82d3beb87'))
  const excerpt = members.find(c => c.sourcePromptStatus === 'excerpt')
  assert.equal(excerpt.slug, 'case-48175d8e8ac4')
  assert.match(excerpt.preparation, /节选/)
  assert(excerpt.promptOriginal.endsWith('</'))
})
test('collection intersects search and tags without leaking unrelated video cases', () => {
  const results = filterCases(cases, collection.id, '点餐', { purpose: 'product-ad', topic: 'food' })
  assert.equal(results.length, 1)
  assert.equal(results[0].slug, 'food-craving-product-launch-film')
  assert.equal(filterCases(cases, collection.id, '点餐', { topic: 'animals' }).length, 0)
})
test('collection return URLs preserve search, tags and continuous browsing scope', () => {
  const path = buildListPath(collection.id, '动画', { purpose: 'education' })
  assert.equal(normalizeListPath(path), path)
  const context = getListContext(path)
  const results = filterCases(cases, context.category, context.query, context)
  assert(results.length > 1)
  const resolved = resolveCaseContext(results[0], cases, path)
  assert.equal(resolved.hasOrigin, true)
  assert.equal(resolved.listPath, path)
  assert.equal(resolved.results.length, results.length)
  assert.equal(resolved.next.slug, results[1].slug)
  assert.equal(new URL(buildCaseHref(results[0].slug, path), 'https://local.invalid').searchParams.get('from'), path)
  assert.equal(normalizeListPath('/cases/unlisted-collection/'), null)
  assert.equal(normalizeListPath('//evil.invalid/cases/opus-5-5/'), null)
})
