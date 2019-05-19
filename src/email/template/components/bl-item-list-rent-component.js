import {registerDependencies} from 'mjml-validator';
import {BodyComponent} from 'mjml-core';
import {BL_STYLES} from '../config/bl-styles.js';

registerDependencies({
  // Tell the validator which tags are allowed as our component's parent
  'mj-body': ['bl-item-list-rent-component'],
  // Tell the validator which tags are allowed as our component's children
  'bl-item-list-rent-component': [],
});

/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
export default class BlItemListRentComponent extends BodyComponent {
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
            </tr>

            <mj-raw>{{#itemList.items}}</mj-raw>
            <tr style="text-align: center">
              <td>{{id}}</td>
              <td>{{title}}</td>
              <td>{{deadline}}</td>
            </tr>
            <mj-raw>{{/itemList.items}}</mj-raw>
          </mj-table>
        </mj-column>
        </mj-section>
		`);
  }
}
