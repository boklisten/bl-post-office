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
    settings: {
      text: {
        deadline: '20. Desember',
      },
      display: {
        leftToPay: true,
        payment: true,
        deadline: true,
        delivery: true,
      },
    },
    payment: {
      total: '560 NOK',
      totalPayed: '100 NOK',
      reservation: false,
      payments: [
        {
          id: 'x81nda9ACXxLq',
          method: 'VISA',
          status: 'confirmed',
          amount: '660 NOK',
          cardNumber: '****0124',
        },
      ],
    },
    order: {
      id: 'i8cLc18261vAl',
    },
    delivery: {
      address: 'Trondheimsveien 10 G',
      expectedDeliveryDate: '10.08.19',
      method: 'BRING',
      unitPrice: '75 NOK',
      total: '100 NOK',
      taxPercentage: '25',
      totalTax: '25 NOK',
    },
    itemList: {
      summary: {
        total: '560 NOK',
        totalTax: '0 NOK',
        totalLeftToPay: '120 NOK',
        taxPercentage: '0',
        totalTaxLeftToPay: '0 NOK',
        taxPercentageLeftToPay: '0',
      },
      items: [
        {
          id: '83290832',
          title: 'A Song of Ice and Fire',
          action: 'delbetaling',
          amount: '560 NOK',
          leftToPay: '120 NOK',
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
    sequence_number: 0,
    mediums: {email: true},
  })
  .then(res => {
    logger.info('sent: ' + res);
  })
  .catch(e => {
    logger.error('some error:', e);
  });

/*
postOffice
  .send(recipients, {
    type: 'generic',
    subtype: 'all',
    subject: 'Hei fra oss',
    mediums: {email: true},
  })
  .then(res => {
    logger.info('sent: ' + res);
  })
  .catch(e => {
    logger.error(e);
  });

   */
