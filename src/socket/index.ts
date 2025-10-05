// src/socket/socket.ts
import { Socket, io } from 'socket.io-client';

let socket: Socket | null = null;
const SOCKET_URL = 'http://localhost:3000';

export const initSocket = (token: string) => {
  if (socket && socket.connected) return socket;

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket?.id);
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected');
  });

  return socket;
};

export const getSocket = () => socket;
