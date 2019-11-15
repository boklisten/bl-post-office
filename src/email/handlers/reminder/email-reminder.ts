import {MessageOptions} from '../../../interfaces/message-options';
import {injectable} from 'inversify';
import {Recipient} from '../../../interfaces/reciptient';
import {DepartmentHandler} from '../../../interfaces/department-handler';
import {util} from '../../../util';
import {EmailTemplateResolver} from '../../email-template-resolver';
import {EmailBroker} from '../../broker/email.broker';
import {EMAIL_SETTINGS} from '../../email-settings';
import {EmailTemplateInput} from '../../../interfaces/emailTemplateInput';
import {EmailContent} from '../../email-content';
import 'reflect-metadata';

@injectable()
export class EmailReminder implements DepartmentHandler {
  private supportedSubtypes = ['partly-payment', 'rent', 'loan'];

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
    const emailSubject = this.getEmailSubject(options);

    const emailContent: EmailContent = {
      to: recipient.email as string,
      from: EMAIL_SETTINGS.reminder.fromEmail,
      fromName: EMAIL_SETTINGS.name,
      subject: emailSubject,
      html: template,
      message_id: recipient.message_id as string,
      user_id: recipient.user_id as string,
      sequence_number: options.sequence_number,
      type: options.type,
      subtype: options.subtype,
    };

    return await this._emailBroker.send(emailContent);
  }

  private createEmailTemplateInput(
    recipient: Recipient,
    messageOptions: MessageOptions,
  ): EmailTemplateInput {
    return {
      itemList: recipient.itemList,
      name: recipient.name,
      settings: recipient.settings,
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
      throw `toEmail "${recipient.email}" is not a valid email`;
    }

    if (!recipient.itemList || recipient.itemList.items.length <= 0) {
      throw `recipient.itemList.items is empty or undefined`;
    }
  }
  private getEmailSubject(messageOption: MessageOptions): string {
    return EMAIL_SETTINGS.subjects.reminder[messageOption.subtype][
      messageOption.sequence_number as number
    ] as any;
  }
}
