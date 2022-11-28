import { AppPlayerId } from './player';
import { AppRaceId } from './race';

/** Player status after a race. */
export enum AppPlayerStatus {
  Complete = 'complete',
  Timeout = 'timeout',
}

/** Leaderboard entry values of the completed player. */
export interface AppFinishedPlayerValues {
  wpm: number;
  elpasedTime: number;
}

/** Leaderboard entry values of the incompleted (who end the race by timeout) player. */
export interface AppTimeoutPlayerValues {
  distance: number;
}

/** Leaderboard entry of a player. */
export interface AppLeaderboardEntry {
  playerId: AppPlayerId;
  status: AppPlayerStatus;
  values: AppFinishedPlayerValues | AppTimeoutPlayerValues;
}

/** A leaderboard (a collection of entries) */
export type AppLeaderboard = AppLeaderboardEntry[];

/** Leaderboards model (a collection of leaderboards) */
export type AppLeaderboards = Record<AppRaceId, AppLeaderboard>;
