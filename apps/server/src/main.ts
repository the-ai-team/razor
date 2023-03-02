import { PROTO_AUTH_TOKEN_TRANSFER } from '@razor/constants';
import { AuthToken } from '@razor/models';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { PubSubEvents } from './models';
import { TokenPlayerMap } from './stores';
import { pubsub } from './services/pubsub';
import { Logger } from './services';

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

const tokenPlayerMap = new TokenPlayerMap();
const primaryLogs = new Logger('Primary Connections');

const reconnect = (authToken: AuthToken): void => {
  setTimeout(() => {
    if (!tokenPlayerMap.getPlayer(authToken)) {
      return;
    }
    // Get socket id from current player data. If player connected again socket id should be already updated.
    const { socketId, playerId } = tokenPlayerMap.getPlayer(authToken);

    // If player still not connected then delete the player from map.
    const isSocketConnected = io.sockets.sockets.get(socketId)?.connected;
    if (!isSocketConnected) {
      tokenPlayerMap.clearPlayer(authToken);
      primaryLogs.message({
        message: 'User deleted from map after waiting.',
        identifier: playerId,
      });
    } else {
      primaryLogs.message({
        message: 'User already connected from a new socket.',
        identifier: playerId,
      });
    }
  }, 5000);
};

io.on('connection', socket => {
  primaryLogs.message({
    message: 'User connected.',
    identifier: socket.id,
  });

  // Take the token from the handshake.
  const token = socket.handshake.auth.token;
  // Looking for the player in the map.
  const playerData = tokenPlayerMap.getPlayer(token);
  primaryLogs.message({
    message: `User is ${playerData ? 'found' : 'not found'} in map.`,
    identifier: socket.id,
  });

  let newToken = '';
  if (!playerData) {
    newToken = uuidv4();
    socket.emit(PROTO_AUTH_TOKEN_TRANSFER, newToken);
    // TODO: Add player to map should need plyaer id which needs to be generated in the join player controller
    // So, following method should be called in the join player controller later.
    const playerId = 'P:123456';
    tokenPlayerMap.addPlayer(newToken, playerId, socket.id);
    primaryLogs.message({
      message: 'User added to map.',
      identifier: playerId,
    });
  } else {
    tokenPlayerMap.updatePlayerSocketId(token, socket.id);
    const { playerId } = playerData;
    primaryLogs.message({
      message: 'User updated in map.',
      identifier: playerId,
    });
  }

  // On any socket event publish the event with playerId and data.
  socket.onAny((event, ...data) => {
    const playerId = tokenPlayerMap.getPlayerIdBySocketId(socket.id);
    primaryLogs.message({
      message: `Protocol: ${event} | Message received.`,
      identifier: playerId,
    });
    pubsub.publish(event, { playerId, data });
  });

  // If a user disconnects call the reconnect function.
  socket.on('disconnect', () => {
    const playerId = tokenPlayerMap.getPlayerIdBySocketId(socket.id);
    const authToken = tokenPlayerMap.getAuthTokenBySocketId(socket.id);
    if (authToken) {
      reconnect(authToken);
    }
    primaryLogs.message({
      message: 'User disconnected.',
      identifier: playerId,
    });
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
