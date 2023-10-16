import { socketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { AllClientPubSubEventsToTypeMap } from '../models';
import { pubsub } from '../utils/pubsub';

type StartRaceControllerArgs =
  AllClientPubSubEventsToTypeMap[socketProtocols.StartRaceAccept];

function StartRaceController({
  data,
  tournamentId,
}: StartRaceControllerArgs): void {
  const { raceStartedBy, raceText, ..._ } = data;

  store.dispatch.game.startCountdown({
    tournamentId,
    playerId: raceStartedBy,
    raceText,
  });
}

pubsub.subscribe(socketProtocols.StartRaceAccept, StartRaceController);
