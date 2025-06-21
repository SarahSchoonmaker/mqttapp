import mqtt from 'mqtt';

let client;

export const connectMqtt = (onMessageCallback, setResponseCallback, setConnectingCallback) => {
  const brokerUrl = 'wss://10.90.0.1:9001';

  if (client && client.connected) {
    const msg = '⚠️ Already connected to MQTT broker';
    console.warn(msg);
    setResponseCallback?.(msg);
    return;
  }

  setConnectingCallback?.(true);
  client = mqtt.connect(brokerUrl);

  client.on('connect', () => {
    const msg = '✅ Connected to MQTT broker';
    console.log(msg);
    setConnectingCallback?.(false);
    setResponseCallback?.(msg);
    client.subscribe('device/control/response');
  });

  client.on('message', (topic, message) => {
    onMessageCallback(message.toString());
  });

  client.on('error', (err) => {
    const errorMsg = `❌ MQTT connection error: ${err.message}`;
    console.error(errorMsg);
    setConnectingCallback?.(false);
    setResponseCallback?.(errorMsg);
  });

  client.on('close', () => {
    setResponseCallback?.('🔌 MQTT connection disconnected');
  });
};

export const sendCommand = (value, callback) => {
  if (client?.connected) {
    client.publish('device/control', String(value), () => {
      callback?.(`📤 Command sent: ${value}`);
    });
  } else {
    callback?.('⚠️ Client not connected');
  }
};

export const disconnectMqtt = () => {
  if (client?.connected) {
    client.end(); // Will trigger the 'close' event
  }
};
