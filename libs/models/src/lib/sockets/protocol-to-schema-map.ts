import {
  authTokenTransferSchema,
  clearPlayerSchema,
  informTimeoutSchema,
  initialClientDataSchema,
  initialServerDataSchema,
  joinLobbyRejectSchema,
  playerJoinSchema,
  ProtocolSchemaTypes,
  sendLeaderboardSchema,
  sendTypeLogSchema,
  startRaceAcceptSchema,
  startRaceRequestSchema,
  updateTypeLogsSchema,
} from './protocol-schemas';
import { SocketProtocols, SocketProtocolsTypes } from './protocols';

// This map contains schemas for each protocols defined in {@link SocketProtocols}
export const protocolToSchemaMap = new Map<
  SocketProtocolsTypes,
  ProtocolSchemaTypes
>([
  [SocketProtocols.AuthTokenTransfer, authTokenTransferSchema],
  [SocketProtocols.JoinLobbyRequest, initialClientDataSchema],
  [SocketProtocols.JoinLobbyAccept, initialServerDataSchema],
  [SocketProtocols.JoinLobbyReject, joinLobbyRejectSchema],
  [SocketProtocols.CreateLobbyRequest, initialClientDataSchema],
  [SocketProtocols.CreateLobbyAccept, initialServerDataSchema],
  [SocketProtocols.PlayerJoin, playerJoinSchema],
  [SocketProtocols.ClearPlayer, clearPlayerSchema],
  [SocketProtocols.StartRaceRequest, startRaceRequestSchema],
  [SocketProtocols.StartRaceAccept, startRaceAcceptSchema],
  [SocketProtocols.SendTypeLog, sendTypeLogSchema],
  [SocketProtocols.UpdateTypeLogs, updateTypeLogsSchema],
  [SocketProtocols.InformTimeout, informTimeoutSchema],
  [SocketProtocols.SendLeaderboard, sendLeaderboardSchema],
]);
