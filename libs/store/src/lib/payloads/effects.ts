import {
  AppPlayerId,
  AppPlayerLog,
  AppRaceId,
  AppTournamentId,
} from '@razor/models';

//effectsPayloads
export type JoinPlayerPayload = {
  tid: string;
  playerName: string;
};

export type ClearPlayerPayload = {
  playerId: AppPlayerId;
};

export type SetReadyTournamentPayload = {
  tournamentId: AppTournamentId;
};

export type StartCountdownPayload = {
  tournamentId: AppTournamentId;
  playerId: AppPlayerId;
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
