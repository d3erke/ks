<style>
  /* Viewport'u garantiye al */
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
  }

  /* Siyah kaplama */
  body::before {
    content: "Bu site erişime kapalıdır";
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    z-index: 2147483647; /* max */
    pointer-events: all;
  }
</style>
