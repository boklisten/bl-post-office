export const TEMPLATE_DIR = "../../lib/email/template/";
export const TEMPLATE_PATHS: {
  type: any;
  subtype: any;
  sequences: number[];
}[] = [
  {
    type: "reminder",
    subtype: "partly-payment",
    sequences: [0, 1, 2, 3]
  },
  {
    type: "reminder",
    subtype: "rent",
    sequences: [0, 1, 2]
  },
  {
    type: "reminder",
    subtype: "loan",
    sequences: [0, 1]
  },
  {
    type: "generic",
    subtype: "none",
    sequences: [0]
  },
  {
    type: "receipt",
    subtype: "none",
    sequences: [0]
  },
  {
    type: "booking",
    subtype: "confirmed",
    sequences: [0]
  },
  {
    type: "booking",
    subtype: "canceled",
    sequences: [0]
  }
];
