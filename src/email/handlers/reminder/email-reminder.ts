import {MessageOptions} from '../../../interfaces/message-options';
import {injectable} from 'inversify';
import {Recipient} from '../../../interfaces/reciptient';
import {DepartmentHandler} from '../../../interfaces/department-handler';
import {util} from '../../../util';
import {EmailTemplateResolver} from '../../email-template-resolver';
import {EmailBroker} from '../../broker/email.broker';
import {EMAIL_SETTINGS} from '../../email-settings';
import {EmailTemplateInput} from '../../../interfaces/emailTemplateInput';
import 'reflect-metadata';

@injectable()
export class EmailReminder implements DepartmentHandler {
  private supportedSubtypes = ['partly-payment'];

  constructor(
    private _emailTemplateResolver: EmailTemplateResolver,
    private _emailBroker: EmailBroker,
  ) {}

  public async send(
    recipient: Recipient,
    options: MessageOptions,
  ): Promise<boolean> {
    this.validateOptions(options);
    this.validateRecipient(recipient);

    const emailTemplateInput = this.createEmailTemplateInput(
      recipient,
      options,
    );

    const template = this._emailTemplateResolver.generate(
      options,
      emailTemplateInput,
    );

    return await this._emailBroker.send(
      recipient.email as string,
      EMAIL_SETTINGS.reminder.fromEmail,
      EMAIL_SETTINGS.reminder.subject,
      template,
    );
  }

  private createEmailTemplateInput(
    recipient: Recipient,
    messageOptions: MessageOptions,
  ): EmailTemplateInput {
    return {
      itemList: recipient.itemList,
      textBlocks: messageOptions.textBlocks,
    };
  }

  private validateOptions(options: MessageOptions) {
    if (!options.type || options.type !== 'reminder') {
      throw `type "${options.type}" is not "reminder"`;
    }

    if (this.supportedSubtypes.indexOf(options.subtype) <= -1) {
      throw `subtype "${options.subtype}" not supported`;
    }
  }

  private validateRecipient(recipient: Recipient) {
    if (!recipient.email || !util.isEmailValid(recipient.email)) {
      throw `toEmail must be a valid email`;
    }

    if (!recipient.itemList || recipient.itemList.items.length <= 0) {
      throw `recipient.itemList.items is empty or undefined`;
    }
  }
}
