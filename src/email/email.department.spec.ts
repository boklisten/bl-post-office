import test from 'ava';
import {mock, when, instance, capture} from 'ts-mockito';

import {EmailDepartment} from './email.department';
import {EmailReminder} from './handlers/reminder/email-reminder';
import {EmailBroker} from './broker/email.broker';
import {Recipient} from '../interfaces/reciptient';
import {MessageOptions} from '../interfaces/message-options';
import {TestEnvironment} from '../../test/test-environment';

const mockedEmailBroker = mock(EmailBroker);
const mockedEmailReminder = mock(EmailReminder);

const dummyRecipients: Recipient[] = [{email: 'valid@email.com'}];
const dummyOptions: MessageOptions = {
  type: 'reminder',
  subtype: 'partly-payment',
};
const dummyHtml = '<html></html>';
const dummySubject = 'a reminder';
const dummyEmail = 'valid@email.com';

const dummyFromEmail = 'some@email.com';

when(
  mockedEmailBroker.send(dummySubject, dummyFromEmail, dummySubject, dummyHtml),
).thenResolve(true);
when(mockedEmailReminder.send(dummyRecipients[0], dummyOptions)).thenResolve(
  true,
);

const testEnvironment = new TestEnvironment({
  classesToBind: [EmailDepartment],
  classesToMock: [
    {real: EmailBroker, mock: instance(mockedEmailBroker)},
    {real: EmailReminder, mock: instance(mockedEmailReminder)},
  ],
});

test('should reject if "options.type" is not supported', async t => {
  const emailDepartment = testEnvironment.get<EmailDepartment>(EmailDepartment);
  const notSupportedTypes = ['badType', 'typeORama'];

  await notSupportedTypes.forEach(async (randomType: any) => {
    try {
      await emailDepartment.send(dummyRecipients, {
        type: randomType,
        subtype: 'partly-payment',
      });
      t.fail();
    } catch (e) {
      t.is(e, `options.type "${randomType}" not supported`);
    }
  });
});

test('should call EmailReminder if option.type = "reminder"', async t => {
  const emailDepartment = testEnvironment.get<EmailDepartment>(EmailDepartment);
  const res = await emailDepartment.send(dummyRecipients, dummyOptions);
  const args = capture(mockedEmailReminder.send).last();

  t.is(args[0], dummyRecipients[0]);
  t.is(args[1], dummyOptions);
  t.true(res);
});
