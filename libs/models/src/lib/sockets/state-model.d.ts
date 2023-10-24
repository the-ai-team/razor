import { z } from 'zod';
import { PlayerState } from './player';
import { TournamentState } from './tournament';
export declare const stateModelSchema: z.ZodObject<{
    tournamentsModel: z.ZodRecord<z.ZodType<`T:${string}`, z.ZodTypeDef, `T:${string}`>, z.ZodObject<{
        state: z.ZodNativeEnum<typeof TournamentState>;
        raceIds: z.ZodArray<z.ZodType<`T:${string}-R:${string}`, z.ZodTypeDef, `T:${string}-R:${string}`>, "many">;
        playerIds: z.ZodArray<z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>, "many">;
    }, "strip", z.ZodTypeAny, {
        state: TournamentState;
        raceIds: `T:${string}-R:${string}`[];
        playerIds: `P:${string}`[];
    }, {
        state: TournamentState;
        raceIds: `T:${string}-R:${string}`[];
        playerIds: `P:${string}`[];
    }>>;
    playersModel: z.ZodRecord<z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>, z.ZodObject<{
        name: z.ZodString;
        avatarLink: z.ZodString;
        state: z.ZodNativeEnum<typeof PlayerState>;
        tournamentId: z.ZodType<`T:${string}`, z.ZodTypeDef, `T:${string}`>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        avatarLink: string;
        state: PlayerState;
        tournamentId: `T:${string}`;
    }, {
        name: string;
        avatarLink: string;
        state: PlayerState;
        tournamentId: `T:${string}`;
    }>>;
    racesModel: z.ZodRecord<z.ZodType<`T:${string}-R:${string}`, z.ZodTypeDef, `T:${string}-R:${string}`>, z.ZodObject<{
        text: z.ZodString;
        timeoutDuration: z.ZodNumber;
        startedTimestamp: z.ZodNumber;
        players: z.ZodRecord<z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>, z.ZodObject<{
            name: z.ZodString;
            avatarLink: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            avatarLink: string;
        }, {
            name: string;
            avatarLink: string;
        }>>;
        isOnGoing: z.ZodBoolean;
        raceStartedBy: z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>;
    }, "strip", z.ZodTypeAny, {
        text: string;
        timeoutDuration: number;
        startedTimestamp: number;
        players: Partial<Record<`P:${string}`, {
            name: string;
            avatarLink: string;
        }>>;
        isOnGoing: boolean;
        raceStartedBy: `P:${string}`;
    }, {
        text: string;
        timeoutDuration: number;
        startedTimestamp: number;
        players: Partial<Record<`P:${string}`, {
            name: string;
            avatarLink: string;
        }>>;
        isOnGoing: boolean;
        raceStartedBy: `P:${string}`;
    }>>;
    leaderboardsModel: z.ZodRecord<z.ZodType<`T:${string}-R:${string}`, z.ZodTypeDef, `T:${string}-R:${string}`>, z.ZodArray<z.ZodObject<{
        playerId: z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>;
        status: z.ZodNativeEnum<typeof import("./leaderboard").PlayerStatus>;
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
        status: import("./leaderboard").PlayerStatus;
        playerId: `P:${string}`;
    }, {
        values: {
            wpm: number;
            elapsedTime: number;
        } | {
            distance: number;
        };
        status: import("./leaderboard").PlayerStatus;
        playerId: `P:${string}`;
    }>, "many">>;
    playerLogsModel: z.ZodRecord<z.ZodType<`T:${string}-R:${string}-P:${string}`, z.ZodTypeDef, `T:${string}-R:${string}-P:${string}`>, z.ZodArray<z.ZodObject<{
        timestamp: z.ZodNumber;
        textLength: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        textLength: number;
        timestamp: number;
    }, {
        textLength: number;
        timestamp: number;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    tournamentsModel: Partial<Record<`T:${string}`, {
        state: TournamentState;
        raceIds: `T:${string}-R:${string}`[];
        playerIds: `P:${string}`[];
    }>>;
    playersModel: Partial<Record<`P:${string}`, {
        name: string;
        avatarLink: string;
        state: PlayerState;
        tournamentId: `T:${string}`;
    }>>;
    racesModel: Partial<Record<`T:${string}-R:${string}`, {
        text: string;
        timeoutDuration: number;
        startedTimestamp: number;
        players: Partial<Record<`P:${string}`, {
            name: string;
            avatarLink: string;
        }>>;
        isOnGoing: boolean;
        raceStartedBy: `P:${string}`;
    }>>;
    leaderboardsModel: Partial<Record<`T:${string}-R:${string}`, {
        values: {
            wpm: number;
            elapsedTime: number;
        } | {
            distance: number;
        };
        status: import("./leaderboard").PlayerStatus;
        playerId: `P:${string}`;
    }[]>>;
    playerLogsModel: Partial<Record<`T:${string}-R:${string}-P:${string}`, {
        textLength: number;
        timestamp: number;
    }[]>>;
}, {
    tournamentsModel: Partial<Record<`T:${string}`, {
        state: TournamentState;
        raceIds: `T:${string}-R:${string}`[];
        playerIds: `P:${string}`[];
    }>>;
    playersModel: Partial<Record<`P:${string}`, {
        name: string;
        avatarLink: string;
        state: PlayerState;
        tournamentId: `T:${string}`;
    }>>;
    racesModel: Partial<Record<`T:${string}-R:${string}`, {
        text: string;
        timeoutDuration: number;
        startedTimestamp: number;
        players: Partial<Record<`P:${string}`, {
            name: string;
            avatarLink: string;
        }>>;
        isOnGoing: boolean;
        raceStartedBy: `P:${string}`;
    }>>;
    leaderboardsModel: Partial<Record<`T:${string}-R:${string}`, {
        values: {
            wpm: number;
            elapsedTime: number;
        } | {
            distance: number;
        };
        status: import("./leaderboard").PlayerStatus;
        playerId: `P:${string}`;
    }[]>>;
    playerLogsModel: Partial<Record<`T:${string}-R:${string}-P:${string}`, {
        textLength: number;
        timestamp: number;
    }[]>>;
}>;
