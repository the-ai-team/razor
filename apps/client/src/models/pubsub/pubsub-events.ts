import {
  InitialProtocolToTypeMap,
  OtherProtocolToTypeMap,
  SocketProtocolsTypes,
  TournamentId,
} from '@razor/models';

export enum ClientUniqueEvents {
  // Events publish by controllers

  /** This will usually trigger by controllers when an event need to send to the server. */
  SendDataToServer = 'send-data-to-server',
}

// Models
export interface SendDataToServerModel {
  protocol: SocketProtocolsTypes;
  data: object;
}

export interface ClientUniqueEventsToTypeMap extends Record<string, object> {
  [ClientUniqueEvents.SendDataToServer]: SendDataToServerModel;
}

type ModifiedEvent<T extends object, AdditionalProps extends object> = {
  data: T;
} & AdditionalProps;

// TODO: Add this in future
// type ModifiedInitialProtocolToTypeMap = {
//   [K in keyof InitialProtocolToTypeMap]: ModifiedEvent<
//     InitialProtocolToTypeMap[K],
//     { socketId: SocketId }
//   >;
// };

type ModifiedOtherProtocolToTypeMap = {
  [K in keyof OtherProtocolToTypeMap]: ModifiedEvent<
    OtherProtocolToTypeMap[K],
    { tournamentId: TournamentId | null; savedPlayerId: string | null }
  >;
};

export type AllClientPubSubEventsToTypeMap = ClientUniqueEventsToTypeMap &
  InitialProtocolToTypeMap &
  ModifiedOtherProtocolToTypeMap;
