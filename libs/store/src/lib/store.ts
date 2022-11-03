import { AppErrorLog } from '@razor/models';
import {
  createModel,
  init,
  Models,
  RematchDispatch,
  RematchRootState,
} from '@rematch/core';
import {
  clearPlayer,
  joinPlayer,
  sendErrorLog,
  setReadyTournament,
  startRace,
} from './effects';
import { initialState } from './initialState';
import {
  clearPlayerPayload,
  joinPlayerPayload,
  setReadyTournamentPayload,
  startRacePayload,
} from './payloadTypes';
import {
  addPlayerReducer,
  addRaceReducer,
  addTournamentReducer,
  removePlayerReducer,
  updateTournamentReducer,
  logErrorReducer,
} from './reducers';

export const game = createModel<RootModel>()({
  state: initialState,
  reducers: {
    addTournamentReducer,
    addRaceReducer,
    removePlayerReducer,
    addPlayerReducer,
    updateTournamentReducer,
    logErrorReducer,
  },

  effects: (dispatch: Dispatch) => ({
    joinPlayer: (payload: joinPlayerPayload, state: RootState) =>
      joinPlayer(dispatch, payload, state),
    clearPlayer: (payload: clearPlayerPayload, state: RootState) =>
      clearPlayer(dispatch, payload, state),
    setReadyTournament: (
      payload: setReadyTournamentPayload,
      state: RootState,
    ) => setReadyTournament(dispatch, payload, state),
    startRace: (payload: startRacePayload, state: RootState) =>
      startRace(dispatch, payload, state),
    sendErrorLog: (payload: AppErrorLog) => sendErrorLog(dispatch, payload),
  }),
});
export interface RootModel extends Models<RootModel> {
  game: typeof game;
}
const models: RootModel = { game };

export const store = init({
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

// Test Dispatches
const { dispatch } = store;

dispatch({
  type: 'game/joinPlayer',
  payload: {
    id: '',
    playerName: 'name',
  },
});

dispatch({
  type: 'game/startRace',
  payload: {
    tournamentId: 'T:1',
    playerId: '1',
  },
});

// dispatch({
//   type: 'game/setReadyTournament',
//   payload: {
//     tournamentId: '1',
//   },
// });
