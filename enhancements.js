/* Museum of Unfinished Things — interaction layer */
(()=>{
  const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
  const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const statusMap={Dormant:'Unattended',Abandoned:'Set aside',Unresolved:'Incomplete',Lost:'Unaccounted',Pending:'Under review'};
  const status=s=>statusMap[s]||s||'Unfinished';

  /* Replace the placeholder museum copy with fuller reading material. */
  const currentTitle=$('.current-section h2'); if(currentTitle) currentTitle.textContent='The Second Version';
  const currentQuote=$('.featured-meta .quote'); if(currentQuote) currentQuote.textContent='“Designed over eleven weekends. Never deployed. The interface was almost ready and then the folder stopped changing”';
  const featuredStatus=$('.featured-meta .status'); if(featuredStatus) featuredStatus.textContent='Unattended';
  const caption=$('.object-caption'); if(caption) caption.textContent='A—004218 / Software / 26 March 2026 / Unattended';
  const banner=$('.deposit-banner h2'); if(banner) banner.innerHTML='There is probably a<br>record in your folders';
  const countLabel=$('.collection-count'); if(countLabel) countLabel.innerHTML='<strong id="artifactCount">0</strong> records on view';
  const statLabel=$('.museum-stats div:first-child span'); if(statLabel) statLabel.textContent='records on view';
  const clock=$('#clockTime'),date=$('#clockDate');
  function tick(){const d=new Date();if(clock)clock.textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(n=>String(n).padStart(2,'0')).join(':')+'.'+String(d.getMilliseconds()).padStart(3,'0');if(date)date.textContent=d.toLocaleDateString('en-GB',{day:'2-digit',month:'long',year:'numeric'}).toUpperCase()}
  tick();setInterval(tick,10);

  /* Light / black mode. */
  const saved=localStorage.getItem('mout-theme')||'light';document.documentElement.dataset.theme=saved;
  const themeButton=document.createElement('button');themeButton.className='text-button theme-toggle';themeButton.type='button';themeButton.textContent=saved==='black'?'Light mode':'Black mode';
  const nav=$('.site-header nav');if(nav)nav.insertBefore(themeButton,nav.firstChild);
  themeButton.onclick=()=>{const next=document.documentElement.dataset.theme==='black'?'light':'black';document.documentElement.dataset.theme=next;localStorage.setItem('mout-theme',next);themeButton.textContent=next==='black'?'Light mode':'Black mode'};

  /* Make the existing cards more readable and give every record a share control. */
  const recordFragments={
    'A—001842':'Chapter twelve was never written\n\nThe outline says the character returns home, although there is no note explaining what home is supposed to mean at this point\n\nThere is a page after this called THE END which contains three sentences and then a grocery list',
    'A—002117':'The lease was never signed\n\nThe menu had already been printed twice and the wall behind the counter had been painted a colour described in the notes as something between a library and a late afternoon\n\nThe opening date was moved once, then again, and finally the date field was left blank',
    'A—002904':'Track seven was repeatedly mentioned\n\nThe first six songs were mixed and labelled. Track seven has three names, two tempos and no recording\n\nThe album cover says SIDE B in unusually large letters and then',
    'A—003186':'The homepage was revised fourteen times\n\nThe final version had almost no information on it, which was apparently intentional\n\nThere was going to be a section explaining what the site was for but the section was never written',
    'A—003721':'Production never began\n\nThere were twelve logo variations, four names and a spreadsheet containing projected sales for a product that had not yet been made\n\nThe last cell contains the words ask someone who knows what they are doing',
    'A—004218':'The original idea was considerably smaller\n\nIt was supposed to solve one very specific problem and then disappear quietly into the background\n\nBy the third version it had acquired seventeen settings and a folder called FINAL which was already the fourth FINAL folder\n\nThere was still one thing left to figure out, which was probably the thing that should have been figured out first\n\n',
    'A—004802':'Sixteen minutes of footage survive\n\nThe opening scene is almost entirely silent and the notes repeatedly say this is important\n\nThe final shot was supposed to explain why Tuesday mattered but the final shot was never filmed',
    'A—005667':'Rules exist. Pieces do not\n\nThe scoring system changed every weekend for six weeks\n\nThere is a handwritten note beside the final rule saying this probably needs to be simpler and then nothing',
    'A—006021':'Issue four was drafted\n\nIt begins with an explanation of why newsletters are usually unnecessary and then becomes a newsletter about newsletters\n\nThe final paragraph begins with I think the next issue should be about and stops there',
    'A—007643':'Abstract complete\n\nIntroduction complete\n\nMethodology mostly complete\n\nThe conclusion contains a heading, two blank pages and a sentence that says the evidence suggests\n\n',
    'A—008391':'Forty-eight photographs remain\n\nThe sequence was supposed to move from the busiest station to the quietest one\n\nAt photograph thirty-seven the numbering changes and nobody recorded why',
    'A—009502':'Pages one through thirty-eight remain\n\nThe protagonist reaches a door\n\nThe next page is blank except for a small pencil mark near the bottom right corner\n\n',
    'A—010931':'Thirty-two poems\n\nThe collection is arranged into four sections\n\nSection four is titled things that were almost said and contains only the title',
    'A—011684':'Playable prototype\n\nThe game is about sorting objects into places they may or may not belong\n\nThe objects were never given a final order and one note simply says perhaps the point is that there is no correct order',
    'A—013266':'A forty-page magazine made it to the mockup stage\n\nThe cover was changed nine times\n\nPage thirty-nine was reserved for an interview that was never arranged and page forty was supposed to be the thing that made the whole issue worth reading but'
  };

  function shareUrl(id){return new URL(location.href.split('#')[0]+'#record='+encodeURIComponent(id)).href}
  function getRecord(id){return (window.artifacts||[]).find(a=>a.id===id)}
  function createShareImage(a){
    const c=document.createElement('canvas');c.width=1200;c.height=630;const x=c.getContext('2d');const black=document.documentElement.dataset.theme==='black';x.fillStyle=black?'#0b0b0a':'#eee5d6';x.fillRect(0,0,c.width,c.height);x.fillStyle=black?'#e8dfcf':'#171411';x.font='18px monospace';x.fillText('THE MUSEUM OF UNFINISHED THINGS',70,70);x.font='16px monospace';x.fillText(a.id,70,110);x.font='58px Georgia';const words=a.title.split(' ');let line='',y=220;for(const w of words){if((line+' '+w).length>24){x.fillText(line.trim(),70,y);y+=65;line=''}line+=' '+w}x.fillText(line.trim(),70,y);x.font='20px Georgia';const excerpt=(recordFragments[a.id]||a.description||'An unfinished record').split('\n')[0].slice(0,100);x.fillText('“'+excerpt+'”',70,450);x.font='14px monospace';x.fillText('PUBLIC RECORD / '+new Date().getFullYear(),70,560);return c.toBlob(b=>b,'image/png')}

  function sharePanel(a){
    const old=$('#shareModal');if(old)old.remove();const m=document.createElement('div');m.id='shareModal';m.className='modal-backdrop open';m.setAttribute('aria-hidden','false');m.innerHTML=`<div class="modal share-modal" role="dialog" aria-modal="true" aria-labelledby="shareTitle"><button class="modal-close" id="shareClose" aria-label="Close">×</button><p class="eyebrow">Public record</p><h2 id="shareTitle">Share ${esc(a.title)}</h2><p class="modal-intro">Share the record as a link, or create a museum banner image. The record stays public</p><div class="share-grid"><button data-share="image">Share image / Instagram</button><button data-share="whatsapp">WhatsApp</button><button data-share="facebook">Facebook</button><button data-share="x">X / Twitter</button><button data-share="messenger">Messenger</button><button data-share="copy">Copy link</button></div><p class="share-url">${esc(shareUrl(a.id))}</p></div>`;document.body.appendChild(m);const close=()=>{m.remove();document.body.style.overflow=''};$('#shareClose').onclick=close;m.onclick=e=>{if(e.target===m)close()};m.querySelectorAll('[data-share]').forEach(b=>b.onclick=async()=>{const kind=b.dataset.share,url=shareUrl(a.id),text=`${a.title} — The Museum of Unfinished Things`;
      if(kind==='copy'){await navigator.clipboard?.writeText(url);b.textContent='Link copied';setTimeout(()=>b.textContent='Copy link',1200);return}
      if(kind==='image'){const blob=await createShareImage(a);const file=new File([blob],a.id.replace(/[^A-Za-z0-9-]/g,'_')+'.png',{type:'image/png'});if(navigator.share&&navigator.canShare?.({files:[file]})){await navigator.share({title:a.title,text,url,files:[file]}).catch(()=>{});}else{const u=URL.createObjectURL(blob);window.open(u,'_blank');}return}
      const targets={whatsapp:'https://wa.me/?text=',facebook:'https://www.facebook.com/sharer/sharer.php?u=',x:'https://twitter.com/intent/tweet?text='+encodeURIComponent(text)+'&url=',messenger:'https://www.facebook.com/dialog/send?link='};
      if(kind==='messenger'){window.open(targets.messenger+encodeURIComponent(url),'_blank','noopener');return}
      const target=targets[kind]+(kind==='facebook'||kind==='whatsapp'?encodeURIComponent(kind==='whatsapp'?text+' '+url:url):encodeURIComponent(url));window.open(target,'_blank','noopener')
    });document.body.style.overflow='hidden';
  }

  function addCardControls(){
    $$('.artifact-card').forEach(card=>{const id=card.dataset.id,a=getRecord(id);if(!a)return;const title=card.querySelector('.card-title');if(title&&!title.dataset.long){title.dataset.long='1';let p=card.querySelector('.card-excerpt');if(!p){p=document.createElement('p');p.className='card-excerpt';card.querySelector('.card-meta').appendChild(p)}p.textContent=recordFragments[id]||a.description||'A surviving record of something that stopped before the intended conclusion';if(!card.querySelector('.card-share')){const b=document.createElement('button');b.className='card-share';b.type='button';b.textContent='Share ↗';b.onclick=e=>{e.stopPropagation();sharePanel(a)};card.querySelector('.card-meta').appendChild(b)}}});
  }

  const originalRender=window.render; if(originalRender){/* render is global; observer below catches its cards */}
  const observer=new MutationObserver(()=>addCardControls());const grid=$('#collectionGrid');if(grid)observer.observe(grid,{childList:true});setTimeout(addCardControls,150);

  /* Replace the short record modal with a real reading experience and share action. */
  const originalOpen=window.openArtifact;window.openArtifact=function(id){const a=getRecord(id);if(!a){return originalOpen?.(id)};const frag=recordFragments[id]||a.text||a.description||'The record contains no recovered text';$('#modalAccession').textContent='ACCESSION '+a.id;$('#modalTitle').textContent=a.title;$('#modalDescription').textContent=a.description||'';$('#modalNote').textContent=a.reason||'The circumstances were not documented';const text=$('#modalText');if(text)text.textContent=frag;$('#modalVisual').className='object-record-visual visual-'+(a.visual||'paper');$('#modalMeta').innerHTML=`<div><dt>Category</dt><dd>${esc(a.category)}</dd></div><div><dt>Year started</dt><dd>${esc(a.year||'2026')}</dd></div><div><dt>Last recorded</dt><dd>${esc(a.lastWorked||'2026')}</dd></div><div><dt>Status</dt><dd>${esc(status(a.status))}</dd></div><div><dt>Accession</dt><dd>${esc(a.id)}</dd></div>`;const modal=$('#artifactModal');let sb=modal.querySelector('.record-share');if(!sb){sb=document.createElement('button');sb.className='button button-outline record-share';sb.textContent='Share this record ↗';modal.querySelector('.record-section:last-child')?.before(sb)}sb.onclick=()=>sharePanel(a);modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};

  /* Exhibition cards become readable mini-catalogues. */
  const ex={Software:{title:'Never Launched',text:'The projects in this room were built far enough to acquire names, interfaces and folders labelled FINAL. Several contain working software. None contain a public release.\n\n“The launch was scheduled for Thursday but by Wednesday the homepage had been redesigned again and then\n\nAnother record contains a checklist with every item marked complete except the item that says publish.”'},Writing:{title:'Chapter Seven',text:'These records stopped in the middle of books, essays, newsletters and poems. Some have endings planned in notes. Some have no indication that an ending was ever considered\n\n“He reached the door and remembered that the next chapter was supposed to explain why he had come here in the first place but\n\nThe manuscript continues for eleven pages after this sentence, but every page is blank.”'},Business:{title:'Almost a Business',text:'Plans reached spreadsheets, names, budgets and projected revenue before the question of whether anyone needed the thing was answered\n\n“Projected annual revenue was calculated before anyone had actually asked whether anyone needed the product\n\nThe next line is a list of three possible office locations.”'}};
  $$('[data-exhibition]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.exhibition==='never-launched'?'Software':b.dataset.exhibition==='chapter-seven'?'Writing':'Business';const old=$('#exhibitionModal');if(old)old.remove();const d=ex[key];const m=document.createElement('div');m.id='exhibitionModal';m.className='modal-backdrop open';m.innerHTML=`<div class="modal exhibition-reader" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Close">×</button><p class="eyebrow">Temporary exhibition / 2026</p><h2>${d.title}</h2><div class="exhibition-reading">${d.text.split('\n\n').map(x=>`<p>${esc(x)}</p>`).join('')}</div><button class="button button-dark" data-close-exhibition>Browse the collection ↗</button></div>`;document.body.appendChild(m);const close=()=>m.remove();m.querySelector('.modal-close').onclick=close;m.querySelector('[data-close-exhibition]').onclick=()=>{close();$('#collection')?.scrollIntoView({behavior:'smooth'})};}));

  /* Enforce username uniqueness before signup, so two visible identities cannot share a name. */
  document.addEventListener('submit',async e=>{if(e.target?.id!=='accountForm'||e.target.dataset.mode!=='signup')return;const input=e.target.querySelector('[name="username"]');const name=input?.value.trim();if(!name||!window.supabase)return;const C=window.moutAuth;if(!C)return;const {data}=await C.from('profiles').select('id').eq('username',name).maybeSingle();if(data){e.preventDefault();e.stopImmediatePropagation();const msg=e.target.querySelector('#accountMsg');if(msg)msg.textContent='That username already exists. Choose another archive identity';}},true);

  /* Add explicit anonymous choice to contribution form if it is missing. */
  const form=$('#submitForm');if(form&&!form.querySelector('[name="anonymous"]')){const row=document.createElement('label');row.className='check';row.innerHTML='<input type="checkbox" name="anonymous" checked><span>Keep this record anonymous</span>';form.insertBefore(row,form.querySelector('button[type="submit"]'));}
})();