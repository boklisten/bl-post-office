import {injectable} from 'inversify';
import {DepartmentHandler} from '../../../interfaces/department-handler';
import {EmailTemplateResolver} from '../../email-template-resolver';
import {EmailBroker} from '../../broker/email.broker';
import {EmailTemplateInput} from '../../../interfaces/emailTemplateInput';
import {
  MessageOptions,
  MessageSubtype,
} from '../../../interfaces/message-options';
import {Recipient} from '../../../interfaces/reciptient';
import {EmailContent} from '../../email-content';
import {EMAIL_SETTINGS} from '../../email-settings';
import 'reflect-metadata';
import {util} from '../../../util';

@injectable()
export class EmailGeneric implements DepartmentHandler {
  private supportedSubtypes: MessageSubtype[] = ['all'];

  constructor(
    private _emailTemplateResolver: EmailTemplateResolver,
    private _emailBroker: EmailBroker,
  ) {}

  public async send(
    recipient: Recipient,
    options: MessageOptions,
  ): Promise<boolean> {
    this.validateRecipient(recipient);
    this.validateOptions(options);

    const emailTemplateInput = this.createEmailTemplateInput(
      recipient,
      options,
    );

    const template = this._emailTemplateResolver.generate(
      options,
      emailTemplateInput,
    );

    const emailContent = this.createEmailContent(recipient, options, template);

    return await this._emailBroker.send(emailContent);
  }

  private createEmailContent(
    recipient: Recipient,
    options: MessageOptions,
    template: string,
  ): EmailContent {
    return {
      to: recipient.email as string,
      from: EMAIL_SETTINGS.generic.fromEmail,
      fromName: EMAIL_SETTINGS.name,
      subject: options.subject as string,
      html: template,
      message_id: recipient.message_id as string,
      user_id: recipient.user_id as string,
      sequence_number: options.sequence_number,
      type: options.type,
      subtype: options.subtype,
    };
  }

  private createEmailTemplateInput(
    recipient: Recipient,
    options: MessageOptions,
  ): EmailTemplateInput {
    return {
      name: recipient.name as string,
      htmlContent: options.htmlContent as string,
    };
  }

  private validateRecipient(recipient: Recipient): boolean {
    if (!recipient.email || !util.isEmailValid(recipient.email as string)) {
      throw new TypeError(`toEmail "${recipient.email}" is not a valid email`);
    }
    return true;
  }

  private validateOptions(options: MessageOptions): boolean {
    if (!options.htmlContent || options.htmlContent.length <= 0) {
      throw new ReferenceError('options.htmlContent is not defined');
    }

    if (!options.subject) {
      throw new ReferenceError('options.subject is not defined');
    }

    if (this.supportedSubtypes.indexOf(options.subtype) <= -1) {
      throw new TypeError(
        `subtype "${options.subtype}" is not supported on type "${
          options.type
        }"`,
      );
    }
    return true;
  }
}
