// ### [Payloads] Data models for the effect payloads ### //

import {
  AppPlayer,
  AppPlayerId,
  AppPlayerLog,
  AppRaceId,
  AppSnapshot,
  AppTournamentId,
  AppTournamentState,
} from '@razor/models';

export type JoinPlayerPayload = {
  receivedTournamentId: AppTournamentId | '';
  playerName: string;
};

export type AddPlayerPayload = {
  tournamentState: AppTournamentState;
  playerId: AppPlayerId;
  player: AppPlayer;
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

export type ReplaceFullStatePayload = {
  parentState: AppSnapshot;
};
