"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=log-message.js.map