import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { CASE_TAG_GROUPS } from '../docs/.vitepress/caseTags.js'
import { loadCases, root } from './practice-cases-data.mjs'

export function applyCaseTags(cases, mapping) {
  if (!mapping || typeof mapping !== 'object' || Array.isArray(mapping)) throw new Error('案例标签必须为对象')
  const slugs = new Set(cases.map(item => item.slug))
  for (const slug of Object.keys(mapping)) if (!slugs.has(slug)) throw new Error(`标签对应的案例不存在：${slug}`)
  return cases.map(item => {
    const tags = mapping[item.slug]
    if (!tags || typeof tags !== 'object' || Array.isArray(tags)) throw new Error(`案例缺少标签：${item.slug}`)
    for (const key of Object.keys(tags)) if (!CASE_TAG_GROUPS.some(group => group.id === key)) throw new Error(`未知标签分组：${item.slug}/${key}`)
    for (const group of CASE_TAG_GROUPS) {
      const values = tags[group.id]
      if (!Array.isArray(values) || new Set(values).size !== values.length) throw new Error(`案例标签为空或重复：${item.slug}/${group.id}`)
      if (values.some(id => !group.tags.some(tag => tag.id === id))) throw new Error(`未知案例标签：${item.slug}/${group.id}`)
    }
    if (!tags.purpose.length) throw new Error(`案例缺少用途标签：${item.slug}`)
    return { ...item, tags: Object.fromEntries(CASE_TAG_GROUPS.map(group => [group.id, [...tags[group.id]]])) }
  })
}

export function loadTaggedCases() {
  return applyCaseTags(loadCases(), JSON.parse(readFileSync(resolve(root, 'docs/.vitepress/data/case-tags.json'), 'utf8')))
}
