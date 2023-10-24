import { z } from 'zod';
import { AppLeaderboard, AppStateModel } from '../state';
import { PlayerId } from './player';
import { clearPlayerSchema, informTimeoutSchema, initialClientDataSchema, playerJoinSchema, sendTypeLogSchema, startRaceAcceptSchema, startRaceRequestSchema, updateTypeLogsSchema } from './protocol-schemas';
import { RaceId } from './race';
import { TournamentId } from './tournament';
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
export type InitialClientData = z.infer<typeof initialClientDataSchema>;
export type Snapshot = Omit<AppStateModel, 'errorLogsModel'>;
export interface InitialServerData {
    playerId: PlayerId;
    tournamentId: TournamentId;
    /** Game snapshot */
    snapshot: Snapshot;
}
export type PlayerJoinData = z.infer<typeof playerJoinSchema>;
export type ClearPlayerData = z.infer<typeof clearPlayerSchema>;
export type StartRaceRequestData = z.infer<typeof startRaceRequestSchema>;
export type StartRaceAcceptData = z.infer<typeof startRaceAcceptSchema>;
export type SendTypeLogData = z.infer<typeof sendTypeLogSchema>;
export type UpdateTypeLogsData = z.infer<typeof updateTypeLogsSchema>;
export type InformTimeoutData = z.infer<typeof informTimeoutSchema>;
export type SendLeaderboardData = {
    raceId: RaceId;
    leaderboard: AppLeaderboard;
};
