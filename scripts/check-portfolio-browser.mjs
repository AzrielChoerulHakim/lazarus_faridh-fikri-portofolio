import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const root=path.resolve(import.meta.dirname,'..');
const output=path.join(root,'screenshots/faridh-impasto-v2');
fs.mkdirSync(output,{recursive:true});
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png'};
const server=http.createServer((req,res)=>{
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}
 catch{res.writeHead(400).end();return}
 if(pathname==='/')pathname='/index.html';
 const filename=path.resolve(root,'.'+pathname);
 if(!filename.startsWith(root+path.sep)){res.writeHead(403).end();return}
 fs.readFile(filename,(err,data)=>{
  if(err){res.writeHead(404).end();return}
  res.writeHead(200,{'content-type':mime[path.extname(filename)]||'application/octet-stream'}).end(data);
 });
});
await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve)});
const base='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true});
const report={branch:'experiment/faridh-surrealist-brutalism-v3',viewports:[],errors:[],paintings:[],knownLimitations:['The hero painting is a 1536x1024 original, but independent art-direction critique and physical-device review remain outstanding.','The original CV PDF was not reattached during reconstruction; checked live content against original main branch facts.','Automated geometry and functional checks do not replace human visual art-direction review.']};
try{
 for(const [width,height] of [[320,900],[390,844],[640,900],[768,1024],[1024,768],[1440,900],[832,384]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce',hasTouch:width<=390});
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)report.errors.push(r.status()+' '+r.url())});
  await page.goto(base+'/',{waitUntil:'load'});
  await page.evaluate(()=>document.fonts.ready);
  const identity=await page.locator('#cover-title').innerText();
  assert.match(identity,/Faridh\s*Fikri/);
  assert.equal(await page.locator('.cover-image img').count(),1);
  assert.equal(await page.locator('.work-world-painting img').count(),1);
  assert.equal(await page.locator('.horizon-transition img').count(),1);
  assert.equal(await page.locator('figcaption').count(),0);
  const ornaments=await page.locator('body').innerText();
  assert.doesNotMatch(ornaments,/PLATE Nº|ARSITEKTUR YANG MENCAIR|SCULPTURAL IMPASTO|ILUSTRASI METAFORIS/);
  const dimensions=await page.evaluate(()=>({body:document.body.scrollWidth,html:document.documentElement.scrollWidth,viewport:innerWidth}));
  const headingRect=await page.locator('#cover-title').boundingBox();
  assert.ok(headingRect.x>=-1&&headingRect.x+headingRect.width<=width+2,'hero typography runs offscreen at '+width+': '+JSON.stringify(headingRect));
  assert.ok(dimensions.html<=width+2,'horizontal overflow '+width+': '+JSON.stringify(dimensions));
  const arts=page.locator('figure img');
  assert.equal(await arts.count(),4);
  for(let i=0;i<4;i++){
   const image=arts.nth(i);
   await image.scrollIntoViewIfNeeded();
   await image.evaluate(async img=>{await img.decode()});
   const imgData=await image.evaluate(img=>{const r=img.getBoundingClientRect();return {source:img.getAttribute('src'),naturalWidth:img.naturalWidth,naturalHeight:img.naturalHeight,left:r.left,right:r.right,displayWidth:r.width}});
   assert.ok(imgData.naturalWidth>=190&&imgData.naturalHeight>=100,'bad image: '+JSON.stringify(imgData));
   if(imgData.source.startsWith('assets/impasto-')){
     assert.equal(imgData.naturalWidth,1536,'low-resolution master not allowed: '+imgData.source);
     assert.equal(imgData.naturalHeight,1024,'unexpected artwork aspect ratio: '+imgData.source);
   }
   assert.ok(imgData.left>=-2&&imgData.right<=width+2,'clipped image '+width+' '+JSON.stringify(imgData));
   if(width===1440)report.paintings.push(imgData);
   if(width===1440&&imgData.source==='assets/impasto-dissolution.webp')assert.ok(imgData.displayWidth>=1200,'hero painting is still a small side-card');
  }
  const experience=page.locator('.work-page');
  assert.equal(await experience.count(),4);
  const completeContent=await experience.allInnerTexts();
  assert.ok(completeContent.some(t=>t.includes('SKHPN')),'last CV item must remain readable');
  const workScene=page.locator('.work-world');
  await workScene.scrollIntoViewIfNeeded();
  if(width>720){
    const sticky=await workScene.evaluate(el=>getComputedStyle(el).position);
    assert.equal(sticky,'sticky','desktop painting must remain with scrolling evidence');
    await experience.last().scrollIntoViewIfNeeded();
    const current=await page.locator('#work-count').innerText();
    assert.equal(current,'4 dari 4','scroll-linked experience index not updated');
  }else{
    const track=page.locator('#work-pages');
    assert.equal(await track.evaluate(el=>getComputedStyle(el).scrollSnapType),'x mandatory');
    const nextButton=page.locator('#work-next');
    await nextButton.scrollIntoViewIfNeeded();
    await nextButton.click();
    await page.waitForFunction(()=>document.getElementById('work-mobile-count').textContent==='2 dari 4');
    assert.equal(await page.locator('#work-mobile-count').innerText(),'2 dari 4');
    await page.locator('#work-prev').click();
    await page.waitForFunction(()=>document.getElementById('work-mobile-count').textContent==='1 dari 4');
  }
  if(width<=720){
   const menu=page.locator('.menu-button');
   assert.ok(await menu.isVisible());
   await menu.click();
   assert.equal(await menu.getAttribute('aria-expanded'),'true');
   assert.ok(await page.locator('#mobile-nav').isVisible());
   await page.locator('#mobile-nav a[href="#pengalaman"]').click();
   assert.equal(await menu.getAttribute('aria-expanded'),'false');
   await menu.click();
   await page.keyboard.press('Escape');
   assert.equal(await menu.getAttribute('aria-expanded'),'false');
  }else{
   assert.ok(!(await page.locator('.menu-button').isVisible()));
  }
  for(const anchor of ['#profil','#pengalaman','#kompetensi','#pendidikan','#kontak']){
   assert.equal(await page.locator(anchor).count(),1);
  }
  await page.screenshot({path:path.join(output,'faridh-'+width+'x'+height+'.png'),fullPage:true});
  report.viewports.push({width,height,overflow:'pass',images:'pass',experience:'pass',menu:'pass',screenshot:'saved'});
  await page.close();
 }

 // Motion-enabled passes: reduced-motion snapshots above cannot validate scroll choreography.
 report.motionViewports=[];
 for(const [width,height] of [[390,844],[1440,900]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'no-preference'});
  page.on('pageerror',e=>report.errors.push('motion '+width+': '+e.message));
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)report.errors.push('motion '+width+': '+r.status()+' '+r.url())});
  await page.goto(base+'/',{waitUntil:'load'});
  await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(()=>{
   const el=document.querySelector('.narrative-cover');
   const top=scrollY+el.getBoundingClientRect().top;
   const travel=Math.max(0,el.offsetHeight-innerHeight);
   scrollTo({top:top+travel*.76,behavior:'instant'});
  });
  await page.waitForFunction(()=>Number(document.querySelector('.narrative-cover').style.getPropertyValue('--hero-p'))>.65);
  const heroProgress=await page.locator('.narrative-cover').evaluate(el=>Number(el.style.getPropertyValue('--hero-p')));
  assert.ok(heroProgress>.65&&heroProgress<=1,'motion hero progression must be bounded');
  assert.equal(await page.locator('.cover-pin').evaluate(el=>getComputedStyle(el).position),'sticky');
  await page.screenshot({path:path.join(output,'motion-hero-'+width+'.png')});
  await page.evaluate(()=>{
   const el=document.querySelector('.statement-stage');
   const top=scrollY+el.getBoundingClientRect().top;
   const travel=Math.max(0,el.offsetHeight-innerHeight);
   scrollTo({top:top+travel*.68,behavior:'instant'});
  });
  await page.waitForFunction(()=>Number(document.querySelector('.statement-stage').style.getPropertyValue('--statement-p'))>.55);
  const wipe=await page.locator('.statement-stage').evaluate(el=>Number(el.style.getPropertyValue('--statement-p')));
  assert.ok(wipe>.55&&wipe<=1,'statement wipe must follow native scroll');
  const dimensions=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
  assert.ok(dimensions.document<=width+2,'motion horizontal overflow '+width+': '+JSON.stringify(dimensions));
  await page.screenshot({path:path.join(output,'motion-statement-'+width+'.png')});
  report.motionViewports.push({width,height,heroProgress,statementProgress:wipe,overflow:'pass'});
  await page.close();
 }
 assert.deepEqual(report.errors,[],'unexpected browser or local asset errors');
}finally{
 report.timestamp=new Date().toISOString();
 fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));
 await browser.close();server.close();
}
console.log('PASS: Faridh V3 at seven reduced-motion viewports and two motion-enabled viewports; 4 original CV work entries; 4 local images; mobile navigation; interactive experience list.');