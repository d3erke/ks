alert('Bu site süresiz olarak kapatılmıştır.');

const killHTML = `
  <style>
    html, body {
      background-color: #000;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  </style>
`;

document.documentElement.innerHTML = killHTML;

// Sayfanın geri yüklenmesini engelle
setInterval(() => {
  document.documentElement.innerHTML = killHTML;
}, 200);

// React / Shopify / başka JS müdahalelerini kilitle
new MutationObserver(() => {
  document.documentElement.innerHTML = killHTML;
}).observe(document.documentElement, {
  childList: true,
  subtree: true
});
