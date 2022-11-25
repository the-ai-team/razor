import {
  AppIdNumberType,
  AppPlayerState,
  AppStateModel,
  AppTournamentState,
} from '@razor/models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  mockPlayersModel,
  mockRace,
  mockTournament,
  M_GENERAL_ID0,
  M_PLAYER_AVATAR0,
  M_PLAYER_ID0,
  M_PLAYER_NAME0,
  M_TOURNAMENT0,
  M_TOURNAMENT_ID0,
  M_TR0_RACE_ID0,
} from '@razor/mocks';
import {
  invalidPlayerName,
  invalidPlayerNameLength,
  payloadNotProvided,
  playerNotFound,
  raceNotFound,
  tournamentNotFound,
} from '../raisers';
import { initializeStore } from '../store';

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
  generateUid: jest.fn((type: AppIdNumberType) => {
    switch (type) {
      case AppIdNumberType.Tournament:
        return M_TOURNAMENT_ID0;
      case AppIdNumberType.Player:
        return M_PLAYER_ID0;
      case AppIdNumberType.General:
        return M_GENERAL_ID0;
    }
  }),
  generateAvatarLink: jest.fn(() => M_PLAYER_AVATAR0),
}));

// TODO: remove if not needed
// when(generateUid)
//   .calledWith(AppIdNumberType.Tournament)
//   .mockImplementation(async () => M_TOURNAMENT_ID1);
// when(generateUid)
//   .calledWith(AppIdNumberType.Player)
//   .mockImplementation(async () => M_PLAYER_ID0);
// when(generateUid)
//   .calledWith(AppIdNumberType.General)
//   .mockImplementation(async () => M_GENERAL_ID0);
// (generateAvatarLink as jest.Mock).mockReturnValue(M_PLAYER_AVATAR0);

jest.mock('../raisers', () => ({
  ...jest.requireActual('../raisers'),
  tournamentNotFound: jest.fn(),
  invalidPlayerNameLength: jest.fn(),
  invalidPlayerName: jest.fn(),
  playerNotFound: jest.fn(),
  raceNotFound: jest.fn(),
  payloadNotProvided: jest.fn(),
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
        playerName: M_PLAYER_NAME0,
      });
      const storeState = store.getState();

      const expectedResult = {
        ...initialValues,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: mockTournament(M_TOURNAMENT_ID0, [0, 0], [0, 1]),
        },
        playersModel: mockPlayersModel([0, 1]),
      };
      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });

    it('(with valid tournament id) => Add player to playersModel and existing tournamentsModel', async () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: mockTournament(M_TOURNAMENT_ID0, [0, 1], [1, 2]),
        },
        playersModel: mockPlayersModel([1, 2], M_TOURNAMENT_ID0),
        racesModel: {
          [M_TR0_RACE_ID0]: mockRace([1, 3]),
        },
      };
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      await store.dispatch.game.joinPlayer({
        tid: M_TOURNAMENT_ID0,
        playerName: M_PLAYER_NAME0,
      });
      const storeState = store.getState();

      const expectedResult: AppStateModel = {
        ...initialValues,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: {
            ...initialValues.tournamentsModel[M_TOURNAMENT_ID0],
            playerIds: [
              ...initialValues.tournamentsModel[M_TOURNAMENT_ID0].playerIds,
              M_PLAYER_ID0,
            ],
            state: AppTournamentState.Ready,
          },
        },
        playersModel: mockPlayersModel([0, 2], M_TOURNAMENT_ID0),
      };
      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });

    it('(with invalid tournament id) => Raise error', async () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);

      await store.dispatch.game.joinPlayer({
        tid: 'thisIdDoesNotExist',
        playerName: M_PLAYER_NAME0,
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
        playerName: 'N@m3IsN0tV@lid',
      });
      expect(invalidPlayerName).toHaveBeenCalled();
    });

    it('(payload empty) => Raise error', async () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await store.dispatch.game.joinPlayer({} as any);
      expect(payloadNotProvided).toHaveBeenCalled();
    });
  });

  describe('Player Leave', () => {
    it('(valid id) => Clear player', async () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: M_TOURNAMENT0,
        },
        playersModel: mockPlayersModel([0, 3], M_TOURNAMENT_ID0),
        racesModel: {
          [M_TR0_RACE_ID0]: mockRace([0, 1]),
        },
      };
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      await store.dispatch.game.clearPlayer({
        playerId: M_PLAYER_ID0,
      });
      const storeState = store.getState();

      const expectedResult: AppStateModel = {
        ...initialValues,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: mockTournament(M_TOURNAMENT_ID0, [0, 1], [1, 3]),
        },
        playersModel: mockPlayersModel([1, 3], M_TOURNAMENT_ID0),
      };
      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });
    it('(valid id and 1 player remaining) => Clear player, Set tournament to empty', async () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: { ...M_TOURNAMENT0, playerIds: [M_PLAYER_ID0] },
        },
        playersModel: mockPlayersModel([0, 1], M_TOURNAMENT_ID0),
        racesModel: {
          [M_TR0_RACE_ID0]: mockRace([0, 1]),
        },
      };
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      await store.dispatch.game.clearPlayer({
        playerId: M_PLAYER_ID0,
      });
      const storeState = store.getState();

      const expectedResult: AppStateModel = {
        ...initialValues,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: {
            ...mockTournament(M_TOURNAMENT_ID0, [0, 1], [0, 0]),
            state: AppTournamentState.Empty,
          },
        },
        playersModel: {},
      };
      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });

    it('(invalid id) => Raise error', async () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: M_TOURNAMENT0,
        },
        playersModel: mockPlayersModel([0, 3], M_TOURNAMENT_ID0),
        racesModel: {
          [M_TR0_RACE_ID0]: mockRace([0, 3]),
        },
      };
      const store = initializeStore(initialValues);

      await store.dispatch.game.clearPlayer({
        playerId: 'P:thisIdDoesNotExist',
      });
      expect(playerNotFound).toHaveBeenCalled();
    });
    it('(payload empty) => Raise error', async () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await store.dispatch.game.clearPlayer({} as any);
      expect(payloadNotProvided).toHaveBeenCalled();
    });
  });
});

describe('[Effects] Player Log', () => {
  describe('Send Type Log', () => {
    it('(valid race id and player id) => Send Type Log', async () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: {
            ...M_TOURNAMENT0,
            state: AppTournamentState.Race,
          },
        },
        racesModel: {
          [M_TR0_RACE_ID0]: mockRace([0, 3], true),
        },
        playersModel: mockPlayersModel(
          [0, 3],
          M_TOURNAMENT_ID0,
          AppPlayerState.Racing,
        ),
      };
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      await store.dispatch.game.sendTypeLog({
        playerId: M_PLAYER_ID0,
        raceId: M_TR0_RACE_ID0,
        playerLog: {
          textLength: 0,
          timestamp: 123456000,
        },
      });
      const storeState = store.getState();

      const expectedResult: AppStateModel = {
        ...initialValues,
        playerLogsModel: {
          [`${M_TR0_RACE_ID0}-${M_PLAYER_ID0}`]: [
            {
              textLength: 0,
              timestamp: 123456000,
            },
          ],
        },
      };

      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });
    it('(player not exist) => Raise error', async () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: M_TOURNAMENT0,
        },
        playersModel: mockPlayersModel(
          [0, 3],
          M_TOURNAMENT_ID0,
          AppPlayerState.Racing,
        ),

        racesModel: {
          [M_TR0_RACE_ID0]: mockRace([0, 3], true),
        },
      };
      const store = initializeStore(initialValues);

      await store.dispatch.game.sendTypeLog({
        raceId: M_TR0_RACE_ID0,
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
          [M_TR0_RACE_ID0]: M_TOURNAMENT0,
        },
        playersModel: mockPlayersModel(
          [0, 3],
          M_TOURNAMENT_ID0,
          AppPlayerState.Racing,
        ),
        racesModel: {
          [M_TR0_RACE_ID0]: mockRace([0, 3], true),
        },
      };
      const store = initializeStore(initialValues);

      await store.dispatch.game.sendTypeLog({
        raceId: 'T:testTR00-R:notExist',
        playerId: M_PLAYER_ID0,
        playerLog: {
          textLength: 0,
          timestamp: 123456000,
        },
      });
      expect(raceNotFound).toHaveBeenCalled();
    });
    it('(raceId payload empty) => Raise error', async () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);
      await store.dispatch.game.sendTypeLog({
        playerId: M_PLAYER_ID0,
        playerLog: {
          textLength: 0,
          timestamp: 123456000,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      expect(payloadNotProvided).toHaveBeenCalled();
    });
    it('(playerId payload empty) => Raise error', async () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);
      await store.dispatch.game.sendTypeLog({
        raceId: M_TR0_RACE_ID0,
        playerLog: {
          textLength: 0,
          timestamp: 123456000,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      expect(payloadNotProvided).toHaveBeenCalled();
    });
  });
});

//TODO: add descriptive names, give them all same format
//TODO: seprate mock objects from test files
// TODO: rmeove unwanted models in initial values. initial state cannot change if its on test
