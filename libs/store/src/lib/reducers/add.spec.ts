import {
  AppPlayerState,
  AppPlayerStatus,
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

describe('[Reducers] Add operations', () => {
  // ====== Add Tournament ====== //
  it('Add new tournament', () => {
    const initialValues = initialState;
    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    store.dispatch.game.addTournamentReducer({
      tournamentId: 'T:testTOUR',
      tournament: {
        playerIds: ['P:testPLAY'],
        raceIds: [],
        state: AppTournamentState.Lobby,
      },
    });

    const expectedResult = {
      ...initialValues,
      tournamentsModel: {
        ...initialValues.tournamentsModel,
        'T:testTOUR': {
          playerIds: ['P:testPLAY'],
          raceIds: [],
          state: AppTournamentState.Lobby,
        },
      },
    };

    const gameState = store.getState();
    expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
  });

  // ====== Add Race ====== //
  it('Add new race', () => {
    const initialValues: AppStateModel = {
      ...initialState,
      tournamentsModel: {
        ...initialState.tournamentsModel,
        'T:testTOUR': {
          playerIds: ['P:testPLAY', 'P:testPLY2'],
          raceIds: ['T:testTOUR-R:000'],
          state: AppTournamentState.Lobby,
        },
      },
    };
    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    store.dispatch.game.addRaceReducer({
      raceId: 'T:testTOUR-R:001',
      race: {
        text: 'Esse pariatur cillum esse Lorem adipisicing ullamco anim sit tempor duis sunt. Voluptate occaecat laborum nisi nostrud.',
        timeoutDuration: 250,
        startedTimestamp: 1234567890,
        players: {
          'P:testPLAY': {
            name: 'Player1',
            avatarLink:
              'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
          },
          'P:testPLY2': {
            name: 'Player2',
            avatarLink:
              'https://avatars.dicebear.com/api/open-peeps/506c6179657232.svg',
          },
        },
        isOnGoing: true,
        raceStartedBy: 'P:testPLAY',
      },
    });

    const expectedResult = {
      ...initialValues,
      tournamentsModel: {
        ...initialValues.tournamentsModel,
        'T:testTOUR': {
          ...initialValues.tournamentsModel['T:testTOUR'],
          raceIds: [
            ...initialValues.tournamentsModel['T:testTOUR'].raceIds,
            'T:testTOUR-R:001',
          ],
        },
      },

      racesModel: {
        ...initialValues.racesModel,
        'T:testTOUR-R:001': {
          text: 'Esse pariatur cillum esse Lorem adipisicing ullamco anim sit tempor duis sunt. Voluptate occaecat laborum nisi nostrud.',
          timeoutDuration: 250,
          startedTimestamp: 1234567890,
          players: {
            'P:testPLAY': {
              name: 'Player1',
              avatarLink:
                'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
            },
            'P:testPLY2': {
              name: 'Player2',
              avatarLink:
                'https://avatars.dicebear.com/api/open-peeps/506c6179657232.svg',
            },
          },
          isOnGoing: true,
          raceStartedBy: 'P:testPLAY',
        },
      },
    };

    const gameState = store.getState();
    expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
  });

  // ====== Add Player ====== //
  it('Add new player', () => {
    const initialValues: AppStateModel = {
      ...initialState,
      tournamentsModel: {
        ...initialState.tournamentsModel,
        'T:testTOUR': {
          playerIds: [],
          raceIds: [],
          state: AppTournamentState.Lobby,
        },
      },
    };

    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    store.dispatch.game.addPlayerReducer({
      tournamentId: 'T:testTOUR',
      playerId: 'P:testPLAY',
      player: {
        name: 'NewPlayer',
        avatarLink:
          'https://avatars.dicebear.com/api/open-peeps/4e6577506c61796572.svg',
        state: AppPlayerState.Idle,
        tournamentId: 'T:testTOUR',
      },
    });

    const expectedResult = {
      ...initialValues,
      tournamentsModel: {
        ...initialValues.tournamentsModel,
        'T:testTOUR': {
          ...initialValues.tournamentsModel['T:testTOUR'],
          playerIds: [
            ...initialValues.tournamentsModel['T:testTOUR'].playerIds,
            'P:testPLAY',
          ],
        },
      },
      playersModel: {
        ...initialValues.playersModel,
        'P:testPLAY': {
          name: 'NewPlayer',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/4e6577506c61796572.svg',
          state: AppPlayerState.Idle,
          tournamentId: 'T:testTOUR',
        },
      },
    };

    const gameState = store.getState();
    expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
  });

  // ====== Add Leaderboard ====== //
  it('Add leaderboard', () => {
    const initialValues = initialState;
    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    store.dispatch.game.addLeaderboardReducer({
      leaderboardId: 'T:testTOUR-R:001',
      leaderboard: [
        {
          playerId: 'P:testPLAY',
          status: AppPlayerStatus.Complete,
          values: {
            wpm: 60,
            elpasedTime: 68,
          },
        },
        {
          playerId: 'P:testPLY2',
          status: AppPlayerStatus.Timeout,
          values: {
            distance: 55,
          },
        },
      ],
    });

    const expectedResult = {
      ...initialValues,
      leaderboardsModel: {
        ...initialValues.leaderboardsModel,
        'T:testTOUR-R:001': [
          {
            playerId: 'P:testPLAY',
            status: AppPlayerStatus.Complete,
            values: {
              wpm: 60,
              elpasedTime: 68,
            },
          },
          {
            playerId: 'P:testPLY2',
            status: AppPlayerStatus.Timeout,
            values: {
              distance: 55,
            },
          },
        ],
      },
    };

    const gameState = store.getState();
    expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
  });
});

//TODO: Add tests for check already exisitng data return the same state
