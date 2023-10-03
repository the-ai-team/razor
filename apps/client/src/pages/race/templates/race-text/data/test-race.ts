import { M_RACE_TEXT0 } from '@razor/mocks';
import { AppPlayerId, AppStateModel } from '@razor/models';
import { initializeStore } from '@razor/store';
import { savePlayerId } from 'apps/client/src/utils/save-player-id';

const initialState: AppStateModel = {
  tournamentsModel: {},
  playersModel: {},
  racesModel: {},
  leaderboardsModel: {},
  playerLogsModel: {},
  errorLogsModel: {},
};

// Mock store
export const store = initializeStore(initialState);

store.dispatch.game.joinPlayer({
  receivedTournamentId: '',
  playerName: 'Player1',
});

let game = store.getState().game;
const playersModel = game.playersModel;
const players = Object.keys(playersModel);
const player1Id = players[0] as AppPlayerId;
export const testTournamentId = playersModel[player1Id].tournamentId;

const selfPlayerId = store.dispatch.game.joinPlayer({
  receivedTournamentId: testTournamentId,
  playerName: 'Player2',
});
savePlayerId(selfPlayerId);

store.dispatch.game.startCountdown({
  tournamentId: testTournamentId,
  playerId: player1Id,
  raceText: M_RACE_TEXT0,
});

game = store.getState().game;
const playerIds = game.tournamentsModel[testTournamentId].playerIds;

playerIds.forEach(playerId => {
  store.dispatch.game.sendTypeLog({
    raceId: `${testTournamentId}-R:000`,
    playerId: playerId,
    playerLog: {
      timestamp: Date.now(),
      textLength: 0,
    },
  });
});

game = store.getState().game;

export const addPlayer = (count: number): void => {
  store.dispatch.game.joinPlayer({
    receivedTournamentId: testTournamentId,
    playerName: `Player${count}`,
  });
  game = store.getState().game;
  const playerIds = game.tournamentsModel[testTournamentId].playerIds;
  const playerId = playerIds[playerIds.length - 1];

  store.dispatch.game.sendTypeLog({
    raceId: `${testTournamentId}-R:000`,
    playerId: playerId,
    playerLog: {
      timestamp: Date.now(),
      textLength: 0,
    },
  });
};

export const clearLastPlayer = (): void => {
  game = store.getState().game;
  const playerIds = game.tournamentsModel[testTournamentId].playerIds;
  store.dispatch.game.clearPlayer({
    playerId: playerIds[playerIds.length - 1],
  });
};
