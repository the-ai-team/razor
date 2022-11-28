import { AppRaceId } from './race';
import { AppTournamentId } from './tournament';

export enum AppPlayerState {
  Idle = 'idle',
  Racing = 'racing',
}

export type AppTimestamp = number;

export type AppTextLength = number;

/** Sample Id - `P:oNgXdluf` */
export type AppPlayerId = `P:${string}`;

export interface AppPlayer {
  name: string;
  avatarLink: string;
  state: AppPlayerState;
  tournamentId: AppTournamentId;
}

export type AppPlayers = Record<AppPlayerId, AppPlayer>;

/** Sample Id - `T:skt_2JVn-R:050-P:oNgXdluf` */
export type AppPlayerLogId = `${AppRaceId}-${AppPlayerId}`;

export interface AppPlayerLog {
  timestamp: AppTimestamp;
  textLength: AppTextLength;
}

export type AppPlayerLogs = Record<AppPlayerLogId, AppPlayerLog[]>;
