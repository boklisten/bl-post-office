import {injectable} from 'inversify';
import {SendgridConnecter} from './sendgrid/sendgrid.connecter';
import {util} from '../../util';
import 'reflect-metadata';

@injectable()
export class EmailBroker {
  constructor(private _connecter: SendgridConnecter) {}

  public async send(
    toEmail: string,
    fromEmail: string,
    subject: string,
    html: string,
  ): Promise<boolean> {
    if (!util.isEmailValid(toEmail)) {
      throw `toEmail "${toEmail}" must be a valid email`;
    }

    if (!subject || subject.length <= 0) {
      throw `subject "${subject}" can not be empty or undefined`;
    }

    if (!html || html.length <= 0) {
      throw `html can not be empty or undefined`;
    }

    try {
      return await this._connecter.send(toEmail, fromEmail, subject, html);
    } catch (e) {
      throw `connecter failed to send: ${e}`;
    }
  }
}
