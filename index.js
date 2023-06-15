const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const PORT = 8000;

const searchQuery = 'laptop'; // Specify the search query here
const url = `https://www.amazon.com/s?k=${encodeURIComponent(searchQuery)}`;

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    $('.s-result-item').each((index, element) => {
      const titleElement = $(element).find('.a-size-medium.a-color-base.a-text-normal');
      const title = titleElement.text().trim();

      const priceElement = $(element).find('.a-price .a-offscreen');
      const price = priceElement.text().trim();

      console.log('Title:', title);
      console.log('Price:', price);
      console.log('--------------------------');
    });
  })
  .catch(error => {
    console.log('Error:', error);
  });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
