// One category vocabulary for navigation, generated pages and the case browser.
export const CASE_CATEGORIES = [
  { id: 'image', name: 'AI 生成图片', description: '从一张作品开始，学习画面描述、参考图和风格控制。' },
  { id: 'video', name: 'AI 创作视频', description: '看成片、读分镜，学习人物、动作和镜头如何配合。' },
  { id: 'web', name: 'AI 做网站与工具', description: '从网站效果和具体功能入手，学习把想法变成网站与实用小工具。' },
]
export const caseCategoryLink = id => `/cases/${id}/`
