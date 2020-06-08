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
        "Informasjon om bøker fra Boklisten.no",
        "Påminnelse om bøker fra Boklisten.no",
        "Andre påminnelse om bøker med frist 1. Juli",
        "Siste påminnelse om bøker fra Boklisten.no",
        "Manglende delbetaling av bøker"
      ],
      loan: [
        "Informasjon om bøker fra Boklisten.no",
        "Siste påminnelse om tilbakelevering av bøker",
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
