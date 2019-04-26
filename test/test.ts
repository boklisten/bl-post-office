import {PostOffice} from '../src/post-office';
import * as winston from 'winston';
import {TestEnvironment} from './test-environment';
import {Recipient} from '../src/interfaces/reciptient';
import {logger} from '../src/logger';

const testEnvironment = new TestEnvironment();
const postOffice = testEnvironment.get<PostOffice>(PostOffice);

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
  {
    email: 'aholskil@gmail',
    //phone: '+4791804211',
    user_id: '432',
    message_id: '889123hjhajsalkaks88cla80das',
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

postOffice.setConfig({reminder: {mediums: {email: true, sms: false}}});

postOffice
  .send(recipients, {
    type: 'reminder',
    subtype: 'partly-payment',
  })
  .then(res => {
    logger.info('reminder sent: ', res);
  })
  .catch(e => {
    logger.error(e);
  });
