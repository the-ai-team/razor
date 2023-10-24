import { z } from 'zod';
/** Player id template literal */
export type PlayerId = z.input<typeof playerIdSchema>;
export type AuthToken = string;
export type SocketId = string;
export declare enum PlayerState {
    /** **Player idle**
     *
     * When a player is not in a race but in the lobby.
     *
     * Possible actions:
     * In the lobby, In the leaderboard, etc.
     */
    Idle = "idle",
    /** **Player racing**
     *
     * When a player is in a race.
     *
     * Possible actions:
     * In race only.
     */
    Racing = "racing"
}
export declare const playerIdSchema: z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>;
export declare const playerNameSchema: z.ZodString;
export declare const playerSchema: z.ZodObject<{
    id: z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>;
    name: z.ZodString;
    avatarLink: z.ZodString;
    state: z.ZodNativeEnum<typeof PlayerState>;
}, "strip", z.ZodTypeAny, {
    id: `P:${string}`;
    name: string;
    avatarLink: string;
    state: PlayerState;
}, {
    id: `P:${string}`;
    name: string;
    avatarLink: string;
    state: PlayerState;
}>;
export type Player = z.infer<typeof playerSchema>;
export type PlayerProfile = Omit<Player, 'state'>;
