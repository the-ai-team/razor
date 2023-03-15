import { PLAYER_NAME_RANGE } from '@razor/constants';
import { z } from 'zod';

import { AppStateModel } from '../state';

import { TournamentId } from './tournament';

// ==== Types ==== //
/** Player id template literal */
export type PlayerId = z.input<typeof playerIdSchema>;
export type AuthToken = string;
export type socketId = string;

// ==== Enums ==== //
export enum PlayerState {
  /** **Player idle**
   *
   * When a player is not in a race but in the lobby.
   *
   * Possible actions:
   * In the lobby, In the leaderboard, etc.
   */
  Idle = 'idle',
  /** **Player racing**
   *
   * When a player is in a race.
   *
   * Possible actions:
   * In race only.
   */
  Racing = 'racing',
}

// ==== Primary Schemas ==== //
export const playerIdSchema = z.custom<`P:${string}`>(id =>
  /^P:[a-zA-Z0-9]{8}$/.test(id as string),
);

export const playerNameSchema = z
  .string()
  .min(PLAYER_NAME_RANGE[0])
  .max(PLAYER_NAME_RANGE[1])
  .regex(/^[a-zA-Z0-9_]+$/);

// ==== Interfaces ==== //
// Note: `Player` does not need to be a schema; because it's only bound to the server-to-client communication.
export interface Player {
  /** Unique player id */
  id: PlayerId;
  /** Player name */
  name: string;
  /** Player avatar icon URL */
  avatarLink: string;
  /** Player state */
  state: PlayerState;
}

// Data sent from the client to the server with socket establishment
export interface InitialClientData {
  playerName: string;
  roomId?: string;
}

export type Snapshot = Omit<AppStateModel, 'errorLogsModel'>; // This interface is used to sync the client with the server.

// Data sent from the server to the client after socket establishment to sync
export interface InitialServerData {
  playerId: PlayerId;
  tournamentId: TournamentId;
  /** Game snapshot */
  snapshot: Snapshot;
}
