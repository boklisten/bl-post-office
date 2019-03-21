import {Container} from 'inversify';
import {TYPES} from './types';
import {Department} from './src/departments/department';
import {PostOffice} from './src/post-office';
import {ReceiptDepartment} from './src/departments/receipt/receipt.department';
import {ReminderDepartment} from './src/departments/reminder/reminder.department';
import {EmailReminder} from './src/email/handlers/reminder/email-reminder';

import {EmailHandler} from './src/email/handlers/email-handler';

const inversifyContainer = new Container();

// should bind interface (abstraction) to the implementation (concretion)
// read more: https://www.npmjs.com/package/inversify/

inversifyContainer.bind<PostOffice>(PostOffice).toSelf();

inversifyContainer.bind<ReceiptDepartment>(ReceiptDepartment).toSelf();
inversifyContainer.bind<ReminderDepartment>(ReminderDepartment).toSelf();

inversifyContainer.bind<EmailReminder>(EmailReminder).toSelf();

export {inversifyContainer};
