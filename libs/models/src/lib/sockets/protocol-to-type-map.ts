import {
  InitialClientData,
  InitialServerData,
  PlayerJoinData,
  StartRaceAcceptData,
  StartRaceRequestData,
} from './protocol-data';
import { socketProtocols } from './protocols';

// Using this for validate types in pubsub of socket events
export interface InitialProtocolToTypeMap extends Record<string, object> {
  [socketProtocols.JoinLobbyRequest]: InitialClientData;
  [socketProtocols.JoinLobbyAccept]: InitialServerData;
  [socketProtocols.CreateLobbyRequest]: InitialClientData;
  [socketProtocols.CreateLobbyAccept]: InitialServerData;
}

export interface OtherProtocolToTypeMap extends Record<string, object> {
  [socketProtocols.StartRaceRequest]: StartRaceRequestData;
  [socketProtocols.StartRaceAccept]: StartRaceAcceptData;
  [socketProtocols.PlayerJoin]: PlayerJoinData;
}

export type AllProtocolToTypeMap = InitialProtocolToTypeMap &
  OtherProtocolToTypeMap;
