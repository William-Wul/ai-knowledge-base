// 「AI 视频课」板块唯一数据源：B 站 AI 学习视频精选（卡片墙）
// 由 VideoBoard.vue 渲染；封面存 docs/public/videos/covers/，入 git
//
// ── 加一个视频的流程（入库 → 推荐 → 发布）──
// 1. 视频先入素材库：丢链接给 agent 说"入库"（kb-articles/V00N-*/，见 article-kb skill 视频分支）
// 2. 在下面的 VIDEO_SECTIONS 里加一条（bvid/标题/UP主/时长/数据/封面/推荐语）
//    推荐语规范：≤60 字；写读者能得到什么，不写视频内部结构（案例名/章节名读者看不懂）；
//    cardTitle 为卡片位短标题（≤16 字，保证方块排版不挤爆；title 保留官方全称，弹窗显示）
//    平实、敢下判断、禁"干货满满/王炸"式夸张词；UP主名和播放数是事实信息可写（放 meta 行）
// 3. 封面从素材库 cover.jpg 复制到 docs/public/videos/covers/<id>.jpg
// 4. npm run docs:build 验证 → 本地预览给 William 审 → 通过后 ./publish.sh + 双 changelog
//
// 分类：AI 基础科普 / AI 办公实操 / 提示词与 Agent 技巧 / AI 编程实战 / AI 创作实战

export const VIDEO_SECTIONS = [
  {
    id: 'basics',
    name: 'AI 基础科普',
    desc: '概念、术语、底层逻辑——把黑话听成人话',
    videos: [
      {
        id: 'v004',
        cardTitle: '从 LLM 到 Agent Skill',
        bvid: 'BV1E7wtzaEdq',
        title: '从 LLM 到 Agent Skill，一期视频带你打通底层逻辑！',
        up: '马克的技术工作坊',
        duration: '32:30',
        stats: '179万播放 · 15.6万收藏',
        cover: '/videos/covers/v004.jpg',
        reason:
          'Token、上下文、Agent、Skill 这些词到底什么关系？从底层一层层搭到顶，听完能看懂 AI 圈大部分新产品。',
      },
    ],
  },
  {
    id: 'office',
    name: 'AI 办公实操',
    desc: '表格、PPT、复盘、汇报——看得见产出的干活案例',
    videos: [
      {
        id: 'v006',
        cardTitle: 'WorkBuddy 保姆级教程',
        bvid: 'BV1EBui6xEbT',
        title: 'WorkBuddy 60分钟超完整保姆级教程！无论是想入门Agent还是想工作提效，听完秒变大神！',
        up: '大梁Max',
        duration: '59:08',
        stats: '10万播放 · 1.2万收藏',
        cover: '/videos/covers/v006.jpg',
        reason:
          '公司配置的 WorkBuddy 从入门到提效：积分怎么算、资料怎么放、专家团分析、定时任务，一遍讲全。',
      },
      {
        id: 'v008',
        cardTitle: 'AI 做 PPT 五家横评',
        bvid: 'BV1jd3s6wE8A',
        title: '2026年，AI做PPT哪家强？',
        up: '跟我学个P',
        duration: '6:39',
        stats: '2.7万播放',
        cover: '/videos/covers/v008.jpg',
        reason:
          '五家 AI 做 PPT 横评：免费选千问、要图表选 Kimi、要省心选 Claude，还有会编造内容的避坑提醒。',
      },
      {
        id: 'v001',
        cardTitle: '桌面 Agent 入门：让 AI 替你干活',
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
  {
    id: 'agent',
    name: '提示词与 Agent 技巧',
    desc: '让 AI 听懂话、干成事的方法与概念',
    videos: [
      {
        id: 'v003',
        cardTitle: 'Harness Engineering 讲清楚',
        bvid: 'BV12LR1B3EUt',
        title: 'Harness Engineering 到底是什么？概念、实战与争议，一次全部讲清楚',
        up: '马克的技术工作坊',
        duration: '37:24',
        stats: '21万播放',
        cover: '/videos/covers/v003.jpg',
        reason:
          'AI 圈都在说的 Harness 到底是什么：套在模型外面、让它稳定干活的那层系统。概念、实战、争议一次讲清。',
      },
    ],
  },
  {
    id: 'coding',
    name: 'AI 编程实战',
    desc: 'Claude Code、Codex 等编程 Agent 的系统教程',
    videos: [
      {
        id: 'v005',
        cardTitle: '60 分钟掌握 Claude Code',
        bvid: 'BV1NvRyBzEhq',
        title: '全网最全！60分钟全面掌握Claude Code～【附完整文档】',
        up: '秋芝2046',
        duration: '56:09',
        stats: '156万播放 · 15.8万收藏',
        cover: '/videos/covers/v005.jpg',
        reason:
          'Claude Code 从装到用：权限怎么给、省钱命令、给 AI 立规矩的 CLAUDE.md，跟着做出第一个项目。',
      },
      {
        id: 'v002',
        cardTitle: 'Codex 从 0 到 1 全攻略',
        bvid: 'BV1c9EK6KEW4',
        title: 'Codex 从 0 到 1 全攻略 - Annotate / Fork / Archive / Plan / Plugin / Skill',
        up: '马克的技术工作坊',
        duration: '58:38',
        stats: '44万播放 · 4.8万收藏',
        cover: '/videos/covers/v002.jpg',
        reason:
          '从订阅选档、权限怎么给，到自动提交代码、定时任务、手机遥控电脑，Codex 的完整用法一条视频过一遍。',
      },
    ],
  },
  {
    id: 'creation',
    name: 'AI 创作实战',
    desc: '用 AI 做内容——短剧、漫剧、变现的完整管线',
    videos: [
      {
        id: 'v007',
        cardTitle: 'AI 漫剧全流程拆解',
        bvid: 'BV1BoM76iEih',
        title: '爆肝2个月！90分钟拆解AI漫剧全流程（含选题+剧本+分镜+视频+配音+剪辑+变现）',
        up: 'GenJi是真想教会你',
        duration: '84:30',
        stats: '100万播放 · 10.1万收藏',
        cover: '/videos/covers/v007.jpg',
        reason:
          '用 AI 做一部能变现的短剧全流程：选题、剧本、分镜、配音、剪辑。适合想搞 AI 内容创作或副业的同事当参考。',
      },
    ],
  },
]
