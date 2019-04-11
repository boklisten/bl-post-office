import {PostOffice} from '../src/post-office';
import * as winston from 'winston';

import {TestEnvironment} from './test-environment';
import {Recipient} from '../src/interfaces/reciptient';
import {logger} from '../src/logger';

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

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }),
);

postOffice
  .send(recipients, {
    type: 'reminder',
    subtype: 'partly-payment',
  })
  .then(res => {
    logger.warn('email sent: ', res);
  })
  .catch(e => {
    logger.error(e);
  });
