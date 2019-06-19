import {Container} from 'inversify';
import {PostOffice} from './src/post-office';
import {EmailBroker} from './src/email/broker/email.broker';
import {SendgridConnecter} from './src/email/broker/sendgrid/sendgrid.connecter';
import {EmailDepartment} from './src/email/email.department';
import {EmailReminder} from './src/email/handlers/reminder/email-reminder';
import {EmailTemplateResolver} from './src/email/email-template-resolver';
import {SmsDepartment} from './src/sms/sms.department';
import {SmsReminder} from './src/sms/handlers/reminder/sms-reminder';
import {SmsBroker} from './src/sms/broker/sms.broker';
import {TwilioConnecter} from './src/sms/broker/twilio/twilio.connecter';
import {EmailGeneric} from './src/email/handlers/generic/email-generic';
import {EmailReceipt} from './src/email/handlers/receipt/email-receipt';

const inversifyContainer = new Container();

inversifyContainer.bind<PostOffice>(PostOffice).toSelf();
inversifyContainer.bind<EmailBroker>(EmailBroker).toSelf();
inversifyContainer.bind<SendgridConnecter>(SendgridConnecter).toSelf();
inversifyContainer.bind<EmailDepartment>(EmailDepartment).toSelf();
inversifyContainer.bind<EmailReminder>(EmailReminder).toSelf();
inversifyContainer.bind<EmailTemplateResolver>(EmailTemplateResolver).toSelf();
inversifyContainer.bind<EmailGeneric>(EmailGeneric).toSelf();
inversifyContainer.bind<EmailReceipt>(EmailReceipt).toSelf();

inversifyContainer.bind<SmsDepartment>(SmsDepartment).toSelf();
inversifyContainer.bind<SmsReminder>(SmsReminder).toSelf();
inversifyContainer.bind<SmsBroker>(SmsBroker).toSelf();
inversifyContainer.bind<TwilioConnecter>(TwilioConnecter).toSelf();

export {inversifyContainer};
