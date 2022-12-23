/** Max errors log count keeps on the state.
 *
 * Use by
 * - logger reducer
 */
export const MAX_ERR_LOGS_COUNT = 1024;

/** Number of chars to create the unique part of tournament ID.
 *
 * Example - T:**a1Bl365L**
 *
 * Use by
 * - generate uid util function (which will pass to nanoid)
 */
export const TOURNAMENT_ID_LENGTH = 8;

/** Number of chars to create the unique part of player ID.
 *
 * Example - P:**a1Bl365L**
 *
 * Use by
 * - generate uid util function (which will pass to nanoid)
 */
export const PLAYER_ID_LENGTH = 8;

/** Number of chars to create the unique part of the general ID.
 *
 * Example - **a1Bl365L**
 *
 * Use by
 * - generate uid util function (which will pass to nanoid)
 */
export const GENERAL_ID_LENGTH = 8;

/** Number of digits to be included in the index part of race ID.
 *
 * Example - T:sktm2JVn-R:**050**
 *
 * Use by
 * - start countdown effect while creating race id.
 *
 */
export const RACE_ID_LENGTH = 3;

/** Chars & digit collection to use to pick randomly and generate id.
 *
 * Use by
 * - nanoid (as a custom alphabet)
 */
export const NANOID_ALPHABET =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/** Average WPM of a person who types on a physical keyboard.
 *
 * Use by,
 * - compute timeout util function
 */
export const AVERAGE_WPM = 50;
