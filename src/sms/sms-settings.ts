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
        "Hei, fristen for bøkene dine fra Boklisten.no nærmer seg. Kom innom med bøkene før fristen 20. desember, så slipper du andre avdrag. Sjekk åpningstider på www.boklisten.no. I Oslo kan du også bruke våre innsamlingsskap på skolene utenom åpningstidene. Vennlig hilsen, Boklisten.no",
        "Vi minner om bøker med frist 20. desember. Sjekk påminnelsesmailer for mer informasjon. Kom innom med bøkene, send dem i posten, eller betal andre avdrag på nettsidene våre. Mvh Boklisten.no",
        "Vi minner om fristen for bøkene dine 1.juli. Sjekk vår nettside www.boklisten.no for booking av tid, eller sjekk ut alternativene i våre infomailer. Mvh Boklisten.no",
        "Siste påminnelse! Selg bøkene dine tilbake til Boklisten.no for å slippe andre avdrag. Bøker kan leveres der vi har åpent, eller sendes i posten frem til 1.juli. Se påminnelsesmailer for mer informasjon. Vi sender ut faktura med gebyr etter 1.juli! Mvh Boklisten.no"
      ],
      rent: [
        "Boklisten har ikke registrert din fulle levering av skolebøker. Siste frist er 1.juli! Send bøker i posten eller kom innom i vårt telt. Sjekk nettsiden for mer informasjon. Mvh Boklisten.no"
      ],
      loan: [
        "Boklisten har ikke registrert din fulle levering av skolebøker. Siste frist er 1.juli! Send bøker i posten eller kom innom i vårt telt. Sjekk nettsiden for mer informasjon. Mvh Boklisten.no"
      ]
    }
  }
};
