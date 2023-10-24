import { AppLeaderboard, AppPlayerLogs, AppRaceId } from '@razor/models';
/** Generate leaderboard for given player logs.
 *
 * @param playerLogs - Player logs to generate leaderboard from.
 * @param raceId - Race id to generate leaderboard for.
 * @param raceTextLength - Length of text for the race.
 * @returns Generated leaderboard.
 */
export declare const generateLeaderboard: (playerLogs: AppPlayerLogs, raceId: AppRaceId, raceTextLength: number) => AppLeaderboard;
