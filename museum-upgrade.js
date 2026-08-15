(()=>{
'use strict';
const qs=s=>document.querySelector(s), qsa=s=>[...document.querySelectorAll(s)];
const storyBank={
'A—001842':`The first chapter was written twice because the first version seemed too certain about where the story was going

By chapter four the characters had acquired different jobs, different names and one completely unnecessary neighbour who was originally supposed to appear for two pages

Chapter twelve was outlined on a receipt and then the receipt was lost

There is a note in the margin that says the ending should be quiet

Nothing after that was written`,
'A—002117':`The restaurant had a name before it had a lease

There was a menu, a colour system, a floor plan and a spreadsheet estimating how many people might order the soup on a Tuesday

The opening date moved from June to August and then to sometime after the renovation

The renovation was never scheduled

The menu remained in a folder called final menu and was opened occasionally for reasons that are not documented`,
'A—002904':`The album was supposed to have seven songs

Six were finished enough to be listened to without explanation

The seventh had three beginnings and no middle

Track names were changed repeatedly, usually after midnight

One note says the missing song should begin with something very quiet and then become much larger, but the next page contains only the words maybe tomorrow`,
'A—003186':`The homepage was rebuilt fourteen times

Version six had the best navigation and version nine had the best typography and version twelve was apparently the one that was finally going to stay

The domain was renewed twice after the project had already stopped

The last recorded change was a sentence moved three pixels to the left

There is no explanation for why that was the final change`,
'A—003721':`The first samples arrived in a cardboard box

There were twelve logo variations, three names that sounded almost right and a spreadsheet calculating the cost of producing one hundred pieces before the first piece had actually been made

The label was going to begin with four shirts

Then eight

Then there was a plan for a temporary shop which became a plan for an online shop which became a document titled perhaps later`,
'A—004218':`The original idea was considerably smaller

It was supposed to solve one very specific problem and then disappear quietly into the background

By the third version it had acquired seventeen settings, a completely unnecessary account system and a folder called FINAL which was already the fourth FINAL folder

The interface was almost ready

There was still one thing left to figure out, which was probably the thing that should have been figured out first`,
'A—004802':`The film begins with a person waiting for a bus that does not arrive

Sixteen minutes were filmed over three afternoons

The original plan was to return the following weekend and finish the remaining scenes

A list of shots exists

The last item reads: bus arrives, conversation, cut to black

No footage after the waiting scene has been found`,
'A—005103':`The balcony was measured twice

There was a diagram showing where basil, mint, tomatoes and something called winter flowers were supposed to go

The first two weeks were successful

Then the notes become less precise

The final entry says water everything on Sunday and underneath it, in smaller handwriting, there is a question about whether the tomato plant can be moved because the neighbour has started complaining about the shade`,
'A—005667':`The rules were complete enough to play the game

The pieces were not

There was an argument about whether the red pieces should represent money or people and a second argument about whether the board needed thirty-six spaces or forty

A later version changed the scoring system entirely

The box design was finished before the game itself was`,
'A—006021':`Issue one was about beginnings

Issue two was about routines

Issue three became unexpectedly long because one interview was supposed to be three paragraphs and turned into thirteen pages

Issue four was drafted in sections and the first section was revised seven times

The rest of the page is blank except for a heading that says next week`,
'A—006490':`The proposal opens with a very confident sentence about why the film needed to exist

Fourteen pages follow

Several interviews were planned but never formally conducted

There is a budget, a shooting schedule and a list of locations

The final page contains the words funding application and underneath them a date that passed without another revision`,
'A—006914':`The chair looked better in the drawing

The first prototype was made from cheaper wood because the good material was being saved for the final version

The final version never arrived

One photograph shows the chair standing beside a wall with a small piece of paper taped to it

The paper says adjust the back angle`,
'A—007201':`The method began with twenty words a day

For three months there are neat lists, pronunciation notes and small observations about words that seemed impossible to remember

The lists become longer and the review schedule becomes less exact

Eventually there are only groups of words separated by commas

The final page contains one word translated into three languages and nothing underneath it`,
'A—007643':`The abstract was finished first

It was concise and unusually confident

The introduction was revised until every sentence seemed to know where the paper was going

The methods section exists

The results section begins with a table and ends after the words further analysis is required

The conclusion was never opened`,
'A—008104':`The pilot begins with two people talking about why they started making the programme

They talk for forty-seven minutes

Then the second episode becomes a conversation about making the second episode

The third episode was planned as an interview

There is a microphone test and a title card

There is no interview`,
'A—008391':`The photographs were taken at stations where nobody seemed to be in a hurry

The book was divided into four sections according to the time of day

Forty-eight photographs survived the editing process

The cover was designed twice

The final sequence was never decided

A note beside photograph forty-eight says this one should probably be the last`,
'A—008822':`The synthesizer produces one note reliably

A second note appears when the room is quiet enough

The wiring diagram was changed three times

There was supposed to be a small wooden case around the whole thing

The wood was purchased

The case was measured

The case was never cut`,
'A—009118':`The pitch deck had forty-six slides

The first twelve were excellent

Slide nineteen introduced a feature that nobody had asked for

Slide thirty-two projected revenue for a market that had not been researched yet

The final slide simply says questions

There are no questions underneath it`,
'A—009502':`Pages one through thirty-eight exist

The protagonist reaches a door

The door is drawn carefully in three different versions

There are notes about what might be behind it

One note says reveal should happen here

Another says do not reveal yet

The next page is missing`,
'A—009841':`The documentary was supposed to follow a route across the country

Instead there are hours of train-window footage, station announcements and one interview recorded in a cafe where the microphone picked up more cups than voices

The footage was labelled carefully

The documentary was not`,
'A—010206':`Eleven seconds of animation remain

Each second was revised so many times that the original drawings were difficult to recognise

The character walks toward something just outside the frame

The frame after eleven seconds is empty

A note says continue movement and then nothing else`,
'A—010592':`The proposal was complete enough to present

There were diagrams, floor plans, material references and a page explaining why the building should feel unfinished even when finished

The site was never acquired

The model survived in a box

The box has not been opened since`,
'A—010931':`There are thirty-two poems

The first section is about places

The second is about weather

The third was going to be about memory

The fourth section has a title but no poems beneath it

The title remains handwritten on the first page`,
'A—011307':`Twenty-seven recipes were collected

Some came from memory and some from relatives who disagreed about measurements

The photographs were supposed to be added later

Later arrived several times

The notebook ends with a recipe for something described only as the usual one`,
'A—011684':`The game is playable from beginning to end

The player sorts objects into rooms according to rules that are explained only once

The prototype has three endings

None of them were intended to be final

A note beside the last scene says add fourth ending when the rest makes sense`,
'A—012049':`The first issue was sent on a Tuesday

It contained seven short pieces about cities, public benches and the strange experience of knowing a place only through its bus routes

The second issue was outlined

The third was going to be better designed

There is no second issue`,
'A—012417':`The base of the lamp works

The shade was supposed to be made from folded paper but the first attempt looked better than expected and was kept as the prototype

A wiring problem remained

The note beside the switch says fix before making another one

There was never another one`,
'A—012903':`The garden journal begins with careful measurements

Fourteen plants are listed with dates, heights and watering schedules

By October the handwriting becomes smaller

One plant is crossed out

Another has the note moved inside because it got too cold

The final page contains only a drawing of a leaf`,
'A—013266':`The magazine had forty pages in the mockup

The cover was printed once

The contents page lists articles that were still being written

One interview had been confirmed and then postponed

The final layout contains three blank pages labelled reserved space`,
'A—013781':`The robot could navigate the room for approximately twelve seconds

After twelve seconds it usually met the same chair

The chair was not part of the experiment

A better sensor was ordered

The package arrived after the project had already stopped`};

const fallback=`The work began with a clear plan and became less clear as it grew

There are several surviving notes, revisions and partial versions

At some point the next step was written down but never taken

The remaining material has been kept exactly as it was found`;
function storyFor(id){return storyBank[id]||fallback}
function updateClock(){const d=new Date();const pad=(n,l=2)=>String(n).padStart(l,'0');const t=qs('#clockTime'),date=qs('#clockDate');if(t)t.textContent=`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(),3)}`;if(date)date.textContent=`${pad(d.getDate())} ${d.toLocaleString('en',{month:'long'}).toUpperCase()} ${d.getFullYear()}`}
setInterval(updateClock,43);updateClock();
const style=document.createElement('style');style.textContent=`
body.black-mode{--paper:#090909;--light:#111;--ink:#f0eadf;--muted:#aaa198;--line:rgba(240,234,223,.22);--shadow:0 24px 60px rgba(0,0,0,.5);background:#090909;color:var(--ink)}
body.black-mode .site-header{background:rgba(9,9,9,.92)}body.black-mode .collection{background:#0e0e0e}body.black-mode input,body.black-mode select,body.black-mode textarea{background:#171717;color:var(--ink)}body.black-mode .artifact-card:hover{background:#171717}body.black-mode .exhibition-paper{color:#111}
.archive-toolbar-extra{display:flex;justify-content:flex-end;gap:8px;margin:0 0 22px;flex-wrap:wrap}.theme-toggle{border:1px solid var(--line);background:transparent;color:var(--ink);padding:8px 12px;font:500 .61rem var(--mono);text-transform:uppercase;cursor:pointer}.card-excerpt{display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden;margin:10px 0 0;color:var(--muted);font:400 .88rem/1.5 var(--serif);grid-column:1/-1}.artifact-card{min-height:470px}.share-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:25px}.share-row button{border:1px solid var(--line);background:transparent;color:var(--ink);padding:9px 12px;cursor:pointer;font:500 .61rem var(--mono);text-transform:uppercase}.share-row button:hover{background:var(--ink);color:var(--light)}.share-note{color:var(--muted);font:.7rem var(--mono);margin-top:10px}.record-reading{white-space:pre-line;font:400 clamp(1.05rem,1.5vw,1.3rem)/1.72 var(--serif);color:var(--ink)}.record-reading::after{content:'▋';font-family:var(--mono);font-size:.7em;margin-left:3px;animation:blink 1s steps(1) infinite}@keyframes blink{50%{opacity:0}}.profile-pick{display:grid;grid-template-columns:auto 1fr;gap:15px;align-items:center;margin-bottom:18px}.avatar-preview{width:58px;height:58px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center;overflow:hidden;font:600 1.2rem var(--serif);background:var(--paper)}.avatar-preview img{width:100%;height:100%;object-fit:cover}.feedback-section{border-top:1px solid var(--line);margin-top:60px;padding-top:30px;display:flex;justify-content:space-between;gap:30px;align-items:center}.feedback-section p{margin:0;color:var(--muted);font:.75rem var(--mono)}.feedback-button{border:1px solid currentColor;background:transparent;padding:9px 13px;color:inherit;cursor:pointer;font:500 .62rem var(--mono);text-transform:uppercase}
.share-banner-preview{width:min(100%,620px);aspect-ratio:1.91/1;background:#e9ddc4;color:#171411;padding:32px;display:flex;flex-direction:column;justify-content:space-between;border:1px solid rgba(23,20,17,.2);margin-top:20px}.share-banner-preview strong{font:600 clamp(2rem,5vw,4rem)/.88 var(--serif);max-width:80%}.share-banner-preview small{font:500 .62rem var(--mono);text-transform:uppercase;letter-spacing:.08em}.share-close{margin-top:12px}
`;document.head.appendChild(style);
function injectToolbar(){const about=qs('#about');if(!about||qs('#themeToggle'))return;const copy=about.querySelector('.about-copy');const wrap=document.createElement('div');wrap.className='archive-toolbar-extra';wrap.innerHTML='<button class="theme-toggle" id="themeToggle">Black mode</button>';copy?.appendChild(wrap);const saved=localStorage.getItem('mout-theme');if(saved==='black')document.body.classList.add('black-mode');const b=qs('#themeToggle');b.onclick=()=>{document.body.classList.toggle('black-mode');const black=document.body.classList.contains('black-mode');localStorage.setItem('mout-theme',black?'black':'light');b.textContent=black?'Light mode':'Black mode'} }
function updateCounts(){const n=window.artifacts?.length||document.querySelectorAll('.artifact-card').length;const a=qs('#artifactCount'),s=qs('#statRecords');if(a)a.textContent=n;if(s)s.textContent=n}
function enrichCards(){qsa('.artifact-card').forEach(card=>{if(card.querySelector('.card-excerpt'))return;const id=card.dataset.id;const desc=storyFor(id);const meta=card.querySelector('.card-meta');if(!meta)return;const p=document.createElement('p');p.className='card-excerpt';p.textContent=desc;meta.appendChild(p)});updateCounts()}
function feedback(){if(qs('#feedbackSection'))return;const footer=qs('.site-footer');if(!footer)return;const el=document.createElement('div');el.id='feedbackSection';el.className='feedback-section';el.innerHTML='<div><p>Have a correction, suggestion, or something the museum should change?</p></div><button class="feedback-button" id="feedbackButton">Feedback</button>';footer.parentNode.insertBefore(el,footer);qs('#feedbackButton').onclick=()=>{const e=['therajin2','gmail.com'].join('@');window.location.href=`mailto:${e}?subject=Museum%20of%20Unfinished%20Things%20feedback&body=Record%20or%20page%3A%20%0A%0AFeedback%3A%20`}}
function makeShare(id,title){const url=`${location.origin}${location.pathname}#record-${encodeURIComponent(id)}`;const clean=encodeURIComponent(url),txt=encodeURIComponent(`${title} — The Museum of Unfinished Things`);const box=document.createElement('div');box.className='share-row';box.innerHTML=`<button data-share="instagram">Instagram</button><button data-share="whatsapp">WhatsApp</button><button data-share="x">X</button><button data-share="copy">Copy link</button><div class="share-note">A compact museum card is used for sharing. The full record remains at its accession page.</div>`;box.querySelector('[data-share="instagram"]').onclick=()=>shareVisual(url,title,'instagram');box.querySelector('[data-share="whatsapp"]').onclick=()=>window.open(`https://wa.me/?text=${txt}%20${clean}`,'_blank','noopener,noreferrer');box.querySelector('[data-share="x"]').onclick=()=>window.open(`https://twitter.com/intent/tweet?text=${txt}&url=${clean}`,'_blank','noopener,noreferrer');box.querySelector('[data-share="copy"]').onclick=async()=>{try{await navigator.clipboard.writeText(url);box.querySelector('[data-share="copy"]').textContent='Copied';setTimeout(()=>box.querySelector('[data-share="copy"]').textContent='Copy link',1500)}catch{prompt('Copy this museum link',url)}};return box}
async function shareVisual(url,title,platform){const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=628;const c=canvas.getContext('2d');const black=document.body.classList.contains('black-mode');c.fillStyle=black?'#0b0b0b':'#e9ddc4';c.fillRect(0,0,1200,628);c.fillStyle=black?'#f0eadf':'#171411';c.font='500 24px monospace';c.fillText('THE MUSEUM OF UNFINISHED THINGS',64,72);c.font='600 68px Georgia';wrapCanvas(c,title,64,190,980,82);c.font='500 22px monospace';c.fillText('A PUBLIC RECORD / 2026',64,535);c.fillText(url.replace(/^https?:\/\//,''),64,575);const blob=await new Promise(r=>canvas.toBlob(r,'image/png'));const file=new File([blob],`museum-${title.replace(/[^a-z0-9]+/gi,'-').toLowerCase()}.png`,{type:'image/png'});if(navigator.share&&navigator.canShare?.({files:[file]})){try{await navigator.share({title:`${title} — The Museum of Unfinished Things`,text:'A record from The Museum of Unfinished Things',url,files:[file]});return}catch(e){}}if(platform==='instagram'){try{await navigator.clipboard.writeText(url)}catch{}window.open('https://www.instagram.com/','_blank','noopener,noreferrer');return}window.open(url,'_blank','noopener,noreferrer')}
function wrapCanvas(c,text,x,y,max,lh){const words=text.split(' ');let line='';for(const w of words){const test=line?line+' '+w:w;if(c.measureText(test).width>max&&line){c.fillText(line,x,y);line=w;y+=lh}else line=test}if(line)c.fillText(line,x,y)}
function addShareWhenModal(){const modal=qs('#artifactModal');if(!modal)return;const title=qs('#modalTitle')?.textContent,id=qs('#modalAccession')?.textContent?.replace('ACCESSION ','');if(!title||!id||modal.querySelector('.share-row'))return;const target=qs('#modalNote')?.parentElement;if(!target)return;target.appendChild(makeShare(id,title))}
function enhanceModal(){const m=qs('#artifactModal');if(!m)return;const obs=new MutationObserver(()=>{if(m.classList.contains('open')){const id=qs('#modalAccession')?.textContent?.replace('ACCESSION ','');const title=qs('#modalTitle')?.textContent;if(id&&title){const text=qs('#modalText');if(text)text.textContent=storyFor(id);addShareWhenModal()}}});obs.observe(m,{attributes:true,childList:true,subtree:true})}
function fixExhibitions(){const data={Software:`A prototype can survive for years in screenshots, folders and version names. These records were once expected to become products. Most stopped one step before anyone outside the creator could use them`,Writing:`Some stories stopped because the ending was difficult. Others stopped because the beginning became more interesting. This room keeps the surviving pages without supplying the missing chapters`,Business:`The spreadsheet is often where an idea becomes unusually serious. These records contain names, prices, projections and plans for businesses that never reached a first customer`};qsa('[data-exhibition]').forEach(btn=>{const card=btn.closest('.exhibition-card');const p=card?.querySelector('p');const cat=btn.dataset.exhibition;if(p&&data[cat])p.textContent=data[cat]})}
function profilePic(){const form=qs('#accountForm');if(!form||form.dataset.picAdded)return; if(!form.querySelector('input[name="avatar"]')){const row=document.createElement('div');row.className='profile-pick';row.innerHTML='<div class="avatar-preview" id="avatarPreview">+</div><label>Profile picture <span class="optional">(optional)</span><input name="avatar" type="file" accept="image/png,image/jpeg,image/webp"></label>';const userField=form.querySelector('label');userField?.parentNode.insertBefore(row,userField)}form.dataset.picAdded='1';form.querySelector('input[name="avatar"]')?.addEventListener('change',e=>{const file=e.target.files?.[0];if(!file)return;const r=new FileReader();r.onload=()=>{qs('#avatarPreview').innerHTML=`<img src="${r.result}" alt="Profile picture preview">`;localStorage.setItem('mout-avatar-draft',r.result)};r.readAsDataURL(file)})}
function anonymousOption(){const form=qs('#submitForm');if(!form||form.querySelector('#anonymousChoice'))return;const l=document.createElement('label');l.id='anonymousChoice';l.className='check';l.innerHTML='<input type="checkbox" name="anonymous" checked> <span>Keep this record anonymous</span>';const name=form.querySelector('input[name="username"]')?.closest('label');name?.after(l)}
function observe(){injectToolbar();feedback();fixExhibitions();enrichCards();enhanceModal();anonymousOption();profilePic();const root=qs('#collectionGrid');if(root)new MutationObserver(()=>{enrichCards();anonymousOption();profilePic()}).observe(root,{childList:true});const am=qs('#accountModal');if(am)new MutationObserver(()=>profilePic()).observe(am,{childList:true,subtree:true});}
setTimeout(observe,300);setTimeout(observe,1200);
})();