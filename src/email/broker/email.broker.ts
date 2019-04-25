import {injectable} from 'inversify';
import {SendgridConnecter} from './sendgrid/sendgrid.connecter';
import {util} from '../../util';
import 'reflect-metadata';
import {SendgridSendObject} from './sendgrid/sendgrid-send-object';
import {EmailContent} from '../email-content';

@injectable()
export class EmailBroker {
  constructor(private _connecter: SendgridConnecter) {}

  public async send(content: EmailContent): Promise<boolean> {
    if (!util.isEmailValid(content.to)) {
      throw `toEmail "${content.to}" must be a valid email`;
    }

    if (!content.subject || content.subject.length <= 0) {
      throw `subject "${content.subject}" can not be empty or undefined`;
    }

    if (!content.html || content.html.length <= 0) {
      throw `html can not be empty or undefined`;
    }

    try {
      return await this._connecter.send(content);
    } catch (e) {
      throw `connecter failed to send: ${e}`;
    }
  }
}
