(function () {
  alert('Bu site süresiz olarak kapatılmıştır.');

  const killHTML = `
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        background: #000;
        overflow: hidden;
      }
    </style>
  `;

  function kill() {
    document.body.innerHTML = killHTML;
  }

  // DOM hazır olunca çalış
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', kill);
  } else {
    kill();
  }

  // BODY geri gelirse tekrar sil
  const observer = new MutationObserver(() => {
    observer.disconnect();   // 🔑 loop’u kır
    kill();
    observer.observe(document.body, { childList: true, subtree: true });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
