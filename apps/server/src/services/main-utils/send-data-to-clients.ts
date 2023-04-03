import {
  PROTO_CREATE_LOBBY_ACCEPT,
  PROTO_JOIN_LOBBY_ACCEPT,
} from '@razor/constants';
import { InitialServerData } from '@razor/models';
import { Server } from 'socket.io';

import { PubSubEvents } from '../../models';
import { tokenPlayerMap } from '../../stores/token-player-map';
import { pubsub } from '..';

/**
 * Listening to related pubsub events and send data to the client.
 * @param io Socket.io server instance
 */
export function sendDataToClients(io: Server): void {
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
}
