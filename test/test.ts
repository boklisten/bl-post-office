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
  },
  /*
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
   */
];

postOffice.setConfig({
  reminder: {mediums: {email: true, sms: false}},
  generic: {mediums: {email: true}},
});

postOffice
  .send(recipients, {
    type: 'generic',
    subtype: 'all',
    subject: 'Hei fra oss',
    mediums: {email: true},
    htmlContent: '<p>Dette er en generisk melding</p>',
  })
  .then(res => {
    logger.info('sent: ' + res);
  })
  .catch(e => {
    logger.error(e);
  });
