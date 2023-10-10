import { RACE_END_WAIT_TIME } from '@razor/constants';
import { socketProtocols, StartRaceAcceptData } from '@razor/models';
import { store } from '@razor/store';

import {
  AllServerPubSubEventsToTypeMap,
  PubSubEvents,
  RaceTimeoutModel,
} from '../models';
import { Logger, publishToAllClients, pubsub } from '../services';
import { generateRaceText } from '../utils';

const logger = new Logger('start-race.controller');

type StartRaceArgs =
  AllServerPubSubEventsToTypeMap[socketProtocols.StartRaceRequest];

export const startRaceController = async ({
  context,
  playerId,
  tournamentId,
}: StartRaceArgs): Promise<void> => {
  let game = store.getState().game;
  let tournament = game.tournamentsModel[tournamentId];

  // Check for ongoing races. If there's an ongoing race dismiss the request.
  let raceIds = tournament.raceIds;
  let raceId = raceIds[raceIds.length - 1] || null;
  let race = raceId ? game.racesModel[raceId] : null;

  if (race?.isOnGoing) {
    logger.info(
      'The start race request has been dismissed because the tournament currently contains an ongoing race.',
      context,
      { onGoingRaceId: raceId },
    );
  }

  // Check for two active players in the tournament.
  if (tournament.playerIds.length < 2) {
    logger.error(
      'Tournament does not have at least two active players to start a race.',
      context,
    );
    return;
  }

  // Generate race text
  let raceText: string;
  try {
    raceText = await generateRaceText();
  } catch (error) {
    logger.error(`Race text generation failed, ${error}`, context, { error });
    return;
  }

  store.dispatch.game.startCountdown({
    tournamentId,
    playerId,
    raceText,
  });

  logger.info('Race started', context, { startedBy: playerId });

  game = store.getState().game;
  tournament = game.tournamentsModel[tournamentId];
  raceIds = tournament.raceIds;
  // Active race id
  raceId = raceIds[raceIds.length - 1];
  race = game.racesModel[raceId];

  const startedRaceData: StartRaceAcceptData = {
    raceId,
    raceStartedBy: playerId,
    raceText,
  };

  publishToAllClients({
    tournamentId,
    protocol: socketProtocols.StartRaceAccept,
    data: startedRaceData,
  });

  const raceEndTime = (race.timeoutDuration + RACE_END_WAIT_TIME) * 1000;

  const raceTimeoutData: RaceTimeoutModel = {
    context,
    data: { raceId },
  };

  const raceTimeout = setTimeout(() => {
    pubsub.publish(PubSubEvents.RaceTimeout, raceTimeoutData);
    clearTimeout(raceTimeout);
  }, raceEndTime);
};

pubsub.subscribe(socketProtocols.StartRaceRequest, startRaceController);
