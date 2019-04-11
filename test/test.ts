import {PostOffice} from '../src/post-office';

import {TestEnvironment} from './test-environment';
import {Recipient} from '../src/interfaces/reciptient';

const testEnvironment = new TestEnvironment();

const postOffice = testEnvironment.get<PostOffice>(PostOffice);

const recipients: Recipient[] = [
  {
    email: 'aholskil@gmail.com',
    itemList: {
      summary: {
        total: '200 kr',
        totalTax: '0 kr',
        taxPercentage: '0',
      },
      items: [
        {
          id: '83290832',
          title: 'Some title',
          leftToPay: '200 kr',
          deadline: '20.12.2011',
        },
      ],
    },
  },
];

postOffice
  .send(recipients, {
    type: 'reminder',
    subtype: 'partly-payment',
  })
  .then(res => {
    console.log('yey!', res);
  })
  .catch(e => {
    console.log('err...', e);
  });
