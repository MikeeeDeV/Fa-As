/* ============================================================
   كلية الصيدلة - جامعة الأزهر - أسيوط
   Main JavaScript — Multi-Page Edition
   ============================================================ */

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
         s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
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

   const savedLang = localStorage.getItem('site_lang');
   if (savedLang === 'en') {
      setTimeout(() => setLanguage('en'), 400);
   }

   // ---- Preloader ----
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
      { title: 'الصفحة الرئيسية', desc: 'كلية الصيدلة جامعة الأزهر أسيوط', url: 'index.html' },
      { title: 'سجل الإنجازات والتميز 🏆', desc: 'تكريمات الكلية، الجوائز الدولية، وبراءات الاختراع', url: 'achievements.html' },
      { title: 'عن الكلية وكلمة العميد', desc: 'تاريخ الكلية، الرؤية، والرسالة والاعتماد', url: 'about.html' },
      { title: 'الكيمياء الصيدلية والتحليلية', desc: 'الأقسام الأكاديمية - الكيمياء', url: 'departments.html#pharmaceutical-chemistry' },
      { title: 'قسم الصيدلانيات', desc: 'الأقسام الأكاديمية - الصيدلانيات', url: 'departments.html#pharmaceutics' },
      { title: 'قسم العقاقير للنباتات الطبية', desc: 'الأقسام الأكاديمية - العقاقير', url: 'departments.html#pharmacognosy' },
      { title: 'قسم الميكروبيولوجيا والمناعة', desc: 'الأقسام الأكاديمية - الميكروبيولوجيا', url: 'departments.html#microbiology' },
      { title: 'قسم الكيمياء الحيوية', desc: 'الأقسام الأكاديمية - الكيمياء الحيوية', url: 'departments.html#biochemistry' },
      { title: 'قسم الصيدلة الإكلينيكية', desc: 'الأقسام الأكاديمية - الرعاية الصيدلية', url: 'departments.html#clinical-pharmacy' },
      { title: 'برنامج بكالوريوس الصيدلة PharmD', desc: 'البرامج الأكاديمية واللائحة', url: 'academic-programs.html#bachelor' },
      { title: 'برامج الدراسات العليا (ماجستير ودكتوراه)', desc: 'الدراسات العليا والبحوث', url: 'academic-programs.html#postgrad' },
      { title: 'البحث العلمي والمختبر المركزي', desc: 'المعامل المركزية والنشر العلمي', url: 'research.html' },
      { title: 'الهيئة التدريسية', desc: 'دليل السادة أعضاء هيئة التدريس', url: 'faculty.html' },
      { title: 'بوابة الطلاب والجداول', desc: 'الجداول الدراسية، والنتائج، والتدريب الصيفي', url: 'students.html' },
      { title: 'الأخبار ومنشورات فيسبوك', desc: 'آخر المنشورات والفعاليات من فيسبوك', url: 'news.html' },
      { title: 'معرض الصور والفيديو', desc: 'ألبومات صور الكلية على فيسبوك', url: 'gallery.html' },
      { title: 'اتصل بنا والعنوان', desc: 'خريطة الكلية ورقم الهاتف والبريد', url: 'contact.html' }
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
      const page = path.split('/').pop().replace('.html', '') || 'index';

      document.querySelectorAll('.nav-item').forEach(item => {
         const dataPage = item.getAttribute('data-page');
         if (dataPage === page) {
            item.classList.add('active');
         } else {
            item.classList.remove('active');
         }
      });
   })();

   const hamburger = document.getElementById('hamburger');
   const mainNav = document.getElementById('mainNav');

   if (hamburger && mainNav) {
      hamburger.addEventListener('click', function () {
         mainNav.classList.toggle('open');
         this.classList.toggle('active');
      });
   }

   const backToTopBtn = document.getElementById('backToTop');
   if (backToTopBtn) {
      window.addEventListener('scroll', function () {
         if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
         } else {
            backToTopBtn.classList.remove('show');
         }
      });
      backToTopBtn.addEventListener('click', function () {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      });
   }

   if (typeof Swiper !== 'undefined') {
      if (document.querySelector('.heroSwiper')) {
         new Swiper('.heroSwiper', {
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            effect: 'fade',
            fadeEffect: { crossFade: true }
         });
      }
   }
});
