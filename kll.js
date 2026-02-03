(function () {
  try {
    // Alert’i opsiyonel yap (Safari bazen engeller)
    // alert('Bu site süresiz olarak kapatılmıştır.');

    function injectOverlay() {
      // Zaten varsa tekrar ekleme
      if (document.getElementById('__site_kill_overlay__')) return;

      var overlay = document.createElement('div');
      overlay.id = '__site_kill_overlay__';

      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #000;
        z-index: 2147483647;
        pointer-events: all;
      `;

      // iOS Safari repaint fix
      overlay.style.webkitTransform = 'translateZ(0)';

      document.documentElement.appendChild(overlay);

      // Scroll kilidi
      document.documentElement.style.overflow = 'hidden';
      document.body && (document.body.style.overflow = 'hidden');
    }

    // DOM hazır olmasını garanti et
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', injectOverlay, { once: true });
    } else {
      injectOverlay();
    }

    // Safari geri çizmeye çalışırsa tekrar bindir
    setInterval(injectOverlay, 500);

  } catch (e) {
    // Sessiz kal
  }
})();
