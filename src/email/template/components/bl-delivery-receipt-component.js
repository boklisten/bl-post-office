import {registerDependencies} from 'mjml-validator';
import {BodyComponent} from 'mjml-core';
import {BL_STYLES} from '../config/bl-styles.js';

registerDependencies({
  // Tell the validator which tags are allowed as our component's parent
  'mj-body': ['bl-delivery-receipt-component'],
  // Tell the validator which tags are allowed as our component's children
  'bl-delivery-receipt-component': [],
});

/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
export default class BlDeliveryReceiptComponent extends BodyComponent {
  // Tell the parser that our component won't contain other mjml tags
  static endingTag = true;

  /*
    Render is the only required function in a component.
    It must return an html string.
  */
  render() {
    return this.renderMJML(`
        <mj-section style="margin: 0">

      <mj-raw>{{#delivery}}</mj-raw>
          <mj-column>
            <mj-text>
              <h2>Leveringsdetaljer</h2>
            </mj-text>
            <mj-table text-align="left">
              <tr style="text-align: left">
                <th>Leveres til</th>
                <td>{{delivery.address}}</td>
              </tr>
              <tr style="text-align: left">
                <th>Forventet ankomst innen</th>
                <td>{{delivery.expectedDeliveryDate}}</td>
              </tr>
              <tr style="text-align: left">
                <th>Leveransemetode</th>
                <td>{{delivery.method}}</td>
              </tr>
              <tr style="text-align: left">
                <th>Totalt inkl. mva</th>
                <td>{{delivery.total}}</td>
              </tr>
            </mj-table>
          </mj-column>

      <mj-raw>{{/delivery}}</mj-raw>
        </mj-section>
		`);
  }
}
