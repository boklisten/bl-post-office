import {MessageOptions} from '../../../interfaces/message-options';
import {EmailHandler} from '../email-handler';
import {injectable} from 'inversify';
import 'reflect-metadata';

@injectable()
export class EmailReminder {
  constructor(private _emailHandler: EmailHandler) {}

  public send(toEmail: string, options: {itemList: any[]}): Promise<boolean> {
    if (!this.validateEmail(toEmail)) {
      return Promise.reject(`toEmail must be a valid email`);
    }

    if (options.itemList.length <= 0) {
      return Promise.reject(`options.itemList is empty`);
    }

    return Promise.reject('not implemented');
  }

  private generateHtml(options: MessageOptions): string {
    return ``;
  }

  private validateEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
