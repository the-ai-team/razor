/** Error codes */
export enum AppErrorCode {
  TournamentNotExists = 'TOURNAMENT_NOT_FOUND',
  PlayerNotExists = 'PLAYER_NOT_FOUND',
  InvalidPlayerName = 'INVALID_PLAYER_NAME',
  RaceNotExists = 'RACE_NOT_FOUND',
  PayloadNotProvided = 'PAYLOAD_NOT_PROVIDED',
}

/** Types of log messages. */
export enum AppMessageLogType {
  Error = 'error',
  Info = 'info',
  Warn = 'warn',
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
