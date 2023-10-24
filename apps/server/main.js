/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(3), exports);
tslib_1.__exportStar(__webpack_require__(6), exports);


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(4), exports);
tslib_1.__exportStar(__webpack_require__(5), exports);


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {


// ### [Payloads] Data models for the effect payloads ### //
Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


// ### [Payloads] Data models for the reducer payloads ### //
Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initializeStore = exports.store = exports.models = exports.game = void 0;
const tslib_1 = __webpack_require__(1);
const core_1 = __webpack_require__(7);
const effects_1 = __webpack_require__(8);
const initialState_1 = __webpack_require__(60);
const reducers = tslib_1.__importStar(__webpack_require__(61));
exports.game = (0, core_1.createModel)()({
    state: initialState_1.initialState,
    reducers,
    effects: effects_1.effects,
});
/** Models for store
 *
 * `game` model has state, reducers and effects.
 * `state` will be initialized with initialState.
 * `reducers` contain core functionalities with store such as adding, updating, deleting.
 * `effects` contain calculating and generating operations which will pass down to reducers to add to the store.
 */
exports.models = { game: exports.game };
/** Redux rematch store
 *
 * Store has one model; game.
 */
exports.store = (0, core_1.init)({
    models: exports.models,
});
/** Function to initialize store
 *
 * This function will be used in tests to initialize many stores with custom initial state.
 * @param initialState - Initial state model
 * @returns Generated redux rematch store
 */
const initializeStore = (initialState) => {
    const game = (0, core_1.createModel)()({
        state: initialState,
        reducers,
        effects: effects_1.effects,
    });
    const models = { game };
    const store = (0, core_1.init)({
        models,
    });
    return store;
};
exports.initializeStore = initializeStore;


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@rematch/core");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(9), exports);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.effects = void 0;
const logger_1 = __webpack_require__(10);
const player_1 = __webpack_require__(51);
const race_1 = __webpack_require__(57);
const replacers_1 = __webpack_require__(58);
const tournament_1 = __webpack_require__(59);
/** Effects functions of the store
 *
 * Effects are calculating and generating operations which will pass the data to the reducers to dispatch to the store.
 */
const effects = (dispatch) => ({
    joinPlayer: (payload, state) => (0, player_1.joinPlayer)(dispatch, payload, state),
    addPlayer: (payload, state) => (0, player_1.addPlayer)(dispatch, payload, state),
    clearPlayer: (payload, state) => (0, player_1.clearPlayer)(dispatch, payload, state),
    setTournamentState: (payload, state) => (0, tournament_1.setTournamentState)(dispatch, payload, state),
    startRace: (payload, state) => (0, race_1.startRace)(dispatch, payload, state),
    endRace: (payload, state) => (0, race_1.endRace)(dispatch, payload, state),
    sendTypeLog: (payload, state) => (0, player_1.sendTypeLog)(dispatch, payload, state),
    sendLogMessage: (payload) => (0, logger_1.sendLogMessage)(dispatch, payload),
    replaceFullState: (payload) => (0, replacers_1.replaceFullState)(dispatch, payload),
});
exports.effects = effects;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// ### [Effects] Logger operations ### //
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendLogMessage = void 0;
const models_1 = __webpack_require__(11);
const util_1 = __webpack_require__(41);
/** Effect function for sending a log message.
 * This effect will check the type of the log message which comes from the payload
 * and do the relevant operation.
 *
 * @param {Dispatch} dispatch - The dispatch function from the store
 * @param {AppMessageLog} payload - The payload which contains the log message
 *
 * ### Related reducers and effects
 * - logErrorReducer
 */
const sendLogMessage = (dispatch, payload) => {
    /** Current unix timestamp */
    const timestamp = new Date().getTime();
    const { message, code, related, type } = payload;
    /** General random id */
    const randomId = (0, util_1.generateUid)(models_1.AppIdNumberType.General);
    switch (type) {
        // If the type is an error, send the error to the state and log in to the console as an error.
        case models_1.AppMessageLogType.Error:
            console.error(`[Error ${code}]: ${message} (${related})`);
            dispatch.game.logErrorReducer({
                errorLog: {
                    message,
                    code,
                    related,
                },
                errorTimestamp: `${timestamp}-${randomId}`,
            });
            break;
        // If the type is a warning, log in to the console as a warning.
        case models_1.AppMessageLogType.Warn:
            console.warn(`[Warn ${code}]: ${message} (${related})`);
            break;
        // If the type is info, log in to the console as info.
        case models_1.AppMessageLogType.Info:
            console.info(`[Info ${code}]: ${message} (${related})`);
            break;
    }
};
exports.sendLogMessage = sendLogMessage;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(12), exports);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(33), exports);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(13), exports);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.playerLogsToAppPlayerLogs = exports.playerStateToAppPlayerState = exports.appPlayerStateToPlayerState = void 0;
function appPlayerStateToPlayerState(state) {
    return state;
}
exports.appPlayerStateToPlayerState = appPlayerStateToPlayerState;
function playerStateToAppPlayerState(state) {
    return state;
}
exports.playerStateToAppPlayerState = playerStateToAppPlayerState;
function playerLogsToAppPlayerLogs(logs) {
    return logs;
}
exports.playerLogsToAppPlayerLogs = playerLogsToAppPlayerLogs;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(15), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(32), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.leaderboardSchema = exports.PlayerStatus = void 0;
const zod_1 = __webpack_require__(16);
const player_1 = __webpack_require__(17);
// ==== Enums ==== //
/** Represents the different ways a player can finish the race. */
var PlayerStatus;
(function (PlayerStatus) {
    /** Player finished the race by completing the text */
    PlayerStatus["Complete"] = "complete";
    /** Player finished by timeout */
    PlayerStatus["Timeout"] = "timeout";
})(PlayerStatus || (exports.PlayerStatus = PlayerStatus = {}));
// ==== Compound Schemas ==== //
exports.leaderboardSchema = zod_1.z.array(zod_1.z.object({
    playerId: player_1.playerIdSchema,
    status: zod_1.z.nativeEnum(PlayerStatus),
    values: zod_1.z
        .object({
        wpm: zod_1.z.number(),
        elapsedTime: zod_1.z.number(),
    })
        .or(zod_1.z.object({
        distance: zod_1.z.number(),
    })),
}));


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("zod");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.playerSchema = exports.playerNameSchema = exports.playerIdSchema = exports.PlayerState = void 0;
const constants_1 = __webpack_require__(18);
const zod_1 = __webpack_require__(16);
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


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RACE_READY_COUNTDOWN = exports.CLIENT_TYPE_LOG_INTERVAL = exports.REQUEST_WAITING_TIME = void 0;
// Waiting time for server response.
exports.REQUEST_WAITING_TIME = 8000;
// Client type log sending interval.
exports.CLIENT_TYPE_LOG_INTERVAL = 1000;
//  Race ready countdown time.
exports.RACE_READY_COUNTDOWN = 5;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SERVER_TYPE_LOG_INTERVAL = void 0;
// Server type log sending interval.
exports.SERVER_TYPE_LOG_INTERVAL = 1000;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MAX_ALLOWED_PLAYERS = exports.MIN_ALLOWED_PLAYERS = void 0;
exports.MIN_ALLOWED_PLAYERS = 2;
exports.MAX_ALLOWED_PLAYERS = 10;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RECONNECT_WAITING_TIME = void 0;
// After the user disconnects, the server will check if the user reconnected after this period.
exports.RECONNECT_WAITING_TIME = 10000; // 10 seconds


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.playerLogsCollectionSchema = exports.playerLogSchema = exports.playerLogIdSchema = void 0;
const constants_1 = __webpack_require__(18);
const zod_1 = __webpack_require__(16);
const player_1 = __webpack_require__(17);
const tournament_1 = __webpack_require__(25);
// ==== Primary Schemas ==== //
exports.playerLogIdSchema = zod_1.z.custom(id => /^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}-P:[a-zA-Z0-9]{8}$/.test(id));
// ==== Compound Schemas ==== //
exports.playerLogSchema = zod_1.z.object({
    /** Correctly typed length by player */
    textLength: zod_1.z.number().min(0).max(constants_1.MAX_ALLOWED_TEXT_LENGTH),
    /** Timestamp when player typed the last character */
    timestamp: tournament_1.timestampSchema,
});
exports.playerLogsCollectionSchema = zod_1.z.record(player_1.playerIdSchema, zod_1.z.array(exports.playerLogSchema));


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.roomIdSchema = exports.tournamentIdSchema = exports.timestampSchema = exports.TournamentState = void 0;
const constants_1 = __webpack_require__(18);
const zod_1 = __webpack_require__(16);
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


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendLeaderboardSchema = exports.informTimeoutSchema = exports.updateTypeLogsSchema = exports.sendTypeLogSchema = exports.startRaceAcceptSchema = exports.startRaceRequestSchema = exports.clearPlayerSchema = exports.playerJoinSchema = exports.initialServerDataSchema = exports.initialClientDataSchema = exports.authTokenTransferSchema = void 0;
const zod_1 = __webpack_require__(16);
const leaderboard_1 = __webpack_require__(15);
const player_1 = __webpack_require__(17);
const playerLog_1 = __webpack_require__(24);
const race_1 = __webpack_require__(28);
const state_model_1 = __webpack_require__(29);
const tournament_1 = __webpack_require__(25);
// Following schemas to be used when data sent through socket.
// Each schema is related to a protocol defined in {@link SocketProtocols}
/**
 * Related protocol - {@link SocketProtocols.AuthTokenTransfer}
 */
exports.authTokenTransferSchema = zod_1.z.string();
/**
 * Related protocol - {@link SocketProtocols.JoinLobbyRequest} and {@link SocketProtocols.CreateLobbyRequest}
 */
exports.initialClientDataSchema = zod_1.z.object({
    playerName: player_1.playerNameSchema,
    roomId: tournament_1.roomIdSchema.optional(),
});
/**
 * Related protocol - {@link SocketProtocols.CreateLobbyAccept} and {@link SocketProtocols.JoinLobbyAccept}
 */
exports.initialServerDataSchema = zod_1.z.object({
    playerId: player_1.playerIdSchema,
    tournamentId: tournament_1.tournamentIdSchema,
    snapshot: state_model_1.stateModelSchema,
});
/**
 * Related protocol - {@link SocketProtocols.PlayerJoin}
 */
exports.playerJoinSchema = zod_1.z.object({
    player: player_1.playerSchema,
});
/**
 * Related protocol - {@link SocketProtocols.ClearPlayer}
 */
exports.clearPlayerSchema = zod_1.z.object({
    playerId: player_1.playerIdSchema,
});
/**
 * Related protocol - {@link SocketProtocols.StartRaceRequest}
 */
exports.startRaceRequestSchema = zod_1.z.object({});
/**
 * Related protocol - {@link SocketProtocols.StartRaceAccept}
 */
exports.startRaceAcceptSchema = zod_1.z.object({
    raceId: race_1.raceIdSchema,
    raceStartedBy: player_1.playerIdSchema,
    raceText: zod_1.z.string(),
});
/**
 * Related protocol - {@link SocketProtocols.SendTypeLog}
 */
exports.sendTypeLogSchema = zod_1.z.object({
    raceId: race_1.raceIdSchema,
    playerLogs: zod_1.z.array(playerLog_1.playerLogSchema),
});
/**
 * Related protocol - {@link SocketProtocols.UpdateTypeLogs}
 */
exports.updateTypeLogsSchema = zod_1.z.object({
    raceId: race_1.raceIdSchema,
    playerLogs: playerLog_1.playerLogsCollectionSchema,
});
/**
 * Related protocol - {@link SocketProtocols.InformTimeout}
 */
exports.informTimeoutSchema = zod_1.z.object({
    raceId: race_1.raceIdSchema,
});
/**
 * Related protocol - {@link SocketProtocols.SendLeaderboard}
 */
exports.sendLeaderboardSchema = zod_1.z.object({
    raceId: race_1.raceIdSchema,
    leaderboard: leaderboard_1.leaderboardSchema,
});


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.raceIdSchema = void 0;
const zod_1 = __webpack_require__(16);
// ==== Primary Schemas ==== //
exports.raceIdSchema = zod_1.z.custom(id => /^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}$/.test(id));


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stateModelSchema = void 0;
const zod_1 = __webpack_require__(16);
const leaderboard_1 = __webpack_require__(15);
const player_1 = __webpack_require__(17);
const playerLog_1 = __webpack_require__(24);
const race_1 = __webpack_require__(28);
const tournament_1 = __webpack_require__(25);
// ==== Schemas ==== //
exports.stateModelSchema = zod_1.z.object({
    tournamentsModel: zod_1.z.record(tournament_1.tournamentIdSchema, zod_1.z.object({
        state: zod_1.z.nativeEnum(tournament_1.TournamentState),
        raceIds: zod_1.z.array(race_1.raceIdSchema),
        playerIds: zod_1.z.array(player_1.playerIdSchema),
    })),
    playersModel: zod_1.z.record(player_1.playerIdSchema, zod_1.z.object({
        name: zod_1.z.string(),
        avatarLink: zod_1.z.string(),
        state: zod_1.z.nativeEnum(player_1.PlayerState),
        tournamentId: tournament_1.tournamentIdSchema,
    })),
    racesModel: zod_1.z.record(race_1.raceIdSchema, zod_1.z.object({
        text: zod_1.z.string(),
        timeoutDuration: zod_1.z.number(),
        startedTimestamp: zod_1.z.number(),
        players: zod_1.z.record(player_1.playerIdSchema, zod_1.z.object({
            name: zod_1.z.string(),
            avatarLink: zod_1.z.string(),
        })),
        isOnGoing: zod_1.z.boolean(),
        raceStartedBy: player_1.playerIdSchema,
    })),
    leaderboardsModel: zod_1.z.record(race_1.raceIdSchema, leaderboard_1.leaderboardSchema),
    playerLogsModel: zod_1.z.record(playerLog_1.playerLogIdSchema, zod_1.z.array(zod_1.z.object({
        timestamp: zod_1.z.number(),
        textLength: zod_1.z.number(),
    }))),
});


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.protocolToSchemaMap = void 0;
const protocol_schemas_1 = __webpack_require__(27);
const protocols_1 = __webpack_require__(31);
// This map contains schemas for each protocols defined in {@link SocketProtocols}
exports.protocolToSchemaMap = new Map([
    [protocols_1.SocketProtocols.AuthTokenTransfer, protocol_schemas_1.authTokenTransferSchema],
    [protocols_1.SocketProtocols.JoinLobbyRequest, protocol_schemas_1.initialClientDataSchema],
    [protocols_1.SocketProtocols.JoinLobbyAccept, protocol_schemas_1.initialServerDataSchema],
    [protocols_1.SocketProtocols.CreateLobbyRequest, protocol_schemas_1.initialClientDataSchema],
    [protocols_1.SocketProtocols.CreateLobbyAccept, protocol_schemas_1.initialServerDataSchema],
    [protocols_1.SocketProtocols.PlayerJoin, protocol_schemas_1.playerJoinSchema],
    [protocols_1.SocketProtocols.ClearPlayer, protocol_schemas_1.clearPlayerSchema],
    [protocols_1.SocketProtocols.StartRaceRequest, protocol_schemas_1.startRaceRequestSchema],
    [protocols_1.SocketProtocols.StartRaceAccept, protocol_schemas_1.startRaceAcceptSchema],
    [protocols_1.SocketProtocols.SendTypeLog, protocol_schemas_1.sendTypeLogSchema],
    [protocols_1.SocketProtocols.UpdateTypeLogs, protocol_schemas_1.updateTypeLogsSchema],
    [protocols_1.SocketProtocols.InformTimeout, protocol_schemas_1.informTimeoutSchema],
    [protocols_1.SocketProtocols.SendLeaderboard, protocol_schemas_1.sendLeaderboardSchema],
]);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SocketProtocols = void 0;
/** Socket communication direction */
var TransferDirection;
(function (TransferDirection) {
    TransferDirection["FromServer"] = "FS";
    TransferDirection["FromServerToAll"] = "FS_ALL";
    TransferDirection["ToServer"] = "TS";
})(TransferDirection || (TransferDirection = {}));
/** Socket communication type
 * - Initial: All initial communications (e.g. Joining a lobby, Receiving snapshot by the player, Transfer token)
 * - Command: All commands (e.g. Start race, Reset lobby)
 * - Information: All information (e.g. Player joined, Sending leaderboard)
 */
var CommunicationType;
(function (CommunicationType) {
    CommunicationType["Initial"] = "INT";
    CommunicationType["Command"] = "CMD";
    CommunicationType["Information"] = "INF";
})(CommunicationType || (CommunicationType = {}));
var ProtocolName;
(function (ProtocolName) {
    ProtocolName["AuthToken"] = "AUTH_TOKEN";
    ProtocolName["JoinLobby"] = "JOIN_LOBBY";
    ProtocolName["PlayerJoin"] = "PLAYER_JOIN";
    ProtocolName["CreateLobby"] = "CREATE_LOBBY";
    ProtocolName["StartRace"] = "START_RACE";
    ProtocolName["SendTypeLog"] = "SEND_TYPE_LOG";
    ProtocolName["UpdateTypeLogs"] = "UPDATE_TYPE_LOGS";
    ProtocolName["Timeout"] = "TIMEOUT";
    // ForceEnd = 'FORCE_END',
    ProtocolName["SendLeaderboard"] = "SEND_LEADERBOARD";
    ProtocolName["ClearPlayer"] = "CLEAR_PLAYER";
    ProtocolName["ResetLobby"] = "RESET_LOBBY";
})(ProtocolName || (ProtocolName = {}));
var SocketProtocols;
(function (SocketProtocols) {
    // Auth
    SocketProtocols["AuthTokenTransfer"] = "FS/INT/AUTH_TOKEN";
    // Joining a lobby
    SocketProtocols["JoinLobbyRequest"] = "TS/INT/JOIN_LOBBY";
    SocketProtocols["JoinLobbyAccept"] = "FS/INT/JOIN_LOBBY";
    SocketProtocols["PlayerJoin"] = "FS_ALL/INF/PLAYER_JOIN";
    // Creating a lobby
    SocketProtocols["CreateLobbyRequest"] = "TS/INT/CREATE_LOBBY";
    SocketProtocols["CreateLobbyAccept"] = "FS/INT/CREATE_LOBBY";
    // Race start
    SocketProtocols["StartRaceRequest"] = "TS/CMD/START_RACE";
    SocketProtocols["StartRaceAccept"] = "FS/CMD/START_RACE";
    // Type logs
    SocketProtocols["SendTypeLog"] = "TS/INF/SEND_TYPE_LOG";
    SocketProtocols["UpdateTypeLogs"] = "FS_ALL/INF/UPDATE_TYPE_LOGS";
    // End race
    SocketProtocols["InformTimeout"] = "TS/INF/TIMEOUT";
    SocketProtocols["SendLeaderboard"] = "FS_ALL/INF/SEND_LEADERBOARD";
    // Clear a player
    SocketProtocols["ClearPlayer"] = "FS_ALL/CMD/CLEAR_PLAYER";
    // Reset lobby
    SocketProtocols["ResetLobby"] = "FS_ALL/CMD/RESET_LOBBY";
})(SocketProtocols || (exports.SocketProtocols = SocketProtocols = {}));


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const protocols_1 = __webpack_require__(31);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(34), exports);
tslib_1.__exportStar(__webpack_require__(35), exports);
tslib_1.__exportStar(__webpack_require__(36), exports);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(38), exports);
tslib_1.__exportStar(__webpack_require__(39), exports);
tslib_1.__exportStar(__webpack_require__(40), exports);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppPlayerStatus = void 0;
/** Player status after a race. */
var AppPlayerStatus;
(function (AppPlayerStatus) {
    AppPlayerStatus["Complete"] = "complete";
    AppPlayerStatus["Timeout"] = "timeout";
})(AppPlayerStatus || (exports.AppPlayerStatus = AppPlayerStatus = {}));


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppMessageLogType = exports.AppErrorCode = void 0;
/** Error codes */
var AppErrorCode;
(function (AppErrorCode) {
    AppErrorCode["TournamentNotExists"] = "TOURNAMNET_NOT_FOUND";
    AppErrorCode["PlayerNotExists"] = "PLAYER_NOT_FOUND";
    AppErrorCode["InvalidPlayerName"] = "INVALID_PLAYER_NAME";
    AppErrorCode["RaceNotExists"] = "RACE_NOT_FOUND";
    AppErrorCode["PayloadNotProvided"] = "PAYLOAD_NOT_PROVIDED";
})(AppErrorCode || (exports.AppErrorCode = AppErrorCode = {}));
/** Types of log messages. */
var AppMessageLogType;
(function (AppMessageLogType) {
    AppMessageLogType["Error"] = "error";
    AppMessageLogType["Info"] = "info";
    AppMessageLogType["Warn"] = "warn";
})(AppMessageLogType || (exports.AppMessageLogType = AppMessageLogType = {}));


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppPlayerState = void 0;
var AppPlayerState;
(function (AppPlayerState) {
    AppPlayerState["Idle"] = "idle";
    AppPlayerState["Racing"] = "racing";
})(AppPlayerState || (exports.AppPlayerState = AppPlayerState = {}));


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppTournamentState = void 0;
/** Tournament state */
var AppTournamentState;
(function (AppTournamentState) {
    AppTournamentState["Lobby"] = "lobby";
    AppTournamentState["Ready"] = "ready";
    AppTournamentState["Race"] = "race";
    AppTournamentState["Leaderboard"] = "leaderboard";
    AppTournamentState["Empty"] = "empty";
})(AppTournamentState || (exports.AppTournamentState = AppTournamentState = {}));


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppIdNumberType = void 0;
/** Id number type */
var AppIdNumberType;
(function (AppIdNumberType) {
    AppIdNumberType["Player"] = "player";
    AppIdNumberType["Tournament"] = "tournament";
    AppIdNumberType["General"] = "general";
})(AppIdNumberType || (exports.AppIdNumberType = AppIdNumberType = {}));


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(42), exports);
tslib_1.__exportStar(__webpack_require__(43), exports);
tslib_1.__exportStar(__webpack_require__(44), exports);
tslib_1.__exportStar(__webpack_require__(45), exports);
tslib_1.__exportStar(__webpack_require__(46), exports);
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);
tslib_1.__exportStar(__webpack_require__(50), exports);


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.computeRaceDuration = void 0;
const constants_1 = __webpack_require__(18);
/** Compute the time it would take for an average person to type given race text.
 *
 * @param text - Race text.
 * @returns Maximum allowed duration in seconds.
 */
const computeRaceDuration = (text) => {
    /** Average word count
     *
     * Assuming that the average word has 5 letters (and with the space 6 characters).
     */
    const wordCount = text.length / 6;
    const averageTime = Math.ceil((wordCount / constants_1.AVERAGE_WPM) * 60);
    const maximumAllowedTime = Math.ceil(averageTime * 1.35);
    return maximumAllowedTime;
};
exports.computeRaceDuration = computeRaceDuration;


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkValidityOfId = exports.extractId = exports.ExtractIdType = void 0;
var ExtractIdType;
(function (ExtractIdType) {
    ExtractIdType["Tournament"] = "tournament";
    ExtractIdType["Player"] = "player";
    ExtractIdType["Race"] = "race";
    ExtractIdType["PlayerLog"] = "playerLog";
})(ExtractIdType || (exports.ExtractIdType = ExtractIdType = {}));
/** Extract an id from a compound id
 *
 * @param inputId - Compound id to extract from.
 * @param inputIdType - Type of id to input id.
 * @param outputIdType - Type of id to extract.
 * @returns - Extracted id.
 */
const extractId = (inputId, inputIdType, outputIdType) => {
    if (inputIdType === outputIdType) {
        return inputId;
    }
    // Check the validity of the input id.
    const validInput = (0, exports.checkValidityOfId)(inputIdType, inputId);
    if (!validInput) {
        throw new Error('Invalid input value');
    }
    const splittedId = inputId.split('-');
    switch (outputIdType) {
        case ExtractIdType.Tournament:
            // Extract the first part of the id if the input id type is "race" or "playerLog".
            if (inputIdType === ExtractIdType.Race) {
                return splittedId[0];
            }
            else if (inputIdType === ExtractIdType.PlayerLog) {
                return splittedId[0];
            }
            else {
                throw new Error('Invalid type');
            }
        case ExtractIdType.Player:
            // Extract the second part of the id if the input id type is "playerLog".
            if (inputIdType === ExtractIdType.PlayerLog) {
                return splittedId[2];
            }
            else {
                throw new Error('Invalid type');
            }
        case ExtractIdType.Race:
            // Extract the first two parts of the id if the input id type is "playerLog".
            if (inputIdType === ExtractIdType.PlayerLog) {
                return `${splittedId[0]}-${splittedId[1]}`;
            }
            else {
                throw new Error('Invalid type');
            }
        default:
            throw new Error('Invalid type');
    }
};
exports.extractId = extractId;
/** Checking validity of an id
 *
 * @param type - Type of id to check.
 * @param id - Id to check.
 */
const checkValidityOfId = (type, id) => {
    switch (type) {
        case ExtractIdType.Tournament:
            return id.match(/^T:[a-zA-Z0-9]{8}$/);
        case ExtractIdType.Player:
            return id.match(/^P:[a-zA-Z0-9]{8}$/);
        case ExtractIdType.Race:
            return id.match(/^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}$/);
        case ExtractIdType.PlayerLog:
            return id.match(/^T:[a-zA-Z0-9]{8}-R:[a-zA-Z0-9]{3}-P:[a-zA-Z0-9]{8}$/);
    }
};
exports.checkValidityOfId = checkValidityOfId;


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateAvatarLink = void 0;
const generateAvatarLink = (playerName) => {
    /** Convert player name text to hex value to use as a seed. */
    const seed = bytesToHex(stringToUTF8Bytes(playerName));
    const image = `https://api.dicebear.com/7.x/open-peeps/svg?seed=${seed}&scale=80`;
    return image;
};
exports.generateAvatarLink = generateAvatarLink;
const bytesToHex = (bytes) => {
    return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
};
const stringToUTF8Bytes = (text) => {
    return new TextEncoder().encode(text);
};


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateLeaderboard = void 0;
const models_1 = __webpack_require__(11);
const extract_ids_1 = __webpack_require__(43);
/** Generate leaderboard for given player logs.
 *
 * @param playerLogs - Player logs to generate leaderboard from.
 * @param raceId - Race id to generate leaderboard for.
 * @param raceTextLength - Length of text for the race.
 * @returns Generated leaderboard.
 */
const generateLeaderboard = (playerLogs, raceId, raceTextLength) => {
    /** Entries for completed players of race. */
    const completeEntries = [];
    /** Entries for incomplete players of race. */
    const timeoutEntries = [];
    let playerLogId;
    for (playerLogId in playerLogs) {
        const raceIdOfPlayerLog = (0, extract_ids_1.extractId)(playerLogId, extract_ids_1.ExtractIdType.PlayerLog, extract_ids_1.ExtractIdType.Race);
        const playerIdOfPlayerLog = (0, extract_ids_1.extractId)(playerLogId, extract_ids_1.ExtractIdType.PlayerLog, extract_ids_1.ExtractIdType.Player);
        // Check whether the race owns the race log.
        if (raceIdOfPlayerLog === raceId) {
            const playerLogsLength = playerLogs[playerLogId].length;
            const playerLastTextLength = playerLogs[playerLogId][playerLogsLength - 1].textLength;
            // Check whether the player has finished the race by comparing the last logged text length of the player and the race text length.
            if (playerLastTextLength === raceTextLength) {
                const wpm = calculateWPM(raceTextLength, playerLogs[playerLogId]);
                // Elapsed time = (Last timestamp - First timestamp) / 1000 <= In seconds
                const elapsedTime = (playerLogs[playerLogId][playerLogsLength - 1].timestamp -
                    playerLogs[playerLogId][0].timestamp) /
                    1000;
                const finishedPlayerValues = {
                    wpm,
                    elapsedTime,
                };
                completeEntries.push({
                    playerId: playerIdOfPlayerLog,
                    status: models_1.AppPlayerStatus.Complete,
                    values: finishedPlayerValues,
                });
            }
            else {
                // Total length(distance) typed by the player = Last text length - First text length
                const distance = playerLogs[playerLogId][playerLogsLength - 1].textLength -
                    playerLogs[playerLogId][0].textLength;
                const timeoutPlayerValues = {
                    distance,
                };
                timeoutEntries.push({
                    playerId: playerIdOfPlayerLog,
                    status: models_1.AppPlayerStatus.Timeout,
                    values: timeoutPlayerValues,
                });
            }
        }
    }
    // Sort the entries of the completed players by wpm.
    completeEntries.sort((a, b) => b.values.wpm - a.values.wpm);
    // Sort the entries of the incomplete players by distance.
    timeoutEntries.sort((a, b) => b.values.distance - a.values.distance);
    // Merge the entries of the completed and incomplete players.
    const leaderboardEntries = [
        ...completeEntries,
        ...timeoutEntries,
    ];
    return leaderboardEntries;
};
exports.generateLeaderboard = generateLeaderboard;
/** Calculate average wpm.
 *
 * WPM is only calculated for the race-completed players.
 * Term Quaater is considered between two markers of race text length.
 *
 * @param length - Length of the text.
 * @param logs - Logs of a player.
 * @returns Average wpm.
 */
const calculateWPM = (length, logs) => {
    /** Placing markers(checkpoints) for race text length. This will partition race text length. */
    const mark1 = Math.floor(length * 0.25);
    const mark2 = Math.floor(length * 0.5);
    const mark3 = Math.floor(length * 0.75);
    /** Markers(checkpoints) for the timestamps of the player
     * [0] - Started timestamp
     * [1] - Second timestamp marker (0 by default)
     * [2] - Third timestamp marker (0 by default)
     * [3] - Fourth timestamp marker (0 by default)
     * [4] - Finished timestamp
     */
    const timestampCheckpoints = [
        logs[0].timestamp,
        0,
        0,
        0,
        logs[logs.length - 1].timestamp,
    ];
    /** Markers(checkpoints) for the player-typed text length
     * [0] - Started text length (Player starts at 0)
     * [1] - Second text length marker (0 by default)
     * [2] - Third text length marker (0 by default)
     * [3] - Fourth text length marker (0 by default)
     * [4] - Finished text length
     */
    const textLengthCheckpoints = [0, 0, 0, 0, length];
    //
    //  * Example values after the loop:
    //  timestampCheckpoints = [ 1234567000, 1234567021, 1234567050, 1234567076, 1234567102 ]
    //  textLengthCheckpoints = [ 0, 119, 241, 372, 500 ]
    //
    //  * Example 2:
    //  timestampCheckpoints = [ 1234567000, 1234567029, 1234567055, 1234567087, 1234567120 ]
    //  textLengthCheckpoints = [ 0, 120, 245, 375, 500 ]
    //
    for (let index = 0; index < logs.length; index++) {
        // Assigning player timestamp markers(checkpoints) & player text length markers(checkpoints)
        // These condition keeps updating checkpoint until the player logs reach the that marker.
        if (logs[index].textLength <= mark1) {
            timestampCheckpoints[1] = logs[index].timestamp;
            textLengthCheckpoints[1] = logs[index].textLength;
        }
        if (logs[index].textLength <= mark2) {
            timestampCheckpoints[2] = logs[index].timestamp;
            textLengthCheckpoints[2] = logs[index].textLength;
        }
        if (logs[index].textLength <= mark3) {
            timestampCheckpoints[3] = logs[index].timestamp;
            textLengthCheckpoints[3] = logs[index].textLength;
        }
    }
    let averageWPM = 0;
    /** Calculated WPMs for each quarter of the player */
    const quarterWPMs = [0, 0, 0, 0];
    for (let index = 0; index < timestampCheckpoints.length - 1; index++) {
        // Calculate the quarter WPM using the difference between the two timestamp checkpoints and the two text length checkpoints.
        // * From example 1:
        // calculateQuarterWPM(1234567021, 1234567050, 119, 241) = 2.4
        quarterWPMs[index] = calculateQuarterWPM(timestampCheckpoints[index], timestampCheckpoints[index + 1], textLengthCheckpoints[index], textLengthCheckpoints[index + 1]);
        averageWPM += quarterWPMs[index] / 4;
    }
    return +averageWPM.toFixed(2);
};
/** Calculate WPM for a quarter
 *
 * @returns WPM for specific quarter.
 */
const calculateQuarterWPM = (startTimestamp, endTimestamp, startTextLength, endTextLength) => {
    const timeElapsed = endTimestamp - startTimestamp;
    const textLength = endTextLength - startTextLength;
    // Avg. number of words in race text = textLength / 5 + 1 <= (Assuming that the average word has 5 letters (and with the space 6 characters))
    // WPM = Avg. words / Mintues
    const wpm = textLength / 6 / (timeElapsed / 1000 / 60);
    return wpm;
};


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateUid = void 0;
const constants_1 = __webpack_require__(18);
const models_1 = __webpack_require__(11);
const nanoid_1 = __webpack_require__(47);
/** Nanoid with custom alphabet */
const nanoid = (0, nanoid_1.customAlphabet)(constants_1.NANOID_ALPHABET, constants_1.GENERAL_ID_LENGTH);
/** Generate an unique id for given id type.
 *
 * @param type - Type of id to generate.
 * @returns - Generated id.
 */
const generateUid = (type) => {
    switch (type) {
        case models_1.AppIdNumberType.Tournament:
            return `T:${nanoid(constants_1.TOURNAMENT_ID_LENGTH)}`;
        case models_1.AppIdNumberType.Player:
            return `P:${nanoid(constants_1.PLAYER_ID_LENGTH)}`;
        default:
            return nanoid(constants_1.GENERAL_ID_LENGTH);
    }
};
exports.generateUid = generateUid;


/***/ }),
/* 47 */
/***/ ((module) => {

module.exports = require("nanoid");

/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.giveZeroPadding = void 0;
/** Give zero padding according to the size given.
 * (eg: if size is 3, 1 -> 001, 12 -> 012, 123 -> 123)
 *
 * @param num - Number to be padded.
 * @param size - Size of the padding.
 * @returns Padded number.
 */
const giveZeroPadding = (num, size) => {
    return `${num}`.padStart(size, '0');
};
exports.giveZeroPadding = giveZeroPadding;


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PubSub = void 0;
class PubSub {
    constructor() {
        this.events = {};
    }
    subscribe(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
        console.log(`Subscribed to ${eventName}`);
    }
    unsubscribe(eventName, fn) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
            console.log(`Unsubscribed from ${eventName}`);
        }
    }
    publish(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(fn => {
                fn(data);
            });
            console.log(`Published to ${eventName}`);
        }
    }
}
exports.PubSub = PubSub;


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.roomIdToTournamentId = exports.tournamentIdToRoomId = void 0;
const tournamentIdToRoomId = (tournamentId) => {
    return tournamentId.slice(2);
};
exports.tournamentIdToRoomId = tournamentIdToRoomId;
const roomIdToTournamentId = (roomId) => {
    return `T:${roomId}`;
};
exports.roomIdToTournamentId = roomIdToTournamentId;


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// ### [Effects] Player operations ### //
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendTypeLog = exports.clearPlayer = exports.addPlayer = exports.joinPlayer = void 0;
const models_1 = __webpack_require__(11);
const util_1 = __webpack_require__(41);
const raisers_1 = __webpack_require__(52);
/** Effect function for joining player.
 * Run the validation for the received payload.
 * If an id is provided, then the player will be joined to the tournament.
 * If an id is not provided, then the new tournament will be generated and the player will be joined to the new tournament.
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for joining player.
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - addTournamentReducer
 * - addPlayerReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - invalidPlayerName
 * - invalidPlayerNameLength
 * - tournamentNotFound
 */
const joinPlayer = (dispatch, payload, state) => {
    const { receivedTournamentId, playerName } = payload;
    // Tournament id with correct format.
    let tournamentId;
    // If the player name is not provided, call the raiser.
    if (!playerName) {
        (0, raisers_1.payloadNotProvided)(exports.joinPlayer.name, dispatch, 'playerName');
        return null;
    }
    // If the player name has an invalid length, call the raiser.
    if (playerName.length < 2 || playerName.length > 16) {
        (0, raisers_1.invalidPlayerNameLength)(dispatch);
        return null;
    }
    // If the player name has invalid characters, call the raiser.
    if (!playerName.match(/^[a-zA-Z0-9]+$/)) {
        (0, raisers_1.invalidPlayerName)(dispatch);
        return null;
    }
    // If the tournament id is provided,
    if (receivedTournamentId) {
        // If the tournament is not found, call the raiser.
        if (!state.game.tournamentsModel[receivedTournamentId]) {
            (0, raisers_1.tournamentNotFound)(dispatch, receivedTournamentId);
            return null;
        }
        // If the tournament is found, set the tournament id.
        tournamentId = receivedTournamentId;
        // Converting tournament state to "Lobby" from "Empty" if it had no players.
        if (state.game.tournamentsModel[receivedTournamentId].playerIds.length == 0) {
            dispatch.game.setTournamentState({
                tournamentId,
                tournamentState: models_1.AppTournamentState.Lobby,
            });
        }
        // Converting tournament state to "Ready" from "Lobby" if it has 2 or more players.
        if (state.game.tournamentsModel[receivedTournamentId].playerIds.length >= 1) {
            const tournamentState = state.game.tournamentsModel[receivedTournamentId].state;
            // Change to Ready only if the tournament is in Lobby state
            // (Don't change state if current state is Race or Leaderboard)
            if (tournamentState === models_1.AppTournamentState.Lobby) {
                dispatch.game.setTournamentState({
                    tournamentId,
                    tournamentState: models_1.AppTournamentState.Ready,
                });
            }
        }
    }
    else {
        // If the tournament id is not provided, generate a new tournament id.
        tournamentId = (0, util_1.generateUid)(models_1.AppIdNumberType.Tournament);
        // If the tournament id was not provided, then add a new tournament.
        dispatch.game.addTournamentReducer({
            tournamentId,
            tournament: {
                state: models_1.AppTournamentState.Lobby,
                raceIds: [],
                playerIds: [],
            },
        });
    }
    // Generate a new player id.
    const playerId = (0, util_1.generateUid)(models_1.AppIdNumberType.Player);
    // Add the new player.
    dispatch.game.addPlayerReducer({
        tournamentId,
        playerId: playerId,
        player: {
            name: playerName,
            avatarLink: (0, util_1.generateAvatarLink)(playerName),
            state: models_1.AppPlayerState.Idle,
            tournamentId,
        },
    });
    return playerId;
};
exports.joinPlayer = joinPlayer;
/** Effect function for adding player.
 * Run the validation for the received payload.
 * Player will be added to the tournament.
 * Tournament state will update with the given state.
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for adding player.
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - addPlayerReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - invalidPlayerName
 * - invalidPlayerNameLength
 * - tournamentNotFound
 */
const addPlayer = (dispatch, payload, state) => {
    const { playerId, player } = payload;
    const { name: playerName, avatarLink, state: playerState, tournamentId, } = player;
    // Validate the payload.
    if (!playerName) {
        (0, raisers_1.payloadNotProvided)(exports.addPlayer.name, dispatch, 'playerName');
        return;
    }
    if (!tournamentId) {
        (0, raisers_1.payloadNotProvided)(exports.addPlayer.name, dispatch, 'tournamentId');
        return;
    }
    if (playerName.length < 2 || playerName.length > 16) {
        (0, raisers_1.invalidPlayerNameLength)(dispatch);
        return;
    }
    if (!playerName.match(/^[a-zA-Z0-9]+$/)) {
        (0, raisers_1.invalidPlayerName)(dispatch);
        return;
    }
    // If the tournament is not found, call the raiser.
    if (!state.game.tournamentsModel[tournamentId]) {
        (0, raisers_1.tournamentNotFound)(dispatch, tournamentId);
        return;
    }
    // When adding a player lobby cannot be Empty
    // Converting tournament state to "Ready" only if state was "Lobby".
    const tournamentState = state.game.tournamentsModel[tournamentId].state;
    if (state.game.tournamentsModel[tournamentId].playerIds.length >= 1 &&
        tournamentState === models_1.AppTournamentState.Lobby) {
        dispatch.game.setTournamentState({
            tournamentId,
            tournamentState: models_1.AppTournamentState.Ready,
        });
    }
    // Add the new player.
    dispatch.game.addPlayerReducer({
        tournamentId,
        playerId: playerId,
        player: {
            name: playerName,
            avatarLink: avatarLink,
            state: playerState,
            tournamentId,
        },
    });
};
exports.addPlayer = addPlayer;
/** Effect function for clearing player.
 * Run the validation for the received payload.
 * If the player is found, then the player will be cleared.
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for clearing player.
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - removePlayerReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - playerNotFound
 */
const clearPlayer = (dispatch, payload, state) => {
    const { playerId } = payload;
    // If the player id is not provided, call the raiser.
    if (!playerId) {
        (0, raisers_1.payloadNotProvided)(exports.clearPlayer.name, dispatch, 'playerId');
        return;
    }
    // If the player is not found, call the raiser.
    if (!(playerId in state.game.playersModel)) {
        (0, raisers_1.playerNotFound)(dispatch, playerId);
        return;
    }
    // Tournament id of the player.
    const tournamentId = state.game.playersModel[playerId].tournamentId;
    // Remove the player.
    dispatch.game.removePlayerReducer({
        tournamentId,
        playerId,
    });
    // If player was the last member of the tournament, change the tournament state to empty
    const playerIdsInTournament = state.game.tournamentsModel[tournamentId].playerIds;
    if (playerIdsInTournament.length === 1) {
        if (playerIdsInTournament[0] === playerId) {
            dispatch.game.setTournamentState({
                tournamentId,
                tournamentState: models_1.AppTournamentState.Empty,
            });
        }
    }
};
exports.clearPlayer = clearPlayer;
/** Effect function for sending player logs while racing.
 * Run the validation for the received payload.
 * If the player and race are found, then the player logs will be sent.
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for sending player logs.
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - updatePlayerLogReducer
 *
 * ### Related raisers
 * - payloadNotProvided
 * - playerNotFound
 * - raceNotFound
 */
const sendTypeLog = (dispatch, payload, state) => {
    const { raceId, playerId, playerLog } = payload;
    // If the race id is not provided, call the raiser.
    if (!raceId) {
        (0, raisers_1.payloadNotProvided)(exports.sendTypeLog.name, dispatch, 'raceId');
        return;
    }
    // If the player id is not provided, call the raiser.
    if (!playerId) {
        (0, raisers_1.payloadNotProvided)(exports.sendTypeLog.name, dispatch, 'playerId');
        return;
    }
    // If the player is not found, call the raiser.
    if (!(playerId in state.game.playersModel)) {
        (0, raisers_1.playerNotFound)(dispatch, playerId);
        return;
    }
    // If the race is not found, call the raiser.
    if (!(raceId in state.game.racesModel)) {
        (0, raisers_1.raceNotFound)(dispatch, raceId);
        return;
    }
    // Player log id.
    const playerLogId = `${raceId}-${playerId}`;
    // Update the player log.
    dispatch.game.updatePlayerLogReducer({
        playerLogId,
        playerLog,
    });
};
exports.sendTypeLog = sendTypeLog;


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// Exporting raisers
// Raisers are customized functions to raise logs through sendLogMessage effect.
// Rasoers are used only in effects functions because effects are used by apps such as client and server.
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(53), exports);
tslib_1.__exportStar(__webpack_require__(54), exports);
tslib_1.__exportStar(__webpack_require__(55), exports);
tslib_1.__exportStar(__webpack_require__(56), exports);


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.payloadNotProvided = void 0;
const models_1 = __webpack_require__(11);
/** Logger raiser for payload not provided for a function.
 *
 * @param funcName - Name of the function which is raising the error.
 * @param dispatch - Dispatch function of the store.
 * @param payloadName - Missing payload item.
 */
const payloadNotProvided = (funcName, dispatch, payloadName) => {
    dispatch.game.sendLogMessage({
        message: `[${funcName}] ${payloadName} is not provided.`,
        code: models_1.AppErrorCode.PayloadNotProvided,
        related: '',
        type: models_1.AppMessageLogType.Error,
    });
};
exports.payloadNotProvided = payloadNotProvided;


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.invalidPlayerNameLength = exports.invalidPlayerName = exports.playerNotFound = void 0;
const models_1 = __webpack_require__(11);
/** Logger raiser if a player cannot be found in players model.
 *
 * @param dispatch - Dispatch function of the store.
 * @param playerId - Id of the player who is not found.
 * @param additionalMessage - Additional message to be logged.
 */
const playerNotFound = (dispatch, playerId, additionalMessage) => {
    dispatch.game.sendLogMessage({
        message: `Player with id ${playerId} does not exist.`,
        code: models_1.AppErrorCode.PlayerNotExists,
        related: additionalMessage || '',
        type: models_1.AppMessageLogType.Error,
    });
};
exports.playerNotFound = playerNotFound;
/** Logger raiser if a player name is invalid.
 *
 * @param dispatch - Dispatch function of the store.
 */
const invalidPlayerName = (dispatch) => {
    dispatch.game.sendLogMessage({
        message: 'Player name is invalid.',
        code: models_1.AppErrorCode.InvalidPlayerName,
        related: '',
        type: models_1.AppMessageLogType.Error,
    });
};
exports.invalidPlayerName = invalidPlayerName;
/** Logger raiser if a player name length is invalid.
 *
 * @param dispatch - Dispatch function of the store.
 */
const invalidPlayerNameLength = (dispatch) => {
    dispatch.game.sendLogMessage({
        message: `Player name is too long or too short`,
        code: models_1.AppErrorCode.InvalidPlayerName,
        related: '',
        type: models_1.AppMessageLogType.Error,
    });
};
exports.invalidPlayerNameLength = invalidPlayerNameLength;


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.raceNotFound = void 0;
const models_1 = __webpack_require__(11);
/** Logger raiser if a race cannot be found in races model.
 *
 * @param dispatch - Dispatch function of the store.
 * @param raceId - Id of the race which is not found.
 * @param additionalMessage - Additional message to be logged.
 */
const raceNotFound = (dispatch, raceId, additionalMessage) => {
    dispatch.game.sendLogMessage({
        message: `Race with id ${raceId} does not exist.`,
        code: models_1.AppErrorCode.RaceNotExists,
        related: additionalMessage || '',
        type: models_1.AppMessageLogType.Error,
    });
};
exports.raceNotFound = raceNotFound;


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tournamentNotFound = void 0;
const models_1 = __webpack_require__(11);
/** Logger raiser if a tournament cannot be found in the tournaments model.
 *
 * @param dispatch - Dispatch function of the store.
 * @param tid - Id of the tournament which is not found.
 * @param additionalMessage - Additional message to be logged.
 */
const tournamentNotFound = (dispatch, tid, additionalMessage) => {
    dispatch.game.sendLogMessage({
        message: `Tournament with id ${tid} does not exist.`,
        code: models_1.AppErrorCode.TournamentNotExists,
        related: additionalMessage || '',
        type: models_1.AppMessageLogType.Error,
    });
};
exports.tournamentNotFound = tournamentNotFound;


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// ### [Effects] Race operations ### //
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.endRace = exports.startRace = void 0;
const constants_1 = __webpack_require__(18);
const models_1 = __webpack_require__(11);
const util_1 = __webpack_require__(41);
const raisers_1 = __webpack_require__(52);
/** Effect function for starting the countdown of the race.
 * Run the validation for the received payload.
 * If the player who pressed the start button and the relevant tournament are found, then the countdown will be started.
 * Tournament state will be changed to "Countdown".
 *
 * @param dispatch - Dispatch function from the store.
 * @param payload - Payload for starting the countdown of the
 * @param state - Current state model.
 *
 * ### Related reducers and effects
 * - setTournamentState (effect)
 * - updatePlayerReducer
 * - updateRaceReducer
 *
 * ### Related raisers
 * - tournamentNotFound
 * - playerNotFound
 */
const startRace = (dispatch, payload, state) => {
    const { tournamentId, playerId, raceText } = payload;
    // TODO: check race is ready to start
    // If the tournament is not found, call the raiser.
    if (!(tournamentId in state.game.tournamentsModel)) {
        (0, raisers_1.tournamentNotFound)(dispatch, tournamentId, `Started by: ${playerId}`);
        return;
    }
    // If the player who started the tournament is not found, call the raiser.
    if (!(playerId in state.game.playersModel)) {
        (0, raisers_1.playerNotFound)(dispatch, playerId, `While tournament starting: ${tournamentId}`);
        return;
    }
    // Number of races played in the past in this tournament.
    const numberOfRacesBefore = state.game.tournamentsModel[tournamentId].raceIds.length || 0;
    // Race index for next tournament with zero padding. (e.g. 001, 002, 003...)
    const raceIndex = (0, util_1.giveZeroPadding)(numberOfRacesBefore.toString(), constants_1.RACE_ID_LENGTH);
    // Compound race id.
    const raceId = `${tournamentId}-R:${raceIndex}`;
    // Player profiles which need to add for the race details.
    const players = {};
    // Adding players in the tournament at this moment to the race.
    for (const id of state.game.tournamentsModel[tournamentId].playerIds) {
        // If the player is not found, call the raiser.
        if (!(id in state.game.playersModel)) {
            (0, raisers_1.playerNotFound)(dispatch, id, `While players are being added to: ${tournamentId}`);
            return;
        }
        else {
            // Take the player in players model.
            const player = state.game.playersModel[id];
            players[id] = {
                name: player.name,
                avatarLink: player.avatarLink,
            };
            // Updating player state in playersModel. ("Idle" -> "Racing")
            const playerData = Object.assign(Object.assign({}, player), { state: models_1.AppPlayerState.Racing });
            dispatch.game.updatePlayerReducer({
                playerId: id,
                player: playerData,
            });
        }
    }
    // Timeout duration for recived race text.
    const timeoutDuration = (0, util_1.computeRaceDuration)(raceText);
    // Race details.
    const race = {
        text: raceText,
        timeoutDuration: timeoutDuration,
        startedTimestamp: new Date().getTime(),
        players: players,
        isOnGoing: true,
        raceStartedBy: playerId,
    };
    // Updating tournament state in tournamentsModel. ("Ready" -> "Race")
    dispatch.game.setTournamentState({
        tournamentId,
        tournamentState: models_1.AppTournamentState.Race,
    });
    // Add race to races model.
    dispatch.game.addRaceReducer({
        raceId,
        race,
    });
};
exports.startRace = startRace;
/** Effect function for ending race of the tournament.
 * Run the validation for the received payload.
 * If the race is found, then the race will be ended.
 * Leaderboard will be generated.
 * Tournament state will be updated to "Leaderboard".
 *
 * @param dispatch - The dispatch function of the store.
 * @param payload - The payload of the action.
 * @param state - The state of the store.
 *
 * ### Related reducers and effects
 * - updateTournamentReducer
 * - updateRaceReducer
 * - addLeaderboardReducer
 * - updatePlayerReducer
 *
 * ### Related raisers
 * - raceNotFound
 */
const endRace = (dispatch, payload, state) => {
    const { raceId } = payload;
    // If the race is not found, call the raiser.
    if (!(raceId in state.game.racesModel)) {
        (0, raisers_1.raceNotFound)(dispatch, raceId, 'While race ending');
        return;
    }
    // Extract tournament id from race id.
    const tournamentId = (0, util_1.extractId)(raceId, util_1.ExtractIdType.Race, util_1.ExtractIdType.Tournament);
    // Set tournament state to Leaderboard.
    dispatch.game.setTournamentState({
        tournamentId,
        tournamentState: models_1.AppTournamentState.Leaderboard,
    });
    // Get received race text length.
    const raceTextLength = state.game.racesModel[raceId].text.length;
    // Get leaderboard from player logs and add leaderboard.
    const leaderboard = (0, util_1.generateLeaderboard)(state.game.playerLogsModel, raceId, raceTextLength);
    dispatch.game.addLeaderboardReducer({
        leaderboardId: raceId,
        leaderboard,
    });
    // End race.
    const race = Object.assign(Object.assign({}, state.game.racesModel[raceId]), { isOnGoing: false });
    dispatch.game.updateRaceReducer({
        raceId,
        race,
    });
    // Set player state to "Idle" of all players in the tournament.
    for (const id of state.game.tournamentsModel[tournamentId].playerIds) {
        if (id in state.game.playersModel &&
            state.game.playersModel[id].state != models_1.AppPlayerState.Idle) {
            const player = Object.assign(Object.assign({}, state.game.playersModel[id]), { state: models_1.AppPlayerState.Idle });
            dispatch.game.updatePlayerReducer({
                playerId: id,
                player,
            });
        }
    }
};
exports.endRace = endRace;


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceFullState = void 0;
/** Effect function for repalce full state
 * Replace the entire state with the given state.
 *
 * @param dispatch - The dispatch function of the store.
 * @param payload - The payload of the action.
 * @param state - The state of the store.
 *
 * ### Related reducers and effects
 * - replaceFullStateReducer
 *
 * ### Related raisers
 * - incompleteState
 */
const replaceFullState = (dispatch, payload) => {
    const { parentState } = payload;
    dispatch.game.replaceFullStateReducer({
        parentState,
    });
};
exports.replaceFullState = replaceFullState;


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setTournamentState = void 0;
const raisers_1 = __webpack_require__(52);
/** Effect function for setting tournament state.
 * Run the validation for the received payload.
 * If the tournament is found, then change the state of the tournament.
 *
 * @param dispatch - The dispatch function of the store.
 * @param payload - The payload of the action.
 * @param state - The state of the store.
 *
 * ### Related reducers and effects
 * - updateTournamentReducer
 *
 * ### Related raisers
 * - tournamentNotFound
 */
const setTournamentState = (dispatch, payload, state) => {
    const { tournamentId, tournamentState } = payload;
    if (!(tournamentId in state.game.tournamentsModel)) {
        (0, raisers_1.tournamentNotFound)(dispatch, tournamentId, `While setting ready`);
        return;
    }
    const tournament = Object.assign(Object.assign({}, state.game.tournamentsModel[tournamentId]), { state: tournamentState });
    dispatch.game.updateTournamentReducer({
        tournamentId,
        tournament,
    });
};
exports.setTournamentState = setTournamentState;


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initialState = void 0;
/** Initial empty state model */
exports.initialState = {
    tournamentsModel: {},
    playersModel: {},
    racesModel: {},
    leaderboardsModel: {},
    playerLogsModel: {},
    errorLogsModel: {},
};


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(62), exports);
tslib_1.__exportStar(__webpack_require__(63), exports);
tslib_1.__exportStar(__webpack_require__(65), exports);
tslib_1.__exportStar(__webpack_require__(66), exports);
tslib_1.__exportStar(__webpack_require__(67), exports);


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// ### [Reducers] Basic add operations for store ### //
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addLeaderboardReducer = exports.addPlayerReducer = exports.addRaceReducer = exports.addTournamentReducer = void 0;
const util_1 = __webpack_require__(41);
/** Reducer function for adding tournament to state model.
 * Tournament will be added to the tournaments model.
 *
 * @param state - Current state model
 * @param payload - Payload for add tournament
 * @returns New state model if successful, else current state model
 */
const addTournamentReducer = (state, payload) => {
    const { tournamentId, tournament } = payload;
    // If the tournament already exists.
    if (tournamentId in state.tournamentsModel) {
        return state;
    }
    /** State model with tournament added to tournaments model with data assigned. */
    const newState = Object.assign(Object.assign({}, state), { tournamentsModel: Object.assign(Object.assign({}, state.tournamentsModel), { [tournamentId]: tournament }) });
    return newState;
};
exports.addTournamentReducer = addTournamentReducer;
/** Reducer function for adding race to state model.
 * Race will be added to the races model and race id will be added to the relevant tournament.
 *
 * @param state - Current state model
 * @param payload - Payload for adding race
 * @returns New state model if successful, else current state model
 */
const addRaceReducer = (state, payload) => {
    const { raceId, race } = payload;
    /** Extract tournaemnt id from race id */
    const tournamentId = (0, util_1.extractId)(raceId, util_1.ExtractIdType.Race, util_1.ExtractIdType.Tournament);
    // If the tournament does not exists.
    if (!(tournamentId in state.tournamentsModel)) {
        return state;
    }
    // If race already exists.
    if (raceId in state.racesModel) {
        return state;
    }
    /** State model with new race added to races model and race id added to the tournament. */
    const newState = Object.assign(Object.assign({}, state), { tournamentsModel: Object.assign(Object.assign({}, state.tournamentsModel), { [tournamentId]: Object.assign(Object.assign({}, state.tournamentsModel[tournamentId]), { raceIds: [...state.tournamentsModel[tournamentId].raceIds, raceId] }) }), racesModel: Object.assign(Object.assign({}, state.racesModel), { [raceId]: Object.assign({}, race) }) });
    return newState;
};
exports.addRaceReducer = addRaceReducer;
/** Reducer function for adding a player to the state model.
 * Player will be added to the players model and the player id will be added to the relevant tournament.
 *
 * @param state - Current state model
 * @param payload - Payload for add leaderboard
 * @returns New state model if successful, else current state model
 */
const addPlayerReducer = (state, payload) => {
    const { tournamentId, playerId, player } = payload;
    // If the tournament does not exists.
    if (!(tournamentId in state.tournamentsModel)) {
        return state;
    }
    // If the player already exists.
    if (playerId in state.playersModel) {
        return state;
    }
    /** State model with new player added to players model and player id added to the tournament. */
    const newState = Object.assign(Object.assign({}, state), { tournamentsModel: Object.assign(Object.assign({}, state.tournamentsModel), { [tournamentId]: Object.assign(Object.assign({}, state.tournamentsModel[tournamentId]), { playerIds: [
                    ...state.tournamentsModel[tournamentId].playerIds,
                    playerId,
                ] }) }), playersModel: Object.assign(Object.assign({}, state.playersModel), { [playerId]: Object.assign({}, player) }) });
    return newState;
};
exports.addPlayerReducer = addPlayerReducer;
/** Reducer function for adding leaderboard to state model.
 * Leaderboard will be added to the leaderboards model.
 *
 * @param state - Current state model
 * @param payload - Payload for add leaderboard
 * @returns New state model if successful, else current state model
 */
const addLeaderboardReducer = (state, payload) => {
    const { leaderboardId, leaderboard } = payload;
    // If leaderboard already exists.
    if (leaderboardId in state.leaderboardsModel) {
        return state;
    }
    /** State model with new leaderboard added to leaderboards model. */
    const newState = Object.assign(Object.assign({}, state), { leaderboardsModel: Object.assign(Object.assign({}, state.leaderboardsModel), { [leaderboardId]: [...leaderboard] }) });
    return newState;
};
exports.addLeaderboardReducer = addLeaderboardReducer;


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// ### [Reducers] Basic logger operations for store ### //
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logErrorReducer = void 0;
const constants_1 = __webpack_require__(18);
const lodash_1 = __webpack_require__(64);
/** Reducer function for logging an error to state model.
 * Error will be added to the errors model.
 * If the errors model is at its max capacity, the oldest errors will be removed.
 
 * @param state - Current state model
 * @param payload - Payload for log error
 * @returns New state model if successful, else current state model
 */
const logErrorReducer = (state, payload) => {
    const { errorLog, errorTimestamp } = payload;
    let logModel = Object.assign({}, state.errorLogsModel);
    const maxLogs = constants_1.MAX_ERR_LOGS_COUNT;
    /** Current logs length */
    const logsLength = Object.keys(logModel).length;
    /** Number of logs exceeding the limit */
    let logDiff = maxLogs - logsLength;
    // While logs are exceeding the limit.
    while (logDiff <= 0) {
        /** Oldest log id */
        const lastKey = Object.keys(logModel)[0];
        /** New logs model after removing the oldest. */
        const newLogsModel = (0, lodash_1.omit)(logModel, [lastKey]);
        logModel = Object.assign({}, newLogsModel);
        logDiff++;
    }
    /** State model with new error log added to errors model. */
    const newState = Object.assign(Object.assign({}, state), { errorLogsModel: Object.assign(Object.assign({}, logModel), { [errorTimestamp]: errorLog }) });
    return newState;
};
exports.logErrorReducer = logErrorReducer;


/***/ }),
/* 64 */
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


// ### [Reducers] Basic remove operations for store ### //
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.removeTournamentReducer = exports.removePlayerReducer = void 0;
const lodash_1 = __webpack_require__(64);
/** Reducer function for removing the player from the state model.
 * Player will be removed from players model.
 * Related player ids array of the tournament will be updated.
 *
 * @param state - Current state model
 * @param payload - Payload for removing player
 * @returns New state model if successful, else current state model
 */
const removePlayerReducer = (state, payload) => {
    const { tournamentId, playerId } = payload;
    // If the player does not exists.
    if (!(playerId in state.playersModel)) {
        return state;
    }
    // If the tournament does not exists.
    if (!(tournamentId in state.tournamentsModel)) {
        return state;
    }
    /** New players model after removing specific player. */
    const newPlayersModel = (0, lodash_1.omit)(state.playersModel, [playerId]);
    /** State model after player removed from players model. */
    const newState = Object.assign(Object.assign({}, state), { tournamentsModel: Object.assign(Object.assign({}, state.tournamentsModel), { [tournamentId]: Object.assign(Object.assign({}, state.tournamentsModel[tournamentId]), { playerIds: state.tournamentsModel[tournamentId].playerIds.filter(id => id !== playerId) }) }), playersModel: Object.assign({}, newPlayersModel) });
    return newState;
};
exports.removePlayerReducer = removePlayerReducer;
/** Reducer function for removing tournament from state model.
 * Tournament will be removed from the tournament model.
 * Each player of the tournament will be removed from the players model.
 * Each race of the tournament will be removed from the races model.
 * Each player log of the tournament will be removed from the player logs model.
 *
 * @param state - Current state model
 * @param payload - Payload for removing tournament
 * @returns New state model if successful, else current state model
 */
const removeTournamentReducer = (state, payload) => {
    const { tournamentId } = payload;
    // If the tournament does not exists.
    if (!(tournamentId in state.tournamentsModel)) {
        return state;
    }
    /** Player ids array of the tournament. */
    const playerIds = state.tournamentsModel[tournamentId].playerIds;
    /** Race ids array of the tournament. */
    const raceIds = state.tournamentsModel[tournamentId].raceIds;
    /** Empty array for player log id. */
    let playerLogIds = [];
    // For every race in the tournament.
    raceIds.forEach((raceId) => {
        /** Relavant race in races model. */
        const race = state.racesModel[raceId];
        /** Every player ids of the race. */
        const playerIds = Object.keys(race.players);
        // Removing relevant player logs from player logs model.
        const specificPlayerLogsId = playerIds.map((playerId) => {
            return `${raceId}-${playerId}`;
        });
        playerLogIds = playerLogIds.concat(specificPlayerLogsId);
    });
    /** New tournaments model after removing specific tournaments. */
    const newTournamentModel = (0, lodash_1.omit)(state.tournamentsModel, [tournamentId]);
    /** State model after removing specific tournament. */
    const newState = Object.assign(Object.assign({}, state), { tournamentsModel: Object.assign({}, newTournamentModel) });
    // Generating new players model by removing all players of the tournament.
    playerIds.forEach(playerId => {
        const newPlayersModel = (0, lodash_1.omit)(newState.playersModel, [playerId]);
        newState.playersModel = Object.assign({}, newPlayersModel);
    });
    // Generating a new races model by removing all races of the tournament.
    raceIds.forEach(raceId => {
        const newRacesModel = (0, lodash_1.omit)(newState.racesModel, [raceId]);
        newState.racesModel = Object.assign({}, newRacesModel);
    });
    // Generating new player logs model by removing all player logs of the tournament.
    playerLogIds.forEach(playerLogId => {
        const newPlayerLogsModel = (0, lodash_1.omit)(state.playerLogsModel, [playerLogId]);
        newState.playerLogsModel = Object.assign({}, newPlayerLogsModel);
    });
    return newState;
};
exports.removeTournamentReducer = removeTournamentReducer;


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports) => {


// ### [Reducers] Replace operations for store ### //
// Replace functions will replace the state with the given payload. These methods will be used for syncing client state with server state.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceFullStateReducer = void 0;
/** Reducer function for replacing entire state.
 * Newly joining players will use this reducer to replace their current state with the state from the server.
 *
 * @param state - Current state model
 * @param payload - Payload for replacing state
 */
const replaceFullStateReducer = (state, payload) => {
    const { parentState } = payload;
    /** State model after replacing full game */
    const newState = Object.assign(Object.assign({}, parentState), { errorLogsModel: Object.assign({}, state.errorLogsModel) });
    return newState;
};
exports.replaceFullStateReducer = replaceFullStateReducer;


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports) => {


// ### [Reducers] Basic update operations for store ### //
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updatePlayerLogReducer = exports.updatePlayerReducer = exports.updateRaceReducer = exports.updateTournamentReducer = void 0;
/** Reducer function for updating a tournament in the state model.
 * Tournament in tournaments model will be updated with the given tournament.
 *
 * @param state - Current state model
 * @param payload - Payload for update tournament
 * @returns New state model if successful, else current state model
 */
const updateTournamentReducer = (state, payload) => {
    const { tournamentId, tournament } = payload;
    // If the tournament does not exists.
    if (!(tournamentId in state.tournamentsModel)) {
        return state;
    }
    /** State model after updating specific tournament in tournaments model. */
    const newState = Object.assign(Object.assign({}, state), { tournamentsModel: Object.assign(Object.assign({}, state.tournamentsModel), { [tournamentId]: Object.assign({}, tournament) }) });
    return newState;
};
exports.updateTournamentReducer = updateTournamentReducer;
/** Reducer function for updating a race in the state model.
 * Race in races model will be updated with the given race.
 *
 * @param state - Current state model
 * @param payload - Payload for update race
 * @returns New state model if successful, else current state model
 */
const updateRaceReducer = (state, payload) => {
    const { raceId, race } = payload;
    // If the race does not exists.
    if (!(raceId in state.racesModel)) {
        return state;
    }
    /** State model after updating specific race in races model. */
    const newState = Object.assign(Object.assign({}, state), { racesModel: Object.assign(Object.assign({}, state.racesModel), { [raceId]: Object.assign({}, race) }) });
    return newState;
};
exports.updateRaceReducer = updateRaceReducer;
/** Reducer function for updating a player in the state model.
 * Player in players model will be updated with the given player.
 *
 * @param state - Current state model
 * @param payload - Payload for update player
 * @returns New state model if successful, else current state model
 */
const updatePlayerReducer = (state, payload) => {
    const { playerId, player } = payload;
    // If the player does not exists.
    if (!(playerId in state.playersModel)) {
        return state;
    }
    /** State model after updating specific player in players model. */
    const newState = Object.assign(Object.assign({}, state), { playersModel: Object.assign(Object.assign({}, state.playersModel), { [playerId]: Object.assign({}, player) }) });
    return newState;
};
exports.updatePlayerReducer = updatePlayerReducer;
/** Reducer function for updating a player log-in state model.
 * Player log-in player logs model will be updated with the given player log.
 *
 * @param state - Current state model
 * @param payload - Payload for updating player log
 * @returns New state model if successful, else current state model
 */
const updatePlayerLogReducer = (state, payload) => {
    const { playerLogId, playerLog } = payload;
    const existingPlayerLogs = state.playerLogsModel[playerLogId] || [];
    const updatedPlayerLogs = Array.isArray(playerLog)
        ? [...existingPlayerLogs, ...playerLog]
        : [...existingPlayerLogs, playerLog];
    /** State model after updating specific player log-in player logs model. */
    const newState = Object.assign(Object.assign({}, state), { playerLogsModel: Object.assign(Object.assign({}, state.playerLogsModel), { [playerLogId]: updatedPlayerLogs }) });
    return newState;
};
exports.updatePlayerLogReducer = updatePlayerLogReducer;


/***/ }),
/* 68 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 69 */
/***/ ((module) => {

module.exports = require("http");

/***/ }),
/* 70 */
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(72), exports);
tslib_1.__exportStar(__webpack_require__(89), exports);
tslib_1.__exportStar(__webpack_require__(90), exports);
tslib_1.__exportStar(__webpack_require__(98), exports);
tslib_1.__exportStar(__webpack_require__(99), exports);
tslib_1.__exportStar(__webpack_require__(92), exports);
tslib_1.__exportStar(__webpack_require__(100), exports);


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const models_1 = __webpack_require__(11);
const store_1 = __webpack_require__(2);
const models_2 = __webpack_require__(73);
const services_1 = __webpack_require__(75);
const logger = new services_1.Logger('clear-player.controller');
const playerDisconnectController = ({ context, data, }) => {
    const { playerId } = data;
    const game = store_1.store.getState().game;
    const player = game.playersModel[playerId];
    const tournamentId = player.tournamentId;
    // Clear player from the store.
    store_1.store.dispatch.game.clearPlayer({ playerId });
    logger.info('Player cleared from store', context);
    (0, services_1.publishToAllClients)({
        tournamentId,
        protocol: models_1.SocketProtocols.ClearPlayer,
        data: { playerId },
    });
};
services_1.pubsub.subscribe(models_2.PubSubEvents.PlayerDisconnect, playerDisconnectController);


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(74), exports);


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PubSubEvents = void 0;
// TODO: change to ServerUniqueEvents
/** Pubsub events exceptional to server */
var PubSubEvents;
(function (PubSubEvents) {
    // Events publish by controllers
    /** This will usually trigger by controllers when an event need to send to a specific client.  */
    PubSubEvents["SendDataToClient"] = "send-data-to-client";
    /** This will usually trigger by controllers when an event need to send to all clients. */
    PubSubEvents["SendDataToAll"] = "send-data-to-all";
    // Events publish by services
    /** Notify the player-disconnect event to controllers. */
    PubSubEvents["PlayerDisconnect"] = "player-disconnect";
    /** Notify when the race ends.
     * The race can end in two ways: when the server timer runs out or when all players complete the race.
     * (Players will finish their race either due to a client timeout or by sending the last type log.)
     *
     * This event will be published in one of the following ways:
     * - From the start-race controller after the server race timeout.
     * - By updating the type-logs controller after all players have sent their last type log.
     * - By informing the timeout controller after all players have timed out on the client side.
     *
     * Subscribing to this event should be handled by the race-end controller.
     */
    PubSubEvents["RaceEnd"] = "race-end";
    /** Start and end events for type log listening.
     * Which push collected type logs to players at a specific interval
     * and clear type logs queue.
     */
    PubSubEvents["StartTypeLogListening"] = "type-log-listen-start";
    PubSubEvents["EndTypeLogListening"] = "type-log-listen-end";
})(PubSubEvents || (exports.PubSubEvents = PubSubEvents = {}));


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(76), exports);
tslib_1.__exportStar(__webpack_require__(84), exports);
tslib_1.__exportStar(__webpack_require__(86), exports);


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(77), exports);


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Logger = void 0;
const models_1 = __webpack_require__(11);
const store_1 = __webpack_require__(2);
const stores_1 = __webpack_require__(78);
const cloud_logger_1 = __webpack_require__(80);
const local_logger_1 = __webpack_require__(83);
let wlogger = null;
if (process.env.NODE_ENV === 'development') {
    wlogger = (0, local_logger_1.localLogger)();
}
else {
    wlogger = (0, cloud_logger_1.cloudLogger)();
}
class Logger {
    constructor(subject) {
        this.subject = subject;
    }
    createContext({ identifier }) {
        var _a, _b;
        let domainId;
        let socketId = '';
        let playerId;
        // When creating context both playerId and socketId can be used as identifier.
        // here we are checking whether identifier is playerId or socketId.
        if (models_1.playerIdSchema.safeParse(identifier).success) {
            playerId = identifier;
            socketId = stores_1.tokenPlayerMap.getSocketIdByPlayerId(identifier);
            // Update domain id as race id if tournament is in race state. else update as tournament id.
            const game = store_1.store.getState().game;
            const tournamentId = ((_a = game.playersModel[identifier]) === null || _a === void 0 ? void 0 : _a.tournamentId) || null;
            if (((_b = game.tournamentsModel[tournamentId]) === null || _b === void 0 ? void 0 : _b.state) === models_1.AppTournamentState.Race) {
                const raceIds = game.tournamentsModel[tournamentId].raceIds;
                const raceId = raceIds[raceIds.length - 1];
                domainId = raceId;
            }
            else {
                domainId = tournamentId;
            }
        }
        else {
            socketId = identifier;
        }
        return {
            subject: this.subject,
            playerId,
            socketId,
            domainId,
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(message, context, additionalData) {
        wlogger.error(message, Object.assign({ context }, additionalData));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn(message, context, additionalData) {
        wlogger.warn(message, Object.assign({ context }, additionalData));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info(message, context, additionalData) {
        wlogger.info(message, Object.assign({ context }, additionalData));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug(message, context, additionalData) {
        wlogger.debug(message, Object.assign({ context }, additionalData));
    }
}
exports.Logger = Logger;


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(79), exports);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tokenPlayerMap = void 0;
class TokenPlayerMap {
    constructor() {
        this.map = new Map();
    }
    /** Create new map entry with auth token and socket Id.
     * @param authToken - auth token of the player
     * @param socketId - socket id of the player
     */
    addSocketId(authToken, socketId) {
        this.map.set(authToken, { socketId });
    }
    /** Add player id to the existing map entry.
     * @param socketId - socket id of the player
     * @param playerId - player id of the player
     */
    addPlayerId(socketId, playerId) {
        for (const [key, value] of this.map.entries()) {
            if (value.socketId === socketId) {
                this.map.set(key, Object.assign(Object.assign({}, value), { playerId }));
            }
        }
    }
    /** Get player data using auth token .
     * @param authToken - auth token of the player
     * @returns player data if player exists, null otherwise
     */
    getPlayer(authToken) {
        const data = this.map.get(authToken);
        if (data) {
            return data;
        }
        return null;
    }
    /** Update existing player socket id. If player does not exist, throw error.
     * @param authToken - auth token of the player
     * @param socketId - socket id of the player
     */
    updatePlayerSocketId(authToken, socketId) {
        const data = this.map.get(authToken);
        if (data) {
            this.map.set(authToken, Object.assign(Object.assign({}, data), { socketId }));
        }
        else {
            throw new Error('Player does not exist');
        }
    }
    /** Get player id using socket id.
     * @param socketId - socket id of the player
     * @returns player id if player exists, null otherwise
     */
    getPlayerIdBySocketId(socketId) {
        for (const [_key, value] of this.map.entries()) {
            if (value.socketId === socketId) {
                return value.playerId;
            }
        }
        return null;
    }
    /** Get socket id using player id.
     * @param playerId - player id of the player
     * @returns socket id if player exists, null otherwise
     */
    getSocketIdByPlayerId(playerId) {
        for (const [_key, value] of this.map.entries()) {
            if (value.playerId === playerId) {
                return value.socketId;
            }
        }
        return null;
    }
    /** Get auth token using socket id.
     * @param socketId - socket id of the player
     * @returns auth token if player exists, null otherwise
     */
    getAuthTokenBySocketId(socketId) {
        for (const [key, value] of this.map.entries()) {
            if (value.socketId === socketId) {
                return key;
            }
        }
        return null;
    }
    /** Get all entries
     * @returns - map as a object
     */
    viewMap() {
        return Object.fromEntries(this.map);
    }
    /** Clear a player from the map.
     * @param authToken - auth token of the player
     */
    clearPlayer(authToken) {
        this.map.delete(authToken);
    }
}
exports.tokenPlayerMap = new TokenPlayerMap();


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cloudLogger = void 0;
const tslib_1 = __webpack_require__(1);
const winston_1 = __webpack_require__(81);
const levels_1 = __webpack_require__(82);
const { combine, errors, printf } = winston_1.format;
// Google Cloud Severity Levels
const severityMap = new Map([
    [levels_1.LogLevels.Error, 'ERROR'],
    [levels_1.LogLevels.Warn, 'WARNING'],
    [levels_1.LogLevels.Info, 'INFO'],
    [levels_1.LogLevels.Debug, 'DEBUG'],
]);
const logFormat = printf((_a) => {
    var { service, context, level, message } = _a, args = tslib_1.__rest(_a, ["service", "context", "level", "message"]);
    const { subject } = context, contextData = tslib_1.__rest(context, ["subject"]);
    const log = {
        service,
        subject,
        severity: severityMap.get(level),
        message,
        context: Object.assign({}, contextData),
        args: Object.keys(args).length ? args : undefined,
    };
    return JSON.stringify(log);
});
const cloudLogger = () => {
    return (0, winston_1.createLogger)({
        level: 'debug',
        levels: levels_1.logLevels,
        format: combine(errors({ stack: true }), logFormat),
        defaultMeta: { service: 'LOGGER' },
        transports: [new winston_1.transports.Console()],
    });
};
exports.cloudLogger = cloudLogger;


/***/ }),
/* 81 */
/***/ ((module) => {

module.exports = require("winston");

/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logLevels = exports.LogLevels = void 0;
var LogLevels;
(function (LogLevels) {
    LogLevels["Error"] = "error";
    LogLevels["Warn"] = "warn";
    LogLevels["Info"] = "info";
    LogLevels["Debug"] = "debug";
})(LogLevels || (exports.LogLevels = LogLevels = {}));
exports.logLevels = {
    [LogLevels.Error]: 0,
    [LogLevels.Warn]: 1,
    [LogLevels.Info]: 2,
    [LogLevels.Debug]: 3,
};


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.localLogger = void 0;
const tslib_1 = __webpack_require__(1);
const winston_1 = __webpack_require__(81);
const levels_1 = __webpack_require__(82);
const { printf, timestamp, combine, colorize, errors } = winston_1.format;
const logFormat = printf((_a) => {
    var { service, level, message, timestamp, context } = _a, args = tslib_1.__rest(_a, ["service", "level", "message", "timestamp", "context"]);
    const { subject } = context, contextData = tslib_1.__rest(context, ["subject"]);
    const additionalData = {
        contextData,
        args: Object.keys(args).length ? args : undefined,
    };
    return `[${service}] (${subject}) ${level}: ${timestamp} - ${message} - ${JSON.stringify(additionalData)}`;
});
const localLogger = () => {
    (0, winston_1.addColors)({
        error: 'bold red',
        warn: 'bold yellow',
        info: 'blue',
        debug: 'dim white',
    });
    return (0, winston_1.createLogger)({
        level: 'debug',
        levels: levels_1.logLevels,
        format: combine(colorize({ all: true }), errors({ stack: true }), timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }), logFormat),
        defaultMeta: { service: 'LOGGER' },
        transports: [
            new winston_1.transports.Console(),
            new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
            new winston_1.transports.File({ filename: 'combined.log' }),
        ],
    });
};
exports.localLogger = localLogger;


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(85), exports);
tslib_1.__exportStar(__webpack_require__(87), exports);
tslib_1.__exportStar(__webpack_require__(88), exports);


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkReconnected = void 0;
const constants_1 = __webpack_require__(18);
const models_1 = __webpack_require__(73);
const stores_1 = __webpack_require__(78);
const logger_1 = __webpack_require__(76);
const pubsub_1 = __webpack_require__(86);
function checkReconnected(authToken, io) {
    const logger = new logger_1.Logger('reconnector');
    setTimeout(() => {
        var _a;
        if (!stores_1.tokenPlayerMap.getPlayer(authToken)) {
            return;
        }
        // Get socket id from current player data. If player connected again socket id should be already updated.
        const { socketId, playerId } = stores_1.tokenPlayerMap.getPlayer(authToken);
        // Creating context again if player reconnected some properties may be changed (such as socket id).
        const context = logger.createContext({ identifier: playerId });
        const isSocketConnected = (_a = io.sockets.sockets.get(socketId)) === null || _a === void 0 ? void 0 : _a.connected;
        if (!isSocketConnected) {
            // If player still not connected then delete the player from map.
            stores_1.tokenPlayerMap.clearPlayer(authToken);
            logger.debug(`User deleted from the map after waiting for ${constants_1.RECONNECT_WAITING_TIME}ms.`, context);
            pubsub_1.pubsub.publish(models_1.PubSubEvents.PlayerDisconnect, {
                data: {
                    playerId,
                },
                context,
            });
        }
        else {
            logger.debug('User already connected from a new socket.', context);
        }
    }, constants_1.RECONNECT_WAITING_TIME);
}
exports.checkReconnected = checkReconnected;


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.publishToAllClients = exports.publishToSingleClient = exports.pubsub = void 0;
const util_1 = __webpack_require__(41);
const models_1 = __webpack_require__(73);
/**
 * Server pubsub has two types of events
 * 1. socket events from client - when client sends socket event it will be published to server pubsub
 *    Related event mapping - {@link socketEventsMap}
 * 2. server events - events triggered by server
 *    Related events - {@link PubSubEvents}
 */
exports.pubsub = new util_1.PubSub();
function publishToSingleClient({ playerId, protocol, data, }) {
    exports.pubsub.publish(models_1.PubSubEvents.SendDataToClient, {
        playerId,
        protocol,
        data,
    });
}
exports.publishToSingleClient = publishToSingleClient;
function publishToAllClients({ tournamentId, protocol, data, }) {
    exports.pubsub.publish(models_1.PubSubEvents.SendDataToAll, {
        tournamentId,
        protocol,
        data,
    });
}
exports.publishToAllClients = publishToAllClients;


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.publishOnReceive = void 0;
const models_1 = __webpack_require__(11);
const store_1 = __webpack_require__(2);
const stores_1 = __webpack_require__(78);
const logger_1 = __webpack_require__(76);
const pubsub_1 = __webpack_require__(86);
const logger = new logger_1.Logger('receiver');
function validateSchema({ event, data, context, }) {
    try {
        const schema = models_1.protocolToSchemaMap.get(event);
        schema.parse(data);
        return true;
    }
    catch (error) {
        logger.warn(`Received data invalid. (zod-error) ${error}`, context, {
            protocolName: event,
            protocolData: data,
        });
        return false;
    }
}
function publishOnReceive({ event, data, socket, }) {
    var _a;
    let context;
    if (event === models_1.SocketProtocols.JoinLobbyRequest ||
        event === models_1.SocketProtocols.CreateLobbyRequest) {
        // If player is new, player may not have playerId yet. So we use socket id to create context and publish event.
        // Player id will be created in the controller.
        const socketId = socket.id;
        context = logger.createContext({ identifier: socketId });
        const isValid = validateSchema({ event, data, context });
        if (!isValid) {
            return;
        }
        pubsub_1.pubsub.publish(event, { data, context, socketId });
    }
    else {
        const playerId = stores_1.tokenPlayerMap.getPlayerIdBySocketId(socket.id);
        if (!playerId) {
            logger.warn('Player not found.', context);
            return;
        }
        // Creating logger context
        context = logger.createContext({ identifier: playerId });
        const isValid = validateSchema({ event, data, context });
        if (!isValid) {
            return;
        }
        // Get allocated socket room id/s (In socket io first id is always individual socket id)
        const socketRoomIds = (_a = [...socket.rooms]) === null || _a === void 0 ? void 0 : _a.slice(1);
        if (!socketRoomIds) {
            logger.warn('Player not belongs to any rooms.', context);
            return;
        }
        // If player assigned to multiple rooms, we will use the last room id.
        const socketRoomId = socketRoomIds[socketRoomIds.length - 1];
        const game = store_1.store.getState().game;
        // Verify room id with tournament id in store.
        const tournament = game.tournamentsModel[socketRoomId];
        if (!tournament) {
            logger.warn('The tournament which related to socket room is not available in the store.', context);
            return;
        }
        // Verify whether player belongs to the tournament.
        if (tournament.playerIds.includes(playerId) === false) {
            logger.warn('Player not belongs to the tournament.', context);
            return;
        }
        pubsub_1.pubsub.publish(event, {
            data,
            context,
            playerId,
            tournamentId: socketRoomId,
        });
    }
    logger.info(`Protocol: ${event} | Message received.`, context, { data });
}
exports.publishOnReceive = publishOnReceive;


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.emitSocketMessages = void 0;
const models_1 = __webpack_require__(11);
const models_2 = __webpack_require__(73);
const stores_1 = __webpack_require__(78);
const __1 = __webpack_require__(75);
/**
 * Listening to related pubsub events and send data to the client.
 * @param io Socket.io server instance
 */
function emitSocketMessages(io) {
    // If `Send Data To Client` event is published, then this function will send data to the client.
    const sendData = ({ playerId, protocol, data }) => {
        const socketId = stores_1.tokenPlayerMap.getSocketIdByPlayerId(playerId);
        // Add player to specific socket room when player joining or creating room.
        // Socket room has the tournament id. So we can send data to specific lobby(All players in a specific tournament).
        if (protocol === models_1.SocketProtocols.CreateLobbyAccept ||
            protocol === models_1.SocketProtocols.JoinLobbyAccept) {
            const { tournamentId } = data;
            io.sockets.sockets.get(socketId).join(tournamentId);
        }
        io.to(socketId).emit(protocol, data);
    };
    __1.pubsub.subscribe(models_2.PubSubEvents.SendDataToClient, sendData);
    const SendDataToAll = ({ tournamentId, protocol, data }) => {
        io.to(tournamentId).emit(protocol, data);
    };
    __1.pubsub.subscribe(models_2.PubSubEvents.SendDataToAll, SendDataToAll);
}
exports.emitSocketMessages = emitSocketMessages;


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const models_1 = __webpack_require__(11);
const store_1 = __webpack_require__(2);
const services_1 = __webpack_require__(75);
const stores_1 = __webpack_require__(78);
const logger = new services_1.Logger('create-tournament.controller');
const createTournamentController = ({ data, context, socketId, }) => {
    const { playerName } = data;
    const playerId = store_1.store.dispatch.game.joinPlayer({
        receivedTournamentId: '',
        playerName,
    });
    if (!playerId) {
        logger.error("Store didn't send a playerId", context);
        return;
    }
    logger.debug('Player added to the store', context);
    stores_1.tokenPlayerMap.addPlayerId(socketId, playerId);
    logger.debug('Player added to tokenPlayerMap', context);
    const state = store_1.store.getState().game;
    const player = state.playersModel[playerId];
    const tournamentId = player.tournamentId;
    const tournament = state.tournamentsModel[tournamentId];
    const snapshot = {
        tournamentsModel: {
            [tournamentId]: tournament,
        },
        playersModel: {
            [playerId]: player,
        },
        racesModel: {},
        leaderboardsModel: {},
        playerLogsModel: {},
    };
    const initialServerData = {
        playerId,
        tournamentId,
        snapshot,
    };
    (0, services_1.publishToSingleClient)({
        playerId,
        protocol: models_1.SocketProtocols.CreateLobbyAccept,
        data: initialServerData,
    });
};
services_1.pubsub.subscribe(models_1.SocketProtocols.CreateLobbyRequest, createTournamentController);


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const models_1 = __webpack_require__(11);
const models_2 = __webpack_require__(73);
const services_1 = __webpack_require__(75);
const check_race_complete_1 = __webpack_require__(91);
const start_race_controller_1 = __webpack_require__(92);
const logger = new services_1.Logger('create-tournament.controller');
const informTimeoutController = ({ data, context, playerId, }) => {
    // TODO: Implement a function to get race Id from server itself without passing it from client
    const { raceId } = data;
    logger.debug('Player race client timer timed out', context);
    const checkRaceCompleteInstance = (0, check_race_complete_1.getCheckRaceEndInstance)(raceId);
    checkRaceCompleteInstance.addPlayerTimeout(playerId, context);
    // If all players have completed the race, raise RaceEnd event.
    const isAllPlayersEnded = checkRaceCompleteInstance.isRaceEnded();
    const raceEndData = {
        context,
        data: { raceId },
    };
    if (isAllPlayersEnded) {
        services_1.pubsub.publish(models_2.PubSubEvents.RaceEnd, raceEndData);
        logger.info('Race ended after all client completed the race by client side.', context);
        // Clearing the server timeout when all race players have completed their races from the client side.
        clearTimeout(start_race_controller_1.serverRaceTimeout);
    }
};
services_1.pubsub.subscribe(models_1.SocketProtocols.InformTimeout, informTimeoutController);


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.viewAllCheckRaceEndInstances = exports.deleteCheckRaceEndInstance = exports.getCheckRaceEndInstance = exports.createCheckRaceEndInstance = void 0;
const services_1 = __webpack_require__(75);
const logger = new services_1.Logger('check-race-complete');
/** This is class will be used for detect a specific race has ended by player complete/timeout.
 * When a player send last type log or client timeout event,
 * that player's id will be added to an array.
 */
class CheckRaceEnd {
    constructor(allPlayerIds, raceTextLength) {
        this.allPlayerIds = allPlayerIds;
        this.raceTextLength = raceTextLength;
        this.raceEndPlayerIds = [];
    }
    /** Mark a player as ended the race. */
    addPlayer(playerId, context) {
        if (!this.allPlayerIds.includes(playerId)) {
            logger.error('Added a player not included in all player Ids', context);
            return;
        }
        if (this.raceEndPlayerIds.includes(playerId)) {
            logger.error('Player already marked as ended.', context);
            return;
        }
        this.raceEndPlayerIds.push(playerId);
    }
    /** Check all players finished the race */
    isRaceEnded() {
        return this.raceEndPlayerIds.length === this.allPlayerIds.length;
    }
    /** Check whether player has completed the race text.
     * If completed add the player to raceEndPlayerIds.
     *
     * @param playerId - Player id to check.
     * @param lastTextLength - Last text length of the player.
     * @param context - Logger context
     *
     * @returns true; if player already ended the race. false; otherwise.
     */
    checkPlayerHasCompletedRace(playerId, lastTextLength, context) {
        // If already ended, do nothing.
        if (this.raceEndPlayerIds.includes(playerId)) {
            return true;
        }
        if (lastTextLength === this.raceTextLength) {
            this.addPlayer(playerId, context);
        }
        return false;
    }
    /** Add a player ended race by client timeout. */
    addPlayerTimeout(playerId, context) {
        this.addPlayer(playerId, context);
    }
}
const CheckRaceEndInstances = {};
function createCheckRaceEndInstance(raceId, allPlayerIds, raceTextLength) {
    const instance = new CheckRaceEnd(allPlayerIds, raceTextLength);
    CheckRaceEndInstances[raceId] = instance;
    return instance;
}
exports.createCheckRaceEndInstance = createCheckRaceEndInstance;
function getCheckRaceEndInstance(raceId) {
    return CheckRaceEndInstances[raceId];
}
exports.getCheckRaceEndInstance = getCheckRaceEndInstance;
function deleteCheckRaceEndInstance(raceId) {
    delete CheckRaceEndInstances[raceId];
}
exports.deleteCheckRaceEndInstance = deleteCheckRaceEndInstance;
function viewAllCheckRaceEndInstances() {
    return CheckRaceEndInstances;
}
exports.viewAllCheckRaceEndInstances = viewAllCheckRaceEndInstances;


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startRaceController = exports.serverRaceTimeout = void 0;
const tslib_1 = __webpack_require__(1);
const constants_1 = __webpack_require__(18);
const models_1 = __webpack_require__(11);
const store_1 = __webpack_require__(2);
const models_2 = __webpack_require__(73);
const services_1 = __webpack_require__(75);
const utils_1 = __webpack_require__(93);
const check_race_complete_1 = __webpack_require__(91);
const logger = new services_1.Logger('start-race.controller');
const startRaceController = ({ context, playerId, tournamentId, }) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let game = store_1.store.getState().game;
    let tournament = game.tournamentsModel[tournamentId];
    // Check for ongoing races. If there's an ongoing race dismiss the request.
    let raceIds = tournament.raceIds;
    let raceId = raceIds[raceIds.length - 1] || null;
    let race = raceId ? game.racesModel[raceId] : null;
    if (race === null || race === void 0 ? void 0 : race.isOnGoing) {
        logger.info('The start race request has been dismissed because the tournament currently contains an ongoing race.', context, { onGoingRaceId: raceId });
    }
    // Check for two active players in the tournament.
    if (tournament.playerIds.length < 2) {
        logger.error('Tournament does not have at least two active players to start a race.', context);
        return;
    }
    // Generate race text
    let raceText;
    try {
        raceText = yield (0, utils_1.generateRaceText)();
    }
    catch (error) {
        logger.error(`Race text generation failed, ${error}`, context, { error });
        return;
    }
    store_1.store.dispatch.game.startRace({
        tournamentId,
        playerId,
        raceText,
    });
    logger.info('Race started', context, { startedBy: playerId });
    game = store_1.store.getState().game;
    tournament = game.tournamentsModel[tournamentId];
    raceIds = tournament.raceIds;
    // Active race id
    raceId = raceIds[raceIds.length - 1];
    race = game.racesModel[raceId];
    const startedRaceData = {
        raceId,
        raceStartedBy: playerId,
        raceText,
    };
    (0, services_1.publishToAllClients)({
        tournamentId,
        protocol: models_1.SocketProtocols.StartRaceAccept,
        data: startedRaceData,
    });
    // Publish start type log listening event
    const TypeLogListenData = {
        context,
        data: { raceId },
    };
    services_1.pubsub.publish(models_2.PubSubEvents.StartTypeLogListening, TypeLogListenData);
    // Create an instance for check race end by player complete/timeout
    const racePlayerIds = Object.keys(race.players);
    const raceTextLength = raceText.length;
    (0, check_race_complete_1.createCheckRaceEndInstance)(raceId, racePlayerIds, raceTextLength);
    const raceEndTime = (race.timeoutDuration + constants_1.RACE_END_WAIT_TIME) * 1000;
    const raceEndModel = {
        context,
        data: { raceId },
    };
    exports.serverRaceTimeout = setTimeout(() => {
        logger.info('Race ended triggered by server timeout.', context);
        services_1.pubsub.publish(models_2.PubSubEvents.RaceEnd, raceEndModel);
        clearTimeout(exports.serverRaceTimeout);
    }, raceEndTime);
});
exports.startRaceController = startRaceController;
services_1.pubsub.subscribe(models_1.SocketProtocols.StartRaceRequest, exports.startRaceController);


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(94), exports);
tslib_1.__exportStar(__webpack_require__(96), exports);


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validateAuthToken = exports.generateAuthToken = void 0;
const uuid_1 = __webpack_require__(95);
/**
 * Generate a new auth token using uuid v4.
 * This token will be used to authenticate the player.
 * uuid - https://www.npmjs.com/package/uuid
 */
function generateAuthToken() {
    return (0, uuid_1.v4)();
}
exports.generateAuthToken = generateAuthToken;
/**
 * Validate the auth token.
 * It will check the uuid version and validate the token.
 * @param token
 */
function validateAuthToken(token) {
    return (0, uuid_1.validate)(token) && (0, uuid_1.version)(token) === 4;
}
exports.validateAuthToken = validateAuthToken;


/***/ }),
/* 95 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateRaceText = void 0;
const tslib_1 = __webpack_require__(1);
const axios_1 = tslib_1.__importDefault(__webpack_require__(97));
const generateRaceText = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const url = 'http://www.metaphorpsum.com/paragraphs/1/8';
    let raceText = '';
    try {
        const response = yield axios_1.default.get(url);
        raceText = response.data;
        // Drop any char that is not a letter, space, comma, period, apostrophe, question mark, or exclamation point.
        // (Also drop new line)
        raceText = raceText.replace(/[^a-zA-Z ,.'?!]/g, '');
        return raceText;
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.generateRaceText = generateRaceText;


/***/ }),
/* 97 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const models_1 = __webpack_require__(11);
const store_1 = __webpack_require__(2);
const lodash_1 = __webpack_require__(64);
const services_1 = __webpack_require__(75);
const stores_1 = __webpack_require__(78);
const logger = new services_1.Logger('create-tournament.controller');
const joinTournamentController = ({ data, context, socketId, }) => {
    var _a;
    // Checking whether player already has playerId.
    let playerId = stores_1.tokenPlayerMap.getPlayerIdBySocketId(socketId);
    let player;
    if (playerId) {
        logger.info('Player already has playerId, checking whether player is available on the store.', context);
        player =
            store_1.store.getState().game.playersModel[stores_1.tokenPlayerMap.getPlayerIdBySocketId(socketId)];
    }
    // If player data is not available on the store let new player join to the store.
    if (!player) {
        const { playerName, roomId } = data;
        const receivedTournamentId = `T:${roomId}`;
        playerId || (playerId = store_1.store.dispatch.game.joinPlayer({
            receivedTournamentId,
            playerName,
        }));
        if (!playerId) {
            logger.error("Store didn't send a playerId", context);
            // TODO: send error response
            return;
        }
        logger.debug('Player added to the store', context);
        // Adding player to the tokenPlayerMap.
        stores_1.tokenPlayerMap.addPlayerId(socketId, playerId);
        logger.debug('Player added to tokenPlayerMap', context);
    }
    // Collecting required data from the store.
    const state = store_1.store.getState().game;
    player || (player = state.playersModel[playerId]);
    const tournamentId = player.tournamentId;
    const tournament = state.tournamentsModel[tournamentId];
    const playerIds = tournament.playerIds;
    const raceIds = tournament.raceIds;
    const lastRaceId = raceIds[raceIds.length - 1];
    const filteredPlayers = (0, lodash_1.pick)(state.playersModel, playerIds);
    const filteredRaces = (0, lodash_1.pick)(state.racesModel, raceIds);
    const filteredLeaderboards = (0, lodash_1.pick)(state.leaderboardsModel, raceIds);
    let filteredPlayersLogs = {};
    if (((_a = filteredRaces[lastRaceId]) === null || _a === void 0 ? void 0 : _a.isOnGoing) === true) {
        const playersLogsIds = playerIds.map(playerId => `${lastRaceId}-${playerId}`);
        filteredPlayersLogs = (0, lodash_1.pick)(state.playerLogsModel, playersLogsIds);
    }
    const snapshot = {
        tournamentsModel: {
            [tournamentId]: tournament,
        },
        playersModel: filteredPlayers,
        racesModel: filteredRaces,
        leaderboardsModel: filteredLeaderboards,
        playerLogsModel: filteredPlayersLogs,
    };
    const initialServerData = {
        playerId,
        tournamentId,
        snapshot,
    };
    (0, services_1.publishToSingleClient)({
        playerId,
        protocol: models_1.SocketProtocols.JoinLobbyAccept,
        data: initialServerData,
    });
    // Sending player joined event to all players.
    const joinedPlayerData = {
        player: {
            id: playerId,
            name: player.name,
            avatarLink: player.avatarLink,
            state: (0, models_1.appPlayerStateToPlayerState)(player.state),
        },
    };
    (0, services_1.publishToAllClients)({
        tournamentId,
        protocol: models_1.SocketProtocols.PlayerJoin,
        data: joinedPlayerData,
    });
};
services_1.pubsub.subscribe(models_1.SocketProtocols.JoinLobbyRequest, joinTournamentController);


/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.raceEndController = void 0;
const models_1 = __webpack_require__(11);
const store_1 = __webpack_require__(2);
const util_1 = __webpack_require__(41);
const models_2 = __webpack_require__(73);
const services_1 = __webpack_require__(75);
const logger = new services_1.Logger('race-end.controller');
const raceEndController = ({ context, data }) => {
    const { raceId } = data;
    const tournamentId = (0, util_1.extractId)(raceId, util_1.ExtractIdType.Race, util_1.ExtractIdType.Tournament);
    // Check whether race is already finished.
    let game = store_1.store.getState().game;
    const race = game.racesModel[raceId];
    const isEnded = !race.isOnGoing;
    if (isEnded) {
        logger.error('Controller tried to end a race already ended.', context);
        return;
    }
    // End race in the store.
    store_1.store.dispatch.game.endRace({ raceId });
    logger.info('Race ended', context);
    // Send leaderboard to all players.
    game = store_1.store.getState().game;
    const leaderboard = game.leaderboardsModel[raceId];
    const sendLeaderboardData = {
        raceId,
        leaderboard,
    };
    (0, services_1.publishToAllClients)({
        tournamentId,
        protocol: models_1.SocketProtocols.SendLeaderboard,
        data: sendLeaderboardData,
    });
    // Publish end type log listening event
    const TypeLogListenData = {
        context,
        data: { raceId },
    };
    services_1.pubsub.publish(models_2.PubSubEvents.EndTypeLogListening, TypeLogListenData);
};
exports.raceEndController = raceEndController;
services_1.pubsub.subscribe(models_2.PubSubEvents.RaceEnd, exports.raceEndController);


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(101), exports);
tslib_1.__exportStar(__webpack_require__(103), exports);


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sendTypeLogController = void 0;
const models_1 = __webpack_require__(11);
const store_1 = __webpack_require__(2);
const models_2 = __webpack_require__(73);
const services_1 = __webpack_require__(75);
const check_race_complete_1 = __webpack_require__(91);
const start_race_controller_1 = __webpack_require__(92);
const type_log_queues_1 = __webpack_require__(102);
const logger = new services_1.Logger('update-type-log.controller/listen-to-client');
const sendTypeLogController = ({ data, context, playerId, }) => {
    const { raceId, playerLogs } = data;
    if ((playerLogs === null || playerLogs === void 0 ? void 0 : playerLogs.length) <= 0) {
        logger.warn('Received an empty type log.', context);
        return;
    }
    // Check whether race is ongoing
    const race = store_1.store.getState().game.racesModel[raceId];
    const isRaceOngoing = race.isOnGoing;
    if (!isRaceOngoing) {
        logger.warn('Received a type log when specific race is ended.', context);
        return;
    }
    // Check the player has ended the race,
    // if so, add the player to CheckRaceComplete
    const lastPlayerLog = playerLogs[playerLogs.length - 1];
    const playerLastTextLength = lastPlayerLog.textLength;
    const checkRaceCompleteInstance = (0, check_race_complete_1.getCheckRaceEndInstance)(raceId);
    const isPlayerAlreadyEndedRace = checkRaceCompleteInstance.checkPlayerHasCompletedRace(playerId, playerLastTextLength, context);
    // If player already ended the race, do nothing.
    // No need to add type logs to queue.
    if (isPlayerAlreadyEndedRace) {
        logger.warn('Received type logs from already ended player.', context);
        return;
    }
    // If all players have completed the race, raise RaceEnd event.
    const isAllPlayersEnded = checkRaceCompleteInstance.isRaceEnded();
    const raceEndData = {
        context,
        data: { raceId },
    };
    if (isAllPlayersEnded) {
        services_1.pubsub.publish(models_2.PubSubEvents.RaceEnd, raceEndData);
        logger.info('Race ended after all client completed the race by client side.', context);
        // Clearing the server timeout when all race players have completed their races from the client side.
        clearTimeout(start_race_controller_1.serverRaceTimeout);
    }
    store_1.store.dispatch.game.sendTypeLog({
        raceId,
        playerId,
        playerLog: (0, models_1.playerLogsToAppPlayerLogs)(playerLogs),
    });
    const typeLogsQueue = (0, type_log_queues_1.getTypeLogsQueue)(raceId, context);
    typeLogsQueue.addLog(playerLogs, playerId);
    logger.debug('Type logs are added to race type-logs-queue.', context);
};
exports.sendTypeLogController = sendTypeLogController;
services_1.pubsub.subscribe(models_1.SocketProtocols.SendTypeLog, exports.sendTypeLogController);


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clearTypeLogsQueue = exports.getTypeLogsQueue = void 0;
const models_1 = __webpack_require__(11);
const services_1 = __webpack_require__(75);
const logger = new services_1.Logger('update-type-log.controller/type-log-queues');
/** Keeping type logs queues per every race on the server. */
const typeLogsQueuesForRaces = new Map();
/** This class contains player-type-logs for specific race. */
class TypeLogsQueue {
    constructor() {
        this.logsCollection = {};
    }
    /** Add player logs to queue */
    addLog(log, playerId) {
        if (!this.logsCollection[playerId]) {
            this.logsCollection[playerId] = [];
        }
        this.logsCollection[playerId].push(...(0, models_1.playerLogsToAppPlayerLogs)(log));
    }
    /** This method will return logs collection stored inside the class. */
    getLogsCollection() {
        return this.logsCollection;
    }
    /** Clear the race logs queue */
    clearQueue() {
        this.logsCollection = {};
    }
}
/**
 * Create a new type log queue instance for the race
 * @param raceId id of race that the queue is for
 * @returns new instance of TypeLogsQueue
 */
const createTypeLogsQueue = (raceId, context) => {
    const typeLogsQueue = new TypeLogsQueue();
    typeLogsQueuesForRaces.set(raceId, typeLogsQueue);
    logger.debug('New type-logs-queue created for the race.', context);
    return typeLogsQueue;
};
/**
 * Get the type-log-queue instance for the race.
 * If the queue doesn't exist, create a new one.
 * @param raceId id of the race that the queue is for
 * @returns instance of TypeLogsQueue
 */
const getTypeLogsQueue = (raceId, context) => {
    if (!typeLogsQueuesForRaces.has(raceId)) {
        return createTypeLogsQueue(raceId, context);
    }
    return typeLogsQueuesForRaces.get(raceId);
};
exports.getTypeLogsQueue = getTypeLogsQueue;
/**
 * Clear specific type-log-queue instance.
 * @param raceId id of the race which queue should be cleared
 */
const clearTypeLogsQueue = (raceId) => {
    var _a;
    (_a = typeLogsQueuesForRaces.get(raceId)) === null || _a === void 0 ? void 0 : _a.clearQueue();
    delete typeLogsQueuesForRaces[raceId];
};
exports.clearTypeLogsQueue = clearTypeLogsQueue;


/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeLogPusher = void 0;
const constants_1 = __webpack_require__(18);
const models_1 = __webpack_require__(11);
const util_1 = __webpack_require__(41);
const models_2 = __webpack_require__(73);
const services_1 = __webpack_require__(75);
const type_log_queues_1 = __webpack_require__(102);
const logger = new services_1.Logger('update-type-log.controller/send-logs-to-players');
/**
 * Sends the collected logs to all players at a specific interval.
 */
const typeLogPusher = (raceId, context) => {
    const timer = setInterval(() => {
        const logsQueue = (0, type_log_queues_1.getTypeLogsQueue)(raceId, context);
        const logsCollection = logsQueue.getLogsCollection();
        const isLogsCollectionEmpty = logsCollection == null || Object.keys(logsCollection).length === 0;
        if (!isLogsCollectionEmpty) {
            const data = {
                raceId: raceId,
                playerLogs: logsCollection,
            };
            const tournamentId = (0, util_1.extractId)(raceId, util_1.ExtractIdType.Race, util_1.ExtractIdType.Tournament);
            (0, services_1.publishToAllClients)({
                tournamentId: tournamentId,
                protocol: models_1.SocketProtocols.UpdateTypeLogs,
                data,
            });
            logsQueue.clearQueue();
        }
    }, constants_1.SERVER_TYPE_LOG_INTERVAL);
    return () => {
        clearInterval(timer);
        (0, type_log_queues_1.clearTypeLogsQueue)(raceId);
        logger.info('Type log pusher destroyed and queue cleared after race end.', context);
    };
};
exports.typeLogPusher = typeLogPusher;
const flushAllAfterRaceEnd = (destroyTypeLogPusher, context) => {
    services_1.pubsub.unsubscribe(models_2.PubSubEvents.StartTypeLogListening, destroyTypeLogPusher);
    services_1.pubsub.unsubscribe(models_2.PubSubEvents.EndTypeLogListening, (_) => flushAllAfterRaceEnd(destroyTypeLogPusher, context));
    destroyTypeLogPusher();
};
const typeLogPushController = ({ data, context, }) => {
    logger.info('Started type log listening', context);
    const { raceId: startTypeLogEventRaceId } = data;
    const destroyTypeLogPusher = (0, exports.typeLogPusher)(startTypeLogEventRaceId, context);
    services_1.pubsub.subscribe(models_2.PubSubEvents.EndTypeLogListening, ({ data }) => {
        const { raceId: endTypeLogEventRaceId } = data;
        // If race ids are equal flush all and destroy the type log pusher.
        if (startTypeLogEventRaceId == endTypeLogEventRaceId) {
            flushAllAfterRaceEnd(destroyTypeLogPusher, context);
        }
    });
};
services_1.pubsub.subscribe(models_2.PubSubEvents.StartTypeLogListening, typeLogPushController);


/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.manageSocketConnections = void 0;
const models_1 = __webpack_require__(11);
const services_1 = __webpack_require__(75);
const stores_1 = __webpack_require__(78);
const utils_1 = __webpack_require__(93);
const logger = new services_1.Logger('manage-socket-connections');
/**
 * Handling received socket events.
 * @param socket Socket instance
 * @param socketServer Socket.io server instance
 */
function manageSocketConnections(socket, socketServer) {
    const context = logger.createContext({ identifier: socket.id });
    logger.info('User connected', context);
    // Take the token from the handshake.
    const token = socket.handshake.auth.token;
    let playerData = null;
    if (token) {
        if ((0, utils_1.validateAuthToken)(token)) {
            playerData = stores_1.tokenPlayerMap.getPlayer(token);
            logger.debug('Valid token received from client.', context);
            logger.debug(`User is ${playerData ? 'found' : 'not found'} in map.`, context);
        }
        else {
            logger.debug('Invalid token received from client.', context);
        }
    }
    else {
        logger.debug('No token received from client.', context);
    }
    let newToken = '';
    if (!playerData) {
        // If player is new token will be generated and sent to the client.
        newToken = (0, utils_1.generateAuthToken)();
        socket.emit(models_1.SocketProtocols.AuthTokenTransfer, newToken);
        // New player will be added with related socket id to the map.
        stores_1.tokenPlayerMap.addSocketId(newToken, socket.id);
        const context = logger.createContext({ identifier: socket.id });
        logger.debug('New user added to map.', context);
    }
    else {
        // If player is already in the map then update the socket id.
        stores_1.tokenPlayerMap.updatePlayerSocketId(token, socket.id);
        const { playerId } = playerData;
        const context = logger.createContext({ identifier: playerId });
        logger.debug('User updated with a new socket in map.', context);
    }
    // On any socket event publish the event with playerId and data.
    socket.onAny((event, data) => (0, services_1.publishOnReceive)({ event, data, socket }));
    // If a user disconnected call the reconnect function.
    socket.on('disconnect', () => {
        const playerId = stores_1.tokenPlayerMap.getPlayerIdBySocketId(socket.id);
        const authToken = stores_1.tokenPlayerMap.getAuthTokenBySocketId(socket.id);
        const context = logger.createContext({ identifier: playerId });
        logger.info('User disconnected.', context);
        if (authToken) {
            (0, services_1.checkReconnected)(authToken, socketServer);
        }
    });
}
exports.manageSocketConnections = manageSocketConnections;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const store_1 = __webpack_require__(2);
const express_1 = tslib_1.__importDefault(__webpack_require__(68));
const http_1 = tslib_1.__importDefault(__webpack_require__(69));
const socket_io_1 = __webpack_require__(70);
__webpack_require__(71);
const check_race_complete_1 = __webpack_require__(91);
const services_1 = __webpack_require__(75);
const socket_1 = __webpack_require__(104);
const stores_1 = __webpack_require__(78);
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
app.get('/', (req, res) => {
    const storeState = store_1.store.getState();
    res.send(storeState);
});
app.get('/token-player-map', (req, res) => {
    const data = stores_1.tokenPlayerMap.viewMap();
    res.send(data);
});
app.get('/ongoing-race-data', (req, res) => {
    const data = (0, check_race_complete_1.viewAllCheckRaceEndInstances)();
    res.send(data);
});
const allowedOrigin = ((_a = process.env.NX_ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(', ')) || 'http://localhost:4200';
const socketServer = new socket_io_1.Server(server, {
    cors: {
        origin: allowedOrigin,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
socketServer.on('connection', socket => (0, socket_1.manageSocketConnections)(socket, socketServer));
server.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
(0, services_1.emitSocketMessages)(socketServer);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map