import { z } from 'zod';
/**
 * Related protocol - {@link SocketProtocols.AuthTokenTransfer}
 */
export declare const authTokenTransferSchema: z.ZodString;
/**
 * Related protocol - {@link SocketProtocols.JoinLobbyRequest} and {@link SocketProtocols.CreateLobbyRequest}
 */
export declare const initialClientDataSchema: z.ZodObject<{
    playerName: z.ZodString;
    roomId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    roomId?: string | undefined;
    playerName: string;
}, {
    roomId?: string | undefined;
    playerName: string;
}>;
/**
 * Related protocol - {@link SocketProtocols.CreateLobbyAccept} and {@link SocketProtocols.JoinLobbyAccept}
 */
export declare const initialServerDataSchema: z.ZodObject<{
    playerId: z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>;
    tournamentId: z.ZodType<`T:${string}`, z.ZodTypeDef, `T:${string}`>;
    snapshot: z.ZodObject<{
        tournamentsModel: z.ZodRecord<z.ZodType<`T:${string}`, z.ZodTypeDef, `T:${string}`>, z.ZodObject<{
            state: z.ZodNativeEnum<typeof import("./tournament").TournamentState>;
            raceIds: z.ZodArray<z.ZodType<`T:${string}-R:${string}`, z.ZodTypeDef, `T:${string}-R:${string}`>, "many">;
            playerIds: z.ZodArray<z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>, "many">;
        }, "strip", z.ZodTypeAny, {
            state: import("./tournament").TournamentState;
            raceIds: `T:${string}-R:${string}`[];
            playerIds: `P:${string}`[];
        }, {
            state: import("./tournament").TournamentState;
            raceIds: `T:${string}-R:${string}`[];
            playerIds: `P:${string}`[];
        }>>;
        playersModel: z.ZodRecord<z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>, z.ZodObject<{
            name: z.ZodString;
            avatarLink: z.ZodString;
            state: z.ZodNativeEnum<typeof import("./player").PlayerState>;
            tournamentId: z.ZodType<`T:${string}`, z.ZodTypeDef, `T:${string}`>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            avatarLink: string;
            state: import("./player").PlayerState;
            tournamentId: `T:${string}`;
        }, {
            name: string;
            avatarLink: string;
            state: import("./player").PlayerState;
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
            state: import("./tournament").TournamentState;
            raceIds: `T:${string}-R:${string}`[];
            playerIds: `P:${string}`[];
        }>>;
        playersModel: Partial<Record<`P:${string}`, {
            name: string;
            avatarLink: string;
            state: import("./player").PlayerState;
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
            state: import("./tournament").TournamentState;
            raceIds: `T:${string}-R:${string}`[];
            playerIds: `P:${string}`[];
        }>>;
        playersModel: Partial<Record<`P:${string}`, {
            name: string;
            avatarLink: string;
            state: import("./player").PlayerState;
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
}, "strip", z.ZodTypeAny, {
    playerId: `P:${string}`;
    tournamentId: `T:${string}`;
    snapshot: {
        tournamentsModel: Partial<Record<`T:${string}`, {
            state: import("./tournament").TournamentState;
            raceIds: `T:${string}-R:${string}`[];
            playerIds: `P:${string}`[];
        }>>;
        playersModel: Partial<Record<`P:${string}`, {
            name: string;
            avatarLink: string;
            state: import("./player").PlayerState;
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
    };
}, {
    playerId: `P:${string}`;
    tournamentId: `T:${string}`;
    snapshot: {
        tournamentsModel: Partial<Record<`T:${string}`, {
            state: import("./tournament").TournamentState;
            raceIds: `T:${string}-R:${string}`[];
            playerIds: `P:${string}`[];
        }>>;
        playersModel: Partial<Record<`P:${string}`, {
            name: string;
            avatarLink: string;
            state: import("./player").PlayerState;
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
    };
}>;
/**
 * Related protocol - {@link SocketProtocols.PlayerJoin}
 */
export declare const playerJoinSchema: z.ZodObject<{
    player: z.ZodObject<{
        id: z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>;
        name: z.ZodString;
        avatarLink: z.ZodString;
        state: z.ZodNativeEnum<typeof import("./player").PlayerState>;
    }, "strip", z.ZodTypeAny, {
        id: `P:${string}`;
        name: string;
        avatarLink: string;
        state: import("./player").PlayerState;
    }, {
        id: `P:${string}`;
        name: string;
        avatarLink: string;
        state: import("./player").PlayerState;
    }>;
}, "strip", z.ZodTypeAny, {
    player: {
        id: `P:${string}`;
        name: string;
        avatarLink: string;
        state: import("./player").PlayerState;
    };
}, {
    player: {
        id: `P:${string}`;
        name: string;
        avatarLink: string;
        state: import("./player").PlayerState;
    };
}>;
/**
 * Related protocol - {@link SocketProtocols.ClearPlayer}
 */
export declare const clearPlayerSchema: z.ZodObject<{
    playerId: z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>;
}, "strip", z.ZodTypeAny, {
    playerId: `P:${string}`;
}, {
    playerId: `P:${string}`;
}>;
/**
 * Related protocol - {@link SocketProtocols.StartRaceRequest}
 */
export declare const startRaceRequestSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
/**
 * Related protocol - {@link SocketProtocols.StartRaceAccept}
 */
export declare const startRaceAcceptSchema: z.ZodObject<{
    raceId: z.ZodType<`T:${string}-R:${string}`, z.ZodTypeDef, `T:${string}-R:${string}`>;
    raceStartedBy: z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>;
    raceText: z.ZodString;
}, "strip", z.ZodTypeAny, {
    raceStartedBy: `P:${string}`;
    raceId: `T:${string}-R:${string}`;
    raceText: string;
}, {
    raceStartedBy: `P:${string}`;
    raceId: `T:${string}-R:${string}`;
    raceText: string;
}>;
/**
 * Related protocol - {@link SocketProtocols.SendTypeLog}
 */
export declare const sendTypeLogSchema: z.ZodObject<{
    raceId: z.ZodType<`T:${string}-R:${string}`, z.ZodTypeDef, `T:${string}-R:${string}`>;
    playerLogs: z.ZodArray<z.ZodObject<{
        textLength: z.ZodNumber;
        timestamp: z.ZodEffects<z.ZodNumber, number, number>;
    }, "strip", z.ZodTypeAny, {
        textLength: number;
        timestamp: number;
    }, {
        textLength: number;
        timestamp: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    raceId: `T:${string}-R:${string}`;
    playerLogs: {
        textLength: number;
        timestamp: number;
    }[];
}, {
    raceId: `T:${string}-R:${string}`;
    playerLogs: {
        textLength: number;
        timestamp: number;
    }[];
}>;
/**
 * Related protocol - {@link SocketProtocols.UpdateTypeLogs}
 */
export declare const updateTypeLogsSchema: z.ZodObject<{
    raceId: z.ZodType<`T:${string}-R:${string}`, z.ZodTypeDef, `T:${string}-R:${string}`>;
    playerLogs: z.ZodRecord<z.ZodType<`P:${string}`, z.ZodTypeDef, `P:${string}`>, z.ZodArray<z.ZodObject<{
        textLength: z.ZodNumber;
        timestamp: z.ZodEffects<z.ZodNumber, number, number>;
    }, "strip", z.ZodTypeAny, {
        textLength: number;
        timestamp: number;
    }, {
        textLength: number;
        timestamp: number;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    raceId: `T:${string}-R:${string}`;
    playerLogs: Partial<Record<`P:${string}`, {
        textLength: number;
        timestamp: number;
    }[]>>;
}, {
    raceId: `T:${string}-R:${string}`;
    playerLogs: Partial<Record<`P:${string}`, {
        textLength: number;
        timestamp: number;
    }[]>>;
}>;
/**
 * Related protocol - {@link SocketProtocols.InformTimeout}
 */
export declare const informTimeoutSchema: z.ZodObject<{
    raceId: z.ZodType<`T:${string}-R:${string}`, z.ZodTypeDef, `T:${string}-R:${string}`>;
}, "strip", z.ZodTypeAny, {
    raceId: `T:${string}-R:${string}`;
}, {
    raceId: `T:${string}-R:${string}`;
}>;
/**
 * Related protocol - {@link SocketProtocols.SendLeaderboard}
 */
export declare const sendLeaderboardSchema: z.ZodObject<{
    raceId: z.ZodType<`T:${string}-R:${string}`, z.ZodTypeDef, `T:${string}-R:${string}`>;
    leaderboard: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    leaderboard: {
        values: {
            wpm: number;
            elapsedTime: number;
        } | {
            distance: number;
        };
        status: import("./leaderboard").PlayerStatus;
        playerId: `P:${string}`;
    }[];
    raceId: `T:${string}-R:${string}`;
}, {
    leaderboard: {
        values: {
            wpm: number;
            elapsedTime: number;
        } | {
            distance: number;
        };
        status: import("./leaderboard").PlayerStatus;
        playerId: `P:${string}`;
    }[];
    raceId: `T:${string}-R:${string}`;
}>;
export type ProtocolSchemaTypes = typeof authTokenTransferSchema | typeof initialClientDataSchema | typeof initialServerDataSchema | typeof playerJoinSchema | typeof startRaceRequestSchema | typeof startRaceAcceptSchema | typeof sendTypeLogSchema | typeof updateTypeLogsSchema | typeof informTimeoutSchema | typeof sendLeaderboardSchema;
