import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: true,
  transports: ['websocket', 'polling'],
});

socket.on('connect', () => {
  console.log('⚡ Connected to Real-time Backend WebSocket Gateway:', socket.id);
});

socket.on('disconnect', () => {
  console.log('⚡ Disconnected from WebSocket Gateway');
});