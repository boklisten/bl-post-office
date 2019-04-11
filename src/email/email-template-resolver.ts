import {injectable} from 'inversify';
import * as fs from 'fs';
import * as path from 'path';
import 'reflect-metadata';
import * as mustache from 'mustache';

import {
  MessageSubtype,
  MessageType,
  MessageOptions,
} from '../interfaces/message-options';

// approx 30 kb in memory
const reminderPartlyPaymentTemplate = fs.readFileSync(
  path.join(
    __dirname,
    '../../lib/email/template/reminder/reminder-partly-payment-1.html',
  ),
  'utf8',
);

const templatePaths = {
  reminder: {
    'partly-payment': '',
  },
};

@injectable()
export class EmailTemplateResolver {
  public generate(messageOptions: MessageOptions): string {
    const template = this.getTemplate(
      messageOptions.type,
      messageOptions.subtype,
    );

    try {
      return mustache.render(template, messageOptions);
    } catch (e) {
      throw `Mustache could not render template: ${e}`;
    }
  }

  private getTemplate(type: MessageType, subtype: MessageSubtype): string {
    switch (type) {
      case 'reminder':
        return this.getTemplateTypeReminder(subtype);
      default:
        throw `type "${type}" not supported`;
    }
  }

  private getTemplateTypeReminder(subtype: MessageSubtype): string {
    switch (subtype) {
      case 'partly-payment':
        return reminderPartlyPaymentTemplate;
      default:
        throw `subtype "${subtype}" not supported`;
    }
  }
}
