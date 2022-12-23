// ### [Payloads] Data models for the effect payloads ### //

import {
  AppPlayerId,
  AppPlayerLog,
  AppRaceId,
  AppTournamentId,
  AppTournamentState,
} from '@razor/models';

export type JoinPlayerPayload = {
  receivedTournamentId: AppTournamentId | '';
  playerName: string;
};

export type ClearPlayerPayload = {
  playerId: AppPlayerId;
};

export type SetTournamentStatePayload = {
  tournamentId: AppTournamentId;
  tournamentState: AppTournamentState;
};

export type StartCountdownPayload = {
  tournamentId: AppTournamentId;
  /** Id of player who started the race */
  playerId: AppPlayerId;
  raceText: string;
};

export type EndCountdownPayload = {
  tournamentId: AppTournamentId;
};

export type EndRacePayload = {
  raceId: AppRaceId;
};

export type SendTypeLogPlayload = {
  raceId: AppRaceId;
  playerId: AppPlayerId;
  /** Timestamp, and text length from players machine */
  playerLog: AppPlayerLog;
};
