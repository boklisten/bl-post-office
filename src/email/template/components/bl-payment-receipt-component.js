import {registerDependencies} from 'mjml-validator';
import {BodyComponent} from 'mjml-core';
import {BL_STYLES} from '../config/bl-styles.js';

registerDependencies({
  // Tell the validator which tags are allowed as our component's parent
  'mj-body': ['bl-payment-receipt-component'],
  // Tell the validator which tags are allowed as our component's children
  'bl-payment-receipt-component': [],
});

/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
export default class BlPaymentReceiptComponent extends BodyComponent {
  // Tell the parser that our component won't contain other mjml tags
  static endingTag = true;

  /*
    Render is the only required function in a component.
    It must return an html string.
  */
  render() {
    return this.renderMJML(`
      <mj-section style="margin: 0">
        <mj-column>
          <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" />
          <mj-text>
            <h2 style="text-align: center">TOTAL SUM: {{payment.total}}</h2>

            <mj-raw>{{#settings.display.leftToPay}}</mj-raw>
              <mj-raw>{{^payment.reservation}}</mj-raw>
                <h3 style="text-align: center">Betalt: {{payment.totalPayed}}</h3>
              <mj-raw>{{/payment.reservation}}</mj-raw>
            <mj-raw>{{/settings.display.leftToPay}}</mj-raw>
          </mj-text>
          <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" />
          <mj-raw>{{^payment.reservation}}</mj-raw>
            <mj-text>
              <h2>Betalingsdetaljer</h2>
            </mj-text>
            <mj-table>
              <tr style="text-align: left">
                <th>#</th>
                <th>Metode</th>
                <th>Status</th>
                <th>Betalt</th>
              </tr>
              <mj-raw>{{#payment.payments}}</mj-raw>
                <tr>
                  <td>{{id}}</td>
                  <td>{{method}} {{cardNumber}}</td>
                  <td>{{status}}</td>
                  <td>{{amount}}</td>
                </tr>
              <mj-raw>{{/payment.payments}}</mj-raw>
            </mj-table>
          <mj-raw>{{/payment.reservation}}</mj-raw>

          <mj-raw>{{#payment.reservation}}</mj-raw>
            <mj-text>
              <div style="border: 5px solid orange; padding: 10px">
              <h2>Dette er kun en reservasjon. Du har ikke betalt. Betaling skjer når du kommer på stand.</h2>
              </div>
            </mj-text>
          <mj-raw>{{/payment.reservation}}</mj-raw>
        </mj-column>
      </mj-section>
		`);
  }
}
