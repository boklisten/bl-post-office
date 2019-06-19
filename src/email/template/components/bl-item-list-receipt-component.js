import {registerDependencies} from 'mjml-validator';

import {BodyComponent} from 'mjml-core';
import {BL_STYLES} from '../config/bl-styles.js';

registerDependencies({
  // Tell the validator which tags are allowed as our component's parent
  'mj-body': ['bl-item-list-receipt-component'],
  // Tell the validator which tags are allowed as our component's children
  'bl-item-list-receipt-component': [],
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
            <tr style="border-bottom: 5px solid ${BL_STYLES.color.main}">
              <th>#</th>
              <th>Tittel</th>
              <th>Handling</th>
              <th>Frist</th>
              <th>Pris</th>
              <th>Igjen å betale</th>
            </tr>

            <mj-raw>{{#itemList.items}}</mj-raw>
            <tr style="text-align: center; font-size: 9px">
              <td>{{id}}</td>
              <td>{{title}}</td>
              <td>{{action}}</td>
              <td>{{deadline}}</td>
              <td>{{amount}}</td>
              <td>{{leftToPay}}</td>
            </tr>
            <mj-raw>{{/itemList.items}}</mj-raw>
            <tr>
              <th colspan="3"></th>
              <th>Sum</th>
              <th style="border-top: 1px solid ${
                BL_STYLES.color.main
              }; border-bottom: 5px double ${
      BL_STYLES.color.main
    };">{{itemList.summary.total}}</th>
              <th style="border-top: 1px solid ${
                BL_STYLES.color.main
              }; border-bottom: 5px double ${
      BL_STYLES.color.main
    };">{{itemList.summary.totalLeftToPay}}</th>
            </tr>
            <tr style="font-size: 10px;">
              <th colspan="3"></th>
              <th>MVA</th>
              <th>{{itemList.summary.taxPercentage}}% {{itemList.summary.totalTax}}</th>
              <th>{{itemList.summary.taxPercentageLeftToPay}}% {{itemList.summary.totalTaxLeftToPay}}</th>
            </tr>
          </mj-table>
        </mj-column>
        </mj-section>
		`);
  }
}
