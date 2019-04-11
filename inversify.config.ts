import {Container} from 'inversify';
import {PostOffice} from './src/post-office';
import {EmailBroker} from './src/email/broker/email.broker';
import {SendgridConnecter} from './src/email/broker/sendgrid/sendgrid.connecter';
import {EmailDepartment} from './src/email/email.department';
import {EmailReminder} from './src/email/handlers/reminder/email-reminder';
import {EmailTemplateResolver} from './src/email/email-template-resolver';

const inversifyContainer = new Container();

inversifyContainer.bind<PostOffice>(PostOffice).toSelf();
inversifyContainer.bind<EmailBroker>(EmailBroker).toSelf();
inversifyContainer.bind<SendgridConnecter>(SendgridConnecter).toSelf();
inversifyContainer.bind<EmailDepartment>(EmailDepartment).toSelf();
inversifyContainer.bind<EmailReminder>(EmailReminder).toSelf();
inversifyContainer.bind<EmailTemplateResolver>(EmailTemplateResolver).toSelf();

export {inversifyContainer};
