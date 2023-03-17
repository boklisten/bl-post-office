import { PostOffice } from "../src/post-office";
import { TestEnvironment } from "./test-environment";
import { Recipient } from "../src/interfaces/reciptient";
import { logger } from "../src/logger";

const testEnvironment = new TestEnvironment();
const postOffice = testEnvironment.get<PostOffice>(PostOffice);

const recipients: Recipient[] = [
  {
    email: "adrianandersen@protonmail.com",
    name: "Adrian Andersen",
    user_id: "432",
    message_id: "889123hjhajsalkaks88cla80das",
    phone: "+4792831582",
    settings: {
      text: {
        deadline: "20.12.19"
      }
    },
    itemList: {
      summary: {
        total: "120 NOK",
        totalTax: "0 NOK",
        totalLeftToPay: "120 NOK",
        taxPercentage: "0",
        totalTaxLeftToPay: "0 NOK",
        taxPercentageLeftToPay: "0"
      },
      items: [
        {
          id: "83290832",
          title: "A Song of Ice and Fire",
          action: "delbetaling",
          amount: "0 NOK",
          leftToPay: "120 NOK",
          deadline: "20.12.2019"
        }
      ]
    }
  }
];

postOffice.setConfig({
  reminder: { mediums: { email: true, sms: false } },
  generic: { mediums: { email: true } },
  receipt: { mediums: { email: true } }
});

postOffice
  .send(recipients, {
    type: "reminder",
    subtype: "partly-payment",
    sequence_number: 3,
    mediums: { email: true, sms: true }
  })
  .then(res => {
    logger.info("sent: " + res);
  })
  .catch(e => {
    logger.error("some error:", e);
  });
