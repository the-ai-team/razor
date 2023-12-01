import { AppPlayerId, AppRaceId } from '@razor/models';

import { ContextOutput, Logger } from '../services';

const logger = new Logger('check-race-complete');

/** This is class will be used for detect a specific race has ended by player complete/timeout.
 * When a player send last type log or client timeout event,
 * that player's id will be added to an array.
 */
class CheckRaceEnd {
  private allPlayerIds: AppPlayerId[];
  private raceEndPlayerIds: AppPlayerId[];
  private raceTextLength: number;
  private _isRaceEnded = false;

  constructor(allPlayerIds: AppPlayerId[], raceTextLength: number) {
    this.allPlayerIds = allPlayerIds;
    this.raceTextLength = raceTextLength;
    this.raceEndPlayerIds = [];
  }

  /** Mark a player as ended the race. */
  private addPlayer(playerId: AppPlayerId, context: ContextOutput): void {
    if (!this.allPlayerIds.includes(playerId)) {
      logger.error('Added a player not included in all player Ids', context);
      return;
    }

    if (this.raceEndPlayerIds.includes(playerId)) {
      logger.error('Player already marked as ended.', context);
      return;
    }

    this.raceEndPlayerIds.push(playerId);
  }

  /** Check all players finished the race */
  public isRaceEnded(): boolean {
    // If already ended.
    if (this._isRaceEnded) {
      return true;
    } else {
      // Check allPlayerIds are in raceEndPlayerIds
      const isAllPlayersEnded = this.allPlayerIds.every(playerId =>
        this.raceEndPlayerIds.includes(playerId),
      );
      if (isAllPlayersEnded) {
        this._isRaceEnded = true;
        return true;
      }
    }
  }

  /** Check whether player has completed the race text.
   * If completed add the player to raceEndPlayerIds.
   *
   * @param playerId - Player id to check.
   * @param lastTextLength - Last text length of the player.
   * @param context - Logger context
   *
   * @returns true; if player already ended the race. false; otherwise.
   */
  public checkPlayerHasCompletedRace(
    playerId: AppPlayerId,
    lastTextLength: number,
    context: ContextOutput,
  ): boolean {
    // If already ended, do nothing.
    if (this.raceEndPlayerIds.includes(playerId)) {
      return true;
    }

    if (lastTextLength === this.raceTextLength) {
      this.addPlayer(playerId, context);
    }
    return false;
  }

  /** Add a player ended race by client timeout. */
  public addPlayerTimeout(playerId: AppPlayerId, context: ContextOutput): void {
    this.addPlayer(playerId, context);
  }
}

const CheckRaceEndInstances: Record<AppRaceId, CheckRaceEnd> = {};

export function createCheckRaceEndInstance(
  raceId: AppRaceId,
  allPlayerIds: AppPlayerId[],
  raceTextLength: number,
): CheckRaceEnd {
  const instance = new CheckRaceEnd(allPlayerIds, raceTextLength);
  CheckRaceEndInstances[raceId] = instance;
  return instance;
}

export function getCheckRaceEndInstance(raceId: AppRaceId): CheckRaceEnd {
  return CheckRaceEndInstances[raceId];
}

export function deleteCheckRaceEndInstance(raceId: AppRaceId): void {
  delete CheckRaceEndInstances[raceId];
}

export function viewAllCheckRaceEndInstances(): Record<
  AppRaceId,
  CheckRaceEnd
> {
  return CheckRaceEndInstances;
}
