import { RECONNECT_WAITING_TIME } from '@razor/constants';
import { AuthToken } from '@razor/models';
import { Server } from 'socket.io';

import { PubSubEvents } from '../../models';
import { tokenPlayerMap } from '../../stores';
import { Logger } from '../logger';
import { pubsub } from '../pubsub';

export function checkReconnected(authToken: AuthToken, io: Server): void {
  const logger = new Logger('reconnector');

  setTimeout(() => {
    if (!tokenPlayerMap.getPlayer(authToken)) {
      return;
    }
    // Get socket id from current player data. If player connected again socket id should be already updated.
    const { socketId, playerId } = tokenPlayerMap.getPlayer(authToken);
    // Creating context again if player reconnected some properties may be changed (such as socket id).
    const context = logger.createContext({ identifier: playerId });

    const isSocketConnected = io.sockets.sockets.get(socketId)?.connected;
    if (!isSocketConnected) {
      // If player still not connected then delete the player from map.
      tokenPlayerMap.clearPlayer(authToken);
      logger.debug(
        `User deleted from the map after waiting for ${RECONNECT_WAITING_TIME}ms.`,
        context,
      );

      if (!playerId) {
        logger.info('Disconnected player does not have a playerId.', context);
        return;
      }
      pubsub.publish(PubSubEvents.PlayerDisconnect, {
        data: {
          playerId,
        },
        context,
      });
    } else {
      logger.debug('User already connected from a new socket.', context);
    }
  }, RECONNECT_WAITING_TIME);
}
