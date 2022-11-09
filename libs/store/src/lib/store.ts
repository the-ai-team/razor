import { AppErrorLog, AppIdNumberType } from '@razor/models';
import { generateUid } from '@razor/util';
import {
  createModel,
  init,
  Models,
  RematchDispatch,
  RematchRootState,
} from '@rematch/core';
import { random } from 'nanoid';
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
  removeTournamentReducer,
  updateTournamentReducer,
  updateRaceReducer,
  updateLeaderboardReducer,
  updatePlayerLogReducer,
  logErrorReducer,
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

// dispatch({
//   type: 'game/joinPlayer',
//   payload: {
//     tid: 'T:rGl0zHJk',
//     playerName: 'Player 1',
//   },
// });

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

// dispatch({
//   type: 'game/endRace',
//   payload: {
//     raceId: 'T:a_pB5pc-R:001',
//   },
// });

// let x = 0;
// let timestamp = 1667983739000;
// while (x < 455) {
//   timestamp += Math.floor(Math.random() * 2) + 2;

//   dispatch({
//     type: 'game/sendTypeLog',
//     payload: {
//       raceId: 'T:rGl0zHJk-R:000',
//       playerId: 'P:C4eggywb',
//       playerLog: {
//         timestamp: timestamp,
//         textLength: x,
//       },
//     },
//   });

//   x += Math.floor(Math.random() * 2) + 1;
//   console.log(x);
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

dispatch({
  type: 'game/endRace',
  payload: {
    raceId: 'T:rGl0zHJk-R:000',
  },
});

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

//TODO: change vector image seed
