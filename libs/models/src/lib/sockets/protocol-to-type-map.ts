import {
  InitialClientData,
  InitialServerData,
  PlayerJoinData,
  SendTypeLogData,
  StartRaceAcceptData,
  StartRaceRequestData,
  UpdateTypeLogsData,
} from './protocol-data';
import { SocketProtocols } from './protocols';

// Using this for validate types in pubsub of socket events
export interface InitialProtocolToTypeMap extends Record<string, object> {
  [SocketProtocols.JoinLobbyRequest]: InitialClientData;
  [SocketProtocols.JoinLobbyAccept]: InitialServerData;
  [SocketProtocols.CreateLobbyRequest]: InitialClientData;
  [SocketProtocols.CreateLobbyAccept]: InitialServerData;
}

export interface OtherProtocolToTypeMap extends Record<string, object> {
  [SocketProtocols.PlayerJoin]: PlayerJoinData;
  [SocketProtocols.StartRaceRequest]: StartRaceRequestData;
  [SocketProtocols.StartRaceAccept]: StartRaceAcceptData;
  [SocketProtocols.SendTypeLog]: SendTypeLogData;
  [SocketProtocols.UpdateTypeLogs]: UpdateTypeLogsData;
}

export type AllProtocolToTypeMap = InitialProtocolToTypeMap &
  OtherProtocolToTypeMap;
