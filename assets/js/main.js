/* ============================================
   EXZELL IT – Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(s => sectionObserver.observe(s));

  /* ---- Mega menu hover (gap-safe) ---- */
  document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const menu = dropdown.querySelector('.mega-menu');
    if (!menu) return;
    let hideTimer;

    const show = () => {
      clearTimeout(hideTimer);
      menu.style.display = 'block';
    };
    const hide = () => {
      hideTimer = setTimeout(() => { menu.style.display = ''; }, 150);
    };

    dropdown.addEventListener('mouseenter', show);
    dropdown.addEventListener('mouseleave', hide);
    menu.addEventListener('mouseenter', show);
    menu.addEventListener('mouseleave', hide);
  });

  /* ---- Mobile hamburger ---- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ---- HOW WE WORK play/pause toggle ---- */
  const playBtn = document.getElementById('playBtn');
  const hwwVideo = document.querySelector('.hww-video');
  if (playBtn && hwwVideo) {
    playBtn.addEventListener('click', () => {
      const playIcon = playBtn.querySelector('.play-icon');
      const pauseIcon = playBtn.querySelector('.pause-icon');
      if (hwwVideo.paused) {
        hwwVideo.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      } else {
        hwwVideo.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    });
  }

  /* ---- Services tabs ---- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('tab-btn--active'));
      btn.classList.add('tab-btn--active');

      tabPanels.forEach(panel => {
        panel.classList.remove('tab-panel--active');
        if (panel.id === `tab-${target}`) {
          panel.classList.add('tab-panel--active');
        }
      });
    });
  });

  /* ---- Smooth scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });

  /* ---- Scroll-in animations ---- */
  const animTargets = document.querySelectorAll(
    '.challenge-card, .article-card, .apart-item, .testimonial-card, .stat-tile, .about-value, .testi-card, .hww-step, .itc-card, .itc-opp-card, .growth-stage'
  );
  const anim = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${(i % 6) * 0.06}s`;
        entry.target.classList.add('visible');
        anim.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Set initial state
  animTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    anim.observe(el);
  });

  // Add visible class styles via JS
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  /* ---- 920+ counter animation ---- */
  const statNum = document.querySelector('.stat-tile__num--counter');
  if (statNum) {
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let count = 0;
          const target = 920;
          const step = Math.ceil(target / 50);
          const timer = setInterval(() => {
            count = Math.min(count + step, target);
            statNum.childNodes[0].textContent = count;
            if (count >= target) clearInterval(timer);
          }, 25);
          counterObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterObs.observe(statNum);
  }

  /* ---- Testimonials dot pagination ---- */
  const dots = document.querySelectorAll('.tdot');
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('tdot--active'));
      dot.classList.add('tdot--active');
    });
  });

});
