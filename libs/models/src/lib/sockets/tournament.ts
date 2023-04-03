import { z } from 'zod';

import { Leaderboard } from './leaderboard';
import { Player } from './player';
import { Race } from './race';

// ==== Interfaces ==== //
// Note: `Tournament` does not need to be a schema; because it's only bound to the server-to-client communication.
export interface Tournament {
  /** Unique tournament id (/lobby ID) */
  id: string;
  /** Tournament state */
  state: TournamentState;
  /** Races history and current race
   *
   * It can be empty if no races are started yet.
   */
  races: Race[];
  /** Players in the tournament
   *
   * It can be empty if the lobby is empty.
   */
  players: Player[];
  /** Leaderboards of the tournament
   *
   * It can be empty if the first race is not finished yet.
   */
  raceLeaderboards: Leaderboard[];
}

// ==== Types ==== //
/** Tournament id template literal */
export type TournamentId = z.input<typeof tournamentIdSchema>;

// ==== Enums ==== //
export enum TournamentState {
  /** **Lobby**
   *
   * Every player is in the lobby.
   * (Race is not started yet.)
   */
  Lobby = 'lobby',
  /** **Ready**
   *
   * Two or more players available in the lobby.
   * (Race is not started yet.)
   */
  Ready = 'ready',
  /** **Countdown**
   *
   * A player pressed the `Play` button.
   */
  Countdown = 'countdown',
  /** **Race**
   *
   * The race is ongoing.
   */
  Race = 'race',
  /** **Leaderboard**
   *
   * The race is finished.
   */
  Leaderboard = 'leaderboard',
  /** **Empty**
   *
   * Lobby has no players. Waiting to destroy the lobby.
   */
  Empty = 'empty',
}

// ==== Primary Schemas ==== //
export const timestampSchema = z
  .number()
  .int()
  .nonnegative()
  .refine(
    value => value.toString().length === 13,
    'Timestamp must be in milliseconds (13 digits).',
  );

export const tournamentIdSchema = z.custom<`T:${string}`>(id =>
  /^T:[a-zA-Z0-9]{8}$/.test(id as string),
);
