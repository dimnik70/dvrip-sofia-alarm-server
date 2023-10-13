## DVR IP (Sofia) CCTV Alarm Server

This is a simple Node.js-based Alarm Server designed to handle messages from DVR IP (Sofia) CCTV cameras. The server processes alarm events and publishes them to MQTT topics for further processing.

### Prerequisites

Before you start, make sure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)

### Getting Started

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Create a `.env` file:**

   Create a `.env` file in the root directory of the project and add the following environment variables:

   ```env
   MQTT_HOST=your_mqtt_host
   MQTT_PORT=your_mqtt_port
   MQTT_USER=your_mqtt_username
   MQTT_PASSWD=your_mqtt_password
   PORT=your_server_port
   ```

3. **Start the server using Docker Compose:**

   ```sh
   docker-compose up -d
   ```

   This will start the Alarm Server in the background.

### Environment Variables

- **MQTT_HOST:** Hostname of your MQTT broker.
- **MQTT_PORT:** Port number of your MQTT broker (typically 1883).
- **MQTT_USER:** MQTT broker username.
- **MQTT_PASSWD:** MQTT broker password.
- **PORT:** Alarm server port (typically 15002).

### Usage

The Alarm Server listens for incoming messages from DVR IP cameras. When an alarm event is received, it publishes the event to the specified MQTT topic.

### Customization

Feel free to customize the server according to your specific requirements. You can modify the logic in `alarm-server.js` to handle different types of messages or events.

### Support and Contributions

If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.
