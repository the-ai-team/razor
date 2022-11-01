import { AppErrorLogs } from './errorLog';
import { AppLeadeboards } from './leaderboard';
import { AppPlayerLogs, AppPlayers } from './player';
import { AppRaces } from './race';
import { AppTournaments } from './tournament';

export enum AppIdNumberType {
  Player = 'player',
  Tournament = 'tournament',
  General = 'general',
}
export interface AppStateModel {
  tournamentsModel: AppTournaments;
  playersModel: AppPlayers;
  racesModel: AppRaces;
  leaderboardsModel: AppLeadeboards;
  playerLogsModel: AppPlayerLogs;
  errorLogsModel: AppErrorLogs;
}
