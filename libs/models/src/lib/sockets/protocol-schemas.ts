import { z } from 'zod';

import { playerIdSchema, playerNameSchema, playerSchema } from './player';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SocketProtocols } from './protocols';
import { raceIdSchema } from './race';
import { stateModelSchema } from './state-model';
import { roomIdSchema, tournamentIdSchema } from './tournament';

// Following schemas to be used when data sent through socket.
// Each schema is related to a protocol defined in {@link socketProtocols}

/**
 * Related protocol - {@link SocketProtocols.JoinLobbyRequest} and {@link SocketProtocols.CreateLobbyRequest}
 */
export const initialClientDataSchema = z.object({
  playerName: playerNameSchema,
  roomId: roomIdSchema.optional(),
});

/**
 * Related protocol - {@link SocketProtocols.CreateLobbyAccept} and {@link SocketProtocols.JoinLobbyAccept}
 */
export const initialServerDataSchema = z.object({
  playerId: playerIdSchema,
  tournamentId: tournamentIdSchema,
  snapshot: stateModelSchema,
});

/**
 * Related protocol - {@link SocketProtocols.PlayerJoin}
 */
export const playerJoinSchema = z.object({
  player: playerSchema,
});

/**
 * Related protocol - {@link SocketProtocols.StartRaceRequest}
 */
export const startRaceRequestSchema = z.object({});

/**
 * Related protocol - {@link SocketProtocols.StartRaceAccept}
 */

export const startRaceAcceptSchema = z.object({
  raceId: raceIdSchema,
  raceStartedBy: playerIdSchema,
  raceText: z.string(),
});

export type ProtocolSchemaTypes =
  | typeof initialClientDataSchema
  | typeof initialServerDataSchema
  | typeof playerJoinSchema
  | typeof startRaceRequestSchema;
