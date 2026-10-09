import { hasSessionAccess } from '../accessState.js'
import { normalizeTagFilters, caseTagLabels } from '../../caseTags.js'

const LIST_CATEGORIES = new Set(['all', 'image', 'video', 'web'])
const SLUG_PATTERN = /^[a-z0-9-]+$/
const STORAGE_PREFIX = 'case-list-state:'
const PAGE_SIZE = 12

export function buildListPath(category = 'all', query = '', filters = {}) {
  const id = LIST_CATEGORIES.has(category) ? category : 'all'
  const path = id === 'all' ? '/cases/' : `/cases/${id}/`
  const text = String(query || '').trim()
  const params = new URLSearchParams()
  if (text) params.set('q', text)
  for (const [key, value] of Object.entries(normalizeTagFilters(filters))) if (value) params.set(key, value)
  return params.size ? `${path}?${params}` : path
}

// A return URL is a local case list only. Query and preview IDs must never
// become a redirect to another site, another page, or an old session's list.
export function normalizeListPath(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return null
  if (value.includes('\\') || value.includes('#')) return null
  try {
    const url = new URL(value, 'https://case-list.invalid')
    const match = url.pathname.match(/^\/cases(?:\/(image|video|web))?\/?$/)
    if (!match || url.origin !== 'https://case-list.invalid') return null
    return buildListPath(match[1] || 'all', url.searchParams.get('q') || '', {
      purpose: url.searchParams.get('purpose'), topic: url.searchParams.get('topic'),
    })
  } catch {
    return null
  }
}

export function getListContext(path) {
  const normalized = normalizeListPath(path)
  if (!normalized) return null
  const url = new URL(normalized, 'https://case-list.invalid')
  return {
    path: normalized,
    category: url.pathname.split('/')[2] || 'all',
    query: url.searchParams.get('q') || '',
    ...normalizeTagFilters(Object.fromEntries(url.searchParams)),
  }
}

export function filterCases(cases, category = 'all', query = '', filters = {}) {
  const needles = String(query || '').trim().toLowerCase().split(/\s+/).filter(Boolean)
  const tags = normalizeTagFilters(filters)
  return cases.filter(item => {
    if (category !== 'all' && item.category !== category) return false
    for (const [group, id] of Object.entries(tags)) if (id && !item.tags?.[group]?.includes(id)) return false
    const text = `${item.title} ${item.summary} ${item.use} ${(item.models || []).join(' ')} ${item.creator} ${caseTagLabels(item.tags).map(tag => tag.name).join(' ')}`.toLowerCase()
    return needles.every(needle => text.includes(needle))
  })
}

export function resolveCaseContext(item, cases, fromPath) {
  let context = getListContext(fromPath)
  let results = context ? filterCases(cases, context.category, context.query, context) : []
  const hasOrigin = !!context && results.some(candidate => candidate.slug === item.slug)
  if (!hasOrigin) {
    context = getListContext(buildListPath(item.category))
    results = filterCases(cases, context.category, context.query, context)
  }
  const index = results.findIndex(candidate => candidate.slug === item.slug)
  return {
    listPath: context.path,
    results,
    index,
    previous: index > 0 ? results[index - 1] : null,
    next: index >= 0 && index < results.length - 1 ? results[index + 1] : null,
    hasOrigin,
  }
}

export function buildCaseHref(slug, listPath) {
  if (!SLUG_PATTERN.test(slug)) return null
  const path = normalizeListPath(listPath)
  return `/cases/${slug}${path ? `?${new URLSearchParams({ from: path })}` : ''}`
}

export function buildPreviewHref(slug, listPath) {
  const path = normalizeListPath(listPath)
  if (!path || !SLUG_PATTERN.test(slug)) return null
  const url = new URL(path, 'https://case-list.invalid')
  url.searchParams.set('view', slug)
  return url.pathname + url.search
}

function browserStorage() {
  try { return typeof window === 'undefined' ? null : window.sessionStorage } catch { return null }
}

function normalizeState(state) {
  if (!state || typeof state !== 'object') return null
  const y = Number.isFinite(state.y) ? Math.max(0, Math.min(state.y, 100000000)) : 0
  const limit = Number.isInteger(state.limit) ? Math.max(PAGE_SIZE, Math.min(state.limit, 10000)) : PAGE_SIZE
  const anchorSlug = typeof state.anchorSlug === 'string' && SLUG_PATTERN.test(state.anchorSlug) ? state.anchorSlug : ''
  return { y, limit, anchorSlug }
}

export function readListState(listPath, storage = browserStorage()) {
  const path = normalizeListPath(listPath)
  if (!path || !storage) return null
  try { return normalizeState(JSON.parse(storage.getItem(STORAGE_PREFIX + path) || 'null')) } catch { return null }
}

export function saveListState(listPath, state, storage = browserStorage()) {
  const path = normalizeListPath(listPath)
  const normalized = normalizeState(state)
  if (!path || !normalized || !storage) return false
  try {
    storage.setItem(STORAGE_PREFIX + path, JSON.stringify(normalized))
    return true
  } catch { return false }
}

export function pauseCaseMedia(scope = typeof document === 'undefined' ? null : document) {
  scope?.querySelectorAll?.('video, audio').forEach(media => media.pause())
}

// Match the existing password gate; an unauthenticated deep link must not
// place a native top-layer dialog above the site's access screen.
export function hasCaseAccess(storage) {
  if (arguments.length === 0 && hasSessionAccess()) return true
  try {
    const target = storage || (typeof window === 'undefined' ? null : window.localStorage)
    return target?.getItem('kb_auth_v1') === 'ok'
  } catch { return false }
}
