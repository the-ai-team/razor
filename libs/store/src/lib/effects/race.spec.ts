// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  M_PLAYER_AVATAR0,
  M_PLAYER_AVATAR1,
  M_PLAYER_AVATAR2,
  M_PLAYER_ID0,
  M_PLAYER_ID1,
  M_PLAYER_ID2,
  M_PLAYER_ID3,
  M_PLAYER_NAME0,
  M_PLAYER_NAME1,
  M_PLAYER_NAME2,
  M_RACE_TEXT0,
  M_RACE0,
  M_TOURNAMENT_ID0,
  M_TOURNAMENT0,
  M_TR0_RACE_ID0,
  M_TR0_RACE_ID1,
  mockPlayerId,
  mockPlayerLogId,
  mockPlayerLogs,
  mockPlayersModel,
  mockRace,
  mockTimeoutPlayerLogs,
  mockTournament,
} from '@razor/mocks';
import {
  AppLeaderboard,
  AppPlayerLogs,
  AppPlayerState,
  AppRaceId,
  AppRaces,
  AppStateModel,
  AppTournaments,
  AppTournamentState,
} from '@razor/models';
import { generateLeaderboard } from '@razor/util';
import { range } from 'lodash';

import { playerNotFound, raceNotFound, tournamentNotFound } from '../raisers';
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
  computeRaceDuration: jest.fn().mockReturnValue(100),
}));

jest.mock('../raisers', () => ({
  ...jest.requireActual('../raisers'),
  tournamentNotFound: jest.fn(),
  invalidPlayerName: jest.fn(),
  playerNotFound: jest.fn(),
  raceNotFound: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('[Effects] Race', () => {
  describe('Start Race Countdown', () => {
    // test data for first race in tournament
    const initialRacesModel0 = {};
    const initialTournamentsModel0 = {
      [M_TOURNAMENT_ID0]: mockTournament(M_TOURNAMENT_ID0, [0, 0], [0, 3]),
    };
    const nextRaceId0 = M_TR0_RACE_ID0;

    // test data for next races in tournament
    const initialRacesModel1 = {
      [M_TR0_RACE_ID0]: mockRace([0, 3]),
    };
    const initialTournamentsModel1 = {
      [M_TOURNAMENT_ID0]: M_TOURNAMENT0,
    };
    const nextRaceId1 = M_TR0_RACE_ID1;

    describe('(tournamentId & playerId)', () => {
      describe.each([
        [
          'First race of the tournament',
          initialRacesModel0,
          initialTournamentsModel0,
          nextRaceId0,
        ],
        [
          'Next races of the tournament',
          initialRacesModel1,
          initialTournamentsModel1,
          nextRaceId1,
        ],
      ])(
        '[%#] %s',
        (
          text: string,
          initialRacesModel: AppRaces,
          initialTournamentsModel: AppTournaments,
          nextRaceId: AppRaceId,
        ) => {
          it('=> Create race, Assign players, Update player state to race', () => {
            const initialValues: AppStateModel = {
              ...initialState,
              tournamentsModel: initialTournamentsModel,
              playersModel: mockPlayersModel([0, 3]),
              racesModel: initialRacesModel,
            };
            const store = initializeStore(initialValues);
            const initialStoreState = store.getState();
            jest
              .useFakeTimers({ doNotFake: ['nextTick', 'setImmediate'] })
              .setSystemTime(new Date('2022-01-01'));
            const timeNow = new Date().getTime();
            store.dispatch.game.startCountdown({
              tournamentId: M_TOURNAMENT_ID0,
              playerId: M_PLAYER_ID0,
              raceText: M_RACE_TEXT0,
            });
            const storeState = store.getState();

            const expectedResult = {
              ...initialValues,
              tournamentsModel: {
                [M_TOURNAMENT_ID0]: {
                  ...initialValues.tournamentsModel[M_TOURNAMENT_ID0],
                  state: AppTournamentState.Countdown,
                  raceIds: [
                    ...initialValues.tournamentsModel[M_TOURNAMENT_ID0].raceIds,
                    nextRaceId,
                  ],
                },
              },
              playersModel: mockPlayersModel(
                [0, 3],
                M_TOURNAMENT_ID0,
                AppPlayerState.Racing,
              ),
              racesModel: {
                ...initialValues.racesModel,
                [nextRaceId]: {
                  text: M_RACE_TEXT0,
                  timeoutDuration: 100,
                  startedTimestamp: timeNow,
                  players: {
                    [M_PLAYER_ID0]: {
                      name: M_PLAYER_NAME0,
                      avatarLink: M_PLAYER_AVATAR0,
                    },
                    [M_PLAYER_ID1]: {
                      name: M_PLAYER_NAME1,
                      avatarLink: M_PLAYER_AVATAR1,
                    },
                    [M_PLAYER_ID2]: {
                      name: M_PLAYER_NAME2,
                      avatarLink: M_PLAYER_AVATAR2,
                    },
                  },
                  isOnGoing: true,
                  raceStartedBy: M_PLAYER_ID0,
                },
              },
            };

            expect(storeState).toEqual({
              ...initialStoreState,
              game: expectedResult,
            });
          });
        },
      );
    });

    it('(not existing tournament) => Raise error', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: M_TOURNAMENT0,
        },
        playersModel: mockPlayersModel([0, 3]),
        racesModel: {
          [M_TR0_RACE_ID0]: mockRace([0, 3]),
        },
      };
      const store = initializeStore(initialValues);

      store.dispatch.game.startCountdown({
        tournamentId: 'T:notExist',
        playerId: M_PLAYER_ID0,
        raceText: M_RACE_TEXT0,
      });

      expect(tournamentNotFound).toHaveBeenCalled();
    });

    it('(not existing player) => Raise error', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: M_TOURNAMENT0,
        },
        playersModel: mockPlayersModel([0, 3]),
        racesModel: {
          [M_TR0_RACE_ID0]: mockRace([0, 3]),
        },
      };
      const store = initializeStore(initialValues);

      store.dispatch.game.startCountdown({
        tournamentId: M_TOURNAMENT_ID0,
        playerId: 'P:notExist',
        raceText: M_RACE_TEXT0,
      });

      expect(playerNotFound).toHaveBeenCalled();
    });

    it('(missing player, but in tournament) => Raise error', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: {
            ...M_TOURNAMENT0,
            playerIds: [
              M_PLAYER_ID0,
              M_PLAYER_ID1,
              M_PLAYER_ID2,
              M_PLAYER_ID3,
              mockPlayerId(10),
            ],
          },
        },
        playersModel: mockPlayersModel([0, 3]),
      };
      const store = initializeStore(initialValues);

      store.dispatch.game.startCountdown({
        tournamentId: M_TOURNAMENT_ID0,
        playerId: M_PLAYER_ID0,
        raceText: M_RACE_TEXT0,
      });

      expect(playerNotFound).toHaveBeenCalled();
    });
  });

  describe('End Race Countdown', () => {
    it('(race id) => End countdown', () => {
      const initialValues: AppStateModel = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: {
            ...M_TOURNAMENT0,
            state: AppTournamentState.Countdown,
          },
        },
        racesModel: {
          [M_TR0_RACE_ID0]: { ...M_RACE0, isOnGoing: true },
        },
        playersModel: {
          ...mockPlayersModel([0, 3], M_TOURNAMENT_ID0, AppPlayerState.Racing),
        },
      };

      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.endCoundown({
        tournamentId: M_TOURNAMENT_ID0,
      });
      const storeState = store.getState();

      const expectedResult: AppStateModel = {
        ...initialValues,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: {
            ...initialValues.tournamentsModel[M_TOURNAMENT_ID0],
            state: AppTournamentState.Race,
          },
        },
      };

      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });
    it('(not existing tournament) => Raise error', () => {
      const initialValues: AppStateModel = {
        ...initialState,
      };

      const store = initializeStore(initialValues);

      store.dispatch.game.endCoundown({
        tournamentId: 'T:notExist',
      });

      expect(tournamentNotFound).toHaveBeenCalled();
    });
  });
});

describe('End Race', () => {
  it("(race id) => End race, Set players' state to idle, Set tournament state to leaderboard", () => {
    const initialPlayerLogs: AppPlayerLogs = {};

    for (const i of range(0, 4)) {
      initialPlayerLogs[mockPlayerLogId(M_TR0_RACE_ID0, mockPlayerId(i))] =
        mockPlayerLogs(M_RACE_TEXT0.length);
    }
    for (const i of range(4, 7)) {
      initialPlayerLogs[mockPlayerLogId(M_TR0_RACE_ID0, mockPlayerId(i))] =
        mockTimeoutPlayerLogs(M_RACE_TEXT0.length);
    }

    const initialValues: AppStateModel = {
      ...initialState,
      tournamentsModel: {
        [M_TOURNAMENT_ID0]: {
          ...M_TOURNAMENT0,
          state: AppTournamentState.Race,
          playerIds: [
            ...M_TOURNAMENT0.playerIds,
            ...range(3, 7).map(i => mockPlayerId(i)),
          ],
        },
      },
      racesModel: {
        [M_TR0_RACE_ID0]: { ...M_RACE0, isOnGoing: true },
      },
      playersModel: {
        ...mockPlayersModel([0, 6], M_TOURNAMENT_ID0, AppPlayerState.Racing),
      },
      playerLogsModel: initialPlayerLogs,
    };

    const generatedLeadboard: AppLeaderboard = generateLeaderboard(
      initialPlayerLogs,
      M_TR0_RACE_ID0,
      M_RACE_TEXT0.length,
    );

    const store = initializeStore(initialValues);
    const initialStoreState = store.getState();

    store.dispatch.game.endRace({
      raceId: M_TR0_RACE_ID0,
    });
    const storeState = store.getState();

    const expectedResult: AppStateModel = {
      ...initialValues,
      tournamentsModel: {
        [M_TOURNAMENT_ID0]: {
          ...initialValues.tournamentsModel[M_TOURNAMENT_ID0],
          state: AppTournamentState.Leaderboard,
        },
      },
      racesModel: {
        [M_TR0_RACE_ID0]: {
          ...initialValues.racesModel[M_TR0_RACE_ID0],
          isOnGoing: false,
        },
      },
      playersModel: {
        ...mockPlayersModel([0, 6]),
      },
      leaderboardsModel: { [M_TR0_RACE_ID0]: generatedLeadboard },
    };

    expect(storeState).toEqual({
      ...initialStoreState,
      game: expectedResult,
    });
  });

  it('(not existing race) => Raise error', () => {
    const initialValues = initialState;
    const store = initializeStore(initialValues);
    store.dispatch.game.endRace({
      raceId: 'T:notExist-R:notExist',
    });

    expect(raceNotFound).toHaveBeenCalled();
  });
});
