import {MessageOptions} from '../interfaces/message-options';
import {EmailReminder} from './handlers/reminder/email-reminder';
import {Recipient} from '../interfaces/reciptient';
import {Department} from '../interfaces/department';
import {injectable} from 'inversify';
import 'reflect-metadata';
import {logger} from '../logger';
import {EmailGeneric} from './handlers/generic/email-generic';
import {DepartmentHandler} from '../interfaces/department-handler';
import {EmailReceipt} from './handlers/receipt/email-receipt';

@injectable()
export class EmailDepartment implements Department {
  constructor(
    private _emailReminder: EmailReminder,
    private _emailGeneric: EmailGeneric,
    private _emailReceipt: EmailReceipt,
  ) {}

  public send(recipients: Recipient[], options: MessageOptions): Promise<any> {
    switch (options.type) {
      case 'reminder':
        return this.sendToMany(recipients, options, this._emailReminder);
      case 'generic':
        return this.sendToMany(recipients, options, this._emailGeneric);
      case 'receipt':
        return this.sendToMany(recipients, options, this._emailReceipt);
      default:
        throw `options.type "${options.type}" not supported`;
    }
  }

  private async sendToMany(
    recipients: Recipient[],
    options: MessageOptions,
    handler: DepartmentHandler,
  ): Promise<any> {
    let promiseArr: Promise<any>[] = [];

    recipients.forEach(recipient => {
      if (
        !recipient.mediumOverrides ||
        recipient.mediumOverrides.email !== false
      ) {
        promiseArr.push(handler.send(recipient, options));
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
        logger.error(`could not send email request: ${err}`);
        return {error: err, status: 'rejected'};
      },
    );
  }
}
