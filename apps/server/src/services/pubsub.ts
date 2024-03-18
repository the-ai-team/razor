import {
  AllProtocolToTypeMap,
  PlayerId,
  SocketProtocolsTypes,
  TournamentId,
} from '@razor/models';
import { PubSub } from '@razor/util';

import { AllServerPubSubEventsToTypeMap, PubSubEvents } from '../models';

/**
 * Server pubsub has two types of events
 * 1. socket events from client - when client sends socket event it will be published to server pubsub
 *    Related event mapping - {@link socketEventsMap}
 * 2. server events - events triggered by server
 *    Related events - {@link PubSubEvents}
 */
export const pubsub = new PubSub<AllServerPubSubEventsToTypeMap>();

export function publishToSingleClient<T extends SocketProtocolsTypes>({
  playerId,
  socketId,
  protocol,
  data,
}: {
  playerId?: PlayerId;
  socketId?: string;
  protocol: T;
  data: AllProtocolToTypeMap[T];
}): void {
  // Either playerId or socketId should be provided.
  if (!playerId && !socketId) {
    throw new Error(
      'Either playerId or socketId should be provided to publishToSingleClient function',
    );
  }

  pubsub.publish(PubSubEvents.SendDataToClient, {
    playerId,
    socketId,
    protocol,
    data,
  });
}

export function publishToAllClients<T extends SocketProtocolsTypes>({
  tournamentId,
  protocol,
  data,
}: {
  tournamentId: TournamentId;
  protocol: T;
  data: AllProtocolToTypeMap[T];
}): void {
  pubsub.publish(PubSubEvents.SendDataToAll, {
    tournamentId,
    protocol,
    data,
  });
}
