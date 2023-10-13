import { SERVER_TYPE_LOG_INTERVAL } from '@razor/constants';
import { AllProtocolToTypeMap, RaceId, socketProtocols } from '@razor/models';
import { extractId, ExtractIdType } from '@razor/util';

import { AllServerPubSubEventsToTypeMap, PubSubEvents } from '../../models';
import {
  ContextOutput,
  Logger,
  publishToAllClients,
  pubsub,
} from '../../services';

import { clearTypeLogsQueue, getTypeLogsQueue } from './type-log-queues';

const logger = new Logger('update-type-log.controller/send-logs-to-players');

/**
 * Sends the collected logs to all players at a specific interval.
 */
export const typeLogPusher = (
  raceId: RaceId,
  context: ContextOutput,
): (() => void) => {
  const timer = setInterval(() => {
    const logsQueue = getTypeLogsQueue(raceId, context);
    const logsCollection = logsQueue.getLogsCollection();
    const isLogsCollectionEmpty =
      logsCollection == null || Object.keys(logsCollection).length === 0;

    if (!isLogsCollectionEmpty) {
      const data: AllProtocolToTypeMap[socketProtocols.UpdateTypeLogs] = {
        raceId: raceId,
        playerLogs: logsCollection,
      };

      const tournamentId = extractId(
        raceId,
        ExtractIdType.Race,
        ExtractIdType.Tournament,
      );

      publishToAllClients({
        tournamentId: tournamentId,
        protocol: socketProtocols.UpdateTypeLogs,
        data,
      });
      logsQueue.clearQueue();
    }
  }, SERVER_TYPE_LOG_INTERVAL);

  return (): void => {
    clearInterval(timer);
    clearTypeLogsQueue(raceId);
    logger.info(
      'Type log pusher destroyed and queue cleared after race end.',
      context,
    );
  };
};

const flushAllAfterRaceEnd = (
  destroyTypeLogPusher: () => void,
  context: ContextOutput,
): void => {
  pubsub.unsubscribe(PubSubEvents.StartTypeLogListening, destroyTypeLogPusher);
  pubsub.unsubscribe(PubSubEvents.RaceTimeout, (_): void =>
    flushAllAfterRaceEnd(destroyTypeLogPusher, context),
  );
  destroyTypeLogPusher();
};

type StartTypeLogListeningArgs =
  AllServerPubSubEventsToTypeMap[PubSubEvents.StartTypeLogListening];
const typeLogPushController = ({
  data,
  context,
}: StartTypeLogListeningArgs): void => {
  const { raceId } = data;
  const destroyTypeLogPusher = typeLogPusher(raceId, context);
  pubsub.subscribe(PubSubEvents.RaceTimeout, (_): void =>
    flushAllAfterRaceEnd(destroyTypeLogPusher, context),
  );
};

pubsub.subscribe(PubSubEvents.StartTypeLogListening, typeLogPushController);
