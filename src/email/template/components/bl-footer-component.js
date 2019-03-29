import {registerDependencies} from 'mjml-validator';
import {BodyComponent} from 'mjml-core';

registerDependencies({
  // Tell the validator which tags are allowed as our component's parent
  'mj-body': ['bl-footer-component'],
  // Tell the validator which tags are allowed as our component's children
  'bl-footer-component': [],
});

/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
export default class BlFooterComponent extends BodyComponent {
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
      <mj-section padding="0">

        <mj-section background-color="#26768f" style="margin-top: 80px; color: white">
          <mj-group>
            <mj-column>
              <mj-text color="white" align="center">info@boklisten.no</mj-text>
            </mj-column>
            <mj-column>
              <mj-text color="white" align="center">www.boklisten.no</mj-text>
            </mj-column>
          </mj-group>
        </mj-section>

        <mj-section>
          <mj-column>
            <mj-image
              src="https://www.boklisten.no/assets/img/boklisten_logo_v2_icon_blue.png"
              height="25px"
              width="25px"
              css-class="bl-header-icon"
              alt="Boklisten.no"></mj-image>
            <mj-text color="white" align="center" font-size="8px">Boklisten.no AS © 2019</mj-text>
          </mj-column>
        </mj-section>
      </mj-section>
		`);
  }
}
