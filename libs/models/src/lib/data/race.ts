import { AppPlayerId, AppPlayer } from './player';
import { AppTournamentId } from './tournament';

export type AppPlayerProfile = Pick<AppPlayer, 'name' | 'avatarLink'>;
export type AppPlayerProfiles = Record<AppPlayerId, AppPlayerProfile>;

/** Sample Id - `T:skt_2JVn-R:050` */
export type AppRaceId = `${AppTournamentId}-R:${string}`;
export interface AppRace {
  text: string;
  timeoutDuration: number;
  startedTimestamp: number;
  players: AppPlayerProfiles;
  isOnGoing: boolean;
  raceStartedBy: AppPlayerId;
}
export type AppRaces = Record<AppRaceId, AppRace>;
