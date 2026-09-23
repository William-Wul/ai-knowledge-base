import json,subprocess,concurrent.futures,io,time
from pathlib import Path
from PIL import Image,ImageOps
selected=json.loads(Path('docs/.vitepress/cache/goodcase/selection-candidates.json').read_text());curated={c['slug'] for c in json.loads(Path('docs/.vitepress/data/practice-cases.json').read_text())}
out=Path('docs/public/images/cases/catalog');out.mkdir(parents=True,exist_ok=True)
def one(d):
 if d['slug'] in curated:return None
 target=out/(d['slug']+'.jpg')
 if target.exists():return None
 url=d.get('posterUrl') or (d['mediaUrl'] if d['mediaType']=='image' else None)
 if not url:return {'slug':d['slug'],'error':'missing-poster'}
 for attempt in range(2):
  try:
   data=subprocess.check_output(['curl','-fsSL','--max-time','25','--max-filesize','16000000',url],stderr=subprocess.DEVNULL)
   im=Image.open(io.BytesIO(data));im.seek(getattr(im,'n_frames',1)*2//3);im=ImageOps.exif_transpose(im).convert('RGB');im.thumbnail((800,600));im.save(target,'JPEG',quality=83,optimize=True)
   return None
  except Exception as e:
   if attempt: return {'slug':d['slug'],'error':str(e)}
errors=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 for i,r in enumerate(pool.map(one,selected),1):
  if r:errors.append(r)
  if i%30==0:print('封面',i,'/',len(selected),flush=True)
Path('docs/.vitepress/cache/goodcase/thumbnail-errors.json').write_text(json.dumps(errors,ensure_ascii=False,indent=2));print(json.dumps(errors,ensure_ascii=False))
