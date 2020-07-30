const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Abdul Kader Patanwala (AKP)'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Abdul Kader Patanwala (AKP)'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Abdul Kader Patanwala (AKP)'
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: 'You must provide an address.'
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      console.log(location);
      console.log(forecastData);
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });

  /* if (!req.query.address) {
    return res.send({
      error: 'You must provide an address.'
    });
  }
  res.send({
    forecast: 'It is raining',
    location: 'Pune',
    address: req.query.address
  }); */
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Abdul Kader Patanwala (AKP)',
    errorMessage: 'Help article not found.'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Abdul Kader Patanwala (AKP)',
    errorMessage: 'Page not found.'
  })
});

app.listen(port, () => {
  // nodemon src/server.js -e hbs,js
  console.log(`Server is listening on localhost:${port}, open your browser on http://localhost:${port}`);
});