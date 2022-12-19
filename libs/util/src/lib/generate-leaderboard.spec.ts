// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  mockPlayerId,
  mockPlayerLogId,
  mockPlayerLogs,
  mockTimeoutPlayerLogs,
  M_PLAYER_ID0,
  M_PLAYER_ID1,
  M_PLAYER_ID2,
  M_PLAYER_ID3,
  M_TR0_RACE_ID0,
} from '@razor/mocks';
import { AppPlayerStatus } from '@razor/models';
import { generateLeaderboard } from './generate-leaderboard';

describe('(Utils) generateLeaderboard', () => {
  it('(valid input) => Generate leaderboard', () => {
    const raceTextLength = 500;
    const playerLog1 = mockPlayerLogs(raceTextLength);
    const playerLog2 = mockPlayerLogs(raceTextLength);
    const playerLog3 = mockPlayerLogs(raceTextLength);
    const playerLog4 = mockTimeoutPlayerLogs(raceTextLength);
    const playerLog5 = mockTimeoutPlayerLogs(raceTextLength);
    const playerLogId1 = mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID0);
    const playerLogId2 = mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID1);
    const playerLogId3 = mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID2);
    const playerLogId4 = mockPlayerLogId(M_TR0_RACE_ID0, M_PLAYER_ID3);
    const playerLogId5 = mockPlayerLogId(M_TR0_RACE_ID0, mockPlayerId(4));

    const playerLogs = {
      [playerLogId1]: playerLog1,
      [playerLogId2]: playerLog2,
      [playerLogId3]: playerLog3,
      [playerLogId4]: playerLog4,
      [playerLogId5]: playerLog5,
    };

    const leaderboard = generateLeaderboard(
      playerLogs,
      M_TR0_RACE_ID0,
      raceTextLength,
    );
    expect(leaderboard).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          playerId: M_PLAYER_ID0,
          status: AppPlayerStatus.Complete,
          values: expect.objectContaining({
            wpm: expect.any(Number),
            elapsedTime: expect.any(Number),
          }),
        }),
        expect.objectContaining({
          playerId: M_PLAYER_ID3,
          status: AppPlayerStatus.Timeout,
          values: expect.objectContaining({
            distance: expect.any(Number),
          }),
        }),
      ]),
    );
  });
});
