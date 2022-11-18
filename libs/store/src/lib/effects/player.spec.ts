import {
  AppIdNumberType,
  AppPlayerLogId,
  AppPlayerState,
  AppRaceId,
  AppStateModel,
  AppTournamentState,
} from '@razor/models';
import {
  tournamentNotFound,
  invalidPlayerNameLength,
  invalidPlayerName,
  playerNotFound,
  raceNotFound,
} from '../loggers';
import { initializeStore } from '../store';

const mockTournamentId1 = 'T:testTOUR';
const mockPlayerId1 = 'P:testPLAY';
const mockPlayerId2 = 'P:testPLY2';
const mockGenralId1 = 'testUID1';
const mockAvatarLink1 = 'https://test.com/avatar.png';
const mockAvatarLink2 = 'https://test.com/avatar2.png';
const mockPlayerName1 = 'Player1';
const mockPlayerName2 = 'Player2';
const mockRaceId1: AppRaceId = 'T:testTOUR-R:001';
const mockPlayerLogId1: AppPlayerLogId = 'T:testTOUR-R:001-P:testPLAY';

const initialState: AppStateModel = {
  tournamentsModel: {},
  playersModel: {},
  racesModel: {},
  leaderboardsModel: {},
  playerLogsModel: {},
  errorLogsModel: {},
};

jest.mock('@razor/util', () => ({
  ...jest.requireActual('@razor/util'),
  generateUid: jest.fn().mockImplementation((type: AppIdNumberType) => {
    switch (type) {
      case AppIdNumberType.Tournament:
        return mockTournamentId1;
      case AppIdNumberType.Player:
        return mockPlayerId1;
      case AppIdNumberType.General:
        return mockGenralId1;
    }
  }),
  generateAvatarLink: jest.fn(() => mockAvatarLink1),
}));
jest.mock('../loggers', () => ({
  ...jest.requireActual('../loggers'),
  tournamentNotFound: jest.fn(),
  invalidPlayerNameLength: jest.fn(),
  invalidPlayerName: jest.fn(),
  playerNotFound: jest.fn(),
  raceNotFound: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('[Effects] Player', () => {
  describe('Player Join', () => {
    it('(without tournament ID) => Add player to playersModel, create tournament, add player to that tournament.', async () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      await store.dispatch.game.joinPlayer({
        tid: '',
        playerName: 'Player1',
      });
      const gameState = store.getState();

      const expectedResult = {
        ...initialValues,
        tournamentsModel: {
          [mockTournamentId1]: {
            playerIds: [mockPlayerId1],
            raceIds: [],
            state: AppTournamentState.Lobby,
          },
        },
        playersModel: {
          [mockPlayerId1]: {
            avatarLink: mockAvatarLink1,
            name: mockPlayerName1,
            state: AppPlayerState.Idle,
            tournamentId: mockTournamentId1,
          },
        },
      };
      expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
    });

    it('(with valid tournament id) => Add player to playersModel and existing tournamentsModel', async () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [mockTournamentId1]: {
            playerIds: [mockPlayerId2],
            raceIds: [],
            state: AppTournamentState.Lobby,
          },
        },
        playersModel: {
          [mockPlayerId2]: {
            avatarLink: mockAvatarLink2,
            name: mockPlayerName2,
            state: AppPlayerState.Idle,
            tournamentId: mockTournamentId1,
          },
        },
      };
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      await store.dispatch.game.joinPlayer({
        tid: mockTournamentId1,
        playerName: mockPlayerName1,
      });
      const gameState = store.getState();

      const expectedResult: AppStateModel = {
        ...initialValues,
        tournamentsModel: {
          [mockTournamentId1]: {
            playerIds: [mockPlayerId2, mockPlayerId1],
            raceIds: [],
            state: AppTournamentState.Lobby,
          },
        },
        playersModel: {
          ...initialValues.playersModel,
          [mockPlayerId1]: {
            avatarLink: mockAvatarLink1,
            name: mockPlayerName1,
            state: AppPlayerState.Idle,
            tournamentId: mockTournamentId1,
          },
        },
      };
      expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
    });

    it('(with invalid tournament id) => Raise error', async () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);

      await store.dispatch.game.joinPlayer({
        tid: 'thisIdDoesNotExist',
        playerName: 'Player1',
      });
      expect(tournamentNotFound).toHaveBeenCalled();
    });

    it('(with invalid player id length) => Raise error', async () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);

      await store.dispatch.game.joinPlayer({
        tid: '',
        playerName: 'thisPlayerNameIsTooLong',
      });
      expect(invalidPlayerNameLength).toHaveBeenCalled();
    });

    it('(with invalid player id) => Raise error', async () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);

      await store.dispatch.game.joinPlayer({
        tid: '',
        playerName: 'th1sN@m3IsN0tV@lid',
      });
      expect(invalidPlayerName).toHaveBeenCalled();
    });
  });
  describe('Player Leave', () => {
    it('(valid id) => Clear Player', async () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [mockTournamentId1]: {
            playerIds: [mockPlayerId1, mockPlayerId2],
            raceIds: [],
            state: AppTournamentState.Lobby,
          },
        },
        playersModel: {
          [mockPlayerId1]: {
            avatarLink: mockAvatarLink1,
            name: mockPlayerName1,
            state: AppPlayerState.Idle,
            tournamentId: mockTournamentId1,
          },
          [mockPlayerId2]: {
            avatarLink: mockAvatarLink2,
            name: mockPlayerName2,
            state: AppPlayerState.Idle,
            tournamentId: mockTournamentId1,
          },
        },
      };
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      await store.dispatch.game.clearPlayer({
        playerId: mockPlayerId1,
      });
      const gameState = store.getState();

      const expectedResult: AppStateModel = {
        ...initialValues,
        tournamentsModel: {
          [mockTournamentId1]: {
            playerIds: [mockPlayerId2],
            raceIds: [],
            state: AppTournamentState.Lobby,
          },
        },
        playersModel: {
          [mockPlayerId2]: {
            avatarLink: mockAvatarLink2,
            name: mockPlayerName2,
            state: AppPlayerState.Idle,
            tournamentId: mockTournamentId1,
          },
        },
      };
      expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
    });

    it('(invalid id) => Raise error', async () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [mockTournamentId1]: {
            playerIds: [mockPlayerId1],
            raceIds: [],
            state: AppTournamentState.Lobby,
          },
        },
        playersModel: {
          [mockPlayerId1]: {
            avatarLink: mockAvatarLink1,
            name: mockPlayerName1,
            state: AppPlayerState.Idle,
            tournamentId: mockTournamentId1,
          },
        },
      };
      const store = initializeStore(initialValues);

      await store.dispatch.game.clearPlayer({
        playerId: 'P:thisIdDoesNotExist',
      });
      expect(playerNotFound).toHaveBeenCalled();
    });
  });
});

describe('[Effects] Player Log', () => {
  describe('Send Type Log', () => {
    it('(valid race id and player id) => Send Type Log', async () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [mockTournamentId1]: {
            playerIds: [mockPlayerId1, mockPlayerId2],
            raceIds: [mockRaceId1],
            state: AppTournamentState.Lobby,
          },
        },
        racesModel: {
          [mockRaceId1]: {
            text: 'Mollit ea ea nisi occaecat ex. Esse pariatur excepteur irure eu aute magna amet non aliquip minim veniam sit. Cupidatat ex quis occaecat quis voluptate in aute.',
            timeoutDuration: 120,
            startedTimestamp: 123456789,
            players: {
              [mockPlayerId1]: {
                avatarLink: mockAvatarLink1,
                name: mockPlayerName1,
              },
              [mockPlayerId2]: {
                avatarLink: mockAvatarLink2,
                name: mockPlayerName2,
              },
            },
            isOnGoing: true,
            raceStartedBy: mockPlayerId1,
          },
        },
        playersModel: {
          [mockPlayerId1]: {
            avatarLink: mockAvatarLink1,
            name: mockPlayerName1,
            state: AppPlayerState.Racing,
            tournamentId: mockTournamentId1,
          },
          [mockPlayerId2]: {
            avatarLink: mockAvatarLink2,
            name: mockPlayerName2,
            state: AppPlayerState.Racing,
            tournamentId: mockTournamentId1,
          },
        },
      };
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      await store.dispatch.game.sendTypeLog({
        playerId: mockPlayerId1,
        raceId: mockRaceId1,
        playerLog: {
          textLength: 0,
          timestamp: 123456000,
        },
      });

      const expectedResult: AppStateModel = {
        ...initialValues,
        playerLogsModel: {
          [mockPlayerLogId1]: [
            {
              textLength: 0,
              timestamp: 123456000,
            },
          ],
        },
      };

      const gameState = store.getState();
      expect(gameState).toEqual({ ...initialStoreState, game: expectedResult });
    });
    it('(player not exist) => Raise error', async () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [mockTournamentId1]: {
            playerIds: [mockPlayerId1, mockPlayerId2],
            raceIds: [mockRaceId1],
            state: AppTournamentState.Race,
          },
        },
        playersModel: {
          [mockPlayerId1]: {
            avatarLink: mockAvatarLink1,
            name: mockPlayerName1,
            state: AppPlayerState.Racing,
            tournamentId: mockTournamentId1,
          },
          [mockPlayerId2]: {
            avatarLink: mockAvatarLink2,
            name: mockPlayerName2,
            state: AppPlayerState.Racing,
            tournamentId: mockTournamentId1,
          },
        },
        racesModel: {
          [mockRaceId1]: {
            text: 'Mollit ea ea nisi occaecat ex. Esse pariatur excepteur irure eu aute magna amet non aliquip minim veniam sit. Cupidatat ex quis occaecat quis voluptate in aute.',
            timeoutDuration: 120,
            startedTimestamp: 123456789,
            players: {
              [mockPlayerId1]: {
                avatarLink: mockAvatarLink1,
                name: mockPlayerName1,
              },
              [mockPlayerId2]: {
                avatarLink: mockAvatarLink2,
                name: mockPlayerName2,
              },
            },
            isOnGoing: true,
            raceStartedBy: mockPlayerId1,
          },
        },
      };
      const store = initializeStore(initialValues);

      await store.dispatch.game.sendTypeLog({
        raceId: mockRaceId1,
        playerId: 'P:thisIdDoesNotExist',
        playerLog: {
          textLength: 0,
          timestamp: 123456000,
        },
      });

      expect(playerNotFound).toHaveBeenCalled();
    });
    it('(race not exists) => Raise error', async () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [mockTournamentId1]: {
            playerIds: [mockPlayerId1, mockPlayerId2],
            raceIds: [mockRaceId1],
            state: AppTournamentState.Race,
          },
        },
        playersModel: {
          [mockPlayerId1]: {
            avatarLink: mockAvatarLink1,
            name: mockPlayerName1,
            state: AppPlayerState.Racing,
            tournamentId: mockTournamentId1,
          },
          [mockPlayerId2]: {
            avatarLink: mockAvatarLink2,
            name: mockPlayerName2,
            state: AppPlayerState.Racing,
            tournamentId: mockTournamentId1,
          },
        },
        racesModel: {
          [mockRaceId1]: {
            text: 'Mollit ea ea nisi occaecat ex. Esse pariatur excepteur irure eu aute magna amet non aliquip minim veniam sit. Cupidatat ex quis occaecat quis voluptate in aute.',
            timeoutDuration: 120,
            startedTimestamp: 123456789,
            players: {
              [mockPlayerId1]: {
                avatarLink: mockAvatarLink1,
                name: mockPlayerName1,
              },
              [mockPlayerId2]: {
                avatarLink: mockAvatarLink2,
                name: mockPlayerName2,
              },
            },
            isOnGoing: true,
            raceStartedBy: mockPlayerId1,
          },
        },
      };
      const store = initializeStore(initialValues);

      await store.dispatch.game.sendTypeLog({
        raceId: 'T:testTOUR-R:notExist',
        playerId: mockPlayerId1,
        playerLog: {
          textLength: 0,
          timestamp: 123456000,
        },
      });
      console.log(
        store.getState().game.playerLogsModel['T:testTOUR-R:001-P:testPLAY'],
      );
      expect(raceNotFound).toHaveBeenCalled();
    });
  });
});

//TODO: add descriptive names, give them all same format
//TODO: seprate mock objects from test files
// TODO: rmeove unwanted models in initial values. initial state cannot change if its on test
