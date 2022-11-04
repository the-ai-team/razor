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
  startCountdown,
  endCoundown,
  endRace,
  sendTypeLog,
} from './effects';
import { initialState } from './initialState';
import {
  clearPlayerPayload,
  joinPlayerPayload,
  setReadyTournamentPayload,
  startCountdownPayload,
  endCountdownPayload,
  endRacePayload,
  sendTypeLogPlayload,
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
    startCountdown: (payload: startCountdownPayload, state: RootState) =>
      startCountdown(dispatch, payload, state),
    endCoundown: (payload: endCountdownPayload, state: RootState) =>
      endCoundown(dispatch, payload, state),
    endRace: (payload: endRacePayload, state: RootState) =>
      endRace(dispatch, payload, state),
    sendTypeLog: (payload: sendTypeLogPlayload, state: RootState) =>
      sendTypeLog(dispatch, payload, state),
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
