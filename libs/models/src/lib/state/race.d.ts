import { AppPlayer, AppPlayerId } from './player';
import { AppTournamentId } from './tournament';
/** Player profile */
export type AppPlayerProfile = Pick<AppPlayer, 'name' | 'avatarLink'>;
/** Player profile collection to keep in the race */
export type AppPlayerProfiles = Record<AppPlayerId, AppPlayerProfile>;
/** Race id
 *
 * Sample Id - `T:sktm2JVn-R:050`
 */
export type AppRaceId = `${AppTournamentId}-R:${string}`;
/** Race details */
export interface AppRace {
    text: string;
    timeoutDuration: number;
    startedTimestamp: number;
    players: AppPlayerProfiles;
    isOnGoing: boolean;
    raceStartedBy: AppPlayerId;
}
/** Races model */
export type AppRaces = Record<AppRaceId, AppRace>;
