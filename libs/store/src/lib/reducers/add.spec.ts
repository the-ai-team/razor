import {
  AppPlayerState,
  AppPlayerStatus,
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

describe('[Reducers] Add operations', () => {
  describe('Add tournament', () => {
    it('(id) => Add new tournament to tournaments model', () => {
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
    it('(existing id) => Return same state', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          'T:testTOUR': {
            playerIds: ['P:testPLAY'],
            raceIds: ['T:testTOUR-R:000'],
            state: AppTournamentState.Lobby,
          },
        },
      };
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.addTournamentReducer({
        tournamentId: 'T:testTOUR',
        tournament: {
          playerIds: ['P:testPLAY', 'P:testPLAY2'],
          raceIds: ['T:testTOUR-R:001', 'T:testTOUR-R:002'],
          state: AppTournamentState.Lobby,
        },
      });
      const gameState = store.getState();

      expect(gameState).toEqual({ ...initialStoreState, game: initialValues });
    });
  });

  describe('Add race', () => {
    it('(id) => Add new race to races model', () => {
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
    it('(not existing related tournament) => Return same state', () => {
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
        raceId: 'T:testTOR2-R:000',
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

      const gameState = store.getState();
      expect(gameState).toEqual({ ...initialStoreState, game: initialValues });
    });
    it('(existing id) => Return same state', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          'T:testTOUR': {
            playerIds: ['P:testPLAY', 'P:testPLY2'],
            raceIds: ['T:testTOUR-R:000'],
            state: AppTournamentState.Lobby,
          },
        },
        racesModel: {
          'T:testTOUR-R:000': {
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

      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.addRaceReducer({
        raceId: 'T:testTOUR-R:000',
        race: {
          text: 'Voluptate occaecat laborum nisi nostrud. Esse pariatur cillum esse Lorem adipisicing ullamco anim sit tempor duis sunt.',
          timeoutDuration: 200,
          startedTimestamp: 1234567800,
          players: {
            'P:testPLY3': {
              name: 'Player1',
              avatarLink:
                'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
            },
            'P:testPLY4': {
              name: 'Player2',
              avatarLink:
                'https://avatars.dicebear.com/api/open-peeps/506c6179657232.svg',
            },
          },
          isOnGoing: true,
          raceStartedBy: 'P:testPLY3',
        },
      });

      const gameState = store.getState();
      expect(gameState).toEqual({ ...initialStoreState, game: initialValues });
    });
  });

  describe('Add Player', () => {
    it('(id) => Add new player, add player id to tournament', () => {
      const initialValues: AppStateModel = {
        ...initialState,
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

      store.dispatch.game.addPlayerReducer({
        tournamentId: 'T:testTOUR',
        playerId: 'P:testPLY3',
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
              'P:testPLY3',
            ],
          },
        },
        playersModel: {
          ...initialValues.playersModel,
          'P:testPLY3': {
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
    it('(not existing related tournament) => Return same state', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          'T:testTOUR': {
            playerIds: [],
            raceIds: [],
            state: AppTournamentState.Empty,
          },
        },
      };
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.addPlayerReducer({
        tournamentId: 'T:testTOR2',
        playerId: 'P:testPLAY',
        player: {
          name: 'NewPlayer',
          avatarLink:
            'https://avatars.dicebear.com/api/open-peeps/4e6577506c61796572.svg',
          state: AppPlayerState.Idle,
          tournamentId: 'T:testTOUR',
        },
      });

      const gameState = store.getState();
      expect(gameState).toEqual({ ...initialStoreState, game: initialValues });
    });
    it('(existing id) => Return same state', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          'T:testTOUR': {
            playerIds: [],
            raceIds: [],
            state: AppTournamentState.Empty,
          },
        },
        playersModel: {
          'P:testPLAY': {
            name: 'NewPlayer',
            avatarLink:
              'https://avatars.dicebear.com/api/open-peeps/4e6577506c61796572.svg',
            state: AppPlayerState.Idle,
            tournamentId: 'T:testTOUR',
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

      const gameState = store.getState();
      expect(gameState).toEqual({ ...initialStoreState, game: initialValues });
    });
    it('(all valid, empty tournament) => Add new player, add player id to empty tournament', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          ...initialState.tournamentsModel,
          'T:testTOUR': {
            playerIds: [],
            raceIds: [],
            state: AppTournamentState.Empty,
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
            playerIds: ['P:testPLAY'],
            // Tournament state is not changing here, because changing state is handled by the effect.
            state: AppTournamentState.Empty,
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
  });

  describe('Add Leaderboard', () => {
    it('(id) => Add leaderboard', () => {
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
              elapsedTime: 68,
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
                elapsedTime: 68,
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
    it('(existing id) => Return same state', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        leaderboardsModel: {
          ['T:testTOUR-R:000']: [
            {
              playerId: 'P:testPLAY',
              status: AppPlayerStatus.Complete,
              values: {
                wpm: 60,
                elapsedTime: 68,
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
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.addLeaderboardReducer({
        leaderboardId: 'T:testTOUR-R:000',
        leaderboard: [
          {
            playerId: 'P:testPLAY',
            status: AppPlayerStatus.Complete,
            values: {
              wpm: 60,
              elapsedTime: 68,
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

      const gameState = store.getState();
      expect(gameState).toEqual({ ...initialStoreState, game: initialValues });
    });
  });
});
