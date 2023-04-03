import {
  PROTO_AUTH_TOKEN_TRANSFER,
  PROTO_CREATE_LOBBY_ACCEPT,
  PROTO_CREATE_LOBBY_REQUEST,
  PROTO_JOIN_LOBBY_ACCEPT,
  PROTO_JOIN_LOBBY_REQUEST,
} from '@razor/constants';
import { InitialServerData } from '@razor/models';
import { store } from '@razor/store';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import './controllers';

import { pubsub } from './services/pubsub';
import { PubSubEvents } from './models';
import { ContextOutput, Logger, reconnector } from './services';
import { tokenPlayerMap } from './stores';

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.get('/', (req, res) => {
  const storeState = store.getState();
  res.send(storeState);
});

app.get('/token-player-map', (req, res) => {
  const data = tokenPlayerMap.viewMap();
  res.send(data);
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
    // TODO: should listen to reconnect protocol and send the player data to the client.
    let context: ContextOutput;
    if (
      event === PROTO_JOIN_LOBBY_REQUEST ||
      event === PROTO_CREATE_LOBBY_REQUEST
    ) {
      // If player is new, player may not have playerId yet. So we use socket id to create context and publish event.
      // Player id will be created in the controller.
      const socketId = socket.id;
      context = logger.createContext({ identifier: socketId });
      pubsub.publish(event, { data, context });
    } else {
      const playerId = tokenPlayerMap.getPlayerIdBySocketId(socket.id);
      context = logger.createContext({ identifier: playerId });
      pubsub.publish(event, { data, context });
    }
    logger.info(`Protocol: ${event} | Message received.`, context, data);
  });

  // If a user disconnected call the reconnect function.
  socket.on('disconnect', () => {
    const playerId = tokenPlayerMap.getPlayerIdBySocketId(socket.id);
    const authToken = tokenPlayerMap.getAuthTokenBySocketId(socket.id);
    const context = logger.createContext({ identifier: playerId });
    logger.info('User disconnected.', context);
    if (authToken) {
      reconnector(authToken, io, logger);
    }
  });
});

server.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

// If `Send Data To Client` event is published, then this function will send data to the client.
const sendData = ({ playerId, protocol, data }): void => {
  const socketId = tokenPlayerMap.getSocketIdByPlayerId(playerId);
  // Add player to specific socket room when player joining or creating room.
  // Socket room has the tournament id. So we can send data to specific lobby(All players in a specific tournament).
  if (
    protocol === PROTO_CREATE_LOBBY_ACCEPT ||
    protocol === PROTO_JOIN_LOBBY_ACCEPT
  ) {
    const { tournamentId }: InitialServerData = data;
    io.sockets.sockets.get(socketId).join(tournamentId);
  }
  io.to(socketId).emit(protocol, data);
};
pubsub.subscribe(PubSubEvents.SendDataToClient, sendData);

const SendDataToAll = ({ tournamentId, protocol, data }): void => {
  io.to(tournamentId).emit(protocol, data);
};
pubsub.subscribe(PubSubEvents.SendDataToAll, SendDataToAll);
