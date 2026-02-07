(function () {
    try {
      
      const isMobile =
        window.matchMedia('(pointer: coarse)').matches &&
        window.matchMedia('(max-width: 1024px)').matches;
  
      if (!isMobile) return;
  
      const LOCK_ID = '__scroll_lock_style__';
  
      function applyLock() {
        if (!document.getElementById(LOCK_ID)) {
          const style = document.createElement('style');
          style.id = LOCK_ID;
          style.textContent = `
            html, body {
              overflow: hidden !important;
              position: fixed !important;
              inset: 0 !important;
              width: 100% !important;
              height: 100% !important;
              touch-action: none !important;
            }
          `;
          document.head.appendChild(style);
        }
      }
  
      function block(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
  
      const events = [
        'wheel',
        'touchmove'
      ];
  
      events.forEach(evt => {
        window.addEventListener(evt, block, { passive: false, capture: true });
        document.addEventListener(evt, block, { passive: false, capture: true });
      });
  
      window.addEventListener(
        'keydown',
        e => {
          const keys = [
            'ArrowUp',
            'ArrowDown',
            'PageUp',
            'PageDown',
            'Home',
            'End',
            ' '
          ];
          if (keys.includes(e.key)) block(e);
        },
        { passive: false, capture: true }
      );
  
      applyLock();
  
      setInterval(applyLock, 500);
  
    } catch (_) {}
  })();
  
