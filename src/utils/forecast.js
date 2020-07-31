const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=61b0c59580775f144a0c6b91b41874f0&query=${latitude},${longitude}&units=m`;

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to weather services!');
    } else if (body.error) {
      callback('Location not found.');
    } else {
      const data = body.current;
      callback(undefined, data);
    }
  });
};

module.exports = forecast;