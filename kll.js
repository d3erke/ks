(function () {
  try {
    function dscr() {
      document.documentElement.style.overflow = 'hidden';
      if (document.body) document.body.style.overflow = 'hidden';
    }

    
    dscr();
    
    
    setInterval(dscr, 300);

  } catch (e) {
  }
})();
