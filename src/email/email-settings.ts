export const EMAIL_SETTINGS: any = {
  name: "Boklisten.no",
  reminder: {
    subject: "Informasjon om bøker fra Boklisten.no",
    fromEmail: "info@boklisten.no",
    rent: [
      { subject: "Informasjon om bøker fra Boklisten.no" },
      { subject: "", fromEmail: "" }
    ]
  },
  generic: {
    fromEmail: "info@boklisten.no"
  },
  receipt: {
    fromEmail: "info@boklisten.no"
  },
  booking: {
    fromEmail: "info@boklisten.no"
  },
  subjects: {
    reminder: {
      rent: [
        "Informasjon om bøker fra Boklisten.no",
        "Påminnelse om tilbakelevering av bøker",
        "Siste påminnelse om tilbakelevering av bøker"
      ],
      "partly-payment": [
        "Informasjon til privatister med bøker med frist 20. desember 2022",
        "Andre påminnelse om bøker med frist 1. juli 2022",
        "Siste påminnelse om bøker fra Boklisten.no",
        "RETTELSE: Siste påminnelse om bøker fra Boklisten.no"
      ],
      loan: [
        "Informasjon om bøker fra Boklisten.no",
        "Siste påminnelse om manglende tilbakelevering av bøker",
        ""
      ]
    },
    receipt: {
      none: ["Kvittering"]
    },
    booking: {
      confirmed: ["Bekreftelse på din booking"],
      canceled: ["Din booking er kansellert"]
    }
  }
};
