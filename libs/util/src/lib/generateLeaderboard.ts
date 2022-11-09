import {
  AppLeadeboards,
  AppPlayerId,
  AppPlayerLog,
  AppPlayerLogId,
  AppPlayerLogs,
  AppRaceId,
} from '@razor/models';
import { extractId, extractIdType } from './extractIds';

export const generateLeaderboard = (
  playerLogs: AppPlayerLogs,
  raceId: AppRaceId,
  raceTextLength: number,
): AppLeadeboards => {
  for (const playerLogId in playerLogs) {
    const raceIdOfPlayerLog: AppRaceId = extractId(
      playerLogId,
      extractIdType.playerLog,
      extractIdType.race,
    ) as AppRaceId;

    const playerIdOfPlayerLog: AppPlayerId = extractId(
      playerLogId,
      extractIdType.playerLog,
      extractIdType.race,
    ) as AppPlayerId;

    const playerLogsLength = playerLogs[playerLogId as AppPlayerLogId].length;
    const playerLastTextLength =
      playerLogs[playerLogId as AppPlayerLogId][playerLogsLength - 1]
        .textLength;

    let wpm, elpasedTime, distance;
    //Check whether race owns the racelog
    if (raceIdOfPlayerLog === raceId) {
      // Check whether player has finished the race
      if (playerLastTextLength === raceTextLength) {
        wpm = calculateWPM(
          raceTextLength,
          playerLogs[playerLogId as AppPlayerLogId],
        );
        elpasedTime =
          playerLogs[playerLogId as AppPlayerLogId][playerLogsLength - 1]
            .timestamp - playerLogs[playerLogId as AppPlayerLogId][0].timestamp;
      } else {
        distance =
          playerLogs[playerLogId as AppPlayerLogId][playerLogsLength - 1]
            .textLength -
          playerLogs[playerLogId as AppPlayerLogId][0].textLength;
      }
    }

    console.log(wpm, elpasedTime, distance);
  }
  return {};
};

const calculateWPM = (length: number, logs: AppPlayerLog[]) => {
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

  return averageWPM.toFixed(2);
};

const calculateQuarterWPM = (
  startTimestamp: number,
  endTimestamp: number,
  startTextLength: number,
  endTextLength: number,
) => {
  const timeElapsed = endTimestamp - startTimestamp;
  const textLength = endTextLength - startTextLength;
  const wpm = textLength / 5 / (timeElapsed / 60);
  return wpm;
};
