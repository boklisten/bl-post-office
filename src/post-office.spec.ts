import test from 'ava';
import {PostOffice} from './post-office';
import {ReceiptDepartment} from './departments/receipt.department';
import {mock, when, instance, verify, capture} from 'ts-mockito';
import {Department} from './departments/department';
import {MessageOptions} from './interfaces/message-options';
import {Recipient} from './interfaces/reciptient';
import 'reflect-metadata';
import {injectable, decorate} from 'inversify';
import {TestEnvironment} from '../test/test-environment';

test('should call receiptDepartment if option.type = "receipt"', async t => {
  // const receiptDepartment = myContainer.get<Department>(TYPES.Department);

  const recipients: Recipient[] = [];
  const messageOptions: MessageOptions = {type: 'receipt'};

  let mockedReceiptDepartment = mock(ReceiptDepartment);

  when(mockedReceiptDepartment.send(recipients, messageOptions)).thenResolve(
    true,
  );

  const testEnvironment = new TestEnvironment({
    classesToBind: [PostOffice],
    classesToMock: [
      {real: ReceiptDepartment, mock: instance(mockedReceiptDepartment)},
    ],
  });

  const postOffice = testEnvironment.get<PostOffice>(PostOffice);
  const res = await postOffice.send(recipients, messageOptions);

  const args = capture(mockedReceiptDepartment.send).last();

  t.true(args[0] === recipients);
  t.true(args[1] === messageOptions);
  t.true(res);
});
