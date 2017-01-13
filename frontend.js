const fs = require('fs');


function getScript() {
  const greenIPs = process.env.IDASH_GREEN_IPS;
  let script = fs.readFileSync('script.js', { encoding: 'utf8' });

  if (greenIPs) {
    const ips = greenIPs.split(',').map((ip) => `'${ip}'`).join(',');
    script = script.replace('// place green ips here', ips);
  };
  return script;
}

function getIndexPage() {
  return fs.readFileSync('index.html', { encoding: 'utf8' });
}

module.exports = {
  getIndexPage,
  getScript,
};
