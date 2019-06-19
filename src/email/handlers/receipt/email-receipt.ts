import {DepartmentHandler} from '../../../interfaces/department-handler';
import {MessageOptions} from '../../../interfaces/message-options';
import {Recipient} from '../../../interfaces/reciptient';
import 'reflect-metadata';
import {injectable} from 'inversify';
import {EmailContent} from '../../email-content';
import {EmailBroker} from '../../broker/email.broker';
import {EmailTemplateResolver} from '../../email-template-resolver';
import {EmailTemplateInput} from '../../../interfaces/emailTemplateInput';
import {EMAIL_SETTINGS} from '../../email-settings';

@injectable()
export class EmailReceipt implements DepartmentHandler {
  private supportedSubtypes = ['none'];

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

    const content = this.createEmailContent(recipient, options, template);

    return await this._emailBroker.send(content);
  }

  private createEmailContent(
    recipient: Recipient,
    options: MessageOptions,
    template: string,
  ): EmailContent {
    let seqNum = options.sequence_number ? options.sequence_number : 0;
    return {
      to: recipient.email as string,
      from: EMAIL_SETTINGS.reminder.fromEmail,
      fromName: EMAIL_SETTINGS.name,
      subject: EMAIL_SETTINGS.subjects.receipt[options.subtype][seqNum],
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
      name: recipient.name,
      itemList: recipient.itemList,
    };
  }

  private validateRecipient(recipient: Recipient) {
    if (!recipient) {
      throw new ReferenceError('recipient is not defined');
    }

    if (!recipient.itemList) {
      throw new ReferenceError('recipient.itemList is not defined');
    }
  }

  private validateOptions(options: MessageOptions) {
    if (this.supportedSubtypes.indexOf(options.subtype) <= -1) {
      throw new TypeError(`subtype "${options.subtype}" is not supported`);
    }
  }
}
