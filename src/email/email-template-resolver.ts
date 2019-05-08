import {injectable} from 'inversify';
import * as fs from 'fs';
import * as path from 'path';
import 'reflect-metadata';
import * as mustache from 'mustache';
import {EmailTemplateInput} from '../interfaces/emailTemplateInput';

import {
  MessageSubtype,
  MessageType,
  MessageOptions,
} from '../interfaces/message-options';

// approx 30 kb in memory

const reminderPartlyPaymentTemplate0 = fs.readFileSync(
  path.join(
    __dirname,
    '../../lib/email/template/reminder/reminder-partly-payment-0.html',
  ),
  'utf8',
);

const reminderPartlyPaymentTemplate1 = fs.readFileSync(
  path.join(
    __dirname,
    '../../lib/email/template/reminder/reminder-partly-payment-1.html',
  ),
  'utf8',
);

const reminderRentTemplate0 = fs.readFileSync(
  path.join(
    __dirname,
    '../../lib/email/template/reminder/reminder-rent-0.html',
  ),
  'utf8',
);

const reminderLoanTemplate0 = fs.readFileSync(
  path.join(
    __dirname,
    '../../lib/email/template/reminder/reminder-loan-0.html',
  ),
  'utf8',
);

const reminderPartlyPaymentTemplates = [
  reminderPartlyPaymentTemplate0,
  reminderPartlyPaymentTemplate1,
];

const reminderRentTemplates = [reminderRentTemplate0];
const reminderLoadnTemplates = [reminderLoanTemplate0];

@injectable()
export class EmailTemplateResolver {
  public generate(
    messageOptions: MessageOptions,
    emailTemplateInput: EmailTemplateInput,
  ): string {
    const template = this.getTemplate(
      messageOptions.type,
      messageOptions.subtype,
      messageOptions.sequence_number,
    );

    try {
      return mustache.render(template, emailTemplateInput);
    } catch (e) {
      throw `Mustache could not render template: ${e}`;
    }
  }

  private getTemplate(
    type: MessageType,
    subtype: MessageSubtype,
    sequenceNumber?: number,
  ): string {
    switch (type) {
      case 'reminder':
        return this.getTemplateTypeReminder(subtype, sequenceNumber);
      default:
        throw `type "${type}" not supported`;
    }
  }

  private getTemplateTypeReminder(
    subtype: MessageSubtype,
    sequenceNumber?: number,
  ): string {
    let seqNumber = sequenceNumber ? sequenceNumber : 0;
    switch (subtype) {
      case 'partly-payment':
        return reminderPartlyPaymentTemplates[seqNumber];
      case 'rent':
        return reminderRentTemplates[seqNumber];
      case 'loan':
        return reminderLoadnTemplates[seqNumber];
      default:
        throw `subtype "${subtype}" not supported`;
    }
  }
}
