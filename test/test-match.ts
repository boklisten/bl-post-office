import {PostOffice} from '../src/post-office';
import {TestEnvironment} from './test-environment';
import {Recipient} from '../src/interfaces/reciptient';
import {logger} from '../src/logger';

const testEnvironment = new TestEnvironment();
const postOffice = testEnvironment.get<PostOffice>(PostOffice);

const recipients: Recipient[] = [
  {
    email: 'aholskil@gmail.com',
    user_id: '432',
    message_id: '889123hjhajsalkaks88cla80das',
    phone: '+4791804211',
    mediumOverrides: {sms: false},
    settings: {
      text: {
        deadline: '20.12.19',
      },
    },
  },
];

postOffice.setConfig({
  reminder: {mediums: {email: false, sms: false}},
  generic: {mediums: {email: false}},
  receipt: {mediums: {email: false}},
  match: {mediums: {email: false, sms: true}},
});

postOffice
  .send(recipients, {
    type: 'match',
    subtype: 'none',
    sequence_number: 0,
    mediums: {sms: true},
  })
  .then(res => {
    logger.info('sent match sms: ' + res);
  })
  .catch(e => {
    logger.error('failed to send match sms: ' + e);
  });
