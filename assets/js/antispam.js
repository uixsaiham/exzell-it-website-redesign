/* ============================================
   EXZELL IT – Anti-spam helpers for public forms
   Shared by contact, support, and booking forms.
   ============================================ */
(function () {
  'use strict';

  /* Cloudflare Turnstile site key (dash.cloudflare.com → Turnstile).
     The matching secret key lives server-side in the dashboard's
     TURNSTILE_SECRET_KEY env var — never put it here. */
  window.EXZELL_TURNSTILE_SITE_KEY = window.EXZELL_TURNSTILE_SITE_KEY || '0x4AAAAAAFODmAohwCCmdM8-';

  var renderedAt = Date.now();

  function mountTurnstile(containerId) {
    if (!window.EXZELL_TURNSTILE_SITE_KEY) return;
    var el = document.getElementById(containerId);
    if (!el) return;
    el.classList.add('cf-turnstile');
    el.setAttribute('data-sitekey', window.EXZELL_TURNSTILE_SITE_KEY);
    if (!document.querySelector('script[data-turnstile]')) {
      var s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async = true;
      s.defer = true;
      s.setAttribute('data-turnstile', '1');
      document.head.appendChild(s);
    }
  }

  function getToken() {
    try {
      return window.turnstile ? window.turnstile.getResponse() : '';
    } catch (e) {
      return '';
    }
  }

  /* Injects the honeypot markup into a form if it isn't already there. */
  function injectHoneypot(form) {
    if (!form || form.querySelector('[data-hp-wrap]')) return;
    var wrap = document.createElement('div');
    wrap.setAttribute('data-hp-wrap', '1');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;';
    wrap.innerHTML = '<label>Leave this field empty</label>' +
      '<input type="text" data-hp-field tabindex="-1" autocomplete="off" />';
    form.appendChild(wrap);
  }

  /* Merges honeypot/timing/turnstile fields into a payload object
     right before it's sent to exzellSubmitContact / exzellSubmitSupportTicket. */
  window.exzellAntiSpam = {
    renderedAt: renderedAt,
    mountTurnstile: mountTurnstile,
    injectHoneypot: injectHoneypot,
    reset: function () {
      try {
        if (window.turnstile) window.turnstile.reset();
      } catch (e) { /* no-op */ }
    },
    extend: function (payload, form) {
      if (form) injectHoneypot(form);
      var hp = form && form.querySelector('[data-hp-field]');
      payload.hp_field = hp ? hp.value : '';
      payload.form_rendered_at = renderedAt;
      payload.turnstile_token = getToken();
      return payload;
    }
  };
})();
