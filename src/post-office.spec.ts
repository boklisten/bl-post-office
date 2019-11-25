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

const mockedEmailDepartment = mock(EmailDepartment);
const mockedSmsDepartment = mock(SmsDepartment);

const recipients: Recipient[] = [
  {email: 'some@email.com', user_id: '123', message_id: '123'},
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
  classesToMock: [
    {real: EmailDepartment, mock: instance(mockedEmailDepartment)},
    {real: SmsDepartment, mock: instance(mockedSmsDepartment)},
  ],
});

test.serial(
  'should not call SmsDepartment for type reminder if config.reminder.mediums.sms is false',
  async t => {
    reset(mockedEmailDepartment);
    reset(mockedSmsDepartment);

    const postOffice = testEnvironment.get<PostOffice>(PostOffice);

    const config = {
      reminder: {
        mediums: {
          email: true,
          sms: false,
        },
      },
      generic: {
        mediums: {},
      },
      receipt: {
        mediums: {},
      },
      match: {
        mediums: {},
      },
    };

    postOffice.setConfig(config);

    const recipients: Recipient[] = [
      {email: 'test@boklisten.co', user_id: 'abc2', message_id: 'abc1'},
    ];
    const options: MessageOptions = {
      type: 'reminder',
      subtype: 'partly-payment',
    };

    when(mockedSmsDepartment.send(recipients, options)).thenResolve(true);
    when(mockedEmailDepartment.send(anything(), anything())).thenResolve(true);

    try {
      const res = await postOffice.send(recipients, messageOptions);
      t.log('hi: ' + res);
    } catch (e) {
      t.fail(e);
    }

    verify(mockedSmsDepartment.send(recipients, messageOptions)).never();
    t.pass();
  },
);

test('should not call SmsDepartment if messageOptions.mediums.sms is false', async t => {
  reset(mockedEmailDepartment);
  when(mockedSmsDepartment.send(anything(), anything())).thenResolve(true);
  when(mockedEmailDepartment.send(anything(), anything())).thenResolve(true);

  const postOffice = testEnvironment.get<PostOffice>(PostOffice);

  const config = {
    reminder: {
      mediums: {
        email: true,
        sms: true,
      },
    },
    generic: {
      mediums: {
        email: true,
      },
    },
    receipt: {
      mediums: {},
    },
    match: {mediums: {}},
  };

  postOffice.setConfig(config);

  const recipients: Recipient[] = [
    {email: 'some@email.com', user_id: '123', message_id: '123'},
  ];
  const options: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
    mediums: {email: true, sms: false},
  };

  try {
    const res = await postOffice.send(recipients, options);
  } catch (e) {
    t.fail(e);
  }

  verify(mockedSmsDepartment.send(recipients, options)).never();
  t.pass();
});

test('should call SmsDepartment', async t => {
  reset(mockedEmailDepartment);
  when(mockedSmsDepartment.send(anything(), anything())).thenResolve(true);
  when(mockedEmailDepartment.send(anything(), anything())).thenResolve(true);

  const postOffice = testEnvironment.get<PostOffice>(PostOffice);

  const config = {
    reminder: {
      mediums: {
        email: true,
        sms: true,
      },
    },
    generic: {
      mediums: {
        email: true,
      },
    },
    receipt: {
      mediums: {},
    },
    match: {mediums: {}},
  };

  postOffice.setConfig(config);

  const recipients: Recipient[] = [
    {email: 'some@email.com', user_id: '123', message_id: '123'},
  ];
  const options: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
    mediums: {email: true, sms: true},
  };

  try {
    const res = await postOffice.send(recipients, options);
  } catch (e) {
    t.fail(e);
  }

  verify(mockedSmsDepartment.send(recipients, options)).once();
  t.pass();
});

test('should not call EmailDepartment for type reminder if config.reminder.mediums.email is false', async t => {
  reset(mockedEmailDepartment);
  when(mockedSmsDepartment.send(anything(), anything())).thenResolve(true);
  when(mockedEmailDepartment.send(anything(), anything())).thenResolve(true);

  const postOffice = testEnvironment.get<PostOffice>(PostOffice);

  const config = {
    reminder: {
      mediums: {
        email: false,
      },
    },
    generic: {
      mediums: {
        email: false,
      },
    },
    receipt: {
      mediums: {},
    },
    match: {mediums: {}},
  };

  postOffice.setConfig(config);

  const recipients: Recipient[] = [
    {email: 'some@email.com', user_id: '123', message_id: '123'},
  ];
  const options: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
    mediums: {email: true},
  };

  try {
    const res = await postOffice.send(recipients, options);
  } catch (e) {
    t.fail(e);
  }

  verify(mockedEmailDepartment.send(recipients, options)).never();
  t.pass();
});

test('should not call EmailDepartment if messageOptions.mediums.email is false', async t => {
  reset(mockedEmailDepartment);
  when(mockedSmsDepartment.send(anything(), anything())).thenResolve(true);
  when(mockedEmailDepartment.send(anything(), anything())).thenResolve(true);

  const postOffice = testEnvironment.get<PostOffice>(PostOffice);

  const config = {
    reminder: {
      mediums: {
        email: true,
      },
    },
    generic: {
      mediums: {},
    },
    receipt: {
      mediums: {},
    },
    match: {mediums: {}},
  };

  postOffice.setConfig(config);

  const recipients: Recipient[] = [
    {email: 'some@email.com', user_id: '123', message_id: '123'},
  ];
  const options: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
    mediums: {
      email: false,
      sms: true,
    },
  };

  try {
    const res = await postOffice.send(recipients, options);
  } catch (e) {
    t.fail(e);
  }

  verify(mockedEmailDepartment.send(recipients, options)).never();
  t.pass();
});

test('should reject if recipients array is empty', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);

  when(mockedEmailDepartment.send(recipients, messageOptions)).thenResolve(
    true,
  );

  try {
    await postOffice.send([], {
      type: 'receipt',
      subtype: 'partly-payment',
      mediums: {email: true},
    });
    t.fail();
  } catch (e) {
    t.is(e, `recipients array is empty`);
  }
});

test('should reject if option.type is not supported', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);

  when(mockedEmailDepartment.send(recipients, messageOptions)).thenResolve(
    true,
  );

  const randomVal = 'dfjasdklf' as any;

  try {
    await postOffice.send(recipients, {
      type: randomVal,
      subtype: 'partly-payment',
    });
    t.fail();
  } catch (e) {
    t.log(e);
    t.is(e, `message type "${randomVal}" not supported`);
  }
});

test('should reject if options.mediums is not defined', async t => {
  const postOffice = testEnvironment.get<PostOffice>(PostOffice);
  const options: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
  };

  await t.throwsAsync(postOffice.send(recipients, options), {
    instanceOf: ReferenceError,
    message: /options.mediums is not defined/,
  });
});

test.serial(
  'should call emailDepartment if option.type === "reminder"',
  async t => {
    const postOffice = testEnvironment.get<PostOffice>(PostOffice);

    postOffice.setConfig({
      reminder: {mediums: {email: true}},
      generic: {mediums: {}},
      receipt: {mediums: {}},
      match: {mediums: {}},
    });

    const options: MessageOptions = {
      type: 'reminder',
      subtype: 'partly-payment',
      mediums: {email: true},
    };

    when(mockedEmailDepartment.send(recipients, options)).thenResolve(true);

    const res = await postOffice.send(recipients, options);

    const args = capture(mockedEmailDepartment.send).last();

    t.is(args[0], recipients);
    t.is(args[1], options);
    t.true(res);

    reset(mockedEmailDepartment);
  },
);

test.serial(
  'should call emailDepartment if option.type === "generic"',
  async t => {
    const postOffice = testEnvironment.get<PostOffice>(PostOffice);

    postOffice.setConfig({
      reminder: {mediums: {}},
      generic: {mediums: {email: true}},
      receipt: {mediums: {}},
      match: {mediums: {}},
    });

    const options: MessageOptions = {
      type: 'generic',
      subtype: 'none',
      subject: 'Some subject',
      htmlContent: '<p>Hi</p>',
      mediums: {email: true},
    };

    when(mockedEmailDepartment.send(recipients, options)).thenResolve(true);

    const res = await postOffice.send(recipients, options);

    const [recipientsArg, optionArg] = capture(
      mockedEmailDepartment.send,
    ).last();

    t.is(recipientsArg, recipients);
    t.is(optionArg, options);
    t.true(res);

    reset(mockedEmailDepartment);
  },
);
