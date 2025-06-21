import React, { useEffect, useState } from 'react';
import { connectMqtt, sendCommand } from "../mqtt/mqttservice";

const MqttControl = () => {
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    connectMqtt(
      (msg) => {
        setResponse(msg);
        setHistory(prev => [msg, ...prev]);
      },
      setResponse,
      setConnecting
    );
  }, []);

  return (
    <div>
      <h2>MQTT Device Control</h2>

      <button onClick={() => sendCommand(1)}>Turn ON</button>
      <button onClick={() => sendCommand(0)}>Turn OFF</button>

      {connecting && <p>🔄 Connecting to MQTT broker...</p>}

      <p><strong>Response:</strong> {response}</p>

      <div>
        {/* <h4>Message History:</h4> */}
        <ul>
          {history.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MqttControl;
