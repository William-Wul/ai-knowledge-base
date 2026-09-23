<script setup>
import { computed, nextTick, ref, onMounted, onBeforeUnmount, watch } from 'vue'
const props = defineProps({ item: { type: Object, required: true } })
const item = computed(() => props.item)
const language = ref('zh')
const expanded = ref(false)
const promptBox = ref(null)
const needsExpansion = ref(false)
let resizeObserver
const measure = () => { needsExpansion.value = (promptBox.value?.scrollHeight || 0) > 362 }
onMounted(() => { measure(); resizeObserver = new ResizeObserver(measure); if (promptBox.value) resizeObserver.observe(promptBox.value) })
onBeforeUnmount(() => resizeObserver?.disconnect())
const status = ref('')
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
}
async function copy(text = prompt.value) {
  manual.value = ''
  try {
    await navigator.clipboard.writeText(text)
    status.value = '已复制完整内容。'
  } catch {
    manual.value = text
    await nextTick()
    manualBox.value?.focus()
    manualBox.value?.select()
    status.value = '自动复制未成功，内容已选中，请使用系统复制。'
  }
}
function download() {
  const c = item.value
  const content = `${c.title}\n\n适用场景\n${c.use}\n\n开始前准备\n${c.preparation}\n\n本站整理的操作建议\n${c.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n值得学习的写法\n${c.lesson}\n\n改成自己的内容\n${c.exercise}\n\n${c.translationNote}\n${c.promptZh}\n\n作者完整原文${c.contentKind === 'code' ? '（源码）' : ''}\n${c.promptOriginal}\n\n作者：${c.creator}\nGoodcase：${c.url}\n原始出处：${c.sourceUrl || c.url}\n整理日期：${c.capturedAt}\n`
  const url = URL.createObjectURL(new Blob(['\ufeff', content], { type: 'text/plain;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${c.title}.txt`
  document.body.append(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
</script>
<template>
  <div v-if="item" class="case-prompt-block">
    <div class="case-prompt-toolbar">
      <div class="case-language" aria-label="提示词语言">
        <button type="button" :aria-pressed="language === 'zh'" @click="switchLanguage('zh')">{{ item.contentKind === 'code' ? '中文使用指令' : '中文提示词' }}</button>
        <button type="button" :aria-pressed="language === 'original'" @click="switchLanguage('original')">{{ item.contentKind === 'code' ? '完整源码' : '作者原文' }}</button>
      </div>
      <button type="button" class="case-button case-primary" @click="copy()">复制完整内容</button>
    </div>
    <p class="case-prompt-note">{{ language === 'zh' ? item.translationNote : `Goodcase 收录的 ${item.creator} 原文，保留原样。` }}</p>
    <pre ref="promptBox" class="case-prompt-content" :class="{ 'is-collapsed': needsExpansion && !expanded }" tabindex="0" aria-label="完整可复制内容">{{ prompt }}</pre>
    <button v-if="needsExpansion" type="button" class="case-expand" :aria-expanded="expanded" @click="expanded = !expanded">{{ expanded ? '收起长内容 ↑' : '展开阅读全文 ↓' }}</button>
    <div v-if="segments.length" class="case-segments"><span>按分镜分别复制：</span><button v-for="s in segments" :key="s.title" type="button" class="case-button" @click="copy(s.text)">{{ s.title }}</button></div>
    <p v-if="item.contentKind === 'code'" class="case-code-note">源码是交给 AI 编程工具的素材。可以将中文指令和源码一起复制，让 AI 接入你的项目。</p>
    <div class="case-prompt-footer">
      <button v-if="item.contentKind === 'code'" type="button" class="case-button" @click="copy(item.promptZh + '\n\n以下为组件源码：\n' + item.promptOriginal)">一起复制指令与源码</button>
      <button type="button" class="case-download" @click="download">下载完整案例笔记 ↓</button>
    </div>
    <p class="case-copy-status" role="status">{{ status }}</p>
    <textarea v-if="manual" ref="manualBox" :value="manual" readonly aria-label="手动复制内容" class="case-manual-copy" />
  </div>
</template>
