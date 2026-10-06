import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, mkdtempSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { normalizeDaily, dailyToMarkdown } from '../scripts/sync-aihot.mjs'
const payload = JSON.parse(readFileSync(new URL('./fixtures/aihot-daily-v1-2026-10-04.json', import.meta.url)))
test('v1 真实日报保留概述、所有正文和快讯及其来源链接', () => {
  const d = normalizeDaily(payload, '2026-10-04')
  const md = dailyToMarkdown(d)
  assert.ok(md.includes(d.lead.leadParagraph))
  for (const i of [...d.sections.flatMap(s => s.items), ...d.flashes]) {
    assert.ok(md.includes(i.title))
    assert.ok(md.includes(i.sourceUrl))
  }
  assert.match(md, /## 📌 快讯/)
})
test('没有新闻时仍显示来源明确提供的说明', () => {
  const p = structuredClone(payload)
  p.report.sections = []; p.report.flashes = []
  p.report.lead = {title:'今日安静，无大事发生', leadParagraph:'本日没有新的 AI 大事。'}
  assert.match(dailyToMarkdown(normalizeDaily(p, '2026-10-04')), /本日没有新的 AI 大事/)
})
test('拒绝错误日期、旧接口结构、缺失正文结构及不安全来源', () => {
  assert.throws(() => normalizeDaily(payload, '2026-10-05'))
  assert.throws(() => normalizeDaily(payload.report, '2026-10-04'))
  const p = structuredClone(payload); delete p.report.sections
  assert.throws(() => normalizeDaily(p, '2026-10-04'))
  const bad = structuredClone(payload); bad.report.sections[0].items[0].links.original = 'javascript:alert(1)'
  assert.throws(() => normalizeDaily(bad, '2026-10-04'))
})
test('最新一期或往期拉取失败都不得部分覆盖入口和历史文件', () => {
  const root = mkdtempSync(join(tmpdir(), 'aihot-test-'))
  try {
    mkdirSync(join(root, 'scripts')); mkdirSync(join(root, 'docs/hot'), {recursive:true})
    copyFileSync(new URL('../scripts/sync-aihot.mjs', import.meta.url), join(root, 'scripts/sync-aihot.mjs'))
    const files = ['index.md', '2026-10-04.md', '2026-10-03.md']
    for (const f of files) writeFileSync(join(root, 'docs/hot', f), `original ${f}`)
    for (const failDate of ['2026-10-04', '2026-10-03']) {
      writeFileSync(join(root,'mock.mjs'), `const payload=${JSON.stringify(payload)}; globalThis.fetch=async url=> { if(url.endsWith('${failDate}')) throw new Error('network down'); return {ok:true,json:async()=>url.endsWith('/dailies')?{schemaVersion:1,items:[{date:'2026-10-04'},{date:'2026-10-03'}]}:payload} }`)
      const run = spawnSync(process.execPath, ['--import',join(root,'mock.mjs'),join(root,'scripts/sync-aihot.mjs')], {encoding:'utf8'})
      assert.equal(run.status, 1)
      for (const f of files) assert.equal(readFileSync(join(root,'docs/hot',f),'utf8'),`original ${f}`)
    }
  } finally { rmSync(root, {recursive:true,force:true}) }
})
