import test from 'node:test'
import assert from 'node:assert/strict'
import { caseSourceName, hasValidCaseSource } from '../docs/.vitepress/caseSources.js'
import { loadCases } from '../scripts/practice-cases-data.mjs'

test('source labels retain the legacy default and bind external sources to their own hosts', () => {
  assert.equal(caseSourceName({}), 'Goodcase')
  assert(hasValidCaseSource({ url: 'https://goodcase.ai/cases/example' }))
  assert(hasValidCaseSource({ sourceName: 'JasonZhu.AI', url: 'https://jasonzhu.ai/en/prompts/claude-opus-5-5/123' }))
  assert(hasValidCaseSource({ sourceName: 'apimodels', url: 'https://github.com/apimodels/claude-opus-5-5-video-prompts/blob/main/cases/example.md' }))
  for (const url of ['https://goodcase.ai/cases/example', 'http://jasonzhu.ai/en/prompts/claude-opus-5-5/123', 'https://jasonzhu.ai.evil.invalid/en/prompts/claude-opus-5-5/123', 'https://user:secret@jasonzhu.ai/en/prompts/claude-opus-5-5/123', 'https://jasonzhu.ai/unrelated/123']) {
    assert(!hasValidCaseSource({ sourceName: 'JasonZhu.AI', url }), url)
  }
  assert(!hasValidCaseSource({ sourceName: 'Unknown', url: 'https://unknown.invalid/cases/x' }))
})

test('new Opus cases retain creator and original post independently of the collection', () => {
  const added = loadCases().filter(c => c.capturedAt === '2026-10-13')
  assert.equal(added.length, 34)
  assert.equal(new Set(added.map(c => c.sourceItemId)).size, 34)
  assert(added.every(c => hasValidCaseSource(c) && c.creator.startsWith('@') && c.sourceUrl.startsWith('https://x.com/') && c.collectionUrl.startsWith('https://data.openchamber.dev/opus-5-5-videos/')))
  assert(added.every(c => c.tested === false && c.promptOriginal && c.promptZh && c.sourceName !== 'Goodcase'))
})
