import test from 'ava';
import {mock, when, instance, capture} from 'ts-mockito';
import {EmailBroker} from './email.broker';
import {TestEnvironment} from '../../../test/test-environment';
import {SendgridConnecter} from './sendgrid/sendgrid.connecter';

const mockedSendgridConnecter = mock(SendgridConnecter);

const dummyToEmail = 'valid@email.com';
const dummyFromEmail = 'some@email.com';
const dummySubject = 'Some valid subject';
const dummyHtml = '<html></html>';

when(
  mockedSendgridConnecter.send(
    dummyToEmail,
    dummyFromEmail,
    dummySubject,
    dummyHtml,
  ),
).thenResolve(true);

const testEnvironment = new TestEnvironment({
  classesToBind: [EmailBroker],
  classesToMock: [
    {real: SendgridConnecter, mock: instance(mockedSendgridConnecter)},
  ],
});

test('should reject if toEmail is not a valid email', async t => {
  const emailBroker = testEnvironment.get<EmailBroker>(EmailBroker);
  const randomValues = ['ss..sa', 'js8kla@', '@uu.com', undefined];

  await randomValues.forEach(async (randomVal: any) => {
    try {
      await emailBroker.send(
        randomVal,
        dummyFromEmail,
        dummySubject,
        dummyHtml,
      );
      t.fail();
    } catch (e) {
      t.is(e, `toEmail "${randomVal}" must be a valid email`);
    }
  });
});

test('should reject if subject is empty or undefined', async t => {
  const emailBroker = testEnvironment.get<EmailBroker>(EmailBroker);
  const randomValues = ['', undefined];

  await randomValues.forEach(async (randomVal: any) => {
    try {
      await emailBroker.send(
        dummyToEmail,
        dummyFromEmail,
        randomVal,
        dummyHtml,
      );
      t.fail();
    } catch (e) {
      t.is(e, `subject "${randomVal}" can not be empty or undefined`);
    }
  });
});

test('should reject if html is empty or undefined', async t => {
  const emailBroker = testEnvironment.get<EmailBroker>(EmailBroker);
  const randomValues = ['', undefined];

  await randomValues.forEach(async (randomVal: any) => {
    try {
      await emailBroker.send(
        dummyToEmail,
        dummyFromEmail,
        dummySubject,
        randomVal,
      );
      t.fail();
    } catch (e) {
      t.is(e, `html can not be empty or undefined`);
    }
  });
});

test('should call connecter if all values are valid', async t => {
  const emailBroker = testEnvironment.get<EmailBroker>(EmailBroker);
  const mockedResponse = 'valid!';

  when(
    mockedSendgridConnecter.send(
      dummyToEmail,
      dummyFromEmail,
      dummySubject,
      dummyHtml,
    ),
  ).thenResolve(mockedResponse as any);

  try {
    const res = await emailBroker.send(
      dummyToEmail,
      dummyFromEmail,
      dummySubject,
      dummyHtml,
    );
    t.is(res, mockedResponse as any);
  } catch (e) {
    t.fail(e);
  }
});

test('should reject if connecter rejects', async t => {
  const emailBroker = testEnvironment.get<EmailBroker>(EmailBroker);
  const mockedRejection = 'not good';

  when(
    mockedSendgridConnecter.send(
      dummyToEmail,
      dummyFromEmail,
      dummySubject,
      dummyHtml,
    ),
  ).thenReject(mockedRejection);

  try {
    const res = await emailBroker.send(
      dummyToEmail,
      dummyFromEmail,
      dummySubject,
      dummyHtml,
    );
    t.fail();
  } catch (e) {
    t.is(e, 'connecter failed to send: ' + mockedRejection);
  }
});
