<script setup>
import { computed, nextTick, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { trackLearning } from './learningEvents.js'
import { caseSourceName } from '../../caseSources.js'
const props = defineProps({ item: { type: Object, required: true } })
const item = computed(() => props.item)
const language = ref('zh')
const expanded = ref(false)
const promptBox = ref(null)
const needsExpansion = ref(false)
let resizeObserver
const measure = () => { needsExpansion.value = (promptBox.value?.scrollHeight || 0) > 362 }
onMounted(() => { measure(); resizeObserver = new ResizeObserver(measure); if (promptBox.value) resizeObserver.observe(promptBox.value) })
onBeforeUnmount(() => { resizeObserver?.disconnect(); clearTimeout(copiedTimer) })
const status = ref('')
// 按钮自身显示复制结果：copied 记录是哪个按钮、成功还是失败，约 2 秒后恢复原文案
const copied = ref({ key: '', ok: true })
let copiedTimer
const manual = ref('')
const manualBox = ref(null)
const prompt = computed(() => language.value === 'zh' ? item.value.promptZh : item.value.promptOriginal)
const segments = computed(() => {
  if (!item.value.promptParts) return []
  return item.value.promptParts.map(p => ({ title: p.title, text: language.value === 'zh' ? p.zh : p.original }))
})
watch(prompt, () => nextTick(measure))
function switchLanguage(value) {
  language.value = value
  expanded.value = false
  status.value = ''
  manual.value = ''
  copied.value = { key: '', ok: true }
}
function flash(key, ok) {
  clearTimeout(copiedTimer)
  copied.value = { key, ok }
  // 失败时下方有手动复制框，提示多停留一会儿
  copiedTimer = setTimeout(() => { copied.value = { key: '', ok: true } }, ok ? 2000 : 4000)
}
function label(key, normal) {
  if (copied.value.key !== key) return normal
  return copied.value.ok ? '已复制 ✓' : '复制失败，请手动复制 ↓'
}
async function copy(text = prompt.value, key = 'main') {
  manual.value = ''
  try {
    await navigator.clipboard.writeText(text)
    trackLearning('case-copy', item.value.category)
    status.value = '已复制完整内容。'
    flash(key, true)
  } catch {
    manual.value = text
    flash(key, false)
    await nextTick()
    manualBox.value?.focus()
    manualBox.value?.select()
    status.value = '自动复制未成功，内容已在下方选中，请长按或使用系统复制。'
  }
}
function download() {
  const c = item.value
  const content = `${c.title}\n\n适用场景\n${c.use}\n\n开始前准备\n${c.preparation}\n\n本站整理的操作建议\n${c.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n值得学习的写法\n${c.lesson}\n\n改成自己的内容\n${c.exercise}\n\n${c.translationNote}\n${c.promptZh}\n\n作者完整原文${c.contentKind === 'code' ? '（源码）' : ''}\n${c.promptOriginal}\n\n作者：${c.creator}\n${caseSourceName(c)}：${c.url}\n原始出处：${c.sourceUrl || c.url}\n整理日期：${c.capturedAt}\n`
  const url = URL.createObjectURL(new Blob(['\ufeff', content], { type: 'text/plain;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${c.title}.txt`
  document.body.append(a)
  a.click()
  trackLearning('case-download', c.category)
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
</script>
<template>
  <div v-if="item" class="case-prompt-block">
    <div class="case-prompt-toolbar">
      <div class="case-language" aria-label="提示词语言">
        <button type="button" :aria-pressed="language === 'zh'" @click="switchLanguage('zh')">{{ item.sourcePromptStatus === 'excerpt' ? '中文节选' : item.contentKind === 'code' ? '中文使用指令' : '中文提示词' }}</button>
        <button type="button" :aria-pressed="language === 'original'" @click="switchLanguage('original')">{{ item.sourcePromptStatus === 'excerpt' ? '作者原文节选' : item.contentKind === 'code' ? '完整源码' : '作者原文' }}</button>
      </div>
      <button type="button" class="case-button case-primary case-copy-button" :class="{ 'is-copied': copied.key === 'main' && copied.ok, 'is-failed': copied.key === 'main' && !copied.ok }" @click="copy()">{{ label('main', '复制完整内容') }}</button>
    </div>
    <p class="case-prompt-note">{{ language === 'zh' ? item.translationNote : `${caseSourceName(item)} 收录的 ${item.creator} ${item.sourcePromptStatus === 'excerpt' ? '公开节选，末尾存在截断' : '原文'}，保留原样。` }}</p>
    <pre ref="promptBox" class="case-prompt-content" :class="{ 'is-collapsed': needsExpansion && !expanded }" tabindex="0" aria-label="完整可复制内容">{{ prompt }}</pre>
    <button v-if="needsExpansion" type="button" class="case-expand" :aria-expanded="expanded" @click="expanded = !expanded">{{ expanded ? '收起长内容 ↑' : '展开阅读全文 ↓' }}</button>
    <div v-if="segments.length" class="case-segments"><span>按分镜分别复制：</span><button v-for="s in segments" :key="s.title" type="button" class="case-button" @click="copy(s.text, 'segment:' + s.title)">{{ label('segment:' + s.title, s.title) }}</button></div>
    <p v-if="item.contentKind === 'code'" class="case-code-note">源码是交给 AI 编程工具的素材。可以将中文指令和源码一起复制，让 AI 接入你的项目。</p>
    <div class="case-prompt-footer">
      <button v-if="item.contentKind === 'code'" type="button" class="case-button" @click="copy(item.promptZh + '\n\n以下为组件源码：\n' + item.promptOriginal, 'code')">{{ label('code', '一起复制指令与源码') }}</button>
      <button type="button" class="case-download" @click="download">下载完整案例笔记 ↓</button>
    </div>
    <!-- 成功结果已显示在按钮上，这里只留给读屏软件；失败时紧挨手动复制框，保持可见 -->
    <p class="case-copy-status" :class="{ 'is-sr-only': !manual }" role="status" aria-live="polite">{{ status }}</p>
    <textarea v-if="manual" ref="manualBox" :value="manual" readonly aria-label="手动复制内容" class="case-manual-copy" />
  </div>
</template>
