const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        console.log('Received: ' + data);
        socket.write('SandData: ' + data); // Echo the received data back to the client
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(5200, () => {
    console.log('Server listening on port 5200');
});