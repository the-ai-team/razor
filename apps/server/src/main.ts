import { PROTO_AUTH_TOKEN_TRANSFER } from '@razor/constants';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { TokenPlayerMap } from './stores';
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const allowedOrigin =
  process.env.NX_ALLOWED_ORIGINS.split(', ') || 'http://localhost:4200';

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const tokenPlayerMap = new TokenPlayerMap();

io.on('connection', socket => {
  console.log(`👤🟢 User connected: ${socket.id}`);

  const token = socket.handshake.auth.token;
  const playerData = tokenPlayerMap.getPlayer(token);
  console.log('playerData', playerData);

  if (!playerData) {
    const newToken = uuidv4();
    socket.emit(PROTO_AUTH_TOKEN_TRANSFER, newToken);
    // TODO: Add player to map should need plyaer id which needs to be generated in the join player controller
    // So, following method should be called in the join player controller later.
    tokenPlayerMap.addPlayer(token || newToken, 'P:123456', socket.id);
  }

  // TODO: function needs to implement to clear player from map when player disconnects and after several retries.
  socket.on('disconnect', () => {
    console.log(`👤🔴 User disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
