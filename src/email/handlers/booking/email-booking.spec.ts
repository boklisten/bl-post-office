import test from "ava";
import { EmailBooking } from "./email-booking";
import { TestEnvironment } from "../../../../test/test-environment";
import { EmailBroker } from "../../broker/email.broker";
import { EmailTemplateResolver } from "../../email-template-resolver";
import {
  mock,
  instance,
  when,
  verify,
  capture,
  anyOfClass,
  anything
} from "ts-mockito";

import {
  MessageOptions,
  MessageType,
  MessageSubtype
} from "../../../interfaces/message-options";

const mockedEmailBroker = mock(EmailBroker);
const mockedEmailTemplateResolver = mock(EmailTemplateResolver);

let testEnvironment: TestEnvironment;

test.beforeEach(() => {
  testEnvironment = new TestEnvironment({
    classesToBind: [EmailBooking],
    classesToMock: [
      { real: EmailBroker, mock: instance(mockedEmailBroker) },
      {
        real: EmailTemplateResolver,
        mock: instance(mockedEmailTemplateResolver)
      }
    ]
  });
});

test("should reject if recipient is undefined", async t => {
  const emailBooking = testEnvironment.get<EmailBooking>(EmailBooking);
  const options: MessageOptions = {
    type: "booking",
    subtype: "confirmed"
  };
  await t.throwsAsync(emailBooking.send(undefined as any, options), {
    instanceOf: ReferenceError,
    message: /recipient is undefined/
  });
});

test("should reject if options is undefined", async t => {
  const emailBooking = testEnvironment.get<EmailBooking>(EmailBooking);
  const recipient = {
    email: "test@boklisten.co",
    user_id: "123",
    message_id: "123"
  };
  await t.throwsAsync(emailBooking.send(recipient, undefined as any), {
    instanceOf: ReferenceError,
    message: /options is undefined/
  });
});

test("should reject if subtype is not suported", async t => {
  const emailBooking = testEnvironment.get<EmailBooking>(EmailBooking);
  const options: MessageOptions = {
    type: "booking",
    subtype: "something random" as any
  };
  const recipient = {
    email: "test@boklisten.co",
    user_id: "123",
    message_id: "123"
  };

  await t.throwsAsync(emailBooking.send(recipient, options), {
    instanceOf: TypeError,
    message: /subtype "something random" is not supported/
  });
});
