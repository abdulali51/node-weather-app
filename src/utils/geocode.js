const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYWJkdWxhbGk1MSIsImEiOiJja2Q0MmUwaXQxMjB4Mnpud2FtcnFwMmltIn0.AIMuAqNkFxlmiUnoOcqdig&limit=1`;

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to location services!');
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.');
    } else {
      const data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      };
      callback(undefined, data);
    }
  });
};

module.exports = geocode;

