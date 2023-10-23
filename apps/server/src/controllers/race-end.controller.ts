import { SendLeaderboardData, SocketProtocols } from '@razor/models';
import { store } from '@razor/store';
import { extractId, ExtractIdType } from '@razor/util';

import { AllServerPubSubEventsToTypeMap, PubSubEvents } from '../models';
import { Logger, publishToAllClients, pubsub } from '../services';

const logger = new Logger('race-end.controller');

type RaceEndArgs = AllServerPubSubEventsToTypeMap[PubSubEvents.RaceEnd];

export const raceEndController = ({ context, data }: RaceEndArgs): void => {
  const { raceId } = data;
  const tournamentId = extractId(
    raceId,
    ExtractIdType.Race,
    ExtractIdType.Tournament,
  );

  // Check whether race is already finished.
  let game = store.getState().game;
  const race = game.racesModel[raceId];
  const isEnded = !race.isOnGoing;
  if (isEnded) {
    logger.error('Controller tried to end a race already ended.', context);
    return;
  }

  // End race in the store.
  store.dispatch.game.endRace({ raceId });
  logger.info('Race ended', context);

  // Send leaderboard to all players.
  game = store.getState().game;
  const leaderboard = game.leaderboardsModel[raceId];
  const sendLeaderboardData: SendLeaderboardData = {
    raceId,
    leaderboard,
  };
  publishToAllClients({
    tournamentId,
    protocol: SocketProtocols.SendLeaderboard,
    data: sendLeaderboardData,
  });
};

pubsub.subscribe(PubSubEvents.RaceEnd, raceEndController);
