import { registerDependencies } from "mjml-validator";
import { BodyComponent } from "mjml-core";

registerDependencies({
  "mj-body": ["bl-footer-contact-component"],
  "bl-footer-contact-component": []
});

export default class BlFooterContactComponent extends BodyComponent {
  // Tell the parser that our component won't contain other mjml tags
  static endingTag = true;

  render() {
    return this.renderMJML(`
      <mj-section style="margin-top: 80px" border="5px solid #26768f">
        <mj-group>
          <mj-column>
            <mj-text align="center">info@boklisten.no</mj-text>
          </mj-column>
          <mj-column>
            <mj-text align="center">www.boklisten.no</mj-text>
          </mj-column>
        </mj-group>
      </mj-section>
		`);
  }
}
