(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. NAVIGATION — Sticky + Active State + Mobile Menu
  // ─────────────────────────────────────────────────────────────────────────────

  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('nav-toggle');
  var navMobile = document.getElementById('nav-mobile');
  var navLinks = document.querySelectorAll('.nav__link');
  var mobileLinks = document.querySelectorAll('.nav__mobile-link');
  var sections = document.querySelectorAll('section[id]');

  // Sticky nav
  function handleNavScroll() {
    if (window.scrollY > 100) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll();

  // Active section highlight via IntersectionObserver
  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('nav__link--active');
          } else {
            link.classList.remove('nav__link--active');
          }
        });
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '-80px 0px -20% 0px'
  });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // Close mobile nav helper
  function closeMobileNav() {
    navToggle.classList.remove('nav__toggle--active');
    navMobile.classList.remove('nav__mobile--active');
    document.body.style.overflow = '';
  }

  // Mobile menu toggle
  navToggle.addEventListener('click', function () {
    var isOpen = navMobile.classList.contains('nav__mobile--active');
    if (isOpen) {
      closeMobileNav();
    } else {
      navToggle.classList.add('nav__toggle--active');
      navMobile.classList.add('nav__mobile--active');
      document.body.style.overflow = 'hidden';
    }
  });

  // Close on mobile link click
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileNav();
    });
  });

  // Smooth scroll for all anchor links
  var allAnchorLinks = document.querySelectorAll('a[href^="#"]');
  allAnchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. SCROLL REVEAL — IntersectionObserver
  // ─────────────────────────────────────────────────────────────────────────────

  var revealEls = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealEls.forEach(function (el) {
    revealObserver.observe(el);
  });

  // Orbit rings
  var orbitRings = document.querySelector('.orbit-rings');
  if (orbitRings) {
    var orbitObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('orbit-rings--active');
          orbitObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3
    });
    orbitObserver.observe(orbitRings);
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. HERO TYPEWRITER
  // ─────────────────────────────────────────────────────────────────────────────

  var typewriterEl = document.getElementById('typewriter');
  var typewriterText = 'Engineering What Matters.';
  var typewriterIndex = 0;
  var typewriterInterval = null;
  var typewriterCursor = null;

  function runTypewriter() {
    typewriterInterval = setInterval(function () {
      typewriterEl.textContent = typewriterText.substring(0, typewriterIndex);

      typewriterCursor = document.createElement('span');
      typewriterCursor.className = 'cursor';
      typewriterEl.appendChild(typewriterCursor);

      typewriterIndex++;

      if (typewriterIndex > typewriterText.length) {
        clearInterval(typewriterInterval);

        var heroSubtitle = document.querySelector('.hero__subtitle');
        if (heroSubtitle) {
          heroSubtitle.classList.add('hero__subtitle--visible');
        }

        setTimeout(function () {
          var heroCtas = document.querySelector('.hero__ctas');
          if (heroCtas) {
            heroCtas.classList.add('hero__ctas--visible');
          }
        }, 300);

        setTimeout(function () {
          if (typewriterCursor) {
            typewriterCursor.style.display = 'none';
          }
        }, 2000);
      }
    }, 40);
  }

  setTimeout(runTypewriter, 1000);

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. SCROLL INDICATOR
  // ─────────────────────────────────────────────────────────────────────────────

  var scrollIndicator = document.getElementById('scroll-indicator');
  var scrollIndicatorHidden = false;

  if (scrollIndicator) {
    window.addEventListener('scroll', function () {
      if (!scrollIndicatorHidden && window.scrollY > 50) {
        scrollIndicator.classList.add('hero__scroll-indicator--hidden');
        scrollIndicatorHidden = true;
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. MAGNETIC BUTTONS
  // ─────────────────────────────────────────────────────────────────────────────

  var isTouchDevice = 'ontouchstart' in window;

  if (!isTouchDevice) {
    var magneticEls = document.querySelectorAll('.magnetic');

    magneticEls.forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        var offsetX = (e.clientX - centerX) * 0.15;
        var offsetY = (e.clientY - centerY) * 0.15;
        el.style.transform = 'translate(' + offsetX + 'px, ' + offsetY + 'px)';
      });

      el.addEventListener('mouseleave', function () {
        el.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        el.style.transform = 'translate(0, 0)';
        setTimeout(function () {
          el.style.transition = '';
        }, 300);
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. 3D CARD TILT
  // ─────────────────────────────────────────────────────────────────────────────

  if (!isTouchDevice) {
    var tiltEls = document.querySelectorAll('[data-tilt]');

    tiltEls.forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var rect = el.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        var rotateX = (0.5 - y) * 10;
        var rotateY = (x - 0.5) * 10;
        el.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
      });

      el.addEventListener('mouseleave', function () {
        el.style.transition = 'transform 0.5s ease-out, border-color 0.3s ease, box-shadow 0.3s ease';
        el.style.transform = '';
        setTimeout(function () {
          el.style.transition = '';
        }, 500);
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. TEXT SCRAMBLE
  // ─────────────────────────────────────────────────────────────────────────────

  var scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function scrambleText(el) {
    var original = el.getAttribute('data-original');
    if (!original) {
      original = el.textContent;
      el.setAttribute('data-original', original);
    }

    var duration = 300;
    var startTime = null;
    var length = original.length;

    function randomChar() {
      return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
    }

    function frame(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var revealed = Math.floor(progress * length);

      var result = '';
      for (var i = 0; i < length; i++) {
        if (i < revealed) {
          result += original[i];
        } else {
          result += randomChar();
        }
      }
      el.textContent = result;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = original;
      }
    }

    requestAnimationFrame(frame);
  }

  var scrambleEls = document.querySelectorAll('[data-scramble]');

  var scrambleRevealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        scrambleText(entry.target);
        scrambleRevealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  scrambleEls.forEach(function (el) {
    scrambleRevealObserver.observe(el);

    if (!isTouchDevice) {
      el.addEventListener('mouseenter', function () {
        scrambleText(el);
      });
    }
  });

}());
