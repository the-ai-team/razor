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
  // ====== Add Tournament ====== //
  describe('Add tournament', () => {
    it('(with id) => Add new tournament', () => {
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
    it('(existing tournament) => Return same state', () => {
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
    it('(without id) => Return same state', () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.addTournamentReducer({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tournamentId: '' as string,
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

  // ====== Add Race ====== //
  describe('Add race', () => {
    it('(with id) => Add new race', () => {
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
    it('(not existing tournament) => Return same state', () => {
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
    it('(existing race) => Return same state', () => {
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
    it('(race id not provided) => Return same state', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        raceId: '',
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

  // ====== Add Player ====== //
  describe('Add Player', () => {
    it('(with id) => Add new player, add player id to tournament', () => {
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
    it('(player id not provided) => Return same state', () => {
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        playerId: '',
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
    it('(tournament id not provided) => Return same state', () => {
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        tournamentId: '',
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
    it('(tournament does not exists) => Return same state', () => {
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
    it('(player already exists) => Return same state', () => {
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
    it('(with valid id of empty tournament) => Add new player, add player id to empty tournament', () => {
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
  });

  // ====== Add Leaderboard ====== //
  describe('Add Leaderboard', () => {
    it('(with id)', () => {
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
    it('(without id) => Return same state', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        leaderboardsModel: {
          ['T:testTOUR-R:000']: [
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
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.addLeaderboardReducer({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        leaderboardId: '',
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

      const gameState = store.getState();
      expect(gameState).toEqual({ ...initialStoreState, game: initialValues });
    });
    it('id already exists => Return same state', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        leaderboardsModel: {
          ['T:testTOUR-R:000']: [
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

      const gameState = store.getState();
      expect(gameState).toEqual({ ...initialStoreState, game: initialValues });
    });
  });
});

//TODO: Add tests for check already exisitng data return the same state
//TODO: init mock values as constants.
//TODO: remove unwanted spread operators
//TODO: write validity checkers for ids
