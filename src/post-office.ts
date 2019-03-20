import {POST_OFFICE_SETTINGS} from './settings/post-office-settings';
import {EmailOffice} from './email/email-office';
import {MessageOptions} from './interfaces/message-options';
import {Recipient} from './interfaces/reciptient';

/**
 * A single point for sending and reciving messages to and from a customer
 */
export class PostOffice {
  private emailOffice: EmailOffice;

  constructor() {
    this.emailOffice = new EmailOffice();
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
