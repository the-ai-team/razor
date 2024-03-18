import { playerLogsToAppPlayerLogs, SocketProtocols } from '@razor/models';
import { store } from '@razor/store';

import {
  AllServerPubSubEventsToTypeMap,
  PubSubEvents,
  RaceEndModel,
} from '../../models';
import { Logger, pubsub } from '../../services';
import { getCheckRaceEndInstance } from '../../utils/check-race-complete';
import { serverRaceTimeout } from '../start-race.controller';

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

  if (playerLogs?.length <= 0) {
    logger.warn('Received an empty type log.', context);
    return;
  }

  // Check whether race is ongoing
  const race = store.getState().game.racesModel[raceId];
  const isRaceOngoing = race.isOnGoing;

  if (!isRaceOngoing) {
    logger.warn('Received a type log when specific race is ended.', context);
    return;
  }

  // Check the player has ended the race,
  // if so, add the player to CheckRaceComplete
  const lastPlayerLog = playerLogs[playerLogs.length - 1];
  const playerLastTextLength = lastPlayerLog.textLength;
  const checkRaceCompleteInstance = getCheckRaceEndInstance(raceId);
  const isPlayerAlreadyEndedRace =
    checkRaceCompleteInstance.checkPlayerHasCompletedRace(
      playerId,
      playerLastTextLength,
      context,
    );

  // If player already ended the race, do nothing.
  // No need to add type logs to queue.
  if (isPlayerAlreadyEndedRace) {
    logger.warn('Received type logs from already ended player.', context);
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

  // If all players have completed the race, raise RaceEnd event.
  const isAllPlayersEnded = checkRaceCompleteInstance.isRaceEnded();
  const raceEndData: RaceEndModel = {
    context,
    data: { raceId },
  };
  if (isAllPlayersEnded) {
    pubsub.publish(PubSubEvents.RaceEnd, raceEndData);

    logger.info(
      'Race ended after all client completed the race by client side.',
      context,
    );
    // Clearing the server timeout when all race players have completed their races from the client side.
    clearTimeout(serverRaceTimeout);
  }
};

pubsub.subscribe(SocketProtocols.SendTypeLog, sendTypeLogController);
