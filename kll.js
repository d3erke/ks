(function () {
  'use strict';

  const CONFIG = {
    STYLE_ID: '__ultra_lock_style__',
    OVERLAY_ID: '__ultra_lock_overlay__',
    DURATION_MS: 30_000,
    CHECK_INTERVAL_MS: 100,
  };

  let isLocked = false;
  let lockTimer = null;
  let checkInterval = null;
  let observer = null;
  let startTime = null;

  const BLOCKED_EVENTS = [
    'mousedown', 'mouseup', 'mousemove', 'click', 'dblclick', 'contextmenu',
    'mouseenter', 'mouseleave', 'mouseover', 'mouseout',
    'touchstart', 'touchmove', 'touchend', 'touchcancel',
    'pointerdown', 'pointerup', 'pointermove', 'pointercancel',
    'keydown', 'keyup', 'keypress',
    'wheel', 'scroll',
    'focus', 'blur', 'focusin', 'focusout',
    'submit', 'change', 'input',
    'drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop',
    'select', 'selectstart', 'selectionchange',
  ];

  const blockOptions = { passive: false, capture: true };

  function blockEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }

  function attachEventBlockers() {
    BLOCKED_EVENTS.forEach(eventName => {
      document.addEventListener(eventName, blockEvent, blockOptions);
      window.addEventListener(eventName, blockEvent, blockOptions);
      document.body?.addEventListener(eventName, blockEvent, blockOptions);
      document.documentElement?.addEventListener(eventName, blockEvent, blockOptions);
    });
  }

  function detachEventBlockers() {
    BLOCKED_EVENTS.forEach(eventName => {
      document.removeEventListener(eventName, blockEvent, blockOptions);
      window.removeEventListener(eventName, blockEvent, blockOptions);
      document.body?.removeEventListener(eventName, blockEvent, blockOptions);
      document.documentElement?.removeEventListener(eventName, blockEvent, blockOptions);
    });
  }

  function injectLockStyle() {
    let style = document.getElementById(CONFIG.STYLE_ID);
    
    if (!style) {
      style = document.createElement('style');
      style.id = CONFIG.STYLE_ID;
      style.setAttribute('data-lock', 'true');
      document.head.appendChild(style);
    }

    style.textContent = `
      html, body {
        overflow: hidden !important;
        position: fixed !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        touch-action: none !important;
        overscroll-behavior: none !important;
        -webkit-overflow-scrolling: auto !important;
      }
      
      *, *::before, *::after {
        pointer-events: none !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        touch-action: none !important;
      }
      
      body {
        cursor: not-allowed !important;
      }
      
      ::-webkit-scrollbar {
        display: none !important;
      }
    `;
  }

  function removeLockStyle() {
    document.getElementById(CONFIG.STYLE_ID)?.remove();
  }

  function injectOverlay() {
    let overlay = document.getElementById(CONFIG.OVERLAY_ID);
    
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = CONFIG.OVERLAY_ID;
      overlay.setAttribute('data-lock', 'true');
      overlay.setAttribute('aria-hidden', 'true');
      overlay.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 2147483647 !important;
        background: transparent !important;
        pointer-events: all !important;
        cursor: not-allowed !important;
      `;
      
      Object.defineProperty(overlay, 'remove', {
        value: function() { return false; },
        writable: false
      });
      
      document.body.appendChild(overlay);
    }
  }

  function removeOverlay() {
    const overlay = document.getElementById(CONFIG.OVERLAY_ID);
    if (overlay) {
      delete overlay.remove;
      overlay.parentNode?.removeChild(overlay);
    }
  }

  function startMutationObserver() {
    if (observer) return;

    observer = new MutationObserver((mutations) => {
      if (!isLocked) return;

      const hasStyle = !!document.getElementById(CONFIG.STYLE_ID);
      const hasOverlay = !!document.getElementById(CONFIG.OVERLAY_ID);

      if (!hasStyle) {
        injectLockStyle();
      }

      if (!hasOverlay && document.body) {
        injectOverlay();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }

  function stopMutationObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  function startDefensiveChecks() {
    checkInterval = setInterval(() => {
      if (!isLocked) return;

      if (!document.getElementById(CONFIG.STYLE_ID)) {
        injectLockStyle();
      }
      if (!document.getElementById(CONFIG.OVERLAY_ID) && document.body) {
        injectOverlay();
      }

      if (document.body) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.touchAction = 'none';
      }
      if (document.documentElement) {
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.position = 'fixed';
        document.documentElement.style.touchAction = 'none';
      }

      if (window.scrollY !== 0 || window.scrollX !== 0) {
        window.scrollTo(0, 0);
      }
    }, CONFIG.CHECK_INTERVAL_MS);
  }

  function stopDefensiveChecks() {
    if (checkInterval) {
      clearInterval(checkInterval);
      checkInterval = null;
    }
  }

  function lock() {
    if (isLocked) return;

    isLocked = true;
    startTime = Date.now();

    injectLockStyle();
    
    if (document.body) {
      injectOverlay();
    } else {
      const bodyWatcher = setInterval(() => {
        if (document.body) {
          injectOverlay();
          clearInterval(bodyWatcher);
        }
      }, 10);
    }

    attachEventBlockers();
    startMutationObserver();
    startDefensiveChecks();

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    lockTimer = setTimeout(unlock, CONFIG.DURATION_MS);
  }

  function unlock() {
    if (!isLocked) return;

    isLocked = false;

    if (lockTimer) {
      clearTimeout(lockTimer);
      lockTimer = null;
    }

    stopDefensiveChecks();
    stopMutationObserver();
    detachEventBlockers();
    removeOverlay();
    removeLockStyle();

    if (document.body) {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.touchAction = '';
    }
    if (document.documentElement) {
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.touchAction = '';
    }
  }

  function initialize() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', lock, { once: true });
    } else {
      lock();
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (lockTimer && isLocked) {
        clearTimeout(lockTimer);
        const elapsed = Date.now() - startTime;
        const remaining = CONFIG.DURATION_MS - elapsed;
        
        const resumeLock = () => {
          if (!document.hidden && isLocked && remaining > 0) {
            lockTimer = setTimeout(unlock, remaining);
            document.removeEventListener('visibilitychange', resumeLock);
          }
        };
        document.addEventListener('visibilitychange', resumeLock);
      }
    }
  });

  initialize();

  window.__emergencyUnlock = () => {
    unlock();
  };
})();
