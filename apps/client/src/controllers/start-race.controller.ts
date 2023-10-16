import { socketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { AllClientPubSubEventsToTypeMap } from '../models';
import { pubsub } from '../utils/pubsub';

pubsub.subscribe(
  socketProtocols.StartRaceAccept,
  ({
    data,
    tournamentId,
  }: AllClientPubSubEventsToTypeMap[socketProtocols.StartRaceAccept]) => {
    const { raceStartedBy, raceText, ..._ } = data;
    store.dispatch.game.startCountdown({
      tournamentId,
      playerId: raceStartedBy,
      raceText,
    });
  },
);
