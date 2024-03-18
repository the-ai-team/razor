import {
  ClearPlayerData,
  InformTimeoutData,
  InitialClientData,
  InitialServerData,
  PlayerJoinData,
  PlayerJoinRejectData,
  SendLeaderboardData,
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
  [SocketProtocols.JoinLobbyReject]: PlayerJoinRejectData;
  [SocketProtocols.CreateLobbyRequest]: InitialClientData;
  [SocketProtocols.CreateLobbyAccept]: InitialServerData;
}

export interface OtherProtocolToTypeMap extends Record<string, object> {
  [SocketProtocols.PlayerJoin]: PlayerJoinData;
  [SocketProtocols.ClearPlayer]: ClearPlayerData;
  [SocketProtocols.StartRaceRequest]: StartRaceRequestData;
  [SocketProtocols.StartRaceAccept]: StartRaceAcceptData;
  [SocketProtocols.SendTypeLog]: SendTypeLogData;
  [SocketProtocols.UpdateTypeLogs]: UpdateTypeLogsData;
  [SocketProtocols.InformTimeout]: InformTimeoutData;
  [SocketProtocols.SendLeaderboard]: SendLeaderboardData;
}

export type AllProtocolToTypeMap = InitialProtocolToTypeMap &
  OtherProtocolToTypeMap;
