import { createLogger, format, Logger, transports } from 'winston';

export const cloudLogger = (): Logger => {
  const { timestamp, combine, errors, json } = format;

  return createLogger({
    level: 'debug',
    format: combine(timestamp(), errors({ stack: true }), json()),
    defaultMeta: { service: 'server-logs' },
    transports: [new transports.Console()],
  });
};
