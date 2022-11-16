import {
  AppPlayerState,
  AppStateModel,
  AppTournamentState,
} from '@razor/models';
import { initializeStore } from '../store';

export const initialState: AppStateModel = {
  tournamentsModel: {},
  playersModel: {},
  racesModel: {},
  leaderboardsModel: {},
  playerLogsModel: {},
  errorLogsModel: {},
};

describe('[Reducers] Remove operations', () => {
  // ====== Remove Player ====== //
  it('Remove player', () => {
    const initialValues: AppStateModel = {
      ...initialState,
      playersModel: {
        ...initialState.playersModel,
        'P:testPLAY': {
          name: 'Player1',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
          state: AppPlayerState.Idle,
          tournamentId: 'T:testTOUR',
        },
        'P:testPLY2': {
          name: 'Player2',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/506c6179657232.svg',
          state: AppPlayerState.Idle,
          tournamentId: 'T:testTOUR',
        },
      },
      tournamentsModel: {
        ...initialState.tournamentsModel,
        'T:testTOUR': {
          playerIds: ['P:testPLAY', 'P:testPLY2'],
          raceIds: [],
          state: AppTournamentState.Lobby,
        },
      },
    };

    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    store.dispatch.game.removePlayerReducer({
      tournamentId: 'T:testTOUR',
      playerId: 'P:testPLY2',
    });

    const expectedResult = {
      ...initialValues,
      playersModel: {
        'P:testPLAY': {
          name: 'Player1',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
          state: AppPlayerState.Idle,
          tournamentId: 'T:testTOUR',
        },
      },
      tournamentsModel: {
        ...initialValues.tournamentsModel,
        'T:testTOUR': {
          ...initialValues.tournamentsModel['T:testTOUR'],
          playerIds: ['P:testPLAY'],
        },
      },
    };

    const gameState = store.getState();
    expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
  });

  // ===== Remove Tournament ===== //
  it('Remove tournament', () => {
    const initialValues: AppStateModel = {
      ...initialState,
      tournamentsModel: {
        ...initialState.tournamentsModel,
        'T:testTOUR': {
          state: AppTournamentState.Lobby,
          playerIds: ['P:testPLAY'],
          raceIds: [],
        },
      },
    };

    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    store.dispatch.game.removeTournamentReducer({
      tournamentId: 'T:testTOUR',
    });

    const expectedResult = initialState;

    const gameState = store.getState();
    expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
  });
  //
});
