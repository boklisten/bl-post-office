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

  try {
    emailTemplateResolver.generate(messageOptions);
    t.fail();
  } catch (e) {
    t.is(e, `type "${messageOptions.type}" not supported`);
  }
});

test('should throw error if messageOptions.subtype is not supported', t => {
  const emailTemplateResolver = testEnvironment.get<EmailTemplateResolver>(
    EmailTemplateResolver,
  );

  const messageOptions: MessageOptions = {
    type: 'reminder',
    subtype: 'randomVal' as MessageSubtype,
  };

  try {
    emailTemplateResolver.generate(messageOptions);
    t.fail();
  } catch (e) {
    t.is(e, `subtype "${messageOptions.subtype}" not supported`);
  }
});

test('should return file if messageOptions.type and messageOptions.subtype is supported', t => {
  const emailTemplateResolver = testEnvironment.get<EmailTemplateResolver>(
    EmailTemplateResolver,
  );

  const messageOptions: MessageOptions = {
    type: 'reminder',
    subtype: 'partly-payment',
  };

  try {
    const file = emailTemplateResolver.generate(messageOptions);
    t.truthy(file);
  } catch (e) {
    t.fail('file is not found');
  }
});
