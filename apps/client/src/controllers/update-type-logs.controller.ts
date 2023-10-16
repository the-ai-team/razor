import { PlayerId, socketProtocols } from '@razor/models';
import { store } from '@razor/store';

import { AllClientPubSubEventsToTypeMap } from '../models';
import { pubsub } from '../utils/pubsub';

type UpdateTypeLogsControllerArgs =
  AllClientPubSubEventsToTypeMap[socketProtocols.UpdateTypeLogs];

function updateTypeLogsController({
  data,
  savedPlayerId,
}: UpdateTypeLogsControllerArgs): void {
  const { raceId, playerLogs: playersLogs } = data;
  const race = store.getState().game.racesModel[raceId];
  const racePlayerIds = Object.keys(race.players) as PlayerId[];

  for (const playerId of racePlayerIds) {
    const playerLogs = playersLogs[playerId];
    if (!playerLogs || playerId === savedPlayerId) {
      continue;
    }

    store.dispatch.game.sendTypeLog({
      raceId: raceId,
      playerId,
      playerLog: playerLogs,
    });
  }
}

pubsub.subscribe(socketProtocols.UpdateTypeLogs, updateTypeLogsController);
