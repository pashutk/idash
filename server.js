const ip = require('./ip');
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

  res.end();
}

function run() {
  const server = http.createServer(requestHandler);
  server.listen(8989);
}

module.exports = {
  run,
};
