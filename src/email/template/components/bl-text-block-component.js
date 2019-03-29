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
      <mj-section background-color="white">
        <mj-raw>{{#textBlocks}}</mj-raw>

          <mj-raw>{{#alert}}</mj-raw>
            <mj-column border-left="10px solid red" border-bottom="2px solid red" border-top="2px solid red" border-right="10px solid red" padding="0px">
          <mj-raw>{{/alert}}</mj-raw>

          <mj-raw>{{#secondary}}</mj-raw>
            <mj-column border-left="10px solid gray" border-bottom="2px solid gray" border-top="2px solid gray" border-right="10px solid gray" padding="0px">
          <mj-raw>{{/secondary}}</mj-raw>

          <mj-raw>{{#warning}}</mj-raw>
            <mj-column border-left="10px solid orange" border-bottom="2px solid orange" border-top="2px solid orange" border-right="10px solid orange" padding="0px">
          <mj-raw>{{/warning}}</mj-raw>

          <mj-raw>{{#regular}}</mj-raw>
            <mj-column background-color="white">
          <mj-raw>{{/regular}}</mj-raw>

          <mj-text>
            <mj-raw>{{#title}}</mj-raw>
              <h4>{{title}}</h4>
            <mj-raw>{{/title}}</mj-raw>
            {{text}}
          </mj-text>

          </mj-column>

        <mj-raw>{{/textBlocks}}</mj-raw>
      </mj-section>
		`);
  }
}
