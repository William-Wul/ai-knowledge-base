import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { trackLearning } from '../docs/.vitepress/theme/components/learningEvents.js'
import { dimensions, levels } from '../docs/.vitepress/theme/components/aiQuizBank.js'
import { topicMap, resolveLinks } from '../docs/.vitepress/theme/components/topicMap.js'
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
test('所有维度和阶段的自测推荐均有真实页面，材料与验收推荐对应上下文维度', () => {
  for (const item of [...dimensions, ...levels]) {
    for (const topic of item.topics) {
      assert(topicMap[topic], `缺少推荐映射：${topic}`)
      const path = topicMap[topic].link
      assert(existsSync(`docs${path.endsWith('/') ? path + 'index' : path}.md`), `缺少推荐页面：${path}`)
    }
  }
  assert.deepEqual(dimensions.find(d => d.key === 'context').topics, ['context-management', 'define-done'])
  assert.equal(resolveLinks(['context-management', 'context-management']).length, 1)
})
