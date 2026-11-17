import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=path.resolve(import.meta.dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
const js=fs.readFileSync(path.join(root,'app.js'),'utf8');
const exists=file=>fs.existsSync(path.join(root,file));

test('entire four-entry CV work history is preserved, not turned into fake software projects',()=>{
 const names=['Faridh Fikri','PT STARLEAD TECHNOLOGY INDONESIA','COIL DISCO INDONESIA','PENGADILAN AGAMA JAKARTA SELATAN','BNN KOTA TANGERANG','UIN Syarif Hidayatullah Jakarta','Simplilearn','Juristic Indonesia','GLOBAL OPERATION INDONESIA'];
 for(const name of names)assert.ok(html.toLowerCase().includes(name.toLowerCase()),'missing source detail '+name);
 for(const term of ['PKWT','SKHPN','2025','3,76','2021—2025','2026','560','Peradilan Perdata &amp; Pidana','Contract Drafting','Administrasi HRGA','Microsoft Office','B2B/B2C'])assert.ok(html.includes(term),'missing factual term: '+term);
 assert.equal((html.match(/<details class="work-item"/g)||[]).length,4);
 assert.equal((html.match(/class="certificate"/g)||[]).length,4);
 assert.doesNotMatch(html,/Faridh.*(Web Developer|Frontend Engineer)|Studio Aster|Lumen Project|award-winning|1000\+|95% satisfaction/i);
});
test('real portrait and actual contact channels are intact',()=>{
 assert.match(html,/assets\/faridh-portrait\.webp/);
 assert.match(html,/mailto:faridhfikri1507@gmail\.com/);
 assert.match(html,/https:\/\/wa\.me\/6285814901816/);
 assert.match(html,/Tangerang, Banten/);
 assert.ok(exists('assets/faridh-portrait.webp'));
});
test('impasto exhibits are complete independent raster paintings, not composited layers',()=>{
 assert.equal((html.match(/<img\b/g)||[]).length,3);
 assert.equal((html.match(/<figure\b/g)||[]).length,3);
 for(const name of ['impasto-dissolution.webp','impasto-procession.webp']){
   assert.match(html,new RegExp(name.replace('.','\\.')));
   assert.ok(exists('assets/'+name),'missing full-resolution artwork '+name);
 }
 assert.doesNotMatch(html,/<svg\b|<canvas\b|<picture\b|<model-viewer\b|<iframe\b/i);
 assert.doesNotMatch(css,/background-image|data:image|image-set\(|clip-path|mix-blend-mode|radial-gradient\(|linear-gradient\(|drop-shadow/i);
 assert.doesNotMatch(js,/pointermove|WebGL|three\.js|requestAnimationFrame|parallax/i);
 assert.match(html,/ILUSTRASI EDITORIAL, BUKAN PROYEK FARIDH/);
});
test('navigation, title, artwork and all facts are semantic and uniquely addressed',()=>{
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,'duplicate element IDs');
 for(const match of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.includes(match[1]),'broken anchor '+match[1]);
 for(const match of html.matchAll(/<img\b[^>]*>/g))assert.match(match[0],/\balt="/);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 assert.match(html,/aria-controls="mobile-nav"/);
 assert.match(html,/aria-expanded="false"/);
 assert.doesNotThrow(()=>new vm.Script(js));
});
test('reconstruction is structurally different from rejected image-as-card hero',()=>{
 assert.match(html,/class="cover-type"/);
 assert.match(html,/class="cover-image"/);
 assert.match(html,/class="painting-intermission"/);
 assert.match(html,/class="skills"/);
 assert.match(html,/class="education-gpa"/);
 assert.doesNotMatch(html,/class="opening-grid"|class="opening-art"|class="contact-art"/);
 assert.match(css,/\.cover h1/);
 assert.match(css,/\.cover-image img/);
 for(const w of [1160,900,720,420,350])assert.ok(css.includes('@media(max-width:'+w+'px)'),"missing "+w+" breakpoint");
 assert.match(css,/prefers-reduced-motion:reduce/);
});
