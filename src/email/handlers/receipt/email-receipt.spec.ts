import test from 'ava';
import {EmailReceipt} from './email-receipt';
import {
  mock,
  instance,
  when,
  verify,
  capture,
  anyOfClass,
  anything,
} from 'ts-mockito';
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

const mockedEmailBroker = mock(EmailBroker);
const mockedEmailTemplateResolver = mock(EmailTemplateResolver);
let testEnvironment: TestEnvironment;

test.beforeEach(() => {
  testEnvironment = new TestEnvironment({
    classesToBind: [EmailReceipt],
    classesToMock: [
      {real: EmailBroker, mock: instance(mockedEmailBroker)},
      {
        real: EmailTemplateResolver,
        mock: instance(mockedEmailTemplateResolver),
      },
    ],
  });
});

test('should reject if subtype is not supported', async t => {
  const emailReceipt = testEnvironment.get<EmailReceipt>(EmailReceipt);

  await t.throwsAsync(
    emailReceipt.send(
      {email: 'test@boklisten.co', user_id: '123', message_id: '123'},
      {type: 'receipt', subtype: 'someRandomType' as any},
    ),
    {
      instanceOf: TypeError,
      message: /subtype "someRandomType" is not supported/,
    },
  );
});

test('should reject if recipient is undefined', async t => {
  const emailReceipt = testEnvironment.get<EmailReceipt>(EmailReceipt);

  await t.throwsAsync(
    emailReceipt.send(undefined as any, {type: 'receipt', subtype: 'none'}),
    {instanceOf: ReferenceError, message: /recipient is not defined/},
  );
});

test('should reject if recipient.itemList is empty or undefined', async t => {
  const emailReceipt = testEnvironment.get<EmailReceipt>(EmailReceipt);

  await t.throwsAsync(
    emailReceipt.send(
      {email: 'test@boklisten.co', user_id: 'abc', message_id: '123'},
      {type: 'receipt', subtype: 'none'},
    ),
    {instanceOf: ReferenceError, message: /recipient.itemList is not defined/},
  );
});

test.serial(
  'should call emailTemplateResolver with correct type and subtype',
  async t => {
    const emailReceipt = testEnvironment.get<EmailReceipt>(EmailReceipt);
    const mockedTemplate =
      '<html><head></head><body><p>email receipt test</p></body</html>';

    const recipient: Recipient = {
      email: 'some@email.com',
      user_id: '123',
      message_id: '123',
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
      type: 'receipt',
      subtype: 'none',
      sequence_number: 0,
    };

    when(mockedEmailTemplateResolver.generate(options, anything())).thenReturn(
      mockedTemplate,
    );

    when(mockedEmailBroker.send(anything())).thenResolve(true);

    try {
      const res = await emailReceipt.send(recipient, options);
    } catch (e) {
      t.fail(e);
    }

    const [emailTemplateResolverArg] = capture(
      mockedEmailTemplateResolver.generate,
    ).last();

    const [emailContentArg] = capture(mockedEmailBroker.send).last();

    t.is(emailTemplateResolverArg, options);
    t.is(emailContentArg.to, recipient.email);
    t.is(emailContentArg.from, EMAIL_SETTINGS.receipt.fromEmail);
    t.is(emailContentArg.subject, EMAIL_SETTINGS.subjects.receipt['none'][0]);
    t.is(emailContentArg.html, mockedTemplate);
  },
);
