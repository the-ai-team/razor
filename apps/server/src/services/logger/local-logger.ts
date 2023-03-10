import { addColors, createLogger, format, Logger, transports } from 'winston';

import { logLevels } from './levels';

const { printf, timestamp, combine, colorize, errors, label } = format;

const logFormat = printf(
  ({ subject, label, level, message, timestamp, ...args }) => {
    return `${label} (${subject}) ${level}: ${timestamp} - ${message} - ${JSON.stringify(
      args,
    )}`;
  },
);

export const localLogger = (): Logger => {
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
