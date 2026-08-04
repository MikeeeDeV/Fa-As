// ============================================================
// كلية الصيدلة - جامعة الأزهر - أسيوط
// Main JavaScript File
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

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
    if (mainNav && !mainNav.contains(e.target) && !hamburger.contains(e.target)) {
      mainNav.classList.remove('open');
    }
  });

  // ---- Sticky Header ----
  const header = document.getElementById('header');
  const topbar = document.querySelector('.topbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
      header.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
    }
  });

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navItems.forEach(function (item) {
      item.classList.remove('active');
      const link = item.querySelector('a[href="#' + current + '"]');
      if (link) item.classList.add('active');
    });
  });

  // ---- Hero Swiper ----
  if (document.querySelector('.heroSwiper')) {
    new Swiper('.heroSwiper', {
      loop: true,
      speed: 800,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.heroSwiper .swiper-pagination',
        clickable: true,
      },
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
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.events-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.events-next',
        prevEl: '.events-prev',
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  // ---- Counter Animation (Intersection Observer) ----
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

  document.querySelectorAll('.dept-card, .news-card, .event-card, .service-card, .stat-card, .gallery-item, .feature-item, .contact-card').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

  // Add CSS for revealed class
  const style = document.createElement('style');
  style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // Add staggered delay to grid children
  document.querySelectorAll('.departments-grid, .services-grid, .stats-grid').forEach(function (grid) {
    Array.from(grid.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.08) + 's';
    });
  });

  // ---- Back to Top Button ----
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
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('header').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
        window.scrollTo({ top: top, behavior: 'smooth' });
        // Close mobile menu if open
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

  // ---- Gallery Lightbox (simple) ----
  document.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const img = this.querySelector('img');
      if (img) {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;';
        const imgEl = document.createElement('img');
        imgEl.src = img.src.replace('w=400', 'w=1200').replace('w=700', 'w=1200');
        imgEl.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.5);';
        overlay.appendChild(imgEl);
        document.body.appendChild(overlay);
        overlay.addEventListener('click', function () { this.remove(); });
        document.addEventListener('keydown', function esc(e) {
          if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
        });
      }
    });
  });

  // ---- Preloader ----
  window.addEventListener('load', function () {
    document.body.style.opacity = '1';
  });

  // ---- News ticker effect: fade in cards one by one ----
  const newsCards = document.querySelectorAll('.news-card');
  newsCards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.15) + 's';
  });

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
