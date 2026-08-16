(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  // V4: quieter archive layout, no exhibitions, simple clock, mandatory identity for posting.
  function removeExhibitions() {
    $('#exhibitions')?.remove();
    $$('a[href="#exhibitions"]').forEach((el) => el.remove());
  }

  function clock() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
    const time = $('#clockTime');
    const date = $('#clockDate');
    if (time) time.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    if (date) date.textContent = `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}`;
  }

  function defaultDark() {
    if (!localStorage.getItem('mout-theme')) localStorage.setItem('mout-theme', 'dark');
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
      localStorage.setItem('mout-theme', isDark ? 'light' : 'dark');
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
      const user = 'Anonymous';
      const excerpt = card.querySelector('.card-excerpt')?.textContent?.trim() || '';
      const status = card.querySelector('.card-status')?.textContent?.trim() || '';
      const accession = card.querySelector('.eyebrow')?.textContent?.trim() || '';
      const visual = card.querySelector('.artifact-visual');
      const meta = card.querySelector('.card-meta');
      if (visual) visual.style.display = 'none';
      if (!meta) return;
      meta.innerHTML = `
        <div class="record-post-head">
          <span class="record-post-user">${user}</span>
          <span class="record-post-year">${year}</span>
        </div>
        <h3 class="card-title record-post-title">${title}</h3>
        <p class="record-post-text">${excerpt}</p>
        <div class="record-post-foot"><span>${accession}</span><span>${status}</span></div>`;
      card.classList.add('tweet-like-record');
    });
  }

  function requireIdentityForPosting() {
    const post = $('#floatingPost');
    if (!post || post.dataset.v4) return;
    post.dataset.v4 = '1';
    post.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      try {
        const client = window.supabase && window.MOUT_CONFIG?.supabaseUrl
          ? window.supabase.createClient(window.MOUT_CONFIG.supabaseUrl, window.MOUT_CONFIG.supabaseAnonKey)
          : null;
        const user = client ? (await client.auth.getUser()).data.user : null;
        if (!user) {
          const modal = $('#accountModal');
          if (modal) {
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
          }
          const area = $('#accountContent');
          const signup = $('#signupTab');
          if (signup) signup.click();
          if (area && !signup) area.innerHTML = '<p class="modal-intro">Create an archive identity before adding a story</p>';
          return;
        }
        const modal = $('#submitModal');
        if (modal) {
          modal.classList.add('open');
          modal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      } catch {
        const modal = $('#accountModal');
        if (modal) {
          modal.classList.add('open');
          modal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      }
    }, true);
  }

  function autoLoginAfterCreate() {
    const root = document;
    root.addEventListener('submit', async (e) => {
      const form = e.target;
      if (form.id !== 'accountForm') return;
      const mode = form.querySelector('[name="mode"]')?.value;
      if (mode !== 'signup') return;
      // The existing signup handler owns the submission. We only watch for the newly-created session.
      setTimeout(async () => {
        try {
          const client = window.supabase && window.MOUT_CONFIG?.supabaseUrl
            ? window.supabase.createClient(window.MOUT_CONFIG.supabaseUrl, window.MOUT_CONFIG.supabaseAnonKey)
            : null;
          if (!client) return;
          const { data } = await client.auth.getSession();
          if (data.session) {
            const modal = $('#accountModal');
            if (modal) {
              modal.classList.add('open');
              modal.setAttribute('aria-hidden', 'false');
            }
          }
        } catch {}
      }, 1200);
    }, true);
  }

  function ensurePostingRequiresAccount() {
    const form = $('#submitForm');
    if (!form || form.dataset.v4) return;
    form.dataset.v4 = '1';
    form.addEventListener('submit', async (e) => {
      try {
        const client = window.supabase && window.MOUT_CONFIG?.supabaseUrl
          ? window.supabase.createClient(window.MOUT_CONFIG.supabaseUrl, window.MOUT_CONFIG.supabaseAnonKey)
          : null;
        const user = client ? (await client.auth.getUser()).data.user : null;
        if (!user) {
          e.preventDefault();
          e.stopImmediatePropagation();
          const m = $('#submitModal');
          if (m) { m.classList.remove('open'); m.setAttribute('aria-hidden','true'); }
          const a = $('#accountModal');
          if (a) { a.classList.add('open'); a.setAttribute('aria-hidden','false'); }
        }
      } catch {}
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
    requireIdentityForPosting();
    autoLoginAfterCreate();
    ensurePostingRequiresAccount();
    tweetLikeCards();
    const grid = $('#collectionGrid');
    if (grid) new MutationObserver(() => tweetLikeCards()).observe(grid, {childList:true,subtree:true});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
