export const SMS_SETTINGS = {
  minLength: 5,
  maxLength: 280,
  fromNumber: "+4759447665",
  dymmy: {
    number: "+4712345678"
  },
  text: {
    match: {
      none: [
        "Melding til deg med kundeavtale hos Boklisten.no: Vennligst gi oss beskjed om hva som skal skje med bøkene dine: boklisten.no/m?d=201219",
        "Hei fra oss i Boklisten.no. Minner om vår gjenbruksordning. Gi oss beskjed om hva som skal skje med bøkene dine: boklisten.no/m?d=201219",
        "Vil du spare penger før jul? Trykk her: boklisten.no/m?d=201219 for å levere bøkene dine direkte til en annen privatist etter jul! Med vennlig hilsen fra Boklisten.no"
      ]
    },
    reminder: {
      "partly-payment": [
        "Hei, fristen for bøkene dine fra Boklisten.no nærmer seg. Vi har sendt deg en mail med informasjon du bør lese. Med vennlig hilsen, Boklisten.no",
        "Ferdig med eksamen? Book time for å komme innom med bøkene dine på www.boklisten.no! Du kan også sende bøker i posten. Med vennlig hilsen, Boklisten.no",
        "Påminnelse om dine bøker fra Boklisten.no! Selg bøkene dine tilbake til Boklisten.no for å slippe andre avdrag. Vi sender ut faktura på andre avdrag 1.juli. Se påminnelsesmailer eller nettsiden vår for mer informasjon.",
        "Siste påminnelse! Selg bøkene dine tilbake til Boklisten.no for å slippe andre avdrag. Bøker kan leveres der vi har åpent, eller sendes i posten frem til 1.juli. Se påminnelsesmailer for mer informasjon. Vi sender ut faktura med gebyr etter 1.juli! Mvh Boklisten.no"
      ],
      rent: [
        "Hei - det nærmer seg frist for bøkene dine! Mange steder begynner å stenge før fristen. Kun Boklistens ansatte kan ta imot bøker. Sjekk nettsiden for åpningstider og postadresse, samt informasjonsmailene vi har sendt ut. Mvh Boklisten.no",
        "Hei - det nærmer seg frist for bøkene dine! Mange steder begynner å stenge før fristen. Kun Boklistens ansatte kan ta imot bøker. Sjekk nettsiden for åpningstider og postadresse, samt informasjonsmailene vi har sendt ut. Mvh Boklisten.no",
        "Siste påminnelse! Det er ikke registrert din fulle levering av bøker, absolutt siste frist er snart. Se påminnelsesmailer for mer info. Mvh Boklisten.no"
      ],
      loan: [
        "Det er ikke registrert din fulle levering av bøker. Se påminnelsesmailer for mer info. Mvh Boklisten.no",
        "Det er ikke registrert din fulle levering av bøker du har lånt fra Boklisten.no. Vi har et felles hentested i Oslo, og siste frist er 1.juli. Sjekk vår nettside og informasjonsmail for detaljer. Mvh Boklisten.no",
        "Boklisten har ikke registrert din fulle levering av skolebøker. Siste frist er 1.juli! Send bøker i posten eller kom innom i vårt telt. Sjekk nettsiden for mer informasjon. Mvh Boklisten.no"
      ]
    }
  }
};
