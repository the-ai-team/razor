import { AppRaceId } from './race';
import { AppTournamentId } from './tournament';

export enum AppPlayerState {
  Idle = 'idle',
  Racing = 'racing',
}

export type AppTimestamp = number;
export type AppTextLength = number;

export type AppPlayerId = string;
export interface AppPlayer {
  name: string;
  avatarLink: string;
  state: AppPlayerState;
  tournamentId: AppTournamentId;
}
export type AppPlayers = Record<AppPlayerId, AppPlayer>;

export type AppPlayerLogId = `${AppTournamentId}-${AppRaceId}-${AppPlayerId}`;
export interface AppPlayerLog {
  timestamp: AppTimestamp;
  textLength: AppTextLength;
}
export type AppPlayerLogs = Record<AppPlayerLogId, AppPlayerLog[]>;
