"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardSchema = exports.PlayerStatus = void 0;
const zod_1 = require("zod");
const player_1 = require("./player");
// ==== Enums ==== //
/** Represents the different ways a player can finish the race. */
var PlayerStatus;
(function (PlayerStatus) {
    /** Player finished the race by completing the text */
    PlayerStatus["Complete"] = "complete";
    /** Player finished by timeout */
    PlayerStatus["Timeout"] = "timeout";
})(PlayerStatus || (exports.PlayerStatus = PlayerStatus = {}));
// ==== Compound Schemas ==== //
exports.leaderboardSchema = zod_1.z.array(zod_1.z.object({
    playerId: player_1.playerIdSchema,
    status: zod_1.z.nativeEnum(PlayerStatus),
    values: zod_1.z
        .object({
        wpm: zod_1.z.number(),
        elapsedTime: zod_1.z.number(),
    })
        .or(zod_1.z.object({
        distance: zod_1.z.number(),
    })),
}));
//# sourceMappingURL=leaderboard.js.map