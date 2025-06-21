## 📡 MQTT Device Control App

This is a lightweight React-based web application that connects to an MQTT broker over WebSocket. It allows users to remotely control a device by sending `ON` and `OFF` commands and displays live responses from the device.

### 🔧 Features

* Connects to an MQTT broker via WebSocket (`ws://`)
* Sends `device/control` messages to trigger device actions
* Displays current response and full message history
* Auto-reconnects on disconnects
* Shows connection status with a loading spinner

### 📂 Tech Stack

* React
* MQTT.js
* Vite

### 🚀 Usage

1. Start the Mosquitto broker with WebSocket enabled (e.g., on port `9001`).
2. Run the React app with `npm run dev`.
3. Open `http://localhost:5173` to use the interface.

