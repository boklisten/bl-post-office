import test from 'ava';
import {mock, when, instance, capture, reset, resetCalls} from 'ts-mockito';

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
const dummyEmail = 'dummy@email.com';
const dummyFromEmail = 'some@email.com';

const testEnvironment = new TestEnvironment({
  classesToBind: [EmailDepartment],
  classesToMock: [
    {real: EmailBroker, mock: instance(mockedEmailBroker)},
    {real: EmailReminder, mock: instance(mockedEmailReminder)},
  ],
});

test('should reject if "options.type" is not supported', async t => {
  when(
    mockedEmailBroker.send(
      dummySubject,
      dummyFromEmail,
      dummySubject,
      dummyHtml,
    ),
  ).thenResolve(true);

  when(mockedEmailReminder.send(dummyRecipients[0], dummyOptions)).thenResolve(
    true,
  );
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
  let recipients = [{email: 'test@email.com'}];

  when(
    mockedEmailBroker.send(
      dummySubject,
      dummyFromEmail,
      dummySubject,
      dummyHtml,
    ),
  ).thenResolve(true);

  const emailReminderResponse = 'this is the response';

  when(mockedEmailReminder.send(recipients[0], dummyOptions)).thenResolve(
    emailReminderResponse as any,
  );

  const emailDepartment = testEnvironment.get<EmailDepartment>(EmailDepartment);
  const res = await emailDepartment.send(recipients, dummyOptions);

  const [recipientArg, optionsArg] = capture(mockedEmailReminder.send).first();

  t.is(recipientArg, recipients[0]);
  t.is(optionsArg, dummyOptions);
  t.true(res);
});

test('should send reminder to all recipients', async t => {
  const emailDepartment = testEnvironment.get<EmailDepartment>(EmailDepartment);

  const recipients: Recipient[] = [
    {
      email: 'thisIsEmail1@email.com',
    },
    {
      email: 'thisIsEmail2@email.com',
    },
    {
      email: 'thisIsEmail3@email.com',
    },
  ];

  const messageOptions: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
  };

  when(mockedEmailReminder.send(recipients[0], messageOptions)).thenResolve(
    `sent email to ${recipients[0].email}` as any,
  );
  when(mockedEmailReminder.send(recipients[1], messageOptions)).thenResolve(
    `sent email to ${recipients[1].email}` as any,
  );
  when(mockedEmailReminder.send(recipients[2], messageOptions)).thenResolve(
    `sent email to ${recipients[2].email}` as any,
  );

  const res = await emailDepartment.send(recipients, messageOptions);

  const [recipient1, messageOptions1] = capture(
    mockedEmailReminder.send,
  ).byCallIndex(1);

  const [recipient2, messageOptions2] = capture(
    mockedEmailReminder.send,
  ).byCallIndex(2);

  const [recipient3, messageOptions3] = capture(
    mockedEmailReminder.send,
  ).byCallIndex(3);

  t.is(recipient1, recipients[0]);
  t.is(recipient2, recipients[1]);
  t.is(recipient3, recipients[2]);
});
