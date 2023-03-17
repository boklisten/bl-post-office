import { Department } from "../interfaces/department";
import { Recipient } from "../interfaces/reciptient";
import { MessageOptions } from "../interfaces/message-options";
import { injectable } from "inversify";
import { SmsHandler } from "./handlers/sms.handler";
import "reflect-metadata";
import { logger } from "../logger";

@injectable()
export class SmsDepartment implements Department {
  private supportedTypes = ["reminder", "match"];
  private supportedSubtypes = ["partly-payment", "rent", "loan", "none"];

  constructor(private _smsHandler: SmsHandler) {}

  public async send(
    recipients: Recipient[],
    messageOptions: MessageOptions
  ): Promise<any> {
    this.validateMessageOptions(messageOptions);

    if (!recipients || recipients.length <= 0) {
      throw `recipients array empty`;
    }

    return await this.delegateSendRequests(recipients, messageOptions);
  }

  private async delegateSendRequests(
    recipients: Recipient[],
    messageOptions: MessageOptions
  ) {
    const promiseArr: Promise<any>[] = [];

    for (let recipient of recipients) {
      if (
        recipient.mediumOverrides &&
        recipient.mediumOverrides.sms === false
      ) {
        logger.debug(
          `should not send sms: recipient "${
            recipient.user_id
          }" has mediumOverrides.sms set to false`
        );
        continue;
      }
      promiseArr.push(this._smsHandler.send(recipient, messageOptions));
    }

    try {
      const results = await Promise.all(promiseArr.map(this.reflect));

      const successes = results.filter(x => x.status === "resolved");

      if (successes.length <= 0) {
        throw `none of the sms requests was a success`;
      }

      logger.info(
        `successfully sent ${successes.length} out of ${
          promiseArr.length
        } sms requests`
      );

      return true;
    } catch (e) {
      throw `something went wrong when trying to send sms requests: ${e}`;
    }
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

  private reflect(promise: Promise<any>) {
    return promise.then(
      res => {
        logger.debug(`sent sms request: ${JSON.stringify(res)}`);
        return { result: res, status: "resolved" };
      },
      err => {
        logger.error(err);
        return { error: err, status: "rejected" };
      }
    );
  }
}
