import { SocketProtocols } from '@razor/models';

import {
  AllServerPubSubEventsToTypeMap,
  PubSubEvents,
  RaceEndModel,
} from '../models';
import { Logger, pubsub } from '../services';
import { getCheckRaceEndInstance } from '../utils/check-race-complete';

import { serverRaceTimeout } from './start-race.controller';

const logger = new Logger('create-tournament.controller');

type InformTimeoutArgs =
  AllServerPubSubEventsToTypeMap[SocketProtocols.InformTimeout];

const informTimeoutController = ({
  data,
  context,
  playerId,
}: InformTimeoutArgs): void => {
  // TODO: Implement a function to get race Id from server itself without passing it from client
  const { raceId } = data;
  logger.debug('Player race client timer timed out', context);

  const checkRaceCompleteInstance = getCheckRaceEndInstance(raceId);
  checkRaceCompleteInstance.addPlayerTimeout(playerId, context);

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

pubsub.subscribe(SocketProtocols.InformTimeout, informTimeoutController);
