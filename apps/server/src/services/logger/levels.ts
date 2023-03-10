export enum LogLevels {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
}

export const logLevels = {
  [LogLevels.Error]: 0,
  [LogLevels.Warn]: 1,
  [LogLevels.Info]: 2,
  [LogLevels.Debug]: 3,
};
