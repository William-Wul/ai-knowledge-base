import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { createHash, webcrypto } from 'node:crypto'
import { ACCESS_CONFIG } from '../docs/.vitepress/accessConfig.js'
const html = readFileSync('docs/public/vocab/index.html', 'utf8')
const script = html.match(/<script>\s*(\(function\(\)\{\s*var config = window\.KB_ACCESS_CONFIG;[\s\S]*?\}\)\(\);)\s*<\/script>/)[1]
const fixture = { ...ACCESS_CONFIG, hash: createHash('sha256').update('fixture-password').digest('hex') }
function setup(stored, storageThrows = false, config = fixture) {
  const elements = new Map()
  const removed = []
  const storedValues = []
  for (const name of ['gate', 'gate-card', 'gate-form', 'gate-input', 'gate-btn', 'gate-error']) {
    elements.set('ailinkstart-' + name, { style: {}, value: '', disabled: true, listeners: {}, classList: { add() {}, remove() {} }, focus() {}, addEventListener(name, listener) { this.listeners[name] = listener }, parentNode: { removeChild(el) { removed.push(el) } } })
  }
  const document = { getElementById: id => elements.get(id), documentElement: { style: {} } }
  const localStorage = { getItem() { if (storageThrows) throw new Error('blocked'); return stored }, setItem(k,v) { if (storageThrows) throw new Error('blocked'); storedValues.push([k,v]) } }
  runInNewContext(script, { window: { KB_ACCESS_CONFIG: config }, document, localStorage, crypto: webcrypto, TextEncoder, Uint8Array, setTimeout: fn => fn() })
  return { elements, removed, storedValues, document }
}
test('独立词汇页不再内置明文，使用统一摘要配置', () => {
  assert(!/var\s+CORRECT\s*=/.test(html))
  assert(html.includes('src="/kb-access-config.js"'))
  assert(/^[a-f0-9]{64}$/.test(ACCESS_CONFIG.hash))
})
test('错误访问标记保持密码门，正确访问标记沿用已有登录', () => {
  assert.equal(setup('wrong').elements.get('ailinkstart-gate').style.display, 'flex')
  assert.equal(setup('ok').elements.get('ailinkstart-gate').style.display, undefined)
  assert.equal(setup(null, false, undefined).elements.get('ailinkstart-gate').style.display, 'flex')
})
test('错误密码不放行；正确密码校验后保留主站访问标记', async () => {
  const s = setup(null)
  const input = s.elements.get('ailinkstart-gate-input')
  const submit = s.elements.get('ailinkstart-gate-form').listeners.submit
  input.value = 'wrong'; input.listeners.input()
  await submit({ preventDefault() {} })
  assert.equal(s.removed.length, 0)
  assert.equal(s.elements.get('ailinkstart-gate-error').textContent, '密码错误，请重试')
  input.value = 'fixture-password'; input.listeners.input()
  await submit({ preventDefault() {} })
  assert.equal(s.removed.length, 1)
  assert.deepEqual(s.storedValues, [[ACCESS_CONFIG.storageKey, ACCESS_CONFIG.storageValue]])
})
test('存储不可用仍可在本次页面校验成功，缺配置必须保持关闭', async () => {
  const s = setup(null, true)
  const input = s.elements.get('ailinkstart-gate-input')
  input.value = 'fixture-password'; input.listeners.input()
  await s.elements.get('ailinkstart-gate-form').listeners.submit({ preventDefault() {} })
  assert.equal(s.removed.length, 1)
  const missing = setup(null, false, null)
  assert.equal(missing.elements.get('ailinkstart-gate').style.display, 'flex')
  const missingInput = missing.elements.get('ailinkstart-gate-input')
  missingInput.value = 'fixture-password'; missingInput.listeners.input()
  assert.equal(missing.elements.get('ailinkstart-gate-btn').disabled, true)
})
test('嵌入主站解锁与跨标签 storage 事件可同步放行，跨源或顶层伪造消息被拒绝', async () => {
  const windowListeners = {}
  const parent = {}
  const win = {
    KB_ACCESS_CONFIG: fixture,
    self: {},
    top: parent,
    parent,
    location: { origin: 'https://ailinkstart.com' },
    addEventListener(name, fn) { windowListeners[name] = fn },
  }
  const elements = new Map()
  const removed = []
  for (const name of ['gate', 'gate-card', 'gate-form', 'gate-input', 'gate-btn', 'gate-error']) {
    elements.set('ailinkstart-' + name, { style: {}, value: '', disabled: true, listeners: {}, classList: { add() {}, remove() {} }, focus() {}, addEventListener(n, l) { this.listeners[n] = l }, parentNode: { removeChild(el) { removed.push(el) } } })
  }
  const document = { getElementById: id => elements.get(id), documentElement: { style: {} } }
  const localStorage = { getItem() { throw new Error('blocked') }, setItem() { throw new Error('blocked') } }
  runInNewContext(script, { window: win, document, localStorage, crypto: webcrypto, TextEncoder, Uint8Array, setTimeout: fn => fn() })

  windowListeners.message({ origin: 'https://evil.example', source: parent, data: { type: 'ailinkstart:vocab:auth' } })
  assert.equal(removed.length, 0)

  windowListeners.message({ origin: 'https://ailinkstart.com', source: parent, data: { type: 'ailinkstart:vocab:auth' } })
  assert.equal(removed.length, 1)

  const { initReadingState, toggleSidebar, toggleZen } = await import('../docs/.vitepress/theme/readingState.js')
  const origDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    get() {
      return {
        getItem() { throw new Error('SecurityError') },
        setItem() { throw new Error('SecurityError') },
      }
    },
  })
  try {
    assert.doesNotThrow(() => {
      initReadingState()
      toggleSidebar()
      toggleZen()
    })
  } finally {
    if (origDescriptor) Object.defineProperty(globalThis, 'localStorage', origDescriptor)
    else delete globalThis.localStorage
  }

  const { hasCaseAccess } = await import('../docs/.vitepress/theme/components/caseBrowsing.js')
  assert.equal(hasCaseAccess({ getItem: k => k === ACCESS_CONFIG.storageKey ? ACCESS_CONFIG.storageValue : null }), true)
  assert.equal(hasCaseAccess({ getItem: () => null }), false)
})
