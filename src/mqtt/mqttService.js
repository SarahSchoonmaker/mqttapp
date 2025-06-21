import mqtt from 'mqtt';

let client;

export const connectMqtt = (onMessageCallback, setResponseCallback, setConnecting) => {
  const brokerUrl = 'ws://10.90.0.1:9001';

  if (client && client.connected) {
    const msg = '⚠️ Already connected to MQTT broker';
    console.warn(msg);
    setResponseCallback?.(msg);
    return;
  }

  setConnecting(true); 

  client = mqtt.connect(brokerUrl, {
    reconnectPeriod: 2000 
  });

  client.on('connect', () => {
    const msg = '✅ Connected to MQTT broker';
    console.log(msg);
    setConnecting(false);
    setResponseCallback?.(msg);
    client.subscribe('device/control/response');
  });

  client.on('reconnect', () => {
    setResponseCallback?.('🔄 Reconnecting to MQTT broker...');
  });

  client.on('message', (topic, message) => {
    onMessageCallback(message.toString());
  });

  client.on('error', (err) => {
    const errorMsg = `❌ MQTT error: ${err.message}`;
    console.error(errorMsg);
    setResponseCallback?.(errorMsg);
    setConnecting(false);
  });
};

export const sendCommand = (value) => {
  if (client?.connected) {
    client.publish('device/control', String(value));
  } else {
    console.warn('⚠️ Client not connected');
  }
};
