import config from "config";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(config.sendgrid.apiKey);

export default class EmailService {
  static send(params = {}) {
    const email = {
      to: params.target,
      from: "test@example.com",
      subject: params.subject || "Mail from Mailer",
      html:
        params.html ||
        params.message ||
        "sent via <strong>node-rabbitmq-sms-email-sender</strong>"
    };
    return sgMail.send(email);
  }
}
