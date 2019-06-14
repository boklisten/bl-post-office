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
  generic: {
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
      generic: {
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

    if (!options.mediums) {
      throw new ReferenceError('options.mediums is not defined');
    }

    if (
      options.mediums &&
      !options.mediums.email &&
      !options.mediums.sms &&
      !options.mediums.voice
    ) {
      throw new ReferenceError('none of options.mediums is set to true');
    }

    switch (options.type) {
      case 'reminder':
        return await this.delegateToDepartments(
          recipients,
          options,
          this.config.reminder.mediums,
        );
      case 'generic':
        return await this.delegateToDepartments(
          recipients,
          options,
          this.config.generic.mediums,
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
    if (
      mediums.email &&
      ((options.mediums && options.mediums.email) ||
        (options.mediums === undefined || options.mediums.email === undefined))
    ) {
      try {
        await this._emailDepartment.send(recipients, options);
      } catch (e) {
        logger.error('Failed to send emails: ' + e);
      }
    } else {
      logger.info('options.mediums.email is false, should not send mail');
    }

    if (
      mediums.sms &&
      ((options.mediums && options.mediums.sms) ||
        (options.mediums === undefined || options.mediums.sms === undefined))
    ) {
      try {
        await this._smsDepartment.send(recipients, options);
      } catch (e) {
        logger.error('Failed to send sms: ' + e);
      }
    } else {
      logger.info('options.mediums.sms is false, should not send sms');
    }

    return true;
  }

  private isTypeSupported(type: any): boolean {
    if (['reminder', 'generic'].indexOf(type) >= 0) {
      return true;
    }
    return false;
  }
}
