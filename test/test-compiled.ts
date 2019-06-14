import {PostOffice} from '../dist/index';
import {postOffice} from '../dist/index';
import {Recipient} from '../dist/index';
import {MessageOptions} from '../dist/index';

const recipients: Recipient[] = [
  {
    email: 'andreasholskil@protonmail.com',
    //    phone: '+4791804211',
    user_id: '123',
    message_id: 'aA891AAsdjkldfa19289x',
  },
];

const messageOptions: MessageOptions = {
  type: 'generic',
  subtype: 'none',
  htmlContent: '<p>Hello there from test<p>',
  mediums: {email: true},
  subject: 'This is a test',
};

postOffice.setConfig({
  reminder: {mediums: {email: true}},
  generic: {mediums: {email: true}},
});

postOffice
  .send(recipients, messageOptions)
  .then(res => {
    console.log('IT WORKS, RES:', res);
  })
  .catch(err => {
    console.log('IT WORKS, BUT ERROR', err);
  });
