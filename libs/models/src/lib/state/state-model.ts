import { AppErrorLogs } from './log-message';
import { AppLeaderboards } from './leaderboard';
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
  leaderboardsModel: AppLeaderboards;
  playerLogsModel: AppPlayerLogs;
  errorLogsModel: AppErrorLogs;
}
