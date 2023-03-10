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
import { Logger } from './services';
import { pubsub } from './services/pubsub';
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

    // If player still not connected then delete the player from map.
    const isSocketConnected = io.sockets.sockets.get(socketId)?.connected;
    if (!isSocketConnected) {
      tokenPlayerMap.clearPlayer(authToken);
      logger.debug('User deleted from the map after waiting.', context);
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
    newToken = uuidv4();
    socket.emit(PROTO_AUTH_TOKEN_TRANSFER, newToken);
    // TODO: Add player to map should need plyaer id which needs to be generated in the join player controller
    // So, following method should be called in the join player controller later.
    const playerId = 'P:12345678';
    tokenPlayerMap.addPlayer(newToken, playerId, socket.id);
    const context = logger.createContext({ identifier: playerId });
    logger.debug('New user added to map.', context);
  } else {
    tokenPlayerMap.updatePlayerSocketId(token, socket.id);
    const { playerId } = playerData;
    const context = logger.createContext({ identifier: playerId });
    logger.debug('User updated with a new socket in map.', context);
  }

  // On any socket event publish the event with playerId and data.
  socket.onAny((event, ...data) => {
    const playerId = tokenPlayerMap.getPlayerIdBySocketId(socket.id);
    const context = logger.createContext({ identifier: playerId });
    logger.info(`Protocol: ${event} | Message received.`, context);
    pubsub.publish(event, { playerId, data });
  });

  // If a user disconnects call the reconnect function.
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
