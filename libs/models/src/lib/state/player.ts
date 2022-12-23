import { AppRaceId } from './race';
import { AppTournamentId } from './tournament';

export enum AppPlayerState {
  Idle = 'idle',
  Racing = 'racing',
}

/** Unix timestamp from the client side to keep logs. */
export type AppTimestamp = number;

/** Correctly typed text length for each player. */
export type AppTextLength = number;

/** Player id
 *
 * Sample Id - `P:oNgXdluf`
 */
export type AppPlayerId = `P:${string}`;

/** Player details */
export interface AppPlayer {
  name: string;
  avatarLink: string;
  state: AppPlayerState;
  tournamentId: AppTournamentId;
}

/** Player models */
export type AppPlayers = Record<AppPlayerId, AppPlayer>;

/** Player log id
 *
 * Sample Id - `T:sktm2JVn-R:050-P:oNgXdluf`
 */
export type AppPlayerLogId = `${AppRaceId}-${AppPlayerId}`;

/** Player log details */
export interface AppPlayerLog {
  timestamp: AppTimestamp;
  textLength: AppTextLength;
}

/** Player logs model */
export type AppPlayerLogs = Record<AppPlayerLogId, AppPlayerLog[]>;
