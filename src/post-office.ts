import {POST_OFFICE_SETTINGS} from './settings/post-office-settings';
import {EmailDepartment} from './email/email.department';
import {MessageOptions} from './interfaces/message-options';
import {Recipient} from './interfaces/reciptient';
import {injectable, inject} from 'inversify';
import {SmsDepartment} from './sms/sms.department';
import {logger} from './logger';
import {MessageMediums} from './interfaces/message-mediums';
import 'reflect-metadata';

export type PostOfficeConfig = {
  reminder: {
    mediums: MessageMediums;
  };
};

/**
 * A single point for sending and reciving messages to and from a customer
 */
@injectable()
export class PostOffice {
  private emailDepartment: EmailDepartment;
  private config: PostOfficeConfig;

  constructor(
    private _emailDepartment: EmailDepartment,
    private _smsDepartment: SmsDepartment,
  ) {
    this.config = {
      reminder: {
        mediums: {
          email: false,
          sms: false,
        },
      },
    };
  }

  public setConfig(config: PostOfficeConfig) {
    this.config = config;
  }

  /**
   *  Tries to send message to one or more recipients
   *
   *  @param recipients - the recipients of the message
   *  @param options - the options to the message, option.type must be specified
   */
  public async send(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<boolean> {
    if (recipients.length <= 0) {
      throw `recipients array is empty`;
    }
    return await this.delegateSendRequest(recipients, options);
  }

  private async delegateSendRequest(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<boolean> {
    if (!this.isTypeSupported(options.type)) {
      throw `message type "${options.type}" not supported`;
    }

    switch (options.type) {
      case 'reminder':
        return await this.delegateToDepartments(
          recipients,
          options,
          this.config.reminder.mediums,
        );
      default:
        throw `options.type "${options.type}" is not supported`;
    }
  }

  private async delegateToDepartments(
    recipients: Recipient[],
    options: MessageOptions,
    mediums: MessageMediums,
  ): Promise<boolean> {
    if (mediums.email && (options.mediums && options.mediums.email)) {
      try {
        await this._emailDepartment.send(recipients, options);
      } catch (e) {
        logger.error('Failed to send emails: ' + e);
      }
    }

    if (mediums.sms && (options.mediums && options.mediums.sms)) {
      try {
        await this._smsDepartment.send(recipients, options);
      } catch (e) {
        logger.error('Failed to send sms: ' + e);
      }
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
