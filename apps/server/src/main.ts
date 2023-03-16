import {
  PROTO_AUTH_TOKEN_TRANSFER,
  PROTO_CREATE_LOBBY_REQUEST,
  PROTO_JOIN_LOBBY_REQUEST,
  RECONNECT_WAITING_TIME,
} from '@razor/constants';
import { AuthToken } from '@razor/models';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import './controllers/join-tournament.controller';
import './controllers/create-tournament.controller';

import { pubsub } from './services/pubsub';
import { PubSubEvents } from './models';
import { ContextOutput, Logger } from './services';
import { tokenPlayerMap } from './stores';

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const allowedOrigin =
  process.env.NX_ALLOWED_ORIGINS?.split(', ') || 'http://localhost:4200';

const io = new Server(server, {
  cors: {
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const logger = new Logger('main');

const reconnect = (authToken: AuthToken): void => {
  setTimeout(() => {
    if (!tokenPlayerMap.getPlayer(authToken)) {
      return;
    }
    // Get socket id from current player data. If player connected again socket id should be already updated.
    const { socketId, playerId } = tokenPlayerMap.getPlayer(authToken);
    const context = logger.createContext({ identifier: playerId });

    const isSocketConnected = io.sockets.sockets.get(socketId)?.connected;
    if (!isSocketConnected) {
      // If player still not connected then delete the player from map.
      tokenPlayerMap.clearPlayer(authToken);
      logger.debug(
        `User deleted from the map after waiting for ${RECONNECT_WAITING_TIME}ms.`,
        context,
      );
    } else {
      logger.debug('User already connected from a new socket.', context);
    }
  }, RECONNECT_WAITING_TIME);
};

io.on('connection', socket => {
  const context = logger.createContext({ identifier: socket.id });
  logger.info('User connected', context);

  // Take the token from the handshake.
  const token = socket.handshake.auth.token;
  // Looking for the player in the map.
  const playerData = tokenPlayerMap.getPlayer(token);
  logger.debug(
    `User is ${playerData ? 'found' : 'not found'} in map.`,
    context,
  );

  let newToken = '';
  if (!playerData) {
    // If player is new token will be generated and sent to the client.
    newToken = uuidv4();
    socket.emit(PROTO_AUTH_TOKEN_TRANSFER, newToken);
    // New player will be added with related socket id to the map.
    tokenPlayerMap.addSocketId(newToken, socket.id);
    const context = logger.createContext({ identifier: socket.id });
    logger.debug('New user added to map.', context);
  } else {
    // If player is already in the map then update the socket id.
    tokenPlayerMap.updatePlayerSocketId(token, socket.id);
    const { playerId } = playerData;
    const context = logger.createContext({ identifier: playerId });
    logger.debug('User updated with a new socket in map.', context);
  }

  // On any socket event publish the event with playerId and data.
  socket.onAny((event, data) => {
    let context: ContextOutput;
    if (
      event === PROTO_JOIN_LOBBY_REQUEST ||
      event === PROTO_CREATE_LOBBY_REQUEST
    ) {
      // If player is new, player may not have playerId yet. So we use socket id to create context and publish event.
      // Player id will be created in the controller.
      const socketId = socket.id;
      context = logger.createContext({ identifier: socketId });
      pubsub.publish(event, { socketId, data });
    } else {
      const playerId = tokenPlayerMap.getPlayerIdBySocketId(socket.id);
      context = logger.createContext({ identifier: playerId });
      pubsub.publish(event, { playerId, data });
    }
    logger.info(`Protocol: ${event} | Message received.`, context, data);
  });

  // If a user disconnected call the reconnect function.
  socket.on('disconnect', () => {
    const playerId = tokenPlayerMap.getPlayerIdBySocketId(socket.id);
    const authToken = tokenPlayerMap.getAuthTokenBySocketId(socket.id);
    if (authToken) {
      reconnect(authToken);
    }
    const context = logger.createContext({ identifier: playerId });
    logger.info('User disconnected.', context);
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
