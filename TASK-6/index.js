const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Set the view engine correctly
app.set('view engine', 'ejs');

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (like CSS)
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('form', { weather: null, error: null });
});

app.post('/', async (req, res) => {
  const city = req.body.city;
  const apiKey = '18656385803980ca07b53f81f587df49';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const weather = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    };

    res.render('form', { weather, error: null });
  } catch (err) {
    res.render('form', { weather: null, error: 'City not found or invalid input' });
  }
});

app.listen(port, () => console.log(`✅ Server running on http://localhost:${port}`));
