import WebSocket from 'ws';

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server }); // Attach WebSocket to the Express server

    wss.on('connection', (ws) => {
        console.log('WebSocket connection established');

        ws.on('message', (message) => {
            console.log(`Received message: ${message}`);
        });

        ws.on('close', () => {
            console.log('WebSocket connection closed');
        });
    });

    return wss;
};

// Broadcast a message to all connected WebSocket clients
const broadcast = (wss, message) => {
    if (wss) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message); // Send the message to all open connections
            }
        });
    }
};

export { setupWebSocket, broadcast };
