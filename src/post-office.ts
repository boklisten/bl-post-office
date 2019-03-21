import {POST_OFFICE_SETTINGS} from './settings/post-office-settings';
import {EmailOffice} from './email/email-office';
import {MessageOptions} from './interfaces/message-options';
import {Recipient} from './interfaces/reciptient';
import {ReceiptDepartment} from './departments/receipt/receipt.department';
import {injectable, inject} from 'inversify';
import {TYPES} from '../TYPES';
import {Department} from './departments/department';
import 'reflect-metadata';
import {ReminderDepartment} from './departments/reminder/reminder.department';

/**
 * A single point for sending and reciving messages to and from a customer
 */
@injectable()
export class PostOffice {
  private emailOffice: EmailOffice;

  constructor(
    private _receiptDepartment: ReceiptDepartment,
    private _reminderDepartment: ReminderDepartment,
  ) {}

  /**
   *  Tries to send message to one or more recipients
   *
   *  @param recipients - the recipients of the message
   *  @param options - the options to the message, option.type must be specified
   */
  public send(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<boolean> {
    if (recipients.length <= 0) {
      return Promise.reject(`recipients array is empty`);
    }
    return this.delegateSendRequest(recipients, options);
  }

  private delegateSendRequest(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<boolean> {
    switch (options.type) {
      case 'receipt':
        return this._receiptDepartment.send(recipients, options);
      case 'reminder':
        return this._reminderDepartment.send(recipients, options);
      default:
        return Promise.reject(`message type "${options.type}" not supported`);
    }
  }
}
