// client/socket.js
import io from 'socket.io-client';

// WebSocketサーバーURL
const socket = io('http://localhost:3001'); // WebSocketサーバーURLを指定
export default socket;
