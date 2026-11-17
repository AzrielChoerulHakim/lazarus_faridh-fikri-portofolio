import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
const js=fs.readFileSync(path.join(root,'app.js'),'utf8');

test('all factual career items are preserved from the existing portfolio',()=>{
 for(const name of ['Faridh Fikri','PT Starlead Technology Indonesia','Coil Disco Indonesia','Pengadilan Agama Jakarta Selatan','BNN Kota Tangerang','UIN Syarif Hidayatullah Jakarta','Simplilearn','Juristic Indonesia','Global Operation Indonesia']){
   assert.ok(html.includes(name),'missing verified content '+name);
 }
 for(const token of ['Sep—Des 2025','Des 2022—Jul 2026','Feb 2024','Jan 2023','3,76','2021—2025','Jul 2026','Peradilan Perdata','Contract Drafting','TOEFL Prediction','560','SKHPN','PKWT']){
   assert.ok(html.includes(token),'missing CV detail '+token);
 }
 assert.equal((html.match(/<details\b/g)||[]).length,4,'exactly four real experience dossiers');
 assert.equal((html.match(/class="training"/g)||[]).length,4,'exactly four qualifications');
});
test('verified contacts and personal image are retained',()=>{
 assert.match(html,/mailto:faridhfikri1507@gmail\.com/);
 assert.match(html,/https:\/\/wa\.me\/6285814901816/);
 assert.match(html,/assets\/faridh-portrait\.webp/);
 assert.match(html,/Tangerang, Banten/);
 assert.doesNotMatch(html,/Faridh.*(Web Developer|Frontend Engineer)|Studio Aster|Lumen Project/);
});
test('one complete raster per independent art scene; never a stacked visual',()=>{
 assert.equal((html.match(/<figure\b/g)||[]).length,4);
 assert.equal((html.match(/<img\b/g)||[]).length,4);
 assert.doesNotMatch(html,/<svg\b|<canvas\b|<picture\b|<model-viewer\b|<iframe\b/i);
 assert.doesNotMatch(css,/background-image|data:image|image-set\(|clip-path|mix-blend-mode|radial-gradient\(|linear-gradient\(|drop-shadow/i);
 assert.doesNotMatch(js,/pointermove|WebGL|three\.js|requestAnimationFrame|parallax/i);
 assert.ok(html.includes('LUKISAN SEBAGAI METAFORA'));
});
test('all section anchors, button IDs, code and alt texts are valid',()=>{
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size);
 for(const match of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(match[1]),'broken anchor '+match[1]);
 for(const match of html.matchAll(/<img\b[^>]+>/g))assert.match(match[0],/\balt="/);
 assert.doesNotThrow(()=>new vm.Script(js));
});
test('mobile and reduced motion safety rules exist',()=>{
 for(const w of ['1190','930','710','430','350'])assert.ok(css.includes('@media(max-width:'+w+'px)'));
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(html,/aria-controls="mobile-nav"/);
 assert.match(html,/aria-expanded="false"/);
});
