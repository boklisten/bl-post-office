import {PostOffice} from '../src/post-office';
import * as winston from 'winston';
import {TestEnvironment} from './test-environment';
import {Recipient} from '../src/interfaces/reciptient';
import {logger} from '../src/logger';

const testEnvironment = new TestEnvironment();
const postOffice = testEnvironment.get<PostOffice>(PostOffice);

const recipients: Recipient[] = [
  /*
  {
    email: 'andreasholskil@protonmail.com',
    //    phone: '+4791804211',
    user_id: '123',
    message_id: 'aA891AAsdjkldfa19289x',
  },
   */
  {
    email: 'aholskil@gmail.com',
    //phone: '+4791804211',
    user_id: '432',
    message_id: '889123hjhajsalkaks88cla80das',
    itemList: {
      summary: {
        total: '560 NOK',
        totalTax: '0 NOK',
        totalLeftToPay: '100 NOK',
        taxPercentage: '0',
      },
      items: [
        {
          id: '83290832',
          title: 'A Song of Ice and Fire',
          action: 'delbetaling',
          amount: '560 NOK',
          leftToPay: '100 NOK',
          deadline: '20.12.2011',
        },
      ],
    },
  },
];

postOffice.setConfig({
  reminder: {mediums: {email: true, sms: false}},
  generic: {mediums: {email: true}},
  receipt: {mediums: {email: true}},
});

postOffice
  .send(recipients, {
    type: 'receipt',
    subtype: 'none',
    mediums: {email: true},
  })
  .then(res => {
    logger.info('sent: ' + res);
  })
  .catch(e => {
    logger.error(e);
  });
