import { store } from './store';

describe('store', () => {
  it('should work', () => {
    // expect(store()).toEqual('store');
  });
});

// Test Dispatches
// const { dispatch } = store;

// dispatch({
//   type: 'game/joinPlayer',
//   payload: {
//     tid: 'T:rGl0zHJk',
//     playerName: 'su ss',
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
//     raceId: 'T:rGl0zHJk-R:000',
//   },
// });

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
