import test from 'ava';
import {TEMPLATE_PATHS} from './template-paths';
import {EMAIL_SETTINGS} from './email-settings';

test('should have a subject for each sequence in templatePaths for type "reminder"', t => {
  for (let templatePath of TEMPLATE_PATHS) {
    if (templatePath.type === 'reminder') {
      for (let sequenceNumber of templatePath.sequences) {
        t.truthy(
          EMAIL_SETTINGS.subjects[templatePath.type][templatePath.subtype][
            sequenceNumber
          ],
        );
      }
    }
  }
});
