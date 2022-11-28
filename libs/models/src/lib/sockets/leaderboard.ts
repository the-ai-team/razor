interface FinishedPlayerValues {
  /** Player words per mintue count */
  wpm: number;
  /** Time taken by the player to finish the race */
  elpasedTime: number;
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

/** How is the player ended the race */
export enum PlayerStatus {
  /** Player finished the race by completing the text */
  Complete = 'complete',
  /** Player finished by timeout */
  Timeout = 'timeout',
}

export interface Leaderboard {
  /** Race Id */
  raceId: string;
  /** Leaderboard entires of players */
  entries: {
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
  }[];
}
