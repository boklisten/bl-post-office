import {MessageOptions} from '../interfaces/message-options';
import {EmailReminder} from './handlers/reminder/email-reminder';
import {Recipient} from '../interfaces/reciptient';
import {Department} from '../departments/department';
import {injectable} from 'inversify';
import 'reflect-metadata';

@injectable()
export class EmailDepartment implements Department {
  constructor(public _reminder: EmailReminder) {}

  public async send(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<any> {
    return Promise.reject('');
  }
}
