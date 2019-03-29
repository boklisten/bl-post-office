import {Container} from 'inversify';
import {PostOffice} from './src/post-office';
import {EmailBroker} from './src/email/email.broker';
import {EmailDepartment} from './src/email/email.department';
import {EmailReminder} from './src/email/handlers/reminder/email-reminder';

const inversifyContainer = new Container();

inversifyContainer.bind<PostOffice>(PostOffice).toSelf();
inversifyContainer.bind<EmailBroker>(EmailBroker).toSelf();
inversifyContainer.bind<EmailDepartment>(EmailDepartment).toSelf();
inversifyContainer.bind<EmailReminder>(EmailReminder).toSelf();

export {inversifyContainer};
