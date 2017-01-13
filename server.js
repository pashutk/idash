const ip = require('./ip');
const weatherForecast = require('./weatherforecast');
const http = require('http');
const frontend = require('./frontend');


function requestHandler(req, res) {
  if (req.url === '/') {
    const page = frontend.getIndexPage();
    res.end(page);
    return;
  }

  if (req.url === '/ip') {
    ip.getCurrentIP()
        .then((data) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            const responseData = {
              ip: data
            };
            res.end(JSON.stringify(responseData));
        })
        .catch((e) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          const responseData = {
            error: e.message
          };
          res.end(JSON.stringify(responseData));
        });
    return;
  }

  if (req.url === '/wf') {
    weatherForecast.getForecast()
        .then((data) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        })
        .catch((e) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          const responseData = {
            error: e.message
          };
          res.end(JSON.stringify(responseData));
        });
    return;
  }

  if (req.url === '/script.js') {
    const script = frontend.getScript();
    res.end(script);
    return;
  }

  res.end();
}

function run() {
  const server = http.createServer(requestHandler);
  server.listen(8989);
}

module.exports = {
  run,
};
