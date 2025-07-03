alert("Bu site ödenmemiş web geliştirme ücretleri nedeniyle devre dışı bırakıldı!");

document.body.innerHTML = "";
document.head.innerHTML = "";

document.write(`
  <style>
    html, body {
      background-color: #000;
      color: #f00;
      margin: 0;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial, sans-serif;
    }
    h1 {
      font-size: 2rem;
      text-align: center;
      max-width: 90%;
    }
  </style>
  <h1>Bu site ödenmemiş web geliştirme ücretleri nedeniyle devre dışı bırakıldı!</h1>
`);
