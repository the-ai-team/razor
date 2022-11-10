export enum AppErrorCode {
  TournamentNotExists = 'TOURNAMNET_NOT_FOUND',
  PlayerNotExists = 'PLAYER_NOT_FOUND',
}

export enum AppMessageLogType {
  Error = 'error',
  Info = 'info',
  Warn = 'warn',
}

export type AppErrorTimestamp = number;
export interface AppMessageLog {
  message: string;
  code: AppErrorCode;
  relatedId: string;
  type: AppMessageLogType;
}

export interface AppErrorLog {
  message: string;
  code: AppErrorCode;
  relatedId: string;
}

export type AppErrorLogs = Record<AppErrorTimestamp, AppErrorLog>;
