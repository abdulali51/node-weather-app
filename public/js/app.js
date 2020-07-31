console.log('Weather App Loaded.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('#location');
const message = document.querySelector('#msg');
const forecastDiv = document.querySelector('#forecast-content');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  message.textContent = 'Loading...';
  forecastDiv.innerHTML = '';

  const location = search.value;
  const url = `/weather?address=${location}`;

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message.textContent = data.error;
      } else {
        message.textContent = '';
        generateWeatherCard(data);
      }
      search.value = '';
    });
  });
});

const generateWeatherCard = (data) => {
  const forecast = data.forecast;
  const template = `
    <div class="weather-card">
      <div class="weather-location">
        <img src="/img/icon-pin.png"> ${data.location}
      </div>
      <div class="weather-icon">
        <span>${forecast.weather_descriptions[0]}</span>
        <img src="${forecast.weather_icons[0]}">
      </div>
      <div class="weather-temp">
        <h1>${forecast.temperature}ºC</h1>
        <p>Feels like: ${forecast.feelslike}ºC</p>
      </div>
      <div class="weather-details">
        <span class="w-icons" title="Cloud Cover">
          <img src="/img/icon-cloud.png">${forecast.cloudcover}%
        </span>
        <span class="w-icons" title="Humidity">
          <img src="/img/icon-humidity.png">${forecast.humidity}%
        </span>
        <span class="w-icons" title="Wind Speed">
          <img src="img/icon-wind.png">${forecast.wind_speed}km/h
        </span>
        <span class="w-icons" title="Wind Direction">
          <img src="img/icon-wind-dir.png">${forecast.wind_dir}
        </span>
      </div>
    </div>
  `;
  forecastDiv.innerHTML += template;
};