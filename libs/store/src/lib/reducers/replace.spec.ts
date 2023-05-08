import {
  AppPlayerState,
  AppSnapshot,
  AppStateModel,
  AppTournamentState,
} from '@razor/models';

import { initializeStore } from '../store';

const initialState: AppStateModel = {
  tournamentsModel: {},
  playersModel: {},
  racesModel: {},
  leaderboardsModel: {},
  playerLogsModel: {},
  errorLogsModel: {},
};

describe('[Reducers] Replace operations', () => {
  it('(snapshot) => Replace full game state', () => {
    const initialValues: AppStateModel = {
      ...initialState,
      tournamentsModel: {
        'T:testTOUR': {
          playerIds: ['P:testPLAY'],
          raceIds: [],
          state: AppTournamentState.Lobby,
        },
      },
      playersModel: {
        'P:testPLAY': {
          name: 'Player',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
          state: AppPlayerState.Idle,
          tournamentId: 'T:testTOUR',
        },
      },
      racesModel: {},
      leaderboardsModel: {},
      playerLogsModel: {},
      errorLogsModel: {},
    };

    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();
    const snapshot: AppSnapshot = {
      tournamentsModel: {
        'T:testTOR2': {
          playerIds: ['P:testPLY2'],
          raceIds: [],
          state: AppTournamentState.Lobby,
        },
      },
      playersModel: {
        'P:testPLY2': {
          name: 'Player2',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
          state: AppPlayerState.Idle,
          tournamentId: 'T:testTOR2',
        },
      },
      racesModel: {},
      leaderboardsModel: {},
      playerLogsModel: {},
    };

    store.dispatch.game.replaceFullStateReducer({ parentState: snapshot });

    const expectedResult = {
      ...snapshot,
      errorLogsModel: {
        ...initialValues.errorLogsModel,
      },
    };

    const gameState = store.getState();
    expect(gameState).toEqual({
      ...initialStoreState,
      game: expectedResult,
    });
  });
});
