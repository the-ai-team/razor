import { M_RACE_TEXT0 } from '@razor/mocks';
import { AppPlayerId, AppRace, AppRaceId, AppStateModel } from '@razor/models';
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

  // Adding player to the race manually.
  // Store is not designed to add players after race started.
  // But for testing purpose, we are directly updating the race.
  const raceId: AppRaceId = `${testTournamentId}-R:000`;
  const race = game.racesModel[raceId];
  const updatedRace: AppRace = {
    ...race,
    players: {
      ...race.players,
      [playerId]: {
        name: `Player${count}`,
        avatarLink: '',
      },
    },
  };
  store.dispatch.game.updateRaceReducer({
    raceId: `${testTournamentId}-R:000`,
    race: updatedRace,
  });
};

export const clearLastPlayer = (): void => {
  game = store.getState().game;
  const playerIds = game.tournamentsModel[testTournamentId].playerIds;
  store.dispatch.game.clearPlayer({
    playerId: playerIds[playerIds.length - 1],
  });
  // Removing last player from the race manually.
  const raceId: AppRaceId = `${testTournamentId}-R:000`;
  const race = game.racesModel[raceId];
  const racePlayers = race.players;
  // Remove player with last index
  const lastPlayerId: AppPlayerId = Object.keys(racePlayers)[
    Object.keys(racePlayers).length - 1
  ] as AppPlayerId;
  const { [lastPlayerId]: _, ...updatedRacePlayers } = racePlayers;
  const updatedRace: AppRace = {
    ...race,
    players: updatedRacePlayers,
  };
  store.dispatch.game.updateRaceReducer({
    raceId: `${testTournamentId}-R:000`,
    race: updatedRace,
  });
};
