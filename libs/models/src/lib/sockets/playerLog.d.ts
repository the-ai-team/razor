import { z } from 'zod';
/** Type for time-logs when players are typing */
export type PlayerLog = z.infer<typeof playerLogSchema>;
export type PlayerLogId = z.input<typeof playerLogIdSchema>;
/** Log collection or partial collection for a specific player. */
export type PlayerLogsCollection = z.infer<typeof playerLogsCollectionSchema>;
export declare const playerLogIdSchema: z.ZodType<`T:${string}-R:${string}-P:${string}`, z.ZodTypeDef, `T:${string}-R:${string}-P:${string}`>;
export declare const playerLogSchema: z.ZodObject<{
    /** Correctly typed length by player */
    textLength: z.ZodNumber;
    /** Timestamp when player typed the last character */
    timestamp: z.ZodEffects<z.ZodNumber, number, number>;
}, "strip", z.ZodTypeAny, {
    textLength: number;
    timestamp: number;
}, {
    textLength: number;
    timestamp: number;
}>;
export declare const playerLogsCollectionSchema: z.ZodRecord<z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>, z.ZodArray<z.ZodObject<{
    /** Correctly typed length by player */
    textLength: z.ZodNumber;
    /** Timestamp when player typed the last character */
    timestamp: z.ZodEffects<z.ZodNumber, number, number>;
}, "strip", z.ZodTypeAny, {
    textLength: number;
    timestamp: number;
}, {
    textLength: number;
    timestamp: number;
}>, "many">>;
