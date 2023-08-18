import {
  InitialClientData,
  InitialServerData,
  StartRaceRequestData,
} from './protocol-data';
import { socketProtocols } from './protocols';

// Using this for validate types in pubsub of socket events
export interface InitialProtocolToTypeMap extends Record<string, object> {
  [socketProtocols.JoinLobbyRequest]: InitialClientData;
  [socketProtocols.JoinLobbyAccept]: InitialServerData;
}

export interface OtherProtocolToTypeMap extends Record<string, object> {
  [socketProtocols.CreateLobbyRequest]: InitialClientData;
  [socketProtocols.CreateLobbyAccept]: InitialServerData;
  [socketProtocols.StartRaceRequest]: StartRaceRequestData;
}
