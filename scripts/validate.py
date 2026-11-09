from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlparse
import re

ROOT = Path(__file__).resolve().parent.parent
html = (ROOT / 'index.html').read_text(encoding='utf-8')
class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.references = []
        self.images = []
        self.links = []
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if 'id' in d:
            self.ids.add(d['id'])
        for a in ('href','src'):
            if a in d:
                self.references.append((tag, a, d[a]))
        if tag == 'img':
            self.images.append(d)
        if tag == 'a':
            self.links.append(d)
parser=Parser();parser.feed(html)
errors=[]
for tag,attr,url in parser.references:
    if not url: errors.append(f'{tag} has empty {attr}');continue
    if url.startswith('#'):
        if url[1:] not in parser.ids: errors.append(f'broken anchor {url}')
        continue
    if url.startswith(('mailto:','tel:','https://','http://','data:')):continue
    part=unquote(urlparse(url).path)
    if not (ROOT / part).is_file():errors.append(f'missing local asset: {part}')
for img in parser.images:
    if not img.get('alt'):errors.append('image missing meaningful alt')
if 'Lorem ipsum' in html or 'href="#"' in html:errors.append('placeholder detected')
for anchor in parser.links:
    if anchor.get('target') == '_blank' and 'noopener' not in anchor.get('rel',''):
        errors.append('external target blank without noopener')
for section_id in ('main','profil','pengalaman','kompetensi','kontak'):
    if section_id not in parser.ids:errors.append(f'missing section {section_id}')
print(f'Checked {len(parser.references)} references, {len(parser.images)} images, {len(parser.ids)} anchors')
if errors:
    for err in errors:print('ERROR:',err)
    raise SystemExit(1)
print('All static checks passed')
