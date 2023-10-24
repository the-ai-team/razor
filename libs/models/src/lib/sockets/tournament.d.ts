import { z } from 'zod';
/** Tournament id template literal */
export type TournamentId = z.input<typeof tournamentIdSchema>;
/** Room id */
export type RoomId = z.input<typeof roomIdSchema>;
export declare enum TournamentState {
    /** **Lobby**
     *
     * Every player is in the lobby.
     * (Race is not started yet.)
     */
    Lobby = "lobby",
    /** **Ready**
     *
     * Two or more players available in the lobby.
     * (Race is not started yet.)
     */
    Ready = "ready",
    /** **Countdown**
     *
     * A player pressed the `Play` button.
     */
    Countdown = "countdown",
    /** **Race**
     *
     * The race is ongoing.
     */
    Race = "race",
    /** **Leaderboard**
     *
     * The race is finished.
     */
    Leaderboard = "leaderboard",
    /** **Empty**
     *
     * Lobby has no players. Waiting to destroy the lobby.
     */
    Empty = "empty"
}
export declare const timestampSchema: z.ZodEffects<z.ZodNumber, number, number>;
export declare const tournamentIdSchema: z.ZodType<`T:${string}`, z.ZodTypeDef, `T:${string}`>;
/** Room id
 * Room id is the last 8 characters of the tournament id.
 * Tournament id - T:abcdef12
 * Room id - abcdef12
 */
export declare const roomIdSchema: z.ZodString;
