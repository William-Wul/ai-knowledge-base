const MAX_WORDS = 10000
const TEXT_FIELDS = ['term', 'displayTerm', 'context', 'fullName', 'phoneticUs', 'translation', 'explanation', 'example', 'uncertaintyReason', 'error', 'supplementError']
const NUMBER_FIELDS = ['createdAt', 'lastInterpretedAt', 'lastViewed', 'viewCount', 'interpretationCount', 'understoodAt']
const BOOL_FIELDS = ['starred', 'open', 'isRecognizedTerm', 'understood']
const STATUSES = new Set(['pending', 'loading', 'ready', 'error'])
const plainObject = value => value !== null && typeof value === 'object' && !Array.isArray(value)
const safeId = value => typeof value === 'string' && /^[a-zA-Z0-9_-]{1,160}$/.test(value)
export const wordKey = term => String(term).normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('en-US')

export function recoverInterruptedWords(records) {
  return records.map(word => word.status === 'loading'
    ? { ...word, status: 'error', error: '上次解读已中断。词条已保留，可手动重试。' }
    : word)
}

function validateWord(word, index) {
  const fail = message => { throw new Error(`第 ${index + 1} 条词汇：${message}`) }
  if (!plainObject(word) || typeof word.term !== 'string' || !word.term.trim() || word.term.length > 200) fail('需要有效词条名称（不超过 200 个字符）')
  if (!safeId(word.id)) fail('词条编号无效')
  if (word.status !== undefined && !STATUSES.has(word.status)) fail('状态无效')
  if (word.tag !== undefined && !['ai', 'code', 'product', 'other'].includes(word.tag)) fail('分类无效')
  const result = { id: word.id, term: word.term.trim(), tag: word.tag || 'other', status: word.status || 'pending' }
  for (const key of TEXT_FIELDS) {
    if (word[key] === undefined || word[key] === null) continue
    if (typeof word[key] !== 'string' || word[key].length > 100000) fail(`${key} 必须是文本且长度合理`)
    result[key] = word[key]
  }
  result.term = result.term.trim()
  for (const key of NUMBER_FIELDS) {
    if (word[key] === undefined || word[key] === null) continue
    if (typeof word[key] !== 'number' || !Number.isFinite(word[key]) || word[key] < 0) fail(`${key} 必须是有效数字`)
    result[key] = word[key]
  }
  for (const key of BOOL_FIELDS) {
    if (word[key] === undefined || word[key] === null) continue
    if (typeof word[key] !== 'boolean') fail(`${key} 必须是是/否状态`)
    result[key] = word[key]
  }
  if (word.confidence !== undefined) {
    if (!['high', 'medium', 'low'].includes(word.confidence)) fail('把握程度无效')
    result.confidence = word.confidence
  }
  const arrays = {
    fullNameParts: ['word', 'phoneticUs'],
    breakdown: ['part', 'meaning'],
    supplementary: ['id', 'angle', 'question', 'content', 'createdAt']
  }
  for (const [key, fields] of Object.entries(arrays)) {
    if (word[key] === undefined) continue
    if (!Array.isArray(word[key]) || word[key].length > 1000) fail(`${key} 列表无效`)
    result[key] = word[key].map(item => {
      if (!plainObject(item)) fail(`${key} 内容无效`)
      const copy = {}
      for (const field of fields) {
        if (item[field] === undefined || item[field] === null) continue
        if (field === 'createdAt') {
          if (typeof item[field] !== 'number' || !Number.isFinite(item[field]) || item[field] < 0) fail('补充解释时间无效')
        } else if (typeof item[field] !== 'string' || item[field].length > 100000) fail(`${key} 内容必须是文本`)
        copy[field] = item[field]
      }
      if (key === 'supplementary' && (!safeId(copy.id) || !['analogy', 'deeper', 'example', 'custom'].includes(copy.angle) || !copy.content)) fail('补充解释缺少有效编号、类型或内容')
      return copy
    })
  }
  return result
}

export function parseBackup(text) {
  let backup
  try { backup = JSON.parse(text) } catch { throw new Error('文件不是有效 JSON，请选择「导出词库」生成的备份。') }
  if (!plainObject(backup) || backup.version !== 1 || !Array.isArray(backup.words)) throw new Error('备份格式不匹配，需要 version: 1 和 words 列表。')
  if (backup.words.length > MAX_WORDS) throw new Error(`单份备份最多支持 ${MAX_WORDS} 条词汇。`)
  // 仅导入词汇字段；备份中的模型设置、凭证或其他属性不进入浏览器。
  return recoverInterruptedWords(backup.words.map(validateWord))
}

export function mergeBackup(existing, incoming, createId = () => 'w_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10)) {
  const words = existing.slice()
  const seen = new Set(existing.map(word => wordKey(word.term)))
  const ids = new Set(existing.map(word => word.id))
  const added = []
  let duplicates = 0
  for (const word of incoming) {
    const key = wordKey(word.term)
    if (seen.has(key)) { duplicates++; continue }
    const copy = { ...word }
    if (ids.has(copy.id)) {
      let attempt = 0
      do {
        copy.id = createId()
        if (++attempt > 100) throw new Error('无法分配词条编号，请重新选择备份。')
      } while (!safeId(copy.id) || ids.has(copy.id))
    }
    seen.add(key)
    ids.add(copy.id)
    words.push(copy)
    added.push(copy)
  }
  return { words, added, duplicates }
}

export async function requestWithTimeout(endpoint, payload, { signal, timeoutMs = 60000, fetchImpl = globalThis.fetch } = {}) {
  const controller = new AbortController()
  let timedOut = false
  const cancel = () => controller.abort()
  if (signal?.aborted) cancel()
  else signal?.addEventListener('abort', cancel, { once: true })
  const timer = setTimeout(() => { timedOut = true; controller.abort() }, timeoutMs)
  try {
    const response = await fetchImpl(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload), signal: controller.signal
    })
    const raw = await response.text()
    let data
    try { data = raw ? JSON.parse(raw) : null } catch { throw new Error('接口返回不是有效 JSON，请稍后手动重试。') }
    if (!response.ok) throw new Error((data && (data.error || data.message)) || ('接口请求失败：' + response.status))
    return data
  } catch (error) {
    if (controller.signal.aborted) {
      const interrupted = new Error(timedOut ? '等待超过 60 秒，已停止等待。词条已保留，可手动重试。' : '已停止等待。词条已保留，可手动重试。')
      interrupted.name = timedOut ? 'TimeoutError' : 'AbortError'
      throw interrupted
    }
    throw error
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', cancel)
  }
}
