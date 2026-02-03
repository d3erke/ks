(function () {
  try {
    // Safari + Shopify için EN erken ve EN sert yöntem
    document.write(`
      <style>
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          height: 100% !important;
          background: #000 !important;
          overflow: hidden !important;
        }

        /* Her şeyi görünmez yap */
        body * {
          visibility: hidden !important;
        }

        /* Üstten siyah katman */
        html::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          z-index: 2147483647;
          pointer-events: all;
        }
      </style>
    `);
  } catch (e) {
    // sessiz
  }
})();
