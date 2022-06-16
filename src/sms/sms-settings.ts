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
        "Vi minner om fristen for bøkene dine 1.juli. I tillegg til stands og postsending, kan du på mange skoler levere i våre innsamlingsbokser. Pass på at du kun leverer bøker med unik ID evt. legg en lapp med navn og tlf i boken. Kontakt oss gjerne på e-post om skapet er fullt.",
        "Siste påminnelse! Selg bøkene dine tilbake til Boklisten.no for å slippe andre avdrag. Bøker kan leveres der vi har åpent, eller sendes i posten frem til 1.juli. Se påminnelsesmailer for mer informasjon. Vi sender ut faktura med gebyr etter 1.juli! Mvh Boklisten.no",
        "Vi åpner opp for forlengelse og utkjøp på vår nettside frem til 31.desember. Logg inn på nettsiden og betal. Du kan fortsatt selge bøkene tilbake til oss når vi har åpent i januar, men slipper gebyr om du betaler før nyttår. Mvh Boklisten.no"
      ],
      rent: [
        "",
        "Det er ikke registrert din fulle levering av skolebøker etter innsamlingsdagen. Du kan levere per post eller på stand i Oslo, frem til fristen 1. juli. Ødelagte og mistede bøker må erstattes - det er billigere før 1. juli. Med vennlig hilsen, Boklisten.no",
        "Boklisten har ikke registrert din fulle levering av skolebøker. Siste frist er 1.juli! Send bøker i posten eller kom innom i vårt telt. Sjekk nettsiden for mer informasjon. Mvh Boklisten.no"
      ],
      loan: [
        "På grunn av restriksjoner er innsamling på Sonans Stavanger stengt 20. desember. Siste dag er dermed 17. desember. Kom innom med bøkene dine da, eller send bøker i posten før fristen! Mvh Boklisten.no"
      ]
    }
  }
};
