import test from 'ava';
import {mock, when, instance, capture} from 'ts-mockito';

import {PostOffice} from './post-office';
import {EmailDepartment} from './email/email.department';
import {MessageOptions} from './interfaces/message-options';
import {Recipient} from './interfaces/reciptient';
import {TestEnvironment} from '../test/test-environment';

const mockedEmailDepartment = mock(EmailDepartment);
const recipients: Recipient[] = [{email: 'some@email.com'}];
const messageOptions: MessageOptions = {
  type: 'reminder',
  subtype: 'partly-payment',
};

when(mockedEmailDepartment.send(recipients, messageOptions)).thenResolve(true);

const testEnvironment = new TestEnvironment({
  classesToBind: [PostOffice],
  classesToMock: [
    {real: EmailDepartment, mock: instance(mockedEmailDepartment)},
  ],
});

test('should reject if recipients array is empty', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);

  try {
    await postOffice.send([], {type: 'receipt', subtype: 'partly-payment'});
    t.fail();
  } catch (e) {
    t.is(e, `recipients array is empty`);
  }
});

test('should reject if option.type is not supported', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);
  const randomVals = ['shouldNotBeValid', 'fajsdlkf', '1234'];

  await randomVals.forEach(async (randomVal: any) => {
    try {
      await postOffice.send(recipients, {
        type: randomVal,
        subtype: 'partly-payment',
      });
      t.fail();
    } catch (e) {
      t.is(e, `message type "${randomVal}" not supported`);
    }
  });
});

test('should call emailDepartment if option.type === "reminder"', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);
  const res = await postOffice.send(recipients, messageOptions);

  const args = capture(mockedEmailDepartment.send).last();

  t.is(args[0], recipients);
  t.is(args[1], messageOptions);
  t.true(res);
});
