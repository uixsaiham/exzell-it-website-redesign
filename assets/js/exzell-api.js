/* ============================================
   EXZELL IT – Backend API helper
   Shared by every contact / support form on the site.
   ============================================ */
(function () {
  'use strict';

  /* TODO: update once the dashboard app (see /dashboard) is deployed —
     this must point at that deployment's URL, e.g. https://dashboard.exzell-it.de */
  window.EXZELL_API_BASE = window.EXZELL_API_BASE || 'https://dashboard.exzell-it.de';

  function post(path, payload) {
    return fetch(window.EXZELL_API_BASE + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error('Request failed with ' + res.status);
      return res.json();
    });
  }

  /* payload: { name, email, phone?, company?, service?, message? } */
  window.exzellSubmitContact = function (payload) {
    return post('/api/contact', payload);
  };

  /* payload: { name, email, website?, request_type, message } → resolves { ticket_number } */
  window.exzellSubmitSupportTicket = function (payload) {
    return post('/api/support', payload);
  };
})();
