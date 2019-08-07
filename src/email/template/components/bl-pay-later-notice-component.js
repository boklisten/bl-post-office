import {registerDependencies} from 'mjml-validator';
import {BodyComponent} from 'mjml-core';
import {BL_STYLES} from '../config/bl-styles.js';

registerDependencies({
  // Tell the validator which tags are allowed as our component's parent
  'mj-body': ['bl-pay-later-notice-component'],
  // Tell the validator which tags are allowed as our component's children
  'bl-pay-later-notice-component': [],
});

/*
  Our component is a (useless) simple text tag, that adds colored stars around the text.
  It can take 3 attributes, to specify size and colors.
*/
export default class BlPayLaterNoticeComponent extends BodyComponent {
  // Tell the parser that our component won't contain other mjml tags
  static endingTag = true;

  /*
    Render is the only required function in a component.
    It must return an html string.
  */
  render() {
    return this.renderMJML(`
      <mj-section style="margin: 0; border: solid gray 5px">
        <mj-column border="dashed gray 5px">
          <mj-text>
            <h1 style="text-align: center; padding-bottom: 10px">Informasjon om delbetaling</h1>
            <p>Du har valgt å delbetale en eller flere bøker. Dette fungerer slik at du betaler for boken i to omganger. En betaling før du får boken og en betaling før den oppgitte fristen.</p>
            <h4>Andre delbetaling</h4>
            <p>Når fristen nærmer seg skal du betale andre avdrag. Dette gjør du enten via vår nettside eller på vår stand.</p>
            <h4>Vi kjøper tilbake bøker, og du kan spare penger</h4>
            <p>I noen tilfeller så vil vi kunne kjøpe tilbake bøker. Hvis din bok kjøpes tilbake av oss, så vil du kunne selge den tilbake til oss istedenfor å betale andre avdrag. Du bør dobbelt-sjekke om dette kan gjelde dine bøker, da du vil kunne spare penger! Vær oppmerksom på at dette ikke gjelder alle bøker og du bør være forberedt på å måtte betale andre delbetaling.</p>
          </mj-text>
        </mj-column>
      </mj-section>
		`);
  }
}
