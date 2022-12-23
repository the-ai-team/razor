// ### [Payloads] Data models for the reducer payloads ### //

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

export type AddLeaderboardReducerPayload = {
  leaderboardId: AppRaceId;
  leaderboard: AppLeaderboard;
};

export type UpdatePlayerReducerPayload = {
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
