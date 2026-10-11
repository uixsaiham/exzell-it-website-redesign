(function () {
  var STORAGE_KEY = 'exzell_lang';
  var DEFAULT_LANG = 'de';

  function applyTranslations(lang) {
    var t = window.EXZELL_T[lang];
    if (!t) return;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.innerHTML = lang === 'de'
        ? '<span>&#x1F1E9;&#x1F1EA;</span><span>DE</span>'
        : '<span>&#x1F1EC;&#x1F1E7;</span><span>EN</span>';
      btn.setAttribute('aria-label', lang === 'de' ? 'Switch to English' : 'Zu Deutsch wechseln');
    }
  }

  function init() {
    var lang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    applyTranslations(lang);

    var btn = document.getElementById('langToggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var cur = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
        var next = cur === 'en' ? 'de' : 'en';
        localStorage.setItem(STORAGE_KEY, next);
        applyTranslations(next);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
