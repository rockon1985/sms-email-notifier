import config from "config";
import twilio from "twilio";
import { logger } from "../../lib";

const { authToken, accountSID, fromNumber } = config.get("twilio");

const client = twilio(accountSID, authToken);

export default class SMSService {
  static send(params = {}) {
    return client.messages
      .create({
        body: params.message,
        from: fromNumber,
        to: params.target
      })
      .then(message =>
        logger.info("SMSService: Message sent. SID: ", message.sid)
      );
  }
}
