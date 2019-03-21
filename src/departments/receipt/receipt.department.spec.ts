import test from 'ava';
import {mock, when, instance, capture} from 'ts-mockito';

import {ReceiptDepartment} from './receipt.department';

test('should reject if option.type !== "receipt"', async t => {
  const receiptDepartment = new ReceiptDepartment();

  try {
    await receiptDepartment.send([], {type: 'somethingElse' as any});
    t.fail();
  } catch (e) {
    t.is(e, `option.type is not "receipt"`);
  }
});

test('should reject if recipients array is empty', async t => {
  const receiptDepartment = new ReceiptDepartment();

  try {
    await receiptDepartment.send([], {type: 'receipt'});
    t.fail();
  } catch (e) {
    t.is(e, `recipients array is empty`);
  }
});
