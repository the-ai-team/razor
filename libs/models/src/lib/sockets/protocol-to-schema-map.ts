import {
  authTokenTransferSchema,
  initialClientDataSchema,
  initialServerDataSchema,
  playerJoinSchema,
  ProtocolSchemaTypes,
  startRaceAcceptSchema,
  startRaceRequestSchema,
} from './protocol-schemas';
import { socketProtocols, SocketProtocolsTypes } from './protocols';

// This map contains schemas for each protocols defined in {@link socketProtocols}
export const protocolToSchemaMap = new Map<
  SocketProtocolsTypes,
  ProtocolSchemaTypes
>([
  [socketProtocols.AuthTokenTransfer, authTokenTransferSchema],
  [socketProtocols.JoinLobbyRequest, initialClientDataSchema],
  [socketProtocols.JoinLobbyAccept, initialServerDataSchema],
  [socketProtocols.CreateLobbyRequest, initialClientDataSchema],
  [socketProtocols.CreateLobbyAccept, initialServerDataSchema],
  [socketProtocols.PlayerJoin, playerJoinSchema],
  [socketProtocols.StartRaceRequest, startRaceRequestSchema],
  [socketProtocols.StartRaceAccept, startRaceAcceptSchema],
]);
