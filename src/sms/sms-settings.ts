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
        "Fristen for å levere eller betale avdragsbøker 20. desember nærmer seg! Sjekk vår nettside www.boklisten.no for åpningstider, eller finn mer informasjon på mail vi har sendt ut. Mvh Boklisten.no",
        "Vi minner om fristen for bøkene dine 20. desember. I tillegg til stand og postsending, kan du på mange skoler levere i våre innsamlingsbokser. Pass på at du kun leverer bøker med unik ID. Kontakt oss på info@boklisten.no om boksen er full.",
        "Siste påminnelse! Husk bøkene dine med frist 20.desember. Sjekk informasjonsmailer og nettside for å slippe unødvendige gebyrer. Mvh Boklisten.no",
        "Vi åpner opp for forlengelse og utkjøp på vår nettside frem til 31. desember. Logg inn på nettsiden og betal. Du kan fortsatt selge bøkene tilbake til oss når vi har åpent i januar, men slipper gebyr om du betaler før nyttår. Mvh Boklisten.no"
      ],
      rent: [
        "Minner om muligheten for å motta VG2-bøker før sommeren. Hvis du ønsker dette må du gå inn på https://www.boklisten.no/fastbuy/courses?branch=62ed2447a26632004868e122 og bestille innen fredag. Mvh, Boklisten.no",
        "Det er ikke registrert din fulle levering av skolebøker etter innsamlingsdagen. Du kan levere per post eller på stand i Oslo, frem til fristen 1. juli. Ødelagte og mistede bøker må erstattes - det er billigere før 1. juli. Med vennlig hilsen, Boklisten.no",
        "Boklisten har ikke registrert din fulle levering av skolebøker. Siste frist er 1. juli! Send bøker i posten eller kom innom i vårt telt. Sjekk nettsiden for mer informasjon. Mvh Boklisten.no"
      ],
      loan: [
        "På grunn av restriksjoner er innsamling på Sonans Stavanger stengt 20. desember. Siste dag er dermed 17. desember. Kom innom med bøkene dine da, eller send bøker i posten før fristen! Mvh Boklisten.no"
      ]
    }
  }
};
