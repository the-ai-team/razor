// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  mockPlayerLogId,
  M_COMPLETE_PLAYER_LOGS0,
  M_COMPLETE_PLAYER_LOGS1,
  M_PLAYER_ID0,
  M_PLAYER_ID1,
  M_PLAYER_ID2,
  M_PLAYER_ID3,
  M_TIMEOUT_PLAYER_LOGS1,
  M_TIMEOUT_PLAYER_LOGS2,
  M_TR0_RACE_ID0,
} from '@razor/mocks';
import { generateLeaderboard } from './generate-leaderboard';

describe('(Utils) generateLeaderboard', () => {
  it('(valid input) => Generate leaderboard', () => {
    const raceTextLength = 500;
    const playerLog1 = M_COMPLETE_PLAYER_LOGS0;
    const playerLog2 = M_COMPLETE_PLAYER_LOGS1;
    const playerLog3 = M_TIMEOUT_PLAYER_LOGS1;
    const playerLog4 = M_TIMEOUT_PLAYER_LOGS2;
    const playerLogId1 = mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0);
    const playerLogId2 = mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID1);
    const playerLogId3 = mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID2);
    const playerLogId4 = mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID3);

    const playerLogs = {
      [playerLogId1]: playerLog1,
      [playerLogId2]: playerLog2,
      [playerLogId3]: playerLog3,
      [playerLogId4]: playerLog4,
    };
    const leaderboard = generateLeaderboard(
      playerLogs,
      M_TR0_RACE_ID0,
      raceTextLength,
    );

    console.log(leaderboard);

    const expectedResult = [
      {
        playerId: 'P:testPL01',
        status: 'complete',
        values: { wpm: 52.53, elapsedTime: 116 },
      },
      {
        playerId: 'P:testPL00',
        status: 'complete',
        values: { wpm: 48.91, elapsedTime: 123 },
      },
      {
        playerId: 'P:testPL02',
        status: 'timeout',
        values: { distance: 451 },
      },
      {
        playerId: 'P:testPL03',
        status: 'timeout',
        values: { distance: 261 },
      },
    ];

    expect(leaderboard).toEqual(expectedResult);
  });
});
