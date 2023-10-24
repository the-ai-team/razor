"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RACE_END_WAIT_TIME = exports.TOURNAMENT_ID_LENGTH = exports.RACE_ID_LENGTH = exports.PLAYER_NAME_RANGE = exports.PLAYER_ID_LENGTH = exports.NANOID_ALPHABET = exports.MAX_ERR_LOGS_COUNT = exports.MAX_ALLOWED_TEXT_LENGTH = exports.GENERAL_ID_LENGTH = exports.AVERAGE_WPM = void 0;
/** Average WPM of a person who types on a physical keyboard.
 *
 * Use by,
 * - compute timeout util function
 */
exports.AVERAGE_WPM = 40;
/** Number of chars to create the unique part of the general ID.
 *
 * Example - **a1Bl365L**
 *
 * Use by
 * - generate uid util function (which will pass to nanoid)
 */
exports.GENERAL_ID_LENGTH = 8;
/** Maximum allowed text length
 *
 * Use by,
 * - text length of player log validation in sockets data models
 */
exports.MAX_ALLOWED_TEXT_LENGTH = 1000;
/** Max errors log count keeps on the state.
 *
 * Use by
 * - logger reducer
 */
exports.MAX_ERR_LOGS_COUNT = 1024;
/** Chars & digit collection to use to pick randomly and generate id.
 *
 * Use by
 * - nanoid (as a custom alphabet)
 */
exports.NANOID_ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
/** Number of chars to create the unique part of player ID.
 *
 * Example - P:**a1Bl365L**
 *
 * Use by
 * - generate uid util function (which will pass to nanoid)
 */
exports.PLAYER_ID_LENGTH = 8;
/** Required player name range length
 *
 * Minimum and maximum length respectively.
 *
 * Use by,
 * - player name validation in sockets data models
 */
exports.PLAYER_NAME_RANGE = [3, 12];
/** Number of digits to be included in the index part of race ID.
 *
 * Example - T:sktm2JVn-R:**050**
 *
 * Use by
 * - start countdown effect while creating race id.
 *
 */
exports.RACE_ID_LENGTH = 3;
/** Number of chars to create the unique part of tournament ID.
 *
 * Example - T:**a1Bl365L**
 *
 * Use by
 * - generate uid util function (which will pass to nanoid)
 */
exports.TOURNAMENT_ID_LENGTH = 8;
/** After server race timer ends, the server waits for a short time to receive race ending (either complete or timeout) logs from all players.
 * This waiting period accounts for players who may have started the race with a delay.
 * If logs are not received from all players by the end of the waiting period, the server will forcibly end the race.
 *
 * (Client starting timer {@link RACE_READY_COUNTDOWN} + Additional wait time)
 *
 */
exports.RACE_END_WAIT_TIME = 10; // seconds
//# sourceMappingURL=constants.js.map