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
  const overflowElements=dimensions.html>width+2 ? await page.evaluate(()=>{
    const viewport=innerWidth;
    return [...document.querySelectorAll('body *')].map(el=>{
      const r=el.getBoundingClientRect();
      const st=getComputedStyle(el);
      if(r.right>viewport+2 && st.display!=='none') return {tag:el.tagName.toLowerCase(),cls:String(el.className).slice(0,90),text:el.textContent?.trim().slice(0,28),left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width)};
      return null;
    }).filter(Boolean).slice(0,35);
  }) : [];
  assert.ok(dimensions.html<=width+2,'horizontal overflow '+width+': '+JSON.stringify({dimensions,overflowElements}));
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
  assert.equal(await workScene.evaluate(el=>getComputedStyle(el).position),'relative','reduced motion must unpin career environment');
  const track=page.locator('#work-pages');
  assert.equal(await track.evaluate(el=>getComputedStyle(el).display),'block','reduced motion must present normal-flow professional records');
  await experience.last().scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>document.getElementById('work-count').textContent==='4 dari 4');
  assert.equal(await page.locator('#work-count').innerText(),'4 dari 4');
  const sceneImages=await page.evaluate(()=>{
    const a=document.querySelector('.cover-image img').getBoundingClientRect();
    const b=document.querySelector('.horizon-transition img').getBoundingClientRect();
    return {heroWidth:a.width,horizonWidth:b.width};
  });
  assert.ok(sceneImages.heroWidth>=width-2&&sceneImages.horizonWidth>=width-2,'world images must be full-bleed '+width+': '+JSON.stringify(sceneImages));
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


 // Real-motion validation of the selected Lazarus S04 + S03 systems.
 report.motionViewports=[];
 for(const [width,height] of [[390,844],[1440,900]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'no-preference',hasTouch:width<=390});
  page.on('pageerror',e=>report.errors.push('motion '+width+': '+e.message));
  page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)report.errors.push('motion '+width+': '+r.status()+' '+r.url())});
  await page.goto(base+'/',{waitUntil:'load'});
  await page.evaluate(()=>document.fonts.ready);
  const hero=await page.locator('.cover-image img').evaluate(img=>{
    const rect=img.getBoundingClientRect();
    return {width:rect.width,objectFit:getComputedStyle(img).objectFit,frame:getComputedStyle(img.closest('.cover-image')).position};
  });
  assert.ok(hero.width>=width-2,'immersive opening must use full-width image');
  assert.equal(hero.objectFit,'cover');
  assert.equal(hero.frame,'absolute','opening painting must be part of the hero scene');
  await page.screenshot({path:path.join(output,'world-hero-'+width+'.png')});
  const workScene=page.locator('.work-world');
  if(width>720){
    assert.equal(await workScene.evaluate(el=>getComputedStyle(el).position),'sticky','S04 must pin actual visual context on desktop');
    await page.locator('.work-page').last().scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>document.querySelector('.work-world').dataset.chapter==='4');
    assert.equal(await page.locator('#work-count').innerText(),'4 dari 4');
    await page.locator('.work-page').first().scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>document.querySelector('.work-world').dataset.chapter==='1');
    assert.equal(await page.locator('#work-count').innerText(),'1 dari 4','reverse scroll restores chapter context');
  }else{
    assert.equal(await workScene.evaluate(el=>getComputedStyle(el).position),'relative');
    const track=page.locator('#work-pages');
    assert.match(await track.evaluate(el=>getComputedStyle(el).scrollSnapType),/^x(?: proximity)?$/,'native horizontal proximity snap must be active');
    const nextButton=page.locator('#work-next');
    await nextButton.scrollIntoViewIfNeeded();
    await nextButton.click();
    await page.waitForFunction(()=>document.getElementById('work-count').textContent==='2 dari 4');
    assert.equal(await workScene.getAttribute('data-chapter'),'2');
    await page.locator('#work-prev').click();
    await page.waitForFunction(()=>document.getElementById('work-count').textContent==='1 dari 4');
  }
  const dimensions=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
  assert.ok(dimensions.document<=width+2,'motion overflow '+width+': '+JSON.stringify(dimensions));
  await page.screenshot({path:path.join(output,'world-work-'+width+'.png')});
  await page.locator('.horizon-transition').scrollIntoViewIfNeeded();
  const horizon=await page.locator('.horizon-transition img').evaluate(img=>{
   const rect=img.getBoundingClientRect();
   return {width:rect.width,fit:getComputedStyle(img).objectFit};
  });
  assert.ok(horizon.width>=width-2&&horizon.fit==='cover','horizon must be immersive and full-width');
  await page.screenshot({path:path.join(output,'world-horizon-'+width+'.png')});
  report.motionViewports.push({width,height,hero:hero.objectFit,work:'pass',horizon:horizon.fit,overflow:'pass'});
  await page.close();
 }

 // Progressive enhancement: real documents and contact actions survive disabled JavaScript.
 const noJs=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});
 await noJs.goto(base+'/',{waitUntil:'load'});
 assert.equal(await noJs.locator('.work-page').count(),4);
 assert.equal(await noJs.locator('a[href^="mailto:"]').count(),1);
 assert.equal(await noJs.locator('.cover-image img').count(),1);
 await noJs.screenshot({path:path.join(output,'world-no-js-390.png'),fullPage:true});
 await noJs.close();
 assert.deepEqual(report.errors,[],'unexpected browser or local asset errors');
}finally{
 report.timestamp=new Date().toISOString();
 fs.writeFileSync(path.join(output,'report.json'),JSON.stringify(report,null,2));
 await browser.close();server.close();
}
console.log('PASS: Faridh immersive world — seven reduced-motion viewports, two live-scroll viewports, reverse chapter sync, mobile swipe, four original images and no-JS fallback.');