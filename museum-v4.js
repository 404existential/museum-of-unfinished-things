(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  function removeExhibitions() {
    $('#exhibitions')?.remove();
    $$('a[href="#exhibitions"]').forEach((el) => el.remove());
  }

  function clock() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
    if ($('#clockTime')) $('#clockTime').textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    if ($('#clockDate')) $('#clockDate').textContent = `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  function defaultDark() {
    if (!localStorage.getItem('mout-theme')) localStorage.setItem('mout-theme', 'black');
    const dark = localStorage.getItem('mout-theme') !== 'light';
    document.body.classList.toggle('black-mode', dark);
    const b = $('#themeToggle');
    if (b) b.textContent = dark ? 'Light mode' : 'Dark mode';
  }

  function patchThemeButton() {
    const b = $('#themeToggle');
    if (!b || b.dataset.v4) return;
    b.dataset.v4 = '1';
    b.onclick = () => {
      const isDark = document.body.classList.contains('black-mode');
      localStorage.setItem('mout-theme', isDark ? 'light' : 'black');
      document.body.classList.toggle('black-mode', !isDark);
      b.textContent = isDark ? 'Dark mode' : 'Light mode';
    };
  }

  function tweetLikeCards() {
    $$('.artifact-card').forEach((card) => {
      if (card.dataset.v4) return;
      card.dataset.v4 = '1';
      const title = card.querySelector('.card-title')?.textContent?.trim() || 'Untitled record';
      const info = card.querySelector('.card-info')?.textContent?.trim() || '';
      const year = (info.match(/\b(19|20)\d{2}\b/) || [])[0] || '';
      const excerpt = card.querySelector('.card-excerpt')?.textContent?.trim() || '';
      const status = card.querySelector('.card-status')?.textContent?.trim() || '';
      const accession = card.querySelector('.eyebrow')?.textContent?.trim() || '';
      const visual = card.querySelector('.artifact-visual');
      const meta = card.querySelector('.card-meta');
      if (visual) visual.style.display = 'none';
      if (!meta) return;
      meta.innerHTML = `
        <div class="record-post-head"><span class="record-post-user">Anonymous</span><span class="record-post-year">${year}</span></div>
        <h3 class="card-title record-post-title">${title}</h3>
        <p class="record-post-text">${excerpt}</p>
        <div class="record-post-foot"><span>${accession}</span><span>${status}</span></div>`;
      card.classList.add('tweet-like-record');
    });
  }

  function supaClient() {
    return window.supabase && window.MOUT_CONFIG?.supabaseUrl
      ? window.supabase.createClient(window.MOUT_CONFIG.supabaseUrl, window.MOUT_CONFIG.supabaseAnonKey)
      : null;
  }

  function openModal(id) {
    const modal = $(id);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  async function requireIdentityForPosting(e) {
    const client = supaClient();
    const user = client ? (await client.auth.getUser()).data.user : null;
    if (user) {
      openModal('#submitModal');
      return;
    }
    e?.preventDefault();
    e?.stopImmediatePropagation();
    openModal('#accountModal');
    setTimeout(() => $('#signupTab')?.click(), 20);
  }

  function bindPostButton() {
    const post = $('#floatingPost');
    if (!post || post.dataset.v4) return;
    post.dataset.v4 = '1';
    post.addEventListener('click', (e) => requireIdentityForPosting(e).catch(() => openModal('#accountModal')), true);
  }

  async function createIdentity(form) {
    const client = supaClient();
    if (!client) throw new Error('Account service is unavailable');
    const fd = new FormData(form);
    const username = String(fd.get('username') || '').trim();
    const password = String(fd.get('password') || '');
    const file = form.querySelector('input[type="file"]')?.files?.[0] || null;
    if (!username || !password) throw new Error('Username and password are required');
    if (!/^[A-Za-z0-9_.-]{3,24}$/.test(username)) throw new Error('Username must be 3–24 letters, numbers, dots, underscores or hyphens');
    if (password.length < 8) throw new Error('Password must be at least 8 characters');
    const { data: existing, error: lookupError } = await client.from('profiles').select('id').ilike('username', username).limit(1);
    if (lookupError) throw lookupError;
    if (existing?.length) throw new Error('That username is already taken');

    let avatarData = '';
    if (file) {
      avatarData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => resolve(String(reader.result || ''));
        reader.readAsDataURL(file);
      });
    }

    // Username-only public identity, with an internal synthetic email used by Supabase Auth.
    const email = `${username.toLowerCase()}@museum-identity.invalid`;
    const { data, error } = await client.auth.signUp({ email, password, options: { data: { username } } });
    if (error) throw error;
    if (!data.user) throw new Error('The identity could not be created');
    const { error: profileError } = await client.from('profiles').upsert({ id: data.user.id, username, avatar_data: avatarData }, { onConflict: 'id' });
    if (profileError) throw profileError;

    // Auto-login immediately when email confirmation is disabled in the Supabase project.
    if (!data.session) {
      const login = await client.auth.signInWithPassword({ email, password });
      if (login.error) throw new Error('Identity created, but automatic sign-in is disabled on the archive server');
    }
    return client.auth.getUser();
  }

  function bindCreateIdentity() {
    document.addEventListener('submit', async (e) => {
      const form = e.target;
      if (form.id !== 'accountForm') return;
      const mode = form.querySelector('[name="mode"]')?.value;
      if (mode !== 'signup' || form.dataset.v4Signup) return;
      form.dataset.v4Signup = '1';
      e.preventDefault();
      e.stopImmediatePropagation();
      const status = document.createElement('p');
      status.className = 'form-status';
      status.setAttribute('aria-live', 'polite');
      form.appendChild(status);
      try {
        status.textContent = 'Creating identity…';
        await createIdentity(form);
        status.textContent = 'Identity created';
        setTimeout(() => {
          const close = document.querySelector('#accountModal .modal-close');
          close?.click();
          const submit = $('#submitModal');
          if (submit) { submit.classList.add('open'); submit.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
        }, 350);
      } catch (err) {
        status.textContent = err?.message || 'Could not create identity';
        form.dataset.v4Signup = '';
      }
    }, true);
  }

  function ensurePostingRequiresAccount() {
    const form = $('#submitForm');
    if (!form || form.dataset.v4) return;
    form.dataset.v4 = '1';
    form.addEventListener('submit', async (e) => {
      const client = supaClient();
      const user = client ? (await client.auth.getUser()).data.user : null;
      if (!user) {
        e.preventDefault(); e.stopImmediatePropagation();
        document.querySelector('#submitModal .modal-close')?.click();
        openModal('#accountModal');
        setTimeout(() => $('#signupTab')?.click(), 20);
      }
    }, true);
  }

  function addV4Styles() {
    if ($('#museum-v4-style')) return;
    const s = document.createElement('style');
    s.id = 'museum-v4-style';
    s.textContent = `
      .record-post-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:.65rem;font-family:var(--mono,monospace);font-size:.72rem;letter-spacing:.05em;text-transform:uppercase}
      .record-post-user{font-weight:600}.record-post-year{opacity:.55}
      .record-post-title{font-size:clamp(1.45rem,2.3vw,2.15rem);line-height:1.08;margin:.15rem 0 .8rem}
      .record-post-text{font-family:Georgia,serif;font-size:1.02rem;line-height:1.72;margin:0;max-width:48rem}
      .record-post-foot{display:flex;justify-content:space-between;margin-top:1.25rem;padding-top:.8rem;border-top:1px solid currentColor;opacity:.55;font-family:var(--mono,monospace);font-size:.66rem;text-transform:uppercase;letter-spacing:.06em}
      .tweet-like-record{padding:1.35rem 1.45rem}.tweet-like-record .card-meta{padding:0}.tweet-like-record:hover{transform:translateY(-1px)}
      body.black-mode .tweet-like-record{border-color:rgba(255,255,255,.22)}
      #exhibitions{display:none!important}
    `;
    document.head.appendChild(s);
  }

  function init() {
    removeExhibitions();
    addV4Styles();
    defaultDark();
    patchThemeButton();
    clock();
    setInterval(clock, 1000);
    bindPostButton();
    bindCreateIdentity();
    ensurePostingRequiresAccount();
    tweetLikeCards();
    const grid = $('#collectionGrid');
    if (grid) new MutationObserver(() => tweetLikeCards()).observe(grid, {childList:true,subtree:true});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
