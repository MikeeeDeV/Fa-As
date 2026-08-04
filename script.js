// ============================================================
// كلية الصيدلة - جامعة الأزهر - أسيوط
// Main JavaScript — Multi-Page Edition
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Active Nav based on current page ----
  (function setActiveNav() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('.nav-item[data-page]').forEach(function (item) {
      if (item.dataset.page === page) {
        item.classList.add('active');
      }
    });
  })();

  // ---- Hamburger Menu ----
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      mainNav.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }

  // Mobile: toggle dropdowns on click
  document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('open');
      }
    });
  });

  // Close menu on outside click
  document.addEventListener('click', function (e) {
    if (mainNav && hamburger && !mainNav.contains(e.target) && !hamburger.contains(e.target)) {
      mainNav.classList.remove('open');
    }
  });

  // ---- Sticky Header shadow ----
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 80) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
      } else {
        header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
      }
    });
  }

  // ---- Active Nav Link on Scroll (homepage only) ----
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    window.addEventListener('scroll', function () {
      let current = '';
      sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      document.querySelectorAll('.nav-item').forEach(function (item) {
        const link = item.querySelector('a[href$="#' + current + '"]');
        if (link && !item.dataset.page) {
          item.classList.add('active');
        }
      });
    });
  }

  // ---- Hero Swiper ----
  if (document.querySelector('.heroSwiper')) {
    new Swiper('.heroSwiper', {
      loop: true,
      speed: 800,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.heroSwiper .swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.heroSwiper .swiper-button-next',
        prevEl: '.heroSwiper .swiper-button-prev',
      },
      effect: 'fade',
      fadeEffect: { crossFade: true },
    });
  }

  // ---- Events Swiper ----
  if (document.querySelector('.eventsSwiper')) {
    new Swiper('.eventsSwiper', {
      loop: true,
      speed: 600,
      slidesPerView: 1,
      spaceBetween: 24,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.events-pagination', clickable: true },
      navigation: { nextEl: '.events-next', prevEl: '.events-prev' },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  // ---- Counter Animation ----
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current).toLocaleString('ar-EG');
    }, 16);
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.counter, .counter2').forEach(function (el) {
    counterObserver.observe(el);
  });

  // ---- Scroll Reveal Animation ----
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll(
    '.dept-card, .news-card, .event-card, .service-card, .stat-card, .gallery-item, ' +
    '.feature-item, .contact-card, .faculty-card, .research-center-card, .mvg-card, ' +
    '.admin-card, .community-card, .portal-card, .qsi-card, .accred-card, .pub-item, ' +
    '.value-item, .dept-full-card, .program-card'
  ).forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  const styleEl = document.createElement('style');
  styleEl.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(styleEl);

  // Staggered delay for grid children
  document.querySelectorAll(
    '.departments-grid, .services-grid, .stats-grid, .faculty-grid, ' +
    '.research-centers-grid, .mvg-grid, .admin-grid, .accred-grid, ' +
    '.community-grid, .quick-stats-inner'
  ).forEach(function (grid) {
    Array.from(grid.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.07) + 's';
    });
  });

  // ---- Back to Top ----
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Smooth Scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (hash === '#') return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
        window.scrollTo({ top: top, behavior: 'smooth' });
        if (mainNav) mainNav.classList.remove('open');
      }
    });
  });

  // ---- Contact Form ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check-circle"></i> تم الإرسال بنجاح!';
      btn.style.background = '#28a745';
      btn.disabled = true;
      setTimeout(function () {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3500);
    });
  }

  // ---- Gallery Lightbox ----
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (img) {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.94);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;animation:fadeInUp 0.3s ease;';
        const imgEl = document.createElement('img');
        imgEl.src = img.src.replace('w=400', 'w=1200').replace('w=700', 'w=1200');
        imgEl.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.5);';
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.style.cssText = 'position:fixed;top:20px;left:20px;background:rgba(255,255,255,0.15);border:none;color:#fff;width:44px;height:44px;border-radius:50%;font-size:1.1rem;cursor:pointer;transition:all 0.3s;display:flex;align-items:center;justify-content:center;';
        closeBtn.addEventListener('click', function () { overlay.remove(); });
        overlay.appendChild(imgEl);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
        overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
        document.addEventListener('keydown', function esc(e) {
          if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
        });
      }
    });
  });

  // ---- Faculty Filter Tabs ----
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (filterTabs.length) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        filterTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        document.querySelectorAll('.faculty-card').forEach(function (card) {
          if (filter === 'all' || card.dataset.dept === filter) {
            card.style.display = '';
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // ---- Facebook Tab switcher (news page) ----
  const fbTabBtns = document.querySelectorAll('.fb-tab-btn');
  if (fbTabBtns.length) {
    fbTabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        fbTabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const tab = this.dataset.tab;
        document.querySelectorAll('.fb-tab-pane').forEach(function (pane) {
          pane.style.display = pane.dataset.pane === tab ? '' : 'none';
        });
      });
    });
  }

  // ---- Announcement close ----
  const announceClose = document.querySelector('.announce-close');
  const announceBand = document.querySelector('.announce-band');
  if (announceClose && announceBand) {
    announceClose.addEventListener('click', function () {
      announceBand.style.opacity = '0';
      setTimeout(() => { announceBand.style.display = 'none'; }, 300);
    });
  }

  // ---- Departments color customization ----
  document.querySelectorAll('.dept-icon-wrap').forEach(function (wrap) {
    const color = getComputedStyle(wrap).getPropertyValue('--dept-color').trim();
    if (color) {
      wrap.style.backgroundColor = color + '22';
      wrap.style.color = color;
    }
  });

  console.log('كلية الصيدلة - جامعة الأزهر - أسيوط | الموقع محمّل بنجاح ✓');
});
