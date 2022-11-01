import { AppPlayerId } from './player';
import { AppRaceId } from './race';
import { AppTournamentId } from './tournament';

export enum AppPlayerStatus {
  Complete = 'complete',
  Timeout = 'timeout',
}

export interface AppFinishedPlayerValues {
  wpm: number;
  elpasedTime: number;
  typos: number;
  score: number;
}
export interface AppTimeoutPlayerValues {
  distance: number;
  typos: number;
  score: number;
}

export type AppLeaderboardId = `${AppTournamentId}-${AppRaceId}`;
export interface AppLeaderboardEntry {
  playerId: AppPlayerId;
  position: number;
  status: AppPlayerStatus;
  values: AppFinishedPlayerValues | AppTimeoutPlayerValues;
}
export type AppLeaderboard = AppLeaderboardEntry[];

export type AppLeadeboards = Record<AppLeaderboardId, AppLeaderboard>;
