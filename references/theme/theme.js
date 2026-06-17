/**
 * Pagurai Theme JS Components
 * Includes: Dot Matrix Background Animation, Glow Card Mouse Tracking, and CTA Button Glow Tracking.
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.PaguraTheme = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var PaguraTheme = {};

  /**
   * Initializes the canvas-rendered interactive dot matrix.
   * @param {HTMLCanvasElement} canvas The canvas element to draw on.
   * @param {HTMLElement} parentSection The container that determines the bounds of the canvas.
   * @param {boolean} revealFromCenter True to animate the dots fading in from the center on load.
   */
  PaguraTheme.createDotMatrix = function (canvas, parentSection, revealFromCenter) {
    if (!canvas || !parentSection) return null;
    var ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    var GRID = 20;
    var DOT_R = 1.5;
    
    // Get colors from CSS custom properties or fallbacks
    var style = getComputedStyle(document.documentElement);
    var accentString = style.getPropertyValue('--accent-rgb').trim() || '0, 152, 255';
    var ACCENT_COLOR = accentString.split(',').map(Number);
    
    var dots = [];
    var time = 0;
    var raf;
    var active = true;

    function hash(x, y) {
      return ((Math.sin(x * 127.1 + y * 311.7) * 43758.5453123) % 1 + 1) % 1;
    }

    function resize() {
      var dpr = window.devicePixelRatio || 1;
      var rect = parentSection.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      dots = [];
      var cols = Math.ceil(rect.width / GRID) + 1;
      var rows = Math.ceil(rect.height / GRID) + 1;
      
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          dots.push({
            x: c * GRID + GRID / 2,
            y: r * GRID + GRID / 2,
            seed: hash(c, r),
            delay: hash(c + 0.5, r + 0.5)
          });
        }
      }
    }

    function draw() {
      if (!active) return;
      var rect = parentSection.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      time += 0.016;

      var cx = rect.width / 2;
      var cy = rect.height / 2;
      var maxDist = Math.sqrt(cx * cx + cy * cy) || 1;

      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        var flicker = Math.sin(time * 3.5 + d.seed * 50) * 0.5 + 0.5;
        var phase = Math.sin(time * 1.5 + d.delay * 12) * 0.5 + 0.5;
        var blink = Math.sin(time * 1.8 + d.seed * 100 + d.delay * 60);
        var blinkOn = blink > (d.seed > 0.7 ? -0.4 : 0.1) ? 1 : 0;
        var baseOpacity;
        
        if (d.seed > 0.85) {
          baseOpacity = (0.35 + flicker * 0.3) * blinkOn;
        } else if (d.seed > 0.6) {
          baseOpacity = (0.15 + phase * 0.15) * blinkOn;
        } else {
          baseOpacity = (0.04 + flicker * 0.06) * blinkOn;
        }
        
        var opacity = baseOpacity;
        
        if (revealFromCenter) {
          var dist = Math.sqrt(Math.pow(d.x - cx, 2) + Math.pow(d.y - cy, 2));
          var revealThreshold = (dist / maxDist) * 3 + d.delay * 0.8;
          var revealProgress = Math.max(0, Math.min(1, (time * 1.2 - revealThreshold)));
          opacity = baseOpacity * revealProgress;
        }
        
        if (opacity < 0.01) continue;
        
        var rgb = d.seed > 0.92 ? ACCENT_COLOR : [255, 255, 255];
        ctx.beginPath();
        ctx.arc(d.x, d.y, DOT_R, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + opacity + ')';
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);

    // Stop execution when the canvas is off-screen
    var observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting && active) {
            cancelAnimationFrame(raf);
            active = false;
          } else if (entry.isIntersecting && !active) {
            active = true;
            draw();
          }
        });
      }, { threshold: 0 });
      observer.observe(parentSection);
    }

    return {
      destroy: function () {
        cancelAnimationFrame(raf);
        active = false;
        window.removeEventListener('resize', resize);
        if (observer) {
          observer.disconnect();
        }
      }
    };
  };

  /**
   * Initializes mouse movement pointer event handlers for glow cards and buttons.
   */
  PaguraTheme.initGlowTrackers = function () {
    // 1. Mouse pointer tracking for Glow Cards (.vw-glow-card)
    document.addEventListener('pointermove', function (e) {
      var cards = document.querySelectorAll('.vw-glow-card');
      for (var i = 0; i < cards.length; i++) {
        var card = cards[i];
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--glow-x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--glow-y', (e.clientY - rect.top) + 'px');
      }
    });

    // 2. Mouse pointer tracking for cyber-navbars (.navbar-v4, .navbar-v5, etc.)
    document.addEventListener('mousemove', function (e) {
      var cyberNavs = document.querySelectorAll('#cyber-navbar, .navbar-v4, .navbar-v5, #cyber-capsule-navbar');
      for (var i = 0; i < cyberNavs.length; i++) {
        var nav = cyberNavs[i];
        var rect = nav.getBoundingClientRect();
        nav.style.setProperty('--px', (e.clientX - rect.left) + 'px');
        nav.style.setProperty('--py', (e.clientY - rect.top) + 'px');
      }
    });

    // Helper to setup a button tracker
    function setupButtonGlow(btn) {
      if (!btn.querySelector('.vw-btn-glow')) {
        var glow = document.createElement('span');
        glow.className = 'vw-btn-glow';
        btn.insertBefore(glow, btn.firstChild);
      }
      btn.addEventListener('pointermove', function (e) {
        var rect = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
        btn.style.setProperty('--my', (e.clientY - rect.top) + 'px');
      });
    }

    // Initialize trackers for existing primary/CTA buttons
    var buttons = document.querySelectorAll('.vw-cta-btn');
    for (var j = 0; j < buttons.length; j++) {
      setupButtonGlow(buttons[j]);
    }

    // Set up MutationObserver to handle dynamic content
    if ('MutationObserver' in window) {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.addedNodes) {
            mutation.addedNodes.forEach(function (node) {
              if (node.nodeType === 1) { // Element node
                if (node.classList.contains('vw-cta-btn')) {
                  setupButtonGlow(node);
                }
                var children = node.querySelectorAll('.vw-cta-btn');
                children.forEach(setupButtonGlow);
              }
            });
          }
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  };

  /**
   * Helper that auto-starts the theme assets if elements exist in DOM.
   */
  PaguraTheme.autoInit = function () {
    PaguraTheme.initGlowTrackers();
    var canvas = document.getElementById('matrix-canvas');
    if (canvas) {
      PaguraTheme.createDotMatrix(canvas, document.body, true);
    }
  };

  return PaguraTheme;
}));
