import test from "ava";
import { mock, when, instance, capture } from "ts-mockito";
import { EmailBroker } from "./email.broker";
import { TestEnvironment } from "../../../test/test-environment";
import { SendgridConnecter } from "./sendgrid/sendgrid.connecter";
import { EMAIL_SETTINGS } from "../email-settings";
import { EmailContent } from "../email-content";

const mockedSendgridConnecter = mock(SendgridConnecter);

let dummyContent: EmailContent;
let testEnvironment: TestEnvironment;

test.beforeEach(() => {
  dummyContent = {
    to: "valid@email.com",
    from: "some@email.com",
    fromName: EMAIL_SETTINGS.name,
    subject: "some valid subject",
    html: "<html></html>",
    message_id: "123",
    user_id: "123",
    type: "reminder",
    subtype: "partly-payment"
  };

  testEnvironment = new TestEnvironment({
    classesToBind: [EmailBroker],
    classesToMock: [
      { real: SendgridConnecter, mock: instance(mockedSendgridConnecter) }
    ]
  });
});

test.serial("should reject if toEmail is not a valid email", async t => {
  const emailBroker = testEnvironment.get<EmailBroker>(EmailBroker);
  const randomValues = ["ss..sa", "js8kla@", "@uu.com", undefined];

  await randomValues.forEach(async (randomVal: any) => {
    try {
      dummyContent.to = randomVal;
      await emailBroker.send(dummyContent);
      t.fail();
    } catch (e) {
      t.is(e, `toEmail "${randomVal}" must be a valid email`);
    }
  });
});

test.serial("should reject if subject is empty or undefined", async t => {
  const emailBroker = testEnvironment.get<EmailBroker>(EmailBroker);
  const randomValues = ["", undefined];

  await randomValues.forEach(async (randomVal: any) => {
    try {
      dummyContent.subject = randomVal;
      await emailBroker.send(dummyContent);
      t.fail();
    } catch (e) {
      t.is(e, `subject "${randomVal}" can not be empty or undefined`);
    }
  });
});

test.serial("should reject if html is empty or undefined", async t => {
  const emailBroker = testEnvironment.get<EmailBroker>(EmailBroker);
  const randomValues = ["", undefined];

  await randomValues.forEach(async (randomVal: any) => {
    try {
      dummyContent.html = randomVal;
      await emailBroker.send(dummyContent);
      t.fail();
    } catch (e) {
      t.is(e, `html can not be empty or undefined`);
    }
  });
});

test.serial("should call connecter if all values are valid", async t => {
  const emailBroker = testEnvironment.get<EmailBroker>(EmailBroker);
  const mockedResponse = "valid!";

  when(mockedSendgridConnecter.send(dummyContent)).thenResolve(
    mockedResponse as any
  );

  try {
    const res = await emailBroker.send(dummyContent);
    t.is(res, mockedResponse as any);
  } catch (e) {
    t.fail(e);
  }
});

test.serial("should reject if connecter rejects", async t => {
  const emailBroker = testEnvironment.get<EmailBroker>(EmailBroker);
  const mockedRejection = "not good";

  when(mockedSendgridConnecter.send(dummyContent)).thenReject(mockedRejection);

  try {
    const res = await emailBroker.send(dummyContent);
    t.fail();
  } catch (e) {
    t.is(e, "connecter failed to send: " + mockedRejection);
  }
});
