import {injectable} from 'inversify';
import {SmsBroker} from '../broker/sms.broker';
import 'reflect-metadata';
import {DepartmentHandler} from '../../interfaces/department-handler';
import {Recipient} from '../../interfaces/reciptient';
import {MessageOptions} from '../../interfaces/message-options';
import {SMS_SETTINGS} from '../sms-settings';
import {logger} from '../../logger';

@injectable()
export class SmsHandler implements DepartmentHandler {
  constructor(private _smsBroker: SmsBroker) {}

  public async send(
    recipient: Recipient,
    messageOptions: MessageOptions,
  ): Promise<any> {
    try {
      return await this.delegate(recipient, messageOptions);
    } catch (e) {
      logger.error(
        `[message_id: ${
          recipient.message_id
        }]: failed to send sms to: ${JSON.stringify(recipient.phone)}: ${e}`,
      );
      throw `sms handler failed to send sms: ${e}`;
    }
  }

  private async delegate(
    recipient: Recipient,
    messageOptions: MessageOptions,
  ): Promise<any> {
    let seqNum = messageOptions.sequence_number
      ? messageOptions.sequence_number
      : 0;
    return await this._smsBroker.send(
      recipient.phone as string,
      SMS_SETTINGS.fromNumber,
      SMS_SETTINGS.text[messageOptions.type][messageOptions.subtype][seqNum],
      recipient.message_id,
    );
  }
}
