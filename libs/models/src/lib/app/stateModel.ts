import { AppLeadeboards } from './leaderboard';
import { AppPlayerLogs, AppPlayers } from './player';
import { AppRaces } from './race';
import { AppTournaments } from './tournament';

export interface AppStateModel {
  tournamentsModel: AppTournaments;
  playersModel: AppPlayers;
  racesModel: AppRaces;
  leaderboardsModel: AppLeadeboards;
  playerLogsModel: AppPlayerLogs;
}
