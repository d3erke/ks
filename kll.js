(function () {
  try {
    const ID = '__force_black_screen__';

    function killScroll(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    function forceBlackScreen() {
      if (document.getElementById(ID)) return;

      // BLACK OVERLAY
      const overlay = document.createElement('div');
      overlay.id = ID;
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        background: #000;
        z-index: 2147483647;
        pointer-events: all;
        touch-action: none;
      `;
      document.body.appendChild(overlay);

      // CSS SCROLL KILL
      const style = document.createElement('style');
      style.innerHTML = `
        html, body {
          height: 100% !important;
          overflow: hidden !important;
          position: fixed !important;
          width: 100%;
          overscroll-behavior: none !important;
        }
      `;
      document.head.appendChild(style);

      // EVENT SCROLL KILL
      window.addEventListener('wheel', killScroll, { passive: false });
      window.addEventListener('touchmove', killScroll, { passive: false });
      window.addEventListener('keydown', function (e) {
        const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
        if (keys.includes(e.keyCode)) killScroll(e);
      }, false);
    }

    forceBlackScreen();
    setInterval(forceBlackScreen, 200);

  } catch (e) {}
})();