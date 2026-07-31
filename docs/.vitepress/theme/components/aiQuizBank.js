// AI 能力自测题库
// 12 个题位 × 3 个变体 = 36 道题。每次测评从每个题位随机抽 1 道，
// 保证维度覆盖稳定、题目不重样。选项在抽题时随机排序（互斥选项除外）。
// 防"选看起来正确的"设计：不给提示小字、选项乱序、埋少量"听起来高级
// 但其实是坏做法"的陷阱选项、多用行为回忆题。
//
// 维度补短板 / 阶段路径推荐：只写 topic 标识（不写死 URL），真实 link / text
// 在 topicMap.js 集中维护，文章改 URL 不会让自测推荐失效。

export const dimensions = [
  {
    key: 'ask', label: '提问力', color: '#2f6b4f',
    notes: [
      '提问还停留在一句话指令，AI 只能靠猜。',
      '会交代基本要求，但还可以说得更完整。',
      '会把任务说清楚，也会让 AI 先反问你。',
    ],
    topics: ['prompt-basic', 'prompt-advanced'],
  },
  {
    key: 'context', label: '上下文力', color: '#8f6a2f',
    notes: [
      '很少给背景和材料，AI 拿不到关键信息。',
      '会给目标和部分材料，但标准和红线经常漏掉。',
      '目标、材料、约束、验收标准会一次给齐。',
    ],
    topics: ['prompt-advanced', 'write-skill'],
  },
  {
    key: 'workflow', label: '流程力', color: '#386f82',
    notes: [
      '习惯一问一答，任务还没有拆成步骤。',
      '会拆任务，但验收和返工环节还不稳定。',
      '会拆流程、定验收，让 AI 分步推进。',
    ],
    topics: ['loop-engineering', 'multi-agent'],
  },
  {
    key: 'agent', label: 'Agent 力', color: '#6f5c9c',
    notes: [
      '还没有让 AI 独立执行过一段任务。',
      '用过 Agent 类工具，但还没形成日常习惯。',
      '已经会把整段任务交给 Agent 去跑。',
    ],
    topics: ['agent-tools', 'workbuddy'],
  },
  {
    key: 'judgment', label: '判断力', color: '#9a554c',
    notes: [
      '对 AI 的输出基本照单全收，风险意识还不够。',
      '重要内容会复核，但标准还不固定。',
      '有自己的核查习惯，也清楚安全边界。',
    ],
    topics: ['safety'],
  },
]

export const levels = [
  {
    name: '刚起步', short: '起步',
    summary: '你对 AI 的使用还比较少，或者刚刚开始。这不是坏事，现在起步一点都不晚——先从一个真实的小任务开始。',
    topics: ['section-cognition', 'section-tools'],
  },
  {
    name: '日常使用者', short: '日常',
    summary: '你已经会让 AI 帮你干活，但交代任务的方式还比较简单，产出质量时好时坏。把任务说完整，是你现在最划算的一步。',
    topics: ['section-tools'],
  },
  {
    name: '熟练协作者', short: '熟练',
    summary: '你会交代背景、会追问、会让 AI 改到满意，日常任务基本能稳定跑起来。下一步是从"对话"升级到"流程"。',
    topics: ['section-practice'],
  },
  {
    name: '流程设计者', short: '流程',
    summary: '你已经开始拆流程、定验收，让 AI 完成整段任务，用法领先大多数人。下一步是把 Agent 用进日常工作。',
    topics: ['section-practice', 'section-tools'],
  },
  {
    name: '系统构建者', short: '系统',
    summary: '你在设计人和 AI 的分工体系，并把经验沉淀成可复用的资产。对你来说，重要的不再是学工具，而是选择值得做的问题。',
    topics: ['section-frontier'],
  },
]

// 每个题位（slot）代表一个固定考察点，variants 里随机抽一道。
export const questionBank = [
  {
    slot: 'first-move',
    variants: [
      {
        id: 'q1a',
        type: 'single',
        badge: '场景题',
        title: '老板让你下周做一场 20 分钟 AI 内部分享，你第一步会怎么用 AI？',
        context: '时间不多，但这件事会被同事看到。',
        options: [
          { id: 'a', label: '让 AI 直接写一份完整分享稿，我改改就用', scores: { ask: 1 } },
          { id: 'b', label: '让 AI 列一个大纲，内容自己填', scores: { ask: 2, workflow: 1 } },
          { id: 'c', label: '把听众、目标、时长、已有案例发给 AI，让它先问我还缺什么', scores: { ask: 3, context: 3, workflow: 2 } },
          { id: 'd', label: '让 AI 把任务拆成资料、结构、案例、讲稿、试讲检查几步，一步步来', scores: { ask: 2, context: 2, workflow: 4, agent: 2 } },
          { id: 'e', label: '把我收藏的二十几篇 AI 文章全发给 AI，让它自己消化出一份分享稿', scores: { context: 1 } },
        ],
      },
      {
        id: 'q1b',
        type: 'single',
        badge: '场景题',
        title: '要给领导写一份季度工作总结，你第一步会怎么用 AI？',
        options: [
          { id: 'a', label: '让 AI 按"季度总结"直接生成一版再说', scores: { ask: 1 } },
          { id: 'b', label: '把这个季度的周报和数据发给 AI，让它先整理出要点', scores: { ask: 1, context: 3 } },
          { id: 'c', label: '先告诉 AI 领导关注什么、要突出哪几件事，再让它列结构、问我缺什么', scores: { ask: 3, context: 3, workflow: 2 } },
          { id: 'd', label: '拆成整理素材、提炼亮点、写初稿、对照领导习惯修改、自查几步跑', scores: { ask: 2, context: 2, workflow: 4, agent: 1 } },
          { id: 'e', label: '找一个网上流传的"万能总结模板"，让 AI 往里套', scores: { ask: 1 } },
        ],
      },
      {
        id: 'q1c',
        type: 'single',
        badge: '场景题',
        title: '部门让你牵头组织一次团建，你第一步会怎么用 AI？',
        options: [
          { id: 'a', label: '直接问 AI 要一份"完美团建方案"，它见得比我多', scores: { ask: 1 } },
          { id: 'b', label: '让 AI 一口气出 10 个方案，我从里面挑', scores: { ask: 1, workflow: 1 } },
          { id: 'c', label: '把人数、预算、时间、大家的偏好告诉 AI，让它先问清楚再出方案', scores: { ask: 3, context: 3, workflow: 2 } },
          { id: 'd', label: '让 AI 拆成定方向、比选方案、排流程、列物料、预演风险几步推进', scores: { ask: 2, context: 2, workflow: 4, agent: 2 } },
        ],
      },
    ],
  },
  {
    slot: 'recent-behavior',
    variants: [
      {
        id: 'q2a',
        type: 'multi',
        badge: '行为题',
        title: '过去两周，你真实做过哪些 AI 操作？',
        context: '多选，按真实情况来。没做过也没关系。',
        options: [
          { id: 'a', label: '让 AI 写邮件、周报、通知或文案', scores: { ask: 1 } },
          { id: 'b', label: '把文档、截图或链接发给 AI 让它分析', scores: { context: 2 } },
          { id: 'c', label: '让 AI 先列方案，再比较利弊', scores: { ask: 2, judgment: 1 } },
          { id: 'd', label: '让 AI 生成 PPT、网页、表格或图片', scores: { workflow: 2 } },
          { id: 'e', label: '用过 Agent / 任务模式 / Codex / WorkBuddy 这类工具', scores: { agent: 3 } },
          { id: 'f', label: '把一套提示词、模板或流程保存下来复用', scores: { workflow: 2, agent: 1 } },
          { id: 'none', label: '以上都还没做过', scores: {}, exclusive: true },
        ],
      },
      {
        id: 'q2b',
        type: 'multi',
        badge: '行为题',
        title: '这一周里，下面哪些事在你身上真实发生过？',
        context: '多选，按真实情况来。',
        options: [
          { id: 'a', label: '让 AI 帮我改写或润色过一段文字', scores: { ask: 1 } },
          { id: 'b', label: '给 AI 发过文件或截图让它处理', scores: { context: 2 } },
          { id: 'c', label: '同一件事和 AI 来回改了三轮以上', scores: { ask: 2, judgment: 1 } },
          { id: 'd', label: '让 AI 输出过表格、PPT、代码等非纯文字内容', scores: { workflow: 2 } },
          { id: 'e', label: '让 AI 类工具自动跑完过一整件事', scores: { agent: 3 } },
          { id: 'f', label: '用了自己以前存下来的提示词或模板', scores: { workflow: 2, agent: 1 } },
          { id: 'none', label: '这周还没用过 AI', scores: {}, exclusive: true },
        ],
      },
      {
        id: 'q2c',
        type: 'multi',
        badge: '行为题',
        title: '最近一个月，你在哪些场景真实用过 AI？',
        context: '多选，按真实情况来。',
        options: [
          { id: 'a', label: '查资料、解释概念、翻译', scores: { ask: 1 } },
          { id: 'b', label: '分析数据或读长文档', scores: { context: 2 } },
          { id: 'c', label: '让 AI 对比过几个方案的利弊', scores: { ask: 2, judgment: 1 } },
          { id: 'd', label: '处理重复性事务，比如批量整理、格式转换', scores: { workflow: 2 } },
          { id: 'e', label: '把一段完整任务交给 Agent 类工具去跑', scores: { agent: 3 } },
          { id: 'f', label: '把自己的 AI 用法整理下来复用或分享', scores: { workflow: 2, agent: 1 } },
          { id: 'none', label: '最近一个月基本没用', scores: {}, exclusive: true },
        ],
      },
    ],
  },
  {
    slot: 'prompt-compare',
    variants: [
      {
        id: 'q3a',
        type: 'single',
        badge: 'Prompt 对比',
        title: '下面哪个 Prompt 更像你平时会发给 AI 的？',
        options: [
          { id: 'a', label: '帮我写一个招聘文案。', scores: { ask: 1 } },
          { id: 'b', label: '你是招聘专家，帮我写一个招聘文案，正式一点。', scores: { ask: 2 } },
          { id: 'c', label: '我要招兼职老师，读者是大学生，语气真诚不油腻。请先问我 5 个必要信息，再写 3 个版本。', scores: { ask: 4, context: 3, workflow: 1 } },
          { id: 'd', label: '你是拥有 20 年经验的世界顶级人力资源大师，精通心理学和传播学……（一大段角色设定）帮我写招聘文案。', scores: { ask: 1 } },
        ],
      },
      {
        id: 'q3b',
        type: 'single',
        badge: 'Prompt 对比',
        title: '要把一段会议录音稿整理成纪要，下面哪个 Prompt 更像你的写法？',
        options: [
          { id: 'a', label: '帮我把这段整理成会议纪要。', scores: { ask: 1 } },
          { id: 'b', label: '整理成会议纪要，分决议、待办、负责人三部分。', scores: { ask: 2, workflow: 1 } },
          { id: 'c', label: '这是产品评审会的录音稿，参会方有产品、开发、设计。整理成纪要：决议 / 待办 / 负责人 / 截止时间，听不清或拿不准的地方标出来问我。', scores: { ask: 4, context: 3, workflow: 1 } },
          { id: 'd', label: '你是有 30 年经验的首席会议纪要专家，请用最专业的格式帮我整理。', scores: { ask: 1 } },
        ],
      },
      {
        id: 'q3c',
        type: 'single',
        badge: 'Prompt 对比',
        title: '想让 AI 帮你做一份市场调研，下面哪种开场更像你？',
        options: [
          { id: 'a', label: '帮我调研一下奶茶市场。', scores: { ask: 1 } },
          { id: 'b', label: '帮我调研奶茶市场，内容要有数据支撑。', scores: { ask: 2 } },
          { id: 'c', label: '我们想在二线城市开店，预算 50 万。帮我调研竞品格局、客单价、选址逻辑，动手前先问我 3 个你最需要的信息。', scores: { ask: 4, context: 3, workflow: 1 } },
          { id: 'd', label: '把公司简介、行业报告、竞品名单一股脑全贴给 AI："资料都在这了，你看着分析。"', scores: { context: 2 } },
        ],
      },
    ],
  },
  {
    slot: 'context-materials',
    variants: [
      {
        id: 'q4a',
        type: 'multi',
        badge: '上下文题',
        title: '做一个重要任务时，你通常会给 AI 哪些材料？',
        options: [
          { id: 'a', label: '任务目标', scores: { context: 1 } },
          { id: 'b', label: '目标读者或使用场景', scores: { context: 2 } },
          { id: 'c', label: '参考资料、历史文档或数据', scores: { context: 3 } },
          { id: 'd', label: '不要做什么、哪些红线不能碰', scores: { context: 2, judgment: 1 } },
          { id: 'e', label: '我判断好坏的标准', scores: { context: 2, judgment: 2 } },
          { id: 'none', label: '基本只发一句任务描述', scores: {}, exclusive: true },
        ],
      },
      {
        id: 'q4b',
        type: 'multi',
        badge: '上下文题',
        title: '让 AI 改一份重要文档时，除了文档本身，你还会给它什么？',
        options: [
          { id: 'a', label: '这次修改的目的', scores: { context: 1 } },
          { id: 'b', label: '文档是给谁看的、在什么场合用', scores: { context: 2 } },
          { id: 'c', label: '一两份我满意的旧文档当范例', scores: { context: 3 } },
          { id: 'd', label: '哪些部分不能动', scores: { context: 2, judgment: 1 } },
          { id: 'e', label: '我验收时会看哪几点', scores: { context: 2, judgment: 2 } },
          { id: 'none', label: '直接发过去说"帮我改好一点"', scores: {}, exclusive: true },
        ],
      },
      {
        id: 'q4c',
        type: 'multi',
        badge: '上下文题',
        title: '把一个数据分析任务交给 AI 时，你通常会给它哪些东西？',
        options: [
          { id: 'a', label: '数据本身', scores: { context: 1 } },
          { id: 'b', label: '数据的口径和背景说明', scores: { context: 3 } },
          { id: 'c', label: '我真正想回答的业务问题', scores: { context: 2 } },
          { id: 'd', label: '已知的坑，比如异常值、统计口径变过', scores: { context: 2, judgment: 1 } },
          { id: 'e', label: '结果要给谁看、用来支撑什么决定', scores: { context: 2, judgment: 2 } },
          { id: 'none', label: '把数据丢过去让它"分析一下"', scores: {}, exclusive: true },
        ],
      },
    ],
  },
  {
    slot: 'rework',
    variants: [
      {
        id: 'q5a',
        type: 'single',
        badge: '返工题',
        title: 'AI 给了一个"看着挺对但不太能用"的答案，你会怎么处理？',
        options: [
          { id: 'a', label: '算了，这 AI 不行', scores: {} },
          { id: 'b', label: '换一个 AI 问同样的问题', scores: { judgment: 1 } },
          { id: 'c', label: '指出哪里不对，让它按我的要求改一版', scores: { ask: 2, judgment: 1 } },
          { id: 'd', label: '让它先复盘差在哪，再按验收标准重做', scores: { ask: 3, workflow: 3, judgment: 2 } },
        ],
      },
      {
        id: 'q5b',
        type: 'single',
        badge: '返工题',
        title: 'AI 帮你写的方案被领导打了回来，你会怎么办？',
        options: [
          { id: 'a', label: '让 AI 重写一版，碰碰运气', scores: {} },
          { id: 'b', label: '换个说法把原需求再发一遍', scores: { ask: 1 } },
          { id: 'c', label: '把领导的具体意见转给 AI，让它按点修改', scores: { ask: 2, context: 1, judgment: 1 } },
          { id: 'd', label: '先让 AI 分析被打回的可能原因，列出修改思路，我确认后再动手', scores: { ask: 3, workflow: 3, judgment: 2 } },
        ],
      },
      {
        id: 'q5c',
        type: 'single',
        badge: '返工题',
        title: 'AI 写的东西风格完全不是你要的，你会怎么办？',
        options: [
          { id: 'a', label: '算了，还是自己写', scores: {} },
          { id: 'b', label: '多生成几次，总有一次撞对', scores: { ask: 1 } },
          { id: 'c', label: '发两段我满意的旧文给它当范例，再让它重写', scores: { ask: 2, context: 2 } },
          { id: 'd', label: '让它先总结我范例的风格要点，我确认无误后再重写', scores: { ask: 3, context: 1, workflow: 2 } },
        ],
      },
    ],
  },
  {
    slot: 'learning',
    variants: [
      {
        id: 'q6a',
        type: 'single',
        badge: '学习题',
        title: '你要快速了解一个陌生领域，比如"AI 语音客服"，你会怎么开始？',
        options: [
          { id: 'a', label: '搜几篇文章看看', scores: { judgment: 1 } },
          { id: 'b', label: '问 AI 这个领域是什么', scores: { ask: 1 } },
          { id: 'c', label: '让 AI 给我一张入门地图：关键概念、玩家、案例、风险', scores: { ask: 2, context: 1, workflow: 2 } },
          { id: 'd', label: '让 AI 设计 7 天学习计划，每天带产出和检查点', scores: { ask: 2, workflow: 3, judgment: 1 } },
        ],
      },
      {
        id: 'q6b',
        type: 'single',
        badge: '学习题',
        title: '公司要求大家学一个新工具，你会怎么上手？',
        options: [
          { id: 'a', label: '找官方教程从头看', scores: { judgment: 1 } },
          { id: 'b', label: '问 AI 这个工具是干嘛的', scores: { ask: 1 } },
          { id: 'c', label: '告诉 AI 我的具体使用场景，让它给我一条最短上手路径', scores: { ask: 2, context: 2, workflow: 1 } },
          { id: 'd', label: '让 AI 出一个带练习任务的学习计划，每步有检查点', scores: { ask: 2, workflow: 3, judgment: 1 } },
        ],
      },
      {
        id: 'q6c',
        type: 'single',
        badge: '学习题',
        title: '拿到一份看不太懂的专业报告，你会怎么用 AI？',
        options: [
          { id: 'a', label: '挑能看懂的部分看，其他跳过', scores: {} },
          { id: 'b', label: '让 AI 把全文翻译成大白话', scores: { ask: 1 } },
          { id: 'c', label: '让 AI 先讲清框架和关键概念，再带着我逐段读', scores: { ask: 2, workflow: 2 } },
          { id: 'd', label: '让 AI 用我熟悉的领域打比方讲一遍，讲完出两道题检验我是否真懂了', scores: { ask: 3, workflow: 2, judgment: 1 } },
        ],
      },
    ],
  },
  {
    slot: 'advanced-usage',
    variants: [
      {
        id: 'q7a',
        type: 'multi',
        badge: '工具题',
        title: '下面这些进阶用法，你已经稳定用过哪些？',
        options: [
          { id: 'a', label: '上传长文档让 AI 总结和提炼', scores: { context: 2 } },
          { id: 'b', label: '让 AI 看图、读截图、分析页面', scores: { context: 2 } },
          { id: 'c', label: '让 AI 生成表格、图表或结构化数据', scores: { workflow: 2 } },
          { id: 'd', label: '让 AI 写网页、脚本或自动化流程', scores: { agent: 2, workflow: 2 } },
          { id: 'e', label: '连接本地文件、浏览器、表格或其他工具', scores: { agent: 3 } },
          { id: 'none', label: '以上都还没用过', scores: {}, exclusive: true },
        ],
      },
      {
        id: 'q7b',
        type: 'multi',
        badge: '工具题',
        title: '处理文档和材料时，下面哪些你真实用过？',
        options: [
          { id: 'a', label: '让 AI 同时读多份文档做对比', scores: { context: 2 } },
          { id: 'b', label: '用 AI 翻译外文材料或双语对照阅读', scores: { context: 2 } },
          { id: 'c', label: '让 AI 按固定格式批量生成内容', scores: { workflow: 2 } },
          { id: 'd', label: '让 AI 起草后自动套用我给的模板输出', scores: { workflow: 2, agent: 2 } },
          { id: 'e', label: '让 AI 直接操作文件、表格或网页完成任务', scores: { agent: 3 } },
          { id: 'none', label: '以上都还没用过', scores: {}, exclusive: true },
        ],
      },
      {
        id: 'q7c',
        type: 'multi',
        badge: '工具题',
        title: '下面这些功能，你已经真实用过哪些？',
        options: [
          { id: 'a', label: 'AI 的联网搜索或深度研究功能', scores: { context: 2 } },
          { id: 'b', label: '发链接让 AI 读网页内容', scores: { context: 2 } },
          { id: 'c', label: '用 AI 做日程、待办、提醒类的事务自动化', scores: { workflow: 2, agent: 1 } },
          { id: 'd', label: '给 AI 设置过固定的自定义指令或系统提示', scores: { workflow: 2 } },
          { id: 'e', label: '用能自己执行多步任务的 Agent 工具', scores: { agent: 3 } },
          { id: 'none', label: '以上都还没用过', scores: {}, exclusive: true },
        ],
      },
    ],
  },
  {
    slot: 'agent-briefing',
    variants: [
      {
        id: 'q8a',
        type: 'single',
        badge: 'Agent 题',
        title: '如果让 AI Agent 帮你做一份竞品调研，你会怎么交代？',
        options: [
          { id: 'a', label: '帮我调研一下竞品', scores: { agent: 1 } },
          { id: 'b', label: '列 5 个竞品，整理优缺点', scores: { agent: 1, workflow: 1 } },
          { id: 'c', label: '给它竞品名单、输出表格字段、资料来源要求和截止标准', scores: { context: 2, workflow: 3, agent: 2 } },
          { id: 'd', label: '让它先写调研计划，执行后自查缺口，再输出可给领导看的结论', scores: { context: 2, workflow: 4, agent: 3, judgment: 2 } },
        ],
      },
      {
        id: 'q8b',
        type: 'single',
        badge: 'Agent 题',
        title: '让 AI Agent 帮你整理每周的数据周报，你会怎么交代？',
        options: [
          { id: 'a', label: '"帮我整理下这周的数据"', scores: { agent: 1 } },
          { id: 'b', label: '给它数据来源和我常用的表格模板', scores: { context: 2, workflow: 2, agent: 1 } },
          { id: 'c', label: '来源、模板、口径说明都给全，并要求把异常数据单独标出来', scores: { context: 2, workflow: 3, agent: 2, judgment: 1 } },
          { id: 'd', label: '让它先提交整理方案，跑完自查一遍口径，再把结果给我', scores: { workflow: 4, agent: 3, judgment: 2 } },
        ],
      },
      {
        id: 'q8c',
        type: 'single',
        badge: 'Agent 题',
        title: '要让 AI Agent 帮你张罗一次跨部门评审会（定时间、发通知、收材料），你会怎么交代？',
        options: [
          { id: 'a', label: '一句话丢给它："帮我组织下评审会"', scores: { agent: 1 } },
          { id: 'b', label: '列一个待办清单，让它照着做', scores: { workflow: 2, agent: 1 } },
          { id: 'c', label: '清单之外，每一步都写清完成标准，比如通知要确认到人', scores: { context: 1, workflow: 3, agent: 2 } },
          { id: 'd', label: '让它自己拆步骤和排期，我只在发通知前和开会前两个节点确认', scores: { workflow: 4, agent: 3, judgment: 1 } },
        ],
      },
    ],
  },
  {
    slot: 'verification',
    variants: [
      {
        id: 'q9a',
        type: 'single',
        badge: '判断题',
        title: 'AI 给你一段行业数据，你准备放进汇报里。哪种做法更像你？',
        options: [
          { id: 'a', label: '看起来合理就放进去', scores: {} },
          { id: 'b', label: '让 AI 交叉核对三遍，并给出可信度评分', scores: { judgment: 1 } },
          { id: 'c', label: '要求给出来源、时间、口径，并标出不确定处', scores: { judgment: 4, context: 1 } },
          { id: 'd', label: '只把它当线索，自己查源头或让同事复核', scores: { judgment: 5, workflow: 1 } },
        ],
      },
      {
        id: 'q9b',
        type: 'single',
        badge: '判断题',
        title: 'AI 给了你一段涉及政策法规的建议，你会怎么用？',
        options: [
          { id: 'a', label: '写得很专业，直接采纳', scores: {} },
          { id: 'b', label: '让 AI 引用具体条文，有条文我就放心了', scores: { judgment: 1 } },
          { id: 'c', label: '要求给出条文出处，我去官方渠道核对原文', scores: { judgment: 4, context: 1 } },
          { id: 'd', label: '只当初步梳理，正式结论找专业人士确认', scores: { judgment: 5, workflow: 1 } },
        ],
      },
      {
        id: 'q9c',
        type: 'single',
        badge: '判断题',
        title: '对外发布的文案里有几个 AI 算出来的数字，发布前你会怎么处理？',
        options: [
          { id: 'a', label: '是按我给的数据算的，应该没问题', scores: {} },
          { id: 'b', label: '让 AI 再复算一遍，两次一致就用', scores: { judgment: 1 } },
          { id: 'c', label: '要求列出每个数字的来源和计算过程再检查', scores: { judgment: 4, context: 1 } },
          { id: 'd', label: '对外的关键数字，自己拿原始数据核一遍', scores: { judgment: 5, workflow: 1 } },
        ],
      },
    ],
  },
  {
    slot: 'assets',
    variants: [
      {
        id: 'q10a',
        type: 'multi',
        badge: '沉淀题',
        title: '你有没有把 AI 用法沉淀下来，变成可以复用的东西？',
        options: [
          { id: 'a', label: '收藏过好用的 Prompt', scores: { ask: 1 } },
          { id: 'b', label: '整理过固定任务的模板', scores: { workflow: 2 } },
          { id: 'c', label: '做过自己的知识库或资料包', scores: { context: 3 } },
          { id: 'd', label: '做过自动化脚本、小网页、表格工具', scores: { agent: 3, workflow: 2 } },
          { id: 'e', label: '做过 Skill、Agent 配置或团队可复用的流程', scores: { agent: 4, workflow: 3 } },
          { id: 'none', label: '还没有沉淀过', scores: {}, exclusive: true },
        ],
      },
      {
        id: 'q10b',
        type: 'multi',
        badge: '沉淀题',
        title: '下面这些"家底"，你现在真实拥有哪些？',
        options: [
          { id: 'a', label: '几条随手存的好用提示词', scores: { ask: 1 } },
          { id: 'b', label: '一套按任务分类整理的模板', scores: { workflow: 2 } },
          { id: 'c', label: '一个持续维护的个人资料库或知识库', scores: { context: 3 } },
          { id: 'd', label: '给自己做的小工具或自动化脚本', scores: { agent: 3, workflow: 2 } },
          { id: 'e', label: '被同事拿去用的模板或流程', scores: { agent: 4, workflow: 3 } },
          { id: 'none', label: '目前都还没有', scores: {}, exclusive: true },
        ],
      },
      {
        id: 'q10c',
        type: 'multi',
        badge: '沉淀题',
        title: '关于复用，下面哪些是你真实的习惯？',
        options: [
          { id: 'a', label: '会把满意的对话存档，回头翻着用', scores: { ask: 1 } },
          { id: 'b', label: '固定任务有固定的开场提示词', scores: { workflow: 2 } },
          { id: 'c', label: '攒了一套自己领域的资料，做任务时喂给 AI', scores: { context: 3 } },
          { id: 'd', label: '把重复工作交给了脚本或自动化流程', scores: { agent: 3, workflow: 2 } },
          { id: 'e', label: '我的 AI 流程有同事在复用', scores: { agent: 4, workflow: 3 } },
          { id: 'none', label: '每次都是从零开始问', scores: {}, exclusive: true },
        ],
      },
    ],
  },
  {
    slot: 'safety',
    variants: [
      {
        id: 'q11a',
        type: 'single',
        badge: '安全题',
        title: '遇到公司内部资料，你会怎么给 AI 处理？',
        options: [
          { id: 'a', label: '直接发，方便最重要', scores: {} },
          { id: 'b', label: '删掉明显敏感信息再发', scores: { judgment: 1 } },
          { id: 'c', label: '先脱敏，再只发完成任务必要的部分', scores: { judgment: 3, context: 1 } },
          { id: 'd', label: '先判断资料等级，再选公司授权工具或本地处理方式', scores: { judgment: 5, workflow: 1 } },
        ],
      },
      {
        id: 'q11b',
        type: 'single',
        badge: '安全题',
        title: '手头的任务涉及客户的个人信息，你会怎么用 AI？',
        options: [
          { id: 'a', label: '直接发给 AI，它又不会泄露', scores: {} },
          { id: 'b', label: '把姓名改成"小王小李"再发', scores: { judgment: 1 } },
          { id: 'c', label: '只保留任务必需的字段，其余全部去掉再发', scores: { judgment: 3, context: 1 } },
          { id: 'd', label: '先确认公司政策和工具是否允许处理这类信息，不允许就不用 AI', scores: { judgment: 5, workflow: 1 } },
        ],
      },
      {
        id: 'q11c',
        type: 'single',
        badge: '安全题',
        title: '要用 AI 分析一份还没公开的业务数据，你会怎么做？',
        options: [
          { id: 'a', label: '发了，效率要紧', scores: {} },
          { id: 'b', label: '只摘一部分发，应该问题不大', scores: { judgment: 1 } },
          { id: 'c', label: '脱敏之后，只发分析必需的部分', scores: { judgment: 3, context: 1 } },
          { id: 'd', label: '先分级判断：敏感数据走公司授权工具，或干脆不用 AI 处理', scores: { judgment: 5, workflow: 1 } },
        ],
      },
    ],
  },
  {
    slot: 'relationship',
    variants: [
      {
        id: 'q12a',
        type: 'single',
        badge: '分工题',
        title: '你现在和 AI 的关系，更像哪一种？',
        options: [
          { id: 'a', label: '搜索框：我问，它答', scores: { ask: 1 } },
          { id: 'b', label: '助理：我派活，它省时间', scores: { ask: 2, workflow: 1 } },
          { id: 'c', label: '搭档：我们来回推敲', scores: { ask: 3, context: 2, judgment: 1 } },
          { id: 'd', label: '小团队：我定目标、资料和验收，它跑过程', scores: { workflow: 4, agent: 3, judgment: 2 } },
          { id: 'e', label: '分工体系：我设计流程和分工，AI 放大整体产出', scores: { workflow: 5, agent: 4, judgment: 3 } },
        ],
      },
      {
        id: 'q12b',
        type: 'single',
        badge: '分工题',
        title: '回想一下最近一个普通工作日，AI 是怎么参与的？',
        options: [
          { id: 'a', label: '想起来才用一下', scores: { ask: 1 } },
          { id: 'b', label: '固定几类任务会交给它', scores: { ask: 2, workflow: 1 } },
          { id: 'c', label: '大部分文字类工作都会先过一遍 AI', scores: { ask: 3, context: 2, judgment: 1 } },
          { id: 'd', label: '有些任务从头到尾是 AI 跑的，我只做验收', scores: { workflow: 4, agent: 3, judgment: 2 } },
          { id: 'e', label: '常用流程已经固化，新任务先想"这个能不能交给 AI 跑"', scores: { workflow: 5, agent: 4, judgment: 3 } },
        ],
      },
      {
        id: 'q12c',
        type: 'single',
        badge: '分工题',
        title: '接到一个重要的新任务，你的默认动作是什么？',
        options: [
          { id: 'a', label: '自己先干，卡住了再问 AI', scores: { ask: 1 } },
          { id: 'b', label: '先问 AI 一句，看看它靠不靠谱', scores: { ask: 2 } },
          { id: 'c', label: '先把任务背景整理成一段话，发给 AI 一起拆解', scores: { ask: 3, context: 3, workflow: 1 } },
          { id: 'd', label: '先设计分工：哪些我做、哪些 AI 做、怎么验收', scores: { workflow: 4, agent: 3, judgment: 2 } },
        ],
      },
    ],
  },
]
