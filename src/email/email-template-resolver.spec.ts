import test from 'ava';
import {EmailTemplateResolver} from './email-template-resolver';
import {TestEnvironment} from '../../test/test-environment';

const testEnvironment = new TestEnvironment({
  classesToBind: [EmailTemplateResolver],
});

test('should throw error if type is not supported', t => {
  const emailTemplateResolver = testEnvironment.get<EmailTemplateResolver>(
    EmailTemplateResolver,
  );

  const testType = 'randomVal';

  try {
    emailTemplateResolver.getTemplate(testType, 'partly-payment');
    t.fail();
  } catch (e) {
    t.is(e, `type "${testType}" not supported`);
  }
});

test('should throw error if subtype is not supported', t => {
  const emailTemplateResolver = testEnvironment.get<EmailTemplateResolver>(
    EmailTemplateResolver,
  );

  const testType = 'reminder';
  const testSubtype = 'randomVal';

  try {
    emailTemplateResolver.getTemplate(testType, testSubtype);
    t.fail();
  } catch (e) {
    t.is(e, `subtype "${testSubtype}" not supported`);
  }
});

test('should return file if type and subtype is supported', t => {
  const emailTemplateResolver = testEnvironment.get<EmailTemplateResolver>(
    EmailTemplateResolver,
  );

  const testType = 'reminder';
  const testSubtype = 'partly-payment';

  try {
    const file = emailTemplateResolver.getTemplate(testType, testSubtype);
    t.truthy(file);
  } catch (e) {
    t.fail('file is not found');
  }
});
