import { registerDependencies } from "mjml-validator";
import { BodyComponent } from "mjml-core";
import { BL_STYLES } from "../config/bl-styles.js";

registerDependencies({
  // Tell the validator which tags are allowed as our component's parent
  "mj-body": ["bl-item-list-component"],
  // Tell the validator which tags are allowed as our component's children
  "bl-item-list-component": []
});

/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
export default class BlItemListComponent extends BodyComponent {
  // Tell the parser that our component won't contain other mjml tags
  static endingTag = true;

  /*
    Render is the only required function in a component.
    It must return an html string.
  */
  render() {
    return this.renderMJML(`
      <mj-section css-class="bl-content">
        <mj-column>
          <mj-table css-class="bl-table">
            <tr style="border-bottom: 5px solid ${BL_STYLES.color.main}">
              <th>#</th>
              <th>Tittel</th>
              <th>Frist</th>
              <th>Igjen å betale</th>
            </tr>

            <mj-raw>{{#itemList.items}}</mj-raw>
            <tr style="text-align:center;">
              <td>{{id}}</td>
              <td>{{title}}</td>
              <td>{{deadline}}</td>
              <td>{{leftToPay}}</td>
            </tr>
            <mj-raw>{{/itemList.items}}</mj-raw>
            <tr>
              <th colspan="2"></th>
              <th>Sum</th>
              <th style="border-top: 1px solid ${
                BL_STYLES.color.main
              }; border-bottom: 5px double ${
      BL_STYLES.color.main
    };">{{itemList.summary.total}}</th>
            </tr>
            <tr style="font-size: 10px;">
              <th colspan="2"></th>
              <th>MVA ({{itemList.summary.taxPercentage}}%)</th>
              <th>{{itemList.summary.totalTax}}</th>
            </tr>
          </mj-table>
        </mj-column>
        </mj-section>
		`);
  }
}
