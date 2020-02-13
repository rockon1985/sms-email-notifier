import Responder from "../../lib/expressResponder";
import { publishToQueue } from "../../lib/rabbitmq";
import BadRequestError from "../errors/badRequestError";

export default class NotificationController {
  static page(req, res) {
    // getFromRedisQueue
    // .then(Notifications => Responder.success(res, Notifications))
    // .catch(errorOnDBOp => Responder.operationFailed(res, errorOnDBOp));
  }

  static create(req, res) {
    const payload = req.body;
    _validateCreateReq(payload);
    payload.sent = true;
    // create/push a messsage in rabbitMQ queue
    publishToQueue(payload)
      .then(() => Responder.success(res, payload))
      .catch(error => Responder.operationFailed(res, error));
  }
}

const _validateCreateReq = payload => {
  if (!/sms|email/.test(payload.type)) {
    throw new BadRequestError(
      "Request should have type either be sms or email"
    );
  }

  if (!payload.target) {
    throw new BadRequestError("target phone/email is required");
  }
  const targetRegex = {
    sms: /^\+\d{1,2}\d{10}$/,
    email: /\S+@\S+\.\S+/
  };
  payload.target = payload.target.trim();
  if (!targetRegex[payload.type].test(payload.target)) {
    throw new BadRequestError("target is incorrect format.");
  }
};
