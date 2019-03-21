import test from 'ava';
import {mock, when, instance, capture} from 'ts-mockito';

import {PostOffice} from './post-office';
import {ReceiptDepartment} from './departments/receipt/receipt.department';
import {MessageOptions} from './interfaces/message-options';
import {Recipient} from './interfaces/reciptient';
import {TestEnvironment} from '../test/test-environment';
import {ReminderDepartment} from './departments/reminder/reminder.department';

const recipients: Recipient[] = [{email: 'some@email.com'}];
const messageOptions: MessageOptions = {type: 'receipt'};
const mockedReceiptDepartment = mock(ReceiptDepartment);
const mockedReminderDepartment = mock(ReminderDepartment);
const reminderOptions: MessageOptions = {type: 'reminder'};

when(mockedReceiptDepartment.send(recipients, messageOptions)).thenResolve(
  true,
);

when(mockedReminderDepartment.send(recipients, reminderOptions)).thenResolve(
  true,
);

const testEnvironment = new TestEnvironment({
  classesToBind: [PostOffice],
  classesToMock: [
    {real: ReceiptDepartment, mock: instance(mockedReceiptDepartment)},
    {real: ReminderDepartment, mock: instance(mockedReminderDepartment)},
  ],
});

test('should reject if recipients array is empty', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);

  try {
    await postOffice.send([], {type: 'receipt'});
    t.fail();
  } catch (e) {
    t.is(e, `recipients array is empty`);
  }
});

test('should call receiptDepartment if option.type === "receipt"', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);
  const res = await postOffice.send(recipients, messageOptions);

  const args = capture(mockedReceiptDepartment.send).last();

  t.is(args[0], recipients);
  t.is(args[1], messageOptions);
  t.true(res);
});

test('should call reminderDepartment if option.type === "reminder"', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);
  const res = await postOffice.send(recipients, reminderOptions);

  const args = capture(mockedReminderDepartment.send).last();

  t.is(args[0], recipients);
  t.is(args[1], reminderOptions);
  t.true(res);
});

test('should reject if option.type is not supported', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);
  const randomVals = ['shouldNotBeValid', 'fajsdlkf', '1234'];

  await randomVals.forEach(async (randomVal: any) => {
    try {
      await postOffice.send(recipients, {type: randomVal});
      t.fail();
    } catch (e) {
      t.is(e, `message type "${randomVal}" not supported`);
    }
  });
});
