"""Small offline source and link check. Real browser review remains necessary."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote,urlparse
ROOT=Path(__file__).resolve().parent.parent
html=(ROOT/'index.html').read_text(encoding='utf-8')
class Parser(HTMLParser):
 def __init__(self):
  super().__init__();self.ids=set();self.references=[];self.images=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.add(a['id'])
  for key in ('href','src'):
   if key in a:self.references.append((tag,key,a[key]))
  if tag=='img':self.images.append(a)
p=Parser();p.feed(html);errors=[]
for tag,key,target in p.references:
 if not target:errors.append(f'Empty {tag}.{key}');continue
 if target.startswith('#'):
  if target[1:] not in p.ids:errors.append(f'Broken anchor: {target}')
 elif target.startswith(('http:','https:','mailto:','tel:','data:')):pass
 else:
  file=ROOT/unquote(urlparse(target).path)
  if not file.is_file():errors.append(f'Missing local asset: {file.relative_to(ROOT)}')
for image in p.images:
 if 'alt' not in image:errors.append('Image missing alt')
for id in ['main','tentang','bidang','jejak','fondasi','kontak']:
 if id not in p.ids:errors.append(f'Missing section: {id}')
if 'Lorem ipsum' in html or 'href="#"' in html:errors.append('Placeholder detected')
print(f'{len(p.references)} references, {len(p.images)} images, {len(p.ids)} named anchors')
if errors:
 for err in errors:print('ERROR:',err)
 raise SystemExit(1)
print('PASS: local website references')
