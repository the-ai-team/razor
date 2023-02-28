// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  M_GENERAL_ID0,
  M_PLAYER_AVATAR0,
  M_PLAYER_ID0,
  M_PLAYER_NAME0,
  M_TOURNAMENT_ID0,
  M_TOURNAMENT0,
  M_TR0_RACE_ID0,
  mockPlayersModel,
  mockRace,
  mockTournament,
} from '@razor/mocks';
import {
  AppIdNumberType,
  AppPlayerState,
  AppStateModel,
  AppTournamentId,
  AppTournamentState,
} from '@razor/models';

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
    it('(without tournament id) => Add player, Create tournament, Join player to the tournament.', () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.joinPlayer({
        receivedTournamentId: '',
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
    it('(tournament id) => Add player, Join player to existing tournamentsModel', () => {
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

      store.dispatch.game.joinPlayer({
        receivedTournamentId: M_TOURNAMENT_ID0,
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
    it('(all valid, empty tournament) => Add player, Join player to existing tournamentsModel, Change tournament state to Lobby.', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: {
            ...mockTournament(M_TOURNAMENT_ID0, [0, 1], [0, 0]),
            state: AppTournamentState.Empty,
          },
        },
        racesModel: {
          [M_TR0_RACE_ID0]: mockRace([1, 3]),
        },
      };
      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.joinPlayer({
        receivedTournamentId: M_TOURNAMENT_ID0,
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
            state: AppTournamentState.Lobby,
          },
        },
        playersModel: mockPlayersModel([0, 1], M_TOURNAMENT_ID0),
      };
      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });
    it('(invalid tournament id) => Raise error', () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);

      store.dispatch.game.joinPlayer({
        receivedTournamentId: 'thisIdDoesNotExist' as AppTournamentId,
        playerName: M_PLAYER_NAME0,
      });
      expect(tournamentNotFound).toHaveBeenCalled();
    });
    it('(invalid player name length) => Raise error', () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);

      store.dispatch.game.joinPlayer({
        receivedTournamentId: '',
        playerName: 'thisPlayerNameIsTooLong',
      });
      expect(invalidPlayerNameLength).toHaveBeenCalled();
    });
    it('(invalid player name) => Raise error', () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);

      store.dispatch.game.joinPlayer({
        receivedTournamentId: '',
        playerName: 'N@m3IsN0tV@lid',
      });
      expect(invalidPlayerName).toHaveBeenCalled();
    });
    it('(empty payload) => Raise error', () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      store.dispatch.game.joinPlayer({} as any);
      expect(payloadNotProvided).toHaveBeenCalled();
    });
  });

  describe('Player Leave', () => {
    it('(id) => Clear player', () => {
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

      store.dispatch.game.clearPlayer({
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
    it('(all valid, only player remaining) => Clear player, Set tournament to empty', () => {
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

      store.dispatch.game.clearPlayer({
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
    it('(invalid id) => Raise error', () => {
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

      store.dispatch.game.clearPlayer({
        playerId: 'P:thisIdDoesNotExist',
      });
      expect(playerNotFound).toHaveBeenCalled();
    });
    it('(empty payload) => Raise error', () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      store.dispatch.game.clearPlayer({} as any);
      expect(payloadNotProvided).toHaveBeenCalled();
    });
  });
});

describe('[Effects] Player Log', () => {
  describe('Send Type Log', () => {
    it('(race id & player id) => Send Type Log', () => {
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

      store.dispatch.game.sendTypeLog({
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
    it('(not existing player) => Raise error', () => {
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

      store.dispatch.game.sendTypeLog({
        raceId: M_TR0_RACE_ID0,
        playerId: 'P:thisIdDoesNotExist',
        playerLog: {
          textLength: 0,
          timestamp: 123456000,
        },
      });

      expect(playerNotFound).toHaveBeenCalled();
    });
    it('(not existing race) => Raise error', () => {
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

      store.dispatch.game.sendTypeLog({
        raceId: 'T:testTR00-R:notExist',
        playerId: M_PLAYER_ID0,
        playerLog: {
          textLength: 0,
          timestamp: 123456000,
        },
      });
      expect(raceNotFound).toHaveBeenCalled();
    });
    it('(empty race id) => Raise error', () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);
      store.dispatch.game.sendTypeLog({
        playerId: M_PLAYER_ID0,
        playerLog: {
          textLength: 0,
          timestamp: 123456000,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
      expect(payloadNotProvided).toHaveBeenCalled();
    });
    it('(empty player id) => Raise error', () => {
      const initialValues = initialState;
      const store = initializeStore(initialValues);
      store.dispatch.game.sendTypeLog({
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
