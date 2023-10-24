import { z } from 'zod';
import { PlayerId, PlayerProfile } from './player';
import { PlayerLogsCollection } from './playerLog';
export declare const raceIdSchema: z.ZodType<`T:${string}-R:${string}`, z.ZodTypeDef, `T:${string}-R:${string}`>;
export interface Race {
    /** Unique race id */
    id: RaceId;
    /** Race text which players are typing  */
    text: string;
    /** Race timeout timer (in seconds) which is calculated by the server.  */
    timeoutDuration: number;
    /** Race started timestamp from the server side after the player pressed the Play button
     *
     * This will be used to calculate the timeout of the race.
     */
    startedTimestamp: number;
    /** Players data for a specific race
     *
     * It can be empty before players send the starting message to the server.
     */
    playerLogs: PlayerLogsCollection[];
    /** Player profiles */
    playerProfiles: PlayerProfile[];
    /** Player who pressed the start button */
    raceStartedBy: PlayerId;
}
export type RaceId = z.input<typeof raceIdSchema>;
