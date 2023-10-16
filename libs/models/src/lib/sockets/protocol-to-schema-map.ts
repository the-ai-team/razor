import {
  initialClientDataSchema,
  initialServerDataSchema,
  ProtocolSchemaTypes,
  startRaceRequestSchema,
} from './protocol-schemas';
import { SocketProtocols, SocketProtocolsTypes } from './protocols';

// This map contains schemas for each protocols defined in {@link socketProtocols}
export const protocolToSchemaMap = new Map<
  SocketProtocolsTypes,
  ProtocolSchemaTypes
>([
  [SocketProtocols.JoinLobbyRequest, initialClientDataSchema],
  [SocketProtocols.JoinLobbyAccept, initialServerDataSchema],
  [SocketProtocols.CreateLobbyRequest, initialClientDataSchema],
  [SocketProtocols.CreateLobbyAccept, initialClientDataSchema],
  [SocketProtocols.StartRaceRequest, startRaceRequestSchema],
]);
