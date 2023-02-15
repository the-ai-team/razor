import { io, Socket } from 'socket.io-client';

const SOCKET_ENDPOINT =
  process.env['NX_SOCKET_ENDPOINT'] || 'http://localhost:3000';
const socket: Socket = io(SOCKET_ENDPOINT, {
  withCredentials: true,
});

socket.on('connect', () => {
  console.log('connected');
});
