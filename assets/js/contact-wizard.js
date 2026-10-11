/* ============================================
   EXZELL IT – Contact Wizard (3-step modal)
   ============================================ */
(function () {
  'use strict';

  /* ---- Services ---- */
  var SERVICES = [
    {
      id: 'web',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
      title: 'Web Development',
      desc: 'Custom websites optimised for performance and growth.'
    },
    {
      id: 'ai',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
      title: 'AI Automation',
      desc: 'Automate repetitive tasks, improve efficiency, and reduce costs.'
    },
    {
      id: 'design',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M3 9h18M9 21V9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
      title: 'UI/UX Design',
      desc: 'Intuitive, beautiful interfaces that convert visitors into customers.'
    },
    {
      id: 'data',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      title: 'Data Analysis',
      desc: 'Unlock actionable insights with expert data analysis services.'
    },
    {
      id: 'ml',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="2.5" stroke="currentColor" stroke-width="1.6"/><circle cx="5" cy="18" r="2.5" stroke="currentColor" stroke-width="1.6"/><circle cx="19" cy="18" r="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M12 10.5v3M12 13.5l-5.5 3M12 13.5l5.5 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
      title: 'Machine Learning',
      desc: 'Cutting-edge ML solutions tailored to your business needs.'
    },
    {
      id: 'wlan',
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      title: 'WLAN Design',
      desc: 'Professional WLAN planning with Hamina Wireless for businesses.'
    }
  ];

  /* ---- CSS ---- */
  var CSS = [
    '.cwiz-overlay{display:none;position:fixed;inset:0;z-index:10000;background:rgba(11,27,43,0.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);align-items:center;justify-content:center;padding:20px}',
    '.cwiz-overlay.open{display:flex}',
    '.cwiz-modal{background:#fff;border-radius:20px;padding:40px;width:100%;max-width:680px;box-shadow:0 24px 80px rgba(0,0,0,0.28);position:relative;animation:cwizIn 0.25s ease}',
    '@keyframes cwizIn{from{opacity:0;transform:scale(0.96) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}}',

    /* close btn */
    '.cwiz-close{position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:50%;border:none;background:#f3f4f6;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#6b7280;transition:background 0.2s}',
    '.cwiz-close:hover{background:#e5e7eb}',

    /* steps */
    '.cwiz-steps{display:flex;align-items:center;justify-content:center;margin-bottom:36px}',
    '.cwiz-step{display:flex;flex-direction:column;align-items:center;gap:6px}',
    '.cwiz-step__dot{width:36px;height:36px;border-radius:50%;background:#e5e7eb;color:#9ca3af;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all 0.3s}',
    '.cwiz-step.active .cwiz-step__dot,.cwiz-step.done .cwiz-step__dot{background:#4CAF50;color:#fff}',
    '.cwiz-step__label{font-size:12px;color:#9ca3af;font-weight:500;transition:color 0.3s;font-family:inherit}',
    '.cwiz-step.active .cwiz-step__label,.cwiz-step.done .cwiz-step__label{color:#111827;font-weight:600}',
    '.cwiz-step-line{width:80px;height:2px;background:#e5e7eb;margin:0 8px 24px;transition:background 0.3s;flex-shrink:0}',
    '.cwiz-step-line.done{background:#4CAF50}',

    /* panels */
    '.cwiz-panel{display:none}',
    '.cwiz-panel.active{display:block}',
    '.cwiz-panel h2{font-size:22px;font-weight:800;color:#111827;margin:0 0 6px;font-family:inherit}',
    '.cwiz-panel > p{font-size:14px;color:#6b7280;margin:0 0 28px;font-family:inherit}',

    /* service cards */
    '.cwiz-services{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:8px}',
    '.cwiz-service-card{border:1.5px solid #e5e7eb;border-radius:14px;padding:18px 14px;cursor:pointer;transition:all 0.2s;background:#f9fafb;user-select:none}',
    '.cwiz-service-card:hover{border-color:#4CAF50;background:#f0faf0}',
    '.cwiz-service-card.selected{border-color:#4CAF50;background:#f0faf0;box-shadow:0 0 0 3px rgba(76,175,80,0.18)}',
    '.cwiz-service-card__icon{width:44px;height:44px;border-radius:10px;background:#e5e7eb;color:#6b7280;display:flex;align-items:center;justify-content:center;margin-bottom:12px;transition:all 0.2s;flex-shrink:0}',
    '.cwiz-service-card:hover .cwiz-service-card__icon,.cwiz-service-card.selected .cwiz-service-card__icon{background:#4CAF50;color:#fff}',
    '.cwiz-service-card__title{font-size:13px;font-weight:700;color:#111827;margin-bottom:4px;font-family:inherit}',
    '.cwiz-service-card__desc{font-size:11px;color:#6b7280;line-height:1.55;font-family:inherit}',

    /* form */
    '.cwiz-field{margin-bottom:18px}',
    '.cwiz-field label{display:block;font-size:13px;font-weight:600;color:#374151;margin-bottom:7px;font-family:inherit}',
    '.cwiz-field textarea,.cwiz-field input,.cwiz-field select{width:100%;padding:12px 14px;border:1.5px solid #e5e7eb;border-radius:10px;font-size:14px;color:#111827;background:#f9fafb;font-family:inherit;outline:none;box-sizing:border-box;transition:border-color 0.2s;-webkit-appearance:none;appearance:none}',
    '.cwiz-field textarea:focus,.cwiz-field input:focus,.cwiz-field select:focus{border-color:#4CAF50;background:#fff}',
    '.cwiz-field textarea{resize:vertical;min-height:110px}',
    '.cwiz-field-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}',

    /* nav buttons */
    '.cwiz-nav{display:flex;justify-content:space-between;align-items:center;margin-top:28px}',
    '.cwiz-btn-back{display:flex;align-items:center;gap:6px;padding:11px 20px;border-radius:10px;border:1.5px solid #e5e7eb;background:#fff;font-size:14px;font-weight:600;color:#374151;cursor:pointer;transition:all 0.2s;font-family:inherit}',
    '.cwiz-btn-back:hover{background:#f9fafb}',
    '.cwiz-btn-back.hidden{visibility:hidden}',
    '.cwiz-btn-next{display:flex;align-items:center;gap:6px;padding:11px 24px;border-radius:10px;border:none;background:#4CAF50;color:#fff;font-size:14px;font-weight:700;cursor:pointer;transition:all 0.2s;font-family:inherit}',
    '.cwiz-btn-next:hover{background:#3a9e3e;transform:translateY(-1px)}',

    /* success */
    '.cwiz-success{text-align:center;padding:20px 0}',
    '.cwiz-success__icon{width:72px;height:72px;border-radius:50%;background:#f0faf0;display:flex;align-items:center;justify-content:center;margin:0 auto 20px}',
    '.cwiz-success h2{font-size:22px;font-weight:800;color:#111827;margin:0 0 10px;font-family:inherit}',
    '.cwiz-success p{font-size:15px;color:#6b7280;max-width:360px;margin:0 auto 28px;font-family:inherit;line-height:1.6}',

    /* responsive */
    '@media(max-width:600px){.cwiz-modal{padding:24px 18px}.cwiz-services{grid-template-columns:repeat(2,1fr)}.cwiz-field-row{grid-template-columns:1fr;gap:0}.cwiz-step-line{width:40px}}'
  ].join('');

  /* ---- Build HTML ---- */
  function buildModal() {
    var cards = SERVICES.map(function (s) {
      return (
        '<div class="cwiz-service-card" data-service="' + s.id + '">' +
          '<div class="cwiz-service-card__icon">' + s.icon + '</div>' +
          '<div class="cwiz-service-card__title">' + s.title + '</div>' +
          '<div class="cwiz-service-card__desc">' + s.desc + '</div>' +
        '</div>'
      );
    }).join('');

    return (
      '<div id="contactWizard" class="cwiz-overlay" role="dialog" aria-modal="true">' +
        '<div class="cwiz-modal">' +
          '<button class="cwiz-close" id="cwizClose" aria-label="Close">' +
            '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
          '</button>' +

          /* Steps */
          '<div class="cwiz-steps">' +
            '<div class="cwiz-step active" data-s="1"><div class="cwiz-step__dot">1</div><div class="cwiz-step__label">Service</div></div>' +
            '<div class="cwiz-step-line" data-line="1"></div>' +
            '<div class="cwiz-step" data-s="2"><div class="cwiz-step__dot">2</div><div class="cwiz-step__label">Details</div></div>' +
            '<div class="cwiz-step-line" data-line="2"></div>' +
            '<div class="cwiz-step" data-s="3"><div class="cwiz-step__dot">3</div><div class="cwiz-step__label">Contact</div></div>' +
          '</div>' +

          /* Panel 1 */
          '<div class="cwiz-panel active" id="cwizPanel1">' +
            '<h2>What would you like to build?</h2>' +
            '<p>Select the service that best fits your needs</p>' +
            '<div class="cwiz-services">' + cards + '</div>' +
          '</div>' +

          /* Panel 2 */
          '<div class="cwiz-panel" id="cwizPanel2">' +
            '<h2>Tell us about your project</h2>' +
            '<p>Help us better understand your needs</p>' +
            '<div class="cwiz-field">' +
              '<label for="cwizDesc">Describe your project</label>' +
              '<textarea id="cwizDesc" placeholder="What problem are you trying to solve?"></textarea>' +
            '</div>' +
            '<div class="cwiz-field-row">' +
              '<div class="cwiz-field">' +
                '<label for="cwizTimeline">Expected timeline</label>' +
                '<select id="cwizTimeline"><option value="" disabled selected>Select an option</option><option>Less than 1 month</option><option>1–3 months</option><option>3–6 months</option><option>6+ months</option><option>Ongoing / not sure</option></select>' +
              '</div>' +
              '<div class="cwiz-field">' +
                '<label for="cwizBudget">Budget range</label>' +
                '<select id="cwizBudget"><option value="" disabled selected>Select an option</option><option>Under €5,000</option><option>€5,000 – €15,000</option><option>€15,000 – €50,000</option><option>€50,000+</option><option>Not sure yet</option></select>' +
              '</div>' +
            '</div>' +
          '</div>' +

          /* Panel 3 */
          '<div class="cwiz-panel" id="cwizPanel3">' +
            '<h2>How can we reach you?</h2>' +
            '<p>We\'ll get back to you within 24 hours</p>' +
            '<div class="cwiz-field-row">' +
              '<div class="cwiz-field"><label for="cwizName">Your name *</label><input type="text" id="cwizName" placeholder="John Doe"></div>' +
              '<div class="cwiz-field"><label for="cwizEmail">Email address *</label><input type="email" id="cwizEmail" placeholder="john@company.com"></div>' +
            '</div>' +
            '<div class="cwiz-field-row">' +
              '<div class="cwiz-field"><label for="cwizCompany">Company</label><input type="text" id="cwizCompany" placeholder="Acme Inc."></div>' +
              '<div class="cwiz-field"><label for="cwizPhone">Phone number</label><input type="tel" id="cwizPhone" placeholder="+49 123 456 7890"></div>' +
            '</div>' +
            '<div id="cwizTurnstile" style="margin-top:8px;"></div>' +
          '</div>' +

          /* Navigation */
          '<div class="cwiz-nav">' +
            '<button class="cwiz-btn-back hidden" id="cwizBack">' +
              '<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Back' +
            '</button>' +
            '<button class="cwiz-btn-next" id="cwizNext">' +
              'Next <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ---- State ---- */
  var currentStep = 1;
  var selectedService = null;

  function goTo(step) {
    currentStep = step;

    /* update step indicators */
    document.querySelectorAll('.cwiz-step').forEach(function (el) {
      var s = parseInt(el.dataset.s, 10);
      el.classList.toggle('active', s === step);
      el.classList.toggle('done', s < step);
    });
    document.querySelectorAll('.cwiz-step-line').forEach(function (el) {
      el.classList.toggle('done', parseInt(el.dataset.line, 10) < step);
    });

    /* switch panels */
    document.querySelectorAll('.cwiz-panel').forEach(function (el, i) {
      el.classList.toggle('active', i + 1 === step);
    });

    /* back button */
    document.getElementById('cwizBack').classList.toggle('hidden', step === 1);

    /* next button label */
    var next = document.getElementById('cwizNext');
    if (step === 3) {
      next.innerHTML = 'Send Request <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M13.5 2.5l-11 4 4.5 2 2 4.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    } else {
      next.innerHTML = 'Next <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
  }

  function flashRed(els) {
    els.forEach(function (el) {
      el.style.borderColor = '#fca5a5';
      setTimeout(function () { el.style.borderColor = ''; }, 800);
    });
  }

  function showSuccess() {
    document.querySelector('.cwiz-modal').innerHTML =
      '<div class="cwiz-success">' +
        '<div class="cwiz-success__icon">' +
          '<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="18" fill="#4CAF50"/><path d="M11 18l5 5 9-9" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</div>' +
        '<h2>Message Sent!</h2>' +
        '<p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>' +
        '<button class="cwiz-btn-next" style="margin:0 auto;" id="cwizDone">Close</button>' +
      '</div>';
    document.getElementById('cwizDone').addEventListener('click', closeModal);
  }

  function showError() {
    window.exzellAntiSpam.reset();
    var next = document.getElementById('cwizNext');
    next.disabled = false;
    next.innerHTML = 'Send Request <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M13.5 2.5l-11 4 4.5 2 2 4.5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    var existing = document.getElementById('cwizErr');
    if (existing) return;
    var p = document.createElement('p');
    p.id = 'cwizErr';
    p.style.cssText = 'color:#dc2626;font-size:13px;margin-top:14px;text-align:center;';
    p.textContent = 'Something went wrong sending your request. Please try again.';
    document.querySelector('.cwiz-nav').insertAdjacentElement('afterend', p);
  }

  function openModal() {
    /* reset */
    currentStep = 1;
    selectedService = null;
    document.querySelectorAll('.cwiz-service-card').forEach(function (c) { c.classList.remove('selected'); });
    var desc = document.getElementById('cwizDesc');
    if (desc) desc.value = '';
    var name = document.getElementById('cwizName');
    if (name) name.value = '';
    var email = document.getElementById('cwizEmail');
    if (email) email.value = '';
    var company = document.getElementById('cwizCompany');
    if (company) company.value = '';
    var phone = document.getElementById('cwizPhone');
    if (phone) phone.value = '';

    goTo(1);
    document.getElementById('contactWizard').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('contactWizard').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ---- Init ---- */
  function init() {
    /* inject CSS */
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    /* inject HTML */
    document.body.insertAdjacentHTML('beforeend', buildModal());
    window.exzellAntiSpam.mountTurnstile('cwizTurnstile');

    /* close button */
    document.getElementById('cwizClose').addEventListener('click', closeModal);
    document.getElementById('contactWizard').addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });

    /* service card clicks */
    document.querySelectorAll('.cwiz-service-card').forEach(function (card) {
      card.addEventListener('click', function () {
        document.querySelectorAll('.cwiz-service-card').forEach(function (c) { c.classList.remove('selected'); });
        card.classList.add('selected');
        selectedService = card.dataset.service;
      });
    });

    /* next */
    document.getElementById('cwizNext').addEventListener('click', function () {
      if (currentStep === 1) {
        if (!selectedService) {
          flashRed(Array.from(document.querySelectorAll('.cwiz-service-card')));
          return;
        }
        goTo(2);
      } else if (currentStep === 2) {
        goTo(3);
      } else if (currentStep === 3) {
        var nameVal = document.getElementById('cwizName').value.trim();
        var emailVal = document.getElementById('cwizEmail').value.trim();
        if (!nameVal || !emailVal) {
          var toFlash = [];
          if (!nameVal) toFlash.push(document.getElementById('cwizName'));
          if (!emailVal) toFlash.push(document.getElementById('cwizEmail'));
          flashRed(toFlash);
          return;
        }
        var service = (SERVICES.find(function (s) { return s.id === selectedService; }) || {}).title || selectedService;
        var desc = (document.getElementById('cwizDesc').value || '').trim();
        var timeline = document.getElementById('cwizTimeline').value || '—';
        var budget = document.getElementById('cwizBudget').value || '—';
        var company = (document.getElementById('cwizCompany').value || '').trim();
        var phone = (document.getElementById('cwizPhone').value || '').trim();
        var message = [
          desc || '—',
          '',
          'Timeline: ' + timeline,
          'Budget: ' + budget
        ].join('\n');

        var existingErr = document.getElementById('cwizErr');
        if (existingErr) existingErr.remove();
        var nextBtn = document.getElementById('cwizNext');
        nextBtn.disabled = true;
        nextBtn.innerHTML = 'Sending…';

        window.exzellSubmitContact({
          name: nameVal,
          email: emailVal,
          phone: phone,
          company: company,
          service: service,
          message: message
        }).then(showSuccess).catch(showError);
      }
    });

    /* back */
    document.getElementById('cwizBack').addEventListener('click', function () {
      if (currentStep > 1) goTo(currentStep - 1);
    });

    /* intercept only elements marked with data-wizard */
    document.querySelectorAll('[data-wizard]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });

    /* escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
