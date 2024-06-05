const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const net = require('net');

// Express 설정
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",  // React 클라이언트의 출처
        methods: ["GET", "POST"]
    }
});

// Socket.IO 이벤트 설정
io.on('connection', (socket) => {
    console.log('Socket.IO 클라이언트가 연결되었습니다.');

    socket.on('message', (message) => {
        console.log('Socket.IO 메시지 수신:', message);

        // 다른 모든 클라이언트에게 브로드캐스트
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Socket.IO 클라이언트 연결이 종료되었습니다.');
    });

    socket.on('error', (error) => {
        console.error('Socket.IO 에러:', error);
    });
});

// TCP 서버 설정
const tcpServer = net.createServer((socket) => {
    console.log('TCP 클라이언트가 연결되었습니다.');

    socket.on('data', (data) => {
        console.log('TCP 메시지 수신:', data.toString());

        // 메시지를 Socket.IO 클라이언트에게 브로드캐스트
        io.emit('message', data.toString());

        socket.write('Echo: ' + data); // Echo the received data back to the client
    });

    socket.on('end', () => {
        console.log('TCP 클라이언트 연결이 종료되었습니다.');
    });

    socket.on('error', (err) => {
        console.error('TCP 소켓 에러:', err);
    });
});

// 서버 포트 설정
const HTTP_PORT = 8080;
const TCP_PORT = 5200;

// HTTP 서버와 TCP 서버를 동일한 포트에서 실행
server.listen(HTTP_PORT, () => {
    console.log(`HTTP 서버가 포트 ${HTTP_PORT}에서 실행 중입니다.`);
});

tcpServer.listen(TCP_PORT, () => {
    console.log(`TCP 서버가 포트 ${TCP_PORT}에서 실행 중입니다.`);
});