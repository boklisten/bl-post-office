import {POST_OFFICE_SETTINGS} from './settings/post-office-settings';
import {EmailDepartment} from './email/email.department';
import {MessageOptions} from './interfaces/message-options';
import {Recipient} from './interfaces/reciptient';
import {injectable, inject} from 'inversify';
import {SmsDepartment} from './sms/sms.department';
import {logger} from './logger';
import 'reflect-metadata';

/**
 * A single point for sending and reciving messages to and from a customer
 */
@injectable()
export class PostOffice {
  private emailDepartment: EmailDepartment;

  constructor(
    private _emailDepartment: EmailDepartment,
    private _smsDepartment: SmsDepartment,
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
      throw `recipients array is empty`;
    }
    return this.delegateSendRequest(recipients, options);
  }

  private delegateSendRequest(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<boolean> {
    if (!this.isTypeSupported(options.type)) {
      throw `message type "${options.type}" not supported`;
    }
    return this.delegateToDepartments(recipients, options);
  }

  private async delegateToDepartments(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<boolean> {
    try {
      await this._emailDepartment.send(recipients, options);
    } catch (e) {
      logger.error(e);
    }

    try {
      await this._smsDepartment.send(recipients, options);
    } catch (e) {
      logger.error(e);
    }

    return true;
  }

  private isTypeSupported(type: any): boolean {
    if (['reminder'].indexOf(type) >= 0) {
      return true;
    }
    return false;
  }
}
