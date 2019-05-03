import {injectable} from 'inversify';
import {SmsBroker} from '../../broker/sms.broker';
import 'reflect-metadata';
import {DepartmentHandler} from '../../../interfaces/department-handler';
import {Recipient} from '../../../interfaces/reciptient';
import {MessageOptions} from '../../../interfaces/message-options';
import {SMS_SETTINGS} from '../../sms-settings';
import {logger} from '../../../logger';

@injectable()
export class SmsReminder implements DepartmentHandler {
  constructor(private _smsBroker: SmsBroker) {}

  public async send(
    recipient: Recipient,
    messageOptions: MessageOptions,
  ): Promise<any> {
    try {
      return await this.delegateBySubtype(recipient, messageOptions);
    } catch (e) {
      logger.error(
        `[message_id: ${
          recipient.message_id
        }]: failed to send reminder to: "${JSON.stringify(
          recipient.phone,
        )}": ${e}`,
      );
      throw `failed to send sms: ${e}`;
    }
  }

  private async delegateBySubtype(
    recipient: Recipient,
    messageOptions: MessageOptions,
  ): Promise<any> {
    let seqNum = messageOptions.sequence_number
      ? messageOptions.sequence_number
      : 0;
    switch (messageOptions.subtype) {
      case 'partly-payment':
        return await this._smsBroker.send(
          recipient.phone as string,
          SMS_SETTINGS.fromNumber,
          SMS_SETTINGS.text.reminder['partly-payment'][seqNum],
          recipient.message_id,
        );
      case 'rent':
        return await this._smsBroker.send(
          recipient.phone as string,
          SMS_SETTINGS.fromNumber,
          SMS_SETTINGS.text.reminder.rent[seqNum],
          recipient.message_id,
        );
      case 'loan':
        return await this._smsBroker.send(
          recipient.phone as string,
          SMS_SETTINGS.fromNumber,
          SMS_SETTINGS.text.reminder.loan[seqNum],
          recipient.message_id,
        );
      default:
        throw `subtype "${messageOptions.subtype}" not supported`;
    }
  }
}
