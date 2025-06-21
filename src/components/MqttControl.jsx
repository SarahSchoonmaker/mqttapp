import React, { useEffect, useState } from 'react';
import { connectMqtt, sendCommand, disconnectMqtt } from '../mqtt/mqttservice';

const MqttControl = () => {
  const [response, setResponse] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    connectMqtt(
      (msg) => {
        if (!msg.includes('disconnected')) {
          setResponse(msg);
        }
      },
      (msg) => {
        setResponse(msg);
        if (msg.includes('Connected')) setConnected(true);
        if (msg.includes('disconnected')) setConnected(false);
        setConnecting(false);
      },
      setConnecting
    );
  };

  useEffect(() => {
    handleConnect();
  }, []);

  const handleDisconnect = () => {
    disconnectMqtt();
    const msg = '🔌 MQTT connection disconnected';
    setResponse(msg);
    setConnected(false);
  };

  return (
    <div>
      <h2>MQTT Device Control</h2>

      <button onClick={() => sendCommand(1, setResponse)}>Turn ON</button>
      <button onClick={() => sendCommand(0, setResponse)}>Turn OFF</button>

      {connected && <button onClick={handleDisconnect}>Disconnect</button>}

      {!connected && (
        <button onClick={handleConnect} disabled={connecting}>
          🔌 Connect
        </button>
      )}

      {connecting && <p>🔄 Connecting to MQTT broker...</p>}

      <p><strong>Response:</strong> {response}</p>
    </div>
  );
};

export default MqttControl;
