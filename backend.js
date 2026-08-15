/* Public archive + account layer for the Museum of Unfinished Things. */
(() => {
  const ready = () => window.supabase && window.MOUT_CONFIG?.supabaseUrl && window.MOUT_CONFIG?.supabaseAnonKey;
  if (!ready()) return;
  const client = window.supabase.createClient(window.MOUT_CONFIG.supabaseUrl, window.MOUT_CONFIG.supabaseAnonKey);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);
  const nav=$('.site-header nav');
  if(nav && !$('#accountButton')){const b=document.createElement('button');b.className='text-button';b.id='accountButton';b.textContent='Account';nav.appendChild(b)}
  const modal = document.createElement('div');
  modal.id='accountModal'; modal.className='modal-backdrop'; modal.setAttribute('aria-hidden','true');
  modal.innerHTML=`<div class="modal submit-modal" role="dialog" aria-modal="true"><button class="modal-close" id="accountClose" aria-label="Close">×</button><p class="eyebrow">Contributor archive</p><h2>Enter the museum.</h2><p class="modal-intro">Accounts are only an identity for returning to your contributions. Published artifacts remain public.</p><div id="accountBody"></div></div>`;
  document.body.appendChild(modal);
  const openAccount=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';renderAccount()};
  const closeAccount=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''};
  $('#accountButton')?.addEventListener('click',openAccount); $('#accountClose').addEventListener('click',closeAccount); modal.addEventListener('click',e=>{if(e.target===modal)closeAccount()});
  const identityEmail = username => `${username.toLowerCase()}@mout.local`;
  const randomPassword=()=>Array.from(crypto.getRandomValues(new Uint8Array(14)),n=>'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%'.charAt(n%67)).join('');
  const showMsg=(el,msg,bad=false)=>{el.innerHTML=`<p style="color:${bad?'var(--red)':'var(--muted)'};margin:12px 0 20px">${esc(msg)}</p>`};
  async function currentUser(){const {data}=await client.auth.getUser();return data.user};
  async function renderAccount(){
    const body=$('#accountBody'), u=await currentUser();
    if(!u){
      body.innerHTML=`<div class="account-tabs"><button class="filter active" id="loginTab">Sign in</button><button class="filter" id="signupTab">Create identity</button></div><div id="accountFormArea"></div>`;
      const area=$('#accountFormArea');
      const form=mode=>{area.innerHTML=mode==='login'?`<form id="authForm"><label>Username<input name="username" required autocomplete="username" placeholder="unfinished_07"></label><label>Password<input name="password" required type="password" autocomplete="current-password"></label><button class="button button-dark" type="submit">Enter archive ↗</button><div id="authMsg"></div></form>`:`<form id="authForm"><label>Username<input name="username" required minlength="3" maxlength="24" pattern="[A-Za-z0-9_]+" placeholder="unfinished_07"></label><label>Password<input id="generatedPassword" name="password" required minlength="8" type="text" autocomplete="new-password"><button type="button" class="filter" id="generatePassword">Generate random password</button></label><p class="modal-intro">Save the username and password somewhere safe. This archive uses no email address, so there is no email-based password reset.</p><button class="button button-dark" type="submit">Create archive identity ↗</button><div id="authMsg"></div></form>`;$('#authForm').dataset.mode=mode;if(mode==='signup'){$('#generatedPassword').value=randomPassword();$('#generatePassword').onclick=()=>$('#generatedPassword').value=randomPassword()};$('#authForm').onsubmit=authSubmit};
      form('login'); $('#loginTab').onclick=()=>{form('login');$('#loginTab').classList.add('active');$('#signupTab').classList.remove('active')}; $('#signupTab').onclick=()=>{form('signup');$('#signupTab').classList.add('active');$('#loginTab').classList.remove('active')};
    } else {
      const {data:profile}=await client.from('profiles').select('username,created_at').eq('id',u.id).maybeSingle();
      const {data:mine}=await client.from('artifacts').select('accession,title,category,year,status,created_at').eq('owner_id',u.id).order('created_at',{ascending:false});
      body.innerHTML=`<p class="eyebrow">Logged in as</p><div class="receipt-number" style="font-size:clamp(2.5rem,7vw,5rem)">${esc(profile?.username||'contributor')}</div><p class="modal-intro">Your published contributions are public. This account simply lets you find them again.</p><div class="record-section"><span class="eyebrow">Your artifacts</span>${mine?.length?`<div class="account-list">${mine.map(a=>`<button class="arrow-link account-artifact" data-id="${esc(a.accession)}">${esc(a.accession)} — ${esc(a.title)}</button>`).join('')}</div>`:'<p>No deposits yet.</p>'}</div><div style="margin-top:28px;display:flex;gap:10px;flex-wrap:wrap"><button class="button button-dark" id="accountDeposit">Deposit an artifact ↗</button><button class="button button-outline" id="signOut">Sign out</button></div>`;
      $$('.account-artifact').forEach(b=>b.onclick=()=>{closeAccount();openArtifact(b.dataset.id)});$('#accountDeposit').onclick=()=>{closeAccount();document.querySelector('[data-open-submit]')?.click()};$('#signOut').onclick=async()=>{await client.auth.signOut();renderAccount();setAccountLabel()};
    }
  }
  async function authSubmit(e){e.preventDefault();const f=new FormData(e.currentTarget),username=String(f.get('username')).trim(),password=String(f.get('password')),mode=e.currentTarget.dataset.mode,msg=$('#authMsg');msg.textContent='';if(!/^[A-Za-z0-9_]{3,24}$/.test(username)){showMsg(msg,'Use 3–24 letters, numbers, or underscores.',true);return}const email=identityEmail(username);
    if(mode==='signup'){const {data,error}=await client.auth.signUp({email,password,options:{data:{username}}});if(error){showMsg(msg,error.message,true);return}if(data.user&&!data.session){showMsg(msg,'Identity created, but email confirmation is enabled in Supabase. Turn off Confirm email in Authentication settings, then create the identity again.',true);return}if(data.session){showMsg(msg,'Identity created. Keep the generated password safe.');setTimeout(()=>{renderAccount();setAccountLabel()},500)}}
    else {const {error}=await client.auth.signInWithPassword({email,password});if(error){showMsg(msg,'That username/password combination was not found.',true);return}renderAccount();setAccountLabel()}
  }
  async function setAccountLabel(){const u=await currentUser();const b=$('#accountButton');if(b)b.textContent=u?'Account':'Account'}
  async function loadPublicArtifacts(){const {data,error}=await client.from('artifacts').select('accession,title,category,year,status,reason,visual,description,contributor_note,contributor_username,created_at').eq('status','Published').order('created_at',{ascending:false});if(error||!data?.length)return;const remote=data.map(a=>({id:a.accession,title:a.title,category:a.category,year:a.year||'Undated',status:a.status,reason:a.reason||'The circumstances were not documented.',visual:a.visual||'paper',description:a.description,note:a.contributor_note,contributor:a.contributor_username}));artifacts=[...remote,...artifacts.filter(a=>!remote.some(r=>r.id===a.id))];render()}
  const form=$('#submitForm');
  if(form){form.onsubmit=async e=>{e.preventDefault();const u=await currentUser();if(!u){openAccount();return}const f=new FormData(form),profile=await client.from('profiles').select('username').eq('id',u.id).maybeSingle(),username=profile.data?.username||'Anonymous',id='A—'+Date.now().toString().slice(-7),visual=['red','blue','green','yellow','paper','dark'][Math.floor(Math.random()*6)],row={accession:id,title:String(f.get('title')),category:String(f.get('category')),year:String(f.get('year')||'Undated'),status:'Published',reason:String(f.get('reason')||'The circumstances were not documented.'),visual,description:String(f.get('description')),contributor_note:String(f.get('note')||''),contributor_username:f.get('anonymous')==='on'?'Anonymous':username,owner_id:u.id};const {error}=await client.from('artifacts').insert(row);if(error){alert(error.message);return}$('#receiptNumber').textContent=id;form.hidden=true;$('#receipt').hidden=false;await loadPublicArtifacts()};}
  window.addEventListener('load',async()=>{await setAccountLabel();await loadPublicArtifacts();const note=document.querySelector('.paper-note');if(note)note.innerHTML='unfinished<br>since 2023'});
  window.moutAuth=client;
})();
