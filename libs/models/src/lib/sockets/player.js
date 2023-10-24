"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playerSchema = exports.playerNameSchema = exports.playerIdSchema = exports.PlayerState = void 0;
const constants_1 = require("@razor/constants");
const zod_1 = require("zod");
// ==== Enums ==== //
var PlayerState;
(function (PlayerState) {
    /** **Player idle**
     *
     * When a player is not in a race but in the lobby.
     *
     * Possible actions:
     * In the lobby, In the leaderboard, etc.
     */
    PlayerState["Idle"] = "idle";
    /** **Player racing**
     *
     * When a player is in a race.
     *
     * Possible actions:
     * In race only.
     */
    PlayerState["Racing"] = "racing";
})(PlayerState || (exports.PlayerState = PlayerState = {}));
// ==== Primary Schemas ==== //
exports.playerIdSchema = zod_1.z.custom(id => /^P:[a-zA-Z0-9]{8}$/.test(id));
exports.playerNameSchema = zod_1.z
    .string()
    .min(constants_1.PLAYER_NAME_RANGE[0])
    .max(constants_1.PLAYER_NAME_RANGE[1])
    .regex(/^[a-zA-Z0-9_]+$/);
// ==== Compound Schemas ==== //
exports.playerSchema = zod_1.z.object({
    id: exports.playerIdSchema,
    name: exports.playerNameSchema,
    avatarLink: zod_1.z.string().url(),
    state: zod_1.z.nativeEnum(PlayerState),
});
//# sourceMappingURL=player.js.map