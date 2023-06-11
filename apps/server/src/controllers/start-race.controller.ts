import {
  AppPlayerId,
  AppTournamentId,
  socketProtocols,
  StartRaceAccept,
} from '@razor/models';
import { store } from '@razor/store';

import { PubSubEvents } from '../models';
import { ContextOutput, Logger, pubsub } from '../services';
import { generateRaceText } from '../utils';

interface StartRaceRequestArgs {
  context: ContextOutput;
  playerId: AppPlayerId;
  tournamentId: AppTournamentId;
}

const logger = new Logger('start-race.controller');

export const startRaceController = async ({
  context,
  playerId,
  tournamentId,
}: StartRaceRequestArgs): Promise<void> => {
  // Check for two active players in the tournament.
  const tournament = store.getState().game.tournamentsModel[tournamentId];
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

  const game = store.getState().game;
  const tournamentModel = game.tournamentsModel[tournamentId];
  const raceIds = tournamentModel.raceIds;
  // Active race id
  const raceId = raceIds[raceIds.length - 1];

  const startedRaceData: StartRaceAccept = {
    raceId,
    raceStartedBy: playerId,
    raceText,
  };

  pubsub.publish(PubSubEvents.SendDataToAll, {
    tournamentId,
    protocol: socketProtocols.StartRaceAccept,
    data: startedRaceData,
  });
};

pubsub.subscribe(socketProtocols.StartRaceRequest, startRaceController);
