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

describe('[Reducers] Remove operations', () => {
  describe('Remove Player', () => {
    it('(id) => Remove player from players model', () => {
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
    it('(not exisiting player) => Return same state', () => {
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
        playerId: 'P:testPLY3',
      });

      const gameState = store.getState();
      expect(gameState).toEqual({ ...initialStoreState, game: initialValues });
    });
    it('(not exisiting tournament) => Return same state', () => {
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
        tournamentId: 'T:testTOUR2',
        playerId: 'P:testPLY2',
      });

      const gameState = store.getState();
      expect(gameState).toEqual({ ...initialStoreState, game: initialValues });
    });
  });

  describe('Remove Tournament', () => {
    it('(id) => Remove tournament from tournaments model', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          'T:testTOUR': {
            state: AppTournamentState.Lobby,
            playerIds: ['P:testPLAY', 'P:testPLY2'],
            raceIds: ['T:testTOUR-R:000', 'T:testTOUR-R:001'],
          },
          'T:testTOR2': {
            state: AppTournamentState.Lobby,
            playerIds: ['P:testPLY3'],
            raceIds: ['T:testTOR2-R:000'],
          },
        },
        racesModel: {
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
            isOnGoing: false,
            raceStartedBy: 'P:testPLAY',
          },
          'T:testTOUR-R:001': {
            text: 'Fugiat mollit culpa commodo quis cupidatat mollit. Lorem ea eiusmod laborum veniam deserunt ex nostrud aliquip quis in nulla. Adipisicing consequat voluptate.',
            timeoutDuration: 260,
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
          'T:testTOR2-R:000': {
            text: 'Fugiat mollit culpa commodo quis cupidatat mollit. Lorem ea eiusmod laborum veniam deserunt ex nostrud aliquip quis in nulla. Adipisicing consequat voluptate.',
            timeoutDuration: 200,
            startedTimestamp: 1234567890,
            players: {
              'P:testPLY3': {
                name: 'Player1',
                avatarLink:
                  'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
              },
              'P:testPLY': {
                name: 'Player2',
                avatarLink:
                  'https://avatars.dicebear.com/api/open-peeps/506c6179657232.svg',
              },
            },
            isOnGoing: false,
            raceStartedBy: 'P:testPLAY',
          },
        },
        playersModel: {
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
          'P:testPLY3': {
            name: 'Player3',
            avatarLink:
              'https://avatars.dicebear.com/api/open-peeps/506c6179657233.svg',
            state: AppPlayerState.Idle,
            tournamentId: 'T:testTOR2',
          },
        },
      };

      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.removeTournamentReducer({
        tournamentId: 'T:testTOUR',
      });

      const expectedResult = {
        ...initialValues,
        tournamentsModel: {
          'T:testTOR2': {
            state: AppTournamentState.Lobby,
            playerIds: ['P:testPLY3'],
            raceIds: ['T:testTOR2-R:000'],
          },
        },
        playersModel: {
          'P:testPLY3': {
            name: 'Player3',
            avatarLink:
              'https://avatars.dicebear.com/api/open-peeps/506c6179657233.svg',
            state: AppPlayerState.Idle,
            tournamentId: 'T:testTOR2',
          },
        },
        racesModel: {
          'T:testTOR2-R:000': {
            text: 'Fugiat mollit culpa commodo quis cupidatat mollit. Lorem ea eiusmod laborum veniam deserunt ex nostrud aliquip quis in nulla. Adipisicing consequat voluptate.',
            timeoutDuration: 200,
            startedTimestamp: 1234567890,
            players: {
              'P:testPLY3': {
                name: 'Player1',
                avatarLink:
                  'https://avatars.dicebear.com/api/open-peeps/506c6179657231.svg',
              },
              'P:testPLY': {
                name: 'Player2',
                avatarLink:
                  'https://avatars.dicebear.com/api/open-peeps/506c6179657232.svg',
              },
            },
            isOnGoing: false,
            raceStartedBy: 'P:testPLAY',
          },
        },
      };

      const gameState = store.getState();
      expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
    });
    it('(not existing tournament) => return same state', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          'T:testTOUR': {
            state: AppTournamentState.Lobby,
            playerIds: ['P:testPLAY', 'P:testPLY2'],
            raceIds: [],
          },
        },
        playersModel: {
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
      };

      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.removeTournamentReducer({
        tournamentId: 'T:testTOR2',
      });

      const gameState = store.getState();
      expect(gameState).toEqual({ ...initialStoreState, game: initialValues });
    });
  });
});
