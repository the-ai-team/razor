/** Error codes */
export declare enum AppErrorCode {
    TournamentNotExists = "TOURNAMNET_NOT_FOUND",
    PlayerNotExists = "PLAYER_NOT_FOUND",
    InvalidPlayerName = "INVALID_PLAYER_NAME",
    RaceNotExists = "RACE_NOT_FOUND",
    PayloadNotProvided = "PAYLOAD_NOT_PROVIDED"
}
/** Types of log messages. */
export declare enum AppMessageLogType {
    Error = "error",
    Info = "info",
    Warn = "warn"
}
/** Unix timestamp of the error log + random id */
export type AppErrorTimestamp = string;
/** Log message with info */
export interface AppMessageLog {
    message: string;
    code: AppErrorCode;
    related: string;
    type: AppMessageLogType;
}
/** Error logs */
export interface AppErrorLog {
    message: string;
    code: AppErrorCode;
    related: string;
}
/** Error logs model */
export type AppErrorLogs = Record<AppErrorTimestamp, AppErrorLog>;
