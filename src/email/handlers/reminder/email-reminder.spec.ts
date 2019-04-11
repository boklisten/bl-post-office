import test from 'ava';
import {EmailReminder} from './email-reminder';
import {mock, instance, when, verify, capture} from 'ts-mockito';
import {TestEnvironment} from '../../../../test/test-environment';
import {EmailBroker} from '../../broker/email.broker';
import {EmailTemplateResolver} from '../../email-template-resolver';
import {EMAIL_SETTINGS} from '../../email-settings';
import {
  MessageOptions,
  MessageType,
  MessageSubtype,
} from '../../../interfaces/message-options';
import {Recipient} from '../../../interfaces/reciptient';

const mockedEmailBroker = mock(EmailBroker);
const mockedEmailTemplateResolver = mock(EmailTemplateResolver);
let testEnvironment: TestEnvironment;

test.beforeEach(() => {
  testEnvironment = new TestEnvironment({
    classesToBind: [EmailReminder],
    classesToMock: [
      {real: EmailBroker, mock: instance(mockedEmailBroker)},
      {
        real: EmailTemplateResolver,
        mock: instance(mockedEmailTemplateResolver),
      },
    ],
  });
});

test('should reject if toEmail is not an email', async t => {
  const emailReminder = testEnvironment.get<EmailReminder>(EmailReminder);
  const invalidEmails = ['ss.com', '@hotmail', 'aaa', '112345', 'i@b'];

  await invalidEmails.forEach(async invalidEmail => {
    try {
      await emailReminder.send(
        {email: invalidEmail},
        {type: 'reminder', subtype: 'partly-payment'},
      );
      t.fail();
    } catch (e) {
      t.is(e, `toEmail must be a valid email`);
    }
  });
});

test('should reject if options.type is not "reminder"', async t => {
  const emailReminder = testEnvironment.get<EmailReminder>(EmailReminder);
  const invalidType = 'sdfjalkd';

  try {
    await emailReminder.send(
      {email: 'some@email.com'},
      {type: invalidType as MessageType, subtype: 'partly-payment'},
    );
    t.fail();
  } catch (e) {
    t.is(e, `type "${invalidType}" is not "reminder"`);
  }
});

test('should reject if options.subtype is not supported', async t => {
  const emailReminder = testEnvironment.get<EmailReminder>(EmailReminder);
  const invalidSubtypes = ['sdfa', 'lalkakl', undefined, 123];

  await invalidSubtypes.forEach(async invalidSubtype => {
    try {
      await emailReminder.send(
        {email: 'some@email.com'},
        {type: 'reminder', subtype: invalidSubtype as MessageSubtype},
      );
      t.fail();
    } catch (e) {
      t.is(e, `subtype "${invalidSubtype}" not supported`);
    }
  });
});

test('should reject if options.itemList is empty', async t => {
  const emailReminder = testEnvironment.get<EmailReminder>(EmailReminder);
  try {
    await emailReminder.send(
      {email: 'valid@email.com'},
      {type: 'reminder', subtype: 'partly-payment'},
    );
    t.fail();
  } catch (e) {
    t.is(e, `recipient.itemList.items is empty or undefined`);
  }
});

test('should call emailTemplateResolver with correct type and subtype', async t => {
  const emailReminder = testEnvironment.get<EmailReminder>(EmailReminder);
  const mockedTemplate =
    '<html><head></head><body><p>email reminder test</p></body</html>';

  const recipient: Recipient = {
    email: 'some@email.com',
    itemList: {
      summary: {total: '0', totalTax: '0', taxPercentage: '20%'},
      items: [
        {
          id: '123',
          title: 'some title',
          deadline: '10.10.2010',
          leftToPay: '0kr',
        },
      ],
    },
  };

  const options: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
  };

  when(mockedEmailTemplateResolver.generate(options)).thenReturn(
    mockedTemplate,
  );

  when(
    mockedEmailBroker.send(
      recipient.email as string,
      EMAIL_SETTINGS.reminder.subject,
      mockedTemplate,
    ),
  ).thenResolve(true);

  try {
    const res = await emailReminder.send(recipient, options);
  } catch (e) {
    t.fail(e);
  }

  const [emailTemplateResolverArg] = capture(
    mockedEmailTemplateResolver.generate,
  ).last();

  const [toEmailArg, subjectArg, templateArg] = capture(
    mockedEmailBroker.send,
  ).last();

  t.is(emailTemplateResolverArg, options);
  t.is(toEmailArg, recipient.email);
  t.is(subjectArg, EMAIL_SETTINGS.reminder.subject);
  t.is(templateArg, mockedTemplate);
});
