import test from 'ava';
import {
  mock,
  when,
  instance,
  capture,
  verify,
  anything,
  anyString,
  reset,
} from 'ts-mockito';

import {PostOffice} from './post-office';
import {EmailDepartment} from './email/email.department';
import {MessageOptions} from './interfaces/message-options';
import {Recipient} from './interfaces/reciptient';
import {TestEnvironment} from '../test/test-environment';
import {SmsDepartment} from './sms/sms.department';

const mockedEmailDepartment = mock(EmailDepartment);
const mockedSmsDepartment = mock(SmsDepartment);

const recipients: Recipient[] = [
  {email: 'some@email.com', user_id: '123', message_id: '123'},
];
const messageOptions: MessageOptions = {
  type: 'reminder',
  subtype: 'partly-payment',
};

const testEnvironment = new TestEnvironment({
  classesToBind: [PostOffice],
  classesToMock: [
    {real: EmailDepartment, mock: instance(mockedEmailDepartment)},
    {real: SmsDepartment, mock: instance(mockedSmsDepartment)},
  ],
});

test('should not call SmsDepartment for type reminder if medium.sms is false', async t => {
  reset(mockedEmailDepartment);
  when(mockedSmsDepartment.send(anything(), anything())).thenResolve(true);
  when(mockedEmailDepartment.send(anything(), anything())).thenResolve(true);

  const postOffice = testEnvironment.get<PostOffice>(PostOffice);

  const config = {
    reminder: {
      mediums: {
        email: true,
        sms: false,
      },
    },
  };

  postOffice.setConfig(config);

  const recipients: Recipient[] = [
    {email: 'some@email.com', user_id: '123', message_id: '123'},
  ];
  const options: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
  };

  try {
    const res = await postOffice.send(recipients, messageOptions);
  } catch (e) {
    t.fail(e);
  }

  verify(mockedSmsDepartment.send(recipients, messageOptions)).never();
  t.pass();
});

test('should not call EmailDepartment for type reminder if medium.email is false', async t => {
  reset(mockedEmailDepartment);
  when(mockedSmsDepartment.send(anything(), anything())).thenResolve(true);
  when(mockedEmailDepartment.send(anything(), anything())).thenResolve(true);

  const postOffice = testEnvironment.get<PostOffice>(PostOffice);

  const config = {
    reminder: {
      mediums: {
        email: false,
      },
    },
  };

  postOffice.setConfig(config);

  const recipients: Recipient[] = [
    {email: 'some@email.com', user_id: '123', message_id: '123'},
  ];
  const options: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
  };

  try {
    const res = await postOffice.send(recipients, options);
  } catch (e) {
    t.fail(e);
  }

  verify(mockedEmailDepartment.send(recipients, options)).never();
  t.pass();
});

test('should reject if recipients array is empty', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);

  when(mockedEmailDepartment.send(recipients, messageOptions)).thenResolve(
    true,
  );

  try {
    await postOffice.send([], {type: 'receipt', subtype: 'partly-payment'});
    t.fail();
  } catch (e) {
    t.is(e, `recipients array is empty`);
  }
});

test('should reject if option.type is not supported', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);

  when(mockedEmailDepartment.send(recipients, messageOptions)).thenResolve(
    true,
  );

  const randomVal = 'dfjasdklf' as any;

  try {
    await postOffice.send(recipients, {
      type: randomVal,
      subtype: 'partly-payment',
    });
    t.fail();
  } catch (e) {
    t.log(e);
    t.is(e, `message type "${randomVal}" not supported`);
  }
});

test('should call emailDepartment if option.type === "reminder"', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);
  postOffice.setConfig({reminder: {mediums: {email: true}}});
  const res = await postOffice.send(recipients, messageOptions);
  const args = capture(mockedEmailDepartment.send).last();

  when(mockedEmailDepartment.send(recipients, messageOptions)).thenResolve(
    true,
  );

  t.is(args[0], recipients);
  t.is(args[1], messageOptions);
  t.true(res);

  reset(mockedEmailDepartment);
});
