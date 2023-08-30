const express = require('express');
const request = require('request-promise');
const app = express();
const PORT = process.env.PORT || 500;

const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

//to parse  json input
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Amazon Scraper API.');
});

//GET - products details
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params;
  const { api_Key } = req.params;
  try {
    const response = await request(
      `${generateScraperUrl(
        api_Key
      )}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//GET - products reviews
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params;
  const { api_Key } = req.params;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_Key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//GET - products offers
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params;
  const { api_Key } = req.params;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_Key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

//GET - Amazon search results
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const { api_Key } = req.params;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_Key
      )}&url=https://www.amazon.com/s?k=${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`App listening on PORT#${PORT}`));
