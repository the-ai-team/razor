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

type ModifiedOtherProtocolToTypeMap = {
  [K in keyof OtherProtocolToTypeMap]: ModifiedEvent<
    OtherProtocolToTypeMap[K],
    { tournamentId: TournamentId; savedPlayerId: string }
  >;
};

export type AllClientPubSubEventsToTypeMap = ClientUniqueEventsToTypeMap &
  InitialProtocolToTypeMap &
  ModifiedOtherProtocolToTypeMap;
