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

const recipients: Recipient[] = [
  {email: 'some@email.com', message_id: '123', user_id: '123'},
];
const messageOptions: MessageOptions = {
  type: 'reminder',
  subtype: 'partly-payment',
  mediums: {
    email: true,
  },
};

const testEnvironment = new TestEnvironment({
  classesToBind: [PostOffice],
  classesToMock: [{real: EmailBroker, mock: instance(mockedEmailBroker)}],
});

test.serial('should call EmailBroker with all the correct input', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);
  postOffice.setConfig({reminder: {mediums: {email: true}}});

  when(mockedEmailBroker.send(anything())).thenResolve(true);

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
    {
      email: 'a@mail.com',
      itemList: testItemList,
      user_id: '123',
      message_id: '123',
    },
    {
      email: 'b@mail.com',
      itemList: testItemList,

      user_id: '123',
      message_id: '123',
    },
    {
      email: 'c@mail.com',
      itemList: testItemList,
      user_id: '123',
      message_id: '123',
    },
  ];

  const options: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
    mediums: {
      email: true,
    },
  };

  try {
    const res = await postOffice.send(recipients, options);
  } catch (e) {
    t.fail(e);
  }

  const [arg1] = capture(mockedEmailBroker.send).first();
  t.is(arg1.to, recipients[0].email);

  const [arg2] = capture(mockedEmailBroker.send).second();
  t.is(arg2.to, recipients[1].email);

  const [arg3] = capture(mockedEmailBroker.send).third();
  t.is(arg3.to, recipients[2].email);
});

test.serial(
  'should call EmailBroker with all recipients that are not failing',
  async t => {
    const postOffice = testEnvironment.get<PostOffice>(PostOffice);
    postOffice.setConfig({reminder: {mediums: {email: true}}});
    reset(mockedEmailBroker);

    when(mockedEmailBroker.send(anything())).thenResolve(true);

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
      {
        email: '123com',
        itemList: testItemList,
        user_id: '123',
        message_id: '123',
      },
      {
        email: 'e@mail.com',
        itemList: testItemList,
        user_id: '124',
        message_id: '124',
      },
      {
        email: 'f@mail.com',
        itemList: testItemList,
        user_id: '125',
        message_id: '125',
      },
    ];

    const options: MessageOptions = {
      type: 'reminder',
      subtype: 'partly-payment',
      mediums: {
        email: true,
      },
    };

    try {
      const res = await postOffice.send(recipients, options);
    } catch (e) {
      t.fail(e);
    }

    const [arg2] = capture(mockedEmailBroker.send).first();
    t.is(arg2.to, recipients[1].email);

    const [arg3] = capture(mockedEmailBroker.send).second();
    t.is(arg3.to, recipients[2].email);
  },
);
