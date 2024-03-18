import { SocketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { AllClientPubSubEventsToTypeMap } from '../models';
import { pubsub } from '../utils/pubsub';

type StartRaceControllerArgs =
  AllClientPubSubEventsToTypeMap[SocketProtocols.StartRaceAccept];

function StartRaceController({
  data,
  tournamentId,
}: StartRaceControllerArgs): void {
  const { raceStartedBy, raceText, ..._ } = data;

  store.dispatch.game.startRace({
    tournamentId,
    playerId: raceStartedBy,
    raceText,
  });
}

pubsub.subscribe(SocketProtocols.StartRaceAccept, StartRaceController);
