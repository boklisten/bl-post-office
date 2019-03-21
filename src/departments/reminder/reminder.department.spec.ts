import test from 'ava';
import {ReminderDepartment} from './reminder.department';

test('should reject if option.type !== "reminder"', async t => {
  const reminderDepartment = new ReminderDepartment();

  try {
    await reminderDepartment.send([{}], {type: 'somethingElse' as any});
  } catch (e) {
    t.is(e, `option.type is not "reminder"`);
  }
});

test('should reject if recipients is empty', async t => {
  const reminderDepartment = new ReminderDepartment();
  try {
    await reminderDepartment.send([], {type: 'reminder'});
  } catch (e) {
    t.is(e, `recipients array is empty`);
  }
});
