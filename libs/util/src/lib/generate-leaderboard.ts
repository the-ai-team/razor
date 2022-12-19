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
 * @param {AppPlayerLogs} playerLogs - Player logs to generate leaderboard from.
 * @param {AppRaceId} raceId - Race id to generate leaderboard for.
 * @param {number} raceTextLength - Length of text for the race.
 * @returns {AppLeaderboard} - Generated leaderboard.
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

  /** For every player-log-id of player logs */
  let playerLogId: AppPlayerLogId;
  for (playerLogId in playerLogs) {
    /** Race id of relevant player log id. */
    const raceIdOfPlayerLog = extractId(
      playerLogId,
      ExtractIdType.PlayerLog,
      ExtractIdType.Race,
    );

    /** Player id of relevant player log id. */
    const playerIdOfPlayerLog = extractId(
      playerLogId,
      ExtractIdType.PlayerLog,
      ExtractIdType.Player,
    );

    // Check whether the race owns the race log.
    if (raceIdOfPlayerLog === raceId) {
      /** Length of the current player log. */
      const playerLogsLength = playerLogs[playerLogId].length;
      /** Last logged text length of the player. */
      const playerLastTextLength =
        playerLogs[playerLogId][playerLogsLength - 1].textLength;

      // Check whether the player has finished the race by comparing the last logged text length of the player and the race text length.
      if (playerLastTextLength === raceTextLength) {
        // WPM of the player related to player log id.
        const wpm = calculateWPM(raceTextLength, playerLogs[playerLogId]);
        // Elapsed time of the player.
        // (Playerlgos last timestamp - player logs first timestamp)
        const elpasedTime =
          playerLogs[playerLogId][playerLogsLength - 1].timestamp -
          playerLogs[playerLogId][0].timestamp;

        // Plyaer leaderboard values.
        const finishedPlayerValues: AppFinishedPlayerValues = {
          wpm,
          elpasedTime,
        };
        // Leaderboard entry for the player.
        completeEntries.push({
          playerId: playerIdOfPlayerLog,
          status: AppPlayerStatus.Complete,
          values: finishedPlayerValues,
        });
      } else {
        // Total length(distance) typed by the player.
        // (Player logs last text length - player logs first text length)
        const distance =
          playerLogs[playerLogId][playerLogsLength - 1].textLength -
          playerLogs[playerLogId][0].textLength;

        // Plyaer leaderboard values.
        const timeoutPlayerValues: AppTimeoutPlayerValues = {
          distance,
        };
        // Leaderboard entry for the player.
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
 * @param {number} length - Length of the text.
 * @param {number} timestamp2 - Player logs.
 * @returns {number} - Average wpm.
 */
const calculateWPM = (length: number, logs: AppPlayerLog[]): number => {
  /** First marker(checkpoint) for the race text length */
  const mark1 = Math.floor(length * 0.25);
  /** Second marker(checkpoint) for the race text length */
  const mark2 = Math.floor(length * 0.5);
  /** Third marker(checkpoint) for the race text length */
  const mark3 = Math.floor(length * 0.75);

  /** Markers(checkpoints) of the timestamps of the player
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

  /** Markers(checkpoints) of the player-typed text length
   * [0] - Started text length (Player starts at 0)
   * [1] - Second text length marker (0 by default)
   * [2] - Third text length marker (0 by default)
   * [3] - Fourth text length marker (0 by default)
   * [4] - Finished text length
   */
  const textLengthCheckpoints = [0, 0, 0, 0, length];

  // For every player log
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
    // Assigning player timestamp marker(checkpoint) & player text length marker(checkpoint)
    // until the player logs reach the first marker.
    if (logs[index].textLength <= mark1) {
      timestampCheckpoints[1] = logs[index].timestamp;
      textLengthCheckpoints[1] = logs[index].textLength;
    }
    // Assigning ...
    // until the player logs reach the second marker.
    if (logs[index].textLength <= mark2) {
      timestampCheckpoints[2] = logs[index].timestamp;
      textLengthCheckpoints[2] = logs[index].textLength;
    }
    // Assigning ...
    // until the player logs reach the third marker.
    if (logs[index].textLength <= mark3) {
      timestampCheckpoints[3] = logs[index].timestamp;
      textLengthCheckpoints[3] = logs[index].textLength;
    }
  }
  let averageWPM = 0;

  /** Caluclated WPMs for each quarter of the player */
  const quarterWPMs = [0, 0, 0, 0];
  for (let index = 0; index < timestampCheckpoints.length - 1; index++) {
    // Calculate the quarter WPM using the difference between the two timestamp checkpoints and the two text length checkpoints.
    // * From example 1:
    // calculateQuarterWPM(1234567021, 1234567050, 119, 241) = 2.4
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

/** Calculate WPM for a quarter
 *
 * @param {number} timestamp1 - First timestamp.
 * @param {number} timestamp2 - Second timestamp.
 * @param {number} textLength1 - First text length.
 * @param {number} textLength2 - Second text length.
 * @returns {number} - WPM for a quarter.
 */
const calculateQuarterWPM = (
  startTimestamp: number,
  endTimestamp: number,
  startTextLength: number,
  endTextLength: number,
): number => {
  const timeElapsed = endTimestamp - startTimestamp;
  const textLength = endTextLength - startTextLength;

  // Avg. number of words in race text = textLength / 5
  // WPM = Avg. words / Mintues
  const wpm = textLength / 5 / (timeElapsed / 60);
  return wpm;
};
