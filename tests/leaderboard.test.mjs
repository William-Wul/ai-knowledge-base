import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, mkdtempSync, mkdirSync, copyFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { parse } from '../scripts/sync-leaderboard.mjs'
const html = readFileSync(new URL('./fixtures/leaderboard-2026-10-05.html', import.meta.url), 'utf8')
test('真实新版原榜的元信息、排名、证据和三种价格', () => {
  const d = parse(html)
  assert.equal(d.models.length, 30)
  assert.equal(d.sourceCount, 7)
  assert.equal(d.evaluationCount, 27)
  assert.equal(d.sourceUpdatedAt, '10/05 20:08')
  assert.equal(d.models[1].name, 'Gemini 4 Argon')
  assert.equal(d.models[0].score, 74.2)
  assert.equal(d.models[0].evidenceCount, 25)
  assert.equal(d.models[0].evidenceStatus, '覆盖96%')
  assert.equal(d.models[0].cachePrice, '¥1.34')
  assert.equal(d.models[0].inputPrice, '¥26.82')
  assert.equal(d.models[0].outputPrice, '¥134.09')
  assert.equal(d.models[1].cachePrice, '待核验')
})
test('拒绝截断、重复模型、错误价格和不连续排名', () => {
  assert.throws(() => parse(html.replace(/<tbody>[\s\S]*?<\/tbody>/, '<tbody></tbody>')), /行数异常/)
  assert.throws(() => parse(html.replace('href="/leaderboard/gemini-4-argon"', 'href="/leaderboard/claude-fable-5-1"')), /重复/)
  assert.throws(() => parse(html.replace('¥26.82', '$26.82')), /价格/)
  assert.throws(() => parse(html.replace('>02</span>', '>99</span>')), /名次/)
  assert.throws(() => parse('<html>Access denied</html>'))
})
test('抓取失败和页面改版均退出失败，且旧数据逐字保留', () => {
  const root = mkdtempSync(join(tmpdir(), 'leaderboard-test-'))
  try {
    mkdirSync(join(root, 'scripts'))
    mkdirSync(join(root, 'docs/.vitepress/data'), { recursive: true })
    copyFileSync(new URL('../scripts/sync-leaderboard.mjs', import.meta.url), join(root, 'scripts/sync-leaderboard.mjs'))
    const file = join(root, 'docs/.vitepress/data/leaderboard.json')
    const old = '{"syncedAt":"2026-09-23T00:00:00Z","models":["preserved"]}\n'
    writeFileSync(file, old)
    for (const mock of ["globalThis.fetch=async()=>{throw new Error('network down')}", "globalThis.fetch=async()=>({ok:true,text:async()=>'<html>changed</html>'})"]) {
      writeFileSync(join(root, 'mock.mjs'), mock)
      const run = spawnSync(process.execPath, ['--import', join(root, 'mock.mjs'), join(root, 'scripts/sync-leaderboard.mjs')], { encoding: 'utf8' })
      assert.equal(run.status, 1)
      assert.match(run.stderr, /::error::/)
      assert.equal(readFileSync(file, 'utf8'), old)
    }
  } finally { rmSync(root, { recursive: true, force: true }) }
})
