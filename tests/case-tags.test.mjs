import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { CASE_TAG_GROUPS } from '../docs/.vitepress/caseTags.js'
import {
  buildListPath, normalizeListPath, getListContext, filterCases, resolveCaseContext,
  buildCaseHref, buildPreviewHref, readListState, saveListState,
} from '../docs/.vitepress/theme/components/caseBrowsing.js'

const read = file => JSON.parse(readFileSync(new URL(`../${file}`, import.meta.url), 'utf8'))
const slugs = items => items.map(item => item.slug)
const tagName = (group, id) => CASE_TAG_GROUPS.find(item => item.id === group)?.tags.find(tag => tag.id === id)?.name
const sample = (slug, category, tags) => ({
  slug, category, title: '作品甲', summary: '柔和灯光', use: '展示内容', models: ['工具甲'], creator: '小李',
  ...(tags ? { tags } : {}),
})
const cases = [
  sample('poster-person', 'image', { purpose: ['poster', 'portrait'], topic: ['fantasy', 'fashion'] }),
  sample('poster-food', 'image', { purpose: ['poster'], topic: ['food'] }),
  sample('product-food', 'image', { purpose: ['product-ad'], topic: ['food'] }),
  sample('story-person', 'video', { purpose: ['story'], topic: ['fantasy'] }),
  sample('daily-animal', 'video', { purpose: ['daily'], topic: ['animals'] }),
  sample('brand-person', 'web', { purpose: ['brand-page'], topic: ['fantasy'] }),
  sample('legacy-video', 'video'),
]

test('two tag dimensions intersect with category and every search keyword', () => {
  assert.deepEqual(slugs(filterCases(cases, 'all', '', { purpose: 'poster' })), ['poster-person', 'poster-food'])
  assert.deepEqual(slugs(filterCases(cases, 'all', '', { topic: 'fantasy' })), ['poster-person', 'story-person', 'brand-person'])
  assert.deepEqual(slugs(filterCases(cases, 'image', '柔和 小李', { purpose: 'poster', topic: 'fantasy' })), ['poster-person'])
  assert.deepEqual(slugs(filterCases(cases, 'image', '', { purpose: 'portrait', topic: 'fashion' })), ['poster-person'], 'all assigned tags are usable, including the second tag')
  assert.equal(filterCases(cases, 'video', '柔和', { purpose: 'poster', topic: 'fantasy' }).length, 0)
  assert.equal(filterCases(cases, 'image', '柔和 不存在', { purpose: 'poster', topic: 'fantasy' }).length, 0)
  assert.equal(filterCases(cases, 'all').length, cases.length, 'no tag selection continues to include legacy untagged records')
})

test('search can use Chinese tag names together with the existing text fields', () => {
  const purpose = tagName('purpose', 'poster')
  const topic = tagName('topic', 'fantasy')
  assert.ok(purpose && topic, 'fixture tag IDs exist in the taxonomy')
  assert.deepEqual(slugs(filterCases(cases, 'all', `${purpose} ${topic} 小李`)), ['poster-person'])
  assert.deepEqual(slugs(filterCases(cases, 'all', `${purpose} ${topic} 工具甲`)), ['poster-person'])
  assert.equal(filterCases(cases, 'all', `${purpose} ${topic} 不存在`).length, 0)
})

test('list, detail origin and preview links retain both tags and Chinese search', () => {
  const list = buildListPath('image', ' 柔和 小李 ', { purpose: 'poster', topic: 'fantasy' })
  const expected = `/cases/image/?${new URLSearchParams({ q: '柔和 小李', purpose: 'poster', topic: 'fantasy' })}`
  assert.equal(list, expected)
  assert.deepEqual(getListContext(list), { path: list, category: 'image', query: '柔和 小李', purpose: 'poster', topic: 'fantasy' })
  const detail = new URL(buildCaseHref('poster-person', list), 'https://example.invalid')
  assert.equal(detail.searchParams.get('from'), list)
  const context = resolveCaseContext(cases[0], cases, detail.searchParams.get('from'))
  assert.equal(context.hasOrigin, true)
  assert.equal(context.results.length, 1)
  assert.equal(context.previous, null)
  assert.equal(context.next, null)
  const preview = buildPreviewHref('poster-person', context.listPath)
  const params = new URL(preview, 'https://example.invalid').searchParams
  assert.equal(params.get('purpose'), 'poster')
  assert.equal(params.get('topic'), 'fantasy')
  assert.equal(params.get('q'), '柔和 小李')
  assert.equal(params.get('view'), 'poster-person')
  assert.equal(normalizeListPath(preview), list, 'the saved origin strips view but retains both filters')
})

test('URL canonicalization drops unknown or wrong-dimension IDs without clearing a valid filter', () => {
  const list = buildListPath('image', '柔和', { purpose: 'poster', topic: 'fantasy' })
  assert.equal(normalizeListPath('/cases/image?topic=fantasy&junk=1&purpose=poster&q=柔和&view=poster-person'), list)
  assert.equal(normalizeListPath('/cases/image/?q=柔和&purpose=does-not-exist&topic=fantasy'), buildListPath('image', '柔和', { topic: 'fantasy' }))
  assert.equal(normalizeListPath('/cases/image/?q=柔和&purpose=fantasy&topic=food'), buildListPath('image', '柔和', { topic: 'food' }))
  assert.equal(normalizeListPath('/cases/image/?purpose=poster&topic=poster'), buildListPath('image', '', { purpose: 'poster' }))
  assert.equal(normalizeListPath('/cases/image/?purpose=unknown&topic=unknown'), '/cases/image/')
  assert.equal(buildListPath('all', '', { purpose: '', topic: '' }), '/cases/')
  assert.deepEqual(getListContext('/cases/video/?q=产品'), {
    path: buildListPath('video', '产品'), category: 'video', query: '产品', purpose: '', topic: '',
  }, 'old search URLs keep their path and add empty tag fields')
})

test('valid zero-result tag combinations remain selected and can be cleared independently', () => {
  const tags = { purpose: 'poster', topic: 'animals' }
  const list = buildListPath('image', '柔和', tags)
  assert.equal(filterCases(cases, 'image', '柔和', tags).length, 0)
  assert.equal(normalizeListPath(list), list, 'no results must not be confused with an invalid ID')
  assert.equal(getListContext(list).purpose, 'poster')
  assert.equal(getListContext(list).topic, 'animals')
  assert.deepEqual(slugs(filterCases(cases, 'image', '柔和', { purpose: tags.purpose })), ['poster-person', 'poster-food'])
  assert.deepEqual(slugs(filterCases(cases, 'all', '柔和', { topic: tags.topic })), ['daily-animal'])
  const fallback = resolveCaseContext(cases[0], cases, list)
  assert.equal(fallback.hasOrigin, false)
  assert.equal(fallback.listPath, '/cases/image/', 'a detail outside the origin results follows the existing category fallback')
})

test('tagged continuous browsing covers the complete result set beyond the visible page', () => {
  const collection = Array.from({ length: 25 }, (_, i) => ({
    ...sample(`tagged-video-${i + 1}`, 'video', { purpose: ['story'], topic: ['fantasy'] }),
    title: `产品影片 ${i + 1}`, use: '广告', models: ['Seedance'],
  }))
  collection.push({ ...sample('other-video', 'video', { purpose: ['daily'], topic: ['animals'] }), title: '产品影片', use: '广告' })
  const list = buildListPath('video', '产品 广告', { purpose: 'story', topic: 'fantasy' })
  const middle = resolveCaseContext(collection[12], collection, list)
  assert.equal(middle.hasOrigin, true)
  assert.equal(middle.results.length, 25)
  assert.equal(middle.index, 12)
  assert.equal(middle.previous.slug, 'tagged-video-12')
  assert.equal(middle.next.slug, 'tagged-video-14')
  assert.equal(resolveCaseContext(collection[0], collection, list).previous, null)
  assert.equal(resolveCaseContext(collection[24], collection, list).next, null)
  for (const adjacent of [middle.previous, middle.next]) {
    const detail = new URL(buildCaseHref(adjacent.slug, middle.listPath), 'https://example.invalid')
    const context = resolveCaseContext(adjacent, collection, detail.searchParams.get('from'))
    assert.equal(context.hasOrigin, true)
    assert.equal(context.listPath, list)
    assert.equal(new URL(buildPreviewHref(adjacent.slug, context.listPath), 'https://example.invalid').searchParams.get('view'), adjacent.slug)
  }
})

test('saved positions are isolated by both tag dimensions and equivalent URL order shares state', () => {
  const items = new Map()
  const storage = { getItem: key => items.get(key), setItem: (key, value) => items.set(key, value) }
  const list = buildListPath('image', '柔和', { purpose: 'poster', topic: 'fantasy' })
  const state = { y: 1820, limit: 36, anchorSlug: 'poster-person' }
  assert.equal(saveListState(list, state, storage), true)
  assert.deepEqual(readListState('/cases/image/?topic=fantasy&q=柔和&purpose=poster&view=poster-person', storage), state)
  for (const other of [
    buildListPath('image', '柔和', { purpose: 'portrait', topic: 'fantasy' }),
    buildListPath('image', '柔和', { purpose: 'poster', topic: 'fashion' }),
    buildListPath('image', '柔和', { purpose: 'poster' }),
    buildListPath('image', '柔和', { topic: 'fantasy' }),
    buildListPath('image', '柔和'),
    buildListPath('video', '柔和', { purpose: 'poster', topic: 'fantasy' }),
    buildListPath('image', '另一词', { purpose: 'poster', topic: 'fantasy' }),
  ]) assert.equal(readListState(other, storage), null, other)
  assert.deepEqual(readListState(buildPreviewHref('poster-person', list), storage), state)
})

test('every selected case has legal nonduplicate tags and generated browsing data retains them', () => {
  const selection = read('docs/.vitepress/data/practice-cases-selection.json').cases
  const tagging = read('docs/.vitepress/data/case-tags.json')
  const generated = read('docs/.vitepress/data/cases-generated/index.json')
  assert.deepEqual(CASE_TAG_GROUPS.map(group => group.id).sort(), ['purpose', 'topic'])
  const allowed = new Map(CASE_TAG_GROUPS.map(group => {
    assert.ok(group.name && group.tags.length, group.id)
    assert.equal(new Set(group.tags.map(tag => tag.id)).size, group.tags.length, `${group.id}: duplicate taxonomy ID`)
    for (const tag of group.tags) {
      assert.match(tag.id, /^[a-z][a-z0-9-]*$/, `${group.id}/${tag.id}`)
      assert.ok(tag.name?.trim(), `${group.id}/${tag.id}: no display name`)
    }
    return [group.id, new Set(group.tags.map(tag => tag.id))]
  }))
  assert.equal(Object.keys(tagging).length, selection.length)
  assert.deepEqual(Object.keys(tagging).sort(), selection.map(item => item.slug).sort(), 'tag records exactly cover the selected catalog')
  assert.deepEqual(generated.map(item => item.slug), selection.map(item => item.slug), 'tagging does not reorder cases')
  for (const { slug } of selection) {
    const tags = tagging[slug]
    assert.deepEqual(Object.keys(tags).sort(), ['purpose', 'topic'], slug)
    for (const group of ['purpose', 'topic']) {
      assert.ok(Array.isArray(tags[group]), `${slug}/${group}`)
      assert.equal(new Set(tags[group]).size, tags[group].length, `${slug}/${group}: duplicate assignment`)
      assert.ok(tags[group].every(id => allowed.get(group).has(id)), `${slug}/${group}: unknown ID`)
    }
    assert.ok(tags.purpose.length >= 1, `${slug}: missing purpose`)
  }
  for (const item of generated) {
    assert.deepEqual(item.tags, tagging[item.slug], `${item.slug}: tags missing from generated browsing data`)
  }
})
