(function () {
  'use strict';

  const isMobileDevice = () => {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua.toLowerCase());
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches;
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    return (isMobileUA || hasCoarsePointer) && isSmallScreen && hasTouchSupport;
  };

  if (!isMobileDevice()) return;

  class MobileScrollLock {
    constructor() {
      this.styleId = '__mobile_scroll_lock__';
      this.isLocked = false;
      this.touchStartY = 0;
      this.scrollY = 0;
    }

    lock() {
      if (this.isLocked) return;

      this.scrollY = window.scrollY || window.pageYOffset;

      const existingStyle = document.getElementById(this.styleId);
      if (existingStyle) existingStyle.remove();

      const style = document.createElement('style');
      style.id = this.styleId;
      style.textContent = `
        html {
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
          height: 100% !important;
          top: -${this.scrollY}px !important;
        }
        body {
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
          height: 100% !important;
          touch-action: none !important;
          -webkit-overflow-scrolling: auto !important;
        }
      `;
      document.head.appendChild(style);

      this.addEventListeners();
      this.isLocked = true;
    }

    unlock() {
      if (!this.isLocked) return;

      const style = document.getElementById(this.styleId);
      if (style) style.remove();

      window.scrollTo(0, this.scrollY);

      this.removeEventListeners();
      this.isLocked = false;
    }

    handleTouchStart = (e) => {
      this.touchStartY = e.touches[0].clientY;
    };

    handleTouchMove = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    handleKeydown = (e) => {
      const scrollKeys = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'PageUp', 'PageDown', 'Home', 'End', ' '
      ];

      if (scrollKeys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    addEventListeners() {
      const options = { passive: false, capture: true };

      document.addEventListener('touchstart', this.handleTouchStart, options);
      document.addEventListener('touchmove', this.handleTouchMove, options);
      document.addEventListener('wheel', this.handleWheel, options);
      document.addEventListener('keydown', this.handleKeydown, options);

      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    }

    removeEventListeners() {
      const options = { passive: false, capture: true };

      document.removeEventListener('touchstart', this.handleTouchStart, options);
      document.removeEventListener('touchmove', this.handleTouchMove, options);
      document.removeEventListener('wheel', this.handleWheel, options);
      document.removeEventListener('keydown', this.handleKeydown, options);
    }

    startMonitoring() {
      this.monitorInterval = setInterval(() => {
        if (this.isLocked) {
          const style = document.getElementById(this.styleId);
          if (!style) {
            this.isLocked = false;
            this.lock();
          }
        }
      }, 1000);
    }

    stopMonitoring() {
      if (this.monitorInterval) {
        clearInterval(this.monitorInterval);
        this.monitorInterval = null;
      }
    }
  }

  const scrollLock = new MobileScrollLock();

  const initLock = () => {
    scrollLock.lock();
    scrollLock.startMonitoring();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLock);
  } else {
    initLock();
  }

  window.mobileScrollLock = {
    lock: () => scrollLock.lock(),
    unlock: () => scrollLock.unlock(),
    isLocked: () => scrollLock.is
  };

  window.addEventListener('beforeunload', () => {
    scrollLock.stopMonitoring();
    scrollLock.unlock();
  });

  window.addEventListener('scroll', (e) => {
    if (scrollLock.isLocked) {
      window.scrollTo(0, scrollLock.scrollY);
    }
  }, { passive: true });

})();
