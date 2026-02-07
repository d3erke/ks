(function () {
  'use strict';

  
  if (sessionStorage.getItem('__first_page_scroll_locked__')) return;
  sessionStorage.setItem('__first_page_scroll_locked__', '1');

  const STYLE_ID = '__first_page_scroll_lock__';
  const DURATION_MS = 30_000; // 30 saniye

  const opts = { passive: false, capture: true };

  function block(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  function onKeydown(e) {
    const keys = ['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '];
    if (keys.includes(e.key)) block(e);
  }

  function addListeners() {
    document.addEventListener('wheel', block, opts);
    document.addEventListener('touchmove', block, opts);
    document.addEventListener('keydown', onKeydown, opts);
  }

  function removeListeners() {
    document.removeEventListener('wheel', block, opts);
    document.removeEventListener('touchmove', block, opts);
    document.removeEventListener('keydown', onKeydown, opts);
  }

  function lockScroll() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      html, body {
        overflow: hidden !important;
        position: fixed !important;
        width: 100% !important;
        height: 100% !important;
        inset: 0 !important;
        touch-action: none !important;
      }
    `;
    document.head.appendChild(style);
    addListeners();

    
    setTimeout(unlockScroll, DURATION_MS);
  }

  function unlockScroll() {
    document.getElementById(STYLE_ID)?.remove();
    removeListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lockScroll);
  } else {
    lockScroll();
  }
})();
