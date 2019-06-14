import test from 'ava';
import {EmailGeneric} from './email-generic';
import {TestEnvironment} from '../../../../test/test-environment';
import {EmailBroker} from '../../broker/email.broker';
import {EmailTemplateResolver} from '../../email-template-resolver';
import {EmailTemplateInput} from '../../../interfaces/emailTemplateInput';
import {EMAIL_SETTINGS} from '../../email-settings';
import {
  MessageOptions,
  MessageType,
  MessageSubtype,
} from '../../../interfaces/message-options';
import {Recipient} from '../../../interfaces/reciptient';
import {EmailContent} from '../../email-content';
import {
  mock,
  instance,
  when,
  verify,
  capture,
  anyOfClass,
  anything,
} from 'ts-mockito';

const mockedEmailBroker = mock(EmailBroker);
const mockedEmailTemplateResolver = mock(EmailTemplateResolver);

let testEnvironment: TestEnvironment;

test.beforeEach(() => {
  testEnvironment = new TestEnvironment({
    classesToBind: [EmailGeneric],
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
  const emailGeneric = testEnvironment.get<EmailGeneric>(EmailGeneric);
  const invalidEmails = ['ss.com', '@hotmail', 'aaa', '112345', 'i@b'];

  await invalidEmails.forEach(async invalidEmail => {
    t.throwsAsync(
      emailGeneric.send(
        {email: invalidEmail, user_id: '123', message_id: '123'},
        {type: 'generic', subtype: 'none'},
      ),
      {
        instanceOf: TypeError,
        message: `toEmail "${invalidEmail}" is not a valid email`,
      },
    );
  });
});

test('should reject if options.htmlContent is undefined', async t => {
  const emailGeneric = testEnvironment.get<EmailGeneric>(EmailGeneric);
  const recipient: Recipient = {
    user_id: 'abc',
    message_id: '123',
    email: 'test@boklisten.co',
  };
  const options: MessageOptions = {
    type: 'generic',
    subtype: 'none',
    subject: 'hello',
  };

  await t.throwsAsync(emailGeneric.send(recipient, options), {
    instanceOf: ReferenceError,
    message: /options.htmlContent is not defined/,
  });
});

test('should reject if options.subtype is not supported', async t => {
  const emailGeneric = testEnvironment.get<EmailGeneric>(EmailGeneric);
  const recipient: Recipient = {
    user_id: 'abc',
    message_id: '123',
    email: 'test@boklisten.co',
  };
  const options: MessageOptions = {
    type: 'generic',
    subtype: 'rent',
    htmlContent: '<p></p>',
    subject: 'hi',
  };

  await t.throwsAsync(emailGeneric.send(recipient, options), {
    instanceOf: TypeError,
    message: /subtype "rent" is not supported on type "generic"/,
  });
});

test('should reject if options.subject is not defined', async t => {
  const emailGeneric = testEnvironment.get<EmailGeneric>(EmailGeneric);
  const recipient: Recipient = {
    user_id: 'abc',
    message_id: '123',
    email: 'test@boklisten.co',
  };
  const options: MessageOptions = {
    type: 'generic',
    subtype: 'none',
    htmlContent: '<p></p>',
  };

  await t.throwsAsync(emailGeneric.send(recipient, options), {
    instanceOf: ReferenceError,
    message: /options.subject is not defined/,
  });
});

test.serial('should call emailBroker with correct input', async t => {
  const emailGeneric = testEnvironment.get<EmailGeneric>(EmailGeneric);

  const recipient: Recipient = {
    email: 'test@boklisten.co',
    user_id: '123',
    message_id: '123',
  };

  const options: MessageOptions = {
    type: 'generic',
    subtype: 'none',
    sequence_number: 0,
    htmlContent: '<p>Hello this is a html content</p>',
    subject: 'Hello from us',
  };

  const emailTemplateInput = {
    itemList: recipient.itemList,
    textBlocks: options.textBlocks,
  };

  when(mockedEmailBroker.send(anything())).thenResolve(true);

  try {
    const res = await emailGeneric.send(recipient, options);
  } catch (e) {
    t.fail(e);
  }

  const [
    emailTemplateResolverOptionArg,
    emailTemplateResolverInputArg,
  ] = capture(mockedEmailTemplateResolver.generate).last();

  const [emailContentArg] = capture(mockedEmailBroker.send).last();

  t.is(emailTemplateResolverOptionArg, options);
  t.is(emailContentArg.to, recipient.email);
  t.is(emailContentArg.from, EMAIL_SETTINGS.generic.fromEmail);
  t.is(emailContentArg.subject, options.subject);
  t.regex(
    emailTemplateResolverInputArg.htmlContent as string,
    new RegExp('<p>Hello this is a html content</p>', 'gim'),
  );
});
