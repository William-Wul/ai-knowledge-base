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

// 根据现有标题与推荐语整理的本站练习，不代表作者的课程安排或工具复测结论。
export const VIDEO_LEARNING_NOTE = '学习建议整理于 2026-10-09，未逐一复测视频中的工具。'

export const VIDEO_SECTIONS = [
  {
    id: 'basics',
    name: 'AI 基础科普',
    desc: '概念、术语、底层逻辑——把黑话听成人话',
    videos: [
      {
        id: 'v010',
        cardTitle: '人类员工 vs AI 员工',
        bvid: 'BV1bFXKBwECC',
        title: '耗时180天制作！这才是你该知道的AI常识！(上)',
        up: '帧数燃烧',
        duration: '10:34',
        stats: '373.6万播放 · 9.2万收藏',
        cover: '/videos/covers/v010.jpg',
        reason:
          '做 PPT、审发票、面试、发视频，四组人机真实对比。看完明白：AI 是认知的镜子，拉开差距的是你，但背锅的也是你。',
        learning: {
          audience: '想判断哪些工作可以交给 AI 的同事',
          preparation: '选一项熟悉的工作，准备一个你认为合格的结果样例。',
          practice: '把这项工作拆成三步，分别写出 AI 能做什么、你要做什么，以及交付前必须核对的一处错误。',
        },
      },
      {
        id: 'v009',
        cardTitle: 'AI 黑话常识：token 到 Skill',
        bvid: 'BV1ri756dEzT',
        title: '耗时90天制作！这才是你最该学的AI常识！(下）',
        up: '帧数燃烧',
        duration: '6:40',
        stats: '12.3万播放 · 5144收藏',
        cover: '/videos/covers/v009.jpg',
        reason:
          'token、上下文、MCP、Agent、Skill 天天听却说不清？坐电梯、USB 接口、工厂主管三组比喻，6 分半全讲清，适合当第一课。',
        learning: {
          audience: '刚接触 AI、经常被术语卡住的同事',
          preparation: '记下三个你说不清的 AI 词，留一页空白笔记。',
          practice: '选三个词，各写一句日常类比和一个工作例子，再试着向同事解释，检查自己能否说清。',
        },
      },
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
        learning: {
          audience: '用过聊天 AI，想理清模型、工具与 Agent 关系的同事',
          preparation: '准备一个“整理文件并给出摘要”的需求。',
          practice: '画出“接收要求 → 找到资料 → 使用工具 → 给出结果”四步，标出每一步需要模型、工具还是人的检查。',
        },
      },
      {
        id: 'v012',
        cardTitle: 'Agent 沙箱是什么',
        bvid: 'BV14sorBiEgP',
        title: 'AI Agent的沙箱是什么？它和Docker容器/虚拟机有什么区别?',
        up: '小白debug',
        duration: '7:05',
        stats: '23.5万播放 · 5405收藏',
        cover: '/videos/covers/v012.jpg',
        reason:
          'AI 为什么需要沙箱、虚拟机和容器到底差在哪？7 分钟一条线讲透，顺带看懂腾讯开源的云沙箱 CubeSandbox 在做什么。',
        learning: {
          audience: '想理解 Agent 为什么要在隔离环境里工作的同事',
          preparation: '想一个 AI 批量修改文件的场景，用纸笔记录即可。',
          practice: '画出“原文件 → 练习副本 → 核对后合并”的流程，写清 AI 可以读写哪里、出现错误时怎样保留原文件。',
        },
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
        learning: {
          audience: '已有 WorkBuddy、想用它处理办公任务的同事',
          preparation: '准备五条不含敏感信息的工作进展，以及一份汇报格式。',
          practice: '让 WorkBuddy 整理一页汇报草稿，逐条对照原材料，标出缺失或误写的信息，保留一份你修正后的结果。',
        },
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
          '按录制时版本比较五款工具，重点看内容准确性、图表和排版，也展示编造内容的例子。费用和导出能力以当前工具为准。',
        learning: {
          audience: '经常做 PPT，想判断 AI 结果是否可用的同事',
          preparation: '准备三页汇报的大纲、两个已核实的数字，以及一款你已能使用的工具。',
          practice: '用同一份材料生成三页 PPT，核对数字和结论，再记录内容、图表、排版各需修改的一处，判断是否省下时间。',
        },
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
        learning: {
          audience: '会与 AI 聊天，想尝试让它整理文件的同事',
          preparation: '在练习文件夹里放三份自己编写的会议笔记，保留原文件副本。',
          practice: '让已可用的桌面 AI 先列出按日期整理的方案，确认后只在练习目录操作，再逐项核对文件名和笔记内容。',
        },
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
        learning: {
          audience: '用过 Agent，想减少返工和失控的同事',
          preparation: '选一个重复任务，写下曾遇到的三个失败例子。',
          practice: '为这个任务写一张任务卡：目标、可用资料、允许的操作、完成后的检查、什么情况必须停下来问你。',
        },
      },
    ],
  },
  {
    id: 'coding',
    name: 'AI 编程实战',
    desc: 'Claude Code、Codex 等编程 Agent 的系统教程',
    videos: [
      {
        id: 'v011',
        cardTitle: 'DeepSeek Harness 速通',
        bvid: 'BV1VkgK6NEZS',
        title: 'DeepSeek Harness 首发实测 + 入门教程，夯爆了！梁神我错了',
        up: '程序员鱼皮',
        duration: '16:33',
        stats: '138.9万播放 · 7.1万收藏',
        cover: '/videos/covers/v011.jpg',
        reason:
          '国产开源的 AI 编程工具：一行命令装好，四个实战任务跑完不到 5 块钱，插件能换也能自己造。需要会开终端。',
        learning: {
          audience: '会使用终端、已有 AI 编程基础的同事',
          preparation: '准备空练习项目和已配置好的工具环境；安装与费用按当前官方说明核对。',
          practice: '让工具做一个本地待办页，提前约定新增、显示、删除三项标准，运行后逐项操作，并记录一次修正过程。',
        },
      },
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
          'Claude Code 从装到用：权限怎么给、省钱命令、给 AI 立规矩的 CLAUDE.md，跟着做出第一个项目。录制于 2026 年 5 月；此后 Fable 5 上线、订阅规则有调整，以官方最新说明为准。',
        learning: {
          audience: '愿意尝试 AI 编程、能打开终端的同事',
          preparation: '准备空练习文件夹、可用的 Claude Code，以及一页工作笔记的需求。',
          practice: '先写三条项目规则，再让 Claude Code 做一个工作笔记页；检查能否输入、保存、再次打开，并核对实际修改的文件。',
        },
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
          '从订阅选档、权限怎么给，到自动提交代码、定时任务、手机遥控电脑，Codex 完整用法一条视频过一遍。录制于 Codex 独立 App 时期；2026 年 7 月起 Codex 并入 ChatGPT 桌面应用，入口以新版为准，方法仍然通用。',
        learning: {
          audience: '准备上手 Codex，想学会提出和验收修改的同事',
          preparation: '准备一个只含示例文件的练习项目，以及一个小修改需求。',
          practice: '要求 Codex 先说明修改计划，再完成一处改动；查看前后差异、运行结果，写下你接受或继续修改的理由。',
        },
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
        learning: {
          audience: '想了解 AI 短片制作步骤的内容创作者',
          preparation: '准备一个三句话的原创故事，以及主人公的外貌描述。',
          practice: '把故事拆成三个镜头，分别写画面、台词和时长，总长约十五秒；检查角色是否一致、故事是否有开始和结束。',
        },
      },
      {
        id: 'v013',
        cardTitle: 'AI 视频云端自部署',
        bvid: 'BV1qebY6FEL6',
        title: 'MiniMax-H3 API太贵？云端自部署，让成本压到 1/8',
        up: '小白debug',
        duration: '9:47',
        stats: '22.6万播放 · 3879收藏',
        cover: '/videos/covers/v013.jpg',
        reason:
          '嫌 AI 视频按量付费贵？跟 UP 在云 GPU 上自部署视频模型，每秒成本约 6 分钱，还能批量出片。Akamai 商单，价格数字听个参考。',
        learning: {
          audience: '会使用云服务器，想比较视频生成成本的同事',
          preparation: '记录一个实际需求的分辨率、视频时长和数量，准备当前报价或自己的费用记录。',
          practice: '列出租用、等待、生成、失败重试四项成本，用自己的需求估算一次；缺少的数据留空，不直接套用视频里的价格。',
        },
      },
    ],
  },
]
