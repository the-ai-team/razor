import { addColors, createLogger, format, Logger, transports } from 'winston';

import { logLevels } from './levels';

const { printf, timestamp, combine, colorize, errors } = format;

const logFormat = printf(
  ({ service, level, message, timestamp, subject, context, ...args }) => {
    const additionalData = {
      context,
      args: Object.keys(args).length ? args : undefined,
    };
    return `[${service}] (${subject}) ${level}: ${timestamp} - ${message} - ${JSON.stringify(
      additionalData,
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
      errors({ stack: true }),
      timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' }),
      logFormat,
    ),
    defaultMeta: { service: 'LOGGER' },
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ],
  });
};
