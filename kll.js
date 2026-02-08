(function () {
  'use strict';

  var OVERLAY_ID = '__hard_lock_overlay__';
  var DURATION = 30000;

  function lock() {
    if (document.getElementById(OVERLAY_ID)) return;

    // Scroll'u fiziksel olarak kilitle
    document.documentElement.style.overflow = 'hidden';
    document.body && (document.body.style.overflow = 'hidden');

    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;

    // INLINE style = override edilemez
    overlay.style.cssText =
      'position:fixed;' +
      'top:0;' +
      'left:0;' +
      'width:100vw;' +
      'height:100vh;' +
      'background:rgba(0,0,0,0);' +
      'z-index:2147483647;' +
      'pointer-events:all;' +
      'touch-action:none;';

    // iOS Safari GPU / repaint fix
    overlay.style.webkitTransform = 'translateZ(0)';
    overlay.style.transform = 'translateZ(0)';

    document.documentElement.appendChild(overlay);

    console.log('🔒 PAGE LOCKED (30s)');
  }

  function unlock() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) overlay.remove();

    document.documentElement.style.overflow = '';
    document.body && (document.body.style.overflow = '';

    console.log('🔓 PAGE UNLOCKED');
  }

  // DOM hazır olunca kilitle
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lock, { once: true });
  } else {
    lock();
  }

  // 30 saniye sonra aç
  setTimeout(unlock, DURATION);

  // Manuel override (debug için)
  window.__forceUnlock = unlock;
})();
