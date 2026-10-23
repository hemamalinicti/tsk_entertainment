/**
 * TSK Entertainments - Shared Component Architecture & Interactive Logic
 * Injects sticky header, mobile drawer, footer, floating WhatsApp widget,
 * animated stats counters, and accessible hero video controls.
 */

(function () {
  'use strict';

  // Navigation Links Definition (5 Core Browse Links)
  const NAV_LINKS = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Services & Packages', href: 'services-packages.html' },
    { label: 'Gallery', href: 'gallery.html' },
    { label: 'Contact', href: 'contact.html' }
  ];

  // Determine current active page
  function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page === '' ? 'index.html' : page;
  }

  // Generate Navigation items HTML
  function renderNavItems(isMobile = false) {
    const currentPage = getCurrentPage();
    return NAV_LINKS.map(link => {
      const isActive = currentPage.toLowerCase() === link.href.toLowerCase() ||
        (currentPage === '' && link.href === 'index.html') ||
        (link.href === 'services-packages.html' && (currentPage === 'services.html' || currentPage === 'packages.html'));
      const activeClass = isActive ? ' active' : '';
      const currentAttr = isActive ? ' aria-current="page"' : '';
      const className = isMobile ? `mobile-nav-link${activeClass}` : `nav-link${activeClass}`;

      return `<li><a href="${link.href}" class="${className}"${currentAttr}>${link.label}</a></li>`;
    }).join('');
  }

  // Shared Header Component
  function renderHeader() {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    const currentPage = getCurrentPage();
    const isPlanPage = currentPage.toLowerCase() === 'plan-my-event.html';
    const ctaCurrentAttr = isPlanPage ? ' aria-current="page"' : '';
    const ctaActiveClass = isPlanPage ? ' active' : '';

    headerEl.innerHTML = `
      <div class="container header-container">
        <a href="index.html" class="brand-logo" aria-label="TSK Entertainments - Home">
          <div class="brand-symbol" aria-hidden="true">TSK</div>
          <div class="brand-text">
            <span class="brand-name">TSK Entertainments</span>
            <span class="brand-tag">Events &bull; Weddings &bull; Tamil Nadu</span>
          </div>
        </a>

        <nav class="nav-desktop" aria-label="Main Navigation">
          <ul style="display: flex; gap: 1.5rem; list-style: none; align-items: center;">
            ${renderNavItems(false)}
          </ul>
        </nav>

        <div class="header-actions">
          <a href="plan-my-event.html" class="btn btn-primary header-cta${ctaActiveClass}"${ctaCurrentAttr}>Plan My Event</a>
          <button type="button" class="mobile-toggle" id="mobile-menu-btn" aria-expanded="false" aria-controls="mobile-nav-drawer" aria-label="Toggle navigation menu">
            <svg class="icon-open" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
            </svg>
            <svg class="icon-close" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-nav-drawer" class="mobile-nav-drawer" aria-hidden="true">
        <div class="mobile-nav-panel">
          <nav aria-label="Mobile Navigation">
            <ul class="mobile-nav-links">
              ${renderNavItems(true)}
            </ul>
          </nav>
          <a href="plan-my-event.html" class="btn btn-primary mobile-nav-cta">Plan My Event</a>
          <div class="mobile-nav-contact">
            <span>Direct Bookings: <a href="tel:6383180073">+91 6383180073</a></span>
            <span>Instagram: <a href="https://instagram.com/tskentertainments" target="_blank" rel="noopener noreferrer">@tskentertainments</a></span>
          </div>
        </div>
      </div>
    `;

    setupMobileMenu();
    setupScrollHeader(headerEl);
  }

  // Mobile Menu Behavior
  function setupMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    if (!toggleBtn || !drawer) return;

    function openMenu() {
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when clicking outside panel
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) {
        closeMenu();
      }
    });

    // Close on navigation link click
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeMenu();
        toggleBtn.focus();
      }
    });
  }

  // Header scroll shadow effect
  function setupScrollHeader(headerEl) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        headerEl.classList.add('scrolled');
      } else {
        headerEl.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Shared Footer Component
  function renderFooter() {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    const currentYear = new Date().getFullYear();

    footerEl.innerHTML = `
      <div class="container">
        <div class="footer-top">
          <!-- Col 1: Brand & Tagline -->
          <div class="footer-brand">
            <a href="index.html" class="brand-logo" aria-label="TSK Entertainments - Home">
              <div class="brand-symbol" aria-hidden="true">TSK</div>
              <div class="brand-text">
                <span class="brand-name">TSK Entertainments</span>
                <span class="brand-tag">Tamil Nadu &bull; India</span>
              </div>
            </a>
            <p class="footer-tagline">
              Bespoke weddings, royal stage décor, and milestone celebrations crafted with precision across Tamil Nadu.
            </p>
          </div>

          <!-- Col 2: Quick Links -->
          <div class="footer-col footer-col-links">
            <h3 class="footer-title">Quick Links</h3>
            <ul class="footer-links">
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="services-packages.html">Services &amp; Packages</a></li>
              <li><a href="gallery.html">Event Gallery</a></li>
              <li><a href="contact.html">Contact Us</a></li>
              <li><a href="plan-my-event.html">Plan My Event</a></li>
            </ul>
          </div>

          <!-- Col 3: Core Services -->
          <div class="footer-col footer-col-services">
            <h3 class="footer-title">Our Services</h3>
            <ul class="footer-links">
              <li><a href="services.html#weddings">Royal Weddings</a></li>
              <li><a href="services.html#decor">Stage &amp; Floral Décor</a></li>
              <li><a href="celebrity.html">Celebrity Management</a></li>
              <li><a href="services.html#birthdays">Milestone Birthdays</a></li>
              <li><a href="services.html#corporate">Corporate Events</a></li>
            </ul>
          </div>

          <!-- Col 4: Get in Touch -->
          <div class="footer-col footer-col-contact">
            <h3 class="footer-title">Get in Touch</h3>
            <ul class="footer-contact-list">
              <li class="footer-contact-item">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a href="tel:6383180073">+91 6383180073</a>
              </li>
              <li class="footer-contact-item">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.06c-1.49 0-2.95-.4-4.22-1.16l-.3-.18-3.13.82.84-3.05-.2-.31a8.13 8.13 0 01-1.25-4.27c0-4.51 3.67-8.17 8.18-8.17 2.19 0 4.24.85 5.79 2.4a8.132 8.132 0 012.4 5.78c-.01 4.51-3.68 8.17-8.19 8.17z"/>
                </svg>
                <a href="https://wa.me/916383180073" target="_blank" rel="noopener noreferrer">WhatsApp: +91 6383180073</a>
              </li>
              <li class="footer-contact-item">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <a href="https://instagram.com/tskentertainments" target="_blank" rel="noopener noreferrer">@tskentertainments</a>
              </li>
              <li class="footer-contact-item">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Tamil Nadu, India</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Perfectly Aligned Bottom Footer -->
        <div class="footer-bottom">
          <div class="footer-copyright">
            &copy; ${currentYear} TSK Entertainments. All rights reserved.
          </div>
          <div class="footer-tag-list">
            Weddings &bull; Décor &bull; Celebrities &bull; Celebrations
          </div>
          <div class="footer-legal-links">
            <a href="privacy-policy.html">Privacy Policy</a>
            <span class="footer-legal-divider" aria-hidden="true">&bull;</span>
            <a href="terms-conditions.html">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    `;
  }

  // Floating WhatsApp Action Button
  function renderWhatsAppButton() {
    if (document.getElementById('floating-whatsapp-widget')) return;

    const whatsappAnchor = document.createElement('a');
    whatsappAnchor.id = 'floating-whatsapp-widget';
    whatsappAnchor.href = 'https://wa.me/916383180073?text=Hi%20TSK%20Entertainments,%20I%20would%20like%20to%20plan%20an%20event!';
    whatsappAnchor.target = '_blank';
    whatsappAnchor.rel = 'noopener noreferrer';
    whatsappAnchor.className = 'floating-whatsapp';
    whatsappAnchor.setAttribute('aria-label', 'Chat with TSK Entertainments on WhatsApp');

    whatsappAnchor.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    `;

    document.body.appendChild(whatsappAnchor);
  }

  // Animated Stat Counters
  function initCounters() {
    const counterElements = document.querySelectorAll('.stat-counter');
    if (!counterElements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function startCounting(el) {
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';

      if (isNaN(target)) return;

      if (prefersReducedMotion) {
        el.textContent = `${prefix}${target}${suffix}`;
        return;
      }

      const duration = 1600; // ms
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeOut * target);

        el.textContent = `${prefix}${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = `${prefix}${target}${suffix}`;
        }
      }

      requestAnimationFrame(updateCounter);
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startCounting(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      counterElements.forEach(el => observer.observe(el));
    } else {
      counterElements.forEach(el => startCounting(el));
    }
  }

  // Hero Background Video - Instant Playback & Reduced Motion Handling
  function initHeroVideo() {
    const video = document.getElementById('hero-bg-video');
    if (!video) return;

    // Respect prefers-reduced-motion: pause if requested
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    // Ensure immediate playback without browser delay
    const startPlayback = () => {
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    };

    if (video.readyState >= 2) {
      startPlayback();
    } else {
      video.addEventListener('loadeddata', startPlayback, { once: true });
      video.addEventListener('canplay', startPlayback, { once: true });
    }
  }

  // Interactive Accessible FAQ Accordion Component
  function initAccordion() {
    const accordions = document.querySelectorAll('.faq-accordion');
    if (!accordions.length) return;

    accordions.forEach(accordion => {
      const items = accordion.querySelectorAll('.faq-item');

      items.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!questionBtn || !answer) return;

        questionBtn.addEventListener('click', () => {
          const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

          // Close other open items in the same accordion for clean UX
          items.forEach(otherItem => {
            if (otherItem !== item) {
              const otherBtn = otherItem.querySelector('.faq-question');
              const otherAnswer = otherItem.querySelector('.faq-answer');
              if (otherBtn && otherAnswer) {
                otherBtn.setAttribute('aria-expanded', 'false');
                otherItem.classList.remove('active');
                otherAnswer.style.maxHeight = null;
              }
            }
          });

          // Toggle current item
          if (isExpanded) {
            questionBtn.setAttribute('aria-expanded', 'false');
            item.classList.remove('active');
            answer.style.maxHeight = null;
          } else {
            questionBtn.setAttribute('aria-expanded', 'true');
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        });
      });
    });
  }

  // ==========================================================================
  // Gallery Component (Interactive Filters & Lightbox)
  // ==========================================================================
  const GALLERY_ITEMS = [
    {
      id: 1,
      category: 'weddings',
      categoryLabel: 'Weddings',
      title: 'Sacred Muhurtham Mandap',
      caption: 'Traditional floral mandap adorned with fresh jasmine, marigolds, brass deepams, and sacred homam rituals in Chennai.',
      src: 'images/gallery-muhurtham-mandap.jpg',
      alt: 'Traditional South Indian Tamil wedding Muhurtham mandap with fresh marigold garlands and brass lamps'
    },
    {
      id: 2,
      category: 'decor',
      categoryLabel: 'Décor',
      title: 'Royal Temple Floral Arch',
      caption: 'Intricate marigold and gold zari entrance arch with hanging brass bells for grand temple-style reception in Madurai.',
      src: 'images/gallery-temple-arch.jpg',
      alt: 'Royal floral entrance arch with golden zari drapes, marigolds, and brass bells'
    },
    {
      id: 3,
      category: 'birthdays',
      categoryLabel: 'Birthdays',
      title: 'Milestone 30th Birthday Gala',
      caption: 'Bespoke milestone 30th celebration stage featuring illuminated marquee numbers, luxury organic balloon arch, neon sign, and floral pedestals.',
      src: 'images/gallery-birthday-stage.jpg',
      alt: 'Luxury 30th birthday celebration stage with giant illuminated marquee numbers, organic balloon arch, and neon sign'
    },
    {
      id: 4,
      category: 'corporate',
      categoryLabel: 'Corporate',
      title: 'Annual Leadership Gala',
      caption: 'Grand keynote stage setup with dynamic panoramic LED backdrop and tiered convention seating for tech summit in Chennai.',
      src: 'images/gallery-corporate-summit.jpg',
      alt: 'Corporate annual leadership summit convention hall with panoramic LED video stage'
    },
    {
      id: 5,
      category: 'weddings',
      categoryLabel: 'Weddings',
      title: 'Royal Reception Floral Ring',
      caption: 'Opulent reception stage featuring golden circular arch adorned with sunflowers, white roses, and ambient warm halo lighting.',
      src: 'images/service-weddings.webp',
      alt: 'Luxury wedding reception stage with circular floral arch and plush sofa'
    },
    {
      id: 6,
      category: 'decor',
      categoryLabel: 'Décor',
      title: 'Fairy Light Ambient Canopy',
      caption: 'Evening reception lawn transformed with thousands of warm ambient fairy lights, crystal chandeliers, and garden banquet seating.',
      src: 'images/what-we-do-lawn-bg.webp',
      alt: 'Evening lawn wedding reception illuminated with fairy light canopy and crystal chandelier'
    },
    {
      id: 7,
      category: 'birthdays',
      categoryLabel: 'Birthdays',
      title: 'Whimsical Luxury Birthday Bash',
      caption: 'Festive luxury celebration banquet with floating metallic balloons, crystal chandeliers, and floral runner garland.',
      src: 'images/service-birthdays.jpg',
      alt: 'Luxury celebration banquet setup with balloons and floral garland'
    },
    {
      id: 8,
      category: 'corporate',
      categoryLabel: 'Corporate',
      title: 'Product Launch & Arena Production',
      caption: 'High-production arena stage lighting, intelligent moving beam truss, and massive multi-panel LED screens.',
      src: 'images/service-celebrity.webp',
      alt: 'Grand arena stage with LED video walls and concert intelligent lighting beams'
    },
    {
      id: 9,
      category: 'weddings',
      categoryLabel: 'Weddings',
      title: 'Sunset Beachside Mandap',
      caption: 'Bespoke coastal floral gazebo adorned with pastel roses and orchids overlooking the sea along ECR Chennai.',
      src: 'images/gallery-coastal-wedding.png',
      alt: 'Coastal beachside wedding mandap with floral arch and sea view'
    },
    {
      id: 10,
      category: 'decor',
      categoryLabel: 'Décor',
      title: 'Luxe Floral Arch & Candle Décor',
      caption: 'Sculptural golden arches adorned with cascading red roses, ambient candle wall, and opulent lounge seating.',
      src: 'images/gallery-luxe-stage.jpg',
      alt: 'Luxury wedding stage décor featuring crimson rose arches, candle wall, and curved sofa'
    },
    {
      id: 11,
      category: 'birthdays',
      categoryLabel: 'Birthdays',
      title: 'Grand Ballroom Family Milestone',
      caption: 'Five-star ballroom celebration with monumental crystal chandeliers, towering floral centerpieces, and banquet tables.',
      src: 'images/gallery-ballroom-milestone.jpg',
      alt: 'Grand luxury ballroom banquet with crystal chandeliers and high floral centerpieces'
    },
    {
      id: 12,
      category: 'corporate',
      categoryLabel: 'Corporate',
      title: 'Executive Awards Gala Night',
      caption: 'Black-tie gala evening featuring VIP round banquet tables, bespoke centerpieces, and keynote presentation stage.',
      src: 'images/gallery-awards-gala.jpg',
      alt: 'Executive corporate awards evening with elegant VIP round table dinner setup'
    }
  ];

  function initGallery() {
    const gridEl = document.getElementById('gallery-grid');
    if (!gridEl) return;

    let currentFilter = 'all';
    let visibleItems = [...GALLERY_ITEMS];
    let currentLightboxIndex = 0;

    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxBadge = document.getElementById('lightbox-badge');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const btnClose = document.getElementById('lightbox-close');
    const btnPrev = document.getElementById('lightbox-prev');
    const btnNext = document.getElementById('lightbox-next');

    // Render gallery items into grid
    function renderGallery(filter = 'all') {
      currentFilter = filter;
      visibleItems = filter === 'all'
        ? [...GALLERY_ITEMS]
        : GALLERY_ITEMS.filter(item => item.category === filter);

      gridEl.innerHTML = visibleItems.map((item, index) => `
        <article class="gallery-card" data-category="${item.category}" tabindex="0" role="button" aria-label="View ${item.title}">
          <div class="gallery-card-inner">
            <img src="${item.src}" alt="${item.alt}" class="gallery-img" loading="lazy" width="400" height="300">
            <div class="gallery-card-overlay">
              <span class="badge badge-primary gallery-badge">${item.categoryLabel}</span>
              <h3 class="gallery-card-title">${item.title}</h3>
              <span class="gallery-zoom-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/></svg>
              </span>
            </div>
          </div>
        </article>
      `).join('');

      // Add click & keyboard listeners to each card
      const cards = gridEl.querySelectorAll('.gallery-card');
      cards.forEach((card, index) => {
        card.addEventListener('click', () => openLightbox(index));
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(index);
          }
        });
      });
    }

    // Filter button behavior
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter') || 'all';

        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });

        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        renderGallery(filter);
      });
    });

    // Lightbox Controls
    function openLightbox(index) {
      if (!lightbox || !visibleItems[index]) return;
      currentLightboxIndex = index;
      updateLightboxContent();

      if (typeof lightbox.showModal === 'function') {
        lightbox.showModal();
      } else {
        lightbox.setAttribute('open', '');
      }
    }

    function closeLightbox() {
      if (!lightbox) return;
      if (typeof lightbox.close === 'function') {
        lightbox.close();
      } else {
        lightbox.removeAttribute('open');
      }
    }

    function updateLightboxContent() {
      const item = visibleItems[currentLightboxIndex];
      if (!item) return;

      if (lightboxImg) {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
      }
      if (lightboxTitle) lightboxTitle.textContent = item.title;
      if (lightboxCaption) lightboxCaption.textContent = item.caption;
      if (lightboxBadge) lightboxBadge.textContent = item.categoryLabel;
      if (lightboxCounter) {
        lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${visibleItems.length}`;
      }
    }

    function showNext() {
      currentLightboxIndex = (currentLightboxIndex + 1) % visibleItems.length;
      updateLightboxContent();
    }

    function showPrev() {
      currentLightboxIndex = (currentLightboxIndex - 1 + visibleItems.length) % visibleItems.length;
      updateLightboxContent();
    }

    if (btnClose) btnClose.addEventListener('click', closeLightbox);
    if (btnNext) btnNext.addEventListener('click', showNext);
    if (btnPrev) btnPrev.addEventListener('click', showPrev);

    // Keyboard navigation: Escape, ArrowLeft, ArrowRight
    window.addEventListener('keydown', (e) => {
      if (!lightbox || !lightbox.open) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        showNext();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      }
    });

    // Light-dismiss fallback for browsers without native closedby support
    if (lightbox && !('closedBy' in HTMLDialogElement.prototype)) {
      lightbox.addEventListener('click', (event) => {
        if (event.target !== lightbox) return;
        const rect = lightbox.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (!isDialogContent) {
          closeLightbox();
        }
      });
    }

    // Initial render
    renderGallery('all');
  }

  // ==========================================================================
  // Celebrity & Artist Management Component
  // ==========================================================================
  const ARTISTS_DATA = [
    {
      id: 'singer-1',
      name: 'Ananya Ramachandran',
      category: 'singers',
      categoryLabel: 'Playback Singer',
      specialty: 'Kollywood Tamil hit melodies, classical fusion & energetic live orchestra performances.',
      image: 'images/team-soundarya.svg',
      experience: '150+ Live Shows',
      popularSongs: 'Tamil Cinema Melodies & Carnatic Fusion'
    },
    {
      id: 'singer-2',
      name: 'Karthik Narayanan & The Band',
      category: 'singers',
      categoryLabel: 'Live Band Lead',
      specialty: 'High-energy Tamil retro-to-contemporary unplugged band for Sangeets and cocktail receptions.',
      image: 'images/team-karthik.svg',
      experience: '200+ Weddings',
      popularSongs: 'Ilaiyaraaja & AR Rahman Tributes'
    },
    {
      id: 'anchor-1',
      name: 'Deepa Vasanth',
      category: 'anchors',
      categoryLabel: 'Celebrity Emcee',
      specialty: 'Bilingual television anchor known for witty stage presence, family games, and celebrity interviews.',
      image: 'images/team-soundarya.svg',
      experience: 'Television & Mega Events',
      popularSongs: 'Tamil & English Hosting'
    },
    {
      id: 'anchor-2',
      name: 'Vijay Prasanna',
      category: 'anchors',
      categoryLabel: 'Live Stage Host',
      specialty: 'Electrifying interactive crowd host specializing in Sangeet battles, corporate award nights, and galas.',
      image: 'images/team-vignesh.svg',
      experience: '10+ Years Hosting',
      popularSongs: 'Crowd Interaction Specialist'
    },
    {
      id: 'dj-1',
      name: 'DJ Arjun (Chennai Beats)',
      category: 'djs',
      categoryLabel: 'Wedding & Club DJ',
      specialty: 'South Indian Kuthu, Bollywood dance tracks, and commercial international EDM visual sets.',
      image: 'images/team-vignesh.svg',
      experience: 'Resident Club & Luxury Weddings',
      popularSongs: 'Tamil Kuthu & Commercial EDM'
    },
    {
      id: 'dj-2',
      name: 'DJ Shravan & Dhol Fusion',
      category: 'djs',
      categoryLabel: 'Percussion & DJ',
      specialty: 'Live Punjabi Dhol meets Chennai Tamil beats with synchronized intelligent laser effects.',
      image: 'images/team-karthik.svg',
      experience: 'Destination Weddings',
      popularSongs: 'Live Percussion & Electronic'
    },
    {
      id: 'dancer-1',
      name: 'Madras Dance Company',
      category: 'dancers',
      categoryLabel: 'Choreography Troupe',
      specialty: 'High-octane 12-member Kollywood theatrical dance troupe with synchronized LED costumes.',
      image: 'images/service-birthday.svg',
      experience: 'Film Award Nights',
      popularSongs: 'Kollywood Medley & Thematic Acts'
    },
    {
      id: 'dancer-2',
      name: 'Kalaalaya Folk & Classical',
      category: 'dancers',
      categoryLabel: 'Traditional Ensemble',
      specialty: 'Authentic Tamil Nadu cultural welcome: Karagattam, Mayilattam, and grand bridal entry procession.',
      image: 'images/hero-wedding.svg',
      experience: 'Heritage Celebrations',
      popularSongs: 'Traditional Welcome Processions'
    }
  ];

  function initArtists() {
    const gridEl = document.getElementById('artists-grid');
    if (!gridEl) return;

    let currentCategory = 'all';
    let visibleArtists = [...ARTISTS_DATA];

    const tabBtns = document.querySelectorAll('.artist-tab-btn');
    const modal = document.getElementById('booking-modal');
    const modalClose = document.getElementById('booking-modal-close');
    const form = document.getElementById('booking-modal-form');
    const artistNameInput = document.getElementById('booking-artist-name');
    const artistHeading = document.getElementById('booking-artist-heading');
    const artistSub = document.getElementById('booking-artist-sub');
    const artistAvatar = document.getElementById('booking-artist-avatar');

    // Render artists into grid
    function renderArtists(category = 'all') {
      currentCategory = category;
      visibleArtists = category === 'all'
        ? [...ARTISTS_DATA]
        : ARTISTS_DATA.filter(artist => artist.category === category);

      gridEl.innerHTML = visibleArtists.map(artist => `
        <article class="artist-card" data-category="${artist.category}" id="card-${artist.id}">
          <div class="artist-photo-frame">
            <img src="${artist.image}" alt="${artist.name} - ${artist.categoryLabel}" class="artist-img" loading="lazy" width="300" height="300">
            <span class="badge badge-primary artist-category-badge">${artist.categoryLabel}</span>
          </div>
          <div class="artist-info">
            <h3 class="artist-name">${artist.name}</h3>
            <p class="artist-specialty">${artist.specialty}</p>
            <div class="artist-meta-tags">
              <span class="artist-tag">${artist.experience}</span>
              <span class="artist-tag">${artist.popularSongs}</span>
            </div>
            <button type="button" class="btn btn-primary artist-request-btn" data-artist-id="${artist.id}" data-artist-name="${artist.name}" data-artist-category="${artist.categoryLabel}" data-artist-image="${artist.image}">
              <span>Request Booking</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 16px; height: 16px; fill: currentColor;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </article>
      `).join('');

      // Attach booking buttons
      const requestBtns = gridEl.querySelectorAll('.artist-request-btn');
      requestBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const artistName = btn.getAttribute('data-artist-name');
          const artistCategory = btn.getAttribute('data-artist-category');
          const artistImg = btn.getAttribute('data-artist-image');
          openBookingModal(artistName, artistCategory, artistImg);
        });
      });
    }

    // Category Tabs click behavior
    tabBtns.forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.getAttribute('data-category') || 'all';

        tabBtns.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-pressed', 'false');
        });

        tab.classList.add('active');
        tab.setAttribute('aria-pressed', 'true');
        renderArtists(cat);
      });
    });

    // Open Booking Modal
    function openBookingModal(name, category, img) {
      if (!modal) return;
      if (artistNameInput) artistNameInput.value = name;
      if (artistHeading) artistHeading.textContent = `Request Booking: ${name}`;
      if (artistSub) artistSub.textContent = `Category: ${category} • Dedicated Talent Liaison`;
      if (artistAvatar && img) artistAvatar.src = img;

      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
    }

    // Close Booking Modal
    function closeBookingModal() {
      if (!modal) return;
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    }

    if (modalClose) modalClose.addEventListener('click', closeBookingModal);

    // Escape Key & Light-dismiss
    window.addEventListener('keydown', (e) => {
      if (modal && modal.open && e.key === 'Escape') {
        closeBookingModal();
      }
    });

    if (modal && !('closedBy' in HTMLDialogElement.prototype)) {
      modal.addEventListener('click', (event) => {
        if (event.target !== modal) return;
        const rect = modal.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (!isDialogContent) {
          closeBookingModal();
        }
      });
    }

    // Form submission -> WhatsApp Pre-filled message generator
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const artist = artistNameInput ? artistNameInput.value : 'Artist';
        const clientName = form.querySelector('[name="client_name"]')?.value.trim() || 'Client';
        const clientPhone = form.querySelector('[name="client_phone"]')?.value.trim() || '';
        const eventDate = form.querySelector('[name="event_date"]')?.value || 'Not specified';
        const eventType = form.querySelector('[name="event_type"]')?.value || 'Event';
        const message = form.querySelector('[name="message"]')?.value.trim() || 'Please check availability and rider details.';

        const whatsappText = `Hi TSK Entertainments, I would like to request a booking for *${artist}*:\n\n` +
          `• *Name:* ${clientName}\n` +
          `• *Phone:* ${clientPhone}\n` +
          `• *Event Date:* ${eventDate}\n` +
          `• *Event Type:* ${eventType}\n` +
          `• *Notes/City:* ${message}\n\n` +
          `Please provide availability, fee quote, and technical rider information.`;

        const waUrl = `https://wa.me/916383180073?text=${encodeURIComponent(whatsappText)}`;

        // Open WhatsApp in new tab
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        closeBookingModal();
        form.reset();
      });
    }

    // Initial render
    renderArtists('all');
  }

  // ==========================================================================
  // Contact & Inquiries Booking Form Component
  // ==========================================================================
  function initContactForm() {
    const form = document.getElementById('contact-booking-form');
    if (!form) return;

    const statusBanner = document.getElementById('contact-form-status');
    const nameInput = form.querySelector('[name="client_name"]');
    const phoneInput = form.querySelector('[name="client_phone"]');
    const eventTypeSelect = form.querySelector('[name="event_type"]');
    const eventDateInput = form.querySelector('[name="event_date"]');
    const approxGuestsInput = form.querySelector('[name="approx_guests"]');
    const venueCityInput = form.querySelector('[name="venue_city"]');
    const messageInput = form.querySelector('[name="message"]');

    // Parse URL Search Parameters for pre-selection
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const serviceParam = urlParams.get('service');
      const packageParam = urlParams.get('package');
      const typeParam = urlParams.get('type');
      const artistParam = urlParams.get('artist');

      if (eventTypeSelect) {
        if (serviceParam) {
          const map = {
            'weddings': 'Wedding',
            'decor': 'Wedding',
            'birthdays': 'Birthday',
            'corporate': 'Corporate event',
            'celebrity': 'Celebrity booking',
            'solutions': 'Other'
          };
          if (map[serviceParam.toLowerCase()]) {
            eventTypeSelect.value = map[serviceParam.toLowerCase()];
          }
        } else if (typeParam) {
          eventTypeSelect.value = typeParam;
        } else if (artistParam) {
          eventTypeSelect.value = 'Celebrity booking';
          if (messageInput && !messageInput.value) {
            messageInput.value = `Interested in booking artist: ${artistParam}.`;
          }
        }

        if (packageParam) {
          eventTypeSelect.value = 'Wedding';
          const pkgFormatted = packageParam.charAt(0).toUpperCase() + packageParam.slice(1);
          if (messageInput && !messageInput.value) {
            messageInput.value = `Hi TSK team, I am interested in your ${pkgFormatted} Package for our upcoming celebration.`;
          }
        }
      }
    } catch (err) {
      console.warn('URL params parsing failed:', err);
    }

    // Set minimum date to today so past dates cannot be picked
    if (eventDateInput) {
      const today = new Date().toISOString().split('T')[0];
      eventDateInput.min = today;
    }

    // Field-level validator helper
    function validateField(input) {
      if (!input) return true;
      const group = input.closest('.form-group');
      let isValid = true;

      if (input.required && !input.value.trim()) {
        isValid = false;
      } else if (input.type === 'tel' && input.value.trim()) {
        const digits = input.value.replace(/\D/g, '');
        if (digits.length < 10) {
          isValid = false;
        }
      }

      if (!isValid) {
        input.setAttribute('aria-invalid', 'true');
        if (group) group.classList.add('has-error');
      } else {
        input.removeAttribute('aria-invalid');
        if (group) group.classList.remove('has-error');
      }

      return isValid;
    }

    // Attach blur and input event handlers to fields for interactive feedback
    [nameInput, phoneInput, eventTypeSelect, eventDateInput, venueCityInput].forEach(field => {
      if (!field) return;
      field.addEventListener('blur', () => {
        if (field.value.trim() || field.getAttribute('aria-invalid') === 'true') {
          validateField(field);
        }
      });
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') {
          validateField(field);
        }
      });
      if (field.tagName === 'SELECT') {
        field.addEventListener('change', () => validateField(field));
      }
    });

    // Form Submit Handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      let firstInvalid = null;

      [nameInput, phoneInput, eventTypeSelect, eventDateInput, venueCityInput].forEach(field => {
        if (field && !validateField(field)) {
          isFormValid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (!isFormValid) {
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // Collect data
      const name = nameInput ? nameInput.value.trim() : 'Guest';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const eventType = eventTypeSelect ? eventTypeSelect.value : 'Celebration';
      const eventDate = eventDateInput ? eventDateInput.value : 'To be finalized';
      const guests = (approxGuestsInput && approxGuestsInput.value.trim()) ? approxGuestsInput.value.trim() + ' guests' : 'Flexible / TBD';
      const venue = venueCityInput ? venueCityInput.value.trim() : 'Tamil Nadu';
      const message = (messageInput && messageInput.value.trim()) ? messageInput.value.trim() : 'Looking forward to hearing about packages, decor concepts, and date availability.';

      // Compose WhatsApp text
      const waText = `Hi TSK Entertainments, I would like to plan an event:\n\n` +
        `• *Name:* ${name}\n` +
        `• *Phone:* ${phone}\n` +
        `• *Event Type:* ${eventType}\n` +
        `• *Event Date:* ${eventDate}\n` +
        `• *Approx. Guests:* ${guests}\n` +
        `• *Venue / City:* ${venue}\n` +
        `• *Notes & Requirements:* ${message}\n\n` +
        `Please check availability and guide us with custom packages & next steps!`;

      const waUrl = `https://wa.me/916383180073?text=${encodeURIComponent(waText)}`;

      // Show success message on page
      if (statusBanner) {
        statusBanner.className = 'contact-form-status status-success';
        statusBanner.innerHTML = `
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          <div>
            <strong>Inquiry Prepared & WhatsApp Launched!</strong>
            <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem;">We've transferred your details to WhatsApp (+91 6383180073). If the chat did not open automatically, <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="color: #125e34; font-weight: 700; text-decoration: underline;">click here to send directly</a>.</p>
          </div>
        `;
        statusBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Launch WhatsApp in new window/tab
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // ==========================================================================
  // Plan My Event Interactive Planner Component
  // ==========================================================================
  function initEventPlanner() {
    const form = document.getElementById('event-planner-form');
    if (!form) return;

    // Elements
    const eventTypeInputs = form.querySelectorAll('input[name="planner_event_type"]');
    const guestInputs = form.querySelectorAll('input[name="planner_guests"]');
    const packageInputs = form.querySelectorAll('input[name="planner_package"]');
    const addonInputs = form.querySelectorAll('input[name="planner_addons"]');
    const dateInput = form.querySelector('[name="planner_date"]');
    const cityInput = form.querySelector('[name="planner_city"]');
    const nameInput = form.querySelector('[name="planner_name"]');
    const phoneInput = form.querySelector('[name="planner_phone"]');
    const notesInput = form.querySelector('[name="planner_notes"]');
    const statusBanner = document.getElementById('planner-form-status');

    // Live Summary Display Elements
    const sumType = document.getElementById('sum-event-type');
    const sumGuests = document.getElementById('sum-guests');
    const sumPackage = document.getElementById('sum-package');
    const sumDateCity = document.getElementById('sum-date-city');
    const sumAddonsContainer = document.getElementById('sum-addons-chips');

    // Parse URL Search Parameters (e.g., ?service=..., ?package=..., ?type=...)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const serviceParam = urlParams.get('service');
      const packageParam = urlParams.get('package');
      const typeParam = urlParams.get('type');

      if (serviceParam) {
        const sMap = {
          'weddings': 'Wedding',
          'decor': 'Theme Décor Only',
          'birthdays': 'Birthday / Anniversary',
          'corporate': 'Corporate Event',
          'celebrity': 'Celebrity Night',
          'solutions': 'Other'
        };
        const targetType = sMap[serviceParam.toLowerCase()];
        if (targetType) {
          const matchedRadio = form.querySelector(`input[name="planner_event_type"][value="${targetType}"]`);
          if (matchedRadio) matchedRadio.checked = true;
        }
      } else if (typeParam) {
        const matchedRadio = form.querySelector(`input[name="planner_event_type"][value="${typeParam}"]`);
        if (matchedRadio) matchedRadio.checked = true;
      }

      if (packageParam) {
        const pMap = {
          'silver': 'Silver Package',
          'gold': 'Gold Package (★ Most Popular)',
          'platinum': 'Platinum Luxury',
          'custom': 'Bespoke Custom'
        };
        const targetPkg = pMap[packageParam.toLowerCase()];
        if (targetPkg) {
          const matchedPkg = form.querySelector(`input[name="planner_package"][value="${targetPkg}"]`);
          if (matchedPkg) matchedPkg.checked = true;
        }
      }
    } catch (err) {
      console.warn('Planner URL param parse warning:', err);
    }

    // Set min date to today
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }

    // Helper to refresh live summary
    function updatePlannerSummary() {
      const selectedType = form.querySelector('input[name="planner_event_type"]:checked')?.value || 'Wedding';
      const selectedGuests = form.querySelector('input[name="planner_guests"]:checked')?.value || '150–400 (Grand)';
      const selectedPkg = form.querySelector('input[name="planner_package"]:checked')?.value || 'Gold Package (★ Most Popular)';
      const dateVal = dateInput?.value || 'Date: To Be Finalized';
      const cityVal = cityInput?.value.trim() || 'Tamil Nadu';

      const checkedAddons = [];
      addonInputs.forEach(add => {
        if (add.checked) checkedAddons.push(add.value);
      });

      if (sumType) sumType.textContent = selectedType;
      if (sumGuests) sumGuests.textContent = selectedGuests;
      if (sumPackage) sumPackage.textContent = selectedPkg;
      if (sumDateCity) sumDateCity.textContent = `${cityVal} • ${dateVal}`;

      if (sumAddonsContainer) {
        if (checkedAddons.length === 0) {
          sumAddonsContainer.innerHTML = '<span class="summary-addon-tag" style="opacity: 0.6;">Standard package inclusions</span>';
        } else {
          sumAddonsContainer.innerHTML = checkedAddons.map(item => `
            <span class="summary-addon-tag">+ ${item}</span>
          `).join('');
        }
      }
    }

    // Attach listeners for live summary updates
    eventTypeInputs.forEach(i => i.addEventListener('change', updatePlannerSummary));
    guestInputs.forEach(i => i.addEventListener('change', updatePlannerSummary));
    packageInputs.forEach(i => i.addEventListener('change', updatePlannerSummary));
    addonInputs.forEach(i => i.addEventListener('change', updatePlannerSummary));
    if (dateInput) dateInput.addEventListener('input', updatePlannerSummary);
    if (cityInput) cityInput.addEventListener('input', updatePlannerSummary);

    // Initial sync
    updatePlannerSummary();

    // Validation helper
    function validateField(input) {
      if (!input) return true;
      const group = input.closest('.form-group');
      let isValid = true;

      if (input.required && !input.value.trim()) {
        isValid = false;
      } else if (input.type === 'tel' && input.value.trim()) {
        const digits = input.value.replace(/\D/g, '');
        if (digits.length < 10) {
          isValid = false;
        }
      }

      if (!isValid) {
        input.setAttribute('aria-invalid', 'true');
        if (group) group.classList.add('has-error');
      } else {
        input.removeAttribute('aria-invalid');
        if (group) group.classList.remove('has-error');
      }

      return isValid;
    }

    // Attach real-time validation listeners
    [dateInput, cityInput, nameInput, phoneInput].forEach(field => {
      if (!field) return;
      field.addEventListener('blur', () => {
        if (field.value.trim() || field.getAttribute('aria-invalid') === 'true') {
          validateField(field);
        }
      });
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') {
          validateField(field);
        }
      });
    });

    // Multi-Step Wizard Controller
    let currentStep = 1;
    const totalSteps = 4;
    const stepCards = form.querySelectorAll('.planner-step-card');
    const stepperSteps = document.querySelectorAll('.stepper-step');
    const stepperLines = document.querySelectorAll('.stepper-line');
    const progressBar = document.getElementById('stepper-progress-bar');

    function goToStep(stepNumber) {
      if (stepNumber < 1 || stepNumber > totalSteps) return false;

      // When advancing from Step 1, validate required Step 1 fields
      if (currentStep === 1 && stepNumber > 1) {
        let step1Valid = true;
        let firstInvalid = null;
        [dateInput, cityInput].forEach(field => {
          if (field && !validateField(field)) {
            step1Valid = false;
            if (!firstInvalid) firstInvalid = field;
          }
        });
        if (!step1Valid) {
          if (firstInvalid) firstInvalid.focus();
          return false;
        }
      }

      currentStep = stepNumber;

      // Update active card
      stepCards.forEach(card => {
        const cardStep = parseInt(card.getAttribute('data-step'), 10);
        if (cardStep === currentStep) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });

      // Update stepper header buttons & connecting lines
      stepperSteps.forEach(btn => {
        const btnStep = parseInt(btn.getAttribute('data-step-target'), 10);
        btn.classList.remove('active', 'completed');
        btn.removeAttribute('aria-current');

        if (btnStep === currentStep) {
          btn.classList.add('active');
          btn.setAttribute('aria-current', 'step');
        } else if (btnStep < currentStep) {
          btn.classList.add('completed');
        }
      });

      stepperLines.forEach((line, index) => {
        if (index < currentStep - 1) {
          line.classList.add('completed');
        } else {
          line.classList.remove('completed');
        }
      });

      // Update progress bar
      if (progressBar) {
        const percent = (currentStep / totalSteps) * 100;
        progressBar.style.width = `${percent}%`;
      }

      // Smooth scroll to top of planner card if scrolled down
      const formCard = form.querySelector(`.planner-step-card[data-step="${currentStep}"]`);
      if (formCard) {
        const cardRect = formCard.getBoundingClientRect();
        if (cardRect.top < 80 || cardRect.top > window.innerHeight) {
          const targetY = window.pageYOffset + cardRect.top - 100;
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }

      // On mobile screens (< 992px), auto-expand summary on Step 4 for final client review
      const summaryCard = document.getElementById('planner-summary-card');
      const summaryToggleBtn = document.getElementById('summary-toggle-btn');
      const summaryToggleLabel = document.getElementById('summary-toggle-label');
      if (summaryCard && window.innerWidth < 992) {
        if (currentStep === 4) {
          summaryCard.classList.add('is-open');
          if (summaryToggleBtn) summaryToggleBtn.setAttribute('aria-expanded', 'true');
          if (summaryToggleLabel) summaryToggleLabel.textContent = 'Hide Summary';
        }
      }

      return true;
    }

    // Mobile Summary Drawer Toggle
    const summaryCard = document.getElementById('planner-summary-card');
    const summaryToggleBtn = document.getElementById('summary-toggle-btn');
    const summaryToggleLabel = document.getElementById('summary-toggle-label');
    if (summaryToggleBtn && summaryCard) {
      summaryToggleBtn.addEventListener('click', () => {
        const isOpen = summaryCard.classList.toggle('is-open');
        summaryToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (summaryToggleLabel) {
          summaryToggleLabel.textContent = isOpen ? 'Hide Summary' : 'View Summary';
        }
      });
    }

    // Attach step navigation handlers
    form.querySelectorAll('.btn-next-step').forEach(btn => {
      btn.addEventListener('click', () => {
        const nextStep = parseInt(btn.getAttribute('data-next'), 10);
        goToStep(nextStep);
      });
    });

    form.querySelectorAll('.btn-prev-step').forEach(btn => {
      btn.addEventListener('click', () => {
        const prevStep = parseInt(btn.getAttribute('data-prev'), 10);
        goToStep(prevStep);
      });
    });

    stepperSteps.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetStep = parseInt(btn.getAttribute('data-step-target'), 10);
        goToStep(targetStep);
      });
    });

    // Enter key handling on input fields: advance smoothly rather than submit
    [dateInput, cityInput].forEach(field => {
      if (!field) return;
      field.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          goToStep(2);
        }
      });
    });

    // Form submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      let firstInvalid = null;

      // Validate Step 1 fields
      [dateInput, cityInput].forEach(field => {
        if (field && !validateField(field)) {
          isFormValid = false;
          if (!firstInvalid) firstInvalid = field;
          goToStep(1);
        }
      });

      // Validate Step 4 fields
      [nameInput, phoneInput].forEach(field => {
        if (field && !validateField(field)) {
          isFormValid = false;
          if (!firstInvalid) firstInvalid = field;
          if (isFormValid) goToStep(4);
        }
      });

      if (!isFormValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const selectedType = form.querySelector('input[name="planner_event_type"]:checked')?.value || 'Wedding';
      const selectedGuests = form.querySelector('input[name="planner_guests"]:checked')?.value || '150–400';
      const selectedPkg = form.querySelector('input[name="planner_package"]:checked')?.value || 'Gold Package';
      const dateVal = dateInput?.value || 'Tentative date';
      const cityVal = cityInput?.value.trim() || 'Tamil Nadu';
      const nameVal = nameInput?.value.trim() || 'Client';
      const phoneVal = phoneInput?.value.trim() || '';
      const notesVal = notesInput?.value.trim() || 'Looking forward to hearing recommendations & availability!';

      const checkedAddons = [];
      addonInputs.forEach(add => {
        if (add.checked) checkedAddons.push(add.value);
      });
      const addonsText = checkedAddons.length > 0
        ? checkedAddons.map(a => `  • ${a}`).join('\n')
        : '  • Standard package inclusions';

      const waText = `Hi TSK Entertainments, I have customized my event plan on your website:\n\n` +
        `✨ *Event Type:* ${selectedType}\n` +
        `👑 *Package Tier:* ${selectedPkg}\n` +
        `👥 *Guest Scale:* ${selectedGuests}\n` +
        `📅 *Date:* ${dateVal}\n` +
        `📍 *Venue / City:* ${cityVal}\n\n` +
        `🎁 *Add-ons & Inclusions:*\n${addonsText}\n\n` +
        `👤 *Client Name:* ${nameVal}\n` +
        `📞 *Phone Number:* ${phoneVal}\n` +
        `📝 *Notes / Muhurtham Vision:* ${notesVal}\n\n` +
        `Please provide date availability and a tailored quotation!`;

      const waUrl = `https://wa.me/916383180073?text=${encodeURIComponent(waText)}`;

      if (statusBanner) {
        statusBanner.className = 'contact-form-status status-success';
        statusBanner.innerHTML = `
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          <div>
            <strong>Custom Event Plan Prepared & WhatsApp Launched!</strong>
            <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem;">We've transferred your choices to WhatsApp (+91 6383180073). If WhatsApp did not open automatically, <a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="color: #125e34; font-weight: 700; text-decoration: underline;">click here to send your plan</a>.</p>
          </div>
        `;
        statusBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // ==========================================================================
  // Service Details Spotlight Modal (Services & Packages Page)
  // ==========================================================================
  const SERVICES_DATA = {
    weddings: {
      id: 'weddings',
      tag: 'Weddings',
      title: 'Weddings & Muhurtham Planning',
      image: 'images/service-weddings.webp',
      imageAlt: 'Luxury Wedding Reception Stage with Floral Arch and Ambient Lighting',
      desc: 'From sacred early-morning muhurthams to grand evening receptions, we plan and coordinate every aspect of your wedding with deep cultural reverence. Our experienced team manages pandhakkal rituals, bridal entries, guest hospitality, catering logistics, and vendor schedules so your family stays stress-free across Chennai, Madurai, Coimbatore, and all of Tamil Nadu.',
      inclusions: [
        'End-to-end Muhurtham timeline orchestration & Vedic ritual guidance',
        'Royal bridal & groom entries, varmala concepts & nadaswaram coordination',
        'Dedicated guest hospitality desk, room allocations & transport logistics',
        'Dedicated senior on-ground stage manager & family liaison'
      ],
      ctaHref: 'plan-my-event.html?service=weddings',
      ctaText: 'Plan My Wedding with TSK →'
    },
    decor: {
      id: 'decor',
      tag: 'Décor',
      title: 'Stage & Floral Décor',
      image: 'images/service-decor.webp',
      imageAlt: 'Grand Red and White Floral Canopy Walkway Entrance',
      desc: 'Transform your venue into an enchanting visual spectacle with our bespoke floral architecture and creative stage concepts. Whether you envision a classic Chettinad heritage mandap adorned with fresh malli poo and marigolds, or a contemporary glamorous crystal reception, our designers bring your vision to life.',
      inclusions: [
        'Bespoke 3D mandap concepts & thematic moodboard curation',
        'Fresh exotic floral arrangements, traditional garlands & temple motifs',
        'Atmospheric stage wash, ambient uplighting & fairy light canopies',
        'Customized selfie booths, grand entrance arches & aisle styling'
      ],
      ctaHref: 'plan-my-event.html?service=decor',
      ctaText: 'Design My Décor with TSK →'
    },
    birthdays: {
      id: 'birthdays',
      tag: 'Birthdays',
      title: 'Birthdays & Milestone Celebrations',
      image: 'images/service-birthdays.jpg',
      imageAlt: 'Luxury birthday and milestone celebration banquet with floating metallic balloons, crystal chandeliers, floral runner garland, and ambient candles',
      imageStyle: 'object-position: center 38%;',
      desc: 'Celebrate life\'s precious milestones with joyful, vibrant party planning tailored for every generation. From whimsical 1st birthday theme wonderlands to sacred Sashti Apthapoorthi (60th) and Sadhabishegam (80th) family gatherings, we coordinate thematic setups, entertainers, cake tables, and catering.',
      inclusions: [
        'Customized theme styling (Fairytale, Superheroes, Vintage, Traditional)',
        'Milestone ceremony rituals (Sashti Apthapoorthi & Sadhabishegam flow)',
        'Interactive entertainment: magicians, balloon artists, caricatures & games',
        'Designer cake table backdrop, photo zones & return gift arrangements'
      ],
      ctaHref: 'plan-my-event.html?service=birthdays',
      ctaText: 'Plan a Birthday Bash with TSK →'
    },
    corporate: {
      id: 'corporate',
      tag: 'Corporate',
      title: 'Corporate Events & Annual Meets',
      image: 'images/service-corporate-stage.png',
      imageAlt: 'Professional corporate summit stage with high-definition LED video wall and emcee',
      imageStyle: 'object-position: center 20%;',
      desc: 'Deliver powerful brand experiences and flawless corporate gatherings with our end-to-end event management. We organize annual day galas, dealer conferences, product launches, leadership summits, and award ceremonies with seamless technical precision and VIP hospitality.',
      inclusions: [
        'High-definition curved LED video walls & dynamic stage set production',
        'Pro acoustic line arrays, collar mics & presentation video switching',
        'Professional bilingual emcees, corporate anchors & keynote flow',
        'Delegate badge registration desks, executive lounge & banqueting'
      ],
      ctaHref: 'plan-my-event.html?service=corporate',
      ctaText: 'Plan Corporate Event with TSK →'
    },
    celebrity: {
      id: 'celebrity',
      tag: 'Celebrity',
      title: 'Celebrity & Artist Management',
      image: 'images/service-celebrity.webp',
      imageAlt: 'Kollywood celebrity management, playback singers, and concert entertainment stage',
      desc: 'Elevate your celebration with star presence. We handle direct bookings for leading Kollywood stars, playback singers, comedy icons, dance troupes, and celebrity anchors with complete contract transparency, security riders, and green-room protocol.',
      inclusions: [
        'Direct Kollywood film star & celebrity guest appearances',
        'Renowned Tamil playback singers, live bands & instrumental fusion',
        'Charismatic celebrity anchors, stand-up comedians & dance troupes',
        'Complete VIP protocol: bouncer security, luxury transport & green room hospitality'
      ],
      ctaHref: 'plan-my-event.html?service=celebrity',
      ctaText: 'Book Celebrity / Artists with TSK →'
    },
    solutions: {
      id: 'solutions',
      tag: 'Turnkey',
      title: 'All Event Solutions & Turnkey Production',
      image: 'images/service-event-coordination.jpg',
      imageAlt: 'Dedicated on-ground event management team directing luxury banquet and wedding reception setup',
      imageStyle: 'object-position: center 25%;',
      desc: 'Experience peace of mind with our all-inclusive turnkey production services covering every moving part under one trusted umbrella. From heavy-duty truss rigging and cinematic drone videography to police permissions, fire safety licensing, and catering management across Tamil Nadu.',
      inclusions: [
        'Concert-grade acoustic sound systems, intelligent lighting & power generators',
        'Cinematic 4K multi-camera filming, drone videography & live webcasting',
        'Traditional South Indian & multi-cuisine catering and banquet supervision',
        'Venue liaison, police permissions, fire safety & licensing logistics'
      ],
      ctaHref: 'plan-my-event.html?service=solutions',
      ctaText: 'Book Turnkey Production with TSK →'
    }
  };

  function initServiceModal() {
    const serviceModal = document.getElementById('service-modal');
    if (!serviceModal) return;

    const closeBtn = document.getElementById('service-modal-close-btn');
    const imgEl = document.getElementById('modal-svc-img');
    const tagEl = document.getElementById('modal-svc-tag');
    const titleEl = document.getElementById('modal-svc-title');
    const descEl = document.getElementById('modal-svc-desc');
    const inclusionsEl = document.getElementById('modal-svc-inclusions');
    const ctaEl = document.getElementById('modal-svc-cta');

    function openServiceModal(serviceKey) {
      const data = SERVICES_DATA[serviceKey];
      if (!data) return;

      if (imgEl) {
        imgEl.src = data.image;
        imgEl.alt = data.imageAlt || data.title;
        if (data.imageStyle) {
          imgEl.setAttribute('style', data.imageStyle);
        } else {
          imgEl.removeAttribute('style');
        }
      }

      if (tagEl) tagEl.textContent = data.tag;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;

      if (inclusionsEl) {
        inclusionsEl.innerHTML = data.inclusions.map(item => `
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <span>${item}</span>
          </li>
        `).join('');
      }

      if (ctaEl) {
        ctaEl.href = data.ctaHref;
        ctaEl.textContent = data.ctaText;
      }

      if (typeof serviceModal.showModal === 'function') {
        serviceModal.showModal();
      } else {
        serviceModal.setAttribute('open', '');
      }
    }

    function closeServiceModal() {
      if (typeof serviceModal.close === 'function') {
        serviceModal.close();
      } else {
        serviceModal.removeAttribute('open');
      }
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeServiceModal);
    }

    serviceModal.addEventListener('click', (e) => {
      const inner = serviceModal.querySelector('.service-modal-inner');
      if (inner && !inner.contains(e.target)) {
        closeServiceModal();
      }
    });

    serviceModal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeServiceModal();
      }
    });

    // Wire service cards to open modal
    const serviceCards = document.querySelectorAll('.service-card[data-service]');
    serviceCards.forEach(card => {
      const sKey = card.getAttribute('data-service');
      const toggleBtn = card.querySelector('.service-details-toggle');

      if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openServiceModal(sKey);
        });
      }

      card.style.cursor = 'pointer';
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        openServiceModal(sKey);
      });
    });

    // Hash auto-open for service modal
    function checkServiceHash() {
      if (window.location.hash) {
        const hash = window.location.hash.substring(1).toLowerCase();
        if (SERVICES_DATA[hash]) {
          openServiceModal(hash);
        }
      }
    }

    checkServiceHash();
    window.addEventListener('hashchange', checkServiceHash);
  }

  // Service Cards Details Toggle (Shared across Home & Services Pages)
  function initHomeServiceCardToggles() {
    const toggleButtons = document.querySelectorAll('.service-details-toggle[aria-controls]');
    if (!toggleButtons.length) return;

    function toggleCard(btn, forceState) {
      const targetId = btn.getAttribute('aria-controls');
      if (!targetId) return;
      const detailsEl = document.getElementById(targetId);
      if (!detailsEl) return;
      const card = btn.closest('.service-card');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const shouldExpand = (typeof forceState === 'boolean') ? forceState : !isExpanded;

      if (!shouldExpand) {
        btn.setAttribute('aria-expanded', 'false');
        const label = btn.querySelector('.toggle-label');
        if (label) label.textContent = 'View details';
        detailsEl.hidden = true;
        if (card) card.classList.remove('is-expanded');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        const label = btn.querySelector('.toggle-label');
        if (label) label.textContent = 'Hide details';
        detailsEl.hidden = false;
        if (card) card.classList.add('is-expanded');
      }
    }

    toggleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleCard(btn);
      });

      const card = btn.closest('.service-card');
      if (card) {
        const topBar = card.querySelector('.service-card-top');
        if (topBar) {
          topBar.style.cursor = 'pointer';
          topBar.addEventListener('click', (e) => {
            if (e.target.closest('button') || e.target.closest('a')) return;
            toggleCard(btn);
          });
        }
      }
    });

    // Check if URL hash matches a card ID to auto-expand it (e.g. #weddings, #decor)
    function handleUrlHash() {
      if (window.location.hash) {
        const hashId = window.location.hash.substring(1).toLowerCase();
        const card = document.getElementById(hashId) || document.getElementById(`card-${hashId}`);
        if (card && card.classList.contains('service-card')) {
          const btn = card.querySelector('.service-details-toggle[aria-controls]');
          if (btn) {
            toggleCard(btn, true);
            setTimeout(() => {
              card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
          }
        }
      }
    }

    handleUrlHash();
    window.addEventListener('hashchange', handleUrlHash);
  }

  // ==========================================================================
  // Interactive 3D Gift Box Packages (Blast to Reveal)
  // ==========================================================================
  function initPackageGiftBoxes() {
    const giftBoxes = document.querySelectorAll('.package-gift-box');
    const modal = document.getElementById('package-modal');
    if (!giftBoxes.length || !modal) return;

    const closeBtn = document.getElementById('modal-close-btn');
    const rewrapBtn = document.getElementById('modal-rewrap-btn');
    const popularEl = document.getElementById('modal-pkg-popular');
    const badgeEl = document.getElementById('modal-pkg-badge');
    const nameEl = document.getElementById('modal-pkg-name');
    const descEl = document.getElementById('modal-pkg-desc');
    const priceEl = document.getElementById('modal-pkg-price');
    const featuresEl = document.getElementById('modal-pkg-features');
    const ctaEl = document.getElementById('modal-pkg-cta');

    const PACKAGES_DATA = {
      silver: {
        tier: 'silver',
        badge: 'Essential Elegance',
        isPopular: false,
        name: 'Silver Package',
        desc: 'Ideal for intimate muhurthams, traditional home ceremonies, and milestone birthdays up to 250 guests.',
        price: 'From ₹2,50,000*',
        features: [
          'Traditional floral mandap / stage backdrop (up to 20 ft)',
          'Auspicious Nadaswaram & Thavil or basic audio PA setup',
          'Stage ambient wash & welcome entrance marigold arch',
          'Dedicated on-ground coordinator on celebration day',
          'Muhurtham timing alignment & puja samagri assistance'
        ],
        ctaHref: 'plan-my-event.html?package=silver',
        ctaText: 'Select Silver Package →'
      },
      gold: {
        tier: 'gold',
        badge: 'Grand Celebration',
        isPopular: true,
        name: 'Gold Package',
        desc: 'Our signature full-service package chosen by most families for weddings and grand galas up to 600 guests.',
        price: 'From ₹5,50,000*',
        features: [
          'Royal floral mandap with fresh exotic blooms & silk drapes',
          '3D thematic moodboards & customized bridal entry concept',
          'Concert-grade acoustic sound system & intelligent stage lighting',
          'Full photography & 4K cinematic videography team',
          'Complete guest hospitality desk, rooming & transport logistics',
          'Senior event director + 3 dedicated on-ground coordinators'
        ],
        ctaHref: 'plan-my-event.html?package=gold',
        ctaText: 'Select Gold Package →'
      },
      platinum: {
        tier: 'platinum',
        badge: 'Royal Luxury',
        isPopular: false,
        name: 'Platinum Package',
        desc: 'The pinnacle of luxury and star power for lavish destination weddings and mega galas exceeding 1,000 guests.',
        price: 'From ₹11,00,000*',
        features: [
          'Bespoke architectural mandap with imported floral installations',
          'Kollywood celebrity artist appearance or live playback music band',
          'Curved high-definition LED video wall & intelligent beam lighting',
          '4K drone videography, live webcasting & luxury photo albums',
          'End-to-end VIP hospitality, bouncers & valet coordination',
          'Full production crew & dedicated senior event director'
        ],
        ctaHref: 'plan-my-event.html?package=platinum',
        ctaText: 'Select Platinum Package →'
      }
    };

    const COLOR_PALETTES = {
      silver: ['#ffffff', '#e2e8f0', '#94a3b8', '#dc2626', '#ffd700', '#cbd5e1'],
      gold: ['#ffd700', '#d4af37', '#fde68a', '#831843', '#ffffff', '#ffedd5'],
      platinum: ['#ffffff', '#e2e8f0', '#64748b', '#047857', '#38bdf8', '#ffd700']
    };

    function playBlastSound(tier) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const now = ctx.currentTime;
        const baseFreq = tier === 'platinum' ? 660 : (tier === 'gold' ? 554 : 440);
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } catch (err) {
        // Optional audio, continue gracefully
      }
    }

    function triggerBlastParticles(box, tier) {
      const layer = box.querySelector('.blast-particles-layer');
      if (!layer) return;

      layer.innerHTML = '';
      const colors = COLOR_PALETTES[tier] || COLOR_PALETTES.gold;

      const shockwave = document.createElement('div');
      shockwave.className = 'blast-shockwave';
      layer.appendChild(shockwave);

      const particleCount = 28;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'blast-confetti-particle';

        const angle = (i / particleCount) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
        const distance = 70 + Math.random() * 120;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance - 25;
        const rot = Math.floor(Math.random() * 720 - 360);
        const scale = (0.5 + Math.random() * 0.9).toFixed(2);
        const size = (6 + Math.random() * 7).toFixed(0);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isStar = i % 4 === 0;

        particle.style.setProperty('--dx', `${dx.toFixed(0)}px`);
        particle.style.setProperty('--dy', `${dy.toFixed(0)}px`);
        particle.style.setProperty('--rot', `${rot}deg`);
        particle.style.setProperty('--scale', scale);
        particle.style.setProperty('--size', `${size}px`);
        particle.style.setProperty('--bg', color);
        particle.style.setProperty('--rad', isStar ? '50%' : '3px');

        layer.appendChild(particle);
      }

      setTimeout(() => {
        layer.innerHTML = '';
      }, 700);
    }

    function openPackageModal(tier) {
      const pkg = PACKAGES_DATA[tier];
      if (!pkg) return;

      modal.className = `package-modal tier-${tier}`;

      if (popularEl) {
        popularEl.style.display = pkg.isPopular ? 'inline-flex' : 'none';
      }

      if (badgeEl) {
        badgeEl.textContent = pkg.badge;
      }

      if (nameEl) nameEl.textContent = pkg.name;
      if (descEl) descEl.textContent = pkg.desc;
      if (priceEl) priceEl.textContent = pkg.price;

      if (featuresEl) {
        featuresEl.innerHTML = pkg.features.map(f => `
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <span>${f}</span>
          </li>
        `).join('');
      }

      if (ctaEl) {
        ctaEl.href = pkg.ctaHref;
        ctaEl.textContent = pkg.ctaText;
      }

      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.setAttribute('open', '');
      }
    }

    function closePackageModal() {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    }

    function handleBoxBlast(box) {
      const tier = box.dataset.package || 'gold';
      playBlastSound(tier);

      box.classList.add('is-blasting');
      triggerBlastParticles(box, tier);

      setTimeout(() => {
        box.classList.remove('is-blasting');
        openPackageModal(tier);
      }, 300);
    }

    giftBoxes.forEach(box => {
      box.addEventListener('click', () => {
        handleBoxBlast(box);
      });

      box.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleBoxBlast(box);
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closePackageModal);
    }

    if (rewrapBtn) {
      rewrapBtn.addEventListener('click', closePackageModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closePackageModal();
      }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const targetPackage = urlParams.get('package');
    if (targetPackage && PACKAGES_DATA[targetPackage.toLowerCase()]) {
      setTimeout(() => {
        openPackageModal(targetPackage.toLowerCase());
      }, 400);
    }
  }

  // Dynamic Glowing & Moving Glitter Particles in CTA Section
  function initCtaGlitters() {
    const ctaBoxes = document.querySelectorAll('.cta-box');
    if (!ctaBoxes.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    ctaBoxes.forEach((box, bIndex) => {
      // Ensure ambient moving sheen exists
      if (!box.querySelector('.cta-ambient-sheen')) {
        const sheen = document.createElement('div');
        sheen.className = 'cta-ambient-sheen';
        sheen.setAttribute('aria-hidden', 'true');
        box.insertBefore(sheen, box.firstChild);
      }

      // Ensure glitter container exists
      let glittersContainer = box.querySelector('.cta-glitters');
      if (!glittersContainer) {
        glittersContainer = document.createElement('div');
        glittersContainer.className = 'cta-glitters';
        glittersContainer.setAttribute('aria-hidden', 'true');
        box.insertBefore(glittersContainer, box.firstChild);
      }

      if (glittersContainer.dataset.initialized === 'true') return;
      glittersContainer.dataset.initialized = 'true';

      const createSparkleSvg = (idSuffix) => `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <radialGradient id="glStarGrad_${idSuffix}" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="25%" stop-color="#fff0aa"/>
              <stop offset="60%" stop-color="#f59e0b"/>
              <stop offset="100%" stop-color="#b45309"/>
            </radialGradient>
          </defs>
          <path d="M12 0 C12 6.6 17.4 12 24 12 C17.4 12 12 17.4 12 24 C12 17.4 6.6 12 0 12 C6.6 12 12 6.6 12 0 Z" fill="url(#glStarGrad_${idSuffix})"/>
          <circle cx="12" cy="12" r="2.2" fill="#ffffff"/>
        </svg>
      `;

      const create8PointSvg = (idSuffix) => `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <radialGradient id="glStar8Grad_${idSuffix}" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="28%" stop-color="#fff2b2"/>
              <stop offset="65%" stop-color="#e8a317"/>
              <stop offset="100%" stop-color="#92400e"/>
            </radialGradient>
          </defs>
          <path d="M12 0 C12 6 18 12 24 12 C18 12 12 18 12 24 C12 18 6 12 0 12 C6 12 12 6 12 0 Z" fill="url(#glStar8Grad_${idSuffix})"/>
          <path d="M12 3.8 C12 7.8 16 12 20.2 12 C16 12 12 16.2 12 20.2 C12 16.2 7.8 12 3.8 12 C7.8 12 12 7.8 12 3.8 Z" fill="url(#glStar8Grad_${idSuffix})" transform="rotate(45 12 12)"/>
          <circle cx="12" cy="12" r="2.4" fill="#ffffff"/>
        </svg>
      `;

      const spawnPoints = [
        [8, 7], [11, 24], [6, 50], [9, 74], [10, 92],
        [22, 6], [26, 93], [34, 12], [30, 86],
        [46, 5], [50, 94], [60, 11], [56, 88],
        [70, 7], [76, 25], [72, 50], [78, 76], [74, 93],
        [88, 14], [92, 38], [86, 62], [90, 86],
        [18, 38], [20, 64], [82, 50]
      ];

      spawnPoints.forEach((pt, index) => {
        const top = pt[0] + (Math.random() * 6 - 3);
        const left = pt[1] + (Math.random() * 6 - 3);
        const dur = (3.6 + Math.random() * 3.4).toFixed(2);
        const delay = (-(Math.random() * 6)).toFixed(2);
        const driftX = ((Math.random() - 0.5) * 36).toFixed(0);
        const driftY = (-(16 + Math.random() * 32)).toFixed(0);

        const particle = document.createElement('span');
        particle.style.top = `${Math.max(3, Math.min(95, top))}%`;
        particle.style.left = `${Math.max(3, Math.min(95, left))}%`;
        particle.style.setProperty('--dur', `${dur}s`);
        particle.style.setProperty('--delay', `${delay}s`);
        particle.style.setProperty('--drift-x', `${driftX}px`);
        particle.style.setProperty('--drift-y', `${driftY}px`);

        const typeChoice = index % 3;
        if (typeChoice === 0) {
          particle.className = 'glitter-sparkle';
          const size = 16 + Math.floor(Math.random() * 12);
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.innerHTML = createSparkleSvg(`${bIndex}_${index}`);
        } else if (typeChoice === 1) {
          particle.className = 'glitter-sparkle';
          const size = 18 + Math.floor(Math.random() * 14);
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.innerHTML = create8PointSvg(`${bIndex}_${index}`);
        } else {
          particle.className = 'glitter-orb';
          const size = 5 + Math.floor(Math.random() * 6);
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
        }

        glittersContainer.appendChild(particle);
      });

      if (!prefersReducedMotion) {
        let lastMove = 0;
        box.addEventListener('mousemove', (e) => {
          const now = Date.now();
          if (now - lastMove < 70) return;
          lastMove = now;

          const rect = box.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const sparkle = document.createElement('span');
          sparkle.className = 'glitter-cursor-sparkle';
          const size = 14 + Math.floor(Math.random() * 12);
          sparkle.style.width = `${size}px`;
          sparkle.style.height = `${size}px`;
          sparkle.style.left = `${x}px`;
          sparkle.style.top = `${y}px`;
          sparkle.style.setProperty('--dx', `${((Math.random() - 0.5) * 32).toFixed(0)}px`);
          sparkle.style.setProperty('--dy', `${(-(12 + Math.random() * 24)).toFixed(0)}px`);
          sparkle.innerHTML = createSparkleSvg(`cur_${bIndex}_${now}`);

          glittersContainer.appendChild(sparkle);
          setTimeout(() => {
            if (sparkle.parentNode) sparkle.parentNode.removeChild(sparkle);
          }, 850);
        }, { passive: true });
      }
    });
  }

  // Single Review Auto-Moving Carousel
  function initTestimonialCarousel() {
    const track = document.getElementById('testimonials-track');
    if (!track) return;

    const slides = track.querySelectorAll('.testimonial-slide');
    if (!slides.length) return;

    const prevBtn = document.getElementById('testimonial-prev-btn');
    const nextBtn = document.getElementById('testimonial-next-btn');
    const dotsContainer = document.getElementById('testimonial-dots');
    const sliderWrap = document.querySelector('.testimonials-slider-wrap');

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoTimer = null;
    const AUTO_DELAY = 4500; // 4.5 seconds auto move

    // Render interactive dot indicators
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `testimonial-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Go to review ${idx + 1}`);
        dot.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => {
          goToSlide(idx);
          restartTimer();
        });
        dotsContainer.appendChild(dot);
      });
    }

    function updateDots() {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.testimonial-dot');
      dots.forEach((dot, idx) => {
        const isActive = idx === currentIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    }

    function goToSlide(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentIndex);
      });
      updateDots();
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        restartTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        restartTimer();
      });
    }

    function startTimer() {
      stopTimer();
      autoTimer = setInterval(nextSlide, AUTO_DELAY);
    }

    function stopTimer() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    function restartTimer() {
      stopTimer();
      startTimer();
    }

    // Pause on user interaction (hover & keyboard focus)
    if (sliderWrap) {
      sliderWrap.addEventListener('mouseenter', stopTimer);
      sliderWrap.addEventListener('mouseleave', startTimer);
      sliderWrap.addEventListener('focusin', stopTimer);
      sliderWrap.addEventListener('focusout', startTimer);

      // Touch / swipe support on mobile
      let touchStartX = 0;
      let touchEndX = 0;

      sliderWrap.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopTimer();
      }, { passive: true });

      sliderWrap.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
          if (diff < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
        startTimer();
      }, { passive: true });
    }

    // Start auto move
    startTimer();
  }

  // Initialize all shared components once DOM is ready
  function init() {
    renderHeader();
    renderFooter();
    renderWhatsAppButton();
    initCounters();
    initHeroVideo();
    initAccordion();
    initGallery();
    initArtists();
    initContactForm();
    initEventPlanner();
    initServiceModal();
    initHomeServiceCardToggles();
    initPackageGiftBoxes();
    initCtaGlitters();
    initTestimonialCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
