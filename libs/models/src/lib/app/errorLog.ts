export enum AppErrorCode {
  TournamentNotExists = 'TOURNAMNET_NOT_FOUND',
  PlayerNotExists = 'PLAYER_NOT_FOUND',
}

export type AppErrorTimestamp = number;
export interface AppErrorLog {
  message: string;
  code: AppErrorCode;
  relatedId: string;
}

export type AppErrorLogs = Record<AppErrorTimestamp, AppErrorLog>;
