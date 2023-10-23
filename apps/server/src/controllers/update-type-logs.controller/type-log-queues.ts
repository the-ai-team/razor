import {
  PlayerId,
  PlayerLog,
  PlayerLogsCollection,
  playerLogsToAppPlayerLogs,
  RaceId,
} from '@razor/models';

import { ContextOutput, Logger } from '../../services';

const logger = new Logger('update-type-log.controller/type-log-queues');

/** Keeping type logs queues per every race on the server. */
const typeLogsQueuesForRaces = new Map<RaceId, TypeLogsQueue>();

/** This class contains player-type-logs for specific race. */
class TypeLogsQueue {
  private logsCollection: PlayerLogsCollection = {};

  /** Add player logs to queue */
  public addLog(log: PlayerLog[], playerId: PlayerId): void {
    if (!this.logsCollection[playerId]) {
      this.logsCollection[playerId] = [];
    }
    this.logsCollection[playerId].push(...playerLogsToAppPlayerLogs(log));
  }

  /** This method will return logs collection stored inside the class. */
  public getLogsCollection(): PlayerLogsCollection {
    return this.logsCollection;
  }

  /** Clear the race logs queue */
  public clearQueue(): void {
    this.logsCollection = {};
  }
}

/**
 * Create a new type log queue instance for the race
 * @param raceId id of race that the queue is for
 * @returns new instance of TypeLogsQueue
 */
const createTypeLogsQueue = (
  raceId: RaceId,
  context: ContextOutput,
): TypeLogsQueue => {
  const typeLogsQueue = new TypeLogsQueue();
  typeLogsQueuesForRaces.set(raceId, typeLogsQueue);

  logger.debug('New type-logs-queue created for the race.', context);
  return typeLogsQueue;
};

/**
 * Get the type-log-queue instance for the race.
 * If the queue doesn't exist, create a new one.
 * @param raceId id of the race that the queue is for
 * @returns instance of TypeLogsQueue
 */
export const getTypeLogsQueue = (
  raceId: RaceId,
  context: ContextOutput,
): TypeLogsQueue => {
  if (!typeLogsQueuesForRaces.has(raceId)) {
    return createTypeLogsQueue(raceId, context);
  }
  return typeLogsQueuesForRaces.get(raceId);
};

/**
 * Clear specific type-log-queue instance.
 * @param raceId id of the race which queue should be cleared
 */
export const clearTypeLogsQueue = (raceId: RaceId): void => {
  typeLogsQueuesForRaces.get(raceId)?.clearQueue();
  delete typeLogsQueuesForRaces[raceId];
};
