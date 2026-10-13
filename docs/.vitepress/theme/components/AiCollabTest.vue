<template>
  <section class="collab">
    <!-- 起始页 -->
    <div v-if="phase === 'intro'" class="intro">
      <h1>AI 协作力测评</h1>
      <p class="lead">
        测一测你对 AI 的理解，够不够你和它配合好，顺便看看你是哪一种 AI 协作者。做完你会拿到：你的协作类型、一张认知地图，以及一段可以发给任意 AI 的深度点评请求。
      </p>
      <ol class="parts">
        <li>
          <span class="part-no">1</span>
          <div>
            <strong>认知题 · 12 道</strong>
            <p>有标准答案，答完马上看解析。每次从 {{ cognitionBank.length }} 道题里抽取。</p>
          </div>
        </li>
        <li>
          <span class="part-no">2</span>
          <div>
            <strong>协作风格 · 8 道</strong>
            <p>没有对错，按你平时的真实习惯选。</p>
          </div>
        </li>
      </ol>
      <p class="fine">大约 8 分钟。答案只在你的浏览器里计算和保存，不上传。</p>
      <div v-if="lastReport" class="last-note">
        <span>上次测评（{{ lastReport.date }}）：<strong>{{ lastTypeLabel }}</strong></span>
        <button type="button" class="link-btn" @click="viewLast">查看报告 →</button>
      </div>
      <button type="button" class="btn-primary" @click="start">开始测评</button>
    </div>

    <!-- 第一段：认知题 -->
    <div v-else-if="phase === 'cognition'" ref="panel" class="panel">
      <div class="progress">
        <span class="step-name">第一部分 · 认知题</span>
        <div class="track"><div class="fill" :style="{ width: cogProgress + '%' }"></div></div>
        <span>{{ qIndex + 1 }} / {{ drawn.length }}</span>
      </div>

      <div class="q-card">
        <span class="area-tag">{{ areaMap[currentQ.area].label }}</span>
        <h2>{{ currentQ.title }}</h2>
        <p v-if="currentQ.context" class="q-context">{{ currentQ.context }}</p>

        <!-- 点出可疑句 -->
        <div v-if="currentQ.type === 'spot'" class="ai-bubble">
          <span class="bubble-label">AI 的回答</span>
          <p>
            <span
              v-for="sentence in currentQ.sentences"
              :key="sentence.id"
              role="button"
              :tabindex="currentPicked ? -1 : 0"
              :class="['sentence', optionState(currentQ, sentence)]"
              @click="pick(sentence.id)"
              @keydown.enter.prevent="pick(sentence.id)"
              @keydown.space.prevent="pick(sentence.id)"
            >{{ sentence.text }}</span>
          </p>
        </div>

        <!-- 单选 -->
        <div v-else class="choices">
          <button
            v-for="option in currentQ.options"
            :key="option.id"
            type="button"
            :class="['choice', optionState(currentQ, option)]"
            :disabled="Boolean(currentPicked)"
            @click="pick(option.id)"
          >
            <span class="choice-mark">{{ choiceMark(currentQ, option) }}</span>
            <span>{{ option.label }}</span>
          </button>
        </div>

        <div v-if="currentPicked" :class="['feedback', currentCorrect ? 'right' : 'wrong']">
          <p class="feedback-head">{{ currentCorrect ? '答对了' : '这题答错了' }}</p>
          <p v-if="!currentCorrect" class="feedback-answer">正确答案：{{ correctLabel(currentQ) }}</p>
          <p class="feedback-text">{{ currentQ.explain }}</p>
          <a class="feedback-link" :href="areaMap[currentQ.area].links[0].href" target="_blank" rel="noopener">
            延伸阅读：{{ areaMap[currentQ.area].links[0].text }}
          </a>
        </div>
      </div>

      <div class="nav">
        <span class="score-live">已答对 {{ liveCorrect }} 题</span>
        <button type="button" class="btn-primary" :disabled="!currentPicked" @click="nextQ">
          {{ qIndex < drawn.length - 1 ? '下一题' : '进入协作风格' }}
        </button>
      </div>
    </div>

    <!-- 第二段：协作风格 -->
    <div v-else-if="phase === 'style'" ref="panel" class="panel">
      <div class="progress">
        <span class="step-name">第二部分 · 协作风格</span>
        <div class="track"><div class="fill" :style="{ width: styleProgress + '%' }"></div></div>
        <span>{{ styleAnswered }} / {{ styleItems.length }}</span>
      </div>
      <p class="section-lead">每道题两边各是一种做法，都说得通。点一个位置，越靠近哪边，说明你越像哪边。</p>

      <div class="style-list">
        <div v-for="(item, index) in styleItems" :key="index" class="style-item">
          <p class="style-side left">{{ item.left }}</p>
          <div class="dots" role="radiogroup" :aria-label="`第 ${index + 1} 题`">
            <button
              v-for="value in [-2, -1, 0, 1, 2]"
              :key="value"
              type="button"
              role="radio"
              :aria-checked="styleValues[index] === value ? 'true' : 'false'"
              :aria-label="dotLabel(value)"
              :class="['dot', `d${value + 2}`, styleValues[index] === value && 'on']"
              @click="styleValues[index] = value"
            ></button>
          </div>
          <p class="style-side right">{{ item.right }}</p>
        </div>
      </div>

      <div class="nav">
        <span></span>
        <button type="button" class="btn-primary" :disabled="styleAnswered < styleItems.length" @click="finish">生成我的报告</button>
      </div>
    </div>

    <!-- 报告 -->
    <div v-else ref="panel" class="panel report">
      <p class="report-date">{{ report.date }} · AI 协作力测评报告</p>

      <!-- 类型卡 -->
      <div class="type-card">
        <p class="eyebrow">你的 AI 协作类型</p>
        <div class="type-emoji" aria-hidden="true">{{ typeInfo.emoji }}</div>
        <h2>{{ typeInfo.name }}</h2>
        <span class="family-badge">{{ familyInfo.name }} · {{ familyInfo.axes }}</span>
        <p class="tagline">{{ typeInfo.tagline }}</p>

        <div class="persona">
          <div>
            <span>名场面</span>
            <p>{{ typeInfo.scene }}</p>
          </div>
          <div>
            <span>翻车现场</span>
            <p>{{ typeInfo.crash }}</p>
          </div>
          <div>
            <span>你和 AI 像</span>
            <p>{{ typeInfo.like }}</p>
          </div>
        </div>

        <div class="axes">
          <div v-for="axis in axisReport" :key="axis.key" class="axis">
            <div class="axis-labels">
              <span :class="axis.side === 'left' && 'win'">{{ axis.left.name }}</span>
              <span class="axis-name">{{ axis.name }}</span>
              <span :class="axis.side === 'right' && 'win'">{{ axis.right.name }}</span>
            </div>
            <div class="axis-track">
              <i class="axis-mid"></i>
              <b class="axis-marker" :style="{ left: axis.position + '%' }"></b>
            </div>
            <p class="axis-percent">{{ axis.balanced ? '两边差不多' : `偏${axis.pole.name} ${axis.percent}%` }}</p>
          </div>
        </div>
      </div>

      <!-- 互补搭档 -->
      <div class="card">
        <h3>你的互补搭档</h3>
        <div class="partner-row">
          <span class="partner-emoji" aria-hidden="true">{{ partnerInfo.emoji }}</span>
          <div>
            <strong>{{ partnerInfo.name }}</strong>
            <p>{{ partnerInfo.tagline }}</p>
          </div>
        </div>
        <p class="card-lead">四个方向上你们正好相反：你偏{{ poleWords(axisReport, 'pole') }}，TA 偏{{ poleWords(axisReport, 'other') }}。找一位这样的同事一起用 AI，正好互相补上对方的盲区。</p>
      </div>

      <!-- 认知地图 -->
      <div class="card">
        <div class="card-head">
          <h3>认知地图</h3>
          <span class="big-score"><strong>{{ correctCount }}</strong> / {{ results.length }} 题答对</span>
        </div>
        <p class="cog-title">认知称号：<strong>{{ cogSummary.title }}</strong></p>
        <p class="card-lead">{{ cogSummary.text }}</p>
        <div class="tiles">
          <div v-for="area in areaReport" :key="area.key" :class="['tile', area.state]">
            <div class="tile-top">
              <strong>{{ area.label }}</strong>
              <span class="tile-state">{{ stateText[area.state] }} {{ area.correct }}/{{ area.total }}</span>
            </div>
            <p>{{ area.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 交叉洞察 -->
      <div class="card">
        <h3>把你的习惯和认知放在一起看</h3>
        <p class="card-lead">协作风格是你对自己的描述，认知题是实测。两者对得上，说明你用得有底；对不上，就是最值得注意的地方。</p>
        <div v-for="insight in insights" :key="insight.title" :class="['insight', insight.tone]">
          <strong>{{ insight.title }}</strong>
          <p>{{ insight.text }}</p>
        </div>
      </div>

      <!-- 风格解读 -->
      <div class="card">
        <h3>{{ typeInfo.name }}的四个侧面</h3>
        <div v-for="axis in axisReport" :key="axis.key" class="facet">
          <p class="facet-title">{{ axis.pole.name }}<em>{{ axis.pole.desc }}</em></p>
          <dl>
            <dt>长处</dt><dd>{{ axis.pole.strength }}</dd>
            <dt>盲区</dt><dd>{{ axis.pole.blind }}</dd>
            <dt>建议</dt><dd>{{ axis.pole.tip }}</dd>
          </dl>
        </div>
      </div>

      <!-- 错题回顾 -->
      <div class="card">
        <h3>错题回顾</h3>
        <p v-if="!wrongResults.length" class="card-lead">12 道全部答对，没有错题。</p>
        <details v-for="item in wrongResults" :key="item.q.id" class="wrong-item">
          <summary>
            <span class="area-tag small">{{ areaMap[item.q.area].short }}</span>
            {{ item.q.title }}
          </summary>
          <p class="wrong-line">你的答案：{{ pickedLabel(item.q, item.picked) }}</p>
          <p class="wrong-line right">正确答案：{{ correctLabel(item.q) }}</p>
          <p class="wrong-explain">{{ item.q.explain }}</p>
        </details>
      </div>

      <!-- 这周试一件事 -->
      <div class="card">
        <h3>这周试一件事</h3>
        <div v-for="area in focusAreas" :key="area.key" class="practice">
          <p class="practice-area">补「{{ area.label }}」</p>
          <p>{{ area.practice }}</p>
          <div class="links">
            <a v-for="link in area.links" :key="link.href + link.text" :href="link.href">{{ link.text }}</a>
          </div>
        </div>
      </div>

      <!-- AI 深度点评 -->
      <div id="ai-review" class="card review">
        <h3>让 AI 给你做一次深度点评</h3>
        <p class="card-lead">
          上面的解读是按规则生成的。我们把你的全部作答整理成了一段话，复制后发给你常用的 AI，它会结合你的类型和答错的题，指出你可能存在的误解，并先问你几个关于工作的问题，再给一份练习计划。
        </p>
        <p class="card-lead">这一步本身也是一次练习：看看它的点评哪些说到了点子上，哪些只是在客套。</p>
        <div class="review-actions">
          <button type="button" class="btn-primary" @click="copyPrompt">{{ copyLabel }}</button>
          <a v-for="tool in aiTools" :key="tool.name" class="tool-link" :href="tool.href" target="_blank" rel="noopener">{{ tool.name }} ↗</a>
        </div>
        <details class="prompt-preview">
          <summary>看看这段话的内容</summary>
          <pre>{{ reviewPrompt }}</pre>
        </details>
      </div>

      <div class="report-actions">
        <p class="fine">认知题每次随机抽取，学一段时间后可以再测一次，看看地图有没有变化。</p>
        <div class="action-btns">
          <button type="button" class="btn-primary" :disabled="sharing" @click="copyShareImage">{{ shareLabel }}</button>
          <button type="button" class="btn-ghost" :disabled="sharing" @click="downloadShareImage">下载分享图</button>
          <button type="button" class="btn-ghost" @click="start">重新测评</button>
        </div>
      </div>
    </div>

    <!-- 16 种类型一览：起始页和报告页底部都显示，报告页高亮自己的类型 -->
    <div v-if="phase === 'intro' || phase === 'report'" class="gallery">
      <h3>16 种 AI 协作类型</h3>
      <p class="card-lead">类型由四个方向组合而成：交代方式（规划 / 迭代）、信任姿态（审慎 / 信任）、分工方式（掌舵 / 放手）、使用目的（提效 / 探索）。按信任和分工，分成四个家族。</p>
      <div v-for="family in familyGroups" :key="family.key" class="family">
        <p class="family-head"><strong>{{ family.name }}</strong><span>{{ family.axes }}</span></p>
        <p class="family-desc">{{ family.desc }}</p>
        <div class="type-grid">
          <div v-for="item in family.types" :key="item.key" :class="['type-mini', item.key === highlight.key && 'mine']">
            <span v-if="item.key === highlight.key" class="mine-tag">{{ highlight.label }}</span>
            <span class="mini-emoji" aria-hidden="true">{{ item.emoji }}</span>
            <strong>{{ item.name }}</strong>
            <p>{{ item.tagline }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 分享图预览：微信/飞书内置浏览器里复制、分享、下载都不可用，直接把图片摆出来让用户长按保存 -->
    <div v-if="previewUrl" class="share-preview" role="dialog" aria-modal="true" aria-label="分享图预览" @click.self="closePreview">
      <div class="share-preview-card">
        <img :src="previewUrl" class="share-preview-img" alt="AI 协作力测评分享图" />
        <p class="share-preview-hint">{{ previewHint }}</p>
        <button ref="previewCloseBtn" type="button" class="btn-primary" @click="closePreview">关闭</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  areas, cognitionBank, styleAxes, styleItems, types, families, cognitionSummary, insightRules,
} from './aiCollabBank.js'
import { trackLearning } from './learningEvents.js'

const STORAGE_KEY = 'ai_collab_test_v1'
const PER_AREA = 2

const areaMap = Object.fromEntries(areas.map(area => [area.key, area]))
const qById = Object.fromEntries(cognitionBank.map(q => [q.id, q]))
const stateText = { solid: '扎实', partial: '有盲区', weak: '待补' }
const aiTools = [
  { name: '豆包', href: 'https://www.doubao.com/chat/' },
  { name: 'DeepSeek', href: 'https://chat.deepseek.com/' },
  { name: 'Kimi', href: 'https://www.kimi.com/' },
  { name: '元宝', href: 'https://yuanbao.tencent.com/' },
]

const phase = ref('intro')
const panel = ref(null)

// ---- 作答状态 ----
const drawn = ref([])          // 本次抽到的题（含打乱后的选项）
const picks = ref({})          // 题 id → 选中的选项 id
const qIndex = ref(0)
const styleValues = ref([])
const report = ref(null)       // 报告数据，结果页全部从这里派生
const lastReport = ref(null)

onMounted(() => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (stored?.drawn?.every(id => qById[id])) lastReport.value = stored
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

// 每块认知抽 2 道；先排一轮每块各一道，再排第二轮，避免同一块的题挨在一起
function drawQuestions() {
  const perArea = areas.map(area => shuffle(cognitionBank.filter(q => q.area === area.key)).slice(0, PER_AREA))
  const rounds = []
  for (let round = 0; round < PER_AREA; round++) {
    rounds.push(...shuffle(perArea.map(list => list[round]).filter(Boolean)))
  }
  return rounds.map(q => (q.type === 'choice' ? { ...q, options: shuffle(q.options) } : q))
}

function start() {
  drawn.value = drawQuestions()
  picks.value = {}
  qIndex.value = 0
  styleValues.value = styleItems.map(() => null)
  shareState.value = ''
  phase.value = 'cognition'
  scrollTop()
}

// ---- 认知题 ----
const currentQ = computed(() => drawn.value[qIndex.value] || { options: [], sentences: [], area: areas[0].key })
const currentPicked = computed(() => picks.value[currentQ.value.id])
const currentCorrect = computed(() => isCorrect(currentQ.value, currentPicked.value))
const cogProgress = computed(() => Math.round(((qIndex.value + (currentPicked.value ? 1 : 0)) / (drawn.value.length || 1)) * 100))
const liveCorrect = computed(() => drawn.value.filter(q => isCorrect(q, picks.value[q.id])).length)

function itemsOf(q) {
  return q.type === 'spot' ? q.sentences : q.options
}

function isCorrect(q, picked) {
  return Boolean(picked) && itemsOf(q).find(item => item.id === picked)?.correct === true
}

function correctLabel(q) {
  const item = itemsOf(q).find(entry => entry.correct)
  return item?.label || item?.text || ''
}

function pickedLabel(q, picked) {
  const item = itemsOf(q).find(entry => entry.id === picked)
  return item?.label || item?.text || '未作答'
}

function pick(id) {
  if (currentPicked.value) return
  picks.value = { ...picks.value, [currentQ.value.id]: id }
}

function optionState(q, item) {
  const picked = picks.value[q.id]
  if (!picked) return ''
  if (item.correct) return 'is-right'
  if (item.id === picked) return 'is-wrong'
  return 'is-dim'
}

function choiceMark(q, item) {
  const state = optionState(q, item)
  if (state === 'is-right') return '✓'
  if (state === 'is-wrong') return '✗'
  return '○'
}

function nextQ() {
  if (qIndex.value < drawn.value.length - 1) {
    qIndex.value++
    scrollTop()
  } else {
    phase.value = 'style'
    scrollTop()
  }
}

// ---- 协作风格 ----
const styleAnswered = computed(() => styleValues.value.filter(value => value !== null).length)
const styleProgress = computed(() => Math.round((styleAnswered.value / styleItems.length) * 100))

function dotLabel(value) {
  return ['完全像左边', '比较像左边', '两边差不多', '比较像右边', '完全像右边'][value + 2]
}

// ---- 完成 ----
function finish() {
  trackLearning('quiz-finish', 'quiz')
  const payload = {
    v: 1,
    date: new Date().toLocaleDateString('zh-CN'),
    drawn: drawn.value.map(q => q.id),
    picks: { ...picks.value },
    style: [...styleValues.value],
  }
  report.value = payload
  lastReport.value = payload
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {}
  phase.value = 'report'
  scrollTop()
}

function viewLast() {
  report.value = lastReport.value
  phase.value = 'report'
  scrollTop()
}

async function scrollTop() {
  await nextTick()
  panel.value?.scrollIntoView({ behavior: 'auto', block: 'start' })
}

// ---- 报告：全部从 report 派生 ----
const results = computed(() => (report.value?.drawn || []).map(id => {
  const q = qById[id]
  const picked = report.value.picks[id]
  return { q, picked, correct: isCorrect(q, picked) }
}))
const correctCount = computed(() => results.value.filter(item => item.correct).length)
const wrongResults = computed(() => results.value.filter(item => !item.correct))
const cogSummary = computed(() => cognitionSummary(correctCount.value, results.value.length))

const areaReport = computed(() => areas.map(area => {
  const list = results.value.filter(item => item.q.area === area.key)
  const correct = list.filter(item => item.correct).length
  const state = correct === list.length ? 'solid' : correct === 0 ? 'weak' : 'partial'
  return { ...area, total: list.length, correct, state }
}))

function axisFromValues(axis, values) {
  const sum = values.reduce((total, value) => total + (value || 0), 0)
  const max = values.length * 2
  // 打平时看第一道非零作答，全为零就算左边
  const tiebreak = values.find(value => value) || -1
  const side = sum < 0 || (sum === 0 && tiebreak < 0) ? 'left' : 'right'
  return {
    ...axis,
    side,
    pole: axis[side],
    balanced: sum === 0,
    percent: Math.round(50 + (Math.abs(sum) / max) * 50),
    position: Math.round(((sum + max) / (max * 2)) * 100),
  }
}

function buildAxes(styleList) {
  return styleAxes.map(axis => {
    const values = styleItems.map((item, index) => (item.axis === axis.key ? styleList[index] : null)).filter(value => value !== null)
    return axisFromValues(axis, values)
  })
}

// 类型键由四条轴所在一侧的字拼成，只在内部用，不展示给读者
function typeKeyOf(axisList, which = 'pole') {
  return axisList.map(axis => (which === 'pole' ? axis.pole : axis[axis.side === 'left' ? 'right' : 'left']).char).join('')
}

const axisReport = computed(() => buildAxes(report.value?.style || []))
const typeKey = computed(() => typeKeyOf(axisReport.value))
const typeInfo = computed(() => types[typeKey.value] || {})
const familyInfo = computed(() => families.find(family => family.key === typeInfo.value.family) || {})
// 互补搭档：四条轴全部反过来的那一型
const partnerInfo = computed(() => types[typeKeyOf(axisReport.value, 'other')] || {})
const lastTypeKey = computed(() => (lastReport.value ? typeKeyOf(buildAxes(lastReport.value.style)) : ''))
const lastTypeLabel = computed(() => {
  const info = types[lastTypeKey.value]
  return info ? `${info.emoji} ${info.name}` : ''
})

function poleWords(axisList, which) {
  return axisList
    .map(axis => (which === 'pole' ? axis.pole : axis[axis.side === 'left' ? 'right' : 'left']).name.replace('型', ''))
    .join('、')
}

const familyGroups = families.map(family => ({
  ...family,
  types: Object.entries(types).filter(([, info]) => info.family === family.key).map(([key, info]) => ({ key, ...info })),
}))
const highlight = computed(() => {
  if (phase.value === 'report') return { key: typeKey.value, label: '你' }
  if (lastTypeKey.value) return { key: lastTypeKey.value, label: '上次' }
  return { key: '', label: '' }
})


const insights = computed(() => {
  const ctx = {
    pole: Object.fromEntries(axisReport.value.map(axis => [axis.key, axis.side])),
    solid: Object.fromEntries(areaReport.value.map(area => [area.key, area.state === 'solid'])),
  }
  return insightRules
    .filter(rule => rule.when(ctx))
    .slice(0, 3)
})

// 这周练什么：取答得最差的两块；全对就给 Agent 那块（往前走一步）
const focusAreas = computed(() => {
  const weak = [...areaReport.value]
    .filter(area => area.state !== 'solid')
    .sort((a, b) => a.correct / a.total - b.correct / b.total)
    .slice(0, 2)
  return weak.length ? weak : [areaMap.agent]
})

// ---- 发给 AI 的深度点评请求 ----
const reviewPrompt = computed(() => {
  if (!report.value) return ''
  const lines = []
  lines.push('我刚做完一份「AI 协作力测评」，下面是我的结果。请你作为一位直率的 AI 使用教练，帮我做一次深度点评。')
  lines.push('')
  lines.push('## 我的协作风格（自评）')
  lines.push(`类型：${typeInfo.value.name}（${familyInfo.value.name}）。${typeInfo.value.tagline}`)
  for (const axis of axisReport.value) {
    const lean = axis.balanced ? '两边差不多' : `偏${axis.pole.name} ${axis.percent}%`
    lines.push(`- ${axis.name}：${lean}。${axis.pole.desc}`)
  }
  lines.push('')
  lines.push('## 认知题（实测）')
  lines.push(`共 ${results.value.length} 题，答对 ${correctCount.value} 题。`)
  const weakAreas = areaReport.value.filter(area => area.state !== 'solid').map(area => area.label)
  if (weakAreas.length) lines.push(`有失分的板块：${weakAreas.join('、')}`)
  if (wrongResults.value.length) {
    lines.push('我答错的题：')
    wrongResults.value.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.q.title}`)
      lines.push(`   我的答案：${pickedLabel(item.q, item.picked)}`)
      lines.push(`   正确答案：${correctLabel(item.q)}`)
    })
  } else {
    lines.push('全部答对。')
  }
  lines.push('')
  lines.push('## 请你这样点评')
  let n = 1
  lines.push(`${n++}. 用三句话说说我和 AI 协作的特点，以及我最大的风险在哪里。重点对比我的「自评风格」和「实测表现」，指出两者对不上的地方。`)
  if (wrongResults.value.length) lines.push(`${n++}. 针对我答错的题，分析我背后可能有哪种误解，不要只重复正确答案。`)
  lines.push(`${n++}. 给练习建议之前，先问我两个关于我日常工作的问题。等我回答后，再给我一个两周、每天十分钟以内的练习计划。`)
  lines.push('')
  lines.push('要求：说人话，直接指出问题，不要客套，也不要夸我。')
  return lines.join('\n')
})

const copyLabel = ref('复制这段话')
async function copyPrompt() {
  let ok = false
  try {
    await navigator.clipboard.writeText(reviewPrompt.value)
    ok = true
  } catch {
    // 旧浏览器 / 内置浏览器：退回到隐藏 textarea + execCommand
    try {
      const area = document.createElement('textarea')
      area.value = reviewPrompt.value
      area.setAttribute('readonly', '')
      area.style.position = 'fixed'
      area.style.opacity = '0'
      document.body.appendChild(area)
      area.select()
      ok = document.execCommand('copy')
      document.body.removeChild(area)
    } catch {}
  }
  copyLabel.value = ok ? '已复制，去 AI 里粘贴吧' : '复制失败，请展开下方手动复制'
  window.setTimeout(() => { copyLabel.value = '复制这段话' }, 3000)
}

// ---- 分享图 ----
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

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

async function buildShareBlob() {
  const width = 750
  const height = 1100
  const scale = 2
  const canvas = document.createElement('canvas')
  canvas.width = width * scale
  canvas.height = height * scale
  const ctx = canvas.getContext('2d')
  ctx.scale(scale, scale)
  const font = '-apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
  const green = '#2d5a3d'
  const ink = '#1b2b22'
  const muted = '#5b6a60'

  ctx.fillStyle = '#fbfaf5'
  ctx.fillRect(0, 0, width, height)
  ctx.strokeStyle = '#dde7e0'
  ctx.lineWidth = 2
  ctx.strokeRect(18, 18, width - 36, height - 36)

  ctx.textAlign = 'center'
  ctx.fillStyle = muted
  ctx.font = `20px ${font}`
  ctx.fillText('AI 学习知识库 · AI 协作力测评', width / 2, 80)
  ctx.fillText('我的 AI 协作类型', width / 2, 140)

  ctx.font = `68px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", ${font}`
  ctx.fillText(typeInfo.value.emoji || '', width / 2, 232)

  ctx.fillStyle = green
  ctx.font = `bold 56px ${font}`
  ctx.fillText(typeInfo.value.name || '', width / 2, 312)

  ctx.fillStyle = muted
  ctx.font = `20px ${font}`
  ctx.fillText(`${familyInfo.value.name} · ${familyInfo.value.axes}`, width / 2, 352)

  ctx.fillStyle = ink
  ctx.font = `22px ${font}`
  wrapText(ctx, typeInfo.value.tagline || '', 560).slice(0, 2).forEach((line, index) => {
    ctx.fillText(line, width / 2, 398 + index * 34)
  })

  // 四条轴
  let y = 490
  for (const axis of axisReport.value) {
    ctx.font = `20px ${font}`
    ctx.textAlign = 'left'
    ctx.fillStyle = axis.side === 'left' ? green : muted
    ctx.fillText(axis.left.name, 90, y)
    ctx.textAlign = 'right'
    ctx.fillStyle = axis.side === 'right' ? green : muted
    ctx.fillText(axis.right.name, width - 90, y)
    ctx.textAlign = 'center'
    ctx.fillStyle = muted
    ctx.font = `17px ${font}`
    ctx.fillText(axis.name, width / 2, y)
    const trackX = 90
    const trackW = width - 180
    ctx.fillStyle = '#e4ebe5'
    roundRect(ctx, trackX, y + 14, trackW, 8, 4)
    ctx.fill()
    ctx.fillStyle = green
    ctx.beginPath()
    ctx.arc(trackX + (trackW * axis.position) / 100, y + 18, 10, 0, Math.PI * 2)
    ctx.fill()
    y += 74
  }

  // 认知地图
  y += 20
  ctx.textAlign = 'center'
  ctx.fillStyle = ink
  ctx.font = `bold 26px ${font}`
  ctx.fillText(`认知称号：${cogSummary.value.title} · 答对 ${correctCount.value}/${results.value.length}`, width / 2, y)
  y += 36
  const colors = { solid: ['#e3efe6', green], partial: ['#f5ecdc', '#8f6a2f'], weak: ['#f5e3e0', '#9a554c'] }
  const chipW = 180
  const chipH = 64
  const chipGap = 16
  const startX = (width - (chipW * 3 + chipGap * 2)) / 2
  areaReport.value.forEach((area, index) => {
    const cx = startX + (index % 3) * (chipW + chipGap)
    const cy = y + Math.floor(index / 3) * (chipH + chipGap)
    const [bg, fg] = colors[area.state]
    ctx.fillStyle = bg
    roundRect(ctx, cx, cy, chipW, chipH, 10)
    ctx.fill()
    ctx.fillStyle = ink
    ctx.font = `19px ${font}`
    ctx.fillText(area.label, cx + chipW / 2, cy + 27)
    ctx.fillStyle = fg
    ctx.font = `bold 16px ${font}`
    ctx.fillText(stateText[area.state], cx + chipW / 2, cy + 50)
  })

  ctx.fillStyle = '#8a978d'
  ctx.font = `19px ${font}`
  ctx.fillText(`ailinkstart.com · ${report.value?.date || ''}`, width / 2, height - 50)

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
  if (!blob) throw new Error('canvas empty')
  return blob
}

function shareFileName() {
  return `AI协作力测评-${typeInfo.value.name || '结果'}.png`
}

function triggerDownload(blob) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = shareFileName()
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 4000)
}

// 微信 / 飞书 / 钉钉内置浏览器：剪贴板写图片、系统分享、<a download> 基本都不生效（而且不报错），
// 只能把图片展示出来让用户长按保存
function isInAppBrowser() {
  return /MicroMessenger|Lark|Feishu|DingTalk/i.test(navigator.userAgent || '')
}

const previewUrl = ref('')
const previewCloseBtn = ref(null)
const previewHint = computed(() =>
  (typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches)
    ? '长按图片保存，或直接转发给朋友'
    : '右键图片「另存为」即可保存'
)

function blobToDataUrl(blob) {
  // 用 data URL 而不是 blob: 链接，微信长按「保存图片」认不出 blob: 地址
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

function onPreviewKeydown(event) {
  if (event.key === 'Escape') closePreview()
}

async function openPreview(blob) {
  previewUrl.value = await blobToDataUrl(blob)
  window.addEventListener('keydown', onPreviewKeydown)
  await nextTick()
  previewCloseBtn.value?.focus()
}

function closePreview() {
  previewUrl.value = ''
  window.removeEventListener('keydown', onPreviewKeydown)
}

onBeforeUnmount(() => window.removeEventListener('keydown', onPreviewKeydown))

async function copyShareImage() {
  if (sharing.value) return
  sharing.value = true
  try {
    if (isInAppBrowser()) {
      await openPreview(await buildShareBlob())
      return
    }
    // Safari 要求在用户手势内同步创建 ClipboardItem，所以图片以 Promise 形式传入
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': buildShareBlob() })])
        flashShareState('已复制，去聊天里粘贴吧')
        return
      } catch {}
    }
    const blob = await buildShareBlob()
    const file = new File([blob], shareFileName(), { type: 'image/png' })
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'AI 协作力测评' })
        flashShareState('已发起分享')
        return
      } catch (error) {
        if (error?.name === 'AbortError') return
      }
    }
    await openPreview(blob)
  } catch {
    flashShareState('生成失败，请重试')
  } finally {
    sharing.value = false
  }
}

async function downloadShareImage() {
  if (sharing.value) return
  sharing.value = true
  try {
    const blob = await buildShareBlob()
    if (isInAppBrowser()) await openPreview(blob)
    else triggerDownload(blob)
  } catch {
    flashShareState('生成失败，请重试')
  } finally {
    sharing.value = false
  }
}
</script>

<style scoped>
.collab {
  --ink: #1b2b22;
  --muted: #5b6a60;
  --line: #dde7e0;
  --paper: #fbfaf5;
  --soft: #eef5f0;
  --green: #2d5a3d;
  --red: #9a554c;
  --red-soft: #f8ebe8;
  --amber: #8f6a2f;
  --amber-soft: #f7efe0;
  --green-soft: #e8f2eb;
  color: var(--ink);
  max-width: 720px;
  margin: 0 auto;
}

/* 深色模式：只覆盖组件内 token。Canvas 分享图保持浅色，它是导出图片 */
.dark .collab {
  --ink: #d6e0db;
  --muted: #a3b3aa;
  --line: #2f4438;
  --paper: #1f2e24;
  --soft: #24382b;
  --green: #6dbf8a;
  --red: #e0928a;
  --red-soft: #3a2724;
  --amber: #d6ad6a;
  --amber-soft: #352d1f;
  --green-soft: #22382a;
}

.collab h1 { margin: 0 0 14px; border: 0; padding: 0; font-size: 30px; line-height: 1.3; }
.collab h2 { margin: 10px 0 8px; border: 0; padding: 0; font-size: 19px; line-height: 1.6; color: var(--ink); }
.collab h3 { margin: 0 0 12px; font-size: 17px; }
.collab p { margin: 0; }

/* 按钮 */
.btn-primary {
  padding: 10px 26px;
  border: 1px solid var(--green);
  border-radius: 10px;
  background: var(--green);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.dark .btn-primary { color: #10251a; }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-ghost {
  padding: 10px 20px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: transparent;
  color: var(--muted);
  font-size: 15px;
  cursor: pointer;
}
.btn-ghost:disabled { opacity: 0.4; cursor: not-allowed; }
.link-btn {
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  font-weight: 600;
  color: var(--green);
  cursor: pointer;
  white-space: nowrap;
}

/* 起始页 */
.intro { padding: 16px 0 8px; }
.lead { font-size: 16px; line-height: 1.85; margin-bottom: 22px !important; }
.parts { list-style: none; margin: 0 0 18px; padding: 0; display: grid; gap: 10px; }
.parts li {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  margin: 0;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--paper);
}
.part-no {
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--soft);
  color: var(--green);
  font-weight: 700;
  display: grid;
  place-items: center;
}
.parts strong { font-size: 15px; }
.parts p { font-size: 14px; color: var(--muted); margin-top: 2px; }
.fine { font-size: 13px; color: var(--muted); margin-bottom: 18px !important; }
.last-note {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin-bottom: 18px;
  padding: 12px 16px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--paper);
  font-size: 14px;
  color: var(--muted);
}
.last-note strong { color: var(--green); }

/* 通用面板 */
.panel { padding: 16px 0 8px; scroll-margin-top: 90px; }
.progress {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  font-size: 13px;
  color: var(--muted);
  white-space: nowrap;
}
.step-name { font-weight: 600; color: var(--green); }
.track { flex: 1; height: 4px; border-radius: 2px; background: var(--line); overflow: hidden; }
.fill { height: 100%; background: var(--green); transition: width 0.25s ease; }
.nav { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 18px; }
.score-live { font-size: 13px; color: var(--muted); }
.section-lead { font-size: 14px; color: var(--muted); line-height: 1.8; margin-bottom: 14px !important; }

/* 题卡 */
.q-card { border: 1px solid var(--line); border-radius: 12px; background: var(--paper); padding: 22px; }
.area-tag {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--soft);
  color: var(--green);
  font-size: 12px;
  font-weight: 600;
}
.area-tag.small { padding: 1px 8px; margin-right: 6px; font-size: 11px; }
.q-context { font-size: 14px; color: var(--muted); margin-bottom: 4px !important; }

.choices { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
.choice {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 15px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: transparent;
  text-align: left;
  font: inherit;
  font-size: 15px;
  line-height: 1.6;
  color: var(--ink);
  cursor: pointer;
}
.choice:not(:disabled):hover { border-color: var(--green); }
.choice:disabled { cursor: default; }
.choice-mark { flex: none; width: 18px; text-align: center; color: var(--muted); }
.choice.is-right { border-color: var(--green); background: var(--green-soft); }
.choice.is-right .choice-mark { color: var(--green); font-weight: 700; }
.choice.is-wrong { border-color: var(--red); background: var(--red-soft); }
.choice.is-wrong .choice-mark { color: var(--red); font-weight: 700; }
.choice.is-dim { opacity: 0.55; }

/* 点可疑句 */
.ai-bubble {
  margin-top: 16px;
  padding: 16px 18px;
  border-radius: 4px 14px 14px 14px;
  background: var(--soft);
  font-size: 15px;
  line-height: 2;
}
.bubble-label { display: block; font-size: 12px; color: var(--muted); margin-bottom: 4px; }
.sentence {
  padding: 2px 3px;
  border-radius: 4px;
  cursor: pointer;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  transition: background 0.15s;
}
.sentence:hover:not(.is-right):not(.is-wrong):not(.is-dim) { background: rgba(45, 90, 61, 0.14); }
.sentence:focus-visible { outline: 2px solid var(--green); }
.sentence.is-right { background: var(--green-soft); color: var(--green); font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }
.sentence.is-wrong { background: var(--red-soft); color: var(--red); text-decoration: line-through; }
.sentence.is-dim { cursor: default; opacity: 0.65; }

/* 解析 */
.feedback { margin-top: 16px; padding: 14px 16px; border-radius: 10px; border-left: 4px solid; }
.feedback.right { border-color: var(--green); background: var(--green-soft); }
.feedback.wrong { border-color: var(--red); background: var(--red-soft); }
.feedback-head { font-weight: 700; margin-bottom: 4px !important; }
.feedback.right .feedback-head { color: var(--green); }
.feedback.wrong .feedback-head { color: var(--red); }
.feedback-answer { font-size: 14px; font-weight: 600; margin-bottom: 6px !important; }
.feedback-text { font-size: 14px; line-height: 1.85; }
.feedback-link { display: inline-block; margin-top: 8px; font-size: 13px; color: var(--green); }

/* 协作风格 */
.style-list { display: flex; flex-direction: column; }
.style-item {
  display: grid;
  grid-template-columns: 1fr 190px 1fr;
  align-items: center;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
}
.style-side { font-size: 14px; line-height: 1.65; }
.style-side.left { text-align: right; }
.dots { display: flex; align-items: center; justify-content: space-between; }
.dot {
  padding: 0;
  border-radius: 50%;
  border: 2px solid;
  background: transparent;
  cursor: pointer;
  transition: background 0.15s, transform 0.15s;
}
.dot:hover { transform: scale(1.12); }
.dot.d0, .dot.d4 { width: 32px; height: 32px; }
.dot.d1, .dot.d3 { width: 25px; height: 25px; }
.dot.d2 { width: 18px; height: 18px; }
.dot.d0, .dot.d1 { border-color: var(--green); }
.dot.d3, .dot.d4 { border-color: var(--amber); }
.dot.d2 { border-color: var(--muted); }
.dot.on.d0, .dot.on.d1 { background: var(--green); }
.dot.on.d3, .dot.on.d4 { background: var(--amber); }
.dot.on.d2 { background: var(--muted); }

/* 报告 */
.report-date { font-size: 13px; color: var(--muted); margin-bottom: 12px !important; }
.type-card {
  padding: 28px 24px 22px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--paper);
  text-align: center;
  margin-bottom: 18px;
}
.eyebrow { font-size: 13px; color: var(--muted); }
.type-emoji { margin: 14px 0 0; font-size: 56px; line-height: 1.2; }
.type-card h2 { margin: 6px 0 8px; font-size: 32px; color: var(--green); }
.family-badge {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 999px;
  background: var(--soft);
  color: var(--green);
  font-size: 13px;
  font-weight: 600;
}
.type-card .tagline { margin-top: 12px !important; }
.persona {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 0 0 24px;
  text-align: left;
}
.persona div { padding: 12px 14px; border-radius: 10px; background: var(--soft); }
.persona span { display: block; margin-bottom: 4px; font-size: 12px; font-weight: 700; color: var(--green); }
.persona p { font-size: 14px; line-height: 1.7; }
.tagline { font-size: 15px; line-height: 1.8; max-width: 480px; margin: 0 auto 22px !important; }
.axes { display: grid; gap: 14px; text-align: left; }
.axis-labels { display: flex; justify-content: space-between; font-size: 14px; color: var(--muted); }
.axis-labels .win { color: var(--green); font-weight: 700; }
.axis-name { font-size: 12px; }
.axis-track { position: relative; height: 8px; margin: 6px 0 4px; border-radius: 4px; background: var(--line); }
.axis-mid { position: absolute; left: 50%; top: -3px; width: 1px; height: 14px; background: var(--muted); opacity: 0.4; }
.axis-marker {
  position: absolute;
  top: 50%;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--green);
  border: 3px solid var(--paper);
  transform: translate(-50%, -50%);
}
.axis-percent { font-size: 12px; color: var(--muted); text-align: center; }

.card { border: 1px solid var(--line); border-radius: 12px; background: var(--paper); padding: 22px; margin-bottom: 18px; }
.card-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.big-score { font-size: 14px; color: var(--muted); }
.big-score strong { font-size: 24px; color: var(--green); }
.partner-row { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
.partner-emoji { font-size: 40px; line-height: 1; }
.partner-row strong { font-size: 17px; color: var(--green); }
.partner-row p { font-size: 14px; color: var(--muted); margin-top: 2px !important; }
.cog-title { font-size: 15px; margin: 4px 0 6px !important; }
.cog-title strong { color: var(--green); font-size: 17px; }
.card-lead { font-size: 14px; color: var(--muted); line-height: 1.8; margin-bottom: 14px !important; }

.tiles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.tile { padding: 12px 14px; border-radius: 10px; border: 1px solid; }
.tile.solid { border-color: transparent; background: var(--green-soft); }
.tile.partial { border-color: transparent; background: var(--amber-soft); }
.tile.weak { border-color: transparent; background: var(--red-soft); }
.tile-top { display: flex; flex-direction: column; gap: 2px; margin-bottom: 6px; }
.tile-top strong { font-size: 14px; }
.tile-state { font-size: 12px; font-weight: 700; }
.tile.solid .tile-state { color: var(--green); }
.tile.partial .tile-state { color: var(--amber); }
.tile.weak .tile-state { color: var(--red); }
.tile p { font-size: 12px; color: var(--muted); line-height: 1.6; }

.insight { padding: 12px 16px; border-radius: 10px; border-left: 4px solid; margin-bottom: 10px; }
.insight:last-child { margin-bottom: 0; }
.insight.warn { border-color: var(--amber); background: var(--amber-soft); }
.insight.good { border-color: var(--green); background: var(--green-soft); }
.insight strong { display: block; font-size: 15px; margin-bottom: 4px; }
.insight p { font-size: 14px; line-height: 1.85; }

.facet { padding: 14px 0; border-top: 1px solid var(--line); }
.facet:first-of-type { border-top: 0; padding-top: 0; }
.facet-title { font-weight: 700; font-size: 15px; margin-bottom: 8px !important; }
.facet-title em { font-style: normal; font-weight: 400; color: var(--muted); font-size: 14px; margin-left: 8px; }
.facet dl { display: grid; grid-template-columns: 40px 1fr; gap: 6px 10px; margin: 0; font-size: 14px; line-height: 1.75; }
.facet dt { color: var(--muted); font-weight: 600; }
.facet dd { margin: 0; }

.wrong-item { border-top: 1px solid var(--line); padding: 12px 0; font-size: 14px; }
.wrong-item:first-of-type { border-top: 0; }
.wrong-item summary { cursor: pointer; font-weight: 600; line-height: 1.7; }
.wrong-line { margin-top: 8px !important; color: var(--red); }
.wrong-line.right { margin-top: 2px !important; color: var(--green); }
.wrong-explain { margin-top: 8px !important; color: var(--muted); line-height: 1.85; }

.practice { padding: 12px 0; border-top: 1px solid var(--line); }
.practice:first-of-type { border-top: 0; padding-top: 0; }
.practice-area { font-weight: 700; color: var(--green); margin-bottom: 4px !important; font-size: 14px; }
.practice p { font-size: 14px; line-height: 1.8; }
.links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
.links a {
  padding: 6px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 13px;
  color: var(--green);
  text-decoration: none;
}
.links a:hover { border-color: var(--green); }

.review { border: 2px solid var(--green); }
.review-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.tool-link {
  padding: 8px 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  font-size: 14px;
  color: var(--ink);
  text-decoration: none;
}
.tool-link:hover { border-color: var(--green); color: var(--green); }
.prompt-preview { margin-top: 14px; font-size: 14px; }
.prompt-preview summary { cursor: pointer; color: var(--muted); }
.prompt-preview pre {
  margin: 10px 0 0;
  padding: 14px;
  max-height: 320px;
  overflow: auto;
  border-radius: 8px;
  background: var(--soft);
  font-family: inherit;
  font-size: 13px;
  line-height: 1.75;
  white-space: pre-wrap;
  color: var(--ink);
}

.report-actions { border-top: 1px solid var(--line); padding-top: 18px; }
.action-btns { display: flex; flex-wrap: wrap; gap: 10px; }

/* 16 种类型一览 */
.gallery { margin-top: 36px; padding-top: 24px; border-top: 1px solid var(--line); }
.family { margin-top: 20px; }
.family-head { display: flex; align-items: baseline; gap: 10px; }
.family-head strong { font-size: 16px; color: var(--green); }
.family-head span { font-size: 12px; color: var(--muted); }
.family-desc { font-size: 13px; color: var(--muted); margin: 2px 0 10px !important; }
.type-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.type-mini {
  position: relative;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--paper);
}
.type-mini.mine { border: 2px solid var(--green); background: var(--green-soft); }
.mini-emoji { display: block; font-size: 24px; line-height: 1.3; }
.type-mini strong { display: block; margin: 4px 0 2px; font-size: 14px; }
.type-mini p { font-size: 12px; color: var(--muted); line-height: 1.6; }
.mine-tag {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 1px 8px;
  border-radius: 999px;
  background: var(--green);
  color: var(--paper);
  font-size: 11px;
  font-weight: 700;
}

/* 分享图预览浮层 */
.share-preview {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(10, 18, 12, 0.72);
}
.share-preview-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  max-width: 420px;
  width: 100%;
  max-height: 100%;
  padding: 16px;
  border-radius: 14px;
  background: var(--kb-surface, #fff);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}
.share-preview-img {
  display: block;
  min-height: 0;
  max-width: 100%;
  max-height: calc(100dvh - 170px);
  border-radius: 8px;
  border: 1px solid var(--line);
  -webkit-touch-callout: default;
  user-select: auto;
}
.share-preview-hint { font-size: 15px; font-weight: 600; color: var(--ink); }

@media (max-width: 640px) {
  .collab h1 { font-size: 25px; }
  .q-card, .card { padding: 18px; }
  .type-card { padding: 22px 16px 18px; }
  .type-card h2 { font-size: 28px; }
  .tiles { grid-template-columns: repeat(2, 1fr); }
  .persona { grid-template-columns: 1fr; }
  .type-grid { grid-template-columns: repeat(2, 1fr); }
  .style-item { grid-template-columns: 1fr 1fr; grid-template-areas: 'l r' 'd d'; gap: 10px 14px; }
  .style-side.left { grid-area: l; text-align: left; }
  .style-side.right { grid-area: r; text-align: right; }
  .dots { grid-area: d; padding: 0 6px; }
  .style-side { font-size: 13px; }
}
</style>
