import packageJSON from "../package.json";

module.exports = {
  app: {
    version: packageJSON.version,
    title: "Simple SMS/email service",
    description: packageJSON.description
  },

  twilio: {
    authToken: "57c067f08c51dbba265de6b60950f49e",
    accountSID: "AC7dda1642a513632ea6a88193f4dc680c",
    fromNumber: "+17479998404"
  },

  sendgrid: {
    apiKey:
      "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"
  },

  rabbitmq: {
    // default port is 5672. If that is not used, then specify in the url
    url: process.env.AMQP_URL || "amqp://localhost",
    queue: "notify"
  },

  port: 3001
};
