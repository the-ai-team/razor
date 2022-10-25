import { PlayerWithLogs } from './player';

export interface Race {
  /** Unique race id */
  id: string;

  /** Race text which players are typing  */
  text: string;

  /** Race timeout timer (in seconds) which calculated by the server.  */
  timeoutDuration: number;

  /** Race started timestamp from the server after player pressed Play button
   *
   * This will be used to caluculate force timeout of the race.
   */
  startedTimestamp: number;

  /** Players data for specific race
   *
   * can be empty before players send race starting message to the server.
   */
  players: PlayerWithLogs[];
}
