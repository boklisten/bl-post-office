export const POST_OFFICE_SETTINGS = {
  messageTypes: {
    reminder: {
      mediums: ["email", "sms"]
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
  supportedTypes: ["receipt", "reminder", "generic", "match", "booking"]
};
