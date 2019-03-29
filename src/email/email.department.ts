import {MessageOptions} from '../interfaces/message-options';
import {EmailReminder} from './handlers/reminder/email-reminder';
import {Recipient} from '../interfaces/reciptient';
import {Department} from '../interfaces/department';
import {injectable} from 'inversify';
import 'reflect-metadata';

@injectable()
export class EmailDepartment implements Department {
  constructor(private _reminder: EmailReminder) {}

  public async send(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<any> {
    switch (options.type) {
      case 'reminder':
        return this._reminder.send(recipients[0], options);
      default:
        throw `options.type "${options.type}" not supported`;
    }
  }
}
