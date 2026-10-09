import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = file => JSON.parse(readFileSync(resolve(root, file), 'utf8'))
export const EDITORIAL_FIELDS = new Set(['title', 'summary', 'use', 'preparation', 'steps', 'lesson', 'exercise', 'promptZh', 'translationNote'])
export function applyEditorialOverrides(cases, overrides) {
  if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides)) throw new Error('案例编辑覆盖必须为对象')
  const bySlug = new Map(cases.map(c => [c.slug, c]))
  for (const [slug, fields] of Object.entries(overrides)) {
    if (!bySlug.has(slug)) throw new Error(`案例编辑覆盖缺少来源：${slug}`)
    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) throw new Error(`案例编辑字段无效：${slug}`)
    for (const [field, value] of Object.entries(fields)) {
      if (!EDITORIAL_FIELDS.has(field)) throw new Error(`案例编辑禁止修改 ${field}：${slug}`)
      if (field === 'steps') {
        if (!Array.isArray(value) || value.length < 3 || value.some(step => typeof step !== 'string' || !step.trim())) throw new Error(`案例步骤无效：${slug}`)
      } else if (typeof value !== 'string' || !value.trim()) throw new Error(`案例编辑内容为空或非文本：${slug}/${field}`)
    }
  }
  return cases.map(c => ({ ...c, ...(overrides[c.slug] || {}) }))
}
export function loadCases() {
  const curated = read('docs/.vitepress/data/practice-cases.json')
  const importedFile = 'docs/.vitepress/data/practice-cases-imported.json'
  const imported = existsSync(resolve(root, importedFile)) ? read(importedFile) : []
  const overrides = new Set(curated.map(c => c.slug))
  const original = [...curated, ...imported.filter(c => !overrides.has(c.slug))]
  const editorialFile = 'docs/.vitepress/data/case-editorial-overrides.json'
  const all = applyEditorialOverrides(original, existsSync(resolve(root, editorialFile)) ? read(editorialFile) : {})
  const selectionFile = 'docs/.vitepress/data/practice-cases-selection.json'
  if (!existsSync(resolve(root, selectionFile))) return all
  const selected = read(selectionFile).cases
  const bySlug = new Map(all.map(c => [c.slug, c]))
  return selected.map(({ slug }) => {
    if (!bySlug.has(slug)) throw new Error(`已选案例缺少内容：${slug}`)
    return bySlug.get(slug)
  })
}
