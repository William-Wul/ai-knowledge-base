import json,re,collections
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
ranked=sorted((d for d in ds if d['slug'] not in exclude and category(d) in ['image','video','web','tool','copy'] and len(d.get('promptFull','').strip())>=180 and d.get('mediaUrl') and not re.fullmatch(r'https?://\S+',d.get('promptFull','').strip())),key=lambda d:(-score(d),d['slug']))
selected=[];counts=collections.Counter();clusters=collections.Counter();sources=collections.Counter()
quota={'image':75,'video':45,'web':27,'tool':3,'copy':0}
for d in ranked:
 if d['slug'] in keep:selected.append(d); counts[category(d)]+=1;clusters[(category(d),topic(d))]+=1;sources[d.get('source')]+=1
for d in ranked:
 cat=category(d);top=topic(d)
 if counts[cat]>=quota[cat] or d['slug'] in keep:continue
 if cat=='image' and top in ['海报','肖像','角色','空间','产品'] and clusters[(cat,top)]>=dict(海报=20,肖像=8,角色=14,空间=8,产品=16)[top]:continue
 if cat=='video' and top in ['广告','动作','日常','变身','动画','时尚'] and clusters[(cat,top)]>=dict(广告=14,动作=5,日常=6,变身=8,动画=12,时尚=2)[top]:continue
 selected.append(d); counts[cat]+=1;clusters[(cat,top)]+=1
ordered=[]
for band in sorted({int(score(d)//5) for d in selected},reverse=True):
 buckets={cat:sorted([d for d in selected if int(score(d)//5)==band and category(d)==cat],key=lambda d:(-score(d),d['slug'])) for cat in quota}
 while any(buckets.values()):
  for cat in ['image','video','web','tool','copy']:
   if buckets[cat]:ordered.append(buckets[cat].pop(0))
selected=ordered
for i,d in enumerate(selected):d['selectionRank']=i+1;d['selectionScore']=score(d);d['siteCategory']=category(d)
Path('docs/.vitepress/cache/goodcase/selection-candidates.json').write_text(json.dumps(selected,ensure_ascii=False,indent=2))
print('selected',len(selected),counts,'clusters',clusters)
for d in selected: print(d['selectionRank'],d['siteCategory'],d['slug'],d['title'],str(d['selectionScore']),len(d['promptFull']),'NO-ZH' if not d.get('promptTranslationZh') and d.get('contentLocale')!='zh-CN' else '')
