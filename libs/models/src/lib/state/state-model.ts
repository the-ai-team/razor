import { AppLeaderboards } from './leaderboard';
import { AppErrorLogs } from './log-message';
import { AppPlayerLogs, AppPlayers } from './player';
import { AppRaces } from './race';
import { AppTournaments } from './tournament';

/** State model interface
 *
 * Collection of all the models.
 */
export interface AppStateModel {
  tournamentsModel: AppTournaments;
  playersModel: AppPlayers;
  racesModel: AppRaces;
  leaderboardsModel: AppLeaderboards;
  playerLogsModel: AppPlayerLogs;
  errorLogsModel: AppErrorLogs;
}
