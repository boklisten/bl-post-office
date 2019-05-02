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
    itemList: {
      summary: {
        total: '560 kr',
        totalTax: '0 kr',
        taxPercentage: '0',
      },
      items: [
        {
          id: '83290832',
          title: 'Some title',
          leftToPay: '100 kr',
          deadline: '20.12.2011',
        },
      ],
    },
  },
];

const messageOptions: MessageOptions = {
  type: 'reminder',
  subtype: 'rent',
  sequence_number: 0,
};

postOffice.setConfig({reminder: {mediums: {email: true}}});

postOffice
  .send(recipients, messageOptions)
  .then(res => {
    console.log('IT WORKS, RES:', res);
  })
  .catch(err => {
    console.log('IT WORKS, BUT ERROR', err);
  });
