import { z } from 'zod';
import { PlayerLogsCollection } from './playerLog';

// ==== Primary Schemas ==== //
const raceIdSchema = z.custom<`T:${string}-R:${string}`>(id =>
  /^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}$/.test(id as string),
);

// ==== Types ==== //
// Race id template literal
export type raceId = z.input<typeof raceIdSchema>;

// ==== Interfaces ==== //
// Note: `Race` does not need to be a schema; because it's only bound to the server-to-client communication.
export interface Race {
  /** Unique race id */
  id: raceId;
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
  /** Player who pressed the start button */
  raceStartedBy: string;
}
