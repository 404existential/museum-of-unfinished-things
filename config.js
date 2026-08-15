/* Museum of Unfinished Things — public browser configuration. Never put a service_role key here. */
window.MOUT_CONFIG = {
  supabaseUrl: 'https://oyoacuakzwsvxmzcckot.supabase.co',
  supabaseAnonKey: 'sb_publishable_9E_Hf168dkeWJIQbhgHCKg_DEPsWQc7'
};

/* Default to dark mode on a visitor's first visit. */
(function () {
  try {
    if (!localStorage.getItem('mout-theme')) localStorage.setItem('mout-theme', 'black');
  } catch (_) {}
})();

/* Keep the floating post control visually simple and theme-aware. */
(function () {
  const css = document.createElement('style');
  css.textContent = `
    #floatingPost { background:#171513 !important; color:#f1eee6 !important; border-color:#171513 !important; }
    body.black-mode #floatingPost { background:#f1eee6 !important; color:#171513 !important; border-color:#f1eee6 !important; }
  `;
  document.head.appendChild(css);
})();

/* Collection-desk account directory. Only appears after the private collection-desk login. */
(function () {
  const CONTROL = 'https://oyoacuakzwsvxmzcckot.supabase.co/functions/v1/museum-control';
  let mounted = false;
  async function mountAccounts() {
    if (mounted) return;
    const box = document.getElementById('accountContent');
    const token = sessionStorage.getItem('mout-admin-token');
    if (!box || !token || !box.textContent.includes('Collection desk')) return;
    mounted = true;
    const wrap = document.createElement('section');
    wrap.className = 'record-section';
    wrap.style.marginTop = '28px';
    wrap.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:15px;flex-wrap:wrap">
        <span class="eyebrow">Contributor identities</span>
        <button class="button button-outline" type="button" id="viewAccounts">View accounts</button>
      </div>
      <div id="accountDirectory" hidden style="margin-top:15px"></div>
    `;
    box.insertBefore(wrap, box.firstChild);
    document.getElementById('viewAccounts').onclick = async function () {
      const list = document.getElementById('accountDirectory');
      list.hidden = false;
      list.textContent = 'Loading identities…';
      try {
        const r = await fetch(CONTROL, {
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({action:'accounts',token})
        });
        const j = await r.json();
        if (!r.ok || j.error) throw new Error(j.error || 'Unable to load accounts');
        if (!j.data.length) { list.textContent = 'No contributor identities yet'; return; }
        list.innerHTML = j.data.map(function (p) {
          const name = String(p.username || 'Unnamed').replace(/[&<>"']/g, function(c){return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'})[c]});
          return `<div style="padding:12px 0;border-bottom:1px solid var(--line);font-family:var(--mono);font-size:.72rem">${name}</div>`;
        }).join('');
      } catch (e) {
        list.textContent = e.message || 'Unable to load accounts';
      }
    };
  }
  function watch() {
    const box = document.getElementById('accountContent');
    if (!box) return;
    const observer = new MutationObserver(function(){ if (!mounted) mountAccounts(); });
    observer.observe(box, {childList:true,subtree:true,characterData:true});
    mountAccounts();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch, {once:true});
  else watch();
})();

/* Reliable feedback fallback: opens the visitor's mail app with the museum feedback pre-addressed. */
(function () {
  function bindFeedback() {
    const form = document.getElementById('feedbackForm');
    const status = document.getElementById('feedbackStatus');
    if (!form || form.dataset.feedbackBound === 'true') return;
    form.dataset.feedbackBound = 'true';

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      const data = new FormData(form);
      const subject = String(data.get('subject') || 'General feedback').trim();
      const message = String(data.get('message') || '').trim();

      if (!message) {
        if (status) status.textContent = 'Please write a note before sending';
        return;
      }

      const body = [
        'Museum of Unfinished Things — correspondence',
        '',
        'Subject: ' + subject,
        '',
        message,
        '',
        'Sent from the Museum of Unfinished Things website'
      ].join('\n');

      const mailto = 'mailto:therajin2@gmail.com' +
        '?subject=' + encodeURIComponent('[Museum] ' + subject) +
        '&body=' + encodeURIComponent(body);

      if (status) status.textContent = 'Opening your email app…';
      window.location.href = mailto;

      setTimeout(function () {
        if (status) status.textContent = 'If your email app did not open, please check that a default mail app is configured';
      }, 1800);
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindFeedback, { once: true });
  } else {
    bindFeedback();
  }
})();
