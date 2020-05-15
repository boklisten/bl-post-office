import { PostOffice } from "../src/post-office";
import { TestEnvironment } from "./test-environment";
import { Recipient } from "../src/interfaces/reciptient";
import { logger } from "../src/logger";

const testEnvironment = new TestEnvironment();
const postOffice = testEnvironment.get<PostOffice>(PostOffice);

const recipients: Recipient[] = [
  {
    email: "aholskil@gmail.com",
    user_id: "432",
    message_id: "889123hjhajsalkaks88cla80das",
    booking: {
      date: "Mandag 12.07.19",
      hour: "kl. 10.20",
      branch: "Akademiet Oslo",
      address: "Bislett stadion, 0212 OSLO"
    }
  }
];

postOffice.setConfig({
  reminder: { mediums: { email: true, sms: false } },
  generic: { mediums: { email: true } },
  receipt: { mediums: { email: true } },
  booking: { mediums: { email: true } }
});

postOffice
  .send(recipients, {
    type: "booking",
    subtype: "confirmed",
    sequence_number: 0,
    mediums: { email: true }
  })
  .then(res => {
    logger.info("sent: " + res);
  })
  .catch(e => {
    logger.error(e);
  });
