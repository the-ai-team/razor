import {
  InitialClientData,
  InitialServerData,
  PlayerJoinData,
  StartRaceRequestData,
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
  [SocketProtocols.StartRaceRequest]: StartRaceRequestData;
  [SocketProtocols.PlayerJoin]: PlayerJoinData;
}

export type AllProtocolToTypeMap = InitialProtocolToTypeMap &
  OtherProtocolToTypeMap;
