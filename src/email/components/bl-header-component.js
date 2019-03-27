import {registerDependencies} from 'mjml-validator';
import {BodyComponent} from 'mjml-core';
import {BL_STYLES} from '../config/bl-styles.js';

registerDependencies({
  // Tell the validator which tags are allowed as our component's parent
  'mj-body': ['bl-header-component'],
  // Tell the validator which tags are allowed as our component's children
  'bl-header-component': [],
});

/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
export default class BlHeaderComponent extends BodyComponent {
  // Tell the parser that our component won't contain other mjml tags
  static endingTag = true;

  // Tells the validator which attributes are allowed for mj-layout
  static allowedAttributes = {
    'stars-color': 'color',
    color: 'color',
    'font-size': 'unit(px)',
    align: 'enum(left,right,center)',
  };

  // What the name suggests. Fallback value for this.getAttribute('attribute-name').
  static defaultAttributes = {
    'stars-color': 'yellow',
    color: 'black',
    'font-size': '12px',
    align: 'center',
  };

  /*
    Render is the only required function in a component.
    It must return an html string.
  */
  render() {
    return this.renderMJML(`
      <mj-section background-color="${BL_STYLES.color.main}">
        <mj-column>
            <mj-image
              src="https://www.boklisten.no/assets/img/boklisten_logo_v2_icon_white_lg.png"
              height="50px"
              width="50px"
              css-class="bl-header-icon"
              alt="Boklisten.no">
          </mj-image>
        </mj-column>
      </mj-section>
		`);
  }
}
