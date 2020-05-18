import { registerDependencies } from "mjml-validator";
import { BodyComponent } from "mjml-core";

registerDependencies({
  "mj-body": ["bl-footer-logo-component"],
  "bl-footer-logo-component": []
});

export default class BlFooterLogoComponent extends BodyComponent {
  static endingTag = true;

  render() {
    return this.renderMJML(`
      <mj-section>
        <mj-column>
          <mj-image
            src="https://www.boklisten.no/assets/img/boklisten_logo_v2_icon_blue.png"
            height="25px"
            width="25px"
            css-class="bl-header-icon"
            alt="Boklisten.no"></mj-image>
          <mj-text align="center" font-size="8px">Boklisten.no AS © 2020</mj-text>
        </mj-column>
      </mj-section>
		`);
  }
}
