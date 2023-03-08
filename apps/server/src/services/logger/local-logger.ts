import { createLogger, format, Logger, transports, addColors } from 'winston';
import { logLevels } from './logger';

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
    error: 'bold red',
    warn: 'bold yellow',
    info: 'blue',
    debug: 'dim white',
  });

  return createLogger({
    level: 'debug',
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
