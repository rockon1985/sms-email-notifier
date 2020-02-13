import amqp from "amqplib/callback_api";
import config from "config";
import logger from "./logger";
import ServiceMapper from "../app/services";

const start = () => {
  const rabbitmq = config.get("rabbitmq");
  logger.info("RabbitMQ Worker: Connecting to RAbbitMQ URL: " + rabbitmq.url);
  amqp.connect(rabbitmq.url, (err, connection) => {
    if (err) {
      throw new Error("AMQP Connection with RabbitMQ failed");
    }
    logger.info("RabbitMQ Worker: Connection established");

    connection.createChannel((err, channel) => {
      channel.assertQueue(rabbitmq.queue, {
        durable: true
      });
      logger.info(
        `RabbitMQ Worker: started and listening on queue ${rabbitmq.queue}`
      );
      channel.consume(
        rabbitmq.queue,
        data => {
          logger.info("RabbitMQ Worker: Received %s", data.content);
          const request = JSON.parse(data.content.toString());
          const Service = ServiceMapper[request.type];
          if (!Service || typeof Service.send !== "function") {
            return logger.error("Worker Error: Unknown request type", request);
          }
          Service.send(request)
            .then(() => channel.ack(data))
            .catch(err => {
              logger.error(
                "Worker Error: error while serving request from queue"
              );
              logger.error("Error: ", err);
            });
        },
        { noAck: false }
      );
    });
  });
};

export default start;
