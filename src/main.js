//import { sortArray } from './helper-functions.js';
import Handlebars from 'handlebars';
import { loadNavigation, loadFooter } from './components/component-loader.js';
import { PageRouter } from './components/page-router.js';

// Register Handlebars helpers
Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

Handlebars.registerHelper('repeat', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i)
    accum += block.fn(i);
  return accum;
});

Handlebars.registerHelper('subtract', function(a, b) {
  return a - b;
});

// Import only in browser context for testing compatibility
export function initSwipers() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    import('./main.scss');
    import('swiper').then(({ default: Swiper }) => {
      // Main Swiper (single slide)
      new Swiper('.swiper', {
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

      // Devices Swiper (3 slides at a time)
      new Swiper('.device-swiper', {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 24,
        pagination: {
          el: '.device-swiper .swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.device-swiper .swiper-button-next',
          prevEl: '.device-swiper .swiper-button-prev',
        },
        breakpoints: {
          0: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          992: { slidesPerView: 3 }
        }
      });
    });
  }
}

// Helper: Set active nav link based on scroll position
export function setActiveNav() {
  const sections = ['about', 'device', 'contact'];
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  let currentSection = '';

  // Find the section currently in view
  sections.forEach(section => {
    const el = document.getElementById(section);
    if (el && typeof el.getBoundingClientRect === 'function') {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 180 && rect.bottom > 80) {
        currentSection = section;
      }
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (
      (currentSection === '' && link.getAttribute('href') === '#') ||
      (currentSection && link.getAttribute('href') === `#${currentSection}`)
    ) {
      link.classList.add('active');
    }
  });
}

// Automatically initialize components on DOMContentLoaded in browser
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', async function() {
    // Load navigation and footer first
    await loadNavigation();
    await loadFooter();
    
    // Initialize page router (this will handle loading page-specific content)
    new PageRouter();
    
    // Initialize swipers for home page content
    initSwipers();

    // Bootstrap Tabs Activation
    import('bootstrap').then(({ Tab }) => {
      const tabTriggerList = [].slice.call(document.querySelectorAll('#infoTabs button[data-bs-toggle="tab"]'));
      tabTriggerList.forEach(function (tabEl) {
        tabEl.addEventListener('click', function (event) {
          event.preventDefault();
          const tabTrigger = new Tab(tabEl);
          tabTrigger.show();
        });
      });
    });
  });
}


