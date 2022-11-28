import { PlayerWithLogs } from './player';

export interface Race {
  /** Unique race id */
  id: string;
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
  players: PlayerWithLogs[];
  /** Player who pressed the start button */
  raceStartedBy: string;
}
