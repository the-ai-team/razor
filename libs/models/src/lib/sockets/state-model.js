"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateModelSchema = void 0;
const zod_1 = require("zod");
const leaderboard_1 = require("./leaderboard");
const player_1 = require("./player");
const playerLog_1 = require("./playerLog");
const race_1 = require("./race");
const tournament_1 = require("./tournament");
// ==== Schemas ==== //
exports.stateModelSchema = zod_1.z.object({
    tournamentsModel: zod_1.z.record(tournament_1.tournamentIdSchema, zod_1.z.object({
        state: zod_1.z.nativeEnum(tournament_1.TournamentState),
        raceIds: zod_1.z.array(race_1.raceIdSchema),
        playerIds: zod_1.z.array(player_1.playerIdSchema),
    })),
    playersModel: zod_1.z.record(player_1.playerIdSchema, zod_1.z.object({
        name: zod_1.z.string(),
        avatarLink: zod_1.z.string(),
        state: zod_1.z.nativeEnum(player_1.PlayerState),
        tournamentId: tournament_1.tournamentIdSchema,
    })),
    racesModel: zod_1.z.record(race_1.raceIdSchema, zod_1.z.object({
        text: zod_1.z.string(),
        timeoutDuration: zod_1.z.number(),
        startedTimestamp: zod_1.z.number(),
        players: zod_1.z.record(player_1.playerIdSchema, zod_1.z.object({
            name: zod_1.z.string(),
            avatarLink: zod_1.z.string(),
        })),
        isOnGoing: zod_1.z.boolean(),
        raceStartedBy: player_1.playerIdSchema,
    })),
    leaderboardsModel: zod_1.z.record(race_1.raceIdSchema, leaderboard_1.leaderboardSchema),
    playerLogsModel: zod_1.z.record(playerLog_1.playerLogIdSchema, zod_1.z.array(zod_1.z.object({
        timestamp: zod_1.z.number(),
        textLength: zod_1.z.number(),
    }))),
});
//# sourceMappingURL=state-model.js.map