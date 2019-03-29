import {injectable} from 'inversify';

@injectable()
export class EmailBroker {
  public send(
    toEmail: string,
    subject: string,
    html: string,
  ): Promise<boolean> {
    return Promise.reject('EmailBroker.send() not implemented!');
  }
}
