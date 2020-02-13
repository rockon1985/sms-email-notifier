import amqp from "amqplib/callback_api";
import config from "config";

let channel = null;
const rabbitmq = config.get("rabbitmq");
amqp.connect(rabbitmq.url, (err, conn) => {
  if (err) {
    throw new Error("AMQP Connection with RabbitMQ failed");
  }

  conn.createChannel((err, ch) => {
    channel = ch;
  });
});

export const publishToQueue = async data => {
  channel.sendToQueue(rabbitmq.queue, new Buffer(JSON.stringify(data)));
};

process.on("exit", code => {
  channel.close();
  logger.info(`Closing rabbitmq channel`);
});
