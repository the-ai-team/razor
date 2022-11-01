import { AppPlayerId, AppPlayer } from './player';
import { AppTournamentId } from './tournament';

export type AppPlayerProfile = Pick<AppPlayer, 'name' | 'avatarLink'>;

export type AppRaceId = `${AppTournamentId}-${number}`;
export interface AppRace {
  text: string;
  timeoutDuration: number;
  startedTimestamp: number;
  players: Record<AppPlayerId, AppPlayerProfile>;
  isOnGoing: boolean;
}
export type AppRaces = Record<AppRaceId, AppRace>;
