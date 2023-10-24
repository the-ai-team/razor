"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLeaderboardSchema = exports.informTimeoutSchema = exports.updateTypeLogsSchema = exports.sendTypeLogSchema = exports.startRaceAcceptSchema = exports.startRaceRequestSchema = exports.clearPlayerSchema = exports.playerJoinSchema = exports.initialServerDataSchema = exports.initialClientDataSchema = exports.authTokenTransferSchema = void 0;
const zod_1 = require("zod");
const leaderboard_1 = require("./leaderboard");
const player_1 = require("./player");
const playerLog_1 = require("./playerLog");
const race_1 = require("./race");
const state_model_1 = require("./state-model");
const tournament_1 = require("./tournament");
// Following schemas to be used when data sent through socket.
// Each schema is related to a protocol defined in {@link SocketProtocols}
/**
 * Related protocol - {@link SocketProtocols.AuthTokenTransfer}
 */
exports.authTokenTransferSchema = zod_1.z.string();
/**
 * Related protocol - {@link SocketProtocols.JoinLobbyRequest} and {@link SocketProtocols.CreateLobbyRequest}
 */
exports.initialClientDataSchema = zod_1.z.object({
    playerName: player_1.playerNameSchema,
    roomId: tournament_1.roomIdSchema.optional(),
});
/**
 * Related protocol - {@link SocketProtocols.CreateLobbyAccept} and {@link SocketProtocols.JoinLobbyAccept}
 */
exports.initialServerDataSchema = zod_1.z.object({
    playerId: player_1.playerIdSchema,
    tournamentId: tournament_1.tournamentIdSchema,
    snapshot: state_model_1.stateModelSchema,
});
/**
 * Related protocol - {@link SocketProtocols.PlayerJoin}
 */
exports.playerJoinSchema = zod_1.z.object({
    player: player_1.playerSchema,
});
/**
 * Related protocol - {@link SocketProtocols.ClearPlayer}
 */
exports.clearPlayerSchema = zod_1.z.object({
    playerId: player_1.playerIdSchema,
});
/**
 * Related protocol - {@link SocketProtocols.StartRaceRequest}
 */
exports.startRaceRequestSchema = zod_1.z.object({});
/**
 * Related protocol - {@link SocketProtocols.StartRaceAccept}
 */
exports.startRaceAcceptSchema = zod_1.z.object({
    raceId: race_1.raceIdSchema,
    raceStartedBy: player_1.playerIdSchema,
    raceText: zod_1.z.string(),
});
/**
 * Related protocol - {@link SocketProtocols.SendTypeLog}
 */
exports.sendTypeLogSchema = zod_1.z.object({
    raceId: race_1.raceIdSchema,
    playerLogs: zod_1.z.array(playerLog_1.playerLogSchema),
});
/**
 * Related protocol - {@link SocketProtocols.UpdateTypeLogs}
 */
exports.updateTypeLogsSchema = zod_1.z.object({
    raceId: race_1.raceIdSchema,
    playerLogs: playerLog_1.playerLogsCollectionSchema,
});
/**
 * Related protocol - {@link SocketProtocols.InformTimeout}
 */
exports.informTimeoutSchema = zod_1.z.object({
    raceId: race_1.raceIdSchema,
});
/**
 * Related protocol - {@link SocketProtocols.SendLeaderboard}
 */
exports.sendLeaderboardSchema = zod_1.z.object({
    raceId: race_1.raceIdSchema,
    leaderboard: leaderboard_1.leaderboardSchema,
});
//# sourceMappingURL=protocol-schemas.js.map