import { Server } from 'socket.io';

import { PubSubEvents } from '../../models';
import { tokenPlayerMap } from '../../stores';
import { pubsub } from '..';

/**
 * Listening to related pubsub events and send data to the client.
 * @param socketServer Socket.io server instance
 */
export function emitSocketMessages(socketServer: Server): void {
  // If `Send Data To Client` event is published, then this function will send data to the client.
  const sendData = ({ playerId, socketId, protocol, data }): void => {
    socketId ??= tokenPlayerMap.getSocketIdByPlayerId(playerId);
    socketServer.to(socketId).emit(protocol, data);
  };
  pubsub.subscribe(PubSubEvents.SendDataToClient, sendData);

  const SendDataToAll = ({ tournamentId, protocol, data }): void => {
    socketServer.to(tournamentId).emit(protocol, data);
  };
  pubsub.subscribe(PubSubEvents.SendDataToAll, SendDataToAll);
}
