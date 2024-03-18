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

/** Generate leaderboard for given player logs.
 *
 * @param playerLogs - Player logs to generate leaderboard from.
 * @param raceId - Race id to generate leaderboard for.
 * @param raceTextLength - Length of text for the race.
 * @returns Generated leaderboard.
 */
export const generateLeaderboard = (
  playerLogs: AppPlayerLogs,
  raceId: AppRaceId,
  raceTextLength: number,
): AppLeaderboard => {
  /** Entries for completed players of race. */
  const completeEntries: AppFinishedLeaderboardEntry[] = [];
  /** Entries for incomplete players of race. */
  const timeoutEntries: AppTimeoutLeaderboardEntry[] = [];

  let playerLogId: AppPlayerLogId;
  for (playerLogId in playerLogs) {
    const raceIdOfPlayerLog = extractId(
      playerLogId,
      ExtractIdType.PlayerLog,
      ExtractIdType.Race,
    );
    const playerIdOfPlayerLog = extractId(
      playerLogId,
      ExtractIdType.PlayerLog,
      ExtractIdType.Player,
    );

    // Check whether the race owns the race log.
    if (raceIdOfPlayerLog === raceId) {
      const playerLogsLength = playerLogs[playerLogId].length;
      const playerLastTextLength =
        playerLogs[playerLogId][playerLogsLength - 1].textLength;

      // Check whether the player has finished the race by comparing the last logged text length of the player and the race text length.
      if (playerLastTextLength === raceTextLength) {
        const wpm = calculateFullWPM(raceTextLength, playerLogs[playerLogId]);
        // Elapsed time = (Last timestamp - First timestamp) / 1000 <= In seconds
        const elapsedTime =
          (playerLogs[playerLogId][playerLogsLength - 1].timestamp -
            playerLogs[playerLogId][0].timestamp) /
          1000;
        const finishedPlayerValues: AppFinishedPlayerValues = {
          wpm,
          elapsedTime,
        };

        completeEntries.push({
          playerId: playerIdOfPlayerLog,
          status: AppPlayerStatus.Complete,
          values: finishedPlayerValues,
        });
      } else {
        // Total length(distance) typed by the player = Last text length - First text length
        const distance =
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

  // Sort the entries of the completed players by wpm.
  completeEntries.sort((a, b) => b.values.wpm - a.values.wpm);
  // Sort the entries of the incomplete players by distance.
  timeoutEntries.sort((a, b) => b.values.distance - a.values.distance);

  // Merge the entries of the completed and incomplete players.
  const leaderboardEntries: AppLeaderboard = [
    ...completeEntries,
    ...timeoutEntries,
  ];
  return leaderboardEntries;
};

/** Calculate average wpm.
 *
 * WPM is only calculated for the race-completed players.
 * Term Quaater is considered between two markers of race text length.
 *
 * @param length - Length of the text.
 * @param logs - Logs of a player.
 * @returns Average wpm.
 */
const calculateFullWPM = (length: number, logs: AppPlayerLog[]): number => {
  /** Placing markers(checkpoints) for race text length. This will partition race text length. */
  const mark1 = Math.floor(length * 0.25);
  const mark2 = Math.floor(length * 0.5);
  const mark3 = Math.floor(length * 0.75);

  /** Markers(checkpoints) for the timestamps of the player
   * [0] - Started timestamp
   * [1] - Second timestamp marker (0 by default)
   * [2] - Third timestamp marker (0 by default)
   * [3] - Fourth timestamp marker (0 by default)
   * [4] - Finished timestamp
   */
  const timestampCheckpoints = [
    logs[0].timestamp,
    0,
    0,
    0,
    logs[logs.length - 1].timestamp,
  ];

  /** Markers(checkpoints) for the player-typed text length
   * [0] - Started text length (Player starts at 0)
   * [1] - Second text length marker (0 by default)
   * [2] - Third text length marker (0 by default)
   * [3] - Fourth text length marker (0 by default)
   * [4] - Finished text length
   */
  const textLengthCheckpoints = [0, 0, 0, 0, length];

  //
  //  * Example values after the loop:
  //  timestampCheckpoints = [ 1234567000, 1234567021, 1234567050, 1234567076, 1234567102 ]
  //  textLengthCheckpoints = [ 0, 119, 241, 372, 500 ]
  //
  //  * Example 2:
  //  timestampCheckpoints = [ 1234567000, 1234567029, 1234567055, 1234567087, 1234567120 ]
  //  textLengthCheckpoints = [ 0, 120, 245, 375, 500 ]
  //
  for (let index = 0; index < logs.length; index++) {
    // Assigning player timestamp markers(checkpoints) & player text length markers(checkpoints)
    // These condition keeps updating checkpoint until the player logs reach the that marker.
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

  /** Calculated WPMs for each quarter of the player */
  const quarterWPMs = [0, 0, 0, 0];
  for (let index = 0; index < timestampCheckpoints.length - 1; index++) {
    // Calculate the quarter WPM using the difference between the two timestamp checkpoints and the two text length checkpoints.
    // * From example 1:
    // calculateQuarterWPM(1234567021, 1234567050, 119, 241) = 2.4
    quarterWPMs[index] = calculateWPM(
      timestampCheckpoints[index],
      timestampCheckpoints[index + 1],
      textLengthCheckpoints[index],
      textLengthCheckpoints[index + 1],
    );
    averageWPM += quarterWPMs[index] / 4;
  }

  return +averageWPM.toFixed(2);
};

/** Calculate WPM for a quarter
 *
 * @returns WPM for specific quarter.
 */
export const calculateWPM = (
  startTimestamp: number,
  endTimestamp: number,
  startTextLength: number,
  endTextLength: number,
): number => {
  const timeElapsed = endTimestamp - startTimestamp;
  const textLength = endTextLength - startTextLength;

  // Avg. number of words in race text = textLength / 5 + 1 <= (Assuming that the average word has 5 letters (and with the space 6 characters))
  // WPM = Avg. words / Mintues
  const wpm = textLength / 6 / (timeElapsed / 1000 / 60);
  return wpm;
};
