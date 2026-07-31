<template>
  <section class="ai-quiz">
    <!-- 起始页 -->
    <div v-if="phase === 'intro'" class="intro-panel">
      <h1>AI 能力自测</h1>
      <p class="intro-lead">
        12 道场景题，从提问力、上下文力、流程力、Agent 力、判断力五个维度，评估你现在使用 AI 的方式，并给你一份对应的学习路径。
      </p>
      <ul class="intro-notes">
        <li>答案没有对错，按真实习惯选，结果才有参考价值</li>
        <li>题目从 {{ bankSize }} 道题库里随机抽取，每次测评不完全相同</li>
        <li>大约需要 3 分钟</li>
        <li>算分全部在你自己的浏览器里完成，不上传、不记录</li>
      </ul>
      <div v-if="lastResult" class="last-note">
        <span>上次测评（{{ lastResult.date }}）结果：<strong>{{ lastResult.name }}</strong></span>
        <button v-if="lastResult.dims" type="button" class="note-link" @click="viewLastReport">查看报告 →</button>
      </div>
      <button type="button" class="btn-primary" @click="startQuiz">开始测评</button>
    </div>

    <!-- 答题 -->
    <div v-else-if="phase === 'quiz'" ref="quizPanel" class="quiz-panel">
      <div class="quiz-progress">
        <span>第 {{ currentIndex + 1 }} / {{ questions.length }} 题</span>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>

      <div class="question-card">
        <div class="question-meta">
          <span class="badge">{{ currentQuestion.badge }}</span>
          <span v-if="currentQuestion.type === 'multi'" class="badge light">可多选</span>
        </div>
        <h2>{{ currentQuestion.title }}</h2>
        <p v-if="currentQuestion.context" class="question-context">{{ currentQuestion.context }}</p>

        <div class="choice-list">
          <button
            v-for="option in currentQuestion.options"
            :key="option.id"
            type="button"
            :class="['choice-btn', isSelected(currentQuestion, option.id) && 'selected']"
            @click="selectOption(currentQuestion, option.id)"
          >
            <span class="choice-mark">{{ choiceMark(currentQuestion, option.id) }}</span>
            <span class="choice-text">
              <strong>{{ option.label }}</strong>
            </span>
          </button>
        </div>
      </div>

      <div class="quiz-nav">
        <button type="button" class="btn-ghost" :disabled="currentIndex === 0" @click="prevQuestion">上一题</button>
        <button
          v-if="currentIndex < questions.length - 1"
          type="button"
          class="btn-primary"
          :disabled="!currentAnswered"
          @click="nextQuestion"
        >下一题</button>
        <button
          v-else
          type="button"
          class="btn-primary"
          :disabled="!currentAnswered"
          @click="finishQuiz"
        >查看测评报告</button>
      </div>
    </div>

    <!-- 报告 -->
    <div v-else ref="reportPanel" class="report-panel">
      <div class="report-head">
        <h1>你的测评报告</h1>
        <p>{{ activeReport?.date }} · 12 道场景题 · 五维评估</p>
      </div>

      <div class="level-card">
        <p class="level-eyebrow">综合来看，你是</p>
        <h2>{{ result.name }}</h2>
        <p class="level-score">综合得分 <strong>{{ overallScore }}</strong> / 100</p>
        <p class="level-summary">{{ result.summary }}</p>
        <div class="level-track">
          <div
            v-for="(level, index) in levels"
            :key="level.name"
            :class="['level-seg', index <= result.index && 'filled', index === result.index && 'current']"
          >
            <i></i>
            <span>{{ level.short }}</span>
          </div>
        </div>
      </div>

      <div class="dims-card">
        <h3>五维能力图</h3>
        <svg class="radar" :viewBox="`0 0 ${RADAR.w} ${RADAR.h}`" role="img" aria-label="五维能力雷达图">
          <polygon v-for="grid in radarGrid" :key="grid" :points="grid" class="radar-grid" />
          <line v-for="(axis, index) in radarAxes" :key="'axis' + index" :x1="axis.x1" :y1="axis.y1" :x2="axis.x2" :y2="axis.y2" class="radar-axis" />
          <polygon :points="radarPolygon" class="radar-shape" />
          <circle v-for="(dot, index) in radarDots" :key="'dot' + index" :cx="dot.x" :cy="dot.y" r="3.5" class="radar-dot" />
          <text
            v-for="(item, index) in radarLabels"
            :key="'label' + index"
            :x="item.x"
            :y="item.y"
            :text-anchor="item.anchor"
            class="radar-label"
          >{{ item.label }} <tspan class="radar-score-text">{{ item.score }}</tspan></text>
        </svg>
        <div class="dim-list">
          <div class="dim-item" v-for="dimension in dimensionReport" :key="dimension.key">
            <span class="dim-name">{{ dimension.label }}</span>
            <span :class="['dim-score', dimension.tone]">{{ dimension.percent }} 分</span>
            <p>{{ dimension.note }}</p>
          </div>
        </div>
      </div>

      <div class="path-card">
        <h3>你的学习路径</h3>
        <div class="path-block">
          <p class="path-label">先补短板：{{ weakestLabels }}</p>
          <div class="path-links">
            <a v-for="link in weakestLinks" :key="link.href" :href="link.href">{{ link.text }}</a>
          </div>
        </div>
        <div class="path-block">
          <p class="path-label">再按阶段继续</p>
          <div class="path-links">
            <a v-for="link in stageLinks" :key="link.href" :href="link.href">{{ link.text }}</a>
          </div>
        </div>
      </div>

      <div class="report-actions">
        <p class="retest-note">测的是你最近的使用习惯，不是固定水平。题目每次随机抽取，建议练一到两周后再来测一次。</p>
        <div class="action-btns">
          <button type="button" class="btn-primary" :disabled="sharing" @click="copyShareImage">{{ shareLabel }}</button>
          <button type="button" class="btn-ghost" :disabled="sharing" @click="downloadShareImage">下载图片</button>
          <button type="button" class="btn-ghost" @click="restartQuiz">重新测评</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { dimensions, levels, questionBank } from './aiQuizBank.js'
import { resolveLinks } from './topicMap.js'

const STORAGE_KEY = 'ai_ability_quiz_last_result_v4'
const LEVEL_THRESHOLDS = [0.18, 0.38, 0.58, 0.78]

const bankSize = questionBank.reduce((sum, slot) => sum + slot.variants.length, 0)

const phase = ref('intro')
const currentIndex = ref(0)
const questions = ref([])
const answers = reactive({})
const lastResult = ref(null)
const activeReport = ref(null)
const quizPanel = ref(null)
const reportPanel = ref(null)

onMounted(() => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) lastResult.value = JSON.parse(stored)
  } catch {}
})

function shuffle(list) {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// 每个题位随机抽一个变体；普通选项乱序，互斥选项（"都没做过"）固定在最后
function drawQuestions() {
  questions.value = questionBank.map(slot => {
    const variant = slot.variants[Math.floor(Math.random() * slot.variants.length)]
    const normal = variant.options.filter(option => !option.exclusive)
    const exclusive = variant.options.filter(option => option.exclusive)
    return { ...variant, options: [...shuffle(normal), ...exclusive] }
  })
}

const currentQuestion = computed(() => questions.value[currentIndex.value] || { options: [], type: 'single' })
const progressPercent = computed(() => {
  if (!questions.value.length) return 0
  return Math.round(((currentIndex.value + 1) / questions.value.length) * 100)
})

const currentAnswered = computed(() => {
  const answer = answers[currentQuestion.value.id]
  return Array.isArray(answer) ? answer.length > 0 : Boolean(answer)
})

const maxDimensionScores = computed(() => {
  const scores = Object.fromEntries(dimensions.map(dimension => [dimension.key, 0]))
  for (const question of questions.value) {
    if (question.type === 'multi') {
      for (const option of question.options) {
        for (const [key, value] of Object.entries(option.scores || {})) {
          scores[key] += value
        }
      }
    } else {
      const questionMax = Object.fromEntries(dimensions.map(dimension => [dimension.key, 0]))
      for (const option of question.options) {
        for (const [key, value] of Object.entries(option.scores || {})) {
          questionMax[key] = Math.max(questionMax[key], value)
        }
      }
      for (const [key, value] of Object.entries(questionMax)) {
        scores[key] += value
      }
    }
  }
  return scores
})

const dimensionScores = computed(() => {
  const scores = Object.fromEntries(dimensions.map(dimension => [dimension.key, 0]))
  for (const question of questions.value) {
    const picked = Array.isArray(answers[question.id]) ? answers[question.id] : [answers[question.id]].filter(Boolean)
    for (const optionId of picked) {
      const option = question.options.find(item => item.id === optionId)
      for (const [key, value] of Object.entries(option?.scores || {})) {
        scores[key] += value
      }
    }
  }
  return scores
})

const totalScore = computed(() => Object.values(dimensionScores.value).reduce((sum, score) => sum + score, 0))
const maxScore = computed(() => Object.values(maxDimensionScores.value).reduce((sum, score) => sum + score, 0))

function dimensionPercent(key) {
  const max = maxDimensionScores.value[key] || 1
  return Math.round((dimensionScores.value[key] / max) * 100)
}

// 报告页的所有展示都从 activeReport（当前或历史测评数据）派生
const overallScore = computed(() => activeReport.value?.overall ?? 0)

const result = computed(() => {
  const index = activeReport.value?.levelIndex ?? 0
  return { index, ...levels[index] }
})

const dimensionReport = computed(() => {
  return dimensions.map(dimension => {
    const percent = activeReport.value?.dims?.[dimension.key] ?? 0
    const band = percent < 34 ? 0 : percent < 67 ? 1 : 2
    return {
      ...dimension,
      percent,
      note: dimension.notes[band],
      tone: ['weak', 'mid', 'strong'][band],
    }
  })
})

const weakestDimensions = computed(() => {
  return [...dimensionReport.value].sort((a, b) => a.percent - b.percent).slice(0, 2)
})

const weakestLabels = computed(() => weakestDimensions.value.map(dimension => `${dimension.label} ${dimension.percent} 分`).join('、'))

const weakestLinks = computed(() => {
  // 把最弱两个维度的 topic 合并，经 topicMap 解析成 { text, href }，去重并过滤无对应内容的项
  const topics = weakestDimensions.value.flatMap(dimension => dimension.topics || [])
  return resolveLinks(topics)
})

// 当前等级的阶段路径推荐（同样经 topicMap 解析）
const stageLinks = computed(() => resolveLinks(result.value.topics || []))

// ---- 五维雷达图 ----
const RADAR = { w: 420, h: 302, cx: 210, cy: 162, r: 105 }

function radarPoint(index, ratio, radius = RADAR.r) {
  const angle = -Math.PI / 2 + index * ((2 * Math.PI) / dimensions.length)
  return [RADAR.cx + Math.cos(angle) * radius * ratio, RADAR.cy + Math.sin(angle) * radius * ratio]
}

const radarGrid = [0.25, 0.5, 0.75, 1].map(ratio =>
  dimensions.map((_, index) => radarPoint(index, ratio).map(n => n.toFixed(1)).join(',')).join(' ')
)

const radarAxes = dimensions.map((_, index) => {
  const [x2, y2] = radarPoint(index, 1)
  return { x1: RADAR.cx, y1: RADAR.cy, x2: x2.toFixed(1), y2: y2.toFixed(1) }
})

const radarPolygon = computed(() =>
  dimensionReport.value
    .map((dimension, index) => radarPoint(index, Math.max(dimension.percent, 4) / 100).map(n => n.toFixed(1)).join(','))
    .join(' ')
)

const radarDots = computed(() =>
  dimensionReport.value.map((dimension, index) => {
    const [x, y] = radarPoint(index, Math.max(dimension.percent, 4) / 100)
    return { x: x.toFixed(1), y: y.toFixed(1) }
  })
)

const radarLabels = computed(() =>
  dimensionReport.value.map((dimension, index) => {
    const [x, y] = radarPoint(index, 1, RADAR.r + 16)
    const anchor = x < RADAR.cx - 8 ? 'end' : x > RADAR.cx + 8 ? 'start' : 'middle'
    return {
      x: x.toFixed(1),
      y: (y > RADAR.cy ? y + 10 : y + 2).toFixed(1),
      anchor,
      label: dimension.label,
      score: dimension.percent,
    }
  })
)

function startQuiz() {
  drawQuestions()
  currentIndex.value = 0
  phase.value = 'quiz'
  scrollToPanel(quizPanel)
}

function selectOption(question, optionId) {
  if (question.type !== 'multi') {
    answers[question.id] = optionId
    return
  }
  const option = question.options.find(item => item.id === optionId)
  const current = Array.isArray(answers[question.id]) ? answers[question.id] : []
  if (option?.exclusive) {
    answers[question.id] = current.includes(optionId) ? [] : [optionId]
    return
  }
  const cleaned = current.filter(id => {
    const item = question.options.find(candidate => candidate.id === id)
    return !item?.exclusive
  })
  answers[question.id] = cleaned.includes(optionId)
    ? cleaned.filter(id => id !== optionId)
    : [...cleaned, optionId]
}

function isSelected(question, optionId) {
  const answer = answers[question.id]
  return Array.isArray(answer) ? answer.includes(optionId) : answer === optionId
}

function choiceMark(question, optionId) {
  if (question.type === 'multi') return isSelected(question, optionId) ? '✓' : '+'
  return isSelected(question, optionId) ? '●' : '○'
}

function nextQuestion() {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value += 1
    scrollToPanel(quizPanel)
  }
}

function prevQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1
    scrollToPanel(quizPanel)
  }
}

function finishQuiz() {
  const percent = maxScore.value ? totalScore.value / maxScore.value : 0
  let levelIndex = LEVEL_THRESHOLDS.findIndex(threshold => percent < threshold)
  if (levelIndex === -1) levelIndex = levels.length - 1
  const payload = {
    date: new Date().toLocaleDateString('zh-CN'),
    levelIndex,
    name: levels[levelIndex].name,
    overall: Math.round(percent * 100),
    dims: Object.fromEntries(dimensions.map(dimension => [dimension.key, dimensionPercent(dimension.key)])),
  }
  activeReport.value = payload
  lastResult.value = payload
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {}
  phase.value = 'report'
  scrollToPanel(reportPanel)
}

function viewLastReport() {
  if (!lastResult.value?.dims) return
  activeReport.value = lastResult.value
  phase.value = 'report'
  scrollToPanel(reportPanel)
}

function restartQuiz() {
  for (const key of Object.keys(answers)) delete answers[key]
  shareState.value = ''
  drawQuestions()
  currentIndex.value = 0
  phase.value = 'quiz'
  scrollToPanel(quizPanel)
}

async function scrollToPanel(panelRef) {
  await nextTick()
  panelRef.value?.scrollIntoView({ behavior: 'auto', block: 'start' })
}

// ---- 一键分享图 ----
const sharing = ref(false)
const shareState = ref('')
const shareLabel = computed(() => (sharing.value ? '生成中…' : shareState.value || '复制分享图'))

function flashShareState(text) {
  shareState.value = text
  window.setTimeout(() => { shareState.value = '' }, 2600)
}

function wrapText(ctx, text, maxWidth) {
  const lines = []
  let line = ''
  for (const char of text) {
    if (ctx.measureText(line + char).width > maxWidth) {
      lines.push(line)
      line = char
    } else {
      line += char
    }
  }
  if (line) lines.push(line)
  return lines
}

async function buildShareBlob() {
    const width = 750
    const height = 980
    const scale = 2
    const canvas = document.createElement('canvas')
    canvas.width = width * scale
    canvas.height = height * scale
    const ctx = canvas.getContext('2d')
    ctx.scale(scale, scale)
    const font = '-apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'

    // 底色与边框
    ctx.fillStyle = '#fbfaf5'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = '#dde7e0'
    ctx.lineWidth = 2
    ctx.strokeRect(18, 18, width - 36, height - 36)

    ctx.textAlign = 'center'

    // 头部
    ctx.fillStyle = '#5b6a60'
    ctx.font = `20px ${font}`
    ctx.fillText('AI 学习知识库 · AI 能力自测', width / 2, 86)
    ctx.fillText('综合来看，我是', width / 2, 152)

    // 水平名 + 综合得分
    ctx.fillStyle = '#2d5a3d'
    ctx.font = `bold 52px ${font}`
    ctx.fillText(result.value.name, width / 2, 218)

    const scoreParts = [
      { text: '综合得分 ', size: 22, color: '#5b6a60', weight: '' },
      { text: String(overallScore.value), size: 46, color: '#1b2b22', weight: 'bold ' },
      { text: ' / 100', size: 22, color: '#5b6a60', weight: '' },
    ]
    ctx.textAlign = 'left'
    let total = 0
    for (const part of scoreParts) {
      ctx.font = `${part.weight}${part.size}px ${font}`
      total += ctx.measureText(part.text).width
    }
    let x = (width - total) / 2
    for (const part of scoreParts) {
      ctx.font = `${part.weight}${part.size}px ${font}`
      ctx.fillStyle = part.color
      ctx.fillText(part.text, x, 276)
      x += ctx.measureText(part.text).width
    }

    // 雷达图
    const cx = width / 2
    const cy = 520
    const r = 168
    const point = (index, ratio, radius = r) => {
      const angle = -Math.PI / 2 + index * ((2 * Math.PI) / dimensions.length)
      return [cx + Math.cos(angle) * radius * ratio, cy + Math.sin(angle) * radius * ratio]
    }
    const tracePolygon = ratios => {
      ctx.beginPath()
      ratios.forEach((ratio, index) => {
        const [px, py] = point(index, ratio)
        index === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      })
      ctx.closePath()
    }
    ctx.strokeStyle = '#dde7e0'
    ctx.lineWidth = 1.5
    for (const ratio of [0.25, 0.5, 0.75, 1]) {
      tracePolygon(dimensions.map(() => ratio))
      ctx.stroke()
    }
    for (let index = 0; index < dimensions.length; index++) {
      const [px, py] = point(index, 1)
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(px, py)
      ctx.stroke()
    }
    const ratios = dimensionReport.value.map(dimension => Math.max(dimension.percent, 4) / 100)
    tracePolygon(ratios)
    ctx.fillStyle = 'rgba(45, 90, 61, 0.15)'
    ctx.fill()
    ctx.strokeStyle = '#2d5a3d'
    ctx.lineWidth = 3
    ctx.lineJoin = 'round'
    tracePolygon(ratios)
    ctx.stroke()
    ctx.fillStyle = '#2d5a3d'
    ratios.forEach((ratio, index) => {
      const [px, py] = point(index, ratio)
      ctx.beginPath()
      ctx.arc(px, py, 6, 0, Math.PI * 2)
      ctx.fill()
    })

    // 维度标签
    ctx.font = `22px ${font}`
    dimensionReport.value.forEach((dimension, index) => {
      const [px, py] = point(index, 1, r + 30)
      ctx.textAlign = px < cx - 10 ? 'right' : px > cx + 10 ? 'left' : 'center'
      const labelY = py > cy ? py + 18 : py + 4
      const text = `${dimension.label} ${dimension.percent}`
      ctx.fillStyle = '#1b2b22'
      ctx.fillText(text, px, labelY)
    })

    // 总结
    ctx.textAlign = 'center'
    ctx.fillStyle = '#5b6a60'
    ctx.font = `22px ${font}`
    const lines = wrapText(ctx, result.value.summary, 560)
    lines.slice(0, 3).forEach((line, index) => {
      ctx.fillText(line, width / 2, 792 + index * 38)
    })

    // 页脚
    ctx.fillStyle = '#8a978d'
    ctx.font = `19px ${font}`
    ctx.fillText(`ailinkstart.com · ${activeReport.value?.date || ''}`, width / 2, height - 52)

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
    if (!blob) throw new Error('canvas empty')
    return blob
}

function shareFileName() {
  return `AI能力自测-${result.value.name}-${overallScore.value}分.png`
}

function triggerDownload(blob) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = shareFileName()
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 4000)
}

async function copyShareImage() {
  if (sharing.value) return
  sharing.value = true
  try {
    // 优先直接写入剪贴板：粘贴出去就是一张图。
    // Safari 要求在用户手势内同步创建 ClipboardItem，所以图片以 Promise 形式传入。
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': buildShareBlob() })])
      flashShareState('已复制，去聊天里粘贴吧')
      return
    }
    throw new Error('clipboard image unsupported')
  } catch {
    try {
      const blob = await buildShareBlob()
      const file = new File([blob], shareFileName(), { type: 'image/png' })
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: 'AI 能力自测' })
          flashShareState('已发起分享')
        } catch (error) {
          if (error?.name !== 'AbortError') throw error
        }
      } else {
        triggerDownload(blob)
        flashShareState('无法直接复制，已下载图片')
      }
    } catch {
      flashShareState('生成失败，请重试')
    }
  } finally {
    sharing.value = false
  }
}

async function downloadShareImage() {
  if (sharing.value) return
  sharing.value = true
  try {
    triggerDownload(await buildShareBlob())
  } finally {
    sharing.value = false
  }
}

</script>

<style scoped>
.ai-quiz {
  --ink: #1b2b22;
  --muted: #5b6a60;
  --line: #dde7e0;
  --paper: #fbfaf5;
  --green: #2d5a3d;
  color: var(--ink);
  max-width: 720px;
  margin: 0 auto;
}

.ai-quiz h1 {
  margin: 0 0 16px;
  border: 0;
  padding: 0;
  font-size: 30px;
  line-height: 1.3;
}

.ai-quiz h2 {
  margin: 0 0 8px;
  border: 0;
  padding: 0;
  font-size: 20px;
  line-height: 1.5;
}

.ai-quiz h3 {
  margin: 0 0 16px;
  font-size: 17px;
}

/* 起始页 */
.intro-panel {
  padding: 16px 0 8px;
}

.intro-lead {
  margin: 0 0 16px;
  font-size: 16px;
  line-height: 1.8;
  color: var(--ink);
}

.intro-notes {
  margin: 0 0 20px;
  padding-left: 20px;
  color: var(--muted);
  font-size: 14px;
  line-height: 2;
}

.last-note {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin: 0 0 20px;
  padding: 12px 16px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--paper);
  font-size: 14px;
  color: var(--muted);
}

.last-note strong {
  color: var(--green);
}

.note-link {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  font-weight: 600;
  color: var(--green);
  cursor: pointer;
  white-space: nowrap;
}

.note-link:hover {
  text-decoration: underline;
}

/* 按钮 */
.btn-primary {
  padding: 10px 28px;
  border: 1px solid var(--green);
  border-radius: 10px;
  background: var(--green);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-ghost {
  padding: 10px 20px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: transparent;
  color: var(--muted);
  font-size: 15px;
  cursor: pointer;
}

.btn-ghost:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* 答题 */
.quiz-panel {
  padding: 16px 0 8px;
  scroll-margin-top: 90px;
}

.quiz-progress {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  font-size: 13px;
  color: var(--muted);
  white-space: nowrap;
}

.progress-track {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: var(--line);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 2px;
  background: var(--green);
  transition: width 0.25s ease;
}

.question-card {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--paper);
  padding: 24px;
}

.question-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.badge {
  padding: 3px 10px;
  border-radius: 999px;
  background: #eef5f0;
  color: var(--green);
  font-size: 12px;
  font-weight: 600;
}

.badge.light {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--muted);
  font-weight: 400;
}

.question-context {
  margin: 0 0 16px;
  font-size: 14px;
  color: var(--muted);
}

.choice-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}

.choice-btn {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 13px 16px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #fff;
  text-align: left;
  cursor: pointer;
  font: inherit;
  color: var(--ink);
}

.choice-btn:hover {
  border-color: var(--green);
}

.choice-btn.selected {
  border-color: var(--green);
  background: #eef5f0;
}

.choice-mark {
  flex: none;
  width: 20px;
  color: var(--green);
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
}

.choice-text strong {
  display: block;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
}

.quiz-nav {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

/* 报告 */
.report-panel {
  padding: 16px 0 8px;
  scroll-margin-top: 90px;
}

.report-head {
  margin-bottom: 24px;
}

.report-head p {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--muted);
}

.level-card {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--paper);
  padding: 28px 24px;
  text-align: center;
  margin-bottom: 20px;
}

.level-eyebrow {
  margin: 0 0 6px;
  font-size: 13px;
  color: var(--muted);
}

.level-card h2 {
  margin: 0 0 8px;
  font-size: 28px;
  color: var(--green);
}

.level-score {
  margin: 0 0 14px;
  font-size: 14px;
  color: var(--muted);
}

.level-score strong {
  font-size: 22px;
  color: var(--ink);
  font-weight: 700;
}

.level-summary {
  max-width: 520px;
  margin: 0 auto 24px;
  font-size: 14px;
  line-height: 1.9;
  color: var(--ink);
}

.level-track {
  display: flex;
  gap: 6px;
}

.level-seg {
  flex: 1;
}

.level-seg i {
  display: block;
  height: 6px;
  border-radius: 3px;
  background: var(--line);
}

.level-seg.filled i {
  background: var(--green);
}

.level-seg span {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: var(--muted);
}

.level-seg.current span {
  color: var(--green);
  font-weight: 700;
}

/* 五维能力图 */
.dims-card,
.path-card {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
  padding: 24px;
  margin-bottom: 20px;
}

.radar {
  display: block;
  width: 100%;
  max-width: 440px;
  margin: 0 auto 8px;
}

.radar-grid {
  fill: none;
  stroke: var(--line);
  stroke-width: 1;
}

.radar-axis {
  stroke: #eaf0eb;
  stroke-width: 1;
}

.radar-shape {
  fill: rgba(45, 90, 61, 0.14);
  stroke: var(--green);
  stroke-width: 2;
  stroke-linejoin: round;
}

.radar-dot {
  fill: var(--green);
}

.radar-label {
  font-size: 13px;
  fill: var(--ink);
}

.radar-score-text {
  font-weight: 700;
  fill: var(--green);
}

.dim-list {
  border-top: 1px solid #eef2ee;
}

.dim-item {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 12px;
  padding: 11px 0;
  border-bottom: 1px solid #eef2ee;
}

.dim-item:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.dim-item p {
  margin: 0;
  width: 100%;
  font-size: 13px;
  color: var(--muted);
}

.dim-name {
  font-size: 14px;
  font-weight: 600;
}

.dim-score {
  font-size: 13px;
  font-weight: 700;
}

.dim-score.weak { color: #9a554c; }
.dim-score.mid { color: #8f6a2f; }
.dim-score.strong { color: var(--green); }

/* 学习路径 */
.path-block {
  margin-bottom: 18px;
}

.path-block:last-child {
  margin-bottom: 0;
}

.path-label {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 600;
}

.path-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.path-links a {
  padding: 8px 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 14px;
  color: var(--green);
  text-decoration: none;
}

.path-links a:hover {
  border-color: var(--green);
  background: #eef5f0;
}

/* 报告底部 */
.report-actions {
  border-top: 1px solid var(--line);
  padding-top: 20px;
}

.retest-note {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--muted);
}

.action-btns {
  display: flex;
  gap: 12px;
}

@media (max-width: 640px) {
  .ai-quiz h1 {
    font-size: 24px;
  }

  .question-card,
  .dims-card,
  .path-card {
    padding: 18px;
  }

  .level-card {
    padding: 22px 16px;
  }

  .level-card h2 {
    font-size: 24px;
  }
}
</style>
