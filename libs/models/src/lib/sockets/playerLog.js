"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerLogsCollectionSchema = exports.playerLogSchema = exports.playerLogIdSchema = void 0;
const constants_1 = require("@razor/constants");
const zod_1 = require("zod");
const player_1 = require("./player");
const tournament_1 = require("./tournament");
// ==== Primary Schemas ==== //
exports.playerLogIdSchema = zod_1.z.custom(id => /^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}-P:[a-zA-Z0-9]{8}$/.test(id));
// ==== Compound Schemas ==== //
exports.playerLogSchema = zod_1.z.object({
    /** Correctly typed length by player */
    textLength: zod_1.z.number().min(0).max(constants_1.MAX_ALLOWED_TEXT_LENGTH),
    /** Timestamp when player typed the last character */
    timestamp: tournament_1.timestampSchema,
});
exports.playerLogsCollectionSchema = zod_1.z.record(player_1.playerIdSchema, zod_1.z.array(exports.playerLogSchema));
//# sourceMappingURL=playerLog.js.map