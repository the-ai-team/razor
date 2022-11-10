import {
  AppTournamentId,
  AppTournament,
  AppRaceId,
  AppRace,
  AppPlayerId,
  AppPlayer,
  AppLeaderboard,
  AppPlayerLogId,
  AppPlayerLog,
  AppErrorLog,
  AppErrorTimestamp,
} from '@razor/models';

//reducer Playloads
export type addTournamentReducerPayload = {
  tournamentId: AppTournamentId;
  tournament: AppTournament;
};
export type addRaceReducerPayload = {
  raceId: AppRaceId;
  race: AppRace;
};
export type addPlayerReducerPayload = {
  tournamentId: AppTournamentId;
  playerId: AppPlayerId;
  player: AppPlayer;
};
export type updateTournamentReducerPayload = {
  tournamentId: AppTournamentId;
  tournament: AppTournament;
};
export type updateRaceReducerPayload = {
  raceId: AppRaceId;
  race: AppRace;
};
export type updateLeaderboardReducerPayload = {
  leaderboardId: AppRaceId;
  leaderboard: AppLeaderboard;
};
export type updatePlayerLogReducerPayload = {
  playerLogId: AppPlayerLogId;
  playerLog: AppPlayerLog;
};
export type removePlayerReducerPayload = {
  tournamentId: AppTournamentId;
  playerId: AppPlayerId;
};
export type removeTournamentReducer = {
  tournamentId: AppTournamentId;
};
export type logErrorReducerPayload = {
  errorLog: AppErrorLog;
  errorTimestamp: AppErrorTimestamp;
};