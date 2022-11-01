export enum AppErrorCode {
  TournamentNotExists = 'not_found',
}

export type AppErrorTimestamp = number;
export interface AppErrorLog {
  message: string;
  code: AppErrorCode;
  relatedId: string;
}

export type AppErrorLogs = Record<AppErrorTimestamp, AppErrorLog>;
