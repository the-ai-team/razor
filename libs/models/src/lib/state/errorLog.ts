export enum AppErrorCode {
  TournamentNotExists = 'TOURNAMNET_NOT_FOUND',
  PlayerNotExists = 'PLAYER_NOT_FOUND',
  InvalidPlayerName = 'INVALID_PLAYER_NAME',
  RaceNotExists = 'RACE_NOT_FOUND',
}

export enum AppMessageLogType {
  Error = 'error',
  Info = 'info',
  Warn = 'warn',
}

export type AppErrorTimestamp = string;
export interface AppMessageLog {
  message: string;
  code: AppErrorCode;
  related: string;
  type: AppMessageLogType;
}

export interface AppErrorLog {
  message: string;
  code: AppErrorCode;
  related: string;
}

export type AppErrorLogs = Record<AppErrorTimestamp, AppErrorLog>;
