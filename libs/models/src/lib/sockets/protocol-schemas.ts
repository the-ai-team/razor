import { z } from 'zod';

import { playerIdSchema, playerNameSchema, playerSchema } from './player';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { socketProtocols } from './protocols';
import { stateModelSchema } from './state-model';
import { roomIdSchema, tournamentIdSchema } from './tournament';

// Following schemas to be used when data sent through socket.
// Each schema is related to a protocol defined in {@link socketProtocols}

/**
 * Related protocol - {@link socketProtocols.JoinLobbyRequest} and {@link socketProtocols.CreateLobbyRequest}
 */
export const initialClientDataSchema = z.object({
  playerName: playerNameSchema,
  roomId: roomIdSchema.optional(),
});

/**
 * Related protocol - {@link socketProtocols.CreateLobbyAccept} and {@link socketProtocols.JoinLobbyAccept}
 */
export const initialServerDataSchema = z.object({
  playerId: playerIdSchema,
  tournamentId: tournamentIdSchema,
  snapshot: stateModelSchema,
});

/**
 * Related protocol - {@link socketProtocols.PlayerJoin}
 */
export const playerJoinSchema = z.object({
  player: playerSchema,
});

/**
 * Related protocol - {@link socketProtocols.StartRaceRequest}
 */
export const startRaceRequestSchema = z.object({
  playerId: playerIdSchema,
});

export type ProtocolSchemaTypes = typeof initialClientDataSchema | typeof initialServerDataSchema | typeof playerJoinSchema | typeof startRaceRequestSchema;
