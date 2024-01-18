export const POST_OFFICE_SETTINGS = {
  messageTypes: {
    reminder: {
      mediums: ["email", "sms"]
    },
    "custom-reminder": {
      mediums: ["sms"]
    },
    generic: {
      mediums: ["email"]
    },
    receipt: {
      mediums: ["email"]
    },
    booking: {
      mediums: ["email"]
    }
  },
  supportedTypes: [
    "receipt",
    "reminder",
    "custom-reminder",
    "generic",
    "match",
    "booking"
  ]
};
