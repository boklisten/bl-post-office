import {injectable} from 'inversify';
import {Recipient} from '../../interfaces/reciptient';
import {MessageOptions} from '../../interfaces/message-options';
import {Department} from '../department';
import 'reflect-metadata';

@injectable()
export class ReceiptDepartment implements Department {
  private msg: string;
  constructor() {}

  public send(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<boolean> {
    if (options.type !== 'receipt') {
      return Promise.reject(`option.type is not "receipt"`);
    }

    if (recipients.length <= 0) {
      return Promise.reject(`recipients array is empty`);
    }

    return Promise.reject(
      'ReceiptDepartment.send() not implemented...: "' + this.msg + '"',
    );
  }
}
