// archivo: proxy.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.get('/estado/:token', async (req, res) => {
  const { token } = req.params;
  const url = `https://ride4me.io?t=${token}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Eliminar logo o nombre de empresa
    $('img.logo').remove();
    $('footer, header, .brand').remove();
    $('title').text('Estado del Viaje');

    res.send($.html());
  } catch (err) {
    res.status(500).send('Error al cargar el estado');
  }
});

app.listen(3000, () => {
  console.log('Servidor proxy escuchando en http://localhost:3000');
});
