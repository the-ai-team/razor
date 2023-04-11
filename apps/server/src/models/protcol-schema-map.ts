import {
  initialClientDataSchema,
  initialServerDataSchema,
  ProtocolSchemaTypes,
  socketProtocols,
  SocketProtocolsTypes,
  startRaceRequestSchema,
} from '@razor/models';

export const protocolSchemaMap = new Map<
  SocketProtocolsTypes,
  ProtocolSchemaTypes
>([
  [socketProtocols.JoinLobbyRequest, initialClientDataSchema],
  [socketProtocols.JoinLobbyAccept, initialServerDataSchema],
  [socketProtocols.CreateLobbyRequest, initialClientDataSchema],
  [socketProtocols.CreateLobbyAccept, initialClientDataSchema],
  [socketProtocols.StartRaceRequest, startRaceRequestSchema],
]);
