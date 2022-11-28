import { AppPlayerId } from './player';
import { AppRaceId } from './race';

export enum AppTournamentState {
  Lobby = 'lobby',
  Ready = 'ready',
  Countdown = 'countdown',
  Race = 'race',
  Leaderboard = 'leaderboard',
  Empty = 'empty',
}

/** Sample Id - `T:skt_2JVn` */
export type AppTournamentId = `T:${string}`;

export interface AppTournament {
  state: AppTournamentState;
  raceIds: Array<AppRaceId>;
  playerIds: Array<AppPlayerId>;
}

export type AppTournaments = Record<AppTournamentId, AppTournament>;
