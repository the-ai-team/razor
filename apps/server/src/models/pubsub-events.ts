import {
  InitialProtocolToTypeMap,
  OtherProtocolToTypeMap,
  PlayerId,
  RaceId,
  SocketId,
  SocketProtocolsTypes,
  TournamentId,
} from '@razor/models';

import { ContextOutput } from '../services';

// TODO: change to ServerUniqueEvents
/** Pubsub events exceptional to server */
export enum PubSubEvents {
  // Events publish by controllers

  /** This will usually trigger by controllers when an event need to send to a specific client.  */
  SendDataToClient = 'send-data-to-client',
  /** This will usually trigger by controllers when an event need to send to all clients. */
  SendDataToAll = 'send-data-to-all',

  // Events publish by services

  /** Notify the player-disconnect event to controllers. */
  PlayerDisconnect = 'player-disconnect',
  /** Notify when the race ends.
   * The race can end in two ways: when the server timer runs out or when all players complete the race.
   * (Players will finish their race either due to a client timeout or by sending the last type log.)
   *
   * This event will be published in one of the following ways:
   * - From the start-race controller after the server race timeout.
   * - By updating the type-logs controller after all players have sent their last type log.
   * - By informing the timeout controller after all players have timed out on the client side.
   *
   * Subscribing to this event should be handled by the race-end controller.
   */
  RaceEnd = 'race-end',

  /** Start and end events for type log listening.
   * Which push collected type logs to players at a specific interval
   * and clear type logs queue.
   */
  StartTypeLogListening = 'type-log-listen-start',
  EndTypeLogListening = 'type-log-listen-end',
}

// Models
export interface SendDataToClientModel {
  playerId: PlayerId;
  protocol: SocketProtocolsTypes;
  data: object;
}

export interface SendDataToAllModel {
  tournamentId: TournamentId;
  protocol: SocketProtocolsTypes;
  data: object;
}

export interface PlayerDisconnectModel {
  data: { playerId: PlayerId };
  context: ContextOutput;
}

export interface RaceEndModel {
  data: { raceId: RaceId };
  context: ContextOutput;
}

export interface TypeLogListeningModel {
  data: { raceId: RaceId };
  context: ContextOutput;
}

export interface ServerUniqueEventsToTypeMap extends Record<string, object> {
  [PubSubEvents.SendDataToClient]: SendDataToClientModel;
  [PubSubEvents.SendDataToAll]: SendDataToAllModel;
  [PubSubEvents.PlayerDisconnect]: PlayerDisconnectModel;
  [PubSubEvents.RaceEnd]: RaceEndModel;
  [PubSubEvents.StartTypeLogListening]: TypeLogListeningModel;
  [PubSubEvents.EndTypeLogListening]: TypeLogListeningModel;
}

type ModifiedEvent<T extends object, AdditionalProps extends object> = {
  data: T;
  context: ContextOutput;
} & AdditionalProps;

type ModifiedInitialProtocolToTypeMap = {
  [K in keyof InitialProtocolToTypeMap]: ModifiedEvent<
    InitialProtocolToTypeMap[K],
    { socketId: SocketId }
  >;
};

type ModifiedOtherProtocolToTypeMap = {
  [K in keyof OtherProtocolToTypeMap]: ModifiedEvent<
    OtherProtocolToTypeMap[K],
    { playerId: PlayerId; tournamentId: TournamentId }
  >;
};

export type AllServerPubSubEventsToTypeMap = ServerUniqueEventsToTypeMap &
  ModifiedInitialProtocolToTypeMap &
  ModifiedOtherProtocolToTypeMap;
