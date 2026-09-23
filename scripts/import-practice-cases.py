# -*- coding: utf-8 -*-
import json,re,hashlib
from pathlib import Path
root=Path.cwd(); base=root/'docs/.vitepress/data'; selected=json.loads(Path('docs/.vitepress/cache/goodcase/selection-candidates.json').read_text()); curated={d['slug']:d for d in json.loads((base/'practice-cases.json').read_text())}
titles={'moody-cafe-chiaroscuro-portrait-0d581a45e97d':'咖啡馆黑白光影肖像',
'celestial-renewal':'美容品牌的沉浸式首页',
'daisy-wild':'香水产品的撞色展示页',
'orbit-flora':'单屏互动海报网页',
'signal-id':'语音产品的深色首页',
'kresna-footer':'销售平台的动态页脚',
'cybersecurity-hero':'网络安全产品首页',
'nike-hover':'运动品牌的悬停交互网页',
'gemini-vs-claude-velorah-1f09726b10d6':'电动房车品牌展示页',
'neon-logic':'全屏视频背景的科技首页',
'claude-mythos-lithos-hero-df0603661e88':'地质品牌的纹理首页',
'innovation-lab':'创意工作室的沉浸式首页',
'prompt':'随滚动展开的时尚品牌网页',
'case-7098c85a0922':'密集排列的产品组合图',
'premium-black-and-white-editorial-poster':'黑白人像杂志封面',
'gpt-image-2-isometric-vol-073-12b5fd775ada':'照片变成微缩建筑海报',
'human-fragments-d7c48a962c73':'用巨型文字框住人物故事',
'ai-workflow-agents':'数字员工平台介绍页',
'email-marketing':'邮件排版风格的课程介绍页',
'mind-body-healing':'身心健康品牌首页',
'rare-gallery':'艺术画廊的作品展示页',
'gpt-image-2-veo-3-lovable-cec7a074af1a':'用图片与视频搭建营销网页',
'alcohol-marker-travel-poster-prompt':'马克笔手绘旅行海报',
'claude-fable-aethera-fintech-42f59ca99541':'金融产品的简洁介绍页',
'power-ai':'可替换品牌色的科技首页',
'radial-diagram':'带动画的放射状信息图网页',
'grok-imagine-grok-build-veldara-hero-d38c65fbe7af':'自然风格的品牌首页',
'batch-product-poster-proposal-generator':'一个产品生成八种海报方案',
'designpro-academy':'设计课程的全屏展示页',
'nano-banana-saas-2a600998d9b0':'把手绘草图变成产品网页',
'usd-halo':'金融品牌的留白与排版',
'wellness-balance':'健康产品的清爽首页',
'milkshake-5c0760224640':'奶昔配料的分层信息图',
'kigurumi-3732cc07e070':'粉色兔子连体衣杂志封面',
'seedance-2-5-d68024212dfc':'菠萝披萨突袭：第一视角喜剧长镜头',
'minimax-h3-15-ae2cadd5c3f4':'十五秒科幻短片的情绪分镜',
'case-c922c66a0fe7':'复古黑白照相亭四格拼贴',
'case-749c98da9b7d':'奶昔广告的八格分镜',
'asmr-lego-technic-e5706a9a0319':'乐高跑车组装分镜',
'case-779580528a24':'涂鸦隧道中的动漫赛车短片',
'seedance-2-5-ugc-7de9338ecfc9':'咖啡机开箱与试用短片',
'seedance-2-5-f3651857750b':'海岛骑行的一镜到底短片',
'seedance-2-5-f1696dad13bc':'翼装跳伞的连续跟拍短片',
'seedance-2-5-gopro-94a73eef1dbf':'第一视角的钓鱼与烤鱼短片',
'youralphamom-seedance-ai-9afbf3248f50':'两个十五秒镜头串成叙事短片',
'neon-jellyfish-scientific-specimen':'霓虹水母科学标本图',
'city-aesthetic-morning-poster-collage':'不同城市的早安海报组图',
'gpt-image-gpt-image-2-5-on-higgsfield-91ec53391d3d':'东京街头与复古摩托旅行海报',
'seedance-25-kpop-mv-zero-to-pop':'糖果色音乐短片的逐秒分镜',
'seedance-25-kpop-mv-dual-idol':'双人音乐短片的逐镜分镜',
'caliraval-minimax-h3-ai-ccf8d06fad6f':'参考图驱动的产品时尚短片',
'nano-banana-adf1b3e7ee46':'保持人脸不变，重做棚拍光线',
'case-265600f07f14':'同一角色的三格标准参考图',
'real-case-07-techiebysa':'牛角包制作过程短片',
'real-case-05-goodmanprotocol':'复古旅行海报拼贴',
'real-case-03-chesnyfcb':'水彩泼墨运动员海报',
'real-case-06-aimikoda':'魔法师的元素功夫短片'}
summaries={'case-7098c85a0922':'把多个产品排列为密集的三维组合，重点控制重叠关系、表面材质和整体配色。',
'celestial-renewal':'用全屏视频、柔和字体和滚动云层，搭建美容品牌的双屏展示页。',
'orbit-flora':'把字体、色彩和入场动画写清楚，做出无需滚动的单屏海报网页。',
'signal-id':'用暗色背景、醒目标题和清晰布局，展示语音身份产品。',
'kresna-footer':'将品牌信息、链接和动效收进独立页脚，适合嵌入已有网页。',
'cybersecurity-hero':'从导航、标题到背景细节，完整描述安全产品首页的视觉要求。',
'nike-hover':'用鼠标悬停切换视觉效果，并分别规定电脑和手机的交互方式。',
'gemini-vs-claude-velorah-1f09726b10d6':'以电动房车为主题，练习产品展示页的布局、素材与交互要求。',
'real-case-07-techiebysa':'按制作顺序展示牛角包，用手部动作、食物特写和镜头衔接讲清过程。',
'shamiweb3-seedance-ai-5620b354e47d':'以香水瓶为主角，用海滨落日、丝绸与闪光组织产品广告镜头。',
'minimax-h3-15-ae2cadd5c3f4':'把十五秒拆为四段，写清飞行员的动作、情绪变化、光线与现场声音。',
'lumi-fcc36eede4ad':'输入租金与生活开销，比较租房的实际负担，学习小计算器的输入和结果设计。',
'claude-mythos-lithos-hero-df0603661e88':'用地质纹理、品牌标题与留白，组织自然材料主题的首页。',
'real-case-05-goodmanprotocol':'将旅行地点与复古视觉元素组合，练习拼贴布局和城市特色的表达。',
'premium-black-and-white-editorial-poster':'保留参考照片的人物身份，用高对比黑白画面与醒目文字制作杂志封面。',
'lovable-1ab5b549beb5':'填写个人与公司信息，生成统一样式的邮件签名，练习表单和实时预览。',
'gpt-image-2-isometric-vol-073-12b5fd775ada':'上半幅保留照片，下半幅将主体变成带脚手架的等距微缩建筑。',
'rare-gallery':'用画廊式布局呈现作品，练习图片、标题与留白的关系。',
'gpt-image-2-veo-3-lovable-cec7a074af1a':'将图片、视频素材与建站要求组合，完成有动态效果的品牌展示网页。',
'real-case-03-chesnyfcb':'把运动员照片转成水彩泼墨海报，突出人物动作和运动氛围。',
'claude-fable-aethera-fintech-42f59ca99541':'围绕金融产品组织导航、介绍与行动按钮，练习简洁的产品排版。',
'batch-product-poster-proposal-generator':'围绕同一个产品提出八种海报方案，在保持品牌一致的前提下改变主题与角度。',
'aiwithnatalia-seedance-ai-12c56e79550f':'让粉色手袋成为东京街头短片的视觉中心，练习配饰、人物与场景的协调。',
'caliraval-minimax-h3-ai-ccf8d06fad6f':'以参考图锁定产品和人物，用时尚广告的镜头组织一段短片。',
'designpro-academy':'用全屏视频背景、课程标题和按钮，组织设计教育平台的第一屏。',
'johnagi168-minimax-h3-ai-8117e2f5f769':'用抛起的高跟鞋作为转场线索，将酒店浴袍造型衔接到礼服造型。',
'nano-banana-saas-2a600998d9b0':'从手绘布局草图出发，将结构、文案和样式要求交给 AI 编程工具。',
'city-aesthetic-morning-poster-collage':'为不同城市制作早安海报，结合本地文化元素、日期与短句，并变化配色和构图。',
'zyrellix-seedance-ai-cd1e800467b5':'围绕茉莉与橄榄香氛，将地中海悬崖、日光和产品细节串成广告。',
'strength04-x-seedance-ai-be4ae9f1e375':'将香辣薯片的包装、质感和动态画面拆成广告分镜，学习产品镜头的组织。',
'strength04-x-gpt-image-ai-4ed05af607cd':'围绕柑橘气泡饮设计广告分镜，用果肉、气泡与冰爽质感传达产品特点。',
'real-case-06-aimikoda':'用角色、元素特效和动作分段，组织魔法师的功夫表演。',
'techhalla-ai-86909e778a49':'让纸艺城市在镜头中折叠变换，练习结构化描述场景、变化过程与运镜。',
'synthesarah-seedance-ai-636eef3e35c4':'徒步者与猕猴互相歪头回应，用连续反应和停顿制造幽默。',
'weeleey6-seedance-ai-b03a5481e168':'将飞行员、战机与深海巨物组织成科幻短片，练习镜头衔接和角色一致性。',
'oggii-0-seedance-ai-5ed8176ffb89':'围绕辣味挑战安排人物反应、动作和镜头，模拟生活记录式短片。',
'zarairahh-seedance-ai-b7601661378a':'用三十秒记录健身房日常，安排运动、疲惫与收尾的动作节奏。',
'just-sharon7-seedance-ai-9c64e481a51d':'用第一视角表现灾难来临时的反应，学习环境变化和人物行动的连续性。',
'techhalla-seedance-ai-81e09066a66b':'用街头歌唱、超能力和变装串起喜剧桥段，保留人物外观与镜头衔接。',
'youralphamom-seedance-ai-9afbf3248f50':'分别制作两个十五秒片段，再手动拼接，用承接动作和相同设定连接故事。',
'neon-jellyfish-scientific-specimen':'用纯黑背景衬托发光水母，搭配色样与局部纹理，制作未来感科学标本图。',
'youmind-character-identity-reference-chart':'用多角度、表情和局部细节整理同一角色的外观，作为后续创作的参考。'}
# Only edit ordinary explanatory prose; code, URLs and inline identifiers remain intact.
glossary={'landing page':'展示页',
'hero heading':'首屏标题',
'quote text':'引言文字',
'navbar links':'导航链接',
'Background video':'背景视频',
'full-screen':'全屏',
'full-viewport':'全屏',
'hero section':'首屏区域',
'hero':'首屏',
'footer':'页脚',
'navbar':'导航栏',
'desktop':'电脑端',
'mobile':'手机端',
'tablet':'平板端',
'wrapper div':'外层 div 容器',
'wrapper':'外层容器',
'section':'区块',
'overlay':'遮罩',
'pill button':'胶囊形按钮',
'buttons':'按钮',
'button':'按钮',
'heading':'标题',
'subtext':'说明文字',
'navigation links':'导航链接',
'links':'链接',
'panel':'面板',
'hamburger icon':'菜单图标',
'sound indicator':'声音标识',
'animated layers':'动画图层',
'parallax scroll animations':'视差滚动动画',
'parallax':'视差',
'scroll progress':'滚动进度',
'viewport':'可视区域',
'opacity':'不透明度',
'lerp factor':'平滑插值系数',
'camera work':'镜头运动',
'film grain':'胶片颗粒',
'camera':'镜头',
'lighting':'光线',
'high-fashion':'高级时装',
'high-end':'高端',
'prompt':'提示词',
'GRWM':'出门前准备',
'storyboard':'分镜',
'handheld':'手持',
'CTA':'行动按钮',
'logo':'标志',
'fintech':'金融科技',
'hero 精确复刻':'首屏设计'}
glossary={k.lower():v for k,v in glossary.items()}
pattern=re.compile(r'\b('+ '|'.join(re.escape(k) for k in sorted(glossary,key=len,reverse=True))+r')\b',re.I)
def zh_prose(s):
 parts=re.split(r'(```[\s\S]*?```|`[^`]*`|\{argument[^}]*\}|https?://[^\s<>]+)',s)
 return ''.join(p if i%2 else pattern.sub(lambda m:glossary[m[0].lower()],p) for i,p in enumerate(parts))
def teaching(d,title):
 cat=d['siteCategory']; t=(d.get('promptTranslationZh') or d['promptFull']); reference=bool(re.search(r'参考|上传|reference|upload',t,re.I))
 if cat=='image':
  use='适合练习画面构图、风格控制和视觉素材制作。'; prep='准备支持图片生成的 AI 工具，确定主题、画幅比例和需要出现的文字。'
  if reference:prep+='提示词涉及参考图，请先准备自己的对应照片或产品图，并与提示词一起提交。'
  steps=['先看效果图，找出主体位置、配色和需要保留的细节。',
'复制下方中文提示词，把主体、品牌、地点或画面文字换成自己的内容；有【占位内容】时一并替换。',
'按提示词的要求提交参考图，先生成一张；对照要求检查主体、文字和构图，再针对问题修改。']
  lesson='把主体、画面布局、风格与限制分开描述，比只写一个风格名称更容易说明目标。'
  if re.search('分屏|上下|上半|下半|split',t,re.I):lesson='分别说明上下画面的表现方式，再明确两部分需要保持相同的主体、位置与构图。'
  elif re.search('多角度|身份|identity|consistent',t,re.I):lesson='把需要固定的人物特征逐项写出，并说明哪些姿势、表情或场景可以变化。'
  elif re.search('包装|产品|product',t,re.I):lesson='先固定产品形状与标识，再描述背景、材质和光线，避免主体在换场景时被改掉。'
  elif re.search('文字|排版|typography',t,re.I):lesson='把需要出现的文字与其位置分开写，同时约束留白和字号层次，减少图文互相遮挡。'
  exercise='保留原有构图，换成自己的主题做一版；再只调整配色或材质，比较哪个变化最影响画面。'
 elif cat=='video':
  use='适合练习短片分镜、动作连续性和声音描述。';prep='准备支持视频生成的工具，先确认可选时长、画幅和声音设置。'
  if reference:prep+='提示词涉及参考素材时，准备对应的人物、产品或场景图；提到音频时也需提供自己的音轨。'
  steps=['先看视频，再阅读完整提示词，标出每段镜头的时长、主体动作和衔接位置。',
'替换人物、产品或场景时，同步检查全文的称呼、服装和外观描述，保持前后一致。',
'按工具支持的时长制作；超过单次时长的内容按镜头拆段，并保留承接动作，最后拼接。',
'检查人物是否变化、动作是否连贯、声音是否对齐；一次只调整最明显的问题。']
  lesson='用时间段约束动作顺序，并同时说明镜头、角色和声音，让前后片段有明确的承接关系。'
  if re.search('single.take|一镜到底|不切镜|连续镜头',t,re.I):lesson='写清每个阶段的起点、动作和终点，再固定视角与空间关系，帮助长镜头保持连续。'
  elif re.search('JSON|"duration"|"camera"',t):lesson='把时长、主体、镜头和声音分字段写出，便于逐项替换，也便于定位需要修改的部分。'
  exercise='先保留镜头顺序，只替换一个主体或场景。若动作开始不连贯，减少同一段内的动作数量。'
 elif cat=='web':
  use='适合制作品牌介绍、活动展示或网页区块的视觉原型。';prep='准备 AI 编程工具，以及自己的品牌名、文案、图片或视频。提示词中的代码与素材地址可以一并交给编程工具。'
  steps=['观看页面演示，确认要保留的布局与交互，再复制下方完整中文要求。',
'替换品牌、正文和素材地址；保留布局、尺寸与动画要求，让 AI 编程工具生成可预览页面。',
'分别在电脑与手机宽度检查文字、图片、按钮和动画，再把具体问题交给 AI 修改。',
'逐个点击导航和按钮，为准备使用的入口补齐目标页面或功能。']
  lesson='把布局、字体、配色、素材与交互分别写清，同时说明电脑和手机两种尺寸的行为。'
  if re.search('scroll|滚动',t,re.I):lesson='把滚动过程分为几个阶段，说明每一阶段哪些元素移动、缩放或出现，以及手机端如何处理。'
  exercise='沿用页面结构，替换为自己的品牌与素材；保留一个主要行动按钮，检查它是否连接到正确位置。'
 else:
  use='适合练习用 AI 制作输入明确、结果可检查的小工具。';prep='准备 AI 编程工具，并列出几组日常会用到的输入，以及你期望得到的结果。'
  steps=['阅读下方完整要求，确认用户要填哪些内容、工具需要输出什么。',
'复制中文提示词，补充自己的字段与样式要求，让 AI 生成可运行的预览。',
'输入正常值、空值与极端值，逐项检查输出；把错误现象和期望结果一起交给 AI 修正。',
'在手机上检查输入、预览和复制操作，再尝试换一组真实资料。']
  lesson='先明确输入与输出，再写布局和交互细节；用具体样例确认结果是否符合要求。';exercise='把输入项换成自己的工作场景，保留能检查的输出，并准备三组样例验证功能。'
 if d['slug'] in ['real-case-07-techiebysa','real-case-06-aimikoda','case-749c98da9b7d','strength04-x-seedance-ai-be4ae9f1e375','strength04-x-gpt-image-ai-4ed05af607cd','asmr-lego-technic-e5706a9a0319']:
  prep='准备支持参考图的生图工具和视频工具，以及自己的角色或产品素材。这个案例先用分镜图安排镜头，再把分镜用于视频制作。'
  steps=['先阅读分镜要求，替换角色或产品，保留镜头顺序和各段时长。','将分镜图提示词交给生图工具，检查各格的主体、动作、文字与前后关系。','将确认后的分镜图交给视频工具；原文含视频指令时使用对应段落，否则按分镜逐段说明动作与运镜。','检查镜头衔接、人物和产品的一致性，再按顺序拼接片段。']
  lesson='先用分镜图把动作和镜头安排清楚，再制作视频；分镜图指令与视频动作指令分别使用。'
 if d['slug']=='lumi-fcc36eede4ad':steps[2]='用手算结果核对租金、通勤和生活开销的合计，并检查空值与零值时的显示。'
 if d['slug']=='lovable-1ab5b549beb5':steps[2]='填入姓名、职位和联系信息，检查预览，再复制到邮件编辑器，确认排版和链接。'
 return dict(use=use,preparation=prep,steps=steps,lesson=lesson,exercise=exercise)
imported=[]; manifest=[]
for d in selected:
 slug=d['slug'];manifest.append(dict(slug=slug,rank=d['selectionRank'],category=('web' if d['siteCategory']=='tool' else d['siteCategory']),editorialScore=d['selectionScore'],sourcePromptSha256=hashlib.sha256(d['promptFull'].encode()).hexdigest()))
 if slug in curated:continue
 title=titles.get(slug,d['title']);summary=zh_prose(summaries.get(slug,d['summary']))
 summary=summary.replace('一份高度详细、',
'一份').replace('极其详尽',
'详细').replace('高端',
'').replace('专业级',
'').replace('电影级',
'电影感').replace('锁死',
'固定')
 file=base/'case-translations'/f'{slug}.txt'
 if file.exists():zh=file.read_text().strip();note='本站中文翻译；品牌、画面文字与台词按原作保留。'
 elif d['contentLocale']=='zh-CN':zh=d['promptFull'];note='作者中文原文，保留原样。'
 else:zh=zh_prose(d.get('promptTranslationZh') or '');note='Goodcase 中文译文，本站整理术语；代码和素材地址保留原样。'
 argument_map=json.loads((base/'case-translations/arguments.json').read_text())
 zh=re.sub(r'\{argument[^}]*default="([^"]*)"[^}]*\}',lambda m:'【'+argument_map.get(m[1],m[1])+'】',zh)
 if note=='作者中文原文，保留原样。' and zh!=d['promptFull']:note='作者中文提示词，本站整理可替换内容。'
 assert re.search('[\u4e00-\u9fff]',zh),slug
 c=dict(slug=slug,category=('web' if d['siteCategory']=='tool' else d['siteCategory']),title=title,summary=summary,**teaching(d,title),creator=d['creator'],sourceUrl=d['sourceUrl'],url=d['url'],cover=f'/images/cases/catalog/{slug}.jpg',mediaUrl=d['mediaUrl'],mediaType=d['mediaType'],models=[m for m in d['recommendedModels'] if m not in ['待补充模型',
'Source prompt only']],promptOriginal=d['promptFull'],promptZh=zh,translationNote=note,contentKind='prompt',capturedAt='2026-09-23',tested=False)
 if d['mediaType']=='image':c['imageUrl']=d['mediaUrl']
 imported.append(c)
(base/'practice-cases-imported.json').write_text(json.dumps(imported,ensure_ascii=False,indent=2)+'\n')
(base/'practice-cases-selection.json').write_text(json.dumps({'capturedAt':'2026-09-23',
'sourceTotal':1234,'sourceFetched':1206,'sourceUnavailable':28,'selectionPolicy':'完整提示词、效果、来源与可复用性优先；语言不参与评分。同一质量区间交错展示不同类别；保留六个已审阅案例。',
'cases':manifest},ensure_ascii=False,indent=2)+'\n')
print('imported',len(imported),'selection',len(manifest))
