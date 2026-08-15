/* Museum of Unfinished Things — public browser configuration. Never put a service_role key here. */
window.MOUT_CONFIG = {
  supabaseUrl: 'https://oyoacuakzwsvxmzcckot.supabase.co',
  supabaseAnonKey: 'sb_publishable_9E_Hf168dkeWJIQbhgHCKg_DEPsWQc7'
};

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
