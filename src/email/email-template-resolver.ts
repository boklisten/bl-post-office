import { injectable } from "inversify";
import * as fs from "fs";
import * as path from "path";
import "reflect-metadata";
import * as mustache from "mustache";
import { EmailTemplateInput } from "../interfaces/emailTemplateInput";
import { TEMPLATE_DIR, TEMPLATE_PATHS } from "./template-paths";

import {
  MessageSubtype,
  MessageType,
  MessageOptions
} from "../interfaces/message-options";

// approx 30 kb in memory each
//
let templates: any = {};

function readTemplates() {
  for (let templatePath of TEMPLATE_PATHS) {
    if (!templates[templatePath.type]) {
      templates[templatePath.type] = {};
    }
    if (!templates[templatePath.subtype]) {
      templates[templatePath.type][templatePath.subtype] = [];
    }
    for (let sequence of templatePath.sequences) {
      templates[templatePath.type][templatePath.subtype][
        sequence
      ] = fs.readFileSync(
        path.join(
          __dirname,
          TEMPLATE_DIR +
            templatePath.type +
            "/" +
            templatePath.type +
            "-" +
            templatePath.subtype +
            "-" +
            sequence +
            ".html"
        ),
        "utf8"
      );
    }
  }
}

readTemplates();

@injectable()
export class EmailTemplateResolver {
  public generate(
    messageOptions: MessageOptions,
    emailTemplateInput: EmailTemplateInput
  ): string {
    const template = this.getTemplate(
      messageOptions.type,
      messageOptions.subtype,
      messageOptions.sequence_number
    );

    try {
      return mustache.render(template, emailTemplateInput);
    } catch (e) {
      throw `Mustache could not render template: ${e}`;
    }
  }

  private getTemplate(
    type: MessageType,
    subtype: MessageSubtype,
    sequenceNumber?: number
  ): string {
    let seqNumber = sequenceNumber ? sequenceNumber : 0;
    let template;
    let errorText = `could not get template for type "${type}" subtype "${subtype}" and seq number "${seqNumber}"`;

    try {
      template = templates[type][subtype][seqNumber];
    } catch (e) {
      throw new ReferenceError(errorText);
    }

    if (template) {
      return template;
    }
    throw new ReferenceError(errorText);
  }
}
