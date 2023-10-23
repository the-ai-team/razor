import { z } from 'zod';

import { AppLeaderboard, AppStateModel } from '../state';

import { PlayerId } from './player';
import {
  informTimeoutSchema,
  initialClientDataSchema,
  playerJoinSchema,
  sendTypeLogSchema,
  startRaceAcceptSchema,
  startRaceRequestSchema,
  updateTypeLogsSchema,
} from './protocol-schemas';
import { RaceId } from './race';
import { TournamentId } from './tournament';

// This model is use when client subscribe and listen to socket events
// This contains self player data to do client side operations on store, when a new socket event is received
export interface ClientStoredPlayerData<T> {
  /** Player's tournament id */
  tournamentId: TournamentId;
  /** Player's id which saved on memory which is used to identify the player who received the event. */
  savedPlayerId: PlayerId;
  /** Data related to event.
   * In most of the events, this field contains another player's data.
   * Therefore savedPlayerId is not relaxant to player details in this field.
   */
  data: T;
}

// Data sent from the client to the server with socket establishment
export type InitialClientData = z.infer<typeof initialClientDataSchema>;

// This interface is used to sync the client with the server.
export type Snapshot = Omit<AppStateModel, 'errorLogsModel'>;

// Data sent from the server to the client after socket establishment to sync
// We are avoiding inferring the schema directly because it makes unnecessary type conversions while taking data from store to socket data model
export interface InitialServerData {
  playerId: PlayerId;
  tournamentId: TournamentId;
  /** Game snapshot */
  snapshot: Snapshot;
}

export type PlayerJoinData = z.infer<typeof playerJoinSchema>;

export type StartRaceRequestData = z.infer<typeof startRaceRequestSchema>;
export type StartRaceAcceptData = z.infer<typeof startRaceAcceptSchema>;

export type SendTypeLogData = z.infer<typeof sendTypeLogSchema>;
export type UpdateTypeLogsData = z.infer<typeof updateTypeLogsSchema>;

export type InformTimeoutData = z.infer<typeof informTimeoutSchema>;
export type SendLeaderboardData = {
  raceId: RaceId;
  leaderboard: AppLeaderboard;
};
