import { SocketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { AllClientPubSubEventsToTypeMap } from '../models';
import { pubsub } from '../utils/pubsub';

type SendLeaderboardControllerArgs =
  AllClientPubSubEventsToTypeMap[SocketProtocols.SendLeaderboard];

function sendLeaderboardController({
  data,
}: SendLeaderboardControllerArgs): void {
  const { raceId, leaderboard } = data;

  const game = store.getState().game;

  store.dispatch.game.replaceFullState({
    parentState: {
      ...game,
      leaderboardsModel: {
        ...game.leaderboardsModel,
        [raceId]: leaderboard,
      },
    },
  });
  store.dispatch.game.endRace({ raceId });
}

pubsub.subscribe(SocketProtocols.SendLeaderboard, sendLeaderboardController);
