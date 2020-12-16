export const SMS_SETTINGS = {
  minLength: 5,
  maxLength: 350,
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
        "Hei! Vi har frem til fredag et innsamlingsskap stående i bygg 2 på Sonans. Bøker med unike IDer kan leveres der innen fredag klokken 15 - hvis du ikke har anledning til å komme innom i vår åpningstid. Med vennlig hilsen, Boklisten.no",
        "Hei! Du har bøker hvor andre avdrag straks forfaller. Kom innom med bøkene, send dem i posten, eller betal andre avdrag på nettsidene våre. Se påminnelsesmailene våre for mer informasjon. Mvh Boklisten.no",
        "Vi minner igjen om bøkene dine fra Boklisten.no med frist 20.desember. Sjekk informasjonsmailer og nettside for å slippe unødvendige gebyrer.",
        "Siste mulighet for betaling av andre avdrag før vi sender ut faktura er 31.desember! Logg inn på nettsiden, og betal. Du kan også forlenge fristen til 1.juli ved å betale 50 kroner per bok. Du kan fortsatt selge bøkene tilbake til oss når vi har åpent i januar, men slipper gebyr om du betaler før nyttår. Mvh Boklisten.no"
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
