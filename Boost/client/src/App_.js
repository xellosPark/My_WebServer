import logo from './logo.svg';
//import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [data, setData] = useState([]);
  const ws = useRef(null);
  const reconnectInterval = 3000; // 재연결 시도 간격 (3초)

  const connect = () => {
    if (ws.current && (ws.current.readyState !== WebSocket.CLOSED || ws.current.readyState === WebSocket.CONNECTING)) {
      // 이미 열린 웹소켓이 있거나 연결 중이면 재연결하지 않음
      return;
    }

    ws.current = new WebSocket('ws://localhost:8080'); // C# 서버의 경우 경로 추가  'ws://localhost:8080/Time'

    ws.current.onopen = () => {
      console.log('웹소켓 서버에 연결되었습니다');
    };

    ws.current.onmessage = (event) => {
      setData(prevData => [...prevData, event.data]);
    };

    ws.current.onclose = () => {
      console.log('웹소켓 서버와의 연결이 끊어졌습니다. 재연결을 시도합니다.');
      setTimeout(() => connect(), reconnectInterval);
    };

    ws.current.onerror = (error) => {
      console.error('웹소켓 에러:', error);
      ws.current.close();
    };
  };

  useEffect(() => {
    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    }
  }, []);

  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:8080');

  //   ws.onopen = () => {
  //     console.log('웹소켓 서버에 연결되었습니다');
  //   };

  //   ws.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     setData(message.time);
  //   };

  //   ws.onclose = () => {
  //     console.log('웹소켓 서버와의 연결이 끊어졌습니다');
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>실시간 데이터</h1>
        <ul>
          {
            data.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
