import { Leaderboard } from './leaderboard';
import { Player } from './player';
import { Race } from './race';

export enum TournamentState {
  /** **Lobby**
   *
   * Every player is in the lobby.
   * (Race is not started yet.)
   */
  Lobby = 'lobby',
  /** **Ready**
   *
   * Two or more players available in the lobby.
   * (Race is not started yet.)
   */
  Ready = 'ready',
  /** **Countdown**
   *
   * A player pressed the `Play` button.
   */
  Countdown = 'countdown',
  /** **Race**
   *
   * The race is ongoing.
   */
  Race = 'race',
  /** **Leaderboard**
   *
   * The race is finished.
   */
  Leaderboard = 'leaderboard',
  /** **Empty**
   *
   * Lobby has no players. Waiting to destroy the lobby.
   */
  Empty = 'empty',
}

export interface Tournament {
  /** Unique tournament id (/lobby ID) */
  id: string;
  /** Tournament state */
  state: TournamentState;
  /** Races history and current race
   *
   * It can be empty if no races are started yet.
   */
  races: Race[];
  /** Players in the tournament
   *
   * It can be empty if the lobby is empty.
   */
  players: Player[];
  /** Leaderboards of the tournament
   *
   * It can be empty if the first race is not finished yet.
   */
  raceLeaderboards: Leaderboard[];
}
