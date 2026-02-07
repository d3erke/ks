(function () {
  try {
    function disableScroll() {
      document.documentElement.style.overflow = 'hidden';
      if (document.body) document.body.style.overflow = 'hidden';
    }

    
    disableScroll();
    
    
    setInterval(disableScroll, 300);

  } catch (e) {
  }
})();
