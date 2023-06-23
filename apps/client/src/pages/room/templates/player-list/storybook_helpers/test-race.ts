import { AppPlayerId, AppStateModel } from '@razor/models';
import { initializeStore } from '@razor/store';

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
  playerName: 'JOhn',
});

const game = store.getState().game;
const playersModel = game.playersModel;
const players = Object.keys(playersModel);
const player1Id = players[0] as AppPlayerId;
export const testTournamentId = playersModel[player1Id].tournamentId;

store.dispatch.game.joinPlayer({
  receivedTournamentId: testTournamentId,
  playerName: 'HiddenTypo',
});

store.dispatch.game.joinPlayer({
  receivedTournamentId: testTournamentId,
  playerName: 'Razor3',
});
