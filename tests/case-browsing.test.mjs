import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  buildListPath, normalizeListPath, getListContext, filterCases, resolveCaseContext,
  buildCaseHref, buildPreviewHref, readListState, saveListState,
} from '../docs/.vitepress/theme/components/caseBrowsing.js'

const cases = [
  { slug: 'image-one', category: 'image', title: '产品灯光', summary: '', use: '', models: ['GPT Image'], creator: '小王' },
  ...Array.from({ length: 25 }, (_, index) => ({
    slug: `video-${index + 1}`, category: 'video', title: `产品影片 ${index + 1}`,
    summary: '柔和灯光', use: '广告', models: ['Seedance'], creator: '小李',
  })),
  { slug: 'video-other', category: 'video', title: '人物演技', summary: '', use: '', models: [], creator: '' },
]

test('origin links retain Chinese search and strip preview state', () => {
  const list = buildListPath('video', ' 产品 灯光 ')
  const detail = new URL(buildCaseHref('video-8', list), 'https://example.invalid')
  assert.equal(detail.searchParams.get('from'), list)
  const preview = buildPreviewHref('video-8', list)
  assert.equal(new URL(preview, 'https://example.invalid').searchParams.get('view'), 'video-8')
  assert.equal(normalizeListPath(preview), list)
  assert.deepEqual(getListContext(list), { path: list, category: 'video', query: '产品 灯光' })
})

test('return path cannot escape known local case lists', () => {
  for (const path of [
    'https://evil.example/cases/', '//evil.example/cases/', '/\\evil.example/cases/',
    '/cases/../../../', '/model-ranking/', '/cases/invalid/', '/cases/#other',
    'javascript:alert(1)', '/cases/%2f%2fevil.example/', '/cases/video.html',
  ]) assert.equal(normalizeListPath(path), null, path)
  assert.equal(normalizeListPath('/cases/video?q=产品&view=video-1&from=https://evil.example'), buildListPath('video', '产品'))
  assert.equal(buildCaseHref('../../evil', '/cases/'), null)
  assert.equal(buildPreviewHref('video-1', '//evil.example'), null)
})

test('detail navigation covers all filtered results beyond the first page', () => {
  const context = resolveCaseContext(cases[13], cases, '/cases/video/?q=产品')
  assert.equal(context.hasOrigin, true)
  assert.equal(context.results.length, 25)
  assert.equal(context.index, 12)
  assert.equal(context.previous.slug, 'video-12')
  assert.equal(context.next.slug, 'video-14')
  const previousURL = new URL(buildCaseHref(context.previous.slug, context.listPath), 'https://example.invalid')
  assert.equal(previousURL.searchParams.get('from'), context.listPath)
  assert.equal(resolveCaseContext(cases[1], cases, context.listPath).previous, null)
  assert.equal(resolveCaseContext(cases[25], cases, context.listPath).next, null)
})

test('direct details and mismatched origins fall back to the current category', () => {
  const item = cases[10]
  for (const origin of [null, '/cases/image/', '/cases/video/?q=演技', '/cases/web/', '//evil.example']) {
    const context = resolveCaseContext(item, cases, origin)
    assert.equal(context.hasOrigin, false)
    assert.equal(context.listPath, '/cases/video/')
    assert.equal(context.results.length, 26)
  }
  assert.equal(filterCases(cases, 'all', 'gpt IMAGE').length, 1)
  assert.equal(filterCases(cases, 'video', ' 小李 ').length, 25)
})

test('space-separated keywords match across fields without losing the list origin or position', () => {
  assert.equal(filterCases(cases, 'video', ' 产品   广告\tSEEDANCE ').length, 25)
  assert.equal(filterCases(cases, 'all', '灯光 小王').length, 1)
  assert.equal(filterCases(cases, 'video', '产品 人物').length, 0)
  assert.equal(filterCases(cases, 'video', '   ').length, 26)
  const list = buildListPath('video', '产品 广告')
  const detail = new URL(buildCaseHref('video-13', list), 'https://example.invalid')
  const context = resolveCaseContext(cases[13], cases, detail.searchParams.get('from'))
  assert.equal(context.hasOrigin, true)
  assert.equal(context.index, 12)
  assert.equal(context.results.length, 25)
  assert.equal(context.previous.slug, 'video-12')
  assert.equal(context.next.slug, 'video-14')
  const saved = new Map()
  const storage = { getItem: key => saved.get(key), setItem: (key, value) => saved.set(key, value) }
  const state = { y: 1400, limit: 36, anchorSlug: 'video-13' }
  assert.equal(saveListState(list, state, storage), true)
  assert.deepEqual(readListState(buildPreviewHref('video-13', list), storage), state)
})

test('list positions are isolated by classification and search and tolerate broken storage', () => {
  const items = new Map()
  const storage = { getItem: key => items.get(key), setItem: (key, value) => items.set(key, value) }
  assert.equal(saveListState('/cases/video/?q=产品', { y: 1728, limit: 36, anchorSlug: 'video-22' }, storage), true)
  assert.deepEqual(readListState('/cases/video/?q=产品&view=video-24', storage), { y: 1728, limit: 36, anchorSlug: 'video-22' })
  assert.equal(readListState('/cases/video/', storage), null)
  assert.equal(readListState('/cases/image/?q=产品', storage), null)
  assert.equal(saveListState('/cases/video/', { y: -20, limit: 0, anchorSlug: '/bad' }, storage), true)
  assert.deepEqual(readListState('/cases/video/', storage), { y: 0, limit: 12, anchorSlug: '' })
  items.set('case-list-state:/cases/', '{broken')
  assert.equal(readListState('/cases/', storage), null)
  const unavailable = { getItem() { throw Error('denied') }, setItem() { throw Error('denied') } }
  assert.equal(readListState('/cases/', unavailable), null)
  assert.equal(saveListState('/cases/', { y: 0, limit: 12 }, unavailable), false)
})

test('real case catalog contains preview media without exposing full prompts', () => {
  const realCases = JSON.parse(readFileSync(new URL('../docs/.vitepress/data/cases-generated/index.json', import.meta.url)))
  assert.ok(realCases.length >= 400)
  const videos = filterCases(realCases, 'video')
  assert.ok(videos.every(item => item.mediaType !== 'video' || /^https:\/\//.test(item.mediaUrl)))
  assert.ok(realCases.every(item => !('promptOriginal' in item) && !('promptZh' in item)))
  const middle = videos[Math.floor(videos.length / 2)]
  const context = resolveCaseContext(middle, realCases, '/cases/video/')
  assert.equal(context.results.length, videos.length)
  assert.ok(context.previous && context.next)
})


test('preview deep links respect the existing password gate', async () => {
  const { hasCaseAccess } = await import('../docs/.vitepress/theme/components/caseBrowsing.js')
  assert.equal(hasCaseAccess({ getItem: () => null }), false)
  assert.equal(hasCaseAccess({ getItem: () => 'invalid' }), false)
  assert.equal(hasCaseAccess({ getItem: key => key === 'kb_auth_v1' ? 'ok' : null }), true)
  assert.equal(hasCaseAccess({ getItem() { throw new Error('blocked storage') } }), false)
  assert.equal(hasCaseAccess(), false, 'server rendering cannot open a preview')
})

test('verified session survives blocked storage without bypassing explicitly supplied storage checks', async () => {
  const { hasCaseAccess } = await import('../docs/.vitepress/theme/components/caseBrowsing.js')
  const { grantAccess } = await import('../docs/.vitepress/theme/accessState.js')
  grantAccess()
  assert.equal(hasCaseAccess(), true, 'normal password validation grants access for the current page')
  assert.equal(hasCaseAccess({ getItem: () => null }), false)
  assert.equal(hasCaseAccess({ getItem: () => 'invalid' }), false)
  assert.equal(hasCaseAccess({ getItem() { throw new Error('blocked storage') } }), false)
})
