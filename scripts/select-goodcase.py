import json,re,collections,argparse
parser=argparse.ArgumentParser()
parser.add_argument("--add",type=int,default=0)
parser.add_argument("--category",choices=["video"])
args=parser.parse_args()
from pathlib import Path
p=Path('docs/.vitepress/cache/goodcase')
ds=[]
for f in p.glob('*.json'):
 d=json.loads(f.read_text())
 if isinstance(d,dict) and d.get('slug') and d.get('promptFull'):ds.append(d)
curated=json.loads(Path('docs/.vitepress/data/practice-cases.json').read_text()); keep={c['slug'] for c in curated}
tools={'file-upload','lumi-fcc36eede4ad','lovable-1ab5b549beb5'}
def category(d):return 'tool' if d['slug'] in tools else d['category']
def score(d):
 t=d.get('promptFull','');name=d['title'];cat=category(d)
 # Language and translation fields are deliberately excluded from scoring.
 n=30+min(len(t)/180,10)+(8 if d.get('mediaUrl') else 0)+(8 if d.get('sourceUrl') and d.get('creator') else 0)
 n+=min(d.get('stabilityScore',0)/10,9)
 n+=6 if d.get('provenance',{}).get('verifiedAgainstSource') else 0
 n+=9 if re.search('reference|参考|argument|replace|替换|\{.*?\}|\[.*?\]',t,re.I) else 0
 n+=12 if re.search('product|brand|poster|logo|商品|产品|品牌|海报|头像|室内|信息图|名片|邮件|签名|计算器|角色设定|故事板|分镜',name+' '+t[:200],re.I) else 0
 n+=6 if re.search('layout|composition|lighting|camera|镜头|构图|布局|光线|步骤',t,re.I) else 0
 n+=8 if cat=='tool' else 0
 if d.get('tags') and 'source-aceternity' in d['tags']:n-=12
 if len(t)>15000:n-=8
 if re.search('人像|美女|女孩|少女|女神|女性|女王|红裙|唇油|泳池|泳装|障碍|比基尼|紧身',name):n-=8
 if 'reconstructed' in d['slug']:n-=40
 return round(n,2)
def topic(d):
 title=d['title'];cat=category(d)
 if cat=='image':
  for key,regex in [('海报','海报|poster|Poster'),('肖像','人像|肖像|女孩|少女|女性|模特'),('角色','角色|人物|贴纸|卡通'),('空间','建筑|空间|室内|房间|住宅'),('产品','产品|商品|包装|广告|香水|Logo|logo')]:
   if re.search(regex,title):return key
 if cat=='video':
  for key,regex in [('广告','广告|产品|商品|品牌'),('动作','打斗|战斗|对决|追逐|动作'),('日常','日常|生活|Vlog|vlog'),('变身','变身|变形|变成|转场'),('动画','动画|皮克斯|Pixar|定格'),('时尚','时装|美女|红裙|泳装')]:
   if re.search(regex,title):return key
 return '其他'
exclude={'8-f-1-9578d4d0451d','nano-banana-flow-antigravity-423c21fb568e','arctic-mint-gum-debd6203b36e','golden-autumn-harvest-poster','product-poster-workflow','easy-product-relight','case-6d72adabab02','case-5b727d91b441'}
exclude.update({'case-9c747054ceeb','ethancole-ai-seedance-ai-c8e1a1b52569'})
# Editorial review: mismatched media, duplicate themes, or unsuitable emphasis for employee learning.
exclude.update({'synapsex-3d-hero-44312666887a','gpt-image-a-sophisticated-minimalist-lifestyle-art-poster-featuring-person-subject-m-6f9f4b65ad5a','gpt-image-create-a-hyper-realistic-cinematic-cosplay-photograph-of-a-clearly-adult-woman-62b74321e905','boa-hancock-water-obstacle-race-prompt','johnagi168-ai-e3cbef38a6d1','case-35f04fe7df2d','case-3b1796c66ab4','gpt-image-create-a-highly-tactile-macro-visualization-using-a-continuous-viscous-fiber-fl-a0f44dc9087e','seedance-2-0-181cb461432f'})
# 视频增量：排除实际依赖编程渲染的网页演示，以及本批不采用的猎奇题材。
if args.category=='video':exclude.update({'case-c370a0c054b8','case-48175d8e8ac4','minimax-h3-glacia-2fde7e8c6f96','case-0b2c70939a2c','seedance-cinematic-horror-action-short-film-set-aboard-a-japanese-highway-bus-during-the-5bc85c0e13d8','seedance-cinematic-sci-fi-horror-action-short-film-set-in-a-research-laboratory-opens-w-9661cd7bd95d','johnagi168-seedance-ai-792fb30bed36'})

# 本批全文与素材审阅：排除截断、缺段、失效来源与用途不符的候选。
exclude.update(['case-0b2c70939a2c', 'case-48175d8e8ac4', 'case-73b2a4fe0c1a', 'case-c370a0c054b8', 'google-stitch-claude-9c762b56d629', 'japanese-school-uniform-classroom-portrait', 'johnagi168-seedance-ai-792fb30bed36', 'minimax-h3-glacia-2fde7e8c6f96', 'nano-banana-pro-use-the-uploaded-reference-image-as-the-exact-facial-identity-reference-d4516bf169be', 'nano-banana-subject-f070e46a3d85', 'redphase-survey-64a429edcda3', 'rivr', 'seedance-2-5-cinematic-horror-action-short-film-opens-with-an-instant-attack-no-slow-build-f8ebf859523e', 'seedance-cinematic-horror-action-short-film-set-aboard-a-japanese-highway-bus-during-the-5bc85c0e13d8', 'seedance-cinematic-sci-fi-horror-action-short-film-set-in-a-research-laboratory-opens-w-9661cd7bd95d', 'seedance-create-a-30-second-ultra-realistic-hollywood-sci-fi-cinematic-video-following-r-c3fdac6c09f5', 'seedance-create-a-photorealistic-30-second-cinematic-tropical-travel-vlog-montage-set-in-b2ef30929284', 'seedance-gta-6-simulation-414a3b385a58', 'seedance-image1-image-0442b9e3-3e54-49fa-95ab-1dd25868733f-hypersonic-soni-do-space-802acc820b62', 'seedance-is-the-only-reference-for-the-main-character-1c1e9dd8e18b', 'seedance-kiss-kiss-d141755d3737', 'seedance-mission-the-great-diamond-escape-39fea191a6da', 'seedance-pace-continuous-tension-and-escalation-zero-pauses-maximum-buildup-into-cata-4f6c927ebd3f', 'seedance-paet-1-create-a-30-second-ultra-photorealistic-cinematic-live-action-fantasy-w-53cdfb689944', 'seedance-prompt-create-a-30-second-1080p-ultra-realistic-personal-home-video-showing-a-f4036ce777fe', 'seedance-seedance-2-5-on-5de3fbc4f714', 'seedance-seedance-2-5-on-d581d036c3b0', 'seedance-shot-1-0-0-1-2s-character-a-face-and-outfit-matching-the-reference-image-s-6d712bba22c5'])
ranked=sorted((d for d in ds if d['slug'] not in exclude and category(d) in ['image','video','web','tool','copy'] and len(d.get('promptFull','').strip())>=180 and d.get('mediaUrl') and not re.fullmatch(r'https?://\S+',d.get('promptFull','').strip())),key=lambda d:(-score(d),d['slug']))
existing=json.loads(Path('docs/.vitepress/data/practice-cases-imported.json').read_text())+curated
existing_ids={d['slug'] for d in existing}
existing_prompts={re.sub(r'\s+',' ',d['promptOriginal']).strip() for d in existing}
if args.add:
 if args.add != 150 and not (args.category=='video' and args.add>0):raise SystemExit('使用 --add 150 或 --add N --category video')
 ranked=[d for d in ranked if d['slug'] not in existing_ids and re.sub(r'\s+',' ',d['promptFull']).strip() not in existing_prompts]
 keep=set()
if not args.add:existing_prompts={re.sub(r'\s+',' ',d['promptOriginal']).strip() for d in curated}
selected=[];counts=collections.Counter();clusters=collections.Counter();sources=collections.Counter()
quota={'image':75,'video':45,'web':30 if args.add else 27,'tool':0 if args.add else 3,'copy':0}
if args.category:
 if not args.add:raise SystemExit('--category 必须与 --add 一起使用')
 quota={k:(args.add if k==args.category else 0) for k in quota}
for d in ranked:
 if d['slug'] in keep:selected.append(d); counts[category(d)]+=1;clusters[(category(d),topic(d))]+=1;sources[d.get('source')]+=1
for d in ranked:
 cat=category(d);top=topic(d)
 if counts[cat]>=quota[cat] or d['slug'] in keep:continue
 if cat=='image' and top in ['海报','肖像','角色','空间','产品'] and clusters[(cat,top)]>=dict(海报=20,肖像=8,角色=14,空间=8,产品=16)[top]:continue
 if cat=='video' and top in ['广告','动作','日常','变身','动画','时尚'] and clusters[(cat,top)]>=round(dict(广告=14,动作=5,日常=6,变身=8,动画=12,时尚=2)[top]*max(1,quota['video']/45)):continue
 normalized=re.sub(r'\s+',' ',d['promptFull']).strip()
 if normalized in existing_prompts:continue
 selected.append(d); existing_prompts.add(normalized); counts[cat]+=1;clusters[(cat,top)]+=1
ordered=[]
for band in sorted({int(score(d)//5) for d in selected},reverse=True):
 buckets={cat:sorted([d for d in selected if int(score(d)//5)==band and category(d)==cat],key=lambda d:(-score(d),d['slug'])) for cat in quota}
 while any(buckets.values()):
  for cat in ['image','video','web','tool','copy']:
   if buckets[cat]:ordered.append(buckets[cat].pop(0))
assert dict(counts)=={k:v for k,v in quota.items() if v}, f"候选不足：{counts}"
selected=ordered
for i,d in enumerate(selected):d['selectionRank']=i+1;d['selectionScore']=score(d);d['siteCategory']=category(d)
Path('docs/.vitepress/cache/goodcase/selection-candidates.json').write_text(json.dumps(selected,ensure_ascii=False,indent=2))
print('selected',len(selected),counts,'clusters',clusters)
for d in selected: print(d['selectionRank'],d['siteCategory'],d['slug'],d['title'],str(d['selectionScore']),len(d['promptFull']),'NO-ZH' if not d.get('promptTranslationZh') and d.get('contentLocale')!='zh-CN' else '')
