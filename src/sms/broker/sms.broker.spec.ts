import test from 'ava';
import {mock, when, instance, capture, anything} from 'ts-mockito';
import {SmsBroker} from './sms.broker';
import {TwilioConnecter} from './twilio/twilio.connecter';
import {TestEnvironment} from '../../../test/test-environment';
import {SMS_SETTINGS} from '../sms-settings';

const mockedTwilioConnecter = mock(TwilioConnecter);

const testEnvironment = new TestEnvironment({
  classesToBind: [SmsBroker],
  classesToMock: [
    {
      real: TwilioConnecter,
      mock: instance(mockedTwilioConnecter),
    },
  ],
});

test('should call TwilioConnecter.send() if args is valid', async t => {
  const smsBroker = testEnvironment.get<SmsBroker>(SmsBroker);
  const mockedResult = 'this is a mocked twilio result';
  when(
    mockedTwilioConnecter.send(anything(), anything(), anything()),
  ).thenResolve(mockedResult);

  let res = null;
  try {
    res = await smsBroker.send(
      SMS_SETTINGS.dymmy.number,
      SMS_SETTINGS.dymmy.number,
      SMS_SETTINGS.reminder.text,
    );
  } catch (e) {
    t.fail(e);
  }

  const [toNumberArg, fromNumberArg, textArg] = capture(
    mockedTwilioConnecter.send,
  ).last();

  t.is(toNumberArg, SMS_SETTINGS.dymmy.number);
  t.is(fromNumberArg, SMS_SETTINGS.dymmy.number);
  t.is(textArg, SMS_SETTINGS.reminder.text);
  t.is(res, mockedResult);
});

test('should reject if text is not valid', async t => {
  const smsBroker = testEnvironment.get<SmsBroker>(SmsBroker);
  const invalidTexts: any[] = ['abc', '', undefined, null];

  await invalidTexts.forEach(async invalidText => {
    try {
      await smsBroker.send(
        SMS_SETTINGS.dymmy.number,
        SMS_SETTINGS.dymmy.number,
        invalidText,
      );
    } catch (e) {
      t.regex(e, /sms text is not valid:/);
    }
  });
});

test('should reject if toNumber is not a phone number', async t => {
  const smsBroker = testEnvironment.get<SmsBroker>(SmsBroker);
  const invalidNumbers: any[] = [
    'abc',
    '113',
    undefined,
    null,
    55,
    '123456789',
    '1234567',
    '844444444444442999999999999999999382432',
  ];
  await invalidNumbers.forEach(async invalidNumber => {
    try {
      await smsBroker.send(
        invalidNumber,
        SMS_SETTINGS.dymmy.number,
        SMS_SETTINGS.reminder.text,
      );
    } catch (e) {
      t.is(e, `phone number "${invalidNumber}" is not a valid phone number`);
    }
  });
});

test('should reject if fromNumber is not a phone number', async t => {
  const smsBroker = testEnvironment.get<SmsBroker>(SmsBroker);
  const invalidNumbers: any[] = [
    'abc',
    '113',
    undefined,
    null,
    55,
    '123456789',
    '1234567',
    '844444444444442999999999999999999382432',
  ];
  await invalidNumbers.forEach(async invalidNumber => {
    try {
      await smsBroker.send(
        SMS_SETTINGS.dymmy.number,
        invalidNumber,
        SMS_SETTINGS.reminder.text,
      );
    } catch (e) {
      t.is(e, `phone number "${invalidNumber}" is not a valid phone number`);
    }
  });
});
