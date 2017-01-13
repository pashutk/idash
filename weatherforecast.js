const http = require('http');
const apiKey = process.env.OPENWEATHERMAP_API_KEY;
const region = process.env.IDASH_WEATHER_REGION || 'Moscow';

if (!apiKey) {
  throw new Error('OPENWEATHERMAP_API_KEY needed');
}

function getForecast() {
  return new Promise((resolve, reject) => {
    http.get(`http://api.openweathermap.org/data/2.5/weather?q=${region}&units=metric&appid=${apiKey}`, (response) => {
      let body = '';
      response.on('data', (d) => body += d);
      response.on('end', () => {
          var parsed = JSON.parse(body);
          resolve(parsed);
      });
    });
  });
}

module.exports = {
  getForecast,
};
