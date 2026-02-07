(function () {
  try {
    function dscr() {
      const style = [
        'overflow:hidden !important',
        'position:fixed !important',
        'width:100% !important',
        'height:100% !important',
        'top:0 !important',
        'left:0 !important'
      ].join(';');
      
      document.documentElement.setAttribute('style', style);
      if (document.body) {
        document.body.setAttribute('style', style);
      }
    }

    function preventScroll(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    const events = ['wheel', 'touchmove', 'scroll', 'mousewheel', 'DOMMouseScroll'];
    events.forEach(event => {
      window.addEventListener(event, preventScroll, { passive: false, capture: true });
      document.addEventListener(event, preventScroll, { passive: false, capture: true });
    });

    window.addEventListener('keydown', function(e) {
      const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
      if (keys.includes(e.keyCode)) {
        e.preventDefault();
        return false;
      }
    }, { passive: false, capture: true });

    dscr();
    setInterval(dscr, 100);

  } catch (e) {

  }
})();
