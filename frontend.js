const fs = require('fs');
const indexPageTemplate = fs.readFileSync('index.html', { encoding: 'utf8' });

function getIndexPage() {
  return indexPageTemplate;
}

module.exports = {
  getIndexPage,
};
