import { M_RACE_TEXT0 } from '@razor/mocks';
import {
  AppLeaderboard,
  AppPlayerId,
  AppPlayerStatus,
  AppRaceId,
  AppStateModel,
} from '@razor/models';
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

let game = store.getState().game;
const playersModel = game.playersModel;
const players = Object.keys(playersModel);
const player1Id = players[0] as AppPlayerId;
const testTournamentId = playersModel[player1Id].tournamentId;

store.dispatch.game.joinPlayer({
  receivedTournamentId: testTournamentId,
  playerName: 'Dvorak',
});
store.dispatch.game.joinPlayer({
  receivedTournamentId: testTournamentId,
  playerName: 'Qwerty',
});
store.dispatch.game.joinPlayer({
  receivedTournamentId: testTournamentId,
  playerName: 'Colemak',
});
store.dispatch.game.joinPlayer({
  receivedTournamentId: testTournamentId,
  playerName: 'HiddenTypo',
});

store.dispatch.game.startRace({
  tournamentId: testTournamentId,
  playerId: player1Id,
  raceText: M_RACE_TEXT0,
});

export const testRaceId: AppRaceId = `${testTournamentId}-R:000`;

game = store.getState().game;
const playerIds = game.tournamentsModel[testTournamentId].playerIds;

const testLeaderboard: AppLeaderboard = [
  {
    playerId: playerIds[0],
    status: AppPlayerStatus.Complete,
    values: {
      wpm: 60.24,
      elapsedTime: 11.067,
    },
  },
  {
    playerId: playerIds[1],
    status: AppPlayerStatus.Complete,
    values: {
      wpm: 55.6,
      elapsedTime: 14.365,
    },
  },
  {
    playerId: playerIds[2],
    status: AppPlayerStatus.Complete,
    values: {
      wpm: 50.89,
      elapsedTime: 18.499,
    },
  },
  {
    playerId: playerIds[3],
    status: AppPlayerStatus.Timeout,
    values: {
      distance: 243,
    },
  },
  {
    playerId: playerIds[4],
    status: AppPlayerStatus.Timeout,
    values: {
      distance: 120,
    },
  },
];

store.dispatch.game.addLeaderboardReducer({
  leaderboardId: testRaceId,
  leaderboard: testLeaderboard,
});
