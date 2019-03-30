import {injectable} from 'inversify';
import 'reflect-metadata';

@injectable()
export class SendgridConnecter {
  send(toEmail: string, subject: string, html: string): Promise<boolean> {
    return Promise.reject('SendgridConnecter.send() not implemented');
  }
}
