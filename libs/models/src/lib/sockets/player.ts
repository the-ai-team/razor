/** Interface for time-logs when players are typing */
interface TimeLog {
  /** Correctly typed length by player */
  textLength: number;
  /** Time when player typed the last character */
  timestamp: number;
}

export enum PlayerState {
  /** **Player idle**
   *
   * When a player not in a race but in the lobby.
   *
   * Possible actions:
   * In lobby, In leaderboard, etc.
   */
  Idle = 'idle',
  /** **Player racing**
   *
   * When a player in a race.
   *
   * Possible actions:
   * In race only.
   */
  Racing = 'racing',
}

export interface Player {
  /** Unique player id */
  id: string;
  /** Player name */
  name: string;
  /** Player avatar icon URL */
  avatarLink: string;
  /** Player state */
  state: PlayerState;
}

export interface PlayerWithLogs extends Omit<Player, 'state' | 'lobbyId'> {
  /** Array of time logs of player */
  logs: TimeLog[];
}
