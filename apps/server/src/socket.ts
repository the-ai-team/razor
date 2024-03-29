import { SocketProtocols } from '@razor/models';
import { Server, Socket } from 'socket.io';

import {
  assignPlayerToSocketGroup,
  checkReconnected,
  Logger,
  publishOnReceive,
} from './services';
import { MapData, tokenPlayerMap } from './stores';
import { generateAuthToken, validateAuthToken } from './utils';

const logger = new Logger('manage-socket-connections');

/**
 * Handling received socket events.
 * @param socket Socket instance
 * @param socketServer Socket.io server instance
 */
export function manageSocketConnections(
  socket: Socket,
  socketServer: Server,
): void {
  const context = logger.createContext({ identifier: socket.id });

  logger.info('User connected', context);

  // On any socket event publish the event with playerId and data.
  socket.onAny((event, data) => publishOnReceive({ event, data, socket }));

  mapSocketId(socket);

  // If a user disconnected call the reconnect function.
  socket.on('disconnect', () => {
    const playerId = tokenPlayerMap.getPlayerIdBySocketId(socket.id);
    const authToken = tokenPlayerMap.getAuthTokenBySocketId(socket.id);
    const context = logger.createContext({ identifier: playerId });
    logger.info('User disconnected.', context);
    if (authToken) {
      checkReconnected(authToken, socketServer);
    }
  });
}

/**
 * Update socket id in the map.
 * If player is new, token will be generated and sent to the client. Then player will be added to the map.
 * If player is already in the map then update the socket id with the new one.
 * @param socket Socket instance
 */
export function mapSocketId(socket: Socket): void {
  // Take the token from the handshake.
  const token = socket.handshake.auth.token;

  const context = logger.createContext({ identifier: socket.id });

  let playerData: MapData = null;
  if (token) {
    if (validateAuthToken(token)) {
      playerData = tokenPlayerMap.getPlayer(token);
      logger.debug('Valid token received from client.', context);
      logger.debug(
        `User is ${playerData ? 'found' : 'not found'} in map.`,
        context,
      );
    } else {
      logger.debug('Invalid token received from client.', context);
    }
  } else {
    logger.debug('No token received from client.', context);
  }

  let newToken = '';
  if (!playerData) {
    // If player is new token will be generated and sent to the client.
    newToken = generateAuthToken();
    socket.emit(SocketProtocols.AuthTokenTransfer, newToken);
    // New player will be added with related socket id to the map.
    tokenPlayerMap.addSocketId(newToken, socket.id);
    const context = logger.createContext({ identifier: socket.id });
    logger.debug('New user added to map.', context);
  } else {
    // If player is already in the map then update the socket id.
    tokenPlayerMap.updatePlayerSocketId(token, socket.id);
    const { playerId } = playerData;
    const context = logger.createContext({ identifier: playerId });
    assignPlayerToSocketGroup(playerId);
    logger.debug('User updated with a new socket in map.', context);
  }
}
