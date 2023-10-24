"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomIdSchema = exports.tournamentIdSchema = exports.timestampSchema = exports.TournamentState = void 0;
const constants_1 = require("@razor/constants");
const zod_1 = require("zod");
// ==== Enums ==== //
var TournamentState;
(function (TournamentState) {
    /** **Lobby**
     *
     * Every player is in the lobby.
     * (Race is not started yet.)
     */
    TournamentState["Lobby"] = "lobby";
    /** **Ready**
     *
     * Two or more players available in the lobby.
     * (Race is not started yet.)
     */
    TournamentState["Ready"] = "ready";
    /** **Countdown**
     *
     * A player pressed the `Play` button.
     */
    TournamentState["Countdown"] = "countdown";
    /** **Race**
     *
     * The race is ongoing.
     */
    TournamentState["Race"] = "race";
    /** **Leaderboard**
     *
     * The race is finished.
     */
    TournamentState["Leaderboard"] = "leaderboard";
    /** **Empty**
     *
     * Lobby has no players. Waiting to destroy the lobby.
     */
    TournamentState["Empty"] = "empty";
})(TournamentState || (exports.TournamentState = TournamentState = {}));
// ==== Primary Schemas ==== //
exports.timestampSchema = zod_1.z
    .number()
    .int()
    .nonnegative()
    .refine(value => value.toString().length === 13, 'Timestamp must be in milliseconds (13 digits).');
exports.tournamentIdSchema = zod_1.z.custom(id => /^T:[a-zA-Z0-9]{8}$/.test(id));
/** Room id
 * Room id is the last 8 characters of the tournament id.
 * Tournament id - T:abcdef12
 * Room id - abcdef12
 */
exports.roomIdSchema = zod_1.z
    .string()
    .length(constants_1.TOURNAMENT_ID_LENGTH)
    .regex(/^[a-zA-Z0-9_]+$/);
//# sourceMappingURL=tournament.js.map