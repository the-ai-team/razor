import { createLogger, format, Logger, transports } from 'winston';

import { LogLevels, logLevels } from './levels';

const { combine, errors, printf } = format;

// Google Cloud Severity Levels
const severityMap: Map<string, string> = new Map([
  [LogLevels.Error, 'ERROR'],
  [LogLevels.Warn, 'WARNING'],
  [LogLevels.Info, 'INFO'],
  [LogLevels.Debug, 'DEBUG'],
]);

const logFormat = printf(({ service, context, level, message, ...args }) => {
  const { subject, ...contextData } = context;
  const log = {
    service,
    subject,
    severity: severityMap.get(level),
    message,
    context: { ...contextData },
    args: Object.keys(args).length ? args : undefined,
  };
  return JSON.stringify(log);
});

export const cloudLogger = (): Logger => {
  return createLogger({
    level: 'debug',
    levels: logLevels,
    format: combine(errors({ stack: true }), logFormat),
    defaultMeta: { service: 'LOGGER' },
    transports: [new transports.Console()],
  });
};
