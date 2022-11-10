import { AppPlayerId } from './player';
import { AppRaceId } from './race';

export enum AppPlayerStatus {
  Complete = 'complete',
  Timeout = 'timeout',
}

export interface AppFinishedPlayerValues {
  wpm: number;
  elpasedTime: number;
}
export interface AppTimeoutPlayerValues {
  distance: number;
}

export interface AppLeaderboardEntry {
  playerId: AppPlayerId;
  status: AppPlayerStatus;
  values: AppFinishedPlayerValues | AppTimeoutPlayerValues;
}
export type AppLeaderboard = AppLeaderboardEntry[];

export type AppLeaderboards = Record<AppRaceId, AppLeaderboard>;
