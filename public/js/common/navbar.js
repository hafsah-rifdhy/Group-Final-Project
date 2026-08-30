// Navbar loader and initialiser. Safe-guards to avoid double initialization.
(function () {
  if (window.__navbarInitialized) return;
  window.__navbarInitialized = true;

  // Map of URL patterns (substrings) to nav element IDs
  // Keep this updated when adding new pages. Keys are tested against `location.href`.
  const NAV_LINK_MAP = {
    'index.html': 'nav-home',
    '/index.html': 'nav-home',
    '/': 'nav-home',
    'about.html': 'nav-about',
    'programs.html': 'nav-programs',
    'internships.html': 'nav-internships',
    'team.html': 'nav-team',
    'contact.html': 'nav-contact',
    'verify.html': 'nav-verify',
    'apply.html': 'nav-apply'
  };

  async function loadNavbar() {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    try {
      const res = await fetch('navbar.html');
      if (!res.ok) return;
      const html = await res.text();
      const shadowRoot = container.shadowRoot || container.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = '';

      const styleLink = document.createElement('link');
      styleLink.rel = 'stylesheet';
      styleLink.href = 'css/navbar.css';

      const wrapper = document.createElement('div');
      wrapper.innerHTML = html.trim();

      shadowRoot.appendChild(styleLink);
      while (wrapper.firstChild) {
        shadowRoot.appendChild(wrapper.firstChild);
      }

      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.right = '0';
      container.style.zIndex = '1000';
      container.style.display = 'block';

      syncNavbarOffset(container, shadowRoot);
      initNavbar(shadowRoot, container);
    } catch (e) {
      // silently fail — keep original behavior if any other script handles navbar
      console.error('Failed to load navbar:', e);
    }
  }

  function syncNavbarOffset(container, shadowRoot) {
    const basePaddingTop = parseFloat(getComputedStyle(document.body).paddingTop) || 0;

    function update() {
      const navBar = shadowRoot.querySelector('.navbar');
      if (!navBar) return;

      const height = Math.ceil(navBar.getBoundingClientRect().height || navBar.offsetHeight || 74);
      container.style.height = height + 'px';
      document.body.style.paddingTop = basePaddingTop + height + 'px';
    }

    update();

    if (typeof ResizeObserver !== 'undefined') {
      const navBar = shadowRoot.querySelector('.navbar');
      if (navBar) {
        const observer = new ResizeObserver(update);
        observer.observe(navBar);
      }
    }

    window.addEventListener('resize', update);
  }

  function initNavbar(shadowRoot, container) {
    const menuToggle = shadowRoot.querySelector('#menuToggle');
    const navLinks = shadowRoot.querySelector('#navLinks');
    if (menuToggle && navLinks) {
      function openMenu() {
        menuToggle.setAttribute('aria-expanded', 'true');
        navLinks.classList.add('open');
        // compute available height and set maxHeight so background covers items
        var available = Math.max(0, window.innerHeight - (container.getBoundingClientRect().top + 16));
        var desired = navLinks.scrollHeight + 24; // include padding
        var finalH = Math.min(desired, available);
        navLinks.style.maxHeight = finalH + 'px';
        // prevent body scroll when menu open on small screens
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      }

      function closeMenu() {
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        navLinks.style.maxHeight = '';
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }

      menuToggle.addEventListener('click', function (e) {
        var isOpen = navLinks.classList.contains('open');
        if (isOpen) closeMenu();
        else openMenu();
      });

      // close menu when resizing larger than mobile breakpoint
      window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
          closeMenu();
        } else if (navLinks.classList.contains('open')) {
          // recompute maxHeight
          var available = Math.max(0, window.innerHeight - (container.getBoundingClientRect().top + 16));
          var desired = navLinks.scrollHeight + 24;
          var finalH = Math.min(desired, available);
          navLinks.style.maxHeight = finalH + 'px';
        }
      });

      // close menu when a nav link is clicked (mobile)
      navLinks.addEventListener('click', function (ev) {
        var tgt = ev.target;
        if (tgt && tgt.tagName === 'A' && window.innerWidth <= 768) {
          // give the link default behaviour then close the menu
          // small timeout to allow navigation handlers to run
          setTimeout(function () { closeMenu(); }, 50);
        }
      });
    }

    const themeToggle = shadowRoot.querySelector('#themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        document.documentElement.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-moon');
          icon.classList.toggle('fa-sun');
        }
      });
    }

    // Activate a nav item based on the current location.href using NAV_LINK_MAP.
    (function activateFromLocation() {
      try {
        var href = location.href || '';
        var bestMatch = '';
        var bestId = null;
        for (var pattern in NAV_LINK_MAP) {
          if (!Object.prototype.hasOwnProperty.call(NAV_LINK_MAP, pattern)) continue;
          if (href.indexOf(pattern) !== -1) {
            // pick the longest matching pattern to prefer specific matches
            if (pattern.length > bestMatch.length) {
              bestMatch = pattern;
              bestId = NAV_LINK_MAP[pattern];
            }
          }
        }

        // If nothing matched and we're on the root path, try to activate home
        if (!bestId) {
          var p = location.pathname || '';
          if (p === '/' || p === '') bestId = NAV_LINK_MAP['/'] || NAV_LINK_MAP['index.html'];
        }

        if (bestId) {
          // clear any existing active class
          var links = shadowRoot.querySelectorAll('#navLinks a');
          links.forEach(function (a) { a.classList.remove('active'); });
          var el = shadowRoot.getElementById ? shadowRoot.getElementById(bestId) : shadowRoot.querySelector('#' + bestId);
          if (el) el.classList.add('active');
        }
      } catch (e) {
        // fail silently
        console.error('Navbar activation failed', e);
      }
    })();
  }

  // Load navbar after DOMContentLoaded to ensure placeholder exists
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
  } else {
    loadNavbar();
  }
})();
