import {
  AppFinishedLeaderboardEntry,
  AppFinishedPlayerValues,
  AppLeaderboard,
  AppPlayerLog,
  AppPlayerLogId,
  AppPlayerLogs,
  AppPlayerStatus,
  AppRaceId,
  AppTimeoutLeaderboardEntry,
  AppTimeoutPlayerValues,
} from '@razor/models';
import { extractId, ExtractIdType } from './extract-ids';

export const generateLeaderboard = (
  playerLogs: AppPlayerLogs,
  raceId: AppRaceId,
  raceTextLength: number,
): AppLeaderboard => {
  const completeEntries: AppFinishedLeaderboardEntry[] = [];
  const timeoutEntries: AppTimeoutLeaderboardEntry[] = [];

  let playerLogId: AppPlayerLogId;
  for (playerLogId in playerLogs) {
    const raceIdOfPlayerLog = extractId(
      playerLogId,
      ExtractIdType.playerLog,
      ExtractIdType.race,
    );

    const playerIdOfPlayerLog = extractId(
      playerLogId,
      ExtractIdType.playerLog,
      ExtractIdType.player,
    );

    //Check whether race owns the racelog
    if (raceIdOfPlayerLog === raceId) {
      const playerLogsLength = playerLogs[playerLogId].length;
      const playerLastTextLength =
        playerLogs[playerLogId][playerLogsLength - 1].textLength;

      let wpm, elpasedTime, distance;
      // Check whether player has finished the race
      if (playerLastTextLength === raceTextLength) {
        wpm = calculateWPM(raceTextLength, playerLogs[playerLogId]);
        elpasedTime =
          playerLogs[playerLogId][playerLogsLength - 1].timestamp -
          playerLogs[playerLogId][0].timestamp;
        const finishedPlayerValues: AppFinishedPlayerValues = {
          wpm,
          elpasedTime,
        };
        completeEntries.push({
          playerId: playerIdOfPlayerLog,
          status: AppPlayerStatus.Complete,
          values: finishedPlayerValues,
        });
      } else {
        distance =
          playerLogs[playerLogId][playerLogsLength - 1].textLength -
          playerLogs[playerLogId][0].textLength;
        const timeoutPlayerValues: AppTimeoutPlayerValues = {
          distance,
        };
        timeoutEntries.push({
          playerId: playerIdOfPlayerLog,
          status: AppPlayerStatus.Timeout,
          values: timeoutPlayerValues,
        });
      }
    }
  }

  completeEntries.sort((a, b) => b.values.wpm - a.values.wpm);
  timeoutEntries.sort((a, b) => b.values.distance - a.values.distance);
  const leaderboardEntries: AppLeaderboard = [
    ...completeEntries,
    ...timeoutEntries,
  ];
  return leaderboardEntries;
};

const calculateWPM = (length: number, logs: AppPlayerLog[]): number => {
  const mark1 = Math.floor(length * 0.25);
  const mark2 = Math.floor(length * 0.5);
  const mark3 = Math.floor(length * 0.75);

  const timestampCheckpoints = [
    logs[0].timestamp,
    0,
    0,
    0,
    logs[logs.length - 1].timestamp,
  ];
  const textLengthCheckpoints = [0, 0, 0, 0, length];
  const quarterWPMs = [0, 0, 0, 0];

  for (let index = 0; index < logs.length; index++) {
    if (logs[index].textLength <= mark1) {
      timestampCheckpoints[1] = logs[index].timestamp;
      textLengthCheckpoints[1] = logs[index].textLength;
    }
    if (logs[index].textLength <= mark2) {
      timestampCheckpoints[2] = logs[index].timestamp;
      textLengthCheckpoints[2] = logs[index].textLength;
    }
    if (logs[index].textLength <= mark3) {
      timestampCheckpoints[3] = logs[index].timestamp;
      textLengthCheckpoints[3] = logs[index].textLength;
    }
  }

  let averageWPM = 0;
  for (let index = 0; index < timestampCheckpoints.length - 1; index++) {
    quarterWPMs[index] = calculateQuarterWPM(
      timestampCheckpoints[index],
      timestampCheckpoints[index + 1],
      textLengthCheckpoints[index],
      textLengthCheckpoints[index + 1],
    );
    averageWPM += quarterWPMs[index] / 4;
  }

  return +averageWPM.toFixed(2);
};

const calculateQuarterWPM = (
  startTimestamp: number,
  endTimestamp: number,
  startTextLength: number,
  endTextLength: number,
): number => {
  const timeElapsed = endTimestamp - startTimestamp;
  const textLength = endTextLength - startTextLength;
  const wpm = textLength / 5 / (timeElapsed / 60);
  return wpm;
};
