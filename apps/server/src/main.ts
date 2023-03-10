import {
  PROTO_AUTH_TOKEN_TRANSFER,
  RECONNECT_WAITING_TIME,
} from '@razor/constants';
import { AuthToken } from '@razor/models';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { PubSubEvents } from './models';
import { TokenPlayerMap } from './stores';
import { pubsub } from './utils/pubsub';
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

const reconnect = (authToken: AuthToken): void => {
  setTimeout(() => {
    if (!tokenPlayerMap.getPlayer(authToken)) {
      return;
    }
    // Get socket id from current player data. If player connected again socket id should be already updated.
    const { socketId } = tokenPlayerMap.getPlayer(authToken);

    // If player still not connected then delete the player from map.
    const isSocketConnected = io.sockets.sockets.get(socketId)?.connected;
    if (!isSocketConnected) {
      tokenPlayerMap.clearPlayer(authToken);
      console.log(`🗑🔴 User Deleted: ${socketId}`);
    } else {
      console.log(`🔗🟢 User connected from a new socket.`);
    }
  }, RECONNECT_WAITING_TIME);
};

io.on('connection', socket => {
  console.log(`👤🟢 User connected: ${socket.id}`);
  tokenPlayerMap.viewMap();

  const token = socket.handshake.auth.token;
  const playerData = tokenPlayerMap.getPlayer(token);
  console.log('playerData', playerData);

  let newToken = '';
  if (!playerData) {
    newToken = uuidv4();
    socket.emit(PROTO_AUTH_TOKEN_TRANSFER, newToken);
    // TODO: Add player to map should need plyaer id which needs to be generated in the join player controller
    // So, following method should be called in the join player controller later.
    tokenPlayerMap.addPlayer(newToken, 'P:123456', socket.id);
  } else {
    tokenPlayerMap.updatePlayerSocketId(token, socket.id);
  }

  // On any socket event publish the event with playerId and data.
  socket.onAny((event, ...data) => {
    const playerId = tokenPlayerMap.getPlayerIdBySocketId(socket.id);
    pubsub.publish(event, { playerId, data });
  });

  socket.on('disconnect', () => {
    console.log(`👤🔴 User disconnected: ${socket.id}`);
    const authToken = tokenPlayerMap.getAuthTokenBySocketId(socket.id);
    if (authToken) {
      reconnect(authToken);
    }
  });
});

server.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

// If `Send Data To Client` event is published, then this function will send data to the client.
const sendData = ({ playerId, protocol, data }): void => {
  const socketId = tokenPlayerMap.getSocketIdByPlayerId(playerId);
  io.to(socketId).emit(protocol, data);
};
pubsub.subscribe(PubSubEvents.SendDataToClient, sendData);
