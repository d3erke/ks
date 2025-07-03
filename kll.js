alert("Bu site ödenmemiş web geliştirme ücretleri nedeniyle devre dışı bırakıldı!");

document.documentElement.innerHTML = `
  <head>
    <title>Erişim Engellendi</title>
    <style>
      body {
        background-color: #111;
        color: #f00;
        font-family: Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
      h1 {
        font-size: 3rem;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>Erişim Engellendi</h1>
  </body>
`;
