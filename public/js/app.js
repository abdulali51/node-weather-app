console.log('Weather App Loaded.');

const weatherForm = document.querySelector('form');
const search = document.querySelector('#location');
const messageOne = document.querySelector('#msg-1');
const messageTwo = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  const location = search.value;
  const url = `/weather?address=${location}`;

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
      search.value = '';
    });
  });
});