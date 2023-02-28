import { RaceId } from './race';

export interface Leaderboard {
  /** Race Id */
  raceId: RaceId;
  /** Leaderboard entires of players */
  entries: LeaderboardEntry[];
}

// ==== Interfaces ==== //
// Note: Interfaces of the leaderboard does not need to be a schema; because they're only bound to the server-to-client communication.
interface FinishedPlayerValues {
  /** Player words per minute count */
  wpm: number;
  /** Time taken by the player to finish the race */
  elapsedTime: number;
  /** Number of typos done by the player  */
  typos: number;
  /** Score of the player */
  score: number;
}

interface TimeoutPlayerValues {
  /** total distance travelled (/text length typed) by the player */
  distance: number;
  /** Number of typos done by the player  */
  typos: number;
  /** Score of the player */
  score: number;
}

export interface LeaderboardEntry {
  /** Player id */
  playerId: string;
  /** Player name */
  playerName: string;
  /** Player avatar icon URL */
  playerAvatarLink: string;
  /** Player status after a race ended */
  status: PlayerStatus;
  /** Player score and stats  */
  values: FinishedPlayerValues | TimeoutPlayerValues;
}

// ==== Enums ==== //
/** How is the player ended the race */
export enum PlayerStatus {
  /** Player finished the race by completing the text */
  Complete = 'complete',
  /** Player finished by timeout */
  Timeout = 'timeout',
}
