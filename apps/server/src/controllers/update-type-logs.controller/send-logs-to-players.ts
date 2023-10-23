import { SERVER_TYPE_LOG_INTERVAL } from '@razor/constants';
import { AllProtocolToTypeMap, RaceId, SocketProtocols } from '@razor/models';
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
      const data: AllProtocolToTypeMap[SocketProtocols.UpdateTypeLogs] = {
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
        protocol: SocketProtocols.UpdateTypeLogs,
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
  pubsub.unsubscribe(PubSubEvents.EndTypeLogListening, (_): void =>
    flushAllAfterRaceEnd(destroyTypeLogPusher, context),
  );
  destroyTypeLogPusher();
};

type StartTypeLogListeningArgs =
  AllServerPubSubEventsToTypeMap[PubSubEvents.StartTypeLogListening];
type EndTypeLogListeningArgs =
  AllServerPubSubEventsToTypeMap[PubSubEvents.EndTypeLogListening];

const typeLogPushController = ({
  data,
  context,
}: StartTypeLogListeningArgs): void => {
  logger.info('Started type log listening', context);
  const { raceId: startTypeLogEventRaceId } = data;
  const destroyTypeLogPusher = typeLogPusher(startTypeLogEventRaceId, context);
  pubsub.subscribe(
    PubSubEvents.EndTypeLogListening,
    ({ data }: EndTypeLogListeningArgs): void => {
      const { raceId: endTypeLogEventRaceId } = data;
      // If race ids are equal flush all and destroy the type log pusher.
      if (startTypeLogEventRaceId == endTypeLogEventRaceId) {
        flushAllAfterRaceEnd(destroyTypeLogPusher, context);
      }
    },
  );
};

pubsub.subscribe(PubSubEvents.StartTypeLogListening, typeLogPushController);
