/* ============================================================
   Pharma Cursor — animated capsule cursor for pharmacy sites
   No dependencies. Include after pharma-cursor.css.

   Optional config before including this script:
     window.PH_CURSOR_HOVER_SELECTOR = "a, button, .clickable"
     window.PH_CURSOR_TRAIL = true|false   (default true)
     window.PH_CURSOR_BURST = true|false   (default true)
   ============================================================ */
(function () {
  "use strict";

  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
    return; // touch device — do nothing, keep native cursor
  }

  var HOVER_SELECTOR =
    window.PH_CURSOR_HOVER_SELECTOR ||
    'a, button, input, textarea, select, [role="button"], .ph-clickable';
  var TRAIL_ENABLED = window.PH_CURSOR_TRAIL !== false;
  var BURST_ENABLED = window.PH_CURSOR_BURST !== false;

  document.documentElement.classList.add("ph-cursor-active");

  var cursor = document.createElement("div");
  cursor.className = "ph-cursor";
  document.body.appendChild(cursor);

  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var curX = mouseX;
  var curY = mouseY;
  var lastTrailX = mouseX;
  var lastTrailY = mouseY;
  var TRAIL_MIN_DIST = 22; // px between trail dots

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.addEventListener("mousedown", function () {
    cursor.classList.add("ph-down");
  });
  document.addEventListener("mouseup", function () {
    cursor.classList.remove("ph-down");
  });

  document.addEventListener(
    "mouseover",
    function (e) {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) {
        cursor.classList.add("ph-hover");
      }
    },
    true
  );
  document.addEventListener(
    "mouseout",
    function (e) {
      if (e.target.closest && e.target.closest(HOVER_SELECTOR)) {
        cursor.classList.remove("ph-hover");
      }
    },
    true
  );

  function spawnTrail(x, y) {
    var dot = document.createElement("div");
    dot.className = "ph-trail";
    dot.style.left = x + "px";
    dot.style.top = y + "px";
    document.body.appendChild(dot);
    setTimeout(function () {
      dot.remove();
    }, 650);
  }

  function spawnBurst(x, y) {
    var count = 8;
    for (var i = 0; i < count; i++) {
      var particle = document.createElement("div");
      particle.className = "ph-burst";
      var angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      var dist = 30 + Math.random() * 26;
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist;
      particle.style.left = x + "px";
      particle.style.top = y + "px";
      particle.style.setProperty("--ph-dx", dx.toFixed(1) + "px");
      particle.style.setProperty("--ph-dy", dy.toFixed(1) + "px");
      particle.style.setProperty(
        "--ph-rot",
        (Math.random() * 180 - 90).toFixed(0) + "deg"
      );
      document.body.appendChild(particle);
      (function (p) {
        setTimeout(function () {
          p.remove();
        }, 600);
      })(particle);
    }
  }

  if (BURST_ENABLED) {
    document.addEventListener("click", function (e) {
      spawnBurst(e.clientX, e.clientY);
    });
  }

  function loop() {
    // smooth lerp follow
    curX += (mouseX - curX) * 0.22;
    curY += (mouseY - curY) * 0.22;
    cursor.style.setProperty("--x", curX + "px");
    cursor.style.setProperty("--y", curY + "px");

    if (TRAIL_ENABLED) {
      var dx = curX - lastTrailX;
      var dy = curY - lastTrailY;
      if (Math.sqrt(dx * dx + dy * dy) > TRAIL_MIN_DIST) {
        spawnTrail(curX, curY);
        lastTrailX = curX;
        lastTrailY = curY;
      }
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
})();
