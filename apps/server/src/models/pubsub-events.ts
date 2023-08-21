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
  /** Notify when the race timer runs out.
   * This will publish from start-race controller after time race timeout
   * and it should subscribe by race-end controller.
   */
  RaceTimeout = 'race-timeout',
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

export interface RaceTimeoutModel {
  data: { raceId: RaceId };
  context: ContextOutput;
}

export interface ServerUniqueEventsToTypeMap extends Record<string, object> {
  [PubSubEvents.SendDataToClient]: SendDataToClientModel;
  [PubSubEvents.SendDataToAll]: SendDataToAllModel;
  [PubSubEvents.PlayerDisconnect]: PlayerDisconnectModel;
  [PubSubEvents.RaceTimeout]: RaceTimeoutModel;
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
