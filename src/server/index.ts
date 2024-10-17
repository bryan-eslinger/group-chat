import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('new connection')
    ws.on('error', console.error);

    ws.on('message', (data) => {
        console.log('received: %s', data);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                console.log('sending message to client');
                client.send(JSON.stringify({
                    type: 'messageReceived',
                    body: data.toString()
                }));
            }
        })
    });

    ws.send(JSON.stringify({ type: 'info', body: 'connected'}));
});

wss.on('listening', () => {
    console.log('Server listening on localhost:8080');
});
