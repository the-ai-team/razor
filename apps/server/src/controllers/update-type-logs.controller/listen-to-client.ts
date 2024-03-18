import { playerLogsToAppPlayerLogs, SocketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { AllServerPubSubEventsToTypeMap } from '../../models';
import { Logger, pubsub } from '../../services';

import { getTypeLogsQueue } from './type-log-queues';

type SendTypeLogControllerArgs =
  AllServerPubSubEventsToTypeMap[SocketProtocols.SendTypeLog];

const logger = new Logger('update-type-log.controller/listen-to-client');

export const sendTypeLogController = ({
  data,
  context,
  playerId,
}: SendTypeLogControllerArgs): void => {
  const { raceId, playerLogs } = data;

  // Check whether race is ongoing
  const race = store.getState().game.racesModel[raceId];
  const isRaceOngoing = race.isOnGoing;

  if (!isRaceOngoing) {
    logger.warn('Received a type log when specific race is ended.', context);
    return;
  }

  store.dispatch.game.sendTypeLog({
    raceId,
    playerId,
    playerLog: playerLogsToAppPlayerLogs(playerLogs),
  });

  const typeLogsQueue = getTypeLogsQueue(raceId, context);
  typeLogsQueue.addLog(playerLogs, playerId);
  logger.debug('Type logs are added to race type-logs-queue.', context);
};

pubsub.subscribe(SocketProtocols.SendTypeLog, sendTypeLogController);
