import { createLogger, format, Logger, transports, addColors } from 'winston';
import { LogLevels, logLevels } from './logger';

const { printf, timestamp, combine, colorize, errors, label } = format;

export const localLogger = (): Logger => {
  const logFormat = printf(
    ({ subject, label, level, message, timestamp, ...args }) => {
      return `${label} (${subject}) ${level}: ${timestamp} - ${message} - ${JSON.stringify(
        args,
      )}`;
    },
  );

  addColors({
    [LogLevels.Error]: 'bold red',
    [LogLevels.Warn]: 'bold yellow',
    [LogLevels.Info]: 'blue',
    [LogLevels.Debug]: 'dim white',
  });

  return createLogger({
    level: LogLevels.Debug,
    levels: logLevels,
    format: combine(
      colorize({ all: true }),
      label({ label: '[LOGGER]' }),
      errors({ stack: true }),
      timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
      logFormat,
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ],
  });
};
