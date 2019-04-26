import {MessageOptions} from '../interfaces/message-options';
import {EmailReminder} from './handlers/reminder/email-reminder';
import {Recipient} from '../interfaces/reciptient';
import {Department} from '../interfaces/department';
import {injectable} from 'inversify';
import 'reflect-metadata';
import {logger} from '../logger';

@injectable()
export class EmailDepartment implements Department {
  constructor(private _emailReminder: EmailReminder) {}

  public send(recipients: Recipient[], options: MessageOptions): Promise<any> {
    switch (options.type) {
      case 'reminder':
        return this.sendToMany(recipients, options);
      default:
        throw `options.type "${options.type}" not supported`;
    }
  }

  private async sendToMany(
    recipients: Recipient[],
    options: MessageOptions,
  ): Promise<any> {
    let promiseArr: Promise<any>[] = [];

    recipients.forEach(recipient => {
      if (
        !recipient.mediumOverrides ||
        recipient.mediumOverrides.email !== false
      ) {
        promiseArr.push(this._emailReminder.send(recipient, options));
      }
    });

    try {
      const results = await Promise.all(promiseArr.map(this.reflect));

      const successes = results.filter(x => x.status === 'resolved');

      if (successes.length <= 0) {
        throw `none of the email requests was a success`;
      }

      logger.info(
        `successfully sent ${successes.length} out of ${
          promiseArr.length
        } email requests`,
      );
      return true;
    } catch (e) {
      throw `something went wrong when trying to send email requests: ${e}`;
    }
  }

  private reflect(promise: Promise<any>) {
    return promise.then(
      res => {
        logger.debug(`sent email request: ${JSON.stringify(res)}`);
        return {result: res, status: 'resolved'};
      },
      err => {
        logger.error(err);
        return {error: err, status: 'rejected'};
      },
    );
  }
}
