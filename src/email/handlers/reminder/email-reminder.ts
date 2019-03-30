import {MessageOptions} from '../../../interfaces/message-options';
import {injectable} from 'inversify';
import {Recipient} from '../../../interfaces/reciptient';
import {DepartmentHandler} from '../../../interfaces/department-handler';
import {util} from '../../../util';
import 'reflect-metadata';

@injectable()
export class EmailReminder implements DepartmentHandler {
  constructor() {}

  public send(recipient: Recipient, options: MessageOptions): Promise<boolean> {
    if (!recipient.email || !util.isEmailValid(recipient.email)) {
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
}
