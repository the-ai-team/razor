import { z } from 'zod';
/** Represents the different ways a player can finish the race. */
export declare enum PlayerStatus {
    /** Player finished the race by completing the text */
    Complete = "complete",
    /** Player finished by timeout */
    Timeout = "timeout"
}
export declare const leaderboardSchema: z.ZodArray<z.ZodObject<{
    playerId: z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>;
    status: z.ZodNativeEnum<typeof PlayerStatus>;
    values: z.ZodUnion<[z.ZodObject<{
        wpm: z.ZodNumber;
        elapsedTime: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        wpm: number;
        elapsedTime: number;
    }, {
        wpm: number;
        elapsedTime: number;
    }>, z.ZodObject<{
        distance: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        distance: number;
    }, {
        distance: number;
    }>]>;
}, "strip", z.ZodTypeAny, {
    values: {
        wpm: number;
        elapsedTime: number;
    } | {
        distance: number;
    };
    status: PlayerStatus;
    playerId: `P:${string}`;
}, {
    values: {
        wpm: number;
        elapsedTime: number;
    } | {
        distance: number;
    };
    status: PlayerStatus;
    playerId: `P:${string}`;
}>, "many">;
