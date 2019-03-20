import {mainHeader} from './email/templates/header/main-header';
import {PostOffice} from './post-office';
const heml = require('heml');

const options: any = {
  validate: 'soft',
  cheerio: {},
  juice: {},
  beautify: {},
  elements: [],
};

const postOffice = new PostOffice();

postOffice
  .sendReceipt([{name: 'A name'}], {})
  .then(res => {
    console.log('we did it!', res);
  })
  .catch(e => {
    console.log('what the hell', e);
  });
