import { AppPlayerId } from './player';
import { AppRaceId } from './race';

/** Tournament state */
export enum AppTournamentState {
  Lobby = 'lobby',
  Ready = 'ready',
  Race = 'race',
  Leaderboard = 'leaderboard',
  Empty = 'empty',
}

/** Tournament id
 *
 * Sample Id - `T:sktm2JVn`
 */
export type AppTournamentId = `T:${string}`;

/** Tournament details */
export interface AppTournament {
  state: AppTournamentState;
  raceIds: Array<AppRaceId>;
  playerIds: Array<AppPlayerId>;
}

/** Tournaments model */
export type AppTournaments = Record<AppTournamentId, AppTournament>;
