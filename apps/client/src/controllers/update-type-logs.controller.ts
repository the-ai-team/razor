import { PlayerId, SocketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { AllClientPubSubEventsToTypeMap } from '../models';
import { pubsub } from '../utils/pubsub';

type UpdateTypeLogsControllerArgs =
  AllClientPubSubEventsToTypeMap[SocketProtocols.UpdateTypeLogs];

function updateTypeLogsController({
  data,
  savedPlayerId,
}: UpdateTypeLogsControllerArgs): void {
  const { raceId, playerLogs: playersLogs } = data;
  const race = store.getState().game.racesModel[raceId];
  const racePlayerIds = Object.keys(race.players) as PlayerId[];

  for (const playerId of racePlayerIds) {
    const logs = playersLogs[playerId];
    if (!logs || playerId === savedPlayerId) {
      continue;
    }

    store.dispatch.game.sendTypeLog({
      playerLog: logs,
      playerId,
      raceId,
    });
  }
}

pubsub.subscribe(SocketProtocols.UpdateTypeLogs, updateTypeLogsController);
