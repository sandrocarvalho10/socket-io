// @ts-ignore 
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000!');
});