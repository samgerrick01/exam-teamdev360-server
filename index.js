const express = require('express');
const cors = require('cors');
const figlet = require('figlet');
const gradient = require('gradient-string');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

app.get('/', (re, res) => {
  return res.json('From Backend Side');
});

app.post('/attractions', (req, res) => {
  const { keyword } = req.body;
  axios
    .get(
      `https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${keyword}&apikey=${process.env.API_KEY}`
    )
    .then((response) => {
      res.send(response.data._embedded.attractions);
    })
    .catch((err) => {
      res.send([]);
    });
});

app.listen(5000, () => {
  console.log(
    gradient.mind(figlet.textSync('Sam Gerrick', { horizontalLayout: 'full' }))
  );
});
