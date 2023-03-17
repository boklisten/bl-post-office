import { registerDependencies } from "mjml-validator";

import { BodyComponent } from "mjml-core";
import { BL_STYLES } from "../config/bl-styles.js";

registerDependencies({
  // Tell the validator which tags are allowed as our component's parent
  "mj-body": ["bl-item-list-receipt-component"],
  // Tell the validator which tags are allowed as our component's children
  "bl-item-list-receipt-component": []
});

/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
export default class BlItemListReceiptComponent extends BodyComponent {
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
          <mj-text>
            <h2>Transaksjoner</h2>
          </mj-text>

          <mj-table css-class="bl-table">
            <tr style="border-bottom: 5px solid">
              <th>#</th>
              <th>Tittel</th>
              <th>Handling</th>
              <mj-raw>{{#settings.display.deadline}}</mj-raw>
                <th>Frist</th>
              <mj-raw>{{/settings.display.deadline}}</mj-raw>
              <mj-raw>{{#settings.display.payment}}</mj-raw>
                <th>Pris</th>
              <mj-raw>{{/settings.display.payment}}</mj-raw>
              <mj-raw>{{#settings.display.leftToPay}}</mj-raw>
                <th>Igjen å betale</th>
              <mj-raw>{{/settings.display.leftToPay}}</mj-raw>
            </tr>

            <mj-raw>{{#itemList.items}}</mj-raw>
              <tr style="text-align: center; font-size: 9px">
                <td>{{id}}</td>
                <td>{{title}}</td>
                <td>{{action}}</td>
                <mj-raw>{{#settings.display.deadline}}</mj-raw>
                  <td>{{deadline}}</td>
                <mj-raw>{{/settings.display.deadline}}</mj-raw>
                <mj-raw>{{#settings.display.payment}}</mj-raw>
                  <td>{{amount}}</td>
                <mj-raw>{{/settings.display.payment}}</mj-raw>
                <mj-raw>{{#settings.display.leftToPay}}</mj-raw>
                  <td>{{leftToPay}}</td>
                <mj-raw>{{/settings.display.leftToPay}}</mj-raw>
              </tr>

            <mj-raw>{{/itemList.items}}</mj-raw>

            <mj-raw>{{#settings.display.payment}}</mj-raw>

            <tr style="text-align: center;">
              <td></td>
              <td></td>
              <mj-raw>{{#settings.display.deadline}}</mj-raw>
                <td></td>
              <mj-raw>{{/settings.display.deadline}}</mj-raw>

              <td style="text-align: center">Sum</td>

              <td style="text-align: center; border-top: 1px solid; border-bottom: 5px double;">{{itemList.summary.total}}</td>

              <mj-raw>{{#settings.display.leftToPay}}</mj-raw>
                <td style="text-align: center; border-top: 1px solid; border-bottom: 5px double;">{{itemList.summary.totalLeftToPay}}</td>
              <mj-raw>{{/settings.display.leftToPay}}</mj-raw>
            </tr>

            <tr style="font-size: 8px; text-align: center">
              <td></td>
              <td></td>
              <mj-raw>{{#settings.display.deadline}}</mj-raw>
                <td></td>
              <mj-raw>{{/settings.display.deadline}}</mj-raw>
              <td style="text-align: center">MVA</td>
              <td>{{itemList.summary.taxPercentage}}% {{itemList.summary.totalTax}}</td>
              <mj-raw>{{#settings.display.leftToPay}}</mj-raw>
                <td>{{itemList.summary.taxPercentageLeftToPay}}% {{itemList.summary.totalTaxLeftToPay}}</td>
              <mj-raw>{{/settings.display.leftToPay}}</mj-raw>
            </tr>

            <mj-raw>{{/settings.display.payment}}</mj-raw>
          </mj-table>
        </mj-column>
        </mj-section>
		`);
  }
}
