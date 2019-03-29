import {injectable} from 'inversify';
import * as fs from 'fs';
import * as path from 'path';
import 'reflect-metadata';

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
  public getTemplate(type: string, subtype: string): string {
    switch (type) {
      case 'reminder':
        return this.getTemplateTypeReminder(subtype);
      default:
        throw `type "${type}" not supported`;
    }
  }

  private getTemplateTypeReminder(subtype: string): string {
    switch (subtype) {
      case 'partly-payment':
        return reminderPartlyPaymentTemplate;
      default:
        throw `subtype "${subtype}" not supported`;
    }
  }
}
