(function () {
  'use strict';

  var canvas = document.getElementById('particles');
  var ctx = canvas.getContext('2d');

  var particles = [];
  var mouse = { x: null, y: null };
  var CONNECT_DISTANCE = 150;
  var MOUSE_RADIUS = 200;
  var resizeTimer = null;

  function getParticleCount() {
    return window.innerWidth < 768 ? 50 : 100;
  }

  var dpr = window.devicePixelRatio || 1;
  var logicalWidth = window.innerWidth;
  var logicalHeight = window.innerHeight;

  function resize() {
    logicalWidth = window.innerWidth;
    logicalHeight = window.innerHeight;
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    canvas.style.width = logicalWidth + 'px';
    canvas.style.height = logicalHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createParticle() {
    var isAccent = Math.random() < 0.1;
    return {
      x: Math.random() * logicalWidth,
      y: Math.random() * logicalHeight,
      vx: (Math.random() - 0.5) * 1.0,
      vy: (Math.random() - 0.5) * 1.0,
      radius: isAccent ? 2.5 : 1.5,
      color: isAccent ? '#00E5A0' : '#FFFFFF',
      alpha: isAccent ? 0.8 : 0.3 + Math.random() * 0.3,
      isAccent: isAccent
    };
  }

  function initParticles() {
    particles = [];
    var count = getParticleCount();
    for (var i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }

  function updateParticle(p) {
    p.x += p.vx;
    p.y += p.vy;

    // Wrap around edges
    if (p.x < 0) p.x = logicalWidth;
    if (p.x > logicalWidth) p.x = 0;
    if (p.y < 0) p.y = logicalHeight;
    if (p.y > logicalHeight) p.y = 0;

    // Mouse interaction — gentle repulsion
    if (mouse.x !== null && mouse.y !== null) {
      var dx = p.x - mouse.x;
      var dy = p.y - mouse.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        var force = 0.02;
        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
      }
    }

    // Dampen velocity
    p.vx *= 0.999;
    p.vy *= 0.999;

    // Clamp speed to max 1
    var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
    if (speed > 1) {
      p.vx = (p.vx / speed);
      p.vy = (p.vy / speed);
    }
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;

    if (p.isAccent) {
      ctx.shadowColor = '#00E5A0';
      ctx.shadowBlur = 8;
    }

    ctx.fill();

    // Reset shadow and alpha
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  function drawConnections() {
    var i, j, p1, p2, dx, dy, dist, alpha;

    // Particle-to-particle connections
    for (i = 0; i < particles.length; i++) {
      p1 = particles[i];
      for (j = i + 1; j < particles.length; j++) {
        p2 = particles[j];
        dx = p1.x - p2.x;
        dy = p1.y - p2.y;
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DISTANCE) {
          alpha = (1 - dist / CONNECT_DISTANCE) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = '#FFFFFF';
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    // Mouse-to-particle connections
    if (mouse.x !== null && mouse.y !== null) {
      for (i = 0; i < particles.length; i++) {
        var p = particles[i];
        dx = p.x - mouse.x;
        dy = p.y - mouse.y;
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          alpha = (1 - dist / MOUSE_RADIUS) * 0.2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = '#00E5A0';
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    if (document.hidden) {
      return;
    }

    ctx.clearRect(0, 0, logicalWidth, logicalHeight);

    for (var i = 0; i < particles.length; i++) {
      updateParticle(particles[i]);
      drawParticle(particles[i]);
    }

    drawConnections();
  }

  // Events
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', function () {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = setTimeout(function () {
      resize();
      initParticles();
    }, 250);
  });

  // Init
  resize();
  initParticles();
  animate();

}());
