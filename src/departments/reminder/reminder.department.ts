import {Department} from '../department';
import {MessageOptions} from '../../interfaces/message-options';
import {Recipient} from '../../interfaces/reciptient';
import {injectable} from 'inversify';
import 'reflect-metadata';

@injectable()
export class ReminderDepartment implements Department {
  public send(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<boolean> {
    if (recipients.length <= 0) {
      return Promise.reject(`recipients array is empty`);
    }
    if (options.type !== 'reminder') {
      return Promise.reject(`option.type is not "reminder"`);
    }

    return Promise.reject('not implemented');
  }
}

// list of items with deadline, status and how much amount is left
//
// to: email/phone
// messageId: string,
// itemList: {title: string, id: string, status: string, amountLeft: string, deadline: string}[]
// textBlocks: {..}[]
