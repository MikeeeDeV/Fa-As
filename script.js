// ============================================================
// كلية الصيدلة - جامعة الأزهر - أسيوط
// Main JavaScript — Multi-Page Edition
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Google Translate Instant Switcher ----
  window.googleTranslateElementInit = function () {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement({
        pageLanguage: 'ar',
        includedLanguages: 'ar,en',
        autoDisplay: false
      }, 'google_translate_element');
    }
  };

  (function loadGoogleTranslate() {
    if (!document.getElementById('google_translate_element')) {
      const gdiv = document.createElement('div');
      gdiv.id = 'google_translate_element';
      document.body.appendChild(gdiv);
    }
    if (!document.getElementById('gt-script')) {
      const s = document.createElement('script');
      s.id = 'gt-script';
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.head.appendChild(s);
    }
  })();

  function setLanguage(lang) {
    const htmlEl = document.documentElement;
    const langSwitchers = document.querySelectorAll('.lang-switch');

    if (lang === 'en') {
      htmlEl.setAttribute('dir', 'ltr');
      htmlEl.setAttribute('lang', 'en');
      localStorage.setItem('site_lang', 'en');

      langSwitchers.forEach(sw => {
        const arBtn = sw.querySelector('a:first-child');
        const enBtn = sw.querySelector('a:last-child');
        if (arBtn) arBtn.classList.remove('active');
        if (enBtn) enBtn.classList.add('active');
      });

      triggerGoogleTranslate('en');
    } else {
      htmlEl.setAttribute('dir', 'rtl');
      htmlEl.setAttribute('lang', 'ar');
      localStorage.setItem('site_lang', 'ar');

      langSwitchers.forEach(sw => {
        const arBtn = sw.querySelector('a:first-child');
        const enBtn = sw.querySelector('a:last-child');
        if (enBtn) enBtn.classList.remove('active');
        if (arBtn) arBtn.classList.add('active');
      });

      triggerGoogleTranslate('ar');
    }
  }

  function triggerGoogleTranslate(targetLang) {
    const gtSelect = document.querySelector('.goog-te-combo');
    if (gtSelect) {
      gtSelect.value = targetLang;
      gtSelect.dispatchEvent(new Event('change'));
    } else {
      setTimeout(() => triggerGoogleTranslate(targetLang), 300);
    }
  }

  // Language Switcher Event Listeners
  document.querySelectorAll('.lang-switch a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const text = this.textContent.trim().toLowerCase();
      if (text.includes('en') || text.includes('english')) {
        setLanguage('en');
      } else {
        setLanguage('ar');
      }
    });
  });

  // Restore saved language on load
  const savedLang = localStorage.getItem('site_lang');
  if (savedLang === 'en') {
    setTimeout(() => setLanguage('en'), 400);
  }

  // ---- Continuous Seamless Ticker Marquee ----
  (function initTicker() {
    const tickerItems = document.querySelector('.ticker-items');
    if (tickerItems && !tickerItems.dataset.duplicated) {
      tickerItems.dataset.duplicated = 'true';
      // Duplicate content to create 100% continuous loop with 0 gaps
      tickerItems.innerHTML += tickerItems.innerHTML;
    }
  })();

  // ---- Facebook Feed & SDK Error Logger & Fallback Checker ----
  console.info('%c[Facebook Data Fetcher]: جاري فحص حالة سحب البيانات والمنشورات من فيسبوك...', 'color: #1877f2; font-weight: bold; font-size: 12px;');

  window.addEventListener('error', function (e) {
    if (e.filename && (e.filename.includes('facebook') || e.filename.includes('fbcdn'))) {
      console.error('❌ [Facebook SDK Network Error]: خطأ في سحب بيانات فيسبوك من الخادم:', e.message, 'المصدر:', e.filename);
    }
  }, true);

  setTimeout(function checkFacebookEmbeds() {
    const fbBoxes = document.querySelectorAll('.fb-page');
    if (!fbBoxes.length) return;

    let hasErrors = false;
    fbBoxes.forEach(function (fbBox, index) {
      const parent = fbBox.parentElement;
      const isLoaded = window.FB && fbBox.children.length > 0 && fbBox.offsetHeight > 50;

      if (!isLoaded) {
        hasErrors = true;
        console.warn(`⚠️ [Facebook Data Fetch Warning #${index + 1}]: تعذر سحب المنشورات التفاعلية أو تم حظر السكربت بواسطة أداة منع الإعلانات (AdBlocker/Firewall).`);
        console.error(`❌ [Facebook Embed Error]: العنصر المستهدف (pharmacyazharboysassuit) لم يستجب. جارِ التبديل التلقائي إلى كارت العرض البديل.`);

        if (parent) {
          parent.innerHTML = `
            <div class="fb-fallback-box">
              <div class="fb-fallback-icon"><i class="fab fa-facebook-f"></i></div>
              <h4 class="fb-fallback-title">صفحة كلية الصيدلة الرسمية على فيسبوك</h4>
              <p class="fb-fallback-desc">تابع أحدث الأخبار، التكريمات، الفعاليات الأكاديمية والأنشطة الطلابية اليومية مباشرة عبر صفحتنا الرسمية على الفيسبوك.</p>
              <a href="https://www.facebook.com/pharmacyazharboysassuit" target="_blank" rel="noopener" class="btn btn-facebook">
                <i class="fab fa-facebook-f"></i> الانتقال لصفحة الفيسبوك الرسمية
              </a>
            </div>
          `;
        }
      } else {
        console.log(`✅ [Facebook Data Fetch Success #${index + 1}]: تم سحب وعرض بيانات الفيسبوك بنجاح.`);
      }
    });

    if (hasErrors) {
      console.info('💡 [Facebook Debug Note]: لرؤية المنشورات المباشرة دون كارت بديل، يرجى تعطيل أداة AdBlocker أو التأكد من الاتصال بخدمات Meta Facebook.');
    }
  }, 3500);

  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('hide');
      }, 200);
    });
    setTimeout(function () {
      if (preloader && !preloader.classList.contains('hide')) {
        preloader.classList.add('hide');
      }
    }, 1200);
  }

  // ---- Live Search Modal ----
  const searchTriggers = document.querySelectorAll('.search-btn-trigger');
  const searchOverlay = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  const sitePages = [
    { title: 'الصفحة الرئيسية', desc: 'كلية الصيدلة جامعة الأزهر أسيوط', url: 'index' },
    { title: 'سجل الإنجازات والتميز 🏆', desc: 'تكريمات الكلية، الجوائز الدولية، وبراءات الاختراع', url: 'achievements' },
    { title: 'عن الكلية وكلمة العميد', desc: 'تاريخ الكلية، الرؤية، والرسالة والاعتماد', url: 'about' },
    { title: 'الكيمياء الصيدلية والتحليلية', desc: 'الأقسام الأكاديمية - الكيمياء', url: 'departments#pharmaceutical-chemistry' },
    { title: 'قسم الصيدلانيات', desc: 'الأقسام الأكاديمية - الصيدلانيات', url: 'departments#pharmaceutics' },
    { title: 'قسم العقاقير للنباتات الطبية', desc: 'الأقسام الأكاديمية - العقاقير', url: 'departments#pharmacognosy' },
    { title: 'قسم الميكروبيولوجيا والمناعة', desc: 'الأقسام الأكاديمية - الميكروبيولوجيا', url: 'departments#microbiology' },
    { title: 'قسم الكيمياء الحيوية', desc: 'الأقسام الأكاديمية - الكيمياء الحيوية', url: 'departments#biochemistry' },
    { title: 'قسم الصيدلة الإكلينيكية', desc: 'الأقسام الأكاديمية - الرعاية الصيدلية', url: 'departments#clinical-pharmacy' },
    { title: 'برنامج بكالوريوس الصيدلة PharmD', desc: 'البرامج الأكاديمية واللائحة', url: 'academic-programs#bachelor' },
    { title: 'برامج الدراسات العليا (ماجستير ودكتوراه)', desc: 'الدراسات العليا والبحوث', url: 'academic-programs#postgrad' },
    { title: 'البحث العلمي والمختبر المركزي', desc: 'المعامل المركزية والنشر العلمي', url: 'research' },
    { title: 'الهيئة التدريسية', desc: 'دليل السادة أعضاء هيئة التدريس', url: 'faculty' },
    { title: 'بوابة الطلاب والجداول', desc: 'الجداول الدراسية، والنتائج، والتدريب الصيفي', url: 'students' },
    { title: 'الأخبار ومنشورات فيسبوك', desc: 'آخر المنشورات والفعاليات من فيسبوك', url: 'news' },
    { title: 'معرض الصور والفيديو', desc: 'ألبومات صور الكلية على فيسبوك', url: 'gallery' },
    { title: 'اتصل بنا والعنوان', desc: 'خريطة الكلية ورقم الهاتف والبريد', url: 'contact' }
  ];

  if (searchOverlay) {
    searchTriggers.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        searchOverlay.classList.add('active');
        if (searchInput) searchInput.focus();
      });
    });

    if (searchClose) {
      searchClose.addEventListener('click', function () {
        searchOverlay.classList.remove('active');
      });
    }

    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) searchOverlay.classList.remove('active');
    });

    if (searchInput && searchResults) {
      searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        searchResults.innerHTML = '';
        if (!query) return;

        const filtered = sitePages.filter(p => p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query));
        if (filtered.length === 0) {
          searchResults.innerHTML = '<p style="text-align:center;color:var(--text-light);font-size:13px;padding:10px;">لا توجد نتائج تطابق بحثك</p>';
        } else {
          filtered.forEach(p => {
            const item = document.createElement('a');
            item.href = p.url;
            item.className = 'search-result-item';
            item.innerHTML = `<div><h5>${p.title}</h5><p>${p.desc}</p></div><i class="fas fa-arrow-left" style="color:var(--primary)"></i>`;
            searchResults.appendChild(item);
          });
        }
      });
    }
  }

  (function setActiveNav() {
    const path = window.location.pathname;
    let page = path.split('/').pop().replace('.html', '').replace('/', '') || 'index';
    if (page === '') page = 'index';
    document.querySelectorAll('.nav-item[data-page]').forEach(function (item) {
      if (item.dataset.page === page) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  })();

  // ---- Hamburger Menu ----
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    hamburger.setAttribute('aria-controls', 'mainNav');
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
      if (hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
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
    '.dept-card, .news-card, .news-full-card, .event-card, .service-card, .stat-card, .gallery-item, ' +
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

  // ---- Filter Tabs (Faculty & News) ----
  const filterTabs = document.querySelectorAll('.filter-tab');
  if (filterTabs.length) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        filterTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;

        // Faculty page cards
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

        // News page cards
        document.querySelectorAll('.news-full-card').forEach(function (card) {
          const cat = card.dataset.category || '';
          if (filter === 'all' || cat.includes(filter)) {
            card.style.display = '';
            card.classList.remove('hidden');
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => { card.style.display = 'none'; card.classList.add('hidden'); }, 300);
          }
        });
      });
    });
  }

  // ---- News Live Keyword Search ----
  const newsSearchInput = document.getElementById('newsSearchInput');
  const newsSearchClear = document.getElementById('newsSearchClear');
  if (newsSearchInput) {
    newsSearchInput.addEventListener('input', function () {
      const val = this.value.trim().toLowerCase();
      if (newsSearchClear) {
        newsSearchClear.style.display = val ? 'inline-block' : 'none';
      }
      document.querySelectorAll('.news-full-card').forEach(function (card) {
        const text = card.textContent.toLowerCase();
        if (!val || text.includes(val)) {
          card.style.display = '';
          card.classList.remove('hidden');
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; card.classList.add('hidden'); }, 300);
        }
      });
    });

    if (newsSearchClear) {
      newsSearchClear.addEventListener('click', function () {
        newsSearchInput.value = '';
        newsSearchClear.style.display = 'none';
        newsSearchInput.dispatchEvent(new Event('input'));
      });
    }
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
