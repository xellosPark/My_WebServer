import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://127.0.0.1:8080/'); // Node.js Socket.IO 서버 주소

function App() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socketRef = useRef(null);

    const sendMessage = () => {
        if (message.trim() && socketRef.current) {
            socketRef.current.emit('message', message);
            setMessage('');
        }
    };

    useEffect(() => {
        // 소켓이 없으면 새로 설정
        if (!socketRef.current) {
          socketRef.current = io('http://localhost:8080');
        }
    
        const socket = socketRef.current;
    
        const handleConnect = () => {
          console.log('Socket.IO 서버에 연결되었습니다');
        };
    
        const handleMessage = (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        };
    
        const handleDisconnect = () => {
          console.log('Socket.IO 서버와의 연결이 끊어졌습니다');
        };
    
        socket.on('connect', handleConnect);
        socket.on('message', handleMessage);
        socket.on('disconnect', handleDisconnect);
    
        return () => {
          socket.off('connect', handleConnect);
          socket.off('message', handleMessage);
          socket.off('disconnect', handleDisconnect);
        };
      }, []);

    return (
        <div className="App">
            <div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요"
                />
                <button onClick={sendMessage}>전송</button>
            </div>
            <header className="App-header">
                <h1>실시간 메시지</h1>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </header>
        </div>
    );
}

export default App;