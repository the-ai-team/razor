import {
  AppIdNumberType,
  AppPlayerState,
  AppStateModel,
  AppTournamentState,
} from '@razor/models';
import {
  tournamentNotFound,
  invalidPlayerNameLength,
  invalidPlayerName,
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
});
//TODO: add descriptive names
