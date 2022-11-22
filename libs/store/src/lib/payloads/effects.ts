import {
  AppPlayerId,
  AppPlayerLog,
  AppRaceId,
  AppTournamentId,
} from '@razor/models';

//effectsPayloads
export type joinPlayerPayload = {
  tid: string;
  playerName: string;
};
export type clearPlayerPayload = {
  playerId: AppPlayerId;
};
export type setReadyTournamentPayload = {
  tournamentId: AppTournamentId;
};
export type startCountdownPayload = {
  tournamentId: AppTournamentId;
  /** Id of player who started the race */
  playerId: AppPlayerId;
  raceText: string;
};
export type endCountdownPayload = {
  tournamentId: AppTournamentId;
};
export type endRacePayload = {
  raceId: AppRaceId;
};
export type sendTypeLogPlayload = {
  raceId: AppRaceId;
  playerId: AppPlayerId;
  /** Timestamp, and text length from players machine */
  playerLog: AppPlayerLog;
};
