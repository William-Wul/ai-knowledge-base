// 「AI 视频课」板块唯一数据源：B 站 AI 学习视频精选（卡片墙）
// 由 VideoBoard.vue 渲染；封面存 docs/public/videos/covers/，入 git
//
// ── 加一个视频的流程（入库 → 推荐 → 发布）──
// 1. 视频先入素材库：丢链接给 agent 说"入库"（kb-articles/V00N-*/，见 article-kb skill 视频分支）
// 2. 在下面的 VIDEO_SECTIONS 里加一条（bvid/标题/UP主/时长/数据/封面/推荐语）
//    推荐语规范：≤60 字；写读者能得到什么，不写视频内部结构（案例名/章节名读者看不懂）；
//    平实、敢下判断、禁"干货满满/王炸"式夸张词；UP主名和播放数是事实信息可写（放 meta 行）
// 3. 封面从素材库 cover.jpg 复制到 docs/public/videos/covers/<id>.jpg
// 4. npm run docs:build 验证 → 本地预览给 William 审 → 通过后 ./publish.sh + 双 changelog
//
// 分类（暂定四类，按首批内容微调）：AI 办公实操 / AI 基础科普 / 提示词与 Agent 技巧 / AI 编程实战

export const VIDEO_SECTIONS = [
  {
    id: 'office',
    name: 'AI 办公实操',
    desc: '表格、PPT、复盘、汇报——看得见产出的干活案例',
    videos: [
      {
        id: 'v001',
        bvid: 'BV1j9MP6wEV9',
        title: '从零开始，学会让桌面Agent帮你干活！【小白教程】',
        up: '秋芝2046',
        duration: '13:13',
        stats: '134万播放 · 2.7万收藏',
        cover: '/videos/covers/v001.jpg',
        reason:
          '桌面 Agent 能替你干的八类活，从整理表格到跑复盘报告一次讲全。还在"跟 AI 聊天"的同事，拿它当第一课。',
      },
    ],
  },
  // 新分类在此追加 { id, name, desc, videos: [...] }，空分类自动不渲染
]
