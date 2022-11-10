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
  endCoundown,
  endRace,
  joinPlayer,
  sendErrorLog,
  sendTypeLog,
  setReadyTournament,
  startCountdown,
} from './effects';
import { initialState } from './initialState';
import {
  clearPlayerPayload,
  endCountdownPayload,
  endRacePayload,
  joinPlayerPayload,
  sendTypeLogPlayload,
  setReadyTournamentPayload,
  startCountdownPayload,
} from './payloadTypes';
import {
  addPlayerReducer,
  addRaceReducer,
  addTournamentReducer,
  logErrorReducer,
  removePlayerReducer,
  removeTournamentReducer,
  updateLeaderboardReducer,
  updatePlayerLogReducer,
  updateRaceReducer,
  updateTournamentReducer,
} from './reducers';

export const game = createModel<RootModel>()({
  state: initialState,
  reducers: {
    addTournamentReducer,
    addRaceReducer,
    addPlayerReducer,
    updateTournamentReducer,
    updateRaceReducer,
    updateLeaderboardReducer,
    updatePlayerLogReducer,
    removePlayerReducer,
    logErrorReducer,
    removeTournamentReducer,
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
    sendTypeLog: (payload: sendTypeLogPlayload) =>
      sendTypeLog(dispatch, payload),
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
    tid: 'T:rGl0zHJk',
    playerName: 'su ss',
  },
});

//TODO: to samples
// dispatch({
//   type: 'game/startCountdown',
//   payload: {
//     tournamentId: 'T:65wY6NnA',
//     playerId: 'P:XBnckiWq',
//   },
// });

// dispatch({
//   type: 'game/startCountdown',
//   payload: {
//     tournamentId: 'T:rGl0zHJk',
//     playerId: 'P:ktaVbCYO',
//   },
// });

dispatch({
  type: 'game/endRace',
  payload: {
    raceId: 'T:rGl0zHJk-R:000',
  },
});

// let x = 0;
// const timestamp = 1667983739000;
// let textLength = 0;

// while (x < 160) {
//   x += Math.floor(Math.random() * 2) + 1;
//   textLength += Math.floor(Math.random() * 6) + 2;
//   dispatch({
//     type: 'game/sendTypeLog',
//     payload: {
//       raceId: 'T:rGl0zHJk-R:000',
//       playerId: 'P:C4eggywb',
//       playerLog: {
//         timestamp: timestamp+x,
//         textLength: textLength,
//       },
//     },
//   });
// }

// dispatch({
//   type: 'game/sendTypeLog',
//   payload: {
//     raceId: 'T:rGl0zHJk-R:000',
//     playerId: 'P:C4eggywb',
//     playerLog: {
//       timestamp: 1667983738934,
//       textLength: 25,
//     },
//   },
// });

// dispatch({
//   type: 'game/endRace',
//   payload: {
//     raceId: 'T:rGl0zHJk-R:000',
//   },
// });

// dispatch({
//   type: 'game/startCountdown',
//   payload: {
//     tournamentId: 'T:1',
//     playerId: 'P:1',
//   },
// });

// dispatch({
//   type: 'game/setReadyTournament',
//   payload: {
//     tournamentId: '1',
//   },
// });
