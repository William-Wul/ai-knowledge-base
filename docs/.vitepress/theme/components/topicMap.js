// 自测「测完推荐学习路径」用到的文章 / 栏目映射表。
//
// 为什么单独抽出来：自测结果页会推荐文章（维度补短板、阶段路径），
// 以前这些链接直接写死在 aiQuizBank.js 里，文章一旦改 URL 或标题，
// 自测推荐就失效。现在 aiQuizBank.js 只存 topic 这个稳定标识，
// 真实的 link / text 在这里集中维护——改文章只改这一处。
//
// 维护：文章改 URL 或标题，只需改这条表里对应 topic 的 link / text。
// link 留空字符串表示该推荐位暂时没有对应内容（结果页会自动隐藏）。

export const topicMap = {
  // —— 维度补短板推荐（按能力维度）——
  'prompt-basic':      { text: '跟 AI 说话的基本方法',         link: '/stage-2/how-to-prompt' },
  'prompt-advanced':   { text: 'Prompt 进阶技巧',              link: '/stage-2/prompt-cases' },
  'write-skill':       { text: '如何写好一个 Skill',           link: '/stage-3/write-good-skill' },
  'loop-engineering':  { text: 'Loop Engineering：让 AI 自己干完', link: '/stage-3/loop-engineering' },
  'multi-agent':       { text: '多 AI 协同：带一队 AI 做项目',  link: '/stage-4/multi-agent-teamwork' },
  'agent-tools':       { text: '智能体/助理类 AI：从 Marvis 开始', link: '/stage-2/marvis-guide' },
  'workbuddy':         { text: 'WorkBuddy 从零开始',           link: '/stage-5/workbuddy-guide' },
  'safety':            { text: 'AI 使用的安全红线',            link: '/stage-2/safety-guidelines' },

  // —— 阶段路径推荐（按综合水平）——
  'section-cognition': { text: 'AI 快速认知',                  link: '/stage-1/' },
  'section-tools':     { text: 'AI 工具快速上手',              link: '/stage-2/' },
  'section-practice':  { text: 'AI 进阶实践',                  link: '/stage-4/' },
  'section-frontier':  { text: 'AI 前沿专区',                  link: '/frontier/' },
}

// 把一组 topic 解析成结果页要用的 { text, href }，过滤掉无对应内容的项并去重。
// aiQuizBank.js 调用：resolveLinks(['prompt-basic', 'prompt-advanced'])
export function resolveLinks(topics) {
  const seen = new Set()
  const result = []
  for (const topic of topics) {
    const entry = topicMap[topic]
    if (!entry || !entry.link) continue   // 没配置或 link 留空 → 隐藏
    if (seen.has(entry.link)) continue    // 去重（不同 topic 可能指向同一篇）
    seen.add(entry.link)
    result.push({ text: entry.text, href: entry.link })
  }
  return result
}
