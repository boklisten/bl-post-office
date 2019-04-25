import test from 'ava';
import {mock, when, verify, instance, capture, anything} from 'ts-mockito';
import {SmsDepartment} from './sms.department';
import {Recipient} from '../interfaces/reciptient';
import {
  MessageOptions,
  MessageType,
  MessageSubtype,
} from '../interfaces/message-options';
import {TestEnvironment} from '../../test/test-environment';
import {SmsReminder} from './handlers/reminder/sms-reminder';
import {SmsBroker} from './broker/sms.broker';

const mockedSmsReminder = mock(SmsReminder);
const mockedSmsBroker = mock(SmsBroker);
const testEnvironment = new TestEnvironment({
  classesToBind: [SmsDepartment],
  classesToMock: [
    {
      real: SmsReminder,
      mock: instance(mockedSmsReminder),
    },
    {
      real: SmsBroker,
      mock: instance(mockedSmsBroker),
    },
  ],
});

when(mockedSmsBroker.send(anything(), anything(), anything())).thenResolve(
  true,
);

test('should reject if option.type is not supported', async t => {
  const smsDepartment = testEnvironment.get<SmsDepartment>(SmsDepartment);
  const recipients: Recipient[] = [];
  const invalidTypes = ['skacjvalsdk', 'juuballuuu', 123];

  await invalidTypes.forEach(async invalidType => {
    try {
      const res = await smsDepartment.send(recipients, {
        type: invalidType as MessageType,
        subtype: 'partly-payment',
      });
      t.fail();
    } catch (e) {
      t.is(e, `type "${invalidType}" not supported`);
    }
  });
});

test('should reject if option.subtype is not supported', async t => {
  const smsDepartment = testEnvironment.get<SmsDepartment>(SmsDepartment);
  const recipients: Recipient[] = [];
  const invalidSubtypes = ['543jfdlkslksa', 'juuballuuu', 123];

  await invalidSubtypes.forEach(async invalidSubtype => {
    try {
      const res = await smsDepartment.send(recipients, {
        type: 'reminder',
        subtype: invalidSubtype as MessageSubtype,
      });
      t.fail();
    } catch (e) {
      t.is(e, `subtype "${invalidSubtype}" not supported`);
    }
  });
});

test('should reject if recipients is empty', async t => {
  const smsDepartment = testEnvironment.get<SmsDepartment>(SmsDepartment);
  const recipients: Recipient[] = [];
  const messageOptions: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
  };

  try {
    await smsDepartment.send(recipients, messageOptions);
  } catch (e) {
    t.is(e, 'recipients array empty');
  }
});

test('should call SmsReminder if type is reminder', async t => {
  const smsDepartment = testEnvironment.get<SmsDepartment>(SmsDepartment);
  const recipients: Recipient[] = [
    {
      phone: '1234',
    },
  ];
  const messageOptions: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
  };

  when(mockedSmsReminder.send(anything(), anything())).thenResolve(true);

  const res = await smsDepartment.send(recipients, messageOptions);

  const [recipientArg, messageOptionsArg] = capture(
    mockedSmsReminder.send,
  ).first();

  t.is(recipientArg, recipients[0]);
  t.is(messageOptionsArg, messageOptions);
});

test('should not call SmsReminder if recipient has mediumOverride.sms set to false', async t => {
  const smsDepartment = testEnvironment.get<SmsDepartment>(SmsDepartment);
  const recipients: Recipient[] = [
    {
      phone: '12345678',
      mediumOverrides: {
        sms: false,
      },
    },
  ];
  const messageOptions: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
  };

  when(mockedSmsReminder.send(anything(), anything())).thenResolve(true);

  try {
    await smsDepartment.send(recipients, messageOptions);
  } catch (e) {}

  verify(mockedSmsReminder.send(recipients[0], messageOptions)).never();

  t.pass();
});
