import test from 'ava';
import {
  mock,
  when,
  instance,
  capture,
  verify,
  anything,
  anyString,
  reset,
} from 'ts-mockito';

import {PostOffice} from './post-office';
import {EmailDepartment} from './email/email.department';
import {MessageOptions} from './interfaces/message-options';
import {Recipient} from './interfaces/reciptient';
import {TestEnvironment} from '../test/test-environment';
import {SmsDepartment} from './sms/sms.department';
import {EmailBroker} from './email/broker/email.broker';

const mockedEmailBroker = mock(EmailBroker);

const recipients: Recipient[] = [{email: 'some@email.com'}];
const messageOptions: MessageOptions = {
  type: 'reminder',
  subtype: 'partly-payment',
};

const testEnvironment = new TestEnvironment({
  classesToBind: [PostOffice],
  classesToMock: [{real: EmailBroker, mock: instance(mockedEmailBroker)}],
});

test('should call EmailBroker with all the correct input', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);
  postOffice.setConfig({reminder: {mediums: {email: true}}});

  when(
    mockedEmailBroker.send(anyString(), anyString(), anyString(), anyString()),
  ).thenResolve(true);

  const testItemList = {
    summary: {
      total: '100kr',
      totalTax: '10kr',
      taxPercentage: '10%',
    },
    items: [
      {
        id: '123',
        title: 'some title',
        leftToPay: '100kr',
        deadline: '01.01.2000',
      },
    ],
  };

  const recipients: Recipient[] = [
    {email: 'a@mail.com', itemList: testItemList},
    {email: 'b@mail.com', itemList: testItemList},
    {email: 'c@mail.com', itemList: testItemList},
  ];

  const options: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
  };

  try {
    const res = await postOffice.send(recipients, options);
  } catch (e) {
    t.fail(e);
  }

  verify(
    mockedEmailBroker.send(
      recipients[0].email as string,
      anyString(),
      anyString(),
      anyString(),
    ),
  ).once();

  verify(
    mockedEmailBroker.send(
      recipients[1].email as string,
      anyString(),
      anyString(),
      anyString(),
    ),
  ).once();

  verify(
    mockedEmailBroker.send(
      recipients[2].email as string,
      anyString(),
      anyString(),
      anyString(),
    ),
  ).once();

  t.pass();
});

test('should call EmailBroker with all recipients that are not failing', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);
  postOffice.setConfig({reminder: {mediums: {email: true}}});

  when(
    mockedEmailBroker.send(anyString(), anyString(), anyString(), anyString()),
  ).thenResolve(true);

  const testItemList = {
    summary: {
      total: '100kr',
      totalTax: '10kr',
      taxPercentage: '10%',
    },
    items: [
      {
        id: '123',
        title: 'some title',
        leftToPay: '100kr',
        deadline: '01.01.2000',
      },
    ],
  };

  const recipients: Recipient[] = [
    {email: '123com', itemList: testItemList},
    {email: 'e@mail.com', itemList: testItemList},
    {email: 'f@mail.com', itemList: testItemList},
  ];

  const options: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
  };

  try {
    const res = await postOffice.send(recipients, options);
  } catch (e) {
    t.fail(e);
  }

  verify(
    mockedEmailBroker.send(
      recipients[0].email as string,
      anyString(),
      anyString(),
      anyString(),
    ),
  ).never();

  verify(
    mockedEmailBroker.send(
      recipients[1].email as string,
      anyString(),
      anyString(),
      anyString(),
    ),
  ).once();

  verify(
    mockedEmailBroker.send(
      recipients[2].email as string,
      anyString(),
      anyString(),
      anyString(),
    ),
  ).once();

  t.pass();
});
