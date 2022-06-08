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
        "Hei! Semesteret er snart slutt. Vennligst gi oss beskjed om hva som skal skje med bøkene dine: https://staging.boklisten.no/m?d=010722 Mvh. Boklisten.no",
        "Hei fra oss i Boklisten.no. Minner om vår gjenbruksordning. Gi oss beskjed om hva som skal skje med bøkene dine: boklisten.no/m?d=201219",
        "Vil du spare penger før jul? Trykk her: boklisten.no/m?d=201219 for å levere bøkene dine direkte til en annen privatist etter jul! Med vennlig hilsen fra Boklisten.no"
      ]
    },
    reminder: {
      "partly-payment": [
        "Fristen for avdragsbøker 1.juli nærmer seg! Sjekk vår nettside www.boklisten.no for åpningstider, \n" +
        "eller finn mer informasjon på mail vi har sendt ut i dag. Mvh Boklisten.no",
        "Vi minner om bøker med frist 1. juli. Sjekk påminnelsesmailer for mer informasjon. Kom innom med bøkene, send dem i posten, eller betal andre avdrag på nettsidene våre. Mvh Boklisten.no",
        "Vi minner igjen om bøkene dine fra Boklisten.no med frist 20.desember. Sjekk informasjonsmailer og nettside for å slippe unødvendige gebyrer.",
        "Vi åpner opp for forlengelse og utkjøp på vår nettside frem til 31.desember. Logg inn på nettsiden og betal. Du kan fortsatt selge bøkene tilbake til oss når vi har åpent i januar, men slipper gebyr om du betaler før nyttår. Mvh Boklisten.no"
      ],
      rent: [
        "Boklisten har ikke registrert din fulle levering av skolebøker. Siste frist er 1.juli! Send bøker i posten eller kom innom i vårt telt. Sjekk nettsiden for mer informasjon. Mvh Boklisten.no"
      ],
      loan: [
        "På grunn av restriksjoner er innsamling på Sonans Stavanger stengt 20. desember. Siste dag er dermed 17. desember. Kom innom med bøkene dine da, eller send bøker i posten før fristen! Mvh Boklisten.no"
      ]
    }
  }
};
