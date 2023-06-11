import {
  initialClientDataSchema,
  initialServerDataSchema,
  ProtocolSchemaTypes,
  SocketProtocols,
  SocketProtocolsTypes,
} from '@razor/models';

export const protocolSchemaMap = new Map<
  SocketProtocolsTypes,
  ProtocolSchemaTypes
>([
  [SocketProtocols.JoinLobbyRequest, initialClientDataSchema],
  [SocketProtocols.JoinLobbyAccept, initialServerDataSchema],
  [SocketProtocols.CreateLobbyRequest, initialClientDataSchema],
  [SocketProtocols.CreateLobbyAccept, initialClientDataSchema],
]);
