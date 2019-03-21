import {ReceiptHandler} from './handlers/receipt.handler';
import {MessageOptions} from '../interfaces/message-options';
import {ReminderHandler} from './handlers/reminder.handler';
import {Recipient} from '../interfaces/reciptient';
//const heml = require('heml');

export class EmailOffice {
  private receiptHandler: ReceiptHandler;
  private reminderHandler: ReminderHandler;

  constructor() {
    this.receiptHandler = new ReceiptHandler();
    this.reminderHandler = new ReminderHandler();
  }

  public async sendReceipt(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<any> {
    const htmlString = this.receiptHandler.generateHtml(options);

    try {
      const template = await this.generateTemplate(htmlString);
    } catch (e) {
      return Promise.reject(`could not send receipt: ${e}`);
    }
  }

  public sendReminder(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<any> {
    return Promise.reject('send email reminder not implemented');
  }

  private generateTemplate(htmlString: string): Promise<string> {
    const options: any = {
      validate: 'soft',
      cheerio: {},
      juice: {},
      beautify: {},
      elements: [],
    };

    return new Promise((resolve, reject) => {
      /*
      heml(htmlString, options).then(({html, metadata, errors}: any) => {
        if (errors) {
          return reject(errors);
        }
        resolve(html);
      });
       */
    });
  }
}
