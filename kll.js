
(function() {
'use strict';

const DURATION = 30000;
const STYLE_ID = '__page_lock__';
const OVERLAY_ID = '__lock_overlay__';

let locked = false;
let unlockTimer = null;
let maintainInterval = null;

const events = [
  'mousedown', 'mouseup', 'click', 'dblclick', 'contextmenu',
  'touchstart', 'touchmove', 'touchend',
  'wheel', 'scroll',
  'keydown', 'keypress'
];

function block(e) {
  if (locked) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}

function createStyle() {
  if (document.getElementById(STYLE_ID)) return;
  
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    html, body {
      overflow: hidden !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100% !important;
      height: 100% !important;
      touch-action: none !important;
    }
    * {
      pointer-events: none !important;
      user-select: none !important;
    }
  `;
  (document.head || document.documentElement).appendChild(style);
}

function createOverlay() {
  if (document.getElementById(OVERLAY_ID)) return;
  if (!document.body) return;
  
  const overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  overlay.style.cssText = `
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 999999999 !important;
    background: transparent !important;
    pointer-events: all !important;
    cursor: not-allowed !important;
  `;
  document.body.appendChild(overlay);
}

function maintain() {
  if (!locked) return;
  
  createStyle();
  createOverlay();
  
  if (window.scrollX !== 0 || window.scrollY !== 0) {
    window.scrollTo(0, 0);
  }
}

function lock() {
  if (locked) return;
  locked = true;
  
  createStyle();
  
  const waitForBody = setInterval(() => {
    if (document.body) {
      createOverlay();
      clearInterval(waitForBody);
    }
  }, 50);
  
  events.forEach(evt => {
    document.addEventListener(evt, block, { passive: false, capture: true });
    window.addEventListener(evt, block, { passive: false, capture: true });
  });
  
  maintainInterval = setInterval(maintain, 200);
  
  unlockTimer = setTimeout(unlock, DURATION);
}

function unlock() {
  if (!locked) return;
  locked = false;
  
  if (unlockTimer) clearTimeout(unlockTimer);
  if (maintainInterval) clearInterval(maintainInterval);
  
  document.getElementById(STYLE_ID)?.remove();
  document.getElementById(OVERLAY_ID)?.remove();
  
  events.forEach(evt => {
    document.removeEventListener(evt, block, { passive: false, capture: true });
    window.removeEventListener(evt, block, { passive: false, capture: true });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', lock);
} else {
  setTimeout(lock, 0);
}

window.__forceUnlock = unlock;
})();
