import test from 'ava';
import {
  mock,
  when,
  verify,
  instance,
  capture,
  reset,
  resetCalls,
} from 'ts-mockito';

import {EmailDepartment} from './email.department';
import {EmailReminder} from './handlers/reminder/email-reminder';
import {EmailBroker} from './broker/email.broker';
import {Recipient} from '../interfaces/reciptient';
import {MessageOptions} from '../interfaces/message-options';
import {TestEnvironment} from '../../test/test-environment';
import {EMAIL_SETTINGS} from './email-settings';

let mockedEmailBroker: EmailBroker;
let mockedEmailReminder: EmailReminder;
const dummyRecipients: Recipient[] = [
  {email: 'valid@email.com', message_id: '123', user_id: '123'},
];
const dummyOptions: MessageOptions = {
  type: 'reminder',
  subtype: 'partly-payment',
};
const dummyHtml = '<html></html>';
const dummySubject = 'a reminder';
const dummyEmail = 'dummy@email.com';
const dummyFromEmail = 'some@email.com';
const dummyContent = {
  to: 'valid@email.com',
  from: 'some@email.com',
  fromName: EMAIL_SETTINGS.name,
  subject: 'some valid subject',
  html: '<html></html>',
  message_id: '123',
  user_id: '123',
  type: 'reminder',
  subtype: 'partly-payment',
};

let testEnvironment: TestEnvironment;

test.beforeEach(() => {
  mockedEmailBroker = mock(EmailBroker);
  mockedEmailReminder = mock(EmailReminder);

  testEnvironment = new TestEnvironment({
    classesToBind: [EmailDepartment],
    classesToMock: [
      {real: EmailBroker, mock: instance(mockedEmailBroker)},
      {real: EmailReminder, mock: instance(mockedEmailReminder)},
    ],
  });
});

test('should reject if "options.type" is not supported', async t => {
  when(mockedEmailBroker.send(dummyContent)).thenResolve(true);

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

test.serial(
  'should call EmailReminder if option.type = "reminder"',
  async t => {
    let recipients: Recipient[] = [
      {email: 'test@email.com', user_id: '123', message_id: '123'},
    ];

    when(mockedEmailBroker.send(dummyContent)).thenResolve(true);

    const emailReminderResponse = 'this is the response';

    reset(mockedEmailReminder);

    when(mockedEmailReminder.send(recipients[0], dummyOptions)).thenResolve(
      emailReminderResponse as any,
    );

    const emailDepartment = testEnvironment.get<EmailDepartment>(
      EmailDepartment,
    );
    const res = await emailDepartment.send(recipients, dummyOptions);

    const [recipientArg, optionsArg] = capture(mockedEmailReminder.send).last();

    t.is(recipientArg, recipients[0]);
    t.is(optionsArg, dummyOptions);
    t.true(res);
  },
);

test.serial(
  'should not send email to recipient if it has mediumOverride.email set to false',
  async t => {
    const emailDepartment = testEnvironment.get<EmailDepartment>(
      EmailDepartment,
    );
    let recipients: Recipient[] = [
      {
        email: 'tester@email.com',
        mediumOverrides: {email: false},
        user_id: '123',
        message_id: '123',
      },
    ];

    const messageOptions: MessageOptions = {
      type: 'reminder',
      subtype: 'partly-payment',
    };

    when(mockedEmailReminder.send(recipients[0], messageOptions)).thenResolve(
      `this is a response` as any,
    );

    try {
      await emailDepartment.send(recipients, messageOptions);
    } catch (e) {}

    verify(mockedEmailReminder.send(recipients[0], messageOptions)).never();
    t.pass();
  },
);

test.serial('should send reminder to all recipients', async t => {
  const emailDepartment = testEnvironment.get<EmailDepartment>(EmailDepartment);
  const recipients: Recipient[] = [
    {
      email: 'thisIsEmail1@email.com',
      user_id: '123',
      message_id: '123',
    },
    {
      email: 'thisIsEmail2@email.com',
      user_id: '124',
      message_id: '124',
    },
    {
      email: 'thisIsEmail3@email.com',
      user_id: '125',
      message_id: '125',
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
  ).byCallIndex(0);

  const [recipient2, messageOptions2] = capture(
    mockedEmailReminder.send,
  ).byCallIndex(1);

  const [recipient3, messageOptions3] = capture(
    mockedEmailReminder.send,
  ).byCallIndex(2);

  t.is(recipient1, recipients[0]);
  t.is(recipient2, recipients[1]);
  t.is(recipient3, recipients[2]);
});
