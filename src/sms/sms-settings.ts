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
        "Fristen for avdragsbøker 1.juli nærmer seg! Sjekk vår nettside www.boklisten.no for booking av tid for å komme innom med dine bøker, eller finn mer informasjon på mail vi har sendt ut i dag. Mvh Boklisten.no",
        "Hei! Du har bøker hvor andre avdrag straks forfaller. Kom innom for å selge bøkene tilbake til oss, eller betal andre avdrag på nettsidene våre. Se påminnelsesmailene våre for mer informasjon. Mvh Boklisten.no",
        "Siste påminnelse! Selg bøkene dine tilbake til Boklisten.no for å slippe andre avdrag. Vi sender ut faktura på andre avdrag ved fristen. Se påminnelsesmailer for mer informasjon. Mvh Boklisten.no",
        "Hei! Vi kan ikke se at du har betalt andre delbetaling av dine bøker. Vi har nå generert en faktura, men du kan slippe gebyr ved å betale på vår nettside innen utløpet av 5.januar. Du kan selge bøker til oss i januar. Se mail for mer informasjon. Mvh Boklisten.no"
      ],
      rent: [
        "Hei - det nærmer seg frist for bøkene dine! Mange steder begynner å stenge før fristen. Kun Boklistens ansatte kan ta imot bøker. Sjekk nettsiden for åpningstider og postadresse, samt informasjonsmailene vi har sendt ut. Mvh Boklisten.no",
        "Hei - det nærmer seg frist for bøkene dine! Mange steder begynner å stenge før fristen. Kun Boklistens ansatte kan ta imot bøker. Sjekk nettsiden for åpningstider og postadresse, samt informasjonsmailene vi har sendt ut. Mvh Boklisten.no",
        "Siste påminnelse! Det er ikke registrert din fulle levering av bøker, absolutt siste frist er snart. Se påminnelsesmailer for mer info. Mvh Boklisten.no"
      ],
      loan: [
        "Det er ikke registrert din fulle levering av bøker. Se påminnelsesmailer for mer info. Mvh Boklisten.no",
        "Siste påminnelse! Det er ikke registrert din fulle levering av bøker, absolutt siste frist er snart. Se påminnelsesmailer for mer info. Mvh Boklisten.no",
        "Påminnelse fra Boklisten.no: Husk å skrive navn og skoleår i bøkene dine, så er det større sjanse for at boken din kommer til rette dersom du mister den. Vi ønsker lykke til med resten av skoleåret! Med vennlig hilsen, Boklisten.no"
      ]
    }
  }
};
