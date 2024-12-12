// server/wsServer.js
const WebSocket = require('ws');
const http = require('http');

// HTTPサーバーを作成
const server = http.createServer();

// WebSocketサーバーを作成
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // クライアントからメッセージを受け取る
  ws.on('message', (message) => {
    console.log('Received:', message);

    // 受け取ったメッセージを他のクライアントに送信
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // クライアントが切断されたとき
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// WebSocketサーバーを3001番ポートで待機
server.listen(3001, () => {
  console.log('WebSocket server is listening on ws://localhost:3001');
});
