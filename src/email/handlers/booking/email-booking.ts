import { injectable } from "inversify";
import { DepartmentHandler } from "../../../interfaces/department-handler";
import { EmailTemplateResolver } from "../../email-template-resolver";
import { EmailBroker } from "../../broker/email.broker";
import { EmailTemplateInput } from "../../../interfaces/emailTemplateInput";
import {
  MessageOptions,
  MessageSubtype
} from "../../../interfaces/message-options";
import { Recipient } from "../../../interfaces/reciptient";
import { EmailContent } from "../../email-content";
import { EMAIL_SETTINGS } from "../../email-settings";
import { logger } from "../../../logger";
import { isNullOrUndefined } from "util";

@injectable()
export class EmailBooking implements DepartmentHandler {
  private supportedSubtypes: MessageSubtype[] = ["confirmed", "canceled"];

  constructor(
    private _emailTemplateResolver: EmailTemplateResolver,
    private _emailBroker: EmailBroker
  ) {}

  public async send(
    recipient: Recipient,
    options: MessageOptions
  ): Promise<boolean> {
    if (isNullOrUndefined(recipient)) {
      throw new ReferenceError("recipient is undefined");
    }

    if (isNullOrUndefined(options)) {
      throw new ReferenceError("options is undefined");
    }

    if (!this.supportedSubtypes.includes(options.subtype)) {
      throw new TypeError(`subtype "${options.subtype}" is not supported`);
    }

    const emailTemplateInput = this.createEmailTemplateInput(
      recipient,
      options
    );

    const template = this._emailTemplateResolver.generate(
      options,
      emailTemplateInput
    );

    const content = this.createEmailContent(recipient, options, template);

    return await this._emailBroker.send(content);
  }

  private createEmailContent(
    recipient: Recipient,
    options: MessageOptions,
    template: string
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
      subtype: options.subtype
    };
  }

  private createEmailTemplateInput(
    recipient: Recipient,
    options: MessageOptions
  ): EmailTemplateInput {
    return {
      name: recipient.name
    };
  }
}
