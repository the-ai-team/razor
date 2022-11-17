import { AppStateModel, AppTournamentState } from '@razor/models';
import { initializeStore } from '../store';

const initialState: AppStateModel = {
  tournamentsModel: {},
  playersModel: {},
  racesModel: {},
  leaderboardsModel: {},
  playerLogsModel: {},
  errorLogsModel: {},
};

describe('[Reducers] Update operations', () => {
  // ====== Update Tournament ====== //
  it('Update tournament', () => {
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

    // updateTournamnetReducer is only changing the state of the tournament.
    //
    // adding plyaer ids or race ids to the tournament,
    // is done in the addPlayer and addRace reducers respectively.
    //
    // when the race start effect calls,
    // it will recall both updateTournament and addRace reducers separately.
    store.dispatch.game.updateTournamentReducer({
      tournamentId: 'T:testTOUR',
      tournament: {
        state: AppTournamentState.Race,
        playerIds: ['P:testPLAY'],
        raceIds: [],
      },
    });

    const expectedResult = {
      ...initialValues,
      tournamentsModel: {
        ...initialValues.tournamentsModel,
        'T:testTOUR': {
          state: AppTournamentState.Race,
          playerIds: ['P:testPLAY'],
          raceIds: [],
        },
      },
    };

    const gameState = store.getState();
    expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
  });

  // ====== Update Race ====== //
  it('Update race', () => {
    const initialValues: AppStateModel = {
      ...initialState,
      racesModel: {
        ...initialState.racesModel,
        'T:testTOUR-R:001': {
          text: 'Fugiat mollit culpa commodo quis cupidatat mollit. Lorem ea eiusmod laborum veniam deserunt ex nostrud aliquip quis in nulla. Adipisicing consequat voluptate.',
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

    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    store.dispatch.game.updateRaceReducer({
      raceId: 'T:testTOUR-R:001',
      race: {
        text: 'Fugiat mollit culpa commodo quis cupidatat mollit. Lorem ea eiusmod laborum veniam deserunt ex nostrud aliquip quis in nulla. Adipisicing consequat voluptate.',
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
        isOnGoing: false,
        raceStartedBy: 'P:testPLAY',
      },
    });

    const expectedResult = {
      ...initialValues,
      racesModel: {
        ...initialValues.racesModel,
        'T:testTOUR-R:001': {
          ...initialValues.racesModel['T:testTOUR-R:001'],
          isOnGoing: false,
        },
      },
    };

    const gameState = store.getState();
    expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
  });

  // ====== Update PlayerLog ====== //
  it('Update first playerLog', () => {
    const initialValues: AppStateModel = {
      ...initialState,
      playerLogsModel: {
        ...initialState.playerLogsModel,
      },
    };

    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    store.dispatch.game.updatePlayerLogReducer({
      playerLogId: 'T:testTOUR-R:001-P:testPLAY',
      playerLog: {
        timestamp: 1234567000,
        textLength: 0,
      },
    });

    const expectedResult = {
      ...initialValues,
      playerLogsModel: {
        ...initialValues.playerLogsModel,
        'T:testTOUR-R:001-P:testPLAY': [
          {
            timestamp: 1234567000,
            textLength: 0,
          },
        ],
      },
    };

    const gameState = store.getState();
    expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
  });
  it('Update playerLog', () => {
    const initialValues: AppStateModel = {
      ...initialState,
      playerLogsModel: {
        ...initialState.playerLogsModel,
        'T:testTOUR-R:001-P:testPLAY': [
          {
            timestamp: 1234567000,
            textLength: 0,
          },
          {
            timestamp: 1234567002,
            textLength: 8,
          },
          {
            timestamp: 1234567005,
            textLength: 14,
          },
          {
            timestamp: 1234567008,
            textLength: 20,
          },
        ],
      },
    };

    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    store.dispatch.game.updatePlayerLogReducer({
      playerLogId: 'T:testTOUR-R:001-P:testPLAY',
      playerLog: {
        timestamp: 1234567010,
        textLength: 26,
      },
    });

    const expectedResult = {
      ...initialValues,
      playerLogsModel: {
        ...initialValues.playerLogsModel,
        'T:testTOUR-R:001-P:testPLAY': [
          ...initialValues.playerLogsModel['T:testTOUR-R:001-P:testPLAY'],
          {
            timestamp: 1234567010,
            textLength: 26,
          },
        ],
      },
    };

    const gameState = store.getState();
    expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
  });
});
