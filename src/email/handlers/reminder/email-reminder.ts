import {MessageOptions} from '../../../interfaces/message-options';
import {injectable} from 'inversify';
import {Recipient} from '../../../interfaces/reciptient';
import {DepartmentHandler} from '../../../interfaces/department-handler';
import 'reflect-metadata';

@injectable()
export class EmailReminder implements DepartmentHandler {
  constructor() {}

  public send(recipient: Recipient, options: MessageOptions): Promise<boolean> {
    if (!recipient.email || !this.validateEmail(recipient.email)) {
      return Promise.reject(`toEmail must be a valid email`);
    }

    if (!recipient.itemList || recipient.itemList.items.length <= 0) {
      return Promise.reject(`recipient.itemList.items is empty or undefined`);
    }

    return Promise.reject('not implemented');
  }

  private generateHtml(options: MessageOptions): string {
    return ``;
  }

  private validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
