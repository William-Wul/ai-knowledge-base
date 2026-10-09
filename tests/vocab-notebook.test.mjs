import test from 'node:test'
import assert from 'node:assert/strict'
import { parseBackup, mergeBackup, recoverInterruptedWords, requestWithTimeout } from '../docs/public/vocab/notebook-state.mjs'

const word = (term, id = 'w_1') => ({ id, term, status: 'ready', explanation: '旧解读', starred: true, understood: true, createdAt: 123 })
const backup = words => JSON.stringify({ version: 1, words, config: { apiKey: 'must-not-be-imported' } })

test('备份先校验整份内容，拒绝错误结构和可插入标记的编号', () => {
  assert.throws(() => parseBackup('not json'), /有效 JSON/)
  assert.throws(() => parseBackup(JSON.stringify({ version: 2, words: [] })), /格式不匹配/)
  assert.throws(() => parseBackup(backup([word('RAG'), { ...word('Agent'), id: 'x" onclick="bad' }])), /第 2 条/)
  assert.throws(() => parseBackup(backup([{ ...word('RAG'), supplementary: [{ id: 's_1', angle: 'custom', content: [] }] }])), /内容必须是文本/)
  assert.equal('config' in parseBackup(backup([word('RAG')]))[0], false)
})

test('恢复中断状态只改变请求状态，保留已有解释和学习标记', () => {
  const original = { ...word('RAG'), status: 'loading' }
  const [restored] = recoverInterruptedWords([original])
  assert.equal(restored.status, 'error')
  assert.match(restored.error, /手动重试/)
  assert.equal(restored.explanation, original.explanation)
  assert.equal(restored.understood, true)
  assert.equal(original.status, 'loading')
  assert.equal(parseBackup(backup([original]))[0].status, 'error')
})

test('合并对同名与备份内部去重，编号冲突重分配，已有词条原样保留', () => {
  const existing = [word('RAG')]
  const incoming = parseBackup(backup([
    { ...word(' rag ', 'w_2'), explanation: '不能覆盖' },
    word('Agent', 'w_1'), word('ＡＧＥＮＴ', 'w_3')
  ]))
  const result = mergeBackup(existing, incoming, () => 'w_unique')
  assert.equal(result.duplicates, 2)
  assert.equal(result.added.length, 1)
  assert.equal(result.added[0].id, 'w_unique')
  assert.equal(result.words[0], existing[0])
  assert.deepEqual(existing, [word('RAG')])
  assert.equal(result.words[0].explanation, '旧解读')
  // 预览没有写入，再次确认时根据新词库重新去重。
  assert.equal(mergeBackup([...existing, word('Agent', 'w_99')], incoming).added.length, 0)
})

const hangingFetch = onCall => async (_url, options) => {
  onCall()
  return new Promise((_resolve, reject) => {
    const aborted = () => reject(new DOMException('Aborted', 'AbortError'))
    if (options.signal.aborted) aborted()
    else options.signal.addEventListener('abort', aborted, { once: true })
  })
}

test('请求超时会停止等待且只发起一次，不自动补发', async () => {
  let calls = 0
  await assert.rejects(requestWithTimeout('/mock', { mode: 'interpret' }, { timeoutMs: 10, fetchImpl: hangingFetch(() => calls++) }), error => error.name === 'TimeoutError')
  assert.equal(calls, 1)
})

test('手动取消及响应读取中取消均退出，不自动重试', async () => {
  let calls = 0
  const controller = new AbortController()
  const pending = requestWithTimeout('/mock', {}, { signal: controller.signal, fetchImpl: hangingFetch(() => calls++) })
  controller.abort()
  await assert.rejects(pending, error => error.name === 'AbortError')
  assert.equal(calls, 1)
  const duringBody = new AbortController()
  let startedBody
  const bodyStarted = new Promise(resolve => { startedBody = resolve })
  const bodyRequest = requestWithTimeout('/mock', {}, {
    signal: duringBody.signal,
    fetchImpl: async (_url, options) => ({ ok: true, text: () => { startedBody(); return new Promise((_resolve, reject) => options.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true })) } })
  })
  await bodyStarted
  duringBody.abort()
  await assert.rejects(bodyRequest, error => error.name === 'AbortError')
})

test('接口错误与无效 JSON 不引发自动重试', async () => {
  let calls = 0
  await assert.rejects(requestWithTimeout('/mock', {}, { fetchImpl: async () => { calls++; return { ok: false, status: 429, text: async () => '{"error":"请稍后重试"}' } } }), /请稍后重试/)
  assert.equal(calls, 1)
  await assert.rejects(requestWithTimeout('/mock', {}, { fetchImpl: async () => ({ ok: true, text: async () => 'invalid response' }) }), /有效 JSON/)
})
