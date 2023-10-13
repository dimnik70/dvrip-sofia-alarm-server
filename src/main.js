import net from "net";
import mqtt from "mqtt";
import { logging } from "./logging.js";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const MQTT_HOST = process.env.MQTT_HOST || "";
const MQTT_PORT = process.env.MQTT_PORT || 1883;
const MQTT_USER = process.env.MQTT_USER || "";
const MQTT_PASSWD = process.env.MQTT_PASSWD || "";
const PORT = process.env.PORT || 15002;

const moduleName = fileURLToPath(import.meta.url);

logging(
  `MQTT_HOST:${MQTT_HOST} MQTT_PORT:${MQTT_PORT} MQTT_USER:${MQTT_USER} MQTT_PASSWD:${MQTT_PASSWD} AlarmServerPort:${PORT}`,
  moduleName
);

class Log {
  log_event(message, message_kind = "") {
    // TODO Implement your logging logic here
    logging(message, moduleName);
  }

  log_info(message) {
    this.log_event(message, "INFO");
  }

  log_error(message) {
    this.log_event(message, "ERROR");
  }

  log_debug(message) {
    // TODO Implement debug logging logic here
  }
}

class MQTTPublisher {
  constructor(host, port, user, passwd) {
    this.mqttHost = host;
    this.mqttPort = port;
    this.mqttUser = user;
    this.mqttPass = passwd;
    this.client = mqtt.connect(`mqtt://${this.mqttHost}:${this.mqttPort}`, {
      username: this.mqttUser,
      password: this.mqttPass,
    });
  }

  publish(serialID, event) {
    const topic = `camalarm/${serialID}/event`;
    this.client.publish(topic, event);
  }
}

class AlarmServer {
  constructor() {
    this.server = net.createServer(this.handleClient.bind(this));
    this.log = new Log();
    this.publisher = new MQTTPublisher(
      MQTT_HOST,
      MQTT_PORT,
      MQTT_USER,
      MQTT_PASSWD
    );
  }

  handleClient(socket) {
    this.log.log_info(`Client connected from ${socket.remoteAddress}`);
    socket.on("data", (data) => {
      const payload = data.slice(20).toString("ascii").trim();
      this.log.log_info(`Payload: ${payload}`);
      const jsonData = JSON.parse(payload);
      const event_type = jsonData.Type;
      const event = jsonData.Event;
      const serialID = jsonData.SerialID;
      this.log.log_info(`${event_type} Serial: ${serialID}; Event: ${event}`);
      //   if (event_type === "Alarm") {
      //     this.publisher.publish(serialID, event);
      //   }
    });
  }

  startServer(port) {
    this.server.listen(port, "0.0.0.0", () => {
      this.log.log_info(`Server listening on port ${port}`);
    });
  }
}

const alarmServer = new AlarmServer();

alarmServer.startServer(PORT);
