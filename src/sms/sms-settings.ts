export const SMS_SETTINGS = {
  minLength: 5,
  maxLength: 280,
  fromNumber: '+4759447665',
  dymmy: {
    number: '+4712345678',
  },
  text: {
    match: {
      none: [
        'Melding til deg med kundeavtale hos Boklisten.no: Vennligst gi oss beskjed om hva som skal skje med bøkene dine: boklisten.no/m?d=201219',
        'Hei fra oss i Boklisten.no. Minner om vår gjenbruksordning. Gi oss beskjed om hva som skal skje med bøkene dine: boklisten.no/m?d=201219',
        'Vil du spare penger før jul? Trykk her: boklisten.no/m?d=201219 for å levere bøkene dine direkte til en annen privatist etter jul! Med vennlig hilsen fra Boklisten.no',
      ],
    },
    reminder: {
      'partly-payment': [
        'Fristen for avdragsbøker 1.juli nærmer seg! Sjekk vår nettside www.boklisten.no for booking av tid for å komme innom med dine bøker, eller finn mer informasjon på mail vi har sendt ut i dag. Mvh Boklisten.no',
        'I tillegg til våre stands og postsending, kan du ved Akademiet Oslo også levere bøker i vårt innleveringsskap. Pass på at du kun leverer bøker med unik ID - eller legg en post-it med navn og telefonnummer i boken. Ta gjerne kontakt med oss på info@boklisten.no om skapet er fullt.',
        'Vi minner om fristen for bøkene dine 1.juli. Sjekk vår nettside www.boklisten.no for booking av tid, eller sjekk ut alternativene i våre infomailer. Mvh Boklisten.no',
        'Siste påminnelse! Selg bøkene dine tilbake til Boklisten.no for å slippe andre avdrag. Bøker kan leveres der vi har åpent, eller sendes i posten frem til 1.juli. Se påminnelsesmailer for mer informasjon. Vi sender ut faktura med gebyr etter 1.juli! Mvh Boklisten.no'
      ],
      rent: [
        'Boklisten har ikke registrert din fulle levering av skolebøker. Siste frist er 1.juli! Send bøker i posten eller kom innom i vårt telt. Sjekk nettsiden for mer informasjon. Mvh Boklisten.no'
      ],
      loan: [
        'Boklisten har ikke registrert din fulle levering av skolebøker. Siste frist er 1.juli! Send bøker i posten eller kom innom i vårt telt. Sjekk nettsiden for mer informasjon. Mvh Boklisten.no'
      ],
    },
  },
};
