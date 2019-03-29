import {POST_OFFICE_SETTINGS} from './settings/post-office-settings';
import {EmailDepartment} from './email/email.department';
import {MessageOptions} from './interfaces/message-options';
import {Recipient} from './interfaces/reciptient';
import {injectable, inject} from 'inversify';
import {Department} from './departments/department';
import 'reflect-metadata';

/**
 * A single point for sending and reciving messages to and from a customer
 */
@injectable()
export class PostOffice {
  private emailDepartment: EmailDepartment;

  constructor(private _emailDepartment: EmailDepartment) {}

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
    if (!this.isTypeSupported(options.type)) {
      return Promise.reject(`message type "${options.type}" not supported`);
    }
    return this.delegateToDepartments(recipients, options);
  }

  private isTypeSupported(type: any): boolean {
    if (['reminder'].indexOf(type) >= 0) {
      return true;
    }
    return false;
  }

  private delegateToDepartments(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<boolean> {
    for (let medium of POST_OFFICE_SETTINGS.messageTypes.reminder.mediums) {
      switch (medium) {
        case 'email':
          return this._emailDepartment.send(recipients, options);
      }
    }
    return Promise.reject(
      `type "${options.type}" does not have any supported message mediums`,
    );
  }
}
