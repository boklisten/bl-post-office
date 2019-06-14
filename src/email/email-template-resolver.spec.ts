import test from 'ava';
import {EmailTemplateResolver} from './email-template-resolver';
import {TestEnvironment} from '../../test/test-environment';
import {
  MessageType,
  MessageOptions,
  MessageSubtype,
} from '../interfaces/message-options';

const testEnvironment = new TestEnvironment({
  classesToBind: [EmailTemplateResolver],
});

test('should throw error if messageOptions.type is not supported', t => {
  const emailTemplateResolver = testEnvironment.get<EmailTemplateResolver>(
    EmailTemplateResolver,
  );

  const messageOptions: MessageOptions = {
    type: 'randomVal' as MessageType,
    subtype: 'partly-payment',
  };

  const emailTemplateInput = {};

  t.throws(
    () => {
      emailTemplateResolver.generate(messageOptions, emailTemplateInput);
    },
    {
      instanceOf: ReferenceError,
      message: /could not get template for type "randomVal"/,
    },
  );
});

test('should throw error if messageOptions.subtype is not supported', t => {
  const emailTemplateResolver = testEnvironment.get<EmailTemplateResolver>(
    EmailTemplateResolver,
  );

  const messageOptions: MessageOptions = {
    type: 'reminder',
    subtype: 'randomVal' as MessageSubtype,
  };

  const emailTemplateInput = {};

  t.throws(
    () => {
      emailTemplateResolver.generate(messageOptions, emailTemplateInput);
    },
    {
      instanceOf: ReferenceError,
      message: /could not get template for type "reminder" subtype "randomVal"/,
    },
  );
});

test('should return file if messageOptions.type and messageOptions.subtype is supported', t => {
  const emailTemplateResolver = testEnvironment.get<EmailTemplateResolver>(
    EmailTemplateResolver,
  );

  const messageOptions: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
  };

  const emailTemplateInput = {};

  t.truthy(emailTemplateResolver.generate(messageOptions, emailTemplateInput));
});

test('should return file if messageOptions.type is "reminder" and messageOptions.subtype is "rent"', t => {
  const emailTemplateResolver = testEnvironment.get<EmailTemplateResolver>(
    EmailTemplateResolver,
  );

  const messageOptions: MessageOptions = {
    type: 'reminder',
    subtype: 'rent',
    sequence_number: 1,
  };

  const emailTemplateInput = {};

  t.truthy(emailTemplateResolver.generate(messageOptions, emailTemplateInput));
});

test('should return file if messageOptions.type is "generic" and messageOptions.subtype is "none"', t => {
  const emailTemplateResolver = testEnvironment.get<EmailTemplateResolver>(
    EmailTemplateResolver,
  );

  const messageOptions: MessageOptions = {
    type: 'generic',
    subtype: 'none',
    sequence_number: 0,
  };

  const emailTemplateInput = {};

  t.truthy(emailTemplateResolver.generate(messageOptions, emailTemplateInput));
});
