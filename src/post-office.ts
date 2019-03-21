import {POST_OFFICE_SETTINGS} from './settings/post-office-settings';
import {EmailOffice} from './email/email-office';
import {MessageOptions} from './interfaces/message-options';
import {Recipient} from './interfaces/reciptient';
import {ReceiptDepartment} from './departments/receipt.department';
import {injectable, inject} from 'inversify';
import {TYPES} from '../TYPES';
import {Department} from './departments/department';
import 'reflect-metadata';

/**
 * A single point for sending and reciving messages to and from a customer
 */
@injectable()
export class PostOffice {
  private emailOffice: EmailOffice;

  constructor(private _receiptDepartment: ReceiptDepartment) {
    this.emailOffice = new EmailOffice();
  }

  public send(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<boolean> {
    return this.delegateSendRequest(recipients, options);
  }

  private delegateSendRequest(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<boolean> {
    switch (options.type) {
      case 'receipt':
        return this._receiptDepartment.send(recipients, options);
      default:
        return Promise.reject('message type not supported');
    }
  }

  /**
   * sends a receipt to a recipient using the corresponding medium
   * @param MessageOptions
   */
  public sendReceipt(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<boolean> {
    if (POST_OFFICE_SETTINGS.receipt.email) {
      return this.emailOffice.sendReceipt(recipients, options);
    }
    return Promise.reject('not implemented');
  }

  /**
   * sends a reminder to a recipient using the corresponding medium
   * @param MessageOptions
   * @returns Promise
   */
  public sendReminder(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<boolean> {
    if (POST_OFFICE_SETTINGS.reminder.email) {
      return this.emailOffice.sendReminder(recipients, options);
    }
    return Promise.reject('not implemented');
  }
}
