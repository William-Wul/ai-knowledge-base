import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { trackLearning } from '../docs/.vitepress/theme/components/learningEvents.js'
import { areas, cognitionBank, styleAxes, styleItems, types, families, insightRules } from '../docs/.vitepress/theme/components/aiCollabBank.js'
test('学习动作只发送固定类别，不上传自由文本，预览不污染正式数据', () => {
  const target = { location: { href: 'https://ailinkstart.com/exams/' }, _hmt: [] }
  assert(trackLearning('quiz-finish', 'quiz', target))
  assert.deepEqual(target._hmt, [['_trackEvent','learning','quiz-finish','quiz']])
  assert.equal(trackLearning('quiz-finish', '任意输入或分数', target), false)
  assert.equal(trackLearning('quiz-finish', 'work-report', target), false)
  assert.equal(trackLearning('material-download', 'image', target), false)
  assert.equal(trackLearning('exercise-self-complete', 'quiz', target), false)
  assert.equal(trackLearning('case-copy', 'video', { ...target, location: { href: 'http://localhost:4173/' } }), false)
  assert.equal(trackLearning('case-copy', 'video', { ...target, location: { href: 'https://ailinkstart.com.evil.example/' } }), false)
})
test('协作力测评题库完整：链接指向真实页面、每题唯一正确答案、16 种类型齐全', () => {
  for (const area of areas) {
    assert(cognitionBank.filter(q => q.area === area.key).length >= 2, `认知块题量不足：${area.key}`)
    for (const link of area.links) {
      const path = link.href.split('#')[0]
      assert(existsSync(`docs${path.endsWith('/') ? path + 'index' : path}.md`), `缺少推荐页面：${link.href}`)
    }
  }
  const ids = new Set()
  for (const q of cognitionBank) {
    assert(!ids.has(q.id), `题目 id 重复：${q.id}`)
    ids.add(q.id)
    assert(areas.some(area => area.key === q.area), `未知认知块：${q.area}`)
    const items = q.type === 'spot' ? q.sentences : q.options
    assert.equal(items.filter(item => item.correct).length, 1, `正确答案不唯一：${q.id}`)
    assert(q.explain, `缺少解析：${q.id}`)
  }
  for (const axis of styleAxes) {
    assert.equal(styleItems.filter(item => item.axis === axis.key).length, 2, `风格轴题量不对：${axis.key}`)
  }
  const codes = styleAxes.reduce((list, axis) => list.flatMap(code => [code + axis.left.char, code + axis.right.char]), [''])
  assert.equal(codes.length, 16)
  for (const code of codes) {
    const info = types[code]
    assert(info?.name && info.emoji && info.tagline && info.scene && info.crash && info.like, `类型信息不全：${code}`)
    assert(families.some(family => family.key === info.family), `类型家族未知：${code}`)
  }
  for (const family of families) {
    assert.equal(Object.values(types).filter(info => info.family === family.key).length, 4, `家族成员数不对：${family.key}`)
  }
  assert(insightRules.every(rule => typeof rule.when === 'function' && rule.title && rule.text))
})
