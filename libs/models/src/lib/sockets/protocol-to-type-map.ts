import {
  InitialClientData,
  InitialServerData,
  PlayerJoinData,
  SendTypeLogData,
  StartRaceAcceptData,
  StartRaceRequestData,
  UpdateTypeLogsData,
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
  [socketProtocols.PlayerJoin]: PlayerJoinData;
  [socketProtocols.StartRaceRequest]: StartRaceRequestData;
  [socketProtocols.StartRaceAccept]: StartRaceAcceptData;
  [socketProtocols.SendTypeLog]: SendTypeLogData;
  [socketProtocols.UpdateTypeLogs]: UpdateTypeLogsData;
}

export type AllProtocolToTypeMap = InitialProtocolToTypeMap &
  OtherProtocolToTypeMap;
