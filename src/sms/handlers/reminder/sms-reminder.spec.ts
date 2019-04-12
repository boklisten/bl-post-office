import test from 'ava';
import {SmsReminder} from '../reminder/sms-reminder';
import {mock, instance, anything, when, verify, capture} from 'ts-mockito';
import {TestEnvironment} from '../../../../test/test-environment';
import {SMS_SETTINGS} from '../../sms-settings';

import {
  MessageOptions,
  MessageType,
  MessageSubtype,
} from '../../../interfaces/message-options';
import {Recipient} from '../../../interfaces/reciptient';
import {SmsBroker} from '../../broker/sms.broker';

const mockedSmsBroker = mock(SmsBroker);
const testEnvironment = new TestEnvironment({
  classesToBind: [SmsReminder],
  classesToMock: [
    {
      real: SmsBroker,
      mock: instance(mockedSmsBroker),
    },
  ],
});

test('should call SmsBroker.send() with correct input', async t => {
  const smsReminder = testEnvironment.get<SmsReminder>(SmsReminder);
  const recipient: Recipient = {phone: '12345678'};
  const messageOptions: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
  };

  when(mockedSmsBroker.send(anything(), anything(), anything())).thenResolve(
    true,
  );

  await smsReminder.send(recipient, messageOptions);

  const [toNumberArg, fromNumberArg, textArg] = capture(
    mockedSmsBroker.send,
  ).last();

  t.is(toNumberArg, recipient.phone);
  t.is(fromNumberArg, SMS_SETTINGS.reminder.fromNumber);
  t.is(textArg, SMS_SETTINGS.reminder.text);
});
