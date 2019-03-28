import {registerDependencies} from 'mjml-validator';
import {BodyComponent} from 'mjml-core';
import {BL_STYLES} from '../config/bl-styles.js';

registerDependencies({
  // Tell the validator which tags are allowed as our component's parent
  'mj-body': ['bl-text-block-component'],
  // Tell the validator which tags are allowed as our component's children
  'bl-text-block-component': [],
});

/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
export default class BlTextBlockComponent extends BodyComponent {
  // Tell the parser that our component won't contain other mjml tags
  static endingTag = true;

  /*
    Render is the only required function in a component.
    It must return an html string.
  */
  render() {
    return this.renderMJML(`
      <mj-section>
        <mj-column>
          <mj-text>Dette er textblocks!</mj-text>
          <mj-raw>{{#textBlocks}}</mj-raw>
            <mj-text>{{text}}</mj-text>
          <mj-raw>{{/textBlocks}}</mj-raw>
        </mj-column>
      </mj-section>
		`);
  }
}
