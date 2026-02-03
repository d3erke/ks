<style>
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
    overflow: hidden !important;
    -webkit-overflow-scrolling: auto !important;
  }

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

  @supports (-webkit-touch-callout: none) {
    html::before {
      position: fixed;
    }
  }
</style>
