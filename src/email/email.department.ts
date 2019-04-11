import {MessageOptions} from '../interfaces/message-options';
import {EmailReminder} from './handlers/reminder/email-reminder';
import {Recipient} from '../interfaces/reciptient';
import {Department} from '../interfaces/department';
import {injectable} from 'inversify';
import 'reflect-metadata';

@injectable()
export class EmailDepartment implements Department {
  constructor(private _emailReminder: EmailReminder) {}

  public send(recipients: Recipient[], options: MessageOptions): Promise<any> {
    switch (options.type) {
      case 'reminder':
        return this.sendToMany(recipients, options);
      default:
        throw `options.type "${options.type}" not supported`;
    }
  }

  private async sendToMany(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<any> {
    let promiseArr: Promise<any>[] = [];

    recipients.forEach(recipient => {
      promiseArr.push(this._emailReminder.send(recipient, options));
    });

    return true;
  }
}
