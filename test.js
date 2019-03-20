

const heml = require('heml');
const mainHeader = require('./src/email/templates/header/main-header.js');

const options = {
  validate: 'soft',
  cheerio: {},
  juice: {},
  beautify: {},
  elements: []
};

heml(mainHeader, options).then(({html, metadata, errors}) => {
  console.log("the errors", errors);
  console.log("the metadata", metadata);
  console.log("the html", html);
});

