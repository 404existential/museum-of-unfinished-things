(() => {
  'use strict';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const categories = ['Writing','Software','Business','Music','Art','Film','Personal','Research','Invention'];

  const base = [
    {id:'A—001842',title:'The Third Version of a Novel',category:'Writing',year:'2018',status:'Unattended',visual:'paper',description:'Eleven chapters survived, along with three character maps and a final sentence that was never decided',text:`Chapter twelve was going to explain the whole arrangement

The room had already been described twice, although the second description was better and the first one was still in the document because removing it felt too final

At some point the narrator was supposed to leave the house and meet the person mentioned in chapter four

There is a note in the margin that says return to this when the ending is known

The ending was never known`,note:'The last recorded revision was made after midnight and the next file is empty',username:'Anonymous'},
    {id:'A—002117',title:'A Restaurant That Was Never Opened',category:'Business',year:'2020',status:'Shelved',visual:'red',description:'A complete identity system, menu, floor plan and opening budget for a restaurant that remained on paper',text:`The menu was finished first because it was the easiest part to make look real

There were six tables, two menus, a name that everyone liked and a spreadsheet containing the exact number of plates required for opening week

The lease was discussed for three months

The final version of the floor plan has a small pencil mark beside table four which says move this if possible

Nothing was moved`,note:'The restaurant had a name but never had a first customer',username:'Anonymous'},
    {id:'A—002904',title:'Six Songs for an Album',category:'Music',year:'2017',status:'Unresolved',visual:'blue',description:'Six finished recordings, four album covers and a seventh track that was repeatedly mentioned but never recorded',text:`Track one was finished on a Sunday

Track two was rewritten because the first version sounded too optimistic

Track three had a chorus that everyone liked

Track four was supposed to be shorter

Track five became a different song halfway through

Track six was recorded twice and both versions were kept

The folder contains four possible covers and a text file called seventh song ideas which begins with`,note:'No release date was ever selected',username:'Anonymous'},
    {id:'A—003186',title:'The Personal Website',category:'Personal',year:'2021',status:'Unattended',visual:'paper',description:'A meticulously designed personal website whose homepage was revised fourteen times before the domain expired',text:`The first homepage said hello

The second homepage explained too much

The third homepage was minimal

The fourth homepage was even more minimal and therefore contained almost nothing

By version fourteen the site had a typeface, a tiny archive, a page about the archive and a button that led to a page that was still being considered

The domain expired before the button was given a purpose`,note:'The screenshot folder is still named website final',username:'Anonymous'},
    {id:'A—003721',title:'A Small Clothing Label',category:'Business',year:'2019',status:'Shelved',visual:'yellow',description:'Fabric samples, a name, twelve logo variations and one unusually ambitious spreadsheet',text:`The name was chosen in April

By May there were twelve logos

By June there were seven possible suppliers and a spreadsheet calculating the cost of every button

The first sample arrived in a box that was much smaller than expected

There was a meeting about production

After the meeting the spreadsheet was opened once more and a new tab called revised production costs was created

That tab is empty`,note:'Production never began',username:'Anonymous'},
    {id:'A—004218',title:'The Second Version',category:'Software',year:'2019',status:'Unattended',visual:'dark',description:'A working prototype with a complete interface, eleven weekends of revisions and no public release',text:`The original idea was considerably smaller

It was supposed to solve one very specific problem and then disappear quietly into the background

By the third version it had acquired seventeen settings, a completely unnecessary account system and a folder called FINAL which was already the fourth FINAL folder

The interface was almost ready

There was still one thing left to figure out, which was probably the thing that should have been figured out first

The next file contains only the words start again`,note:'Designed over eleven weekends. Never deployed',username:'Anonymous'},
    {id:'A—004802',title:'A Short Film About Tuesday',category:'Film',year:'2022',status:'Unresolved',visual:'green',description:'Sixteen minutes of footage survive from a film that was intended to be considerably longer',text:`The opening shot was supposed to last twelve seconds

It lasted forty

The main character enters a shop, forgets why they came in and then notices a person outside who is never introduced

There was meant to be a second scene

The notes say the second scene explains everything

The footage folder ends after the first scene`,note:'Sixteen minutes survive',username:'Anonymous'},
    {id:'A—005103',title:'The Balcony Garden',category:'Personal',year:'2020',status:'Withdrawn',visual:'green',description:'A planting diagram for a balcony that no longer belongs to the contributor',text:`Tomatoes on the left because they needed the morning light

Mint in a separate container because the note says it spreads

Basil near the window

There is a small drawing of a chair in the corner with the words sit here after watering

The final page is a list of things to buy

The list stops at soil`,note:'The balcony changed owners',username:'Anonymous'},
    {id:'A—005667',title:'The Board Game',category:'Invention',year:'2016',status:'Unattended',visual:'red',description:'A complete rulebook, provisional scoring system and an unresolved disagreement about dice',text:`The object of the game was to build a city without running out of time

The first version took three hours

The second version took five

A note beside the third version says this is becoming a problem

There are rules for roads, markets, weather and one event called unexpected meeting

The rules for unexpected meeting are missing`,note:'Rules exist. Pieces do not',username:'Anonymous'},
    {id:'A—006021',title:'The Weekly Newsletter',category:'Writing',year:'2023',status:'Shelved',visual:'paper',description:'Three published issues and one draft concerning the future of everything',text:`Issue one was about small changes

Issue two was about cities

Issue three was supposed to be about attention but became a list of things noticed while walking home

Issue four begins with a sentence about the future

The next paragraph starts with a correction to the first sentence

The rest of the document is a blank page with three links pasted at the bottom`,note:'Issue four was drafted but never sent',username:'Anonymous'},
    {id:'A—006490',title:'The Documentary Proposal',category:'Film',year:'2018',status:'Unattended',visual:'blue',description:'A fourteen-page proposal accompanied by interviews that were never formally conducted',text:`The documentary would follow three people who had all changed direction

The first interview was scheduled for a Monday

The second person asked to see the questions first

The questions were rewritten

Then the project changed its focus from people who changed direction to places that people left behind

The proposal ends with a section titled production plan

Under it there is one sentence and then`,note:'Funding was not secured',username:'Anonymous'},
    {id:'A—006914',title:'The Furniture Prototype',category:'Art',year:'2021',status:'Unresolved',visual:'yellow',description:'An attempt to combine traditional joinery with a very optimistic understanding of geometry',text:`The first chair stood for approximately three weeks

It was comfortable if nobody leaned backwards

The second version was taller

The third version was supposed to solve the problem with a diagonal support

A diagram shows the diagonal support

The actual support was never made

There is a note saying order longer screws`,note:'One chair exists',username:'Anonymous'},
    {id:'A—007201',title:'The Language Learning System',category:'Research',year:'2019',status:'Unattended',visual:'green',description:'A personal language-learning method abandoned after a year and 1,842 recorded words',text:`The method began with ten words a day

After two weeks the list became fifteen words

After one month there were colour codes

After three months there was a spreadsheet with columns for recognition, recall, pronunciation and words that were somehow remembered only while walking

The last page contains twenty new words

None of them are translated`,note:'Vocabulary list: 1,842 words',username:'Anonymous'},
    {id:'A—007643',title:'The Research Paper',category:'Research',year:'2020',status:'Unresolved',visual:'dark',description:'An excellent introduction, a complete abstract and no conclusion',text:`The abstract was finished first

The introduction became the strongest part of the paper by accident

There are references to nine sources and a note to find two more

The results section contains a table followed by the sentence these findings require further analysis

The discussion begins

The discussion does not continue`,note:'Abstract complete',username:'Anonymous'},
    {id:'A—008104',title:'The Podcast Pilot',category:'Film',year:'2022',status:'Shelved',visual:'red',description:'Two conversations, three microphones and an unusually elaborate intro sequence',text:`The first episode was recorded in a room with a fan that could not be turned off

The second episode was better

There was a plan for twelve episodes

Episode three had a title and a guest

The guest cancelled

The episode title remained in the schedule until the schedule was deleted`,note:'Two episodes recorded',username:'Anonymous'},
    {id:'A—008391',title:'The Photography Book',category:'Art',year:'2017',status:'Unattended',visual:'blue',description:'Forty-eight photographs from train stations arranged into a book that never reached printing',text:`The photographs were selected by location

Then they were selected by colour

Then the order was changed because the first photograph felt too final

The cover went through six versions

The title changed three times

The final PDF is 48 pages

Page 49 is blank`,note:'The photographs survived the project',username:'Anonymous'},
    {id:'A—008822',title:'The Homemade Synthesizer',category:'Music',year:'2021',status:'Unattended',visual:'green',description:'A hardware experiment that successfully produces one reliable note',text:`The first circuit produced nothing

The second produced a noise that was described as promising

The third produced one note

That note still works

There are seventeen pages of diagrams for the next version

The next version was supposed to produce chords

The last diagram has a question mark beside the power section`,note:'Produces one reliable sound',username:'Anonymous'},
    {id:'A—009118',title:'The Startup Pitch Deck',category:'Business',year:'2022',status:'Shelved',visual:'yellow',description:'Forty-six slides for a service that was never tested outside the presentation',text:`Slide one says the future is already here

Slide two contains a market size

Slide three contains a larger market size

By slide twenty the product has acquired a second customer segment despite never having a first

The financial model predicts a profitable third year

The assumptions tab has not been opened since 2022`,note:'Pitch deck: 46 slides',username:'Anonymous'},
    {id:'A—009502',title:'The Comic',category:'Art',year:'2015',status:'Withdrawn',visual:'red',description:'Thirty-eight pages remain. The protagonist reaches a door and the next page was never drawn',text:`Page one was quiet

Page twelve introduced the city

Page twenty-four introduced the problem

Page thirty-eight shows the protagonist standing outside a door

The next page was planned in pencil on the back of an envelope

It says open the door and then lists four possible endings

None of them were chosen`,note:'Pages 1–38 remain',username:'Anonymous'},
    {id:'A—009841',title:'The Travel Documentary',category:'Film',year:'2019',status:'Unattended',visual:'blue',description:'A planned documentary became a collection of excellent train-window footage',text:`The first journey was supposed to establish the story

Instead most of the footage is of stations

The second journey produced more stations

A folder called interviews contains three audio files, each shorter than four minutes

The final note says return next summer

There is no file from the following summer`,note:'Footage archived',username:'Anonymous'},
    {id:'A—010206',title:'The Animation Test',category:'Art',year:'2023',status:'Unresolved',visual:'dark',description:'Eleven seconds of animation revised approximately thirty times per second',text:`The character walks into frame

The walk was changed because it looked too confident

Then it looked too slow

Then the background was changed

Then the character was changed

The eleventh second contains a hand movement that was supposed to lead into the next scene

The next scene is not present`,note:'Eleven seconds survive',username:'Anonymous'},
    {id:'A—010931',title:'The Poetry Collection',category:'Writing',year:'2020',status:'Unattended',visual:'paper',description:'Thirty-two poems arranged into four intended sections. The fourth section remains empty',text:`Section one was about leaving

Section two was about returning

Section three became unexpectedly long

There are notes beside several poems saying cut this later

The final page is headed SECTION FOUR

Under the heading there is a single line

write something quieter here`,note:'Thirty-two poems',username:'Anonymous'},
    {id:'A—011684',title:'The Mobile Game',category:'Software',year:'2021',status:'Unattended',visual:'dark',description:'A playable prototype about sorting objects into the right places, with no final order for the objects',text:`The first level was easy

The second level was too easy

The third level required a rule that was never properly explained

The player was supposed to understand it by playing

That was the plan

A note in the code says explain this before launch

Launch never happened`,note:'Playable prototype',username:'Anonymous'},
    {id:'A—012049',title:'The Newsletter About Cities',category:'Writing',year:'2024',status:'Shelved',visual:'red',description:'One issue published, followed by a folder containing headlines for thirty-seven more',text:`The first issue was about corners of cities that people walk past

The second was planned around public benches

The third had a title but no reporting

A list of possible future issues includes bus stops, empty shops, street signs, late trains and the sound a city makes after midnight

The list stops there`,note:'One issue published',username:'Anonymous'},
    {id:'A—012417',title:'The Desk Lamp',category:'Invention',year:'2019',status:'Unresolved',visual:'yellow',description:'A handmade lamp with a beautiful base and a wiring problem that remained stubbornly uninteresting',text:`The base worked immediately

The shade took three attempts

The switch was moved twice

The wiring diagram has a circle around one connection and the word investigate beside it

The lamp looked finished from the front

From the back it looked like a temporary arrangement that had been left there for three years`,note:'Prototype exists',username:'Anonymous'},
    {id:'A—012903',title:'The Garden Journal',category:'Personal',year:'2022',status:'Unattended',visual:'green',description:'A careful record of fourteen plants, several of which are no longer present',text:`March: planted everything too close together

April: moved three pots

May: first flowers

June: one plant stopped growing for reasons that were apparently very important at the time

July: photograph of the balcony

August: watering schedule revised

September: blank page

October: one sentence — need to come back to this`,note:'Last entry: October',username:'Anonymous'}
  ];

  let stories = [...base];
  let activeFilter = 'All';
  let currentStory = null;
  let supabase = null;
  let avatarData = '';

  if (window.supabase && window.MOUT_CONFIG?.supabaseUrl) {
    try { supabase = window.supabase.createClient(window.MOUT_CONFIG.supabaseUrl, window.MOUT_CONFIG.supabaseAnonKey); } catch (_) { supabase = null; }
  }

  function allCategories(){ return ['All', ...categories]; }
  function getLocal(){ try{return JSON.parse(localStorage.getItem('mout-local-stories')||'[]')}catch{return[]} }
  function saveLocal(items){localStorage.setItem('mout-local-stories',JSON.stringify(items))}
  function allStories(){ return stories; }
  function countStories(){ return stories.length; }

  function buildFilters(){
    const el=$('#filters');
    el.innerHTML=allCategories().map(c=>`<button class="filter ${c==='All'?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join('');
    $$('.filter').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;$$('.filter').forEach(x=>x.classList.toggle('active',x===b));renderCollection();}));
  }

  function renderCollection(){
    const q=($('#searchInput')?.value||'').trim().toLowerCase();
    const filtered=stories.filter(s=> (activeFilter==='All'||s.category===activeFilter) && `${s.id} ${s.title} ${s.category} ${s.year} ${s.status} ${s.description} ${s.text} ${s.username}`.toLowerCase().includes(q));
    $('#artifactCount').textContent=countStories(); $('#statRecords').textContent=countStories();
    $('#collectionGrid').hidden=!filtered.length; $('#emptyState').hidden=!!filtered.length;
    $('#collectionGrid').innerHTML=filtered.map(s=>`<article class="artifact-card" tabindex="0" data-id="${esc(s.id)}"><div class="artifact-visual visual-${esc(s.visual||'paper')}"><span class="eyebrow">${esc(s.id)}</span><div class="visual-title">${esc(s.title)}</div></div><div class="card-meta"><div><h3 class="card-title">${esc(s.title)}</h3><div class="card-info">${esc(s.category)} / ${esc(s.year)}</div></div><span class="card-status">${esc(s.status)}</span><p class="card-excerpt">${esc(s.description)}</p></div></article>`).join('');
    $$('.artifact-card').forEach(c=>{c.addEventListener('click',()=>openRecord(c.dataset.id));c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openRecord(c.dataset.id)}})});
  }

  function openModal(id){const el=$(id);el.classList.add('open');el.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
  function closeModals(){$$('.modal-backdrop').forEach(m=>{m.classList.remove('open');m.setAttribute('aria-hidden','true')});document.body.style.overflow=''}
  function openRecord(id){
    const s=stories.find(x=>x.id===id); if(!s)return; currentStory=s;
    $('#recordAccession').textContent=`ACCESSION ${s.id}`;$('#recordTitle').textContent=s.title;$('#recordText').textContent=s.text||s.description;$('#recordDescription').textContent=s.description;$('#recordNote').textContent=s.note||'The circumstances were not documented';$('#recordContributor').textContent=`Contributor: ${s.username||'Anonymous'}`;
    $('#recordMeta').innerHTML=`<div><span>Category</span><strong>${esc(s.category)}</strong></div><div><span>Started</span><strong>${esc(s.year)}</strong></div><div><span>Status</span><strong>${esc(s.status)}</strong></div><div><span>Accession</span><strong>${esc(s.id)}</strong></div>`;
    openModal('#recordModal');
  }

  function shareRecord(){if(!currentStory)return;$('#shareCardTitle').textContent=currentStory.title;$('#shareCardAccession').textContent=currentStory.id;$('#shareCardUser').textContent=currentStory.username||'Anonymous';openModal('#shareModal')}
  function publicUrl(){return `${location.origin}${location.pathname}#record=${encodeURIComponent(currentStory.id)}`}
  function doShare(type){
    if(!currentStory)return; const url=publicUrl(), text=`${currentStory.title} — ${currentStory.id}\nThe Museum of Unfinished Things`;
    if(type==='copy'){navigator.clipboard?.writeText(url).then(()=>toast('Public link copied')).catch(()=>fallbackCopy(url));return}
    if(type==='whatsapp'){window.open(`https://wa.me/?text=${encodeURIComponent(text+'\n'+url)}`,'_blank','noopener');return}
    if(type==='x'){window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,'_blank','noopener');return}
    if(type==='instagram'){navigator.clipboard?.writeText(url).catch(()=>{});window.open('https://www.instagram.com/','_blank','noopener');toast('Public link copied — Instagram opened');}
  }
  function fallbackCopy(text){const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();toast('Public link copied')}
  function toast(message){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t)}t.textContent=message;t.classList.add('show');clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove('show'),2200)}

  function updateClock(){const d=new Date();const p=n=>String(n).padStart(2,'0');const ms=String(d.getMilliseconds()).padStart(3,'0');const months=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];$('#clockTime').textContent=`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${ms}`;$('#clockDate').textContent=`${p(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}`}

  function theme(){const saved=localStorage.getItem('mout-theme');if(saved==='black')document.body.classList.add('black-mode');$('#themeToggle').textContent=document.body.classList.contains('black-mode')?'Light mode':'Black mode'}
  $('#themeToggle').addEventListener('click',()=>{document.body.classList.toggle('black-mode');localStorage.setItem('mout-theme',document.body.classList.contains('black-mode')?'black':'light');$('#themeToggle').textContent=document.body.classList.contains('black-mode')?'Light mode':'Black mode'});theme();

  $('#menuButton').addEventListener('click',()=>{const nav=$('#mainNav');const open=nav.classList.toggle('mobile-open');$('#menuButton').setAttribute('aria-expanded',String(open))});
  $$('#mainNav a').forEach(a=>a.addEventListener('click',()=>$('#mainNav').classList.remove('mobile-open')));
  $$('#searchInput').forEach(x=>x.addEventListener('input',renderCollection));
  $('#clearFilters').addEventListener('click',()=>{$('#searchInput').value='';activeFilter='All';$$('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter==='All'));renderCollection()});
  $$('.modal-backdrop').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModals()}));
  $$('[data-close-modal]').forEach(b=>b.addEventListener('click',closeModals));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals()});
  $$('#shareTrigger,#recordShareBottom').forEach(b=>b.addEventListener('click',shareRecord));
  $$('.share-actions button').forEach(b=>b.addEventListener('click',()=>doShare(b.dataset.share)));
  $$('.arrow-link').forEach(b=>b.addEventListener('click',()=>openRecord(b.dataset.record)));

  function populateCategories(){
    const select=$('#submitForm select[name="category"]'); select.innerHTML='<option value="">Select</option>'+categories.map(c=>`<option>${c}</option>`).join('');
    $('#categoryRooms').innerHTML=`<div class="room-list">${categories.map(c=>`<button data-room="${esc(c)}">${esc(c)}</button>`).join('')}</div>`;
    $$('.room-list button').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.room;$$('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===activeFilter));renderCollection();$('#collection').scrollIntoView({behavior:'smooth'})}));
  }
  $$('.exhibition-card button').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.exhibition;$$('.filter').forEach(x=>x.classList.toggle('active',x.dataset.filter===activeFilter));renderCollection();$('#collection').scrollIntoView({behavior:'smooth'})}));

  async function currentUser(){if(!supabase)return null;return (await supabase.auth.getUser()).data.user||null}
  function accountModal(){openModal('#accountModal');renderAccount()}
  $('#accountButton').addEventListener('click',accountModal);

  async function renderAccount(){
    const content=$('#accountContent'),u=await currentUser();
    if(!u){
      content.innerHTML=`<div class="account-choice"><button class="active" id="loginTab"><span class="eyebrow">Returning contributor</span><strong>Sign in</strong><small>Already have an archive identity? Return to your records</small></button><button id="signupTab"><span class="eyebrow">New contributor</span><strong>Create identity</strong><small>Create a username, password and optional profile picture</small></button></div><div id="accountFormArea"></div>`;
      showAccountForm('login'); $('#loginTab').onclick=()=>{showAccountForm('login');$('#loginTab').classList.add('active');$('#signupTab').classList.remove('active')}; $('#signupTab').onclick=()=>{showAccountForm('signup');$('#signupTab').classList.add('active');$('#loginTab').classList.remove('active')};
    } else {
      let profile=null;if(supabase)profile=(await supabase.from('profiles').select('username,avatar_data').eq('id',u.id).maybeSingle()).data;
      const mine=supabase?(await supabase.from('artifacts').select('accession,title,status').eq('owner_id',u.id).order('created_at',{ascending:false})).data||[]:[];
      const avatar=profile?.avatar_data?`<img src="${esc(profile.avatar_data)}" alt="">`:esc((profile?.username||'C').slice(0,1).toUpperCase());
      content.innerHTML=`<div class="identity-head"><div class="identity-avatar">${avatar}</div><div><span class="eyebrow">Archive identity</span><div class="receipt-number" style="font-size:2.8rem">${esc(profile?.username||'contributor')}</div></div></div><p class="modal-intro">An account only helps you return to your own records. Published stories remain public</p><div class="record-section"><span class="eyebrow">Your records</span><div class="account-list">${mine.length?mine.map(a=>`<div class="account-list-row"><div><strong>${esc(a.accession)}</strong> — ${esc(a.title)}<br><small>${esc(a.status)}</small></div><button class="delete-record" data-delete="${esc(a.accession)}">Delete</button></div>`).join(''):'<p>No records yet. The first one is probably somewhere in a folder right now</p>'}</div></div><div class="account-actions"><button class="button button-dark" id="accountLeave">Leave a record ↗</button><button class="button button-outline" id="logout">Sign out</button></div>`;
      $$('.delete-record').forEach(b=>b.onclick=()=>deleteStory(b.dataset.delete)); $('#logout').onclick=async()=>{if(supabase)await supabase.auth.signOut();$('#accountButton').textContent='Account';renderAccount()}; $('#accountLeave').onclick=()=>{closeModals();openModal('#submitModal');resetSubmit()};
    }
  }

  function showAccountForm(mode){
    const area=$('#accountFormArea');
    if(mode==='login')area.innerHTML=`<form id="accountForm"><p class="form-explainer">For people who already have an archive identity</p><label>Username<input name="username" required pattern="[A-Za-z0-9_]{3,24}" autocomplete="username" placeholder="unfinished_07"></label><label>Password<input name="password" type="password" required autocomplete="current-password"></label><button class="button button-dark">Return to archive ↗</button><p id="accountMsg" class="form-status"></p></form>`;
    else area.innerHTML=`<form id="accountForm"><p class="form-explainer">A simple identity for returning to your records. No public profile feed is created</p><label>Username<input name="username" required pattern="[A-Za-z0-9_]{3,24}" autocomplete="username" placeholder="unfinished_07"></label><label>Password<input name="password" type="password" minlength="8" required autocomplete="new-password"></label><label>Profile picture <span class="optional">optional</span><input id="identityAvatar" type="file" accept="image/*"></label><div id="identityAvatarPreview" class="avatar-preview" hidden></div><p class="password-warning">No email address is required. Save the password somewhere safe because there is no email-based reset</p><button class="button button-dark">Create archive identity ↗</button><p id="accountMsg" class="form-status"></p></form>`;
    $('#accountForm').dataset.mode=mode;$('#accountForm').onsubmit=authForm;
    if(mode==='signup')$('#identityAvatar').onchange=e=>readAvatar(e.target.files[0],data=>{$('#identityAvatarPreview').hidden=!data;$('#identityAvatarPreview').innerHTML=data?`<img src="${esc(data)}" alt="Profile picture preview">`:'';avatarDataForForm=data});
  }
  let avatarDataForForm='';
  function readAvatar(file,done){if(!file){done('');return}const r=new FileReader();r.onload=()=>{const img=new Image();img.onload=()=>{const c=document.createElement('canvas'),max=240,scale=Math.min(1,max/Math.max(img.width,img.height));c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);done(c.toDataURL('image/jpeg',.78))};img.src=r.result};r.readAsDataURL(file)}
  async function authForm(e){
    e.preventDefault(); const f=new FormData(e.currentTarget),name=String(f.get('username')).trim(),pass=String(f.get('password')),sign=e.currentTarget.dataset.mode==='signup',msg=$('#accountMsg');
    if(!supabase){msg.textContent='The account service is temporarily unavailable';return}
    if(!/^[A-Za-z0-9_]{3,24}$/.test(name)){msg.textContent='Use 3–24 letters, numbers, or underscores';return}
    if(sign){const existing=await supabase.from('profiles').select('id').ilike('username',name).maybeSingle();if(existing.data){msg.textContent='That username already exists. Choose another';return}}
    const email=name.toLowerCase()+'@mout.local';const result=sign?await supabase.auth.signUp({email,password:pass,options:{data:{username:name}}}):await supabase.auth.signInWithPassword({email,password:pass});
    if(result.error){msg.textContent=result.error.message;return}
    if(sign){if(!result.data.session){msg.textContent='Identity created. The museum account is waiting for confirmation to be disabled in Supabase';return}await new Promise(r=>setTimeout(r,250));await supabase.from('profiles').update({avatar_data:avatarDataForForm||null,username:name}).eq('id',result.data.user.id);avatarDataForForm=''}
    $('#accountButton').textContent='My archive';renderAccount();
  }

  async function deleteStory(id){
    if(!supabase)return; if(!confirm('Remove this story from the public collection?'))return;const r=await supabase.from('artifacts').delete().eq('accession',id);if(r.error){toast(r.error.message);return}stories=stories.filter(s=>s.id!==id);renderCollection();renderAccount();toast('Record removed')
  }

  function resetSubmit(){const form=$('#submitForm');form.reset();$('#receipt').hidden=true;form.hidden=false;$('#submitStatus').textContent='';$('#submitUsername').value='';}
  $$('#submitModal [data-close-modal]').forEach(b=>b.addEventListener('click',closeModals));
  $$('#mainNav [data-open-submit], [data-open-submit]').forEach(b=>b.addEventListener('click',()=>{closeModals();openModal('#submitModal');resetSubmit()}));
  $('#submitForm').addEventListener('submit',async e=>{
    e.preventDefault();const f=new FormData(e.currentTarget),status=$('#submitStatus');const anonymous=f.get('anonymous')==='on';const u=await currentUser();
    const title=String(f.get('title')).trim(),category=String(f.get('category')),year=String(f.get('year')||'2026');
    const story={id:'A—'+String(Date.now()).slice(-7),title,category,year,status:'Unattended',visual:['red','blue','green','yellow','paper','dark'][Math.floor(Math.random()*6)],description:String(f.get('description')).trim(),text:String(f.get('text')||'').trim()||String(f.get('description')).trim(),note:String(f.get('note')||f.get('reason')||'').trim(),username:anonymous?'Anonymous':String(f.get('username')||'Anonymous').trim()||'Anonymous'};
    if(!title||!category||!story.description){status.textContent='Please complete the title, category and description';return}
    if(supabase&&u){const profile=(await supabase.from('profiles').select('username').eq('id',u.id).maybeSingle()).data;const row={accession:story.id,title:story.title,category:story.category,year:story.year,status:'Published',reason:String(f.get('reason')||'The circumstances were not documented').trim(),visual:story.visual,description:story.description,contributor_note:story.note,record_text:story.text,contributor_username:story.username,owner_id:u.id};const r=await supabase.from('artifacts').insert(row);if(r.error){status.textContent=r.error.message;return}}
    else{const local=getLocal();local.unshift(story);saveLocal(local)}
    stories=[...stories.filter(s=>s.id!==story.id),story];renderCollection();$('#receiptNumber').textContent=story.id;e.currentTarget.hidden=true;$('#receipt').hidden=false;
  });

  $('#feedbackForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget),subject=String(f.get('subject')),message=String(f.get('message'));const body=`Museum feedback\n\n${message}\n\nPage: ${location.href}`;window.location.href=`mailto:therajin2@gmail.com?subject=${encodeURIComponent('[Museum] '+subject)}&body=${encodeURIComponent(body)}`;$('#feedbackStatus').textContent='Your mail app should now be open with the museum address filled in';});

  async function loadRemote(){
    const local=getLocal();if(local.length)stories=[...local,...stories];
    if(!supabase){renderCollection();return}
    try{const r=await supabase.from('artifacts').select('accession,title,category,year,status,reason,visual,description,contributor_note,contributor_username,record_text').eq('status','Published').order('created_at',{ascending:false});if(r.data){const remote=r.data.map(a=>({id:a.accession,title:a.title,category:a.category,year:a.year||'2026',status:a.status||'Unattended',visual:a.visual||'paper',description:a.description||'',text:a.record_text||a.contributor_note||a.description||'',note:a.contributor_note||a.reason||'',username:a.contributor_username||'Anonymous'}));const ids=new Set(remote.map(x=>x.id));stories=[...remote,...stories.filter(x=>!ids.has(x.id))]}}catch(_){}renderCollection();}

  function handleHash(){const match=decodeURIComponent(location.hash).match(/^#record=(.+)$/);if(match)openRecord(match[1])}
  window.addEventListener('hashchange',handleHash);

  buildFilters();populateCategories();renderCollection();updateClock();setInterval(updateClock,37);loadRemote();handleHash();
})();
