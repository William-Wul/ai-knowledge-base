// 仅记录固定动作与栏目类别；不发送答案、得分、搜索词、输入材料或作品。
const actions = new Set(['case-copy', 'case-download', 'quiz-finish'])
const labels = new Set(['image', 'video', 'web', 'quiz'])
export function trackLearning(action, label, target = typeof window === 'undefined' ? undefined : window) {
  if (!actions.has(action) || !labels.has(label)) return false
  if (!target || !/^https:\/\/ailinkstart\.com(?:\/|$)/.test(target.location?.href || '')) return false
  try {
    if (!Array.isArray(target._hmt)) return false
    target._hmt.push(['_trackEvent', 'learning', action, label])
    return true
  } catch { return false }
}
