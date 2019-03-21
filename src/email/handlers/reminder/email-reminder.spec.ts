import test from 'ava';
import {EmailReminder} from './email-reminder';
import {mock, instance} from 'ts-mockito';
import {EmailHandler} from '../email-handler';
import {TestEnvironment} from '../../../../test/test-environment';

const mockedEmailHandler = mock(EmailHandler);
let testEnvironment: TestEnvironment;

test.beforeEach(() => {
  testEnvironment = new TestEnvironment({
    classesToBind: [EmailReminder],
    classesToMock: [{real: EmailHandler, mock: instance(mockedEmailHandler)}],
  });
});

test('should reject if toEmail is not an email', async t => {
  const emailReminder = testEnvironment.get<EmailReminder>(EmailReminder);

  const invalidEmails = ['ss.com', '@hotmail', 'aaa', '112345', 'i@b'];

  await invalidEmails.forEach(async invalidEmail => {
    try {
      await emailReminder.send(invalidEmail, {itemList: [{}]});
      t.fail();
    } catch (e) {
      t.is(e, `toEmail must be a valid email`);
    }
  });
});

test('should reject if options.itemList is empty', async t => {
  const emailReminder = testEnvironment.get<EmailReminder>(EmailReminder);
  try {
    await emailReminder.send('valid@email.com', {itemList: []});
    t.fail();
  } catch (e) {
    t.is(e, `options.itemList is empty`);
  }
});
