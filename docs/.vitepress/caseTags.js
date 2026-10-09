// 本站按作品用途与题材整理的标签，不是作者原始标签或生成效果评级。
export const CASE_TAG_GROUPS = [
  {
    id: 'purpose', name: '用途', tags: [
      { id: 'poster', name: '海报插画' },
      { id: 'product-ad', name: '产品广告' },
      { id: 'portrait', name: '人像角色' },
      { id: 'photography', name: '摄影画面' },
      { id: 'story', name: '故事短片' },
      { id: 'action', name: '动作转场' },
      { id: 'music', name: '音乐舞蹈' },
      { id: 'daily', name: '生活记录' },
      { id: 'education', name: '教学演示' },
      { id: 'brand-page', name: '品牌网页' },
      { id: 'portfolio', name: '个人作品集' },
      { id: 'component', name: '界面组件' },
      { id: 'utility', name: '实用工具' },
      { id: 'data', name: '数据展示' },
    ],
  },
  {
    id: 'topic', name: '题材', tags: [
      { id: 'animals', name: '动物宠物' },
      { id: 'food', name: '美食饮品' },
      { id: 'nature', name: '自然旅行' },
      { id: 'architecture', name: '建筑空间' },
      { id: 'technology', name: '科技产品' },
      { id: 'fantasy', name: '科幻奇幻' },
      { id: 'sports', name: '运动汽车' },
      { id: 'fashion', name: '时尚美妆' },
      { id: 'culture', name: '历史文化' },
    ],
  },
]

export function normalizeTagFilters(filters = {}) {
  return Object.fromEntries(CASE_TAG_GROUPS.map(group => [
    group.id, group.tags.some(tag => tag.id === filters?.[group.id]) ? filters[group.id] : '',
  ]))
}

export function caseTagLabels(tags = {}) {
  return CASE_TAG_GROUPS.flatMap(group => group.tags
    .filter(tag => tags[group.id]?.includes(tag.id))
    .map(tag => ({ ...tag, group: group.id })))
}
