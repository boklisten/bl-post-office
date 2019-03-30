import test from 'ava';
import {EmailReminder} from './email-reminder';
import {mock, instance} from 'ts-mockito';
import {TestEnvironment} from '../../../../test/test-environment';
import {EmailBroker} from '../../broker/email.broker';

const mockedEmailHandler = mock(EmailBroker);
let testEnvironment: TestEnvironment;

test.beforeEach(() => {
  testEnvironment = new TestEnvironment({
    classesToBind: [EmailReminder],
    classesToMock: [{real: EmailBroker, mock: instance(mockedEmailHandler)}],
  });
});

test('should reject if toEmail is not an email', async t => {
  const emailReminder = testEnvironment.get<EmailReminder>(EmailReminder);
  const invalidEmails = ['ss.com', '@hotmail', 'aaa', '112345', 'i@b'];

  await invalidEmails.forEach(async invalidEmail => {
    try {
      await emailReminder.send({email: invalidEmail}, {type: 'reminder'});
      t.fail();
    } catch (e) {
      t.is(e, `toEmail must be a valid email`);
    }
  });
});

test('should reject if options.itemList is empty', async t => {
  const emailReminder = testEnvironment.get<EmailReminder>(EmailReminder);
  try {
    await emailReminder.send({email: 'valid@email.com'}, {type: 'reminder'});
    t.fail();
  } catch (e) {
    t.is(e, `recipient.itemList.items is empty or undefined`);
  }
});
