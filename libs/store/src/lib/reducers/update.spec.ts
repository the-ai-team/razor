import {
  AppPlayerState,
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

describe('[Reducers] Update operations', () => {
  describe('Update Player', () => {
    it('(id) => Update Player', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        playersModel: {
          ...initialState.playersModel,
          'P:testPLAY': {
            name: 'Player1',
            avatarLink:
              'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
            state: AppPlayerState.Idle,
            tournamentId: 'T:testTR00',
          },
        },
      };

      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.updatePlayerReducer({
        playerId: 'P:testPLAY',
        player: {
          name: 'PlayerNew',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
          state: AppPlayerState.Racing,
          tournamentId: 'T:testTR00',
        },
      });

      const expectedResult = {
        ...initialValues,
        playersModel: {
          ...initialValues.playersModel,
          'P:testPLAY': {
            name: 'PlayerNew',
            avatarLink:
              'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
            state: AppPlayerState.Racing,
            tournamentId: 'T:testTR00',
          },
        },
      };

      const storeState = store.getState();
      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });
    it('(not exisiting player) => return same state', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        playersModel: {
          ...initialState.playersModel,
          'P:testPLAY': {
            name: 'Player1',
            avatarLink:
              'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
            state: AppPlayerState.Idle,
            tournamentId: 'T:testTR00',
          },
        },
      };

      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.updatePlayerReducer({
        playerId: 'P:testPLAY2',
        player: {
          name: 'PlayerNew',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
          state: AppPlayerState.Racing,
          tournamentId: 'T:testTR00',
        },
      });

      const storeState = store.getState();
      expect(storeState).toEqual({
        ...initialStoreState,
        game: initialValues,
      });
    });
  });

  describe('Update Tournament', () => {
    it('(id) => Update tournament', () => {
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

      /** updateTournamnetReducer is only changing the state of the tournament.
       * Adding player ids or race ids to the tournament, is done in the addPlayer and addRace reducers respectively.
       * When the race start effect will be called, it will recall both updateTournament and addRace reducers separately.
       */
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

      const storeState = store.getState();
      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });
    it('(not existing tournament) => Return same state', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          ...initialState.tournamentsModel,
          'T:testTOUR': {
            state: AppTournamentState.Lobby,
            playerIds: ['P:testPLAY', 'P:testPLAY2'],
            raceIds: [],
          },
        },
      };

      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.updateTournamentReducer({
        tournamentId: 'T:testTOUR2',
        tournament: {
          state: AppTournamentState.Race,
          playerIds: ['P:testPLAY'],
          raceIds: [],
        },
      });

      const storeState = store.getState();
      expect(storeState).toEqual({
        ...initialStoreState,
        game: initialValues,
      });
    });
  });

  describe('Update Race', () => {
    it('(id) => Update race', () => {
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

      const storeState = store.getState();
      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });
    it('(not existing race) => Return same state', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        racesModel: {
          ...initialState.racesModel,
          'T:testTOUR-R:000': {
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
          players: {},
          isOnGoing: false,
          raceStartedBy: 'P:testPLAY',
        },
      });

      const storeState = store.getState();
      expect(storeState).toEqual({
        ...initialStoreState,
        game: initialValues,
      });
    });
  });

  describe('Update player logs', () => {
    it('(id, not existing player log) => Add first player log to player logs array in player logs model', () => {
      const initialValues: AppStateModel = initialState;

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

      const storeState = store.getState();
      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });
    it('(id) => Push new player log to existing player logs array in player logs model', () => {
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

      const storeState = store.getState();
      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });

    it('(id) => Push new player logs (The logs received as an array) to existing player logs array in player logs model', () => {
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
        playerLog: [
          {
            timestamp: 1234567010,
            textLength: 26,
          },
          {
            timestamp: 1234567012,
            textLength: 28,
          },
          {
            timestamp: 1234567014,
            textLength: 30,
          },
        ],
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
            {
              timestamp: 1234567012,
              textLength: 28,
            },
            {
              timestamp: 1234567014,
              textLength: 30,
            },
          ],
        },
      };

      const storeState = store.getState();
      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });
  });
});
