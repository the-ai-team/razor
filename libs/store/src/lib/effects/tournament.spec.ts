import { AppStateModel, AppTournamentState } from '@razor/models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  mockPlayersModel,
  mockTournament,
  M_TOURNAMENT_ID0,
} from '@razor/mocks';
import { tournamentNotFound } from '../raisers';
import { initializeStore } from '../store';

const initialState: AppStateModel = {
  tournamentsModel: {},
  playersModel: {},
  racesModel: {},
  leaderboardsModel: {},
  playerLogsModel: {},
  errorLogsModel: {},
};

jest.mock('../raisers', () => ({
  ...jest.requireActual('../raisers'),
  tournamentNotFound: jest.fn(),
}));

describe('[Effects] Tournament', () => {
  describe('Set state', () => {
    it('(id) => Change tournament state', async () => {
      const initialValues = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: mockTournament(M_TOURNAMENT_ID0, [0, 0], [0, 2]),
        },
        playersModel: mockPlayersModel([0, 2]),
      };

      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      await store.dispatch.game.setStateTournament({
        tournamentId: M_TOURNAMENT_ID0,
        tournamentState: AppTournamentState.Ready,
      });
      const storeState = store.getState();

      const expectedResult = {
        ...initialValues,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: {
            ...initialValues.tournamentsModel[M_TOURNAMENT_ID0],
            state: AppTournamentState.Ready,
          },
        },
      };
      expect(storeState).toEqual({
        ...initialStoreState,
        game: expectedResult,
      });
    });

    it('(invalid id) => Raise error', async () => {
      const initialValues = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: mockTournament(M_TOURNAMENT_ID0, [0, 0], [0, 2]),
        },
        playersModel: mockPlayersModel([0, 2]),
      };
      const store = initializeStore(initialValues);

      await store.dispatch.game.setStateTournament({
        tournamentId: 'T:notExist',
        tournamentState: AppTournamentState.Ready,
      });

      expect(tournamentNotFound).toHaveBeenCalled();
    });
  });
});
