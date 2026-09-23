import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const read = file => JSON.parse(readFileSync(resolve(root, file), 'utf8'))
export function loadCases() {
  const curated = read('docs/.vitepress/data/practice-cases.json')
  const importedFile = 'docs/.vitepress/data/practice-cases-imported.json'
  const imported = existsSync(resolve(root, importedFile)) ? read(importedFile) : []
  const overrides = new Set(curated.map(c => c.slug))
  const all = [...curated, ...imported.filter(c => !overrides.has(c.slug))]
  const selectionFile = 'docs/.vitepress/data/practice-cases-selection.json'
  if (!existsSync(resolve(root, selectionFile))) return all
  const selected = read(selectionFile).cases
  const bySlug = new Map(all.map(c => [c.slug, c]))
  return selected.map(({ slug }) => {
    if (!bySlug.has(slug)) throw new Error(`已选案例缺少内容：${slug}`)
    return bySlug.get(slug)
  })
}
