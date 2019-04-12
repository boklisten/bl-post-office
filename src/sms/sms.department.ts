import {Department} from '../interfaces/department';
import {Recipient} from '../interfaces/reciptient';
import {MessageOptions} from '../interfaces/message-options';
import {injectable} from 'inversify';
import {SmsReminder} from './handlers/reminder/sms-reminder';
import 'reflect-metadata';

@injectable()
export class SmsDepartment implements Department {
  private supportedTypes = ['reminder'];
  private supportedSubtypes = ['partly-payment'];

  constructor(private _smsReminder: SmsReminder) {}

  public async send(
    recipients: Recipient[],
    messageOptions: MessageOptions,
  ): Promise<any> {
    this.validateMessageOptions(messageOptions);

    if (!recipients || recipients.length <= 0) {
      throw `recipients array empty`;
    }

    return await this.delegateSendRequests(recipients, messageOptions);
  }

  private async delegateSendRequests(
    recipients: Recipient[],
    messageOptions: MessageOptions,
  ) {
    const promiseArr: Promise<any>[] = [];

    for (let recipient of recipients) {
      promiseArr.push(this._smsReminder.send(recipient, messageOptions));
    }

    return await promiseArr;
  }

  private validateMessageOptions(messageOptions: MessageOptions) {
    if (!this.isTypeSupported(messageOptions.type)) {
      throw `type "${messageOptions.type}" not supported`;
    }

    if (!this.isSubtypeSupported(messageOptions.subtype)) {
      throw `subtype "${messageOptions.subtype}" not supported`;
    }
  }

  private isTypeSupported(type: any) {
    return this.supportedTypes.indexOf(type) >= 0;
  }

  private isSubtypeSupported(subtype: any) {
    return this.supportedSubtypes.indexOf(subtype) >= 0;
  }
}
