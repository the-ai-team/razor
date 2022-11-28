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
export type AddTournamentReducerPayload = {
  tournamentId: AppTournamentId;
  tournament: AppTournament;
};

export type AddRaceReducerPayload = {
  raceId: AppRaceId;
  race: AppRace;
};

export type AddPlayerReducerPayload = {
  tournamentId: AppTournamentId;
  playerId: AppPlayerId;
  player: AppPlayer;
};

export type UpdateTournamentReducerPayload = {
  tournamentId: AppTournamentId;
  tournament: AppTournament;
};

export type UpdateRaceReducerPayload = {
  raceId: AppRaceId;
  race: AppRace;
};

export type UpdateLeaderboardReducerPayload = {
  leaderboardId: AppRaceId;
  leaderboard: AppLeaderboard;
};

export type UpdatePlayerLogReducerPayload = {
  playerLogId: AppPlayerLogId;
  playerLog: AppPlayerLog;
};

export type RemovePlayerReducerPayload = {
  tournamentId: AppTournamentId;
  playerId: AppPlayerId;
};

export type RemoveTournamentReducerPayload = {
  tournamentId: AppTournamentId;
};

export type LogErrorReducerPayload = {
  errorLog: AppErrorLog;
  errorTimestamp: AppErrorTimestamp;
};
