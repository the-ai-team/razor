// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  M_TOURNAMENT_ID0,
  mockPlayersModel,
  mockTournament,
} from '@razor/mocks';
import { AppStateModel, AppTournamentState } from '@razor/models';

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
    it('(id) => Change tournament state', () => {
      const initialValues = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: mockTournament(M_TOURNAMENT_ID0, [0, 0], [0, 2]),
        },
        playersModel: mockPlayersModel([0, 2]),
      };

      const store = initializeStore(initialValues);
      const initialStoreState = store.getState();

      store.dispatch.game.setTournamentState({
        tournamentId: M_TOURNAMENT_ID0,
        tournamentState: AppTournamentState.Lobby,
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

    it('(invalid id) => Raise error', () => {
      const initialValues = {
        ...initialState,
        tournamentsModel: {
          [M_TOURNAMENT_ID0]: mockTournament(M_TOURNAMENT_ID0, [0, 0], [0, 2]),
        },
        playersModel: mockPlayersModel([0, 2]),
      };
      const store = initializeStore(initialValues);

      store.dispatch.game.setTournamentState({
        tournamentId: 'T:notExist',
        tournamentState: AppTournamentState.Lobby,
      });

      expect(tournamentNotFound).toHaveBeenCalled();
    });
  });
});
